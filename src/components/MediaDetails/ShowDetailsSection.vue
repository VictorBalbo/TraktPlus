<script setup lang="ts">
import dayjs from 'dayjs'
import type { ShowDetails } from '@/models'
import { ShowStatus } from '@/models/Media/Media'

const { show } = defineProps<{ show: ShowDetails }>()
</script>

<template>
  <h3>{{ show.episodes }} Episodes</h3>

  <p v-if="show.aired_episodes !== show.episodes">
    <small> Episodes Aired: </small>
    {{ show.aired_episodes }}
  </p>

  <p v-if="show.genres?.length">
    <small> Genres: </small>
    {{ show.genres.map((g) => `${g[0].toUpperCase()}${g.slice(1)}`).join(', ') }}
  </p>

  <p v-if="show.credits?.crew.directing?.length">
    <small> Directed by </small>
    {{ show.credits.crew.directing?.map((c) => c.person.name).join(', ') }}
  </p>
  <p v-if="show.credits?.crew['created by']?.length">
    <small> Created by </small>
    {{ show.credits.crew['created by']?.map((c) => c.person.name).join(', ') }}
  </p>

  <p v-if="show.released">
    <small>
      {{
        show.status === ShowStatus.Continuing || show.status === ShowStatus.ReturningSearies
          ? 'First aired on'
          : 'Premieres on'
      }}
    </small>
    {{ show.network }}
    <small> in </small>
    {{ dayjs(show.released).format('MMM DD, YYYY') }}
  </p>

  <p v-if="show.status">
    <small> Show status is: </small>
    {{ show.status }}
  </p>
</template>
