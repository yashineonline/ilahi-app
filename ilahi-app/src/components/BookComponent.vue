<template>
  <div>
    <button @click="downloadBook" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
      Download Full PDF Book
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import jsPDF from 'jspdf';
import { processSongsFile, SongData } from '../utils/songProcessor';

export const BookComponent = defineComponent({ 
  name: 'BookComponent',
  setup() {
    const downloadBook = async () => {
      try {
        const response = await fetch('http://localhost:3000/read-song');
        const rawContent = await response.text();
        const songsData: SongData[] = processSongsFile(rawContent);

        const doc = new jsPDF();
        
        // Add cover page
        doc.setFontSize(22);
        doc.text('Ilahi Book', 10, 20);
        doc.addPage();

        // Add Table of Contents
        doc.setFontSize(16);
        doc.text('Table of Contents', 10, 20);
        songsData.forEach((song, index) => {
          doc.text(`${index + 1}. ${song.title}`, 10, 30 + (index * 10));
        });
        doc.addPage();

        // Add song pages
        songsData.forEach((song, index) => {
          doc.setFontSize(14);
          doc.text(song.title, 10, 20);
          doc.setFontSize(12);
          const lyricsText = song.lyrics.map(stanza => stanza.join('\n')).join('\n\n');
          doc.text(lyricsText, 10, 30);
          if (index < songsData.length - 1) doc.addPage();
        });

        // Save the PDF
        doc.save('ilahiBook.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    };

    return { downloadBook };
  }
});

export const downloadBook = BookComponent.setup().downloadBook;

</script>
