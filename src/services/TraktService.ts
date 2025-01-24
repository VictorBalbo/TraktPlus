import { trackClientId, trackRedirectUrl, apiUrl } from '@/constants'
import type { oAuth } from '@/models/Trakt'

export class TraktService {
  private static authorizeApiUrl = `https://trakt.tv/oauth/authorize?response_type=code&client_id=${trackClientId}&redirect_uri=${trackRedirectUrl}`
  private static traktUri = '/trackt-api'

  static authenticate = async () => {
    console.log('auth')
    window.location.href = this.authorizeApiUrl
  }

  static getAccessToken = async (code: string) => {
    const url = `${apiUrl}/oauth/token/${code}`
    const response = await fetch(url, { method: 'POST' })
    const accessToken = (await response.json()) as oAuth
    return accessToken
  }
}
