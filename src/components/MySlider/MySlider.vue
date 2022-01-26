<script setup lang="ts">
  import type { PerPage, SliderState, TitleCard } from '@/types'
  import type { ComputedRef, PropType, Ref } from 'vue'

  import { computed, reactive, unref, watchEffect, ref } from 'vue'

  import MyMiniCard from '@/components/MyMiniCard.vue'
  import MySliderHandle from '@/components/MySlider/MySliderHandle.vue'

  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'

  const props = defineProps({
    title: {
      type: String as PropType<string>,
      default: 'Trending Now',
    },
  })

  const slider = reactive({
    initialized: false,
    showControls: false,
    cards: mockTitleCards(30),
    perPage: 6,
    perSlide: 13,
    page: 1,
  } as SliderState)

  const factor: ComputedRef<number> = computed(() =>
    slider.initialized ? 3 : 2
  )
  const term: ComputedRef<number> = computed(() => (slider.initialized ? 2 : 1))
  const length: ComputedRef<number> = computed(() =>
    Math.ceil(slider.cards.length / slider.perPage)
  )

  const turningFactor: Ref<0 | 1 | -1> = ref(0)
  const translate: ComputedRef<string> = computed(
    // () => 100 + 100 / slider.perPage + 100 * turningFactor.value
    () => {
      const minus = turningFactor.value === 1 ? '-' : ''
      return turningFactor.value === 0 ? '' : `${minus}translate-x-full`
    }
  )

  const changePage = (direction: 'prev' | 'next'): void => {
    if (!slider.initialized) slider.initialized = true

    turningFactor.value = direction === 'next' ? 1 : -1
    // setTimeout(() => (turningFactor.value = 0), 1000)

    const sum = slider.page + turningFactor.value
    slider.page = sum === 0 ? unref(length) : sum
  }

  const breakpoints = useBreakpoints({
    xs: 500,
    ...breakpointsTailwind,
  })

  watchEffect(() => {
    const [perPage, perSlide] = calcPerPage(
      breakpoints,
      slider.cards.length,
      unref(factor),
      unref(term)
    )
    slider.perPage = perPage
    slider.perSlide = perSlide
  })

  const splicedCards: ComputedRef<Array<TitleCard>> = computed(() =>
    [...slider.cards].splice(0, slider.perSlide)
  )

  const checkItemIndex = (index: number): string => {
    const theRealPerPage = (slider.perPage - term.value) / factor.value
    const indexFix = slider.initialized ? -1 : 0

    return index + indexFix > theRealPerPage ? '' : index.toString()
  }

  function calcPerPage(
    bp: typeof breakpoints,
    amount: number,
    f: number,
    t: number
  ): readonly [PerPage, number] {
    /* perPage: 2 - xs - 3 - sm - 3 - md - 4 - lg - 5 - xl - 6 */
    const smallerXs = unref(bp.smaller('xs'))
    const betweenXsMd = unref(bp.between('xs', 'md'))
    const md = unref(bp.md)
    const lg = unref(bp.lg)
    const xl = unref(bp.xl)
    let perPage: PerPage = 6

    if (xl) perPage = 6
    else if (lg) perPage = 5
    else if (md) perPage = 4
    else if (betweenXsMd) perPage = 3
    else if (smallerXs) perPage = 2
    /* next and previous pages & visible parts of the cards on the sides */
    let perSlide = perPage * f + t

    if (perSlide >= amount) perSlide = amount

    return [perPage, perSlide]
  }

  function mockTitleCards(amount: number): Array<TitleCard> {
    return Array.apply(null, Array(amount)).map(
      (value, id) =>
        ({
          id,
          title: `Don't Look Up ${id}`,
          url: '#',
          imgSrc: new URL('../../assets/img/don-t-look-up.jpg', import.meta.url)
            .href,
        } as TitleCard)
    )
  }
</script>

<template>
  <div
    class="relative my-2 sm:my-4 md:my-6 lg:my-8 xl:my-10 2xl:my-16"
    @mouseover="slider.showControls = true"
    @mouseout="slider.showControls = false"
  >
    <h2>
      <router-link to="#" class="inline-block mb-2 md:mb-4 mx-4% 2xl:mx-16">
        {{ props.title }}
      </router-link>
    </h2>
    <div class="px-4% 2xl:px-16 touch-pan-y relative z-10">
      <MySliderHandle
        v-if="length > 1 && slider.initialized"
        v-show="slider.showControls"
        @click="changePage('prev')"
      >
        <template #default="slotProps">
          <ChevronLeftIcon :class="slotProps.class" />
        </template>
      </MySliderHandle>
      <div class="overflow-x-visible">
        <div
          class="whitespace-nowrap leading-[0] transition-transform duration-1000"
          :class="{ [translate]: slider.initialized }"
        >
          <MyMiniCard
            v-for="(card, index) in splicedCards"
            :key="`title-card-${card.id}`"
            :card="card"
            :class="`item-${checkItemIndex(index)}`"
          />
        </div>
      </div>
      <MySliderHandle
        v-if="length > 1"
        v-show="slider.showControls"
        direction="right"
        @click="changePage('next')"
      >
        <template #default="slotProps">
          <ChevronRightIcon :class="slotProps.class" />
        </template>
      </MySliderHandle>
    </div>
  </div>
</template>
