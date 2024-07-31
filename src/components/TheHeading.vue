<template>
    <header>
        <h1 
        :class="style"
        >{{ headerName }} </h1>
    </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  headerName: {
    type: String,
  },
  style:{
    type: String,
    default: 'text-center mb-6 text-2xl font-bold',
  },
});

</script>