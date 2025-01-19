<script setup lang="ts">
import { TraktService } from '@/services/TraktService'
import { useTraktStore } from '@/store/TracktStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const traktStore = useTraktStore()

const getToken = async () => {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  if (code) {
    const accessToken = await TraktService.getAccessToken(code)
    traktStore.setAcessToken(accessToken)
  }
  router.push({ name: 'Browse' })
}
getToken()
</script>
<template>Logging in</template>
