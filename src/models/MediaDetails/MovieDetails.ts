import type { MediaDetails, MediaType } from '..'
import type { MovieStatus } from './MediaDetails'

export interface MovieDetails extends MediaDetails {
  type: MediaType.Movie
  runtime: number
  country: string
  trailer: string
  homepage: string
  language: string
  certification: string
  status: MovieStatus
}
