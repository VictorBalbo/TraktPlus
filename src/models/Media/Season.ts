import type { Episode } from './Episode'
import type { Media, MediaDetails, MediaType } from '..'

export interface Season extends Media {
  type: MediaType.Season
  number: number
  episode_count?: number
  episodes?: Episode[]
  aired_episodes?: number
}

export interface SeasonDetails extends MediaDetails {
  type: MediaType.Season
  number: number
  episode_count?: number
  episodes?: Episode[]
  aired_episodes?: number
  network?: string
  show: Media
}
