import type { Credits, Media, Scorings, WatchProvider } from '..'

export interface MediaDetails extends Media {
  tagline?: string
  overview?: string
  released?: string
  userRating?: number
  genres?: string[]
  providers?: WatchProvider[]
  scorings?: Scorings
  credits?: Credits
  certification?: string
  runtime?: number
  trailers?: Trailer[]
  homepage?: string
}

export enum ShowStatus {
  ReturningSearies = 'Returning Series',
  Continuing = 'Continuing',
  InProduction = 'In Production',
  Planned = 'Planned',
  Upcoming = 'Upcoming',
  Pilot = 'Pilot',
  Canceled = 'Canceled',
  Ended = 'Ended',
}

export enum MovieStatus {
  Rumored = 'Rumored',
  Planned = 'Planned',
  InProduction = 'In Production',
  PostProduction = 'Post Production',
  Released = 'Released',
  Canceled = 'Canceled',
}

interface Trailer {
  iso_639_1: string
  name: string
  url: string
  type: string
}
