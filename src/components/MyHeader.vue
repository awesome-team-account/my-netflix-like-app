<script lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import MyLogo from '@/components/MyLogo.vue'
  import MyNavigation from '@/components/MyNavigation.vue'

  export default {
    name: 'MyHeader',
    components: { MyNavigation, MyLogo },
    setup() {
      const headerWrapper = ref<Element>()
      let isDarkened = ref(false)
      const callback = (entries: Array<IntersectionObserverEntry>) => {
        isDarkened.value = !entries[0]?.isIntersecting
      }
      const observer = new IntersectionObserver(callback, {
        root: null,
        threshold: 0.7,
      })

      onMounted(() => {
        if (headerWrapper.value) observer.observe(headerWrapper.value)
      })
      onBeforeUnmount(() => observer.disconnect())

      return {
        headerWrapper,
        isDarkened,
      }
    },
  }
</script>

<template>
  <div ref="headerWrapper" class="h-10 md:h-16">
    <header
      class="z-40 fixed top-0 w-full h-10 md:h-16 px-4% 2xl:px-16 flex items-center transition-all duration-500 bg-gradient-to-b from-neutral-900/60 backdrop-filter backdrop-blur-md"
      :class="{
        'bg-neutral-900/30': isDarkened,
      }"
    >
      <MyLogo />
      <MyNavigation />
    </header>
  </div>
</template>
