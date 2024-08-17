import { defineStore } from 'pinia'
import { ref } from 'vue'
import { processSongsFile, SongData } from '../utils/songProcessor'

export const useSongStore = defineStore('song', () => {
  const songs = ref<SongData[]>([])

  async function fetchSongs() {
    try {
      const response = await fetch('https://github.com/yashineonline/ilahi/tree/ilahiApp-patch-1')
      const fileContent = await response.text()
      songs.value = processSongsFile(fileContent)
    } catch (error) {
      console.error('Error loading songs:', error)
    }
  }

  return { songs, fetchSongs }
})
