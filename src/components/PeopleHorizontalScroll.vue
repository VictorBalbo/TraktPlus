<script setup lang="ts" generic="T extends CastCrewMember">
import type { CastCrewMember } from '@/models/People'
import type { SwiperOptions } from 'swiper/types'
import { ref } from 'vue'
import { Avatar } from '@/components'

const { items } = defineProps<{ items: T[] }>()
const swiperOptions = ref<SwiperOptions>({
  spaceBetween: 8,
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
  <swiper-container v-bind="swiperOptions" class="slider">
    <swiper-slide
      v-for="item in items"
      :key="item.person.ids.trakt"
      class="slide"
      :lazy="!!item.images.headshot?.[0]"
    >
      <img
        v-if="item.images.headshot?.[0]"
        :src="'https://' + item.images.headshot[0]"
        class="img"
        :title="item.person.name"
      />
      <Avatar v-else shape="circle" :label="item.person.name[0]" class="avatar" size="xlarge" />
      <p class="person-name">{{ item.person.name }}</p>
      <small v-for="job in item.characters ?? item.jobs" :key="job" class="person-job" :title="job">
        {{ job }}
      </small>
      <small v-if="item.episode_count" class="episodes-count">
        {{ item.episode_count }} episodes
      </small>
    </swiper-slide>
  </swiper-container>
</template>
<style scoped>
.slider {
  margin: 0 var(--large-spacing);
}
.slide {
  width: 125px;
  text-align: center;
  font-size: 0.875rem;

  .avatar {
    --p-avatar-xl-width: 100px;
    margin-bottom: 0.4rem;
  }
  .img {
    width: 100px;

    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 10rem;
  }
  .person-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .person-job {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .episodes-count {
    font-size: 0.75rem;
  }
}
</style>
