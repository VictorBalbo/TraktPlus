<script setup lang="ts">
import type { Media } from '@/models'
import { useTemplateRef, watch, watchEffect } from 'vue'

const { items } = defineProps<{ items: Media[] }>()
const slider = useTemplateRef<HTMLElement>('slider')
const slides = useTemplateRef<HTMLElement[]>('slides')

const moveSlider = (move: number) => {
  if (slider.value) {
    const slideWidth = slider.value.firstElementChild?.clientWidth || 0
    slider.value.scrollLeft += move * slideWidth
  }
}
const slidesToCopy = 2
watch([() => slides.value], () => {
  if (!slides.value || slides.value.length < 2) {
    return
  }
  // Clone first and last slides
  slider.value?.scrollTo(0, 0)
  for (let i = 0; i < slidesToCopy; i++) {
    const leftSlideClone = slides.value[i].cloneNode(true)
    const rightSlideClone = slides.value[slides.value.length - i - 1].cloneNode(true)
    slider.value?.prepend(rightSlideClone)
    slider.value?.append(leftSlideClone)
  }

  let scrollTimer: number
  slider.value?.addEventListener('scroll', () => {
    // Cancel if scroll continues
    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }
    scrollTimer = setTimeout(() => {
      const slideWidth = slides.value?.[0].clientWidth || 0
      const slideQuatity = slides.value?.length || 0
      if (slider.value && slider.value.scrollLeft < slideWidth * (slidesToCopy - 0.5)) {
        jumpToEnd()
      }
      if (
        slider.value &&
        slider.value.scrollLeft > slideWidth * (slideQuatity + slidesToCopy - 0.5)
      ) {
        jumpToStart()
      }
    }, 100)
  })
})
const jumpToStart = () => {
  slider.value?.classList.remove('smooth-scroll')
  // wait for smooth scroll to be disabled
  setTimeout(() => {
    const slideWidth = slides.value?.[0].clientWidth || 0
    slider.value?.scrollTo(slideWidth * slidesToCopy, 0)
    slider.value?.classList.add('smooth-scroll')
  }, 10)
}
const jumpToEnd = () => {
  slider.value?.classList.remove('smooth-scroll')
  // wait for smooth scroll to be disabled
  setTimeout(() => {
    const slideWidth = slides.value?.[0].clientWidth || 0
    const slideQuatity = slides.value?.length || 0
    slider.value?.scrollTo(slideWidth * (slideQuatity + slidesToCopy - 1), 0)
    slider.value?.classList.add('smooth-scroll')
  }, 10)
}
</script>
<template>
  <section class="carousel">
    <article class="controls left" @click="moveSlider(-1)">&#8249;</article>
    <article class="controls right" @click="moveSlider(+1)">&#8250;</article>
    <section class="slider smooth-scroll" ref="slider">
      <article v-for="item in items" :key="item.title" class="slider-item" ref="slides">
        <img :src="item.images!.backdrops.file_path" class="item-img" />
        <h2 class="item-title">{{ item.title }}</h2>
      </article>
    </section>
  </section>
</template>
<style scoped>
.carousel {
  position: relative;
  width: 100%;
}
.slider {
  height: 100%;
  width: 100%;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: both mandatory;
  /* scroll-behavior: smooth; */
  &.smooth-scroll {
    scroll-behavior: smooth;
  }

  .slider-item {
    display: flex;
    flex-shrink: 0;
    width: 90%;
    max-width: 720px;
    margin: 0 var(--small-spacing);
    scroll-snap-align: center;
    scroll-snap-stop: always;
    overflow: hidden;
    position: relative;
    border-radius: var(--large-spacing);
  }
  @media (min-width: 1024px) {
    .slider-item {
      background-color: red;
    }
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.controls {
  height: 3rem;
  width: 3rem;
  border-radius: 3rem;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto var(--large-spacing);
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 3rem;
  opacity: 0.3;
  transition: opacity var(--default-transition);
  cursor: pointer;
  z-index: 1;

  &:hover {
    opacity: 1;
  }
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
}
.item-img {
  width: 100%;
  object-fit: cover;
  /* visibility: hidden; */
}
.item-title {
  color: var(--color-text);
  background-color: var(--color-background);
  position: absolute;
  bottom: var(--large-spacing);
  left: var(--large-spacing);
}
</style>
