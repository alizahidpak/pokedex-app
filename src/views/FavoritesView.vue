<template>
  <main class="container">
    <FavoritesHeader @search="filterFavorites" />
    <BaseTable :pokemon="favorites" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseTable, FavoritesHeader } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
  components: {
    FavoritesHeader,
    BaseTable,
  },
})
export default class PokemonFavorites extends Vue {
  filteredFavorites: any[] = [];

  get favorites() {
    if (this.filteredFavorites.length > 0) {
      return this.filteredFavorites;
    } else {
      return pokemonStore.favorites;
    }
  }

  filterFavorites(query: string) {
    if (query.length > 0) {
      this.filteredFavorites = pokemonStore.favorites.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredFavorites = [];
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
