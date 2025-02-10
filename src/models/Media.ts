import type { MediaImages } from '@/models'

export interface Media {
  title: string
  ids: Ids
  type: MediaType
  images?: MediaImages
}

export interface Ids {
  trakt: number
  tmdb: number
  slug?: string
  imdb?: string
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
