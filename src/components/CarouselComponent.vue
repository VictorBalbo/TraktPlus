<script setup lang="ts">
import type { Media } from '@/models'
import { useTemplateRef } from 'vue'

const { items } = defineProps<{ items: Media[] }>()

const slideItems = useTemplateRef('slider-item')
const slider = useTemplateRef('slider')

const moveSlider = (move: number) => {
  if (slider.value && slideItems.value) {
    const slideWidth = slider.value.firstElementChild?.clientWidth || 0
    slider.value.scrollLeft += move * slideWidth
  }
}
</script>
<template>
  <section class="carousel">
    <article class="controls left" @click="moveSlider(-1)">&#8249;</article>
    <article class="controls right" @click="moveSlider(+1)">&#8250;</article>
    <section class="slider" ref="slider">
      <article v-for="item in items" :key="item.title" class="slider-item" ref="slider-item">
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
  scroll-behavior: smooth;

  .slider-item {
    display: flex;
    flex-shrink: 0;
    width: 90%;
    max-width: 1440px;
    margin: 0 var(--small-spacing);
    scroll-snap-align: center;
    overflow: hidden;
    position: relative;
    border-radius: var(--large-spacing);

    &:first-child {
      margin-left: 10%;
    }
    &:last-child {
      margin-right: 10%;
    }
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
