<template>
  <main>
    <TransitionFade>
      <BaseTable v-if="!loading && !notFound" :pokemon="pokemon" />
      <div v-else>
        <h2 v-if="notFound">No Pokémon found</h2>
        <LoaderPokeball v-else />
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseTable, LoaderPokeball, TransitionFade } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
  components: {
    BaseTable,
    TransitionFade,
    LoaderPokeball,
  },

  mounted() {
    pokemonStore.getMaxPokemonCount().then(() => {
      if (pokemonStore.pokemon.length === 0) {
        pokemonStore.getMultipleRandomPokemon(5);
      }
    });
  },
})
export default class PokemonSearchResult extends Vue {
  get pokemon() {
    return pokemonStore.pokemon;
  }

  get loading() {
    return pokemonStore.loading;
  }

  get notFound() {
    return pokemonStore.notFound;
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

h2 {
  font-size: 2rem;
}
</style>
