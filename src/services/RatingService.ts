import {
  MediaType,
  type EpisodeDetails,
  type MediaDetails,
  type Ratings,
  type SeasonDetails,
} from '@/models'
import imdbIcon from '@/assets/images/imdb.svg'
import justwatchIcon from '@/assets/images/justwatch.svg'
import rtFreshCertifiedIcon from '@/assets/images/rotten-tomatoes-fresh-certified.svg'
import rtFreshIcon from '@/assets/images/rotten-tomatoes-fresh.svg'
import rtRottenIcon from '@/assets/images/rotten-tomatoes-rotten.svg'
import tmdbIcon from '@/assets/images/tmdb.svg'
import traktIcon from '@/assets/images/trakt.svg'

export class RatingService {
  static getMediaRatings = (media: MediaDetails) => {
    const ratings = []

    const trakt = RatingService.getTraktRating(media)
    if (trakt) {
      ratings.push(trakt)
    }

    const tmdb = RatingService.getTmdbRating(media)
    if (tmdb) {
      ratings.push(tmdb)
    }

    const imdb = RatingService.getImdbRating(media)
    if (imdb) {
      ratings.push(imdb)
    }

    const justWatch = RatingService.getJustWatchRating(media)
    if (justWatch) {
      ratings.push(justWatch)
    }

    const rottenTomatoes = RatingService.getRottenTomatoesRating(media)
    if (rottenTomatoes) {
      ratings.push(rottenTomatoes)
    }

    return ratings
  }

  private static getTraktRating(media: MediaDetails) {
    if (!media.scorings?.traktScore) {
      return
    }
    const trakt: Ratings = {
      provider: 'Trakt',
      score: (media.scorings.traktScore * 10).toFixed(0),
      unit: '%',
      weblink: '',
      icon: traktIcon,
    }
    if (media.type === MediaType.Movie) {
      trakt.weblink = `https://trakt.tv/movies/${media.ids.trakt}`
    } else if (media.type === MediaType.Show) {
      trakt.weblink = `https://trakt.tv/shows/${media.ids.trakt}`
    } else if (media.type === MediaType.Season) {
      const season = media as SeasonDetails
      trakt.weblink = `https://trakt.tv/shows/${season.show.ids.trakt}/seasons/${season.number}`
    } else if (media.type === MediaType.Episode) {
      const episode = media as EpisodeDetails
      trakt.weblink = `https://trakt.tv/shows/${episode.show.ids.trakt}/seasons/${episode.seasonNumber}/episodes/${episode.number}`
    }
    return trakt
  }

  private static getImdbRating(media: MediaDetails) {
    if (!media.scorings?.imdbScore) {
      return
    }
    let imdbId = media.ids.imdb
    if (media.type === MediaType.Season) {
      const season = media as SeasonDetails
      imdbId = season.show.ids.imdb
    }
    const imdb: Ratings = {
      provider: 'IMDb',
      score: media.scorings?.imdbScore.toFixed(1),
      unit: '/10',
      weblink: `https://www.imdb.com/title/${imdbId}`,
      icon: imdbIcon,
    }
    return imdb
  }
  private static getTmdbRating(media: MediaDetails) {
    if (!media.scorings?.tmdbScore) {
      return
    }
    const tmdb: Ratings = {
      provider: 'TMDB',
      score: (media.scorings.tmdbScore * 10).toFixed(0),
      unit: '%',
      weblink: '',
      icon: tmdbIcon,
    }
    if (media.type === MediaType.Movie) {
      tmdb.weblink = `https://www.themoviedb.org/movie/${media.ids.tmdb}`
    } else if (media.type === MediaType.Show) {
      tmdb.weblink = `https://www.themoviedb.org/tv/${media.ids.tmdb}`
    } else if (media.type === MediaType.Season) {
      const season = media as SeasonDetails
      tmdb.weblink = `https://www.themoviedb.org/tv/${season.show.ids.tmdb}/season/${season.number}`
    } else if (media.type === MediaType.Episode) {
      const episode = media as EpisodeDetails
      tmdb.weblink = `https://www.themoviedb.org/tv/${episode.show.ids.tmdb}/season/${episode.seasonNumber}/episode/${episode.number}`
    }
    return tmdb
  }

  private static getJustWatchRating(media: MediaDetails) {
    if (!media.scorings?.jwRating) {
      return
    }
    const justWatch: Ratings = {
      provider: 'JustWatch',
      score: (media.scorings.jwRating * 100).toFixed(0),
      unit: '%',
      weblink: '',
      icon: justwatchIcon,
    }
    if (media.type === MediaType.Movie) {
      justWatch.weblink = `https://www.justwatch.com${media.ids.justwatch ?? media.ids.slug}`
    } else if (media.type === MediaType.Show) {
      justWatch.weblink = `https://www.justwatch.com${media.ids.justwatch ?? media.ids.slug}`
    } else if (media.type === MediaType.Season) {
      const season = media as SeasonDetails
      justWatch.weblink = `https://www.justwatch.com${season.ids.justwatch ?? media.ids.slug}/temporada-${season.number}`
    } else if (media.type === MediaType.Episode) {
      justWatch.weblink = `https://www.justwatch.com${media.ids.justwatch ?? media.ids.slug}/temporada-${media.ids.tmdb}`
    }
    return justWatch
  }

  private static getRottenTomatoesRating = (media: MediaDetails) => {
    if (!media.scorings?.tomatoMeter) {
      return
    }

    const rottenTomatoes: Ratings = {
      provider: 'Rotten Tomatoes',
      score: media.scorings.tomatoMeter.toFixed(0),
      unit: '%',
      icon: '',
    }

    if (media.scorings.certifiedFresh) {
      rottenTomatoes.icon = rtFreshCertifiedIcon
    } else if (parseInt(rottenTomatoes.score) >= 60) {
      rottenTomatoes.icon = rtFreshIcon
    } else {
      rottenTomatoes.icon = rtRottenIcon
    }
    return rottenTomatoes
  }
}
