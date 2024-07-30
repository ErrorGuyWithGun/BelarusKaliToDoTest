<template>
    <header class="text-center mb-6">
        <h1 class="text-2xl font-bold">
            {{ headerName }}</h1>
    </header>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  headerName: {
    type: String,
  },
});

</script>