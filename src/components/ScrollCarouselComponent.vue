<script setup lang="ts">
import type { Media } from '@/models'

const { items } = defineProps<{ items: Media[] }>()
</script>

<template>
  <section class="slider">
    <article v-for="item in items" :key="item.title" class="slider-item">
      <img :src="item.images?.posters.file_path" class="item-img" />
    </article>
  </section>
</template>

<style scoped>
.slider {
  width: 100%;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: both mandatory;
  scroll-behavior: smooth;

  .slider-item {
    display: flex;
    flex-shrink: 0;
    height: 200px;
    margin: 0 var(--small-spacing);
    scroll-snap-align: center;
    overflow: hidden;
    position: relative;
    border-radius: var(--large-spacing);
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.item-img {
  width: 100%;
  object-fit: cover;
}
</style>
