<script setup lang="ts">
import type { Media } from '@/models'
import { getImageSrc, getImageSrcSet } from '@/models/MediaImages'
import type { SwiperOptions } from 'swiper/types'
import { ref } from 'vue'

const { items } = defineProps<{ items: Media[] }>()
const swiperOptions = ref<SwiperOptions>({
  spaceBetween: 16,
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
  autoplay: {
    delay: 5000,
  },
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
})
</script>

<template>
  <swiper-container v-bind="swiperOptions">
    <swiper-slide v-for="item in items" :key="item.ids.trakt" class="slide">
      <RouterLink :to="{ name: 'Detail', params: { type: item.type, id: item.ids.trakt } }">
        <img
          :src="getImageSrc(item.images?.backdrops)"
          :srcset="getImageSrcSet(item.images?.backdrops)"
          class="img"
          :title="item.title"
        />
      </RouterLink>
    </swiper-slide>
  </swiper-container>
</template>
<style scoped>
.slide {
  max-width: 1080px;
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
  .img {
    border-radius: var(--large-spacing);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
<style>
:root {
  --swiper-pagination-bullet-inactive-opacity: 0.6;
}
</style>
