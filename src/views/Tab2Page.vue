<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-searchbar
        v-model="searchTerm"
        placeholder="Search"
        @keyup.enter="searchPosts"
      ></ion-searchbar>
      <ion-button @click="searchPosts">Search</ion-button>
      <div v-if="searchResults.length > 0">
        <ion-card v-for="post in searchResults" :key="post.id">
          <ion-card-header>
            <ion-card-title>{{ post.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ post.body }}</p>
          </ion-card-content>
        </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonContent, IonSearchbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';

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

  // Fetch comments separately for each post
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