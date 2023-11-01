<template>
  <main>
    <TransitionFade>
      <BaseTable v-if="!loading" :pokemon="pokemon" />
      <LoaderPokeball v-else />
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
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  //justify-content: center;
  align-items: center;
  height: 100%;
}
</style>