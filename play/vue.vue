<script setup lang="ts">
import { computed, reactive, ref, toValue } from 'vue'
import { useRoute } from 'vue-router'
import TestCom from './components/TestCom.vue'

const a = ref(1)
const b = computed(() => a.value + 1)
</script>

<template>
  <div v-if="toValue(a)">
    {{ a }} + {{ b }} = {{ a + b }}
    {{ reactive(useRoute()).path }}
    <TestCom />
  </div>
</template>
