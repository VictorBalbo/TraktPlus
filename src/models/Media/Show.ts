import type { SeasonDetails } from './Season'
import type { MediaDetails, MediaType } from '..'
import type { ShowStatus } from './Media'

export interface ShowDetails extends MediaDetails {
  type: MediaType.Show
  airs: Airs
  network: string
  country: string
  trailer: string
  homepage: string
  aired_episodes: number
  seasons?: SeasonDetails[]
  status?: ShowStatus
}

interface Airs {
  day: string
  time: string
  timezone: string
}
