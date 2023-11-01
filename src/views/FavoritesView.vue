<template>
  <main class="container">
    <h1>Your Favorite Pokémon</h1>
    <BaseTable :pokemon="favorites" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseTable } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
  components: {
    BaseTable,
  },
})
export default class PokemonFavorites extends Vue {
  get favorites() {
    return pokemonStore.favorites;
  }
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
