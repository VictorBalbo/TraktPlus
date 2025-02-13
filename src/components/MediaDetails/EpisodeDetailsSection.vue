<script setup lang="ts">
import dayjs from 'dayjs'
import type { EpisodeDetails } from '@/models'

const { episode } = defineProps<{ episode: EpisodeDetails }>()
const getDisplayTime = (totalMinutes: number = 0) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes} m`
  } else if (minutes === 0) {
    return `${hours} h`
  } else {
    return `${hours}h ${minutes}m`
  }
}
</script>

<template>
  <h3>{{ getDisplayTime(episode.runtime) }}</h3>
  <p v-if="episode.genres?.length">
    <small> Genres: </small>
    {{ episode.genres?.map((g) => `${g[0].toUpperCase()}${g.slice(1)}`).join(', ') }}
  </p>

  <p v-if="episode.credits?.crew.directing?.length">
    <small> Directed by </small>
    {{ episode.credits?.crew.directing?.map((c) => c.person.name).join(', ') }}
  </p>
  <p v-if="episode.credits?.crew.writing?.length">
    <small> Written by </small>
    {{ episode.credits.crew.writing.map((c) => c.person.name).join(', ') }}
  </p>
  <p v-if="episode.credits?.crew['created by']?.length">
    <small> Created by </small>
    {{ episode.credits?.crew['created by']?.map((c) => c.person.name).join(', ') }}
  </p>

  <p v-if="episode.released">
    <small>
      {{ dayjs(episode.released).isBefore(dayjs()) ? 'First aired on' : 'Premieres on' }}
    </small>
    {{ dayjs(episode.released).format('MMM DD, YYYY') }}
  </p>
</template>
