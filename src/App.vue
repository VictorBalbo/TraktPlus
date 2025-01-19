<script setup lang="ts">
import { RouterView } from 'vue-router'
import { SideMenuComponent } from '@/components'
</script>

<template>
  <div class="app">
    <header>Trakt Plus</header>
    <main class="main">
      <SideMenuComponent />

      <RouterView class="view" />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.header {
}

.main {
  display: flex;
  flex-direction: row;
  .view {
    width: 100%;
    min-height: 100%;
  }
}
</style>
