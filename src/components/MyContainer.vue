<script>
  export default {
    name: 'MyContainer',
  }
</script>

<template>
  <div
    class="container relative min-h-screen text-gray-900 leading-tight mx-auto"
  >
    <slot />
  </div>
</template>
