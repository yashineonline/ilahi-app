<template>
  <div id="app" class="font-sans antialiased text-center text-gray-800 mt-16">
    <Header />
    <RouterView />
    <SongPlayer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "./components/Header.vue"
import SongPlayer from "./components/SongPlayer.vue"
</script>

