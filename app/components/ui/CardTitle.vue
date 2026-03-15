<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <h3 :class="cn('text-xl font-extrabold tracking-tight text-slate-900', $props.class)">
    <slot />
  </h3>
</template>
