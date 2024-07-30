<template>
  <div class=" min-h-screen">
    <header class=" py-4">
      <h1 class="text-2xl font-bold text-center">Your To Do List</h1>
    </header>
    <main class="container mx-auto py-8">
      <div id="container">
    <div class="todo-list" v-if="todos.length > 0">
      <div v-for="(todo, index) in todos" :key="index" class="mt-4 flex justify-between items-center">
        <div v-if="isEditing(index)" class="flex items-center w-full justify-between">
          <FormInput
            v-model="editingTodo.name" 
            type="text"
            placeholder="Name To Do"
            @keyup.enter="updateTodo(index)" 
            class="flex-1"
            
          />
          <FormInput
            v-model="editingTodo.description" 
            type="text"
            placeholder="Description"
            @keyup.enter="updateTodo(index)" 
            class="flex-1 px-3"
            
          />
          <div class="button-container flex">
            <FormButton
              type="submit"
              textbutton="Save"
              @click="updateTodo(index)"
            />
            <FormButtonRed
              type="submit"
              textbutton="Cancel"
              @click="cancelEdit"
            />
          </div>
        </div>
        <div v-else class="flex items-center w-full justify-between">

          <FormPost
            :name="todo.name"
            :description="todo.description"
          />

          <div class="button-container flex">
            <FormButton
              type="submit"
              textbutton="Edit"
              @click="startEdit(index)"
            />
            <FormButtonRed
              type="submit"
              textbutton="Delete"
              @click="removeTodo(index)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-8">
      <FormInput
        v-model="newTodo.name" 
        type="text"
        placeholder="Name new To Do"
        @keyup.enter="addTodo"
        class="flex-1 "
        />
      <FormInput
        v-model="newTodo.description" 
        type="text"
        placeholder="Description"
        @keyup.enter="addTodo"
        class="flex-1 px-3"
      />
      <FormButton
        type="submit"
        textbutton="Save"
        @click="addTodo"
      />
    </div>
  </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormInput from '@/components/FormInput.vue';
import FormButton from '@/components/FormButton.vue';
import FormButtonRed from '@/components/FormButtonRed.vue';
import FormPost from '@/components/FormPost.vue';


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
 