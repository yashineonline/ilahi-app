<template>
  <div>
    <h2>Song List</h2>
    <div v-if="songs.length">
      <div v-for="song in songs" :key="song.title">
        <h3>{{ song.title }}</h3>
        <p>YouTube Link: {{ song.youtubeLink }}</p>
      </div>
    </div>
    <div v-else>Loading songs...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSongStore } from '../stores/songStore'

const songStore = useSongStore()
const { songs } = storeToRefs(songStore)

onMounted(() => {
  songStore.fetchSongs()
})
</script>
