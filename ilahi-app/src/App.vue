<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <!-- <TestComponent /> -->
    <!-- <BookComponent /> -->
    <SongPlayer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
// import TestComponent from "./components/TestComponent.vue";
// import BookComponent from "./components/BookComponent.vue";
import SongPlayer from "./components/SongPlayer.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
    // TestComponent,
    // BookComponent,
    SongPlayer,
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
