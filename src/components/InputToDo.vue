<template>
    <div id="container">
      <div class="todo-list" v-if="todos.length > 0">
        <div v-for="(todo, index) in todos" :key="index" class="todo-item">
          <div v-if="isEditing(index)" class="todo-item-edit">
            <ion-input v-model="editingTodo.name" @keyup.enter="updateTodo(index)"></ion-input>
            <ion-input v-model="editingTodo.description" placeholder="Description"></ion-input>
            <div class="button-container">
              <ion-button @click="updateTodo(index)" color="success">Save</ion-button>
              <ion-button @click="cancelEdit" color="danger">Cancel</ion-button>
            </div>
          </div>
          <div v-else class="todo-item-view">
            <div class="description-container">
              <span>{{ todo.name }}</span>
              <div class="description">{{ todo.description }}</div>
            </div>
            <div class="button-container">
              <ion-button @click="startEdit(index)" color="primary">Edit</ion-button>
              <ion-button @click="removeTodo(index)" color="danger">Delete</ion-button>
            </div>
          </div>
        </div>
      </div>
      <div class="todo-input">
        <ion-input
          v-model="newTodo.name"
          placeholder="Name new list"
          @keyup.enter="addTodo"
        ></ion-input>
        <ion-input
          v-model="newTodo.description"
          placeholder="Description"
          @keyup.enter="addTodo"
        ></ion-input>
        <ion-button @click="addTodo">Save</ion-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IonInput, IonButton } from '@ionic/vue';
  import { ref } from 'vue';
  
  const props = defineProps({ inputValue: { type: String, required: true } });
  const emit = defineEmits<{
    (e: 'update:inputValue', value: string): void;
    (e: 'saveList', listName: string, description: string): void;
  }>();
  
  const todos = ref<{ name: string; description: string }[]>([]);
  const editingIndex = ref(-1);
  const editingTodo = ref({ name: '', description: '' });
  const newTodo = ref({ name: '', description: '' });
  
  const addTodo = () => {
    if (newTodo.value.name.trim()) {
      todos.value.push(newTodo.value);
      emit('saveList', props.inputValue.trim(), newTodo.value.description.trim());
      newTodo.value = { name: '', description: '' };
    }
  };
  
  const removeTodo = (index: number) => {
    todos.value.splice(index, 1);
  };
  
  const startEdit = (index: number) => {
    editingIndex.value = index;
    editingTodo.value = { ...todos.value[index] };
  };
  
  const updateTodo = (index: number) => {
    if (editingTodo.value.name.trim()) {
      todos.value[index] = editingTodo.value;
      cancelEdit();
    }
  };
  
  const cancelEdit = () => {
    editingIndex.value = -1;
    editingTodo.value = { name: '', description: '' };
  };
  
  const isEditing = (index: number) => index === editingIndex.value;
  </script>
  
  <style scoped>
  #container {
    margin-left: 5%;
    margin-right: 5%;
  }
  
  .todo-item {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .todo-item-edit,
  .todo-item-view {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
  }
  
  .button-container ion-button {
    margin-left: 10px;
  }
  
  .todo-input {
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .todo-input ion-button {
    margin-left: 10px;
  }
  
  .todo-input ion-input {
    flex-grow: 1;
    margin-right: 10px;
    margin-left: 10px;
  }
  
  .todo-input ion-input:focus {
    flex-grow: 1.2;
  }
  
  .description-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .description {
    font-style: italic;
    color: #666;
    margin-top: 10%;
    margin-left: 10%;
  }
  </style>