<script setup lang="ts">
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'

const menuItems: MenuItem[] = [
  {
    label: 'Menu',
    items: [
      {
        label: 'Browse',
      },
      {
        label: 'To Watch',
      },
      {
        label: 'History',
      },
      {
        label: 'List',
      },
      {
        label: 'Search',
      },
    ],
  },
]
</script>
<template>
  <nav class="menu">
    <Menu :model="menuItems"></Menu>
  </nav>
</template>

<style scoped>
.menu {
  width: fit-content;
}
</style>
