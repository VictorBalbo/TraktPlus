import { MediaType, type MovieDetails, type ShowDetails } from '@/models'
import { useTraktStore } from '@/store/TracktStore'
import { apiUrl } from '@/constants'

export class MediaDetailService {
  static getMovieDetail = async (id: string) => {
    const url = `${apiUrl}/${MediaType.Movie}/${id}`
    const watchlist = await MediaDetailService.sendApiGetRequest<MovieDetails>(url)
    return watchlist
  }
  static getShowDetail = async (id: string, seasonId?: string, episodeId?: string) => {
    let url = `${apiUrl}/${MediaType.Show}/${id}`
    if (seasonId) {
      url += `/${seasonId}`
    }
    if (episodeId) {
      url += `/${seasonId}/${episodeId}`
    }
    const watchlist = await MediaDetailService.sendApiGetRequest<ShowDetails>(url)
    return watchlist
  }

  private static sendApiGetRequest = async <T>(uri: string) => {
    const response = await fetch(uri, {
      headers: MediaDetailService.getDefaultHeaders(),
    })
    const value = (await response.json()) as T
    return value
  }
  private static getDefaultHeaders = () => {
    const traktStore = useTraktStore()
    return {
      Authorization: `${traktStore.oAuth?.token_type} ${traktStore.oAuth?.access_token}`,
    }
  }
}
