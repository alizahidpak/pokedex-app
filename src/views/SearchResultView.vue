<template>
  <main ref="mainElement">
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
import { Component, Ref, Vue } from "vue-property-decorator";
import { BaseTable, LoaderPokeball, TransitionFade } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
  components: {
    BaseTable,
    TransitionFade,
    LoaderPokeball,
  },
})
export default class PokemonSearchResult extends Vue {
  @Ref("mainElement") readonly mainElement!: HTMLElement;

  get randomPokemonCount() {
    return this.updateRandomPokemonCount();
  }

  get pokemon() {
    return pokemonStore.pokemon;
  }

  get loading() {
    return pokemonStore.loading;
  }

  get notFound() {
    return pokemonStore.notFound;
  }

  mounted() {
    pokemonStore.getMaxPokemonCount().then(() => {
      if (pokemonStore.pokemon.length === 0) {
        pokemonStore.getMultipleRandomPokemon(this.randomPokemonCount);
      }
    });
  }

  updateRandomPokemonCount() {
    const mainHeight = this.mainElement.clientHeight;
    // Temporary solution for the height of the table rows
    const trHeight = 140;
    const maxRows = Math.floor(mainHeight / trHeight);
    return maxRows < 5 ? 5 : maxRows;
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
