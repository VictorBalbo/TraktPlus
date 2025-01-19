import type { oAuth } from '@/models/Trakt/oAuth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTraktStore = defineStore('trakt', () => {
  const getAccessToken = () => {
    const token = localStorage.getItem('oAuth')
    if (token) {
      const oauth = JSON.parse(token) as oAuth
      const expireDate = new Date((oauth.created_at + oauth.expires_in) * 1000)
      const now = new Date()
      if (expireDate > now) {
        return oauth
      }
    }
  }
  const setAcessToken = (oauth: oAuth) => {
    localStorage.setItem('oAuth', JSON.stringify(oauth))
    oAuth.value = oauth
  }
  const oAuth = ref<oAuth | undefined>(getAccessToken())

  return { oAuth, setAcessToken }
})
