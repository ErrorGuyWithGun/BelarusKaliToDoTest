<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-text-center">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Search</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">
        <ion-item>
          <ion-input
            type="text"
            placeholder="Search"
            :value="props.InputValue"
            @input="handleInputChange"
            @keyup.enter="handleSearch"
          ></ion-input>
        </ion-item>
      </div>
      <div class="ion-padding">
        <ion-list>
          <ion-item v-for="item in filteredItems" :key="item.id">
            {{ item.value }}
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonList } from '@ionic/vue';
import { computed, PropType, defineEmits } from 'vue';



interface Item {
  id: string;
  value: string;
}

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true
  },
  InputValue: {
    type: String,
    required: true
  }
});

const emits = defineEmits<{
  (event: 'update:InputValue', value: string): void;
}>();

const filteredItems = computed(() => {
  if (!props.items) {
    return [];
  }
  return props.items.filter((item) =>
    item.value.toLowerCase().includes(props.InputValue.toLowerCase())
  );
});

const handleSearch = () => {
  // Add any additional logic you want to execute when the user presses Enter
  console.log('Search executed:', props.InputValue);
};

const handleInputChange = (event: Event) => {
  emits('update:InputValue', (event.target as HTMLInputElement).value);
};
</script>