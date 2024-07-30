<template>
   <div class="description-container flex flex-col items-start">
        <span 
            class="font-medium">
            {{ name }}
        </span>
        <div 
            class="description text-gray-600 mt-2 ml-4">
            {{ description }}
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  name: string;
  description: string;
}>();

  </script>