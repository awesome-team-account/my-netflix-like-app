<script setup lang="ts">
  import type { Ref, PropType } from 'vue'
  import type { DropdownMenuPosition } from '@/types'

  import { ref, watchEffect } from 'vue'
  import { useDebounceFn } from '@vueuse/core'

  const props = defineProps({
    position: {
      type: String as PropType<DropdownMenuPosition>,
      default: 'center',
    },
  })

  const menu: Ref<HTMLDivElement | undefined> = ref()

  const trigger: Ref<HTMLElement | undefined> = ref()
  let visible: Ref<boolean> = ref(false)

  let top: Ref<number> = ref(0)
  let left: Ref<number> = ref(0)

  const debouncedTrigger = useDebounceFn((val: boolean) => {
    visible.value = val
  }, 300)
  const instantlyShow = (): void => {
    visible.value = true
    debouncedTrigger(true)
  }

  const setPosition = (): void => {
    const triggerRect: DOMRect | undefined =
      trigger.value?.getBoundingClientRect()
    const menuRect: DOMRect | undefined = menu.value?.getBoundingClientRect()

    if (!triggerRect || !menuRect) return

    top.value = triggerRect.bottom + 10
    left.value = triggerRect.left + Math.floor(triggerRect.width / 2)

    switch (props.position) {
      case 'left':
        left.value -= menuRect.width - 5
        break
      case 'right':
        left.value -= 15
        break
      case 'center':
      default:
        left.value -= Math.floor(menuRect.width / 2)
    }
  }

  watchEffect(() => {
    if (visible.value) setPosition()
  })
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
      :style="`top: ${top}px; left: ${left}px;`"
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
