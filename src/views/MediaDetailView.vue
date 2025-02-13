<script setup lang="ts" generic="T extends MovieDetails | ShowDetails">
import { MediaType, type MovieDetails, type Ratings, type ShowDetails } from '@/models'
import { MediaService, RatingService } from '@/services'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getImageSrc, getImageSrcSet } from '@/models/MediaImages'
import dayjs from 'dayjs'
import { PeopleHorizontalScroll, ScrollCarousel, Tag } from '@/components'
import { MovieStatus, ShowStatus } from '@/models/Media/Media'

const route = useRoute()
const media = ref<T>()
const ratings = ref<Ratings[]>()

const loadMedia = async () => {
  const mediaType = route.params.type as MediaType
  const mediaId = route.params.id as string
  const seasonId = route.params.seasonId as string

  media.value = await MediaService.getMediaDetail(mediaType, mediaId, seasonId)
  if (media.value) {
    ratings.value = RatingService.getMediaRatings(media.value)
  }
}
loadMedia()

const people = computed(() => [
  ...(media.value?.credits?.cast ?? []),
  ...(media.value?.credits?.crew['created by'] ?? []),
  ...(media.value?.credits?.crew.directing ?? []),
  ...(media.value?.credits?.crew.writing ?? []),
])

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
      :src="getImageSrc(media?.images, 'backdrop')"
      :srcset="getImageSrcSet(media?.images, 'backdrop')"
      :alt="media?.title"
      :title="media?.title"
      class="banner"
    />
    <section class="media-info">
      <aside class="side-info">
        <img
          :src="getImageSrc(media?.images, 'poster')"
          :srcset="getImageSrcSet(media?.images, 'poster')"
          :alt="media?.title"
          :title="media?.title"
          sizes="200px"
          class="poster"
        />
      </aside>
      <main class="main-info">
        <article>
          <h1 class="title">
            {{ media?.title }}
            <span v-if="media?.released" class="subtitle">{{
              dayjs(media?.released).format('YYYY')
            }}</span>
            <Tag v-if="media?.certification" :value="media?.certification" class="certification" />
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
          <h3 v-if="media?.type === MediaType.Movie">
            {{ getDisplayTime(media?.runtime ?? 0) }}
          </h3>
          <h3 v-else-if="media?.type === MediaType.Show">{{ media.episodes }} Episodes</h3>

          <p v-if="media?.type === MediaType.Show && media.aired_episodes !== media.episodes">
            <small> Episodes Aired: </small>
            {{ media.aired_episodes }}
          </p>

          <p v-if="media?.genres?.length">
            <small> Genres: </small>
            {{ media?.genres?.map((g) => `${g[0].toUpperCase()}${g.slice(1)}`).join(', ') }}
          </p>

          <p v-if="media?.credits?.crew.directing?.length">
            <small> Directed by </small>
            {{ media.credits?.crew.directing?.map((c) => c.person.name).join(', ') }}
          </p>
          <p v-if="media?.credits?.crew['created by']?.length">
            <small> Created by </small>
            {{ media.credits?.crew['created by']?.map((c) => c.person.name).join(', ') }}
          </p>

          <p v-if="media?.type === MediaType.Movie && media.released">
            <small>
              {{ media.status === MovieStatus.Released ? 'Released on' : 'Premieres on' }}
            </small>
            {{ dayjs(media.released).format('MMM DD, YYYY') }}
          </p>
          <p v-if="media?.type === MediaType.Show && media.released">
            <small>
              {{
                media.status === ShowStatus.Continuing ||
                media.status === ShowStatus.ReturningSearies
                  ? 'First aired on'
                  : 'Premieres on'
              }}
            </small>
            {{ media.network }}
            <small> in </small>
            {{ dayjs(media.released).format('MMM DD, YYYY') }}
          </p>

          <p v-if="media?.status">
            <small> {{ media?.type === MediaType.Show ? 'Show' : 'Movie' }} status is: </small>
            {{ media.status }}
          </p>
        </section>
        <section v-if="media?.tagline || media?.overview" class="info-section">
          <h3 v-if="!media?.tagline">Description</h3>
          <blockquote v-else>{{ media.tagline }}</blockquote>
          <p>
            {{ media?.overview }}
          </p>
        </section>
        <section class="info-section">
          <h3>Where to Watch</h3>
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
            <p v-if="!media?.providers?.length">
              <b>{{ media?.title }}</b> is not available anywhere now
            </p>
          </article>
        </section>
        <section
          v-if="media?.type === MediaType.Show && media.seasons?.length"
          class="info-section seasons-section"
        >
          <h3>Seasons</h3>
          <ScrollCarousel :items="media.seasons" :showId="media.ids.trakt">
            <template #footer="season">
              <article class="season-title">
                {{ season.title }}
                <small v-if="season.episode_count"> {{ season.episode_count }} Episodes</small>
              </article>
            </template>
          </ScrollCarousel>
        </section>
        <section
          v-if="media?.credits && (media.credits.cast.length || media.credits.crew)"
          class="info-section people-section"
        >
          <h3>Cast and Crew</h3>
          <PeopleHorizontalScroll :items="people" />
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

  .title {
    margin-bottom: var(--small-spacing);
  }

  .subtitle {
    color: var(--color-subheader);
    font-size: 1.25rem;
    font-weight: 600;
  }
  .certification {
    margin-left: var(--small-spacing);
    --p-tag-primary-background: #00000066;
    --p-tag-primary-color: var(--color-subheader);
    --p-tag-padding: 0 0.5rem;
    border: 1px solid var(--color-subheader);
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
        border-radius: var(--large-spacing);
      }
    }
  }
  .seasons-section {
    .img {
      border-radius: var(--large-spacing);
      width: 100%;
      aspect-ratio: 2/3;
      height: 100%;
    }
    .season-title {
      color: var(--color-text);
      text-align: center;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
