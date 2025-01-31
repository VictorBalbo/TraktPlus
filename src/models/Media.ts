import type { MediaImages } from '@/models'

export interface Media {
  title: string
  year?: number
  ids: Ids
  type: MediaType
  images?: MediaImages
}

export interface Episode extends Media {
  season: number
  number: number
  show: string
}

export interface Ids {
  trakt: number
  slug: string
  imdb: string
  tmdb: number
}

export enum MediaType {
  Movie = 'movie',
  Show = 'show',
  Season = 'season',
  Episode = 'episode',
}
