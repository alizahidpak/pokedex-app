<template>
  <header>
    <h1>Favorite Pokémon</h1>
    <SearchBar
      :font-size="'1.6rem'"
      :padding="'0'"
      :placeholder="'Find in your favorites'"
      @input="onSearchTermChanged"
    />
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchBar from "@/components/SearchBar.vue";

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
  margin-right: 1rem;
}

h1 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  header {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  header {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  h1 {
    text-align: center;
  }
}
</style>
