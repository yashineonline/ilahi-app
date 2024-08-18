<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-4 text-center text-green-600">Song Lyrics</h1>
    <div v-if="currentSong">
      <div class="lyrics bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <h2 class="text-2xl font-semibold mb-4">{{ currentSong.title }}</h2>
        <div v-for="(stanza, index) in currentSong.lyrics" :key="index" class="mb-4">
          <p v-for="line in stanza" :key="line" class="mb-1">{{ line }}</p>
        </div>
      </div>
      <div class="buttons mt-4 flex justify-center space-x-4">
        <button class="btn btn-primary" @click="showTranslation">Show Translation</button>
        <button class="btn btn-secondary" @click="openYoutubeLink">Watch on YouTube</button>
        <button class="btn btn-accent" @click="generatePDF">Generate PDF</button>
        <button class="btn btn-success" @click="downloadBook">Download PDF Book</button>
      </div>
    </div>
    <div v-else>Loading song...</div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSongStore } from '../stores/songStore'
import { jsPDF } from 'jspdf'
import { downloadBook } from './BookComponent.vue'

const songStore = useSongStore()
const currentSong = computed(() => songStore.songs[0])
const showTranslationFlag = ref(false)

const showTranslation = () => {
  showTranslationFlag.value = !showTranslationFlag.value
}

const openYoutubeLink = () => {
  if (currentSong.value?.youtubeLink) {
    window.open(currentSong.value.youtubeLink, '_blank')
  }
}

const generatePDF = () => {
  if (currentSong.value) {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(currentSong.value.title, 20, 20)
    doc.setFontSize(12)
    currentSong.value.lyrics.forEach((stanza, index) => {
      doc.text(stanza.join('\n'), 20, 40 + (index * 30))
    })
    doc.save(`${currentSong.value.title}.pdf`)
  }
}

const downloadBook = BookComponent.setup().downloadBook

</script>
  