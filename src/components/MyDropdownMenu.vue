<script setup lang="ts">
  import type { Ref, PropType } from 'vue'
  import type { DropdownMenuPosition } from '@/types'

  import { ref, unref, watchEffect } from 'vue'
  import { useDebounceFn } from '@vueuse/core'

  const props = defineProps({
    position: {
      type: String as PropType<DropdownMenuPosition>,
      default: 'center',
    },
  })

  const trigger: Ref<HTMLElement | null> = ref(null)
  const menu: Ref<HTMLDivElement | null> = ref(null)
  let visible: Ref<boolean> = ref(false)
  let coords: Ref<Array<number>> = ref([0, 0])

  const debouncedTrigger = useDebounceFn((val: boolean) => {
    visible.value = val
  }, 300)
  const instantlyShow = (): void => {
    visible.value = true
    debouncedTrigger(true)
  }

  watchEffect(() => {
    const menuEl = unref(menu)
    const triggerEl = unref(trigger)

    if (!visible.value || !menuEl || !triggerEl) return

    coords.value = calcCoords(
      menuEl.getBoundingClientRect(),
      triggerEl.getBoundingClientRect(),
      props.position
    )
  })

  function calcCoords(
    menuRect: DOMRect,
    triggerRect: DOMRect,
    position: DropdownMenuPosition
  ): [number, number] {
    let left = triggerRect.left + Math.floor(triggerRect.width / 2)

    switch (position) {
      case 'left':
        left -= menuRect.width - 5
        break
      case 'right':
        left -= 15
        break
      case 'center':
      default:
        left -= Math.floor(menuRect.width / 2)
    }

    return [triggerRect.bottom + 10, left]
  }
</script>

<template>
  <a
    ref="trigger"
    role="button"
    aria-haspopup="true"
    class="font-bold flex items-center"
    tabindex="0"
    @mouseover="instantlyShow"
    @mouseout="() => debouncedTrigger(false)"
  >
    <slot name="trigger" />
    <div
      class="arrow-up border-4 border-b-white ml-1 mt-2 hover:border-b-white/80 rotate-180 duration-500 ease-in-out transition-all"
      :class="{ 'rotate-0 -mt-[0.1rem]': visible }"
    />
  </a>
  <teleport to="body">
    <div
      v-if="visible"
      ref="menu"
      role="menu"
      tabindex="0"
      :style="`top: ${coords[0]}px; left: ${coords[1]}px;`"
      class="fixed z-40 top-0 p-1 bg-black/60 bg-clipping-padding backdrop-blur-md backdrop-filter border border-white/20 rounded-md text-sm shadow-md"
      @mouseover="() => debouncedTrigger(true)"
      @mouseout="() => debouncedTrigger(false)"
    >
      <div
        class="arrow-up border-8 border-b-black/60 absolute -top-4"
        :class="{
          'right-0': position === 'left',
          'left-1/2 -ml-2': position === 'center',
        }"
      />
      <slot />
    </div>
  </teleport>
</template>
