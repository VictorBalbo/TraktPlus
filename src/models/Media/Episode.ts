import type { Media, MediaDetails, MediaType } from '..'

export interface Episode extends Media {
  type: MediaType.Episode
  showId: number
  showTitle?: string
  seasonNumber: number
  number: number
  episode_type?: string
}

export interface EpisodeDetails extends MediaDetails {
  type: MediaType.Episode
  show: Media
  seasonNumber: number
  seasonTitle: number
  number: number
  episode_type?: string
}
