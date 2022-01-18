<script setup lang="ts">
  import MyHeader from '@/components/TheHeader/MyHeader.vue'
  import MyFooter from '@/components/MyFooter.vue'

  const colorScheme: 'dark' | 'light' = 'dark'

  const rootEl: HTMLElement = document.documentElement
  rootEl.setAttribute('style', `color-scheme: ${colorScheme}`)
  rootEl.classList.add(colorScheme)
</script>

<template>
  <div
    class="dark:bg-neutral-900 dark:text-neutral-200 static overflow-hidden w-full"
  >
    <MyHeader />
    <main>
      <router-view />
    </main>
    <MyFooter />
  </div>
</template>
