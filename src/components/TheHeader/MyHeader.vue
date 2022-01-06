<script setup lang="ts">
  import type { Ref } from 'vue'

  import { ref, onMounted, onBeforeUnmount } from 'vue'

  import MyLogo from '@/components/TheHeader/MyLogo.vue'
  import MyNavigation from '@/components/TheHeader/MyNavigation.vue'

  import { SearchIcon } from '@heroicons/vue/outline'
  import { BellIcon, EmojiHappyIcon } from '@heroicons/vue/solid'

  const headerWrapper: Ref<InstanceType<typeof HTMLDivElement> | undefined> =
    ref()
  let isDarkened: Ref<boolean> = ref(false)

  const observer = new IntersectionObserver(
    (entries: Array<IntersectionObserverEntry>) => {
      isDarkened.value = !entries[0]?.isIntersecting
    },
    {
      root: null,
      threshold: 0.7,
    }
  )

  onMounted(() => {
    if (headerWrapper.value) observer.observe(headerWrapper.value)
  })
  onBeforeUnmount(() => observer.disconnect())
</script>

<template>
  <div ref="headerWrapper" class="h-10 md:h-16 relative">
    <header
      class="z-40 fixed top-0 w-full h-10 md:h-16 px-4% 2xl:px-16 flex items-center transition-all duration-500 bg-gradient-to-b from-black/70 backdrop-filter backdrop-blur-md"
      :class="{
        'bg-black/60 shadow-md': isDarkened,
      }"
    >
      <MyLogo />
      <MyNavigation />
      <div class="flex space-x-5 ml-auto">
        <SearchIcon class="w-4 h-4 md:w-7 md:h-7" />
        <BellIcon class="w-4 h-4 md:w-7 md:h-7" />
        <EmojiHappyIcon class="w-4 h-4 md:w-7 md:h-7" />
      </div>
    </header>
  </div>
</template>
