<template>
  <div>
      <button 
          :class="selectedStyle"
      >
          {{ textbutton }}
      </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

type StyleVariant = 'blue' | 'red';

const props = defineProps<{
textbutton: string;
styleVariant?: StyleVariant;
}>();

const styles: Record<StyleVariant, string> = {
blue: 'mb-4 text-white font-bold py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-700 w-full',
red: 'mb-4 text-white font-bold py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 ml-4',
};


const selectedStyle = computed(() => styles[props.styleVariant ?? 'blue']);
</script>
