import type { Episode, Media } from '@/models'
import { useTraktStore } from '@/store/TracktStore'
import { apiUrl } from '@/constants'

export class MediaService {
  static getRecommendations = async () => {
    const url = `${apiUrl}/recommendations`
    const recommendations = await MediaService.sendApiGetRequest<Media[]>(url)
    return recommendations
  }

  static getTrending = async (type: 'movie' | 'show') => {
    const url = `${apiUrl}/${type}/trending`
    const trendings = await MediaService.sendApiGetRequest<Media[]>(url)
    return trendings
  }

  static getUpNext = async () => {
    const url = `${apiUrl}/upnext`
    const upnext = await MediaService.sendApiGetRequest<Episode[]>(url)
    return upnext
  }
  static getWatchlist = async () => {
    const url = `${apiUrl}/watchlist`
    const watchlist = await MediaService.sendApiGetRequest<Media[]>(url)
    return watchlist
  }

  private static sendApiGetRequest = async <T>(uri: string) => {
    const response = await fetch(uri, {
      headers: MediaService.getDefaultHeaders(),
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
