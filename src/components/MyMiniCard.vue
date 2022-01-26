<script setup lang="ts">
  import type { TitleCard } from '@/types'
  import type { PropType } from 'vue'

  const props = defineProps({
    card: {
      type: Object as PropType<TitleCard>,
      default: () =>
        ({ id: null, title: '', imgSrc: '', url: '#' } as TitleCard),
    },
  })
</script>

<template>
  <div
    class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 aspect-[341/192] inline-block first:pl-0 px-[0.2vw]"
  >
    <router-link :to="props.card.url" class="block w-full h-full">
      <img
        class="w-full h-full object-cover object-right-top rounded-md"
        :src="props.card.imgSrc"
        :alt="props.card.title"
      />
    </router-link>
  </div>
</template>
