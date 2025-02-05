<script setup lang="ts">
import { MediaType, type MovieDetails, type Ratings } from '@/models'
import { MediaService, RatingService } from '@/services'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getImageSrc, getImageSrcSet } from '@/models/MediaImages'
import dayjs from 'dayjs'

const route = useRoute()
const mediaType = route.params.type as MediaType
const mediaId = route.params.id as string
const media = ref<MovieDetails>()
const ratings = ref<Ratings[]>()

const loadMedia = async () => {
  media.value = await MediaService.getMediaDetail(mediaType, mediaId)
  ratings.value = RatingService.getMediaRatings(media.value)
}
loadMedia()

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

const getDisplayProviderType = (providerType: string) => {
  switch (providerType.toLowerCase()) {
    case 'flatrate':
      return 'Stream'
    case 'cinema':
      return 'Cinema'
    case 'rent':
      return 'Rent'
    case 'buy':
      return 'Buy'
  }
}
</script>

<template>
  <section>
    <img
      :src="getImageSrc(media?.images?.backdrops)"
      :srcset="getImageSrcSet(media?.images?.backdrops)"
      :alt="media?.title"
      :title="media?.title"
      class="banner"
    />
    <section class="media-info">
      <aside class="side-info">
        <img
          :src="getImageSrc(media?.images?.posters)"
          :srcset="getImageSrcSet(media?.images?.posters)"
          :alt="media?.title"
          :title="media?.title"
          sizes="200px"
          class="poster"
        />
      </aside>
      <main class="main-info">
        <article class="title">
          <h1>
            {{ media?.title }}
            <span class="subtitle">{{ media?.year }}</span>
          </h1>
        </article>
        <section class="ratings">
          <a v-for="rating in ratings" :key="rating.provider" :href="rating.weblink" class="rating">
            <img :src="rating.icon" :alt="rating.provider" />
            <p class="">
              {{ rating.score }}
              <small class="unit">{{ rating.unit }} </small>
            </p>
          </a>
        </section>
        <section class="info-section">
          <h3 v-if="!media?.tagline">Description</h3>
          <blockquote v-else>{{ media.tagline }}</blockquote>
          <p>
            {{ media?.overview }}
          </p>
        </section>
        <section class="info-section">
          <h3>
            {{ getDisplayTime(media?.runtime ?? 0) }}
          </h3>
          <p>
            {{ media?.genres.map((g) => `${g[0].toUpperCase()}${g.slice(1)}`).join(', ') }}
          </p>
          <small> Released on {{ dayjs(media?.released).format('DD/MM/YYYY') }} </small>
        </section>
        <section class="info-section">
          <b>Where to Watch</b>
          <article class="providers-section">
            <a
              v-for="provider in media?.providers"
              :key="provider.provider.name"
              :href="provider.providerUri"
              class="provider"
            >
              <img :src="`https://images.justwatch.com/${provider.provider.icon}`" />
              <small>{{ getDisplayProviderType(provider.monetizationType) }}</small>
            </a>
          </article>
        </section>
      </main>
    </section>
  </section>
</template>

<style scoped>
.banner {
  width: 100%;
  height: 50%;
  max-height: 40vh;
  object-fit: cover;
  position: relative;

  --mask: linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0));
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
}
.media-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.side-info {
  width: 200px;
  flex: auto 0 0;
  margin-top: -8rem;
  padding: 0 var(--small-spacing);
  z-index: 1;
  .poster {
    width: 100%;
  }
}
.main-info {
  width: 100%;
  max-width: 80%;
  margin-top: -4rem;
  z-index: 1;

  .subtitle {
    color: var(--color-subheader);
    font-size: 1.25rem;
    font-weight: 600;
  }
  .ratings {
    display: flex;
    .rating {
      margin-right: var(--large-spacing);
      display: flex;
      align-items: center;

      img {
        height: 1.5rem;
        margin: 0 var(--small-spacing);
      }
    }
  }
  .info-section {
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-soft);
    border-radius: var(--large-spacing);
    padding: var(--small-spacing) var(--large-spacing);
    margin: var(--small-spacing) 0;
  }
  .providers-section {
    display: flex;
    margin-top: var(--small-spacing);
    .provider {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: var(--large-spacing);
      img {
        width: 75px;
        border-radius: var(--small-spacing);
      }
    }
  }
}
</style>
