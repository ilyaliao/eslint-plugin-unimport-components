<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, toValue } from 'vue'
import { useRoute } from 'vue-router'
// @ts-expect-error unplugin-vue-markdown/vite
import MarkdownA from './components/MarkdownA.md'
import TestCom1 from './components/TestCom1.vue'
import TestCom from './components/TestCom.vue'

const AsyncTestCom2 = defineAsyncComponent(() => import('./components/AsyncTestCom2.vue'))

const a = ref(1)
const b = computed(() => a.value + 1)
</script>

<template>
  <div v-if="toValue(a)">
    {{ a }} + {{ b }} = {{ a + b }}
    {{ reactive(useRoute()).path }}
    <TestCom />
    <TestCom1 />
    <AsyncTestCom2 />
    <MarkdownA />
  </div>
</template>
