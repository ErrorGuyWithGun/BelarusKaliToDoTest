<template>
   <div>
        <span 
            :class="nameStyle">
            {{ name }}
        </span>
        <div 
            :class="descriptionStyle">
            {{ description }}
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  name: {
    type:String,
  },
  description: {
    type:String,
  },
  nameStyle:{
    type:String,
    default:'description-container flex flex-col items-start font-medium',
  },
  descriptionStyle:{
    type:String,
    default:'description-container flex flex-col items-start description text-gray-600 mt-2 ml-4',
  }
});

  </script>