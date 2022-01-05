<script setup lang="ts">
  import type { MediaPlayer } from '@/types'
  import type { Ref } from 'vue'

  import { ref } from 'vue'

  import {
    InformationCircleIcon,
    VolumeUpIcon,
    VolumeOffIcon,
    ReplyIcon,
    PlayIcon as PlayIconOutline,
  } from '@heroicons/vue/outline'
  import { PlayIcon } from '@heroicons/vue/solid'

  import MyBillboardPlayer from '@/components/TheBillboard/MyBillboardPlayer.vue'
  import MyRating from '@/components/TheBillboard/MyRating.vue'
  import MyButton from '@/components/MyButton.vue'
  import MyIconButton from '@/components/MyIconButton.vue'

  const title = "Don't Look Up"
  const caption =
    'Two low-level astronomers must go on a giant media tour to warn humankind of an approaching comet that will destroy planet Earth.'
  const imgUrl: string = new URL(
    '../../assets/img/don-t-look-up.jpg',
    import.meta.url
  ).href
  const rating = '16+'

  const player: Ref<MediaPlayer | undefined> = ref()

  const triggerMute = (): void => {
    if (player.value) player.value.muted = !player.value.muted
  }
  const triggerPlay = (): void => {
    const media = player.value
    if (!media) return

    media[media.playing ? 'pause' : 'play']()
  }
</script>

<template>
  <div
    class="relative -mt-10 md:-mt-16 mb-5 pb-40% inset-0 touch-pan-y z-1"
    role="region"
    aria-label="featured content"
  >
    <div class="absolute w-full billboard-pane z-0">
      <div class="absolute inset-0 z-2">
        <div class="absolute inset-0 w-full z-5 aspect-video">
          <img
            class="absolute inset-0 w-full z-5 h-full object-cover object-right-top"
            :src="imgUrl"
            alt=""
          />
        </div>
        <!--        <MyBillboardPlayer ref="player" fix />-->
        <div
          class="left-vignette z-8 absolute inset-0 bg-gradient-to-r from-black/60"
        />
        <div
          class="bottom-vignette z-8 w-full absolute left-0 right-0 top-auto -bottom-px bg-gradient-to-b from-neutral-900/0 to-neutral-900"
        />
      </div>
      <div class="absolute inset-0 left-4% z-10">
        <div
          class="info absolute inset-0 flex justify-end flex-col transition-all"
        >
          <div
            class="sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl mb-2 md:mb-4 xl:mb-6 font-bold transition-all duration-700 ease-in-out delay-500 origin-bottom-left"
            :class="{
              'lg:scale-75': player && player.playing,
            }"
          >
            {{ title }}
          </div>
          <div
            class="hidden text-xs sm:flex md:text-sm lg:text-xl xl:text-2xl transition-all duration-700 ease-in-out delay-500 items-center origin-bottom"
            :class="{
              'h-0 translate-y-20 opacity-0': player && player.playing,
              'h-20 lg:h-28 xl:h-32': player && !player.playing,
            }"
          >
            <p>{{ caption }}</p>
          </div>
          <div class="mt-1 sm:mt-4 lg:mt-6 flex z-10">
            <MyButton
              class="bg-white hover:bg-white/60 pl-2 sm:pl-3 lg:pl-7"
              v-bind="{ dark: false, glassy: false }"
              tabindex="-1"
            >
              <PlayIcon
                class="w-6 h-6 mr-1 sm:w-8 sm:h-8 sm:mr-2 lg:w-10 lg:h-10 lg:mr-3"
              />
              <div>Play</div>
            </MyButton>
            <MyButton
              class="bg-white/20 hover:bg-white/10 ml-2 sm:ml-3 lg:ml-4 pl-3 lg:pl-7"
            >
              <InformationCircleIcon
                class="w-6 h-6 mr-1 sm:w-8 sm:h-8 sm:mr-2 lg:w-10 lg:h-10 lg:mr-3"
              />
              <div>More Info</div>
            </MyButton>
          </div>
        </div>
        <div
          class="actions absolute inset-0 flex items-end justify-end ml-auto"
        >
          <MyIconButton
            v-if="player && !player.playing"
            class="bg-white/20 hover:bg-white/10"
            :aria-label="player.ended ? 'replay' : 'play'"
            @click="triggerPlay"
          >
            <ReplyIcon
              v-if="player.ended"
              class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            />
            <PlayIconOutline
              v-else-if="!player.playing"
              class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            />
          </MyIconButton>
          <MyIconButton
            v-if="player && player.playing"
            class="bg-white/20 hover:bg-white/10 ml-1 lg:ml-2"
            :aria-label="player.muted ? 'turn on audio' : 'turn off audio'"
            @click="triggerMute"
          >
            <VolumeOffIcon
              v-if="player.muted"
              class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            />
            <VolumeUpIcon
              v-else
              class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            />
          </MyIconButton>
          <MyRating v-if="rating" class="ml-2 sm:ml-3 lg:ml-4">
            {{ rating }}
          </MyRating>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .billboard-pane {
    height: 56.25vw;
  }

  .info,
  .actions {
    width: 40%;
    bottom: 34%;
  }

  .left-vignette {
    right: 26%;
  }

  .bottom-vignette {
    height: 14.7vw;
  }
</style>
