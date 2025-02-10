<script setup lang="ts" generic="T extends Media">
import type { Media } from '@/models'
import { getImageSrc, getImageSrcSet } from '@/models/MediaImages'
import type { SwiperOptions } from 'swiper/types'
import { ref } from 'vue'

const { items } = defineProps<{ items: T[] }>()
const swiperOptions = ref<SwiperOptions>({
  spaceBetween: 16,
  slidesPerView: 'auto',
  loop: false,
  centeredSlides: false,
  pagination: false,
  autoplay: false,
  freeMode: true,
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
})
</script>

<template>
  <swiper-container v-bind="swiperOptions">
    <swiper-slide v-for="item in items" :key="item.ids.trakt" class="slide" lazy="true">
      <RouterLink :to="{ name: 'Detail', params: { type: item.type, id: item.ids.trakt } }">
        <img
          v-if="!$slots.default"
          :src="getImageSrc(item.images, item.images?.poster ? 'poster' : 'still')"
          :srcset="getImageSrcSet(item.images, item.images?.poster ? 'poster' : 'still')"
          sizes="(max-width: 720px) 100px, 150px"
          class="img"
          :title="item.title"
        />
        <slot v-else v-bind="item"></slot>
      </RouterLink>
    </swiper-slide>
  </swiper-container>
</template>
<style scoped>
.slide {
  width: 150px;
  height: 100%;
  @media (max-width: 720px) {
    width: 100px;
  }
  .img {
    border-radius: var(--large-spacing);
    width: 100%;
    aspect-ratio: 2/3;
    height: 100%;
  }
}
</style>
