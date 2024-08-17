<template>
  <div>
    <h1>Welcome to Ilahi App</h1>
    <div v-if="songs.length">
      <div v-for="song in songs" :key="song.title">
        <h2>{{ song.title }}</h2>
        <p>YouTube Link: {{ song.youtubeLink }}</p>
        <!-- Add more song details as needed -->
      </div>
    </div>
    <div v-else>Loading songs...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { processSongsFile, SongData } from '../utils/songProcessor';

export default defineComponent({
  name: 'Home',
  setup() {
    const songs = ref<SongData[]>([]);

    onMounted(async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/yashineonline/ilahi-app/main/ilahi.txt');
        const fileContent = await response.text();
        songs.value = processSongsFile(fileContent);
      } catch (error) {
        console.error('Error loading songs:', error);
      }
    });

    return {
      songs
    };
  }
});
</script>
