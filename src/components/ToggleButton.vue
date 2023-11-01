<template>
  <button>
    <img
      :class="{ 'is-favorite': pokemon.isFavorite }"
      alt="Favorite"
      src="@/assets/images/star.png"
      @click="toggleFavorite"
    />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { pokemonStore } from "@/store/pokemon";
import type { PokemonType } from "@/types";

@Component
export default class ToggleButton extends Vue {
  @Prop({ default: () => ({}), type: Object }) readonly pokemon!: PokemonType;

  toggleFavorite() {
    pokemonStore.TOGGLE_FAVORITE(this.pokemon);
  }
}
</script>

<style lang="scss" scoped>
button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  transition: 0.5s;
}

button:hover {
  opacity: 0.8;
}

img {
  transition: 0.5s;
  filter: grayscale(100%);
}

.is-favorite {
  filter: grayscale(0%);
}

img {
  width: 3.2rem;
  height: 3.2rem;
}
</style>
