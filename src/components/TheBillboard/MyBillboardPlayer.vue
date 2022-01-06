<script setup lang="ts">
  import type { VideoState, MediaPlayer } from '@/types'
  import type { Ref, ComputedRef, PropType } from 'vue'

  import {
    computed,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    watchEffect,
    toRef,
  } from 'vue'

  const props = defineProps({
    fix: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  })

  const videoEl: Ref<InstanceType<typeof HTMLMediaElement> | undefined> = ref()
  const videoUrl: string = new URL(
    '../../assets/video/don-t-look-up.mp4',
    import.meta.url
  ).href
  const video = reactive({
    onTheScreen: true,
    loaded: false,
    failed: false,
    playing: false,
    muted: false,
    ended: false,
  } as VideoState)

  const visible: ComputedRef<boolean> = computed(
    (): boolean =>
      video.loaded && !video.ended && (!video.failed || video.playing)
  )

  const wrapperObserver = new IntersectionObserver(
    (entries: Array<IntersectionObserverEntry>) => {
      video.onTheScreen = entries[0]?.isIntersecting
    },
    {
      root: null,
      threshold: 0.4,
    }
  )
  const wrapperEl: Ref<InstanceType<typeof HTMLDivElement> | undefined> = ref()

  let tabIsActive: Ref<boolean> = ref(!document.hidden)
  const switchTabIsActive = (): void => {
    tabIsActive.value = !document.hidden
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', switchTabIsActive)
    document.addEventListener('click', tryTyPlay)
    if (wrapperEl.value) wrapperObserver.observe(wrapperEl.value)
    if (videoEl.value) mediaHandler(videoEl.value)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', switchTabIsActive)
    document.removeEventListener('click', tryTyPlay)
    wrapperObserver.disconnect()
  })

  defineExpose({
    muted: computed({
      get: (): boolean => video.muted,
      set: (val: boolean) => {
        if (videoEl.value) videoEl.value.muted = video.muted = val
      },
    }),
    ended: toRef(video, 'ended'),
    playing: toRef(video, 'playing'),
    play: () => videoEl.value?.play(),
    pause: () => videoEl.value?.pause(),
  } as MediaPlayer)

  const mediaHandler = (media: HTMLMediaElement): void => {
    media.volume = 0.25

    media.oncanplaythrough = () => (video.loaded = true)
    media.onplaying = () => {
      video.playing = true
      video.ended = false
    }
    media.onended = () => {
      video.ended = true
      video.playing = false
    }
    media.onpause = () => (video.playing = false)

    watchEffect(async () => {
      if (!video.loaded || !video.onTheScreen || !tabIsActive.value) {
        if (!media.paused) media.pause()

        return
      }
      /* This code below only exists because of Chrome's autoplay policy */
      try {
        await media.play()
        video.failed = false
      } catch (e) {
        video.failed = true
      }
    })
  }
  const tryTyPlay = async (): Promise<undefined> => {
    /* This function only exists because of Chrome's autoplay policy */
    if (video.playing) {
      document.removeEventListener('click', tryTyPlay)

      return
    }
    if (
      !videoEl.value ||
      !video.loaded ||
      !video.onTheScreen ||
      !tabIsActive.value ||
      !video.failed
    )
      return

    try {
      await videoEl.value.play()
      video.failed = false
      document.removeEventListener('click', tryTyPlay)
    } catch (e) {
      video.failed = true
    }
  }
</script>

<template>
  <div
    ref="wrapperEl"
    class="absolute inset-0 w-full duration-500 aspect-video overflow-hidden transition-opacity"
    :class="visible ? 'opacity-100' : 'opacity-0'"
  >
    <video
      ref="videoEl"
      :src="videoUrl"
      class="absolute inset-0 w-full fix"
      :class="{ fix: props.fix }"
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
