export default defineEventHandler((event) => {
  const q = getQuery(event)
  const year = q.year ? Number(q.year) : undefined
  const excludeGif = q.excludeGif === '1' || q.excludeGif === 'true'
  return getImagesByMonth({ year, excludeGif })
})