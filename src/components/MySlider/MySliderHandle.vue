<script setup lang="ts">
  import type { PropType } from 'vue'

  const props = defineProps({
    direction: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
    },
  })
</script>

<template>
  <div
    class="absolute z-20 w-4% 2xl:w-16 flex justify-center items-center bg-black/30 hover:bg-black/50 group"
    :class="{
      'inset-0': props.direction === 'left',
      'top-0 bottom-0 right-0': props.direction === 'right',
    }"
    role="button"
    tabindex="0"
  >
    <slot
      class="w-10 h-10 group-hover:w-14 group-hover:h-14 transition-all ease-in-out duration-100"
    />
  </div>
</template>
