<script setup lang="ts">
  import MyContainer from '@/components/MyContainer.vue'
  import MyButton from '@/components/MyButton.vue'
  import MyModal from '@/components/MyModal.vue'

  import { ref } from 'vue'

  let show = ref(false)
</script>

<template>
  <MyContainer class="text-center">
    <h1 class="py-4">Hello!</h1>
    <p class="my-4">
      <router-link to="/">Go to Home</router-link> /
      <router-link to="/about">Go to About</router-link>
    </p>
    <MyButton @click="show = true">Show Modal</MyButton>
    <router-view />
  </MyContainer>
  <MyModal :show="show" @close="show = !show">
    <template #header>Modal with glassmorphism</template>
    Look!
  </MyModal>
</template>
