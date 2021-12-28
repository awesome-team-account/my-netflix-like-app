<script lang="ts">
  import NavLink from '@/types/NavLink'
  import { EmojiHappyIcon, PuzzleIcon, KeyIcon } from '@heroicons/vue/outline'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MyFooter',
    components: { EmojiHappyIcon, PuzzleIcon, KeyIcon },
    setup() {
      const nav: Array<NavLink> = [
        {
          name: 'Audio and Subtitles',
          to: '/',
        },
        {
          name: 'Audio Description',
          to: '/',
        },
        {
          name: 'Help Center',
          to: '#',
        },
        {
          name: 'Gift Cards',
          to: '#',
        },
        {
          name: 'Media Center',
          to: '#',
        },
        {
          name: 'Investor Relations',
          to: '#',
        },
        {
          name: 'Jobs',
          to: '#',
        },
        {
          name: 'Terms of Use',
          to: '#',
        },
        {
          name: 'Privacy',
          to: '#',
        },
        {
          name: 'Legal Notices',
          to: '#',
        },
        {
          name: 'Cookie Preferences',
          to: '#',
        },
        {
          name: 'Corporate Information',
          to: '#',
        },
        {
          name: 'Contact Us',
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
  <footer
    class="container text-xs mx-auto flex flex-col space-y-4 my-4 text-neutral-400 px-4% 2xl:px-16 max-w-5xl relative"
  >
    <div class="flex space-x-4">
      <a href="#">
        <EmojiHappyIcon class="w-7 h-7" />
      </a>
      <a href="#">
        <PuzzleIcon class="w-7 h-7" />
      </a>
      <a href="#">
        <KeyIcon class="w-7 h-7" />
      </a>
    </div>
    <nav aria-label="footer">
      <ul class="flex flex-wrap flex-row items-start">
        <li
          v-for="navLink in nav"
          :key="`${navLink.name}-${navLink.to}`"
          class="mb-3 basis-3/6 md:basis-3/12"
        >
          <router-link
            :to="navLink.to"
            class="text-neutral-400 whitespace-nowrap hover:underline"
          >
            {{ navLink.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div>&copy; 2021 Me.</div>
  </footer>
</template>

<style scoped></style>
