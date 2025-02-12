import { MediaType } from './Media'
import type { Ids, Media, Scorings } from './Media'
import type { MediaImages } from './MediaImages'
import type { WatchProvider } from './WatchProvider'
import type { Ratings } from './Ratings'
import type { Credits } from './Credits'

import type { MediaDetails } from './Media/Media'
import type { MovieDetails } from './Media/Movie'
import type { Episode } from './Media/Episode'
import type { SeasonDetails } from './Media/Season'
import type { ShowDetails } from './Media/Show'

export type { Ids, Media, MediaImages, Credits, Scorings, WatchProvider, Ratings }
export { MediaType }

export type { MediaDetails, MovieDetails, ShowDetails, SeasonDetails, Episode as EpisodeDetails }
