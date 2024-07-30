<template>
    <div class="mb-4">
      <input
        :type="type"
        :value="modelValue"
        @input="handleInput"
        class="border rounded-md px-4 py-2 w-full"
        :placeholder="placeholder"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
defineProps<{
  type: string;
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
  (event: 'clearMessages'): void;
  (event: 'searchPosts'): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('clearMessages');
  emit('searchPosts');
};
  </script>