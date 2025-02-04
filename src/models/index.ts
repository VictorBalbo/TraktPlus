import { MediaType } from './Media'
import type { Ids, Media, Scorings } from './Media'
import type { Image, MediaImages } from './MediaImages'
import type { WatchProvider } from './WatchProvider'
import type { Ratings } from './Ratings'

import type { MovieDetails } from './MediaDetails/MovieDetails'
import type { EpisodeDetails } from './MediaDetails/EpisodeDetails'
import type { SeasonDetails } from './MediaDetails/SeasonDetails'
import type { ShowDetails } from './MediaDetails/ShowDetails'

export type { Ids, Image, Media, MediaImages, Scorings, WatchProvider, Ratings }
export { MediaType }

export type { MovieDetails, ShowDetails, SeasonDetails, EpisodeDetails }
