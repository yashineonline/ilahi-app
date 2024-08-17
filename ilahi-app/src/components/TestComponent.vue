<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ lyrics }}</p>
    <a :href="youtubeLink" target="_blank">Watch on YouTube</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SongData } from '../utils/songProcessor.ts';

export default defineComponent({
  name: 'TestComponent',
  props: {
    song: {
      type: Object as PropType<SongData>,
      required: true
    }
  },
  computed: {
    title() {
      return this.song.title;
    },
    lyrics() {
      return this.song.lyrics.map(stanza => stanza.join('\n')).join('\n\n');
    },
    youtubeLink() {
      return this.song.youtubeLink;
    }
  }
});
</script>
