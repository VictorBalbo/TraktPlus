import type { MediaImages, WatchProvider } from '@/models'

export interface Media {
  title: string
  year?: number
  ids: Ids
  type: MediaType
  images?: MediaImages
  providers: WatchProvider[]
  scorings?: Scorings
}

export interface Ids {
  trakt: number
  slug: string
  imdb: string
  tmdb: number
  justwatch?: string
}

export interface Scorings {
  traktScore?: number
  traktVotes?: number
  imdbScore?: number
  imdbVotes?: number
  tmdbScore?: number
  jwRating?: number
  tomatoMeter?: number
  certifiedFresh?: boolean
}

export enum MediaType {
  Movie = 'movie',
  Show = 'show',
  Season = 'season',
  Episode = 'episode',
}
