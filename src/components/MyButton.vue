<script setup lang="ts">
  import type { PropType } from 'vue'

  const props = defineProps({
    dark: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    glassy: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  })
</script>

<template>
  <button
    class="transition duration-300 ease-in-out font-bold py-1 px-3 sm:px-4 lg:py-3 lg:px-8 rounded-md whitespace-nowrap text-xs sm:text-lg lg:text-2xl flex items-center"
    :class="{
      'text-white': props.dark,
      'text-black': !props.dark,
      'backdrop-filter backdrop-blur-md': props.glassy,
    }"
  >
    <slot />
  </button>
</template>
