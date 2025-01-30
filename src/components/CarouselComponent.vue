<script setup lang="ts">
import type { Media } from '@/models'
import type { SwiperOptions } from 'swiper/types'
import { ref } from 'vue'

const { items, type } = defineProps<{ items: Media[]; type: 'backdrops' | 'posters' }>()
const swiperOptions = ref<SwiperOptions>({
  spaceBetween: 16,
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
})

if (type === 'backdrops') {
  swiperOptions.value = {
    ...swiperOptions.value,
    slidesPerView: 1.15,
    breakpoints: {
      320: {
        slidesPerView: 1.25,
      },
      480: {
        slidesPerView: 1.5,
      },
      1440: {
        slidesPerView: 2,
      },
      2160: {
        slidesPerView: 'auto',
      },
    },
    loop: true,
    centeredSlides: true,
    pagination: {
      enabled: true,
      clickable: true,
    },
    autoplay: true,
  }
} else if (type === 'posters') {
  swiperOptions.value = {
    ...swiperOptions.value,
    slidesPerView: 'auto',
    loop: false,
    centeredSlides: false,
    pagination: false,
    autoplay: false,
  }
}
</script>

<template>
  <swiper-container ref="swiper" v-bind="swiperOptions">
    <swiper-slide v-for="item in items" :key="item.ids.trakt" class="slide" :class="type">
      <img
        :src="item.images?.[type].file_path"
        class="img"
        @dragstart="(e) => e.preventDefault()"
      />
    </swiper-slide>
  </swiper-container>
</template>
<style scoped>
.slide {
  &.backdrops {
    width: 100%;
    max-width: 1080px;
    height: 100%;
    aspect-ratio: 16/9;
  }
  &.posters {
    width: auto;
    height: 200px;
    aspect-ratio: 2/3;
  }
  .img {
    border-radius: var(--large-spacing);
    width: 100%;
    height: 100%;
  }
}
swiper-container::part(button-prev) {
  @media (hover: hover) and (pointer: fine) {
    display: none;
  }
}
</style>
<style>
:root {
  --swiper-pagination-bullet-inactive-opacity: 0.6;
}
</style>
