import type { Media } from '@/models'
import { useTraktStore } from '@/store/TracktStore'

export class MediaService {
  private static apiUri = 'http://localhost:3000'

  static getRecommendations = async () => {
    const url = `${MediaService.apiUri}/recommendations`
    const recommendations = await MediaService.sendApiGetRequest<Media[]>(url)
    return recommendations
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
