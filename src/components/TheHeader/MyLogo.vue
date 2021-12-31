<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MyLogo',
  })
</script>

<template>
  <router-link
    class="logo text-2xl md:text-3xl whitespace-nowrap text-red-600 uppercase mr-1 md:mr-6"
    to="/"
  >
    My Netflix-Like App
  </router-link>
</template>

<style scoped>
  .logo {
    font-family: 'Bebas Neue', cursive;
  }
</style>
