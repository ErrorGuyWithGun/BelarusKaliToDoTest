<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-text-center">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding">
        <ion-item>
          <ion-input v-model="login" type="text" placeholder="Enter your login" @input="clearMessages"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="password" type="password" placeholder="Enter your password" @input="clearMessages"></ion-input>
        </ion-item>
        <ion-button @click="authenticate">Sign In</ion-button>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="isAuthenticated" class="success">Добро пожаловать {{ login }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';

const login = ref('');
const password = ref('');
const error = ref('');
const isAuthenticated = ref(false);

async function authenticate() {
  try {
    const response = await fetch("http://localhost:3000/profile");
    const data = await response.json();

    if (login.value === data.login && password.value === data.password) {
      isAuthenticated.value = true;
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
}
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

.success {
  color: green;
  font-weight: bold;
}
</style>