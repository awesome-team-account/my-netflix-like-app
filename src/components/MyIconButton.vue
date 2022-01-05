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
    circle: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  })
</script>

<template>
  <button
    class="transition duration-300 ease-in-out p-1 sm:p-1.5 lg:p-2"
    :class="{
      'text-white': props.dark,
      'text-black': !props.dark,
      'backdrop-filter backdrop-blur-md': props.glassy,
      'rounded-full': props.circle,
      'rounded-md': !props.circle,
    }"
  >
    <slot />
  </button>
</template>
