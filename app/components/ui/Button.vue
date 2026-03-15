<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'vue'

import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-lagoon-600',
        outline: 'border border-border bg-white/80 text-foreground hover:bg-sand-100',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-sand-100',
        ghost: 'text-foreground hover:bg-white/70'
      },
      size: {
        default: 'h-11 px-5 py-2.5',
        sm: 'h-9 px-3.5 text-xs',
        lg: 'h-12 px-6 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: ButtonHTMLAttributes['class']
  type?: ButtonHTMLAttributes['type']
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button'
})
</script>

<template>
  <button
    :type="props.type"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </button>
</template>
