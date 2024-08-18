import { defineStore } from 'pinia'
import { ref } from 'vue'
import { processSongsFile, SongData } from '../utils/songProcessor'

export const useSongStore = defineStore('song', () => {
  const songs = ref<SongData[]>([])

  async function fetchSongs() {
    try {
      const response = await fetch('http://localhost:3000/read-song')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const fileContent = await response.text()
      songs.value = processSongsFile(fileContent)
    } catch (error) {
      console.error('Error loading songs:', error)
      songs.value = []
    }
  }

  return { songs, fetchSongs }
})
