<script lang="ts">
  export default {
    name: 'HomeView',
  }
</script>

<template>
  <h1 class="w-0 h-0 absolute whitespace-nowrap overflow-hidden">
    My Netflix-Like App Home
  </h1>
  <div v-for="i in 60" :key="i" class="break-all text-center">
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  </div>
</template>
