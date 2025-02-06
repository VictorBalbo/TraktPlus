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
  status: string
  genres: string[]
  aired_episodes: number
  seasons?: SeasonDetails[]
}

interface Airs {
  day: string
  time: string
  timezone: string
}
