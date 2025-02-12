<script setup lang="ts" generic="T extends Media | SeasonDetails | EpisodeDetails">
import { ref } from 'vue'
import { MediaType, type EpisodeDetails, type Media, type SeasonDetails } from '@/models'
import type { Episode } from '@/models/Media/Episode'
import { getImageSrc, getImageSrcSet, type MediaImages } from '@/models/MediaImages'
import type { SwiperOptions } from 'swiper/types'
import type { RouteLocationRaw } from 'vue-router'
import { Avatar } from '@/components'

const { items, imageType = 'poster' } = defineProps<{ items: T[]; imageType?: keyof MediaImages }>()
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
const getRouteToParams = (item: T) => {
  let to: RouteLocationRaw = {
    name: 'Detail',
    params: { type: item.type, id: item.ids.trakt },
  }
  if (item.type === MediaType.Season) {
    const season = item as SeasonDetails
    to = {
      name: 'SeasonDetail',
      params: { type: MediaType.Show, id: season.show.ids.trakt, seasonId: season.number },
    }
  } else if (item.type === MediaType.Episode) {
    const episode = item as Episode
    to = {
      name: 'SeasonDetail',
      params: {
        type: MediaType.Show,
        id: episode.show.ids.trakt,
        seasonId: episode.season,
        episodeId: episode.number,
      },
    }
  }
  return to
}
</script>

<template>
  <swiper-container v-bind="swiperOptions">
    <swiper-slide
      v-for="item in items"
      :key="item.ids.trakt"
      class="slide"
      :class="imageType"
      :lazy="item.images?.[imageType]"
    >
      <RouterLink :to="getRouteToParams(item)">
        <slot name="header" v-bind="item"></slot>
        <img
          v-if="item.images?.[imageType]"
          :src="getImageSrc(item.images, imageType)"
          :srcset="getImageSrcSet(item.images, imageType)"
          sizes="(max-width: 720px) 100px, 150px"
          class="img"
          :title="item.title"
        />
        <Avatar v-else :label="item.title[0]" class="avatar" size="xlarge" />

        <slot name="footer" v-bind="item"></slot>
      </RouterLink>
    </swiper-slide>
  </swiper-container>
</template>
<style scoped>
.slide {
  height: 100%;
  &.poster {
    width: 150px;
    @media (max-width: 720px) {
      width: 100px;
    }
    .img,
    .avatar {
      aspect-ratio: 2/3;
    }
  }
  &.still {
    width: 250px;
    .img,
    .avatar {
      aspect-ratio: 16/9;
    }
  }
  .img {
    border-radius: var(--large-spacing);
    width: 100%;
    height: 100%;
  }
  .avatar {
    width: 100%;
    height: 100%;
  }
}
</style>
