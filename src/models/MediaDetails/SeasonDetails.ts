import type { EpisodeDetails } from './EpisodeDetails'
import type { Media, MediaType } from '..'

export interface SeasonDetails extends Media {
  type: MediaType.Season
  number: number
  episode_count?: number
  aired_episodes?: number
  overview?: string
  first_aired?: string
  network?: string
  episodes?: EpisodeDetails[]
}
