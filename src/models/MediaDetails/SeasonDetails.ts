import type { EpisodeDetails } from './EpisodeDetails'
import type { Media } from '..'

export interface SeasonDetails extends Media {
  number: number
  episode_count?: number
  aired_episodes?: number
  overview?: string
  first_aired?: string
  network?: string
  episodes?: EpisodeDetails[]
}
