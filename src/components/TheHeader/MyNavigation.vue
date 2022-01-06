<script setup lang="ts">
  import type { NavLink } from '@/types'

  import MyDropdownMenu from '@/components/MyDropdownMenu.vue'

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
</script>

<template>
  <nav class="text-xs md:text-sm lg:ml-4" aria-label="main">
    <ul class="flex space-x-2 md:space-x-4 whitespace-nowrap">
      <li class="relative block sm:hidden mx-2">
        <MyDropdownMenu>
          <template #trigger>Browse</template>
          <ul class="flex flex-col">
            <li
              v-for="dropdownLink in nav"
              :key="`dropdown-${dropdownLink.name}-${dropdownLink.to}`"
              class=""
              role="none"
            >
              <router-link
                :to="dropdownLink.to"
                class="block py-2 hover:bg-white/10 px-6 text-center rounded-md"
              >
                {{ dropdownLink.name }}
              </router-link>
            </li>
          </ul>
        </MyDropdownMenu>
      </li>
      <li
        v-for="(navLink, i) in nav"
        :key="`${navLink.name}-${navLink.to}`"
        class="hidden sm:block"
        :class="{ '!ml-0': i === 0 }"
      >
        <router-link :to="navLink.to">
          {{ navLink.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
