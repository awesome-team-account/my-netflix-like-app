<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MyBillboard',
    setup() {
      const title = "Don't Look Up"
      const caption =
        'Two low-level astronomers must go on a giant media tour to warn humankind of an approaching comet that will destroy planet Earth.'
      const imgUrl = new URL('../assets/img/don-t-look-up.jpg', import.meta.url)
        .href

      return {
        title,
        caption,
        imgUrl,
      }
    },
  })
</script>

<template>
  <div
    class="relative -mt-10 md:-mt-16 mb-5 pb-40% inset-0 touch-pan-y z-1"
    role="region"
    aria-label="Featured Content"
  >
    <div class="absolute w-full billboard-pane z-0">
      <!-- Img / Video -->
      <div class="absolute inset-0 z-2">
        <div class="absolute inset-0 w-full z-5 aspect-video">
          <img
            class="absolute inset-0 w-full z-5 h-full object-cover object-right-top"
            :src="imgUrl"
            alt=""
          />
        </div>
        <div
          class="left-vignette z-8 absolute inset-0 bg-gradient-to-r from-black/60"
        />
        <div
          class="bottom-vignette z-8 w-full absolute left-0 right-0 top-auto -bottom-px bg-gradient-to-b from-neutral-900/0 to-neutral-900"
        />
        <div><!-- video player --></div>
      </div>
      <div class="absolute inset-0 w-full h-full z-10">
        <!-- Info -->
        <div
          class="info absolute inset-0 left-4% top-0 flex justify-end flex-col"
        >
          <div
            class="sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl mb-2 lg:mb-4 xl:mb-6 font-bold"
          >
            {{ title }}
          </div>
          <div
            class="hidden text-xs sm:block md:text-sm lg:text-xl xl:text-3xl"
          >
            {{ caption }}
          </div>
          <div><!-- Links --></div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="absolute z-10 inset-0">
        <div><!-- replay btn --></div>
        <div><!-- rating --></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .billboard-pane {
    height: 56.25vw;
  }

  .info {
    width: 36%;
    bottom: 35%;
  }

  .left-vignette {
    right: 26%;
  }

  .bottom-vignette {
    height: 14.7vw;
  }
</style>
