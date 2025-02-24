<script setup lang="ts">
defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
