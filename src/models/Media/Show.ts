import type { Season } from './Season'
import type { MediaDetails, MediaType } from '..'
import type { ShowStatus } from './Media'

export interface ShowDetails extends MediaDetails {
  type: MediaType.Show
  network?: string
  country?: string
  status?: ShowStatus
  episodes: number
  aired_episodes: number
  seasons?: Season[]
}
