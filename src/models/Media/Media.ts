import type { Credits, Media, Scorings, WatchProvider } from '..'

export interface MediaDetails extends Media {
  tagline?: string
  overview?: string
  released?: string
  genres?: string[]
  providers?: WatchProvider[]
  scorings?: Scorings
  credits?: Credits
  certification?: string
  runtime?: number
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

export enum MovieStatus {
  Rumored = 'rumored',
  Planned = 'planned',
  InProduction = 'in production',
  PostProduction = 'post production',
  Released = 'released',
  Canceled = 'canceled',
}
