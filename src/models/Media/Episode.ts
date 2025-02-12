import type { Media, MediaType } from '..'

export interface Episode extends Media {
  type: MediaType.Episode
  show: Media
  season: number
  number: number
  overview?: string
  first_aired?: string
  runtime?: number
  episode_type?: string
}
