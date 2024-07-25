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