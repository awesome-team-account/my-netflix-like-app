<script lang="ts">
  import MyBillboard from '@/components/TheBillboard/MyBillboard.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'HomeView',
    components: { MyBillboard },
  })
</script>

<template>
  <h1 class="w-0 h-0 absolute whitespace-nowrap overflow-hidden">
    My Netflix-Like App Home
  </h1>
  <MyBillboard />
  <div class="z-1 relative">
    <div v-for="i in 20" :key="i" class="break-all text-center">
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </div>
  </div>
</template>
