<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  defaultOpen?: boolean
}>(), {
  defaultOpen: false,
})

const isOpen = ref(props.defaultOpen)
const toggle = () => { isOpen.value = !isOpen.value }
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-100 bg-white">
    <button
      class="flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-slate-50"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{{ title }}</span>
      <ChevronDown
        class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="border-t border-slate-100 px-4 pb-4 pt-3">
        <slot />
      </div>
    </Transition>
  </div>
</template>
