<template>
    <div class="mb-4">
      <button
        class="text-white font-bold py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-700 w-full "
      >{{ textbutton  }}</button>
    </div>
  </template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  textbutton: {
    type: String,
  },
});

</script>