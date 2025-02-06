import type { SeasonDetails } from './SeasonDetails'
import type { Media, MediaType } from '..'

export interface ShowDetails extends Media {
  type: MediaType.Show
  tagline: string
  overview: string
  first_aired: string
  airs: Airs
  runtime: number
  certification: string
  network: string
  country: string
  trailer: string
  homepage: string
  status: ShowStatus
  genres: string[]
  aired_episodes: number
  seasons?: SeasonDetails[]
}

interface Airs {
  day: string
  time: string
  timezone: string
}

export enum ShowStatus {
  ReturningSearies = 'returning series',
  Continuing = 'continuing',
  InProduction = 'in production',
  Planned = 'planned',
  Upcoming = 'upcoming',
  Pilot = 'pilot',
  Canceled = 'canceled',
  Ended = 'ended',
}
