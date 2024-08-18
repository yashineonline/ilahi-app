<template>
  <div class="test-view p-6 bg-blue-500 text-white rounded-lg space-y-4">
    <h1>{{ title }}</h1>
    <p v-html="formattedLyrics"></p>
    <p v-html="formattedTranslation"></p>
    <a :href="youtubeLink" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
    <button
      @click="generatePDF"
      class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-4"
    >
      Generate PDF for this song
    </button>
    <div class="flex justify-center">
      <canvas
        id="qrcodeCanvas"
        class="border border-gray-300"
        style="width: 200px; height: 200px"
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import { processSongsFile, type SongData } from '../utils/songProcessor';

const title = ref('');
const lyrics = ref('');
const translation = ref('');
const youtubeLink = ref('');
const songContent = ref('');

const formattedLyrics = computed(() => lyrics.value.replace(/\n/g, '<br>'));
const formattedTranslation = computed(() => translation.value.replace(/\n/g, '<br>'));

const generateQRCode = () => {
  console.log('Generating QR code...');
  const canvas = document.getElementById('qrcodeCanvas') as HTMLCanvasElement;
  if (canvas) {
    QRCode.toCanvas(canvas, youtubeLink.value, { width: 200, margin: 2 }, (error) => {
      if (error) {
        console.error('Error generating QR code:', error);
      } else {
        console.log('QR code generated successfully!');
      }
    });
  } else {
    console.error('Canvas element not found!');
  }
};


const generatePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(title.value, 20, 20);

  doc.setFontSize(12);
  doc.text('Lyrics:', 20, 30);
  doc.setFontSize(10);
  const lyricsLines = doc.splitTextToSize(lyrics.value, 170);
  doc.text(lyricsLines, 20, 40);

  const translationY = 40 + (lyricsLines.length * 5);
  doc.setFontSize(12);
  doc.text('Translation:', 20, translationY);
  doc.setFontSize(10);
  const translationLines = doc.splitTextToSize(translation.value, 170);
  doc.text(translationLines, 20, translationY + 10);

  const linkY = translationY + 10 + (translationLines.length * 5);
  doc.setFontSize(12);
  doc.textWithLink('Watch on YouTube', 20, linkY, { url: youtubeLink.value });

  const canvas = document.getElementById('qrcodeCanvas') as HTMLCanvasElement;
  if (canvas) {
    const qrCodeDataUrl = canvas.toDataURL('image/png');
    doc.addImage(qrCodeDataUrl, 'PNG', 20, linkY + 10, 50, 50);
  }

  doc.save(`${title.value}.pdf`);
};

const loadSongData = async () => {
  try {
    const response = await fetch('http://localhost:3000/read-song');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawContent = await response.text();
    const songsData: SongData[] = processSongsFile(rawContent);
    console.log('Fetched song data:', songsData);
    if (songsData.length > 0) {
      const song = songsData[0];
      title.value = song.title;
      lyrics.value = song.lyrics.map((stanza: string[]) => stanza.join('\n')).join('\n\n');
      translation.value = song.translation.map((stanza: string[]) => stanza.join('\n')).join('\n\n');
      youtubeLink.value = song.youtubeLink;
      songContent.value = JSON.stringify(song);
      generateQRCode();
    } else {
      console.log('No songs data available');
    }
  } catch (error) {
    console.error('Error fetching or processing the song data:', error);
  }
};

onMounted(() => {
  console.log('Component mounted');
  loadSongData();
});
</script>

<style scoped>
.test-view {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

p {
  white-space: pre-wrap;
}

a {
  color: #ffffff;
  text-decoration: underline;
}

a:hover {
  text-decoration: none;
}
</style>
