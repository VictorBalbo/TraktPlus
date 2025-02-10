import { MediaType } from './Media'
import type { Ids, Media, Scorings } from './Media'
import type { MediaImages } from './MediaImages'
import type { WatchProvider } from './WatchProvider'
import type { Ratings } from './Ratings'
import type { Credits } from './Credits'

import type { MediaDetails } from './MediaDetails/MediaDetails'
import type { MovieDetails } from './MediaDetails/MovieDetails'
import type { EpisodeDetails } from './MediaDetails/EpisodeDetails'
import type { SeasonDetails } from './MediaDetails/SeasonDetails'
import type { ShowDetails } from './MediaDetails/ShowDetails'

export type { Ids, Media, MediaImages, Credits, Scorings, WatchProvider, Ratings }
export { MediaType }

export type { MediaDetails, MovieDetails, ShowDetails, SeasonDetails, EpisodeDetails }
