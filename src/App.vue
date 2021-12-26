<script setup lang="ts">
  import MyHeader from '@/components/MyHeader.vue'
  import MyFooter from '@/components/MyFooter.vue'
</script>

<template>
  <MyHeader />
  <main>
    <router-view />
  </main>
  <MyFooter />
</template>
