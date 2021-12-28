<script lang="ts">
  import NavLink from '@/types/NavLink'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MyNavigation',
    setup() {
      const nav: Array<NavLink> = [
        {
          name: 'Home',
          to: '/',
        },
        {
          name: 'TV Shows',
          to: '#',
        },
        {
          name: 'Movies',
          to: '#',
        },
        {
          name: 'New & Popular',
          to: '#',
        },
        {
          name: 'My List',
          to: '#',
        },
      ]

      return {
        nav,
      }
    },
  })
</script>

<template>
  <nav class="text-xs md:text-sm ml-4" aria-label="Main">
    <ul class="flex space-x-2 md:space-x-4 whitespace-nowrap">
      <li v-for="navLink in nav" :key="`${navLink.name}-${navLink.to}`">
        <router-link :to="navLink.to">
          {{ navLink.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
