<template>
  <div id="container" class="mx-5">
    <div class="todo-list" v-if="todos.length > 0">
      <div v-for="(todo, index) in todos" :key="index" class="mt-4 flex justify-between items-center">
        <div v-if="isEditing(index)" class="flex items-center w-full justify-between">
          <ion-input v-model="editingTodo.name" @keyup.enter="updateTodo(index)" class="flex-1"></ion-input>
          <ion-input v-model="editingTodo.description" placeholder="Description" class="ml-4 flex-1"></ion-input>
          <div class="button-container flex">
            <ion-button @click="updateTodo(index)" color="success" class="ml-4">Save</ion-button>
            <ion-button @click="cancelEdit" color="danger" class="ml-4">Cancel</ion-button>
          </div>
        </div>
        <div v-else class="flex items-center w-full justify-between">
          <div class="description-container flex flex-col items-start">
            <span>{{ todo.name }}</span>
            <div class="description text-gray-600 mt-2 ml-4">{{ todo.description }}</div>
          </div>
          <div class="button-container flex">
            <ion-button @click="startEdit(index)" color="primary" class="ml-4">Edit</ion-button>
            <ion-button @click="removeTodo(index)" color="danger" class="ml-4">Delete</ion-button>
          </div>
        </div>
      </div>
    </div>
    <div class="todo-input flex justify-center items-center mt-8">
      <ion-input
        v-model="newTodo.name"
        placeholder="Name new list"
        @keyup.enter="addTodo"
        class="flex-1 mr-4 ml-4"
      ></ion-input>
      <ion-input
        v-model="newTodo.description"
        placeholder="Description"
        @keyup.enter="addTodo"
        class="flex-1 mr-4 ml-4"
      ></ion-input>
      <ion-button @click="addTodo" class="ml-4">Save</ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonInput, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';

const todos = ref<{ id: number; name: string; description: string }[]>([]);
const editingIndex = ref(-1);
const editingTodo = ref({ id: 0, name: '', description: '' });
const newTodo = ref({ name: '', description: '' });

onMounted(() => {
  fetchTodos();
});

const fetchTodos = async () => {
  try {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    todos.value = data.map((item: any) => ({
      id: item.id,
      name: item.title,
      description: item.body,
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

const addTodo = async () => {
  if (newTodo.value.name.trim()) {
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo.value.name,
          body: newTodo.value.description,
        }),
      });
      const data = await response.json();
      todos.value.push({
        id: data.id,
        name: data.title,
        description: data.body,
      });
      newTodo.value = { name: '', description: '' };
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
};

const removeTodo = async (index: number) => {
  try {
    await fetch(`http://localhost:3000/posts/${todos.value[index].id}`, {
      method: 'DELETE',
    });
    todos.value.splice(index, 1);
  } catch (error) {
    console.error('Error removing todo:', error);
  }
};

const startEdit = (index: number) => {
  editingIndex.value = index;
  editingTodo.value = { ...todos.value[index] };
};

const updateTodo = async (index: number) => {
  if (editingTodo.value.name.trim()) {
    try {
      await fetch(`http://localhost:3000/posts/${editingTodo.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingTodo.value.name,
          body: editingTodo.value.description,
        }),
      });
      todos.value[index] = editingTodo.value;
      cancelEdit();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
};

const cancelEdit = () => {
  editingIndex.value = -1;
  editingTodo.value = { id: 0, name: '', description: '' };
};

const isEditing = (index: number) => index === editingIndex.value;
</script>