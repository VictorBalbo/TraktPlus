<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { Episode, Media } from '@/models'
import { getImageSrc, getImageSrcSet } from '@/models/MediaImages'
import { MediaService } from '@/services'
import { Carousel, ScrollCarousel } from '@/components'

const recommendations = ref<Media[]>()
const trendingMovies = ref<Media[]>()
const trendingShows = ref<Media[]>()
const upNext = ref<Episode[]>()
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
      <h1>Up Next</h1>
      <ScrollCarousel :items="upNext" class="up-next">
        <template #default="item">
          <img
            :src="getImageSrc(item.images?.stills)"
            :srcset="getImageSrcSet(item.images?.stills)"
            sizes="(max-width: 720px) 200px, 250px"
            class="img"
            :title="item.show"
          />
          <article class="episode-titles">
            <h2 class="elipsis">{{ item.show }}</h2>
            <h4 class="elipsis">
              {{ item.season }}x{{ item.number.toString().padStart(2, '0') }} - {{ item.title }}
            </h4>
          </article>
        </template>
      </ScrollCarousel>
    </article>

    <article v-if="watchlist" class="content-article">
      <h1>Watchlist</h1>
      <ScrollCarousel :items="watchlist" />
    </article>

    <article v-if="trendingMovies" class="content-article">
      <h1>Trending Movies</h1>
      <ScrollCarousel :items="trendingMovies" />
    </article>

    <article v-if="trendingShows" class="content-article">
      <h1>Trending TV Shows</h1>
      <ScrollCarousel :items="trendingShows" />
    </article>
  </section>
</template>
<style scoped>
.content-article {
  margin: var(--large-spacing);
}

.up-next ::v-deep(.slide) {
  width: 250px;
  overflow: hidden;
  background-color: var(--color-background-soft);
  border-radius: var(--large-spacing);
  @media (max-width: 720px) {
    width: 200px;
  }
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
  }
}
</style>
