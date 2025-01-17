<script setup lang="ts">
import { useTemplateRef } from 'vue'

const items = [
  {
    label: 'Section one',
  },
  {
    label: 'Section two',
  },
  {
    label: 'Section three',
  },
]

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
      <article v-for="item in items" :key="item.label" class="slider-item" ref="slider-item">
        <h2>{{ item.label }}</h2>
      </article>
    </section>
  </section>
</template>
<style scoped>
.carousel {
  position: relative;
  height: 300px;
  width: 100%;
}
.slider {
  height: 100%;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: both mandatory;
  scroll-behavior: smooth;

  .slider-item {
    min-height: 100%;
    min-width: 95%;
    padding: 10px;
    margin: 0 0.5rem;
    scroll-snap-align: center;
  }
  .slider-item:first-child {
    margin-left: 5%;
  }
  .slider-item:last-child {
    margin-right: 5%;
  }
  /* TODO: Remove this */
  .slider-item:nth-child(odd) {
    background-color: #ccc;
  }
  .slider-item:nth-child(even) {
    background-color: #333;
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.controls {
  height: 4rem;
  width: 2rem;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;
  color: #333;
  font-size: 3rem;
  opacity: 0.5;
  transition: opacity var(--default-transition);
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 1;
  }
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
}
</style>
