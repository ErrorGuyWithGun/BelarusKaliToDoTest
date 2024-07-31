<template>
  <div class="container mx-auto py-8">
    <AppHeador 
      headerName="Sign In"
    />
    <div class="max-w-md mx-auto">
      <div class="mb-4">
        <FormInput
          v-model="login"
          type="text"
          placeholder="Enter your login"
          @clearMessages="clearMessages"
          />
        <FormInput
          v-model="password"
          type="password"
          placeholder="Enter your password"
          @clearMessages="clearMessages"
        />
      </div>
        <FormButton
            type="submit"
            textbutton="Sign In"
            @click="authenticate"
            styleVariant="blue"
        />
      <p v-if="error" class="text-red-500 font-bold text-center">{{ error }}</p>
      <p v-if="isAuthenticated" class="text-green-500 font-bold  text-center">Добро пожаловать {{ login }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormInput from '@/components/BaseInput.vue';
import FormButton from '@/components/BaseButton.vue';
import AppHeador from '@/components/TheHeading.vue';


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