<template>
  <div class="flex justify-center items-center py-8 ">
    <div class="max-w-md w-full flex items-center ">
      <FormInput
        v-model="searchTerm"
        type="text"
        placeholder="Search"
        @searchPosts="searchPosts"
        class="flex-1"
      />
    </div>
  </div>
  <div v-if="searchResults.length > 0" class="max-w-md mx-auto">
    <div
      v-for="post in searchResults"
      :key="post.id"
    >
      <h2 class="text-lg font-bold mb-2">{{ post.title }}</h2>
      <p class="text-gray-700">{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormInput from '@/components/FormInput.vue';


interface Post {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  postId: number;
  body: string;
}

const posts = ref<Post[]>([]);
const searchTerm = ref('');
const searchResults = ref<Post[]>([]);

onMounted(async () => {
  await fetchPostsAndComments();
});

async function fetchPostsAndComments() {
  const postResponse = await fetch("http://localhost:3000/posts");
  posts.value = await postResponse.json();


  for (const post of posts.value) {
    const commentResponse = await fetch(`http://localhost:3000/posts`);
    post.comments = await commentResponse.json();
  }
}

function searchPosts() {
  if (searchTerm.value.trim() === '') {
    searchResults.value = [];
    return;
  }

  searchResults.value = posts.value.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
}

</script>