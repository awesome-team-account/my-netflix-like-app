<script setup lang="ts">
  import type { SliderState, TitleCard } from '@/types'
  import type { ComputedRef, PropType } from 'vue'

  import { computed, reactive, unref, watchEffect } from 'vue'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

  import MyMiniCard from '@/components/MyMiniCard.vue'

  const props = defineProps({
    title: {
      type: String as PropType<string>,
      default: 'Trending Now',
    },
  })

  const slider = reactive({
    cards: mockTitleCards(30),
    perPage: 6,
    page: 1,
  } as SliderState)

  const splicedCards: ComputedRef<Array<TitleCard>> = computed(() =>
    [...slider.cards].splice(0, slider.perPage)
  )

  const breakpoints = useBreakpoints({
    xs: 500,
    ...breakpointsTailwind,
  })

  watchEffect(() => {
    slider.perPage = calcPerPage(breakpoints, slider.cards.length)
  })

  function calcPerPage(bp: typeof breakpoints, amount: number): number {
    /* perPage: 2 - xs - 3 - sm - 3 - md - 4 - lg - 5 - xl - 6 */
    const smallerXs = unref(bp.smaller('xs'))
    const betweenXsMd = unref(bp.between('xs', 'md'))
    const md = unref(bp.md)
    const lg = unref(bp.lg)
    const xl = unref(bp.xl)
    let perPage = 6

    if (!xl && lg) perPage = 5
    else if (md) perPage = 4
    else if (betweenXsMd) perPage = 3
    else if (smallerXs) perPage = 2

    perPage = perPage * 3 + 2

    if (amount <= perPage) perPage = amount

    return perPage
  }
  function mockTitleCards(amount: number): Array<TitleCard> {
    return Array.apply(null, Array(amount)).map((value, id) => ({
      id,
      title: `Don't Look Up ${id}`,
      url: '#',
      imgSrc: new URL('../assets/img/don-t-look-up.jpg', import.meta.url).href,
    }))
  }
</script>

<template>
  <div
    class="relative mb-2 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-20 overflow-x-hidden"
  >
    <h2>
      <router-link to="#" class="inline-block mb-2 md:mb-4 mx-4% 2xl:mx-16">
        {{ props.title }}
      </router-link>
    </h2>
    <div class="px-4% 2xl:px-16 touch-pan-y relative">
      <div class="overflow-x-visible">
        <div class="whitespace-nowrap space-x-1 xl:space-x-1.5 2xl:space-x-2">
          <MyMiniCard
            v-for="card in splicedCards"
            :key="`title-card-${card.id}`"
            :card="card"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
