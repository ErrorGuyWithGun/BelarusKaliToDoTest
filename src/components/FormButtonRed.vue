<template>
    <div class="mb-4">
      <button
        class="text-white font-bold py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 ml-4"
      >{{ textbutton  }}</button>
    </div>
  </template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  type: string;
  textbutton: string;
}>();

</script>