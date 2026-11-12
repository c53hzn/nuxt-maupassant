import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const BLOG_DIR = join(process.cwd(), 'content/blog')

export type MonthEntry = [string, string[]]

export interface YearPicCount {
  year: string
  picCount: number
}

export interface BlogImagesResult {
  yearData: MonthEntry[]
  yearlyCount: YearPicCount[]
}

export interface GroupImagesOptions {
  /** 指定年份；不传则取有图片的最新一年 */
  year?: number
  /** 是否排除 .gif */
  excludeGif?: boolean
}

// ---------- 内部工具（与之前一致） ----------

function parseAttrs(s: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s))) attrs[m[1].toLowerCase()] = m[3] ?? m[4] ?? m[5] ?? ''
  return attrs
}

function urlToPicFilename(url: string): string {
  if (!url) return ''
  if (/^(data|blob|javascript):/i.test(url)) return ''

  const trimmed = url.trim()
  if (!isValidImageUrl(trimmed)) return ''   // ← 非法直接丢弃

  // 先取路径末段（去掉 query/fragment），用于 .html 判断
  const clean = trimmed.split(/[?#]/)[0]
  const lastSeg = clean.split('/').filter(Boolean).pop() || ''

  // 0) 路径末段是 .html/.htm → 一律筛掉（无论绝对/相对/裸文件名）
  if (/\.html?$/i.test(lastSeg)) return ''

  // 1) 外部绝对链接 → 原样返回
  if (/^(https?:)?\/\//i.test(trimmed)) return trimmed

  // 2) 已经是 pic/ 或 /pic/ 或 ./pic/ 开头 → 保持
  if (/^(\.\/|\/)?pic\//i.test(trimmed)) return trimmed

  // 3) 纯文件名 → 走本地化规则
  if (!/[/:\\]/.test(trimmed)) {
    let seg = lastSeg
    if (/&690$/.test(seg)) seg = seg.slice(0, -4)
    if (!/\.[A-Za-z0-9]+$/.test(seg)) seg += '.jpg'
    return `pic/${seg}`
  }

  // 4) 其他相对路径 → 原样返回
  return trimmed
}

/** 剔除代码块与注释，避免误匹配代码里的 <img> 字符串 */
function stripCodeBlocks(text: string): string {
  const lines = text.split(/\r?\n/)
  const out: string[] = []
  let inFence = false
  let fenceChar = ''
  let fenceLen = 0

  for (const line of lines) {
    const trimmed = line.trim()
    const m = trimmed.match(/^(`{3,}|~{3,})/)

    // fenced code block 的开关行
    if (m) {
      if (!inFence) {
        inFence = true
        fenceChar = m[1][0]
        fenceLen = m[1].length
      } else if (m[1][0] === fenceChar && m[1].length >= fenceLen) {
        inFence = false
      }
      out.push('')
      continue
    }

    // 代码块内部：整行丢弃
    if (inFence) {
      out.push('')
      continue
    }

    // 缩进代码块（4 空格或 Tab 开头）也跳过
    if (/^(\t| {4})/.test(line)) {
      out.push('')
      continue
    }

    out.push(line)
  }

  let result = out.join('\n')
  // 行内代码
  result = result.replace(/`[^`\n]*`/g, '')
  // HTML 注释
  result = result.replace(/<!--[\s\S]*?-->/g, '')
  return result
}
/** 判断候选 URL 是否“像”一个真实图片链接，过滤代码拼接残留 */
function isValidImageUrl(u: string): boolean {
  if (!u) return false
  if (u.length > 2048) return false
  // 含空白、引号、尖括号、方括号、花括号、反斜杠 → 非法
  if (/[\s"'<>\[\]{}\\]/.test(u)) return false
  // 含未编码的 %（后面不是两位十六进制）→ 非法
  if (/%(?![0-9A-Fa-f]{2})/.test(u)) return false
  return true
}

function extractImageFilenames(body: string): string[] {
  if (!body) return []
  const text = stripCodeBlocks(body)   // 代码块剥离保留，作为第一道防线
  const urls: string[] = []
  
  const mdRe = /!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)"']+))(?:\s+["'][^"']*["'])?\s*\)/g
  let m: RegExpExecArray | null
  while ((m = mdRe.exec(body))) urls.push(m[1] || m[2])

  const imgRe = /<img\b([^>]*)>/gi
  while ((m = imgRe.exec(body))) {
    const attrs = parseAttrs(m[1])
    const u = (attrs.real_src || attrs.src || '').trim()
    if (u) urls.push(u)
  }

  return urls
    .filter(isValidImageUrl)            // ← 新增：第二道防线
    .map(urlToPicFilename)
    .filter(Boolean)
}

function parseYearMonth(s: string): { year: number; month: number } | null {
  if (!s) return null
  const m = s.match(/^(\d{4})[-/.](\d{1,2})/)
  if (m) {
    const year = +m[1], month = +m[2]
    if (month >= 1 && month <= 12) return { year, month }
  }
  const d = new Date(s)
  if (!isNaN(d.getTime())) return { year: d.getFullYear(), month: d.getMonth() + 1 }
  return null
}

function splitFrontMatter(raw: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!m) return { fm: {} as Record<string, string>, body: raw }

  const fm: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([\w-]+)\s*:\s*(.*)$/)
    if (!mm) continue
    let v = mm[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    fm[mm[1].toLowerCase()] = v
  }
  return { fm, body: raw.slice(m[0].length) }
}

// ---------- 对外函数 ----------

/**
 * 按年份 → 月份归集博客图片，并统计所有年份的图片数量
 * @returns { yearData, yearlyCount }
 */
export function getImagesByMonth(options: GroupImagesOptions = {}): BlogImagesResult {
  const { year, excludeGif = false } = options

  let files: string[]
  try {
    files = readdirSync(BLOG_DIR).filter(f => /\.(md|markdown)$/i.test(f))
  } catch {
    return { yearData: [], yearlyCount: [] }
  }

  const items: Array<{ year: number; month: number; images: string[] }> = []

  for (const file of files) {
    let raw: string
    try { raw = readFileSync(join(BLOG_DIR, file), 'utf8') } catch { continue }

    const { fm, body } = splitFrontMatter(raw)
    const ym = parseYearMonth(fm.date || '')
    if (!ym) continue

    let imgs = extractImageFilenames(body)
    if (excludeGif) imgs = imgs.filter(u => !/\.gif$/i.test(u))
    if (!imgs.length) continue
    items.unshift({ year: ym.year, month: ym.month, images: imgs })//月份内降序
    // items.push({ year: ym.year, month: ym.month, images: imgs })//月份内升序
  }

  if (!items.length) return { yearData: [], yearlyCount: [] }

  // 按日期升序，保证月内图片顺序稳定
  items.sort((a, b) => (a.year - b.year) || (a.month - b.month))

  // 年份 → 月份 → 图片
  const byYear = new Map<number, Map<number, string[]>>()
  for (const it of items) {
    if (!byYear.has(it.year)) byYear.set(it.year, new Map())
    const mMap = byYear.get(it.year)!
    if (!mMap.has(it.month)) mMap.set(it.month, [])
    mMap.get(it.month)!.push(...it.images)
  }

  // ---- yearlyCount：所有年份的图片总数，年份降序 ----
  const yearlyCount: YearPicCount[] = Array.from(byYear.entries())
    .map(([y, mMap]) => {
      const picCount = Array.from(mMap.values()).reduce((sum, arr) => sum + arr.length, 0)
      return { year: String(y), picCount }
    })
    .sort((a, b) => Number(b.year) - Number(a.year))

  // ---- yearData：目标年份的按月归集 ----
  const targetYear = year ?? Math.max(...byYear.keys())
  const mMap = byYear.get(targetYear)

  const yearData: MonthEntry[] = mMap
    ? Array.from(mMap.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([mo, imgs]) => [String(mo), imgs] as MonthEntry)
    : []

  return { yearData, yearlyCount }
}