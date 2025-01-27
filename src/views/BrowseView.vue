<script setup lang="ts">
import { ref } from 'vue'
import type { Media } from '@/models'
import { MediaService } from '@/services'
import { CarouselComponent, ScrollCarousel } from '@/components'

const recommendations = ref<Media[]>([])
const loadRecomendations = async () => {
  recommendations.value = await MediaService.getRecommendations()
}
loadRecomendations()
</script>
<template>
  <section>
    <CarouselComponent :items="recommendations" type="backdrops" />
    Trending Movies
    <CarouselComponent :items="recommendations" type="posters" class="poster-carousel" />

    Trending TV Shows
    <ScrollCarousel :items="recommendations" class="poster-carousel" />
  </section>
</template>
<style scoped></style>
