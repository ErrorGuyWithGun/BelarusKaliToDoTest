<template>
  <div class=" min-h-screen">
    <header class=" py-4">
      <h1 class="text-2xl font-bold text-center">Your To Do List</h1>
    </header>
    <main class="container mx-auto py-8">
      <input-to-do />
    </main>
  </div>
</template>

<script setup lang="ts">

import InputToDo from '@/components/InputToDo.vue';

</script>
 