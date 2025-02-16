<script
  setup
  lang="ts"
  generic="T extends MovieDetails | ShowDetails | SeasonDetails | EpisodeDetails"
>
import { computed, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { MediaService, RatingService } from '@/services'
import type { MovieDetails, Ratings, SeasonDetails, ShowDetails, EpisodeDetails } from '@/models'
import { MediaType } from '@/models'
import { getImageSrc, getImageSrcSet } from '@/models/MediaImages'
import {
  MovieDetailsSection,
  ShowDetailsSection,
  SeasonDetailsSection,
  EpisodeDetailsSection,
} from '@/components/MediaDetails'
import { HeartIcon } from '@/components/icons'
import { PeopleHorizontalScroll, ScrollCarousel, Popover, Rating, Tag } from '@/components'

const route = useRoute()
const media = ref<T>()
const ratings = ref<Ratings[]>()
const userRating = ref(0)
const ratingPopover = useTemplateRef('ratingPopover')

const loadMedia = async () => {
  const mediaType = route.params.type as MediaType
  const mediaId = route.params.id as string
  const seasonId = route.params.seasonId as string
  const episodeId = route.params.episodeId as string

  media.value = await MediaService.getMediaDetail(mediaType, mediaId, seasonId, episodeId)
  if (media.value) {
    ratings.value = RatingService.getMediaRatings(media.value)
    userRating.value = media.value.userRating ?? 0
  }
}
loadMedia()

const people = computed(() => [
  ...(media.value?.credits?.cast ?? []),
  ...(media.value?.credits?.crew['created by'] ?? []),
  ...(media.value?.credits?.crew.directing ?? []),
  ...(media.value?.credits?.crew.writing ?? []),
])

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
      <main class="main-info" :class="media?.type">
        <article>
          <h3 v-if="media?.type === MediaType.Season" class="show-title">
            {{ media?.show.title }}
          </h3>
          <h3 v-if="media?.type === MediaType.Episode" class="show-title">
            {{ media?.show.title }}: {{ media.seasonTitle }}
          </h3>
          <h1 class="title">
            {{ media?.title }}
            <span v-if="media?.released" class="subtitle">{{
              dayjs(media?.released).format('YYYY')
            }}</span>
            <Tag v-if="media?.certification" :value="media.certification" class="certification" />
          </h1>
        </article>
        <section class="ratings">
          <article class="rating link" @click="ratingPopover?.toggle">
            <HeartIcon class="heart full" />
            <p v-if="userRating" style="margin-left: var(--small-spacing)">
              {{ media?.userRating }}
              <small class="unit">/10 </small>
            </p>
            <p v-else style="margin-left: var(--small-spacing)">Rate</p>
          </article>
          <Popover ref="ratingPopover">
            <Rating
              v-model="userRating"
              :stars="10"
              @update:modelValue="MediaService.setMediaRating(media!, userRating)"
            >
              <template #onicon>
                <HeartIcon class="heart full" />
              </template>
              <template #officon>
                <HeartIcon class="heart empty" />
              </template>
            </Rating>
          </Popover>
          <a
            v-for="rating in ratings"
            :key="rating.provider"
            :href="rating.weblink"
            class="rating"
            :class="rating.weblink ? 'link' : ''"
          >
            <img :src="rating.icon" :alt="rating.provider" />
            <p class="">
              {{ rating.score }}
              <small class="unit">{{ rating.unit }} </small>
            </p>
          </a>
        </section>
        <section class="info-section">
          <MovieDetailsSection v-if="media?.type === MediaType.Movie" :movie="media" />
          <ShowDetailsSection v-else-if="media?.type === MediaType.Show" :show="media" />
          <SeasonDetailsSection v-else-if="media?.type === MediaType.Season" :season="media" />
          <EpisodeDetailsSection v-else-if="media?.type === MediaType.Episode" :episode="media" />
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
          <ScrollCarousel :items="media.seasons">
            <template #footer="season">
              <article class="season-title">
                {{ season.title }}
                <small v-if="season.episode_count"> {{ season.episode_count }} Episodes</small>
              </article>
            </template>
          </ScrollCarousel>
        </section>
        <section
          v-if="media?.type === MediaType.Season && media.episodes?.length"
          class="info-section seasons-section"
        >
          <h3>Episodes</h3>
          <ScrollCarousel :items="media.episodes" imageType="still">
            <template #footer="episode">
              <article class="season-title">
                <small>
                  Episode {{ media.number }}x{{ episode.number.toString().padStart(2, '0') }}</small
                >
                {{ episode.title }}
              </article>
            </template>
          </ScrollCarousel>
        </section>
        <section
          v-if="media?.credits?.cast.length || media?.credits?.crew"
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

  &.movie,
  &.show {
    margin-top: -4rem;
  }
  &.season,
  &.episode {
    margin-top: -5rem;
    .show-title {
      line-height: 1rem;
    }
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
    border: 1px solid var(--color-subheader);

    background-color: #00000066;
    color: var(--color-subheader);
    padding: 0 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;

    --p-tag-primary-background: #00000066;
    --p-tag-primary-color: var(--color-subheader);
    --p-tag-padding: 0 0.5rem;
  }
  .ratings {
    display: flex;
    .rating {
      margin-right: var(--large-spacing);
      display: flex;
      align-items: center;
      padding: var(--small-spacing);

      &.link {
        cursor: pointer;
        transition: all var(--default-transition);
        &:hover {
          background-color: var(--color-background-soft);
          border-radius: var(--small-spacing);
        }
      }

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
    .season-episode {
      color: var(--color-text);
      text-align: center;
      display: flex;
      flex-direction: column;
    }
  }
}
.heart {
  width: 20px;
  &.full {
    color: #fa320a;
  }
  &.empty {
    color: gray;
  }
}
</style>
