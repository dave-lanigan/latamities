<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('rounded-[1.75rem] border border-white/70 bg-white/88 text-card-foreground shadow-panel backdrop-blur-md', $props.class)">
    <slot />
  </div>
</template>
