<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, unref } from 'vue'

const props = defineProps({
  // 限定扫描范围的容器元素或选择器（也可传入 ref 对象）
  container: {
    type: [HTMLElement, String],
    default: null,
  },
})

const isOpen = ref(false)
const currentIndex = ref(0)
const images = ref([]) // 实际使用的图片列表

let containerEl = null
let clickHandler = null
let keydownHandler = null
let observer = null

// -------- 扫描容器内的图片 --------
function scanImages() {
  const propImages = unref(props.images)
  if (propImages && propImages.length) {
    images.value = propImages
    return
  }

  if (!containerEl) return
  const imgs = containerEl.querySelectorAll('img')
  const srcs = []
  imgs.forEach((img) => {
  	img.className += " zoomable"
    const src = img.dataset.src || img.src
    if (src) srcs.push(src)
  })
  images.value = srcs
}

// -------- 控制方法 --------
function open(index = 0) {
  if (!images.value.length) return
  currentIndex.value = Math.min(Math.max(index, 0), images.value.length - 1)
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  // 使覆盖层可聚焦，以便捕获键盘事件
  nextTick(() => {
    const overlay = document.querySelector('.image-zoom-overlay')
    if (overlay) overlay.focus()
  })
}

function close() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function next() {
  if (currentIndex.value < images.value.length - 1) currentIndex.value++
}

function prev() {
  if (currentIndex.value > 0) currentIndex.value--
}

// -------- 事件处理 --------
function handleImageClick(event) {
  const target = event.target
  if (target.tagName === 'IMG') {
    const src = target.dataset.src || target.src
    let idx = images.value.indexOf(src)
    // 若未找到，重新扫描（可能图片列表已更新）
    if (idx === -1) {
      scanImages()
      idx = images.value.indexOf(src)
    }
    if (idx !== -1) open(idx)
    event.preventDefault()
  }
}

function handleKeydown(event) {
  if (!isOpen.value) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    prev()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  } else if (event.key === 'Escape') {
    close()
  }
}

// -------- 设置容器与监听 --------
function setupContainer() {
  const rawContainer = unref(props.container)
  if (rawContainer) {
    if (typeof rawContainer === 'string') {
      containerEl = document.querySelector(rawContainer)
    } else if (rawContainer instanceof HTMLElement) {
      containerEl = rawContainer
    }
  }
  if (!containerEl) containerEl = document

  // 先扫描一次
  scanImages()

  // 事件代理监听点击（即便图片动态添加也能捕获）
  if (clickHandler) {
    containerEl.removeEventListener('click', clickHandler)
  }
  clickHandler = handleImageClick
  containerEl.addEventListener('click', clickHandler)

  // 若未传入 images，则使用 MutationObserver 自动监听新增/修改的图片
  if (!unref(props.images) && containerEl !== document) {
    if (observer) observer.disconnect()
    observer = new MutationObserver(() => scanImages())
    observer.observe(containerEl, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'data-src'],
    })
  }
}

// -------- 生命周期 --------
onMounted(() => {
  setupContainer()
  keydownHandler = handleKeydown
  document.addEventListener('keydown', keydownHandler)
})

onUnmounted(() => {
  if (containerEl && clickHandler) {
    containerEl.removeEventListener('click', clickHandler)
  }
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler)
  }
  if (observer) observer.disconnect()
  document.body.style.overflow = ''
})

// 若外部传入 images，监听变化
watch(
  () => props.images,
  (newVal) => {
    if (newVal && newVal.length) {
      images.value = newVal
    }
  },
  { immediate: true },
)

// 暴露方法给父组件
defineExpose({
  open,
  close,
  next,
  prev,
  refresh: scanImages,
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="image-zoom-overlay"
      @click.self="close"
      @keydown.esc="close"
      tabindex="-1"
    >
      <button
        class="zoom-btn prev"
        @click.stop="prev"
        :disabled="currentIndex === 0"
        aria-label="上一张"
      >
        &#10094;
      </button>
      <img
        :src="images[currentIndex]"
        alt="放大图片"
        class="zoom-image"
        @click.stop="close"
      />
      <button
        class="zoom-btn next"
        @click.stop="next"
        :disabled="currentIndex === images.length - 1"
        aria-label="下一张"
      >
        &#10095;
      </button>
    </div>
  </Teleport>
</template>

<style>
.image-zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
  outline: none;
}
.zoomable {
	cursor: pointer;
}
.zoom-image {
  max-width: 100vw;
  max-height: 100vh;
  width: auto;
  height: auto;
  object-fit: contain;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
}
.zoom-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  font-size: 2.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  z-index: 10;
  user-select: none;
}
.zoom-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
.zoom-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.zoom-btn.prev {
  left: 20px;
}
.zoom-btn.next {
  right: 20px;
}
@media (max-width: 640px) {
  .zoom-btn {
    font-size: 1.8rem;
    padding: 0.3rem 0.6rem;
  }
  .zoom-btn.prev {
    left: 10px;
  }
  .zoom-btn.next {
    right: 10px;
  }
}
</style>