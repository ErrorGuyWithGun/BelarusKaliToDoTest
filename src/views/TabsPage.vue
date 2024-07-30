<template>
  <div class="flex h-screen">
    <div class="flex-1">
      <router-view/>
    </div>
    <nav class="w-full border-t py-4 fixed bottom-0" style="height: 10%;">
      <div class="flex justify-center h-full">
        <a href="/tabs/tab1" class="flex flex-col items-center justify-center flex-1 ">
          <span>Sign in</span>
          <svg></svg>
        </a>
        <a href="/tabs/tab2" class="flex flex-col items-center justify-center flex-1">
          <span>Search</span>
          <svg></svg>
        </a>
        <a href="/tabs/tab3" class="flex flex-col items-center justify-center flex-1">
          <span>To Do List</span>
          <svg></svg>
        </a>
      </div>
    </nav>
  </div>
</template>