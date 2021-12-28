<script>
  import MyButton from '@/components/MyButton.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MyModal',
    components: { MyButton },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['close'],
  })
</script>

<template>
  <div
    v-if="show"
    class="backdrop bg-black bg-opacity-10 fixed top-0 left-0 w-full h-full flex items-start justify-center"
    @click.self="$emit('close')"
  >
    <div
      class="bg-opacity-60 p-8 w-100 mt-8 min-w-1/2 sm:rounded-3xl sm:w-auto sm:px-8 sm:py-6 shadow-lg bg-white bg-clipping-padding backdrop-filter backdrop-blur-md border border-white"
    >
      <h2 class="mb-6 text-center">
        <slot name="header">Default header</slot>
      </h2>
      <p>
        <slot>default content</slot>
      </p>
      <div class="mt-6 text-center">
        <slot name="actions">
          <MyButton @click="$emit('close')">Close</MyButton>
        </slot>
      </div>
    </div>
  </div>
</template>
