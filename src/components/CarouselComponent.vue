<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation, type CarouselConfig } from 'vue3-carousel'
import type { Media } from '@/models'
const { items, type } = defineProps<{ items: Media[]; type: 'backdrops' | 'posters' }>()
const getItemsToShow = () => {
  if (window.innerWidth < 420) {
    return 1.15
  }
  if (window.innerWidth < 640) {
    return 1.25
  }
  if (window.innerWidth < 1080) {
    return 1.5
  }
  if (window.innerWidth < 2160) {
    return 2
  }
  return 3
}
let config: Partial<CarouselConfig> = {
  gap: 16,
}
if (type === 'backdrops') {
  config = {
    ...config,
    wrapAround: true,
    pauseAutoplayOnHover: true,
    autoplay: 5000,
    itemsToShow: getItemsToShow(),
    breakpointMode: 'carousel',
  }
} else if (type === 'posters') {
  config = {
    ...config,
    wrapAround: false,
    pauseAutoplayOnHover: false,
    autoplay: 0,
    itemsToShow: 'auto',
    height: 200,
  }
}
</script>
<template>
  <Carousel v-bind="config" :class="type">
    <Slide v-for="item in items" :key="item.title" class="slide">
      <img :src="item.images?.[type].file_path" class="img" />
    </Slide>

    <template v-if="type === 'backdrops'" #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
<style scoped>
.img {
  width: 100%;
  object-fit: cover;
  border-radius: var(--large-spacing);
}
.posters .img {
  height: 200px;
}
</style>
<style>
:root {
  --vc-pgn-active-color: white;
  --vc-pgn-background-color: rgba(0, 0, 0, 0.6);
  --vc-pgn-border-radius: var(--small-spacing);
  --vc-pgn-height: var(--small-spacing);
  --vc-pgn-width: var(--large-spacing);
}
.carousel__pagination-button {
  border: 1px solid rgba(255, 255, 255, 0.6);
}
</style>
