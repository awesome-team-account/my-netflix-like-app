<script lang="ts">
  import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    watchEffect,
  } from 'vue'

  export default defineComponent({
    name: 'MyBillboardPlayer',
    setup() {
      const videoUrl = new URL(
        '../../assets/video/don-t-look-up.mp4',
        import.meta.url
      ).href
      const videoEl = ref<HTMLMediaElement>()
      const video = reactive({
        url: videoUrl,
        el: videoEl,
        isVisible: true,
        wasLoaded: false,
        wasEnded: false,
        wasFailed: false,
      })

      const wrapperObserver = new IntersectionObserver(
        (entries: Array<IntersectionObserverEntry>) => {
          video.isVisible = entries[0]?.isIntersecting
        },
        {
          root: null,
          threshold: 0.4,
        }
      )
      const wrapperEl = ref<Element>()
      let wrapperVisibility = computed(
        () => video.wasLoaded && !video.wasEnded && !video.wasFailed
      )

      const mediaHandler = (media: HTMLMediaElement) => {
        media.volume = 0.25

        media.oncanplaythrough = () => (video.wasLoaded = true)
        media.onplay = () => {
          if (video.wasEnded) video.wasEnded = false
        }
        media.onended = () => (video.wasEnded = true)

        watchEffect(async () => {
          if (
            media.ended ||
            !video.wasLoaded ||
            !video.isVisible ||
            !tabIsActive.value
          ) {
            if (!media.paused) media.pause()

            return
          }
          /* This code below only exists because of Chrome's autoplay policy */
          try {
            await media.play()
            video.wasFailed = false
          } catch (e) {
            video.wasFailed = true
          }
        })
      }

      let tabIsActive = ref(!document.hidden)
      const switchTabIsActive = () => (tabIsActive.value = !document.hidden)

      onMounted(() => {
        document.addEventListener('visibilitychange', switchTabIsActive)
        if (wrapperEl.value) wrapperObserver.observe(wrapperEl.value)

        if (videoEl.value) mediaHandler(videoEl.value)
      })

      onBeforeUnmount(() => {
        document.removeEventListener('visibilitychange', switchTabIsActive)
        wrapperObserver.disconnect()
      })

      return {
        videoUrl,
        videoEl,
        wrapperEl,
        wrapperVisibility,
      }
    },
  })
</script>

<template>
  <div
    ref="wrapperEl"
    class="absolute inset-0 w-full z-5 duration-500 aspect-video overflow-hidden transition-opacity"
    :class="wrapperVisibility ? 'opacity-100' : 'opacity-0'"
  >
    <video
      ref="videoEl"
      :src="videoUrl"
      class="absolute inset-0 w-full z-5 fix"
    />
  </div>
</template>

<style scoped>
  .fix {
    top: -15%;
    left: -7%;
    max-width: 115%;
    width: 115%;
  }
</style>
