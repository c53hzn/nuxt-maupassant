<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const isOpen = ref(false)
const currentIndex = ref(0)
const images = ref([]) // 当前显示的图片列表

let keydownHandler = null

// -------- 控制方法 --------
function openGallery(newImages, index = 0) {
  if (!newImages || !newImages.length) return
  images.value = newImages
  currentIndex.value = Math.min(Math.max(index, 0), newImages.length - 1)
  isOpen.value = true
  document.body.style.overflow = 'hidden'
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

// -------- 键盘事件 --------
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

onMounted(() => {
  keydownHandler = handleKeydown
  document.addEventListener('keydown', keydownHandler)
})

onUnmounted(() => {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler)
  }
  document.body.style.overflow = ''
})

defineExpose({
  openGallery,
  close,
  next,
  prev,
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="image-zoom-overlay"
      @click.self="close"
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