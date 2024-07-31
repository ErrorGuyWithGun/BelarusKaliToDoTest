<template>
    <div>
      <input
        :type="type"
        :value="modelValue"
        @input="handleInput"
        :class="style"
        :placeholder="placeholder"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
defineProps({
  type: {
    type:String,
  },
  modelValue: {
    type:String,
  },
  placeholder: {
    type:String,
  },
  style:{
    type: String,
    default:'mb-4 border rounded-md px-4 py-2 w-full',
  },
});

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