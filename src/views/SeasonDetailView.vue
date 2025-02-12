<script setup lang="ts" generic="T extends SeasonDetails">
import { MediaType, type Ratings, type SeasonDetails } from '@/models'
import { MediaService, RatingService } from '@/services'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getImageSrc, getImageSrcSet } from '@/models/MediaImages'
import dayjs from 'dayjs'
import { PeopleHorizontalScroll, Tag } from '@/components'
import ScrollCarouselComponent from '@/components/ScrollCarouselComponent.vue'

const route = useRoute()
const media = ref<T>()
const ratings = ref<Ratings[]>()

const loadMedia = async () => {
  const mediaId = route.params.id as string
  const seasonId = route.params.seasonId as string

  media.value = await MediaService.getMediaDetail(MediaType.Show, mediaId, seasonId)
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
          <h3 class="show-title">
            {{ media?.show.title }}
          </h3>
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
          <h3>
            {{ media?.episode_count }}
            Episodes
          </h3>
          <p v-if="media?.aired_episodes && media.aired_episodes !== media.episode_count">
            <small> Episodes Aired: </small>
            {{ media.aired_episodes }}
          </p>
          <p v-if="media?.runtime">
            <small> Runtime: </small>
            {{ getDisplayTime(media.runtime) }}
          </p>
          <p v-if="media?.runtime && media.episode_count">
            <small> Avg Episode Runtime: </small>
            {{ getDisplayTime(Math.round(media.runtime / media.episode_count)) }}
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

          <p v-if="media?.released">
            <small>
              {{ dayjs(media.released).isBefore(dayjs()) ? 'First aired on' : 'Premieres on' }}
            </small>
            {{ media.network }}
            <small> in </small>
            {{ dayjs(media.released).format('MMM DD, YYYY') }}
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
        <section v-if="media?.episodes?.length" class="info-section episodes-section">
          <h3>Episodes</h3>
          <ScrollCarouselComponent :items="media.episodes" imageType="still" class="episodes">
            <template #footer="episode">
              <article class="season-title">
                <span>
                  <small>
                    {{ media.number }}x{{ episode.number.toString().padStart(2, '0') }}
                  </small>
                  {{ episode.title }}
                </span>
              </article>
            </template>
          </ScrollCarouselComponent>
        </section>
        <section v-if="media?.credits" class="info-section people-section">
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
  margin-top: -5rem;
  z-index: 1;
  .show-title {
    line-height: 1rem;
  }
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
  .episodes-section {
    .season-title {
      color: var(--color-text);
      text-align: center;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
