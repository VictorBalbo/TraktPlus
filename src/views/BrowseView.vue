<script setup lang="ts">
import { ref } from 'vue'
import type { Media } from '@/models'
import { MediaService } from '@/services'
import { CarouselComponent } from '@/components'

const recommendations = ref<Media[]>()
const trendingMovies = ref<Media[]>()
const trendingShows = ref<Media[]>()
const loadRecomendations = async () => {
  recommendations.value = (await MediaService.getRecommendations()) as Media[]
  trendingMovies.value = (await MediaService.getTrending('movie')) as Media[]
  trendingShows.value = (await MediaService.getTrending('show')) as Media[]
}
loadRecomendations()
</script>
<template>
  <section>
    <CarouselComponent v-if="recommendations" :items="recommendations" type="backdrops" />
    Trending Movies
    <CarouselComponent v-if="trendingMovies" :items="trendingMovies" type="posters" />

    Trending TV Shows
    <CarouselComponent v-if="trendingShows" :items="trendingShows" type="posters" />
  </section>
</template>
<style scoped></style>
