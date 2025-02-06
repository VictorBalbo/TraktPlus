import type { Media, MediaType } from '..'

export interface EpisodeDetails extends Media {
  type: MediaType.Episode
  show: string
  season: number
  number: number
  overview?: string
  first_aired?: string
  runtime?: number
  episode_type?: string
}
