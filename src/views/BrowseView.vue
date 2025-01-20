<script setup lang="ts">
import CarouselComponent from '@/components/CarouselComponent.vue'
import type { Media } from '@/models/Media'
import { MediaService } from '@/services/MediaService'
import { ref } from 'vue'
const recommedations = ref<Media[]>([])
const loadRecomendations = async () => {
  console.log('load')
  recommedations.value = await MediaService.getRecommendations()
}
loadRecomendations()
</script>
<template>
  <section>
    <CarouselComponent :items="recommedations" />
  </section>
</template>
