<script setup lang="ts">
  import MyBillboard from '@/components/TheBillboard/MyBillboard.vue'
  import MySlider from '@/components/MySlider/MySlider.vue'

  const hideBillboard: boolean = import.meta.env.VITE_HIDE_BILLBOARD === 'true'

  const titles: Array<string | undefined> = [
    'New This Week',
    undefined,
    'My List',
    'Critically Acclaimed Tv Shows',
    'Hollywood Movies',
    'Dark Comedies',
    'Recently Added',
  ]
</script>

<template>
  <h1 class="sr-only">My Netflix-Like App Home</h1>
  <MyBillboard v-if="!hideBillboard" />
  <MySlider
    v-for="(title, index) in titles"
    :key="`slider-${index}`"
    :title="title"
  />
</template>
