<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        secondary: 'bg-sand-100 text-slate-700',
        accent: 'bg-coral-500/10 text-coral-500',
        outline: 'border border-border bg-white/80 text-slate-700'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface Props {
  variant?: VariantProps<typeof badgeVariants>['variant']
  class?: string
}

defineProps<Props>()
</script>

<template>
  <span :class="cn(badgeVariants({ variant }), $props.class)">
    <slot />
  </span>
</template>
