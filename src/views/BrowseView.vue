<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { EpisodeDetails, Media } from '@/models'
import { MediaService } from '@/services'
import { Carousel, ScrollCarousel } from '@/components'

const recommendations = ref<Media[]>()
const trendingMovies = ref<Media[]>()
const trendingShows = ref<Media[]>()
const upNext = ref<EpisodeDetails[]>()
const watchlist = ref<Media[]>()

const loadContent = async <T,>(variable: Ref<T>, responsePromise: Promise<T>) => {
  variable.value = await responsePromise
}

loadContent(recommendations, MediaService.getRecommendations())
loadContent(trendingMovies, MediaService.getTrending('movie'))
loadContent(trendingShows, MediaService.getTrending('show'))
loadContent(upNext, MediaService.getUpNext())
loadContent(watchlist, MediaService.getWatchlist())
</script>
<template>
  <section>
    <Carousel v-if="recommendations" :items="recommendations" />
    <article v-if="upNext" class="content-article">
      <h2>Up Next</h2>
      <ScrollCarousel :items="upNext" imageType="still" class="up-next">
        <template #footer="item">
          <article class="episode-titles">
            <p class="elipsis">{{ item.show.title }}</p>
            <small class="elipsis">
              {{ item.season }}x{{ item.number.toString().padStart(2, '0') }} - {{ item.title }}
            </small>
          </article>
        </template>
      </ScrollCarousel>
    </article>

    <article v-if="watchlist" class="content-article">
      <h2>Watchlist</h2>
      <ScrollCarousel :items="watchlist" />
    </article>

    <article v-if="trendingMovies" class="content-article">
      <h2>Trending Movies</h2>
      <ScrollCarousel :items="trendingMovies" />
    </article>

    <article v-if="trendingShows" class="content-article">
      <h2>Trending TV Shows</h2>
      <ScrollCarousel :items="trendingShows" />
    </article>
  </section>
</template>
<style scoped>
.content-article {
  margin: var(--large-spacing);
}

.img {
  width: 100%;

  aspect-ratio: 16/9;
}
.episode-titles {
  padding: 0 var(--small-spacing) var(--small-spacing);
  .elipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
}
</style>
