<template>
  <div class="container mx-auto py-8">
    <header class="text-center mb-6">
      <h1 class="text-2xl font-bold">Sign In</h1>
    </header>
    <div class="max-w-md mx-auto">
      <div class="mb-4">
        <input
          v-model="login"
          type="text"
          class="border rounded-md px-4 py-2 w-full"
          placeholder="Enter your login"
          @input="clearMessages"
        >
      </div>
      <div class="mb-4">
        <input
          v-model="password"
          type="password"
          class="border rounded-md px-4 py-2 w-full"
          placeholder="Enter your password"
          @input="clearMessages"
        >
      </div>
      <button
        @click="authenticate"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Sign In
      </button>
      <p v-if="error" class="text-red-500 font-bold mt-4">{{ error }}</p>
      <p v-if="isAuthenticated" class="text-green-500 font-bold mt-4">Добро пожаловать {{ login }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const login = ref('');
const password = ref('');
const error = ref('');
const isAuthenticated = ref(false);
const userId = ref(''); 


async function authenticate() {
  try {
    const response = await fetch("http://localhost:3000/profile");
    const data = await response.json();

    if (login.value === data.login && password.value === data.password) {
      isAuthenticated.value = true;
      userId.value = data.id; 
      console.log('Успешно аутентифицирован');
    } else {
      error.value = 'Неверный логин или пароль';
    }
  } catch (err) {
    error.value = 'Произошла ошибка при аутентификации';
    console.error(err);
  }
}

function clearMessages() {
  error.value = '';
  isAuthenticated.value = false;
  userId.value = ''; 
}
</script>