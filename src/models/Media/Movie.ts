import type { MediaDetails, MediaType } from '..'
import type { MovieStatus } from './Media'

export interface MovieDetails extends MediaDetails {
  type: MediaType.Movie
  country: string
  status: MovieStatus
  language: string
}
