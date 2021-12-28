<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MyButton',
  })
</script>

<template>
  <button class="my-button">
    <slot />
  </button>
</template>
