<template>
    <div>
      <h2>Song List</h2>
      <div v-if="songStore.songs.length">
        <div v-for="song in songStore.songs" :key="song.title">
          <h3>{{ song.title }}</h3>
          <p>YouTube Link: {{ song.youtubeLink }}</p>
        </div>
      </div>
      <div v-else>Loading songs...</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { useSongStore } from '../stores/songStore'
  
  export default defineComponent({
    name: 'SongList',
    setup() {
      const songStore = useSongStore()
      songStore.fetchSongs()
  
      return {
        songStore
      }
    }
  })
  </script>
  