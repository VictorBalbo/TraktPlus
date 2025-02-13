<script setup lang="ts">
import dayjs from 'dayjs'
import type { MovieDetails } from '@/models'
import { MovieStatus } from '@/models/Media/Media'

const { movie } = defineProps<{ movie: MovieDetails }>()
const getDisplayTime = (totalMinutes: number) => {
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
  <h3>
    {{ getDisplayTime(movie?.runtime ?? 0) }}
  </h3>

  <p v-if="movie?.genres?.length">
    <small> Genres: </small>
    {{ movie?.genres?.map((g) => `${g[0].toUpperCase()}${g.slice(1)}`).join(', ') }}
  </p>

  <p v-if="movie?.credits?.crew.directing?.length">
    <small> Directed by </small>
    {{ movie.credits?.crew.directing?.map((c) => c.person.name).join(', ') }}
  </p>
  <p v-if="movie?.credits?.crew['created by']?.length">
    <small> Created by </small>
    {{ movie.credits?.crew['created by']?.map((c) => c.person.name).join(', ') }}
  </p>

  <p v-if="movie.released">
    <small>
      {{ movie.status === MovieStatus.Released ? 'Released on' : 'Premieres on' }}
    </small>
    {{ dayjs(movie.released).format('MMM DD, YYYY') }}
  </p>

  <p v-if="movie?.status">
    <small> Movie status is: </small>
    {{ movie.status }}
  </p>
</template>
