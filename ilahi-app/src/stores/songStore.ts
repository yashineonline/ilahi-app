import { defineStore } from 'pinia'
import { ref } from 'vue'
import { processSongsFile, SongData } from '../utils/songProcessor'

export const useSongStore = defineStore('song', () => {
  const songs = ref<SongData[]>([])

  async function fetchSongs() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/yashineonline/ilahi-app/main/ilahi.txt')
      const fileContent = await response.text()
      songs.value = processSongsFile(fileContent)
    } catch (error) {
      console.error('Error loading songs:', error)
    }
  }

  return { songs, fetchSongs }
})
