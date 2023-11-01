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

  randomPokemonCount = 5;

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
    this.updateRandomPokemonCount();
    console.log(this.randomPokemonCount);
    pokemonStore.getMaxPokemonCount().then(() => {
      if (pokemonStore.pokemon.length === 0) {
        pokemonStore.getMultipleRandomPokemon(this.randomPokemonCount);
      }
    });

    window.addEventListener("resize", this.updateRandomPokemonCount);
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.updateRandomPokemonCount);
  }

  updateRandomPokemonCount() {
    this.$nextTick(() => {
      const mainHeight = this.mainElement.clientHeight;
      // Temporary solution for the height of the table rows
      const trHeight = 140;
      this.randomPokemonCount = Math.floor(mainHeight / trHeight);

      if (this.randomPokemonCount < 5) {
        this.randomPokemonCount = 5;
      }
    });
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
