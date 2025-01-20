import type { MediaImages } from '@/models'

export interface Media {
  title: string
  year?: number
  ids: Ids
  type: MediaType
  images?: MediaImages
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
