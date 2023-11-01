<template>
  <header>
    <h1>Your Favorite Pokémon</h1>
    <SearchBar
      :padding="'0'"
      :placeholder="'Find in your favorites'"
      @input="onSearchTermChanged"
    />
  </header>
</template>
<script lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    SearchBar,
  },
})
export default class FavoritesHeader extends Vue {
  onSearchTermChanged(query: string) {
    this.$emit("search", query);
  }
}
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  gap: 2rem;
  padding: 0 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  white-space: nowrap;
}
</style>
