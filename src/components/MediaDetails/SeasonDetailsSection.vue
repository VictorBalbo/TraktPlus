<script setup lang="ts">
import dayjs from 'dayjs'
import type { SeasonDetails } from '@/models'

const { season } = defineProps<{ season: SeasonDetails }>()
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
  <h3>{{ season.episode_count }} Episodes</h3>
  <p v-if="season.aired_episodes && season.aired_episodes !== season.episode_count">
    <small> Episodes Aired: </small> {{ season.aired_episodes }}
  </p>
  <p v-if="season.runtime"><small> Runtime: </small> {{ getDisplayTime(season.runtime) }}</p>
  <p v-if="season.runtime && season.episode_count">
    <small> Avg Episode Runtime: </small>
    {{ getDisplayTime(Math.round(season.runtime / season.episode_count)) }}
  </p>

  <p v-if="season.genres?.length">
    <small> Genres: </small>
    {{ season.genres?.map((g) => `${g[0].toUpperCase()}${g.slice(1)}`).join(', ') }}
  </p>

  <p v-if="season.credits?.crew.directing?.length">
    <small> Directed by </small>
    {{ season.credits?.crew.directing?.map((c) => c.person.name).join(', ') }}
  </p>
  <p v-if="season.credits?.crew['created by']?.length">
    <small> Created by </small>
    {{ season.credits?.crew['created by']?.map((c) => c.person.name).join(', ') }}
  </p>

  <p v-if="season.released">
    <small>
      {{ dayjs(season.released).isBefore(dayjs()) ? 'First aired on' : 'Premieres on' }}
    </small>
    {{ season.network }} <small> in </small> {{ dayjs(season.released).format('MMM DD, YYYY') }}
  </p>
</template>
