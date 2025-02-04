import { MediaType, type MovieDetails, type Ratings } from '@/models'

export class RatingService {
  static getMediaRatings = (media: MovieDetails) => {
    const ratings = []

    const trakt = RatingService.getTraktRating(media)
    if (trakt) {
      ratings.push(trakt)
    }

    const imdb = RatingService.getImdbRating(media)
    if (imdb) {
      ratings.push(imdb)
    }

    const tmdb = RatingService.getTmdbRating(media)
    if (tmdb) {
      ratings.push(tmdb)
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

  private static getTraktRating(media: MovieDetails) {
    if (!media.scorings?.traktScore) {
      return
    }
    const trakt: Ratings = {
      provider: 'Trakt',
      score: (media.scorings.traktScore * 10).toFixed(0),
      unit: '%',
      weblink: '',
      icon: '/src/assets/images/trakt.svg',
    }
    if (media.type === MediaType.Movie) {
      trakt.weblink = `https://trakt.tv/movies/${media.ids.trakt}`
    } else if (media.type === MediaType.Show) {
      trakt.weblink = `https://trakt.tv/shows/${media.ids.trakt}`
    } else if (media.type === MediaType.Season) {
      trakt.weblink = `https://trakt.tv/shows/${media.ids.trakt}/seasons/${media.ids.trakt}`
    } else if (media.type === MediaType.Episode) {
      trakt.weblink = `https://trakt.tv/shows/${media.ids.trakt}/seasons/${media.ids.trakt}/episodes/${media.ids.trakt}`
    }
    return trakt
  }

  private static getImdbRating(media: MovieDetails) {
    if (!media.scorings?.imdbScore) {
      return
    }
    const imdb: Ratings = {
      provider: 'IMDb',
      score: media.scorings?.imdbScore.toFixed(1),
      unit: '/10',
      weblink: `https://www.imdb.com/title/${media.ids.imdb}`,
      icon: '/src/assets/images/imdb.svg',
    }
    return imdb
  }
  private static getTmdbRating(media: MovieDetails) {
    if (!media.scorings?.tmdbScore) {
      return
    }
    const tmdb: Ratings = {
      provider: 'TMDB',
      score: (media.scorings.tmdbScore * 10).toFixed(0),
      unit: '%',
      weblink: '',
      icon: '/src/assets/images/tmdb.svg',
    }
    if (media.type === MediaType.Movie) {
      tmdb.weblink = `https://www.themoviedb.org/movie/${media.ids.tmdb}`
    } else if (media.type === MediaType.Show) {
      tmdb.weblink = `https://www.themoviedb.org/tv/${media.ids.tmdb}`
    } else if (media.type === MediaType.Season) {
      tmdb.weblink = `https://www.themoviedb.org/tv/${media.ids.tmdb}/season/${media.ids.tmdb}`
    } else if (media.type === MediaType.Episode) {
      tmdb.weblink = `https://www.themoviedb.org/tv/${media.ids.tmdb}/season/${media.ids.tmdb}/episode/${media.ids.tmdb}`
    }
    return tmdb
  }

  private static getJustWatchRating(media: MovieDetails) {
    if (!media.scorings?.jwRating) {
      return
    }
    const justWatch: Ratings = {
      provider: 'JustWatch',
      score: (media.scorings.jwRating * 100).toFixed(0),
      unit: '%',
      weblink: '',
      icon: '/src/assets/images/justwatch.svg',
    }
    if (media.type === MediaType.Movie) {
      justWatch.weblink = `https://www.justwatch.com${media.ids.justwatch ?? media.ids.slug}`
    } else if (media.type === MediaType.Show) {
      justWatch.weblink = `https://www.justwatch.com${media.ids.justwatch ?? media.ids.slug}`
    } else if (media.type === MediaType.Season) {
      justWatch.weblink = `https://www.justwatch.com${media.ids.justwatch ?? media.ids.slug}/temporada-${media.ids.tmdb}`
    } else if (media.type === MediaType.Episode) {
      justWatch.weblink = `https://www.justwatch.com${media.ids.justwatch ?? media.ids.slug}/temporada-${media.ids.tmdb}`
    }
    return justWatch
  }

  private static getRottenTomatoesRating = (media: MovieDetails) => {
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
      rottenTomatoes.icon = '/src/assets/images/rotten-tomatoes-fresh-certified.svg'
    } else if (parseInt(rottenTomatoes.score) >= 60) {
      rottenTomatoes.icon = '/src/assets/images/rotten-tomatoes-fresh.svg'
    } else {
      rottenTomatoes.icon = '/src/assets/images/rotten-tomatoes-rotten.svg'
    }
    return rottenTomatoes
  }
}
