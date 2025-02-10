import type { SeasonDetails } from './SeasonDetails'
import type { MediaDetails, MediaType } from '..'
import type { ShowStatus } from './MediaDetails'

export interface ShowDetails extends MediaDetails {
  type: MediaType.Show
  airs: Airs
  runtime: number
  certification: string
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
