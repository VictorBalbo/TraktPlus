<script setup lang="ts">
import '@egjs/vue3-flicking/dist/flicking.css'
import { ref } from 'vue'
import Carousel, { type FlickingOptions, type Plugin } from '@egjs/vue3-flicking'
import { AutoPlay, Pagination } from '@egjs/flicking-plugins'
import type { Media } from '@/models'

const { items, type } = defineProps<{ items: Media[]; type: 'backdrops' | 'posters' }>()
const plugins: Plugin[] = []

const config = ref<Partial<FlickingOptions>>()
if (type === 'backdrops') {
  config.value = {
    ...config.value,
    align: 'center',
    circular: true,
    circularFallback: 'linear',
    moveType: 'snap',
    preventClickOnDrag: true,
    defaultIndex: 0,
  }
  plugins.push(
    new AutoPlay({
      duration: 5000,
      direction: 'NEXT',
      stopOnHover: false,
    }),
  )
  plugins.push(
    new Pagination({
      type: 'bullet',
      renderActiveBullet: (className: string) =>
        `<span class="${className}"><span class="fill animation-fill"></span></span>`,
    }),
  )
} else if (type === 'posters') {
  config.value = {
    ...config.value,
    align: 'prev',
    circular: false,
    bound: true,
    bounce: '20%',
    moveType: 'freeScroll',
    preventClickOnDrag: true,
  }
}
const holdStart = () => {
  const activeBullet = document.querySelector('.flicking-pagination-bullet-active .fill')
  activeBullet?.classList.remove('animation-fill')
}
const holdStops = () => {
  const activeBullet = document.querySelector('.flicking-pagination-bullet-active .fill')
  activeBullet?.classList.add('animation-fill')
}
</script>
<template>
  <Carousel
    :options="config"
    :plugins="plugins"
    class="carousel"
    :class="type"
    @hold-start="holdStart"
    @hold-end="holdStops"
  >
    <section v-for="item in items" :key="item.title" class="item" :class="type">
      <img
        :src="item.images?.[type].file_path"
        class="img"
        @dragstart="(e) => e.preventDefault()"
      />
    </section>
    <template #viewport>
      <div class="flicking-pagination"></div>
      <span class="flicking-arrow-prev"></span>
      <span class="flicking-arrow-next"></span>
    </template>
  </Carousel>
</template>
<style scoped>
.item {
  margin: 0 var(--small-spacing);
  &.backdrops {
    aspect-ratio: 16/9;
    transition: all linear var(--default-transition);
    @media (max-width: 420px) {
      width: 85%;
    }
    @media (min-width: 420px) and (max-width: 640px) {
      width: 75%;
    }
    @media (min-width: 640px) and (max-width: 1080px) {
      width: 60%;
    }
    @media (min-width: 1080px) and (max-width: 2160px) {
      width: 50%;
    }
    @media (min-width: 2160px) and (max-width: 3160px) {
      width: 40%;
    }
    @media (min-width: 3160px) {
      width: 32.5%;
    }
  }
  &.posters {
    height: 200px;
    aspect-ratio: 2/3;
  }
  .img {
    border-radius: var(--large-spacing);
    width: 100%;
    height: 100%;
  }
}
</style>
<style>
.carousel {
  .flicking-pagination {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    text-align: center;
    z-index: 2;
  }
  .flicking-pagination-bullet {
    display: inline-block;
    width: var(--small-spacing);
    height: var(--small-spacing);
    margin: 0 var(--small-spacing);
    border-radius: var(--small-spacing);
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(10, 10, 10, 0.5);
    cursor: pointer;
  }
  .flicking-pagination-bullet-active {
    width: 1.5rem;
    overflow: hidden;
    .fill {
      display: block;
      border-radius: var(--small-spacing);
      background-color: var(--color-white);
      height: 100%;
      &.animation-fill {
        animation: normal linear pagination-fill 5s;
      }
    }
  }
}
@keyframes pagination-fill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
