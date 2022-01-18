<script setup lang="ts">
  import MyBillboard from '@/components/TheBillboard/MyBillboard.vue'

  const hideBillboard: boolean = import.meta.env.VITE_HIDE_BILLBOARD
</script>

<template>
  <h1 class="sr-only">My Netflix-Like App Home</h1>
  <MyBillboard />
  <div class="z-1 relative">
    <div v-for="i in 20" :key="i" class="break-all text-center">
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </div>
  </div>
</template>
