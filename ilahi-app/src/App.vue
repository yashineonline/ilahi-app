<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view></router-view>

  <TestComponent />
  <BookComponent />

  <div class="container mx-auto p-4">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Song Lyrics</h1>
      <div class="lyrics bg-gray-100 p-6 rounded-lg shadow-lg">
        <p>{{ lyrics }}</p>
      </div>
      <div class="buttons mt-4 flex justify-center space-x-4">
        <button class="btn btn-primary" @click="showTranslation">Show Translation</button>
        <button class="btn btn-secondary" @click="openYoutubeLink">
          Watch on YouTube
        </button>
        <button class="btn btn-accent" @click="generatePDF">Generate PDF</button>
        <button class="btn btn-success" @click="downloadBook">Download PDF Book</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TestComponent from "./components/TestComponent.vue";
import BookComponent from "./components/BookComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    TestComponent,
    BookComponent,
  },
  data() {
    return {
      lyrics: "Your lyrics will appear here...",
    };
  },
  methods: {
    showTranslation() {
      // Implement show translation logic
      console.log("Show translation");
    },
    openYoutubeLink() {
      // Implement YouTube link opening logic
      console.log("Open YouTube link");
    },
    generatePDF() {
      // Implement PDF generation logic
      console.log("Generate PDF");
    },
    downloadBook() {
      // Implement book download logic
      console.log("Download book");
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
