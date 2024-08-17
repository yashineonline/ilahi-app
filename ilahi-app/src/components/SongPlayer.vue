<template>
    <div class="container mx-auto p-4">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Song Lyrics</h1>
        <div class="lyrics bg-gray-100 p-6 rounded-lg shadow-lg">
          <p>{{ lyrics }}</p>
        </div>
        <div class="buttons mt-4 flex justify-center space-x-4">
          <button class="btn btn-primary" @click="showTranslation">Show Translation</button>
          <button class="btn btn-secondary" @click="openYoutubeLink">Watch on YouTube</button>
          <button class="btn btn-accent" @click="generatePDF">Generate PDF</button>
          <button class="btn btn-success" @click="downloadBook">Download PDF Book</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "SongPlayer",
    data() {
      return {
        lyrics: "Your lyrics will appear here...",
      };
    },
    methods: {
      showTranslation() {
        console.log("Show translation");
      },
      openYoutubeLink() {
        console.log("Open YouTube link");
      },
      generatePDF() {
        console.log("Generate PDF");
      },
      downloadBook() {
        console.log("Download book");
      },
    },
  });
  </script>
  