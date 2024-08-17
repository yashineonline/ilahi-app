<template>
  <div class="p-6 bg-blue-500 text-white rounded-lg space-y-4">
    <h1>{{ title }}</h1>
    <p>{{ lyrics }}</p>
    <p>{{ translation }}</p>
    <a :href="youtubeLink" target="_blank">Watch on YouTube</a>
    <button @click="generatePDF" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-4">
      Generate PDF for this song
    </button>
    <div class="flex justify-center">
      <canvas id="qrcodeCanvas" class="border border-gray-300"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import { processSongsFile, SongData } from '@/utils/songProcessor.ts';

export default defineComponent({
  name: 'TestComponent',
  data() {
    return {
      title: '',
      lyrics: '',
      translation: '',
      youtubeLink: '',
      songContent: '',
    };
  },
  methods: {
    generateQRCode() {
      this.$nextTick(() => {
        const canvas = document.getElementById('qrcodeCanvas') as HTMLCanvasElement;
        if (canvas) {
          QRCode.toCanvas(canvas, this.youtubeLink, (error: Error | null) => {
            if (error) {
              console.error(error);
            } else {
              console.log('QR code generated!');
            }
          });
        } else {
          console.error('Canvas element not found!');
        }
      });
    },
    async generatePDF() {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text(this.title, 20, 20);
      
      // Add lyrics
      doc.setFontSize(12);
      doc.text('Lyrics:', 20, 30);
      doc.setFontSize(10);
      const lyricsLines = doc.splitTextToSize(this.lyrics, 170);
      doc.text(lyricsLines, 20, 40);
      
      // Add translation
      const translationY = 40 + (lyricsLines.length * 5);
      doc.setFontSize(12);
      doc.text('Translation:', 20, translationY);
      doc.setFontSize(10);
      const translationLines = doc.splitTextToSize(this.translation, 170);
      doc.text(translationLines, 20, translationY + 10);
      
      // Add YouTube link
      const linkY = translationY + 10 + (translationLines.length * 5);
      doc.setFontSize(12);
      doc.textWithLink('Watch on YouTube', 20, linkY, { url: this.youtubeLink });
      
      // Add QR code
      const canvas = document.getElementById('qrcodeCanvas') as HTMLCanvasElement;
      if (canvas) {
        const qrCodeDataUrl = canvas.toDataURL('image/png');
        doc.addImage(qrCodeDataUrl, 'PNG', 20, linkY + 10, 50, 50);
      }
      
      // Save the PDF
      doc.save(`${this.title}.pdf`);
    },
    async loadSongData() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/yashineonline/ilahi/main/ilahi.txt');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawContent = await response.text();
        const songsData: SongData[] = processSongsFile(rawContent);
        if (songsData.length > 0) {
          const song = songsData[0];
          this.title = song.title;
          this.lyrics = song.lyrics.map(stanza => stanza.join('\n')).join('\n\n');
          this.translation = song.translation.map(stanza => stanza.join('\n')).join('\n\n');
          this.youtubeLink = song.youtubeLink;
          this.songContent = JSON.stringify(song);
          this.generateQRCode();
        } else {
          console.log('No songs data available');
        }
      } catch (error) {
        console.error('Error fetching or processing the song data:', error);
      }
    },
  },
  mounted() {
    this.loadSongData();
  },
});
</script>./TestComponent.vue
