<template>
  <main>
    <div v-if="pokemon" class="details-container">
      <h2>{{ upperCaseFirstLetter(pokemon.name) }}</h2>
      <div class="primary-information">
        <div class="flex-small-gap">
          <div>
            <p>Height:</p>
            {{ pokemon.height }}
          </div>
          <div>
            <p>Weight:</p>
            {{ pokemon.weight }}
          </div>
          <div>
            <p>Types:</p>
            <ul>
              <li v-for="item in pokemon.types" :key="item.type.name">
                {{ upperCaseFirstLetter(item.type.name) }}
              </li>
            </ul>
          </div>
          <div>
            <p>Abilities:</p>
            <ul>
              <li v-for="item in pokemon.abilities" :key="item.ability.name">
                {{ upperCaseFirstLetter(item.ability.name) }}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img
            :alt="pokemon.name"
            :src="
              pokemon.sprites.front_default || '/src/assets/images/pokeball.png'
            "
          />
        </div>
        <div class="flex-small-gap">
          <p>Stats:</p>
          <ul>
            <li v-for="item in pokemon.stats" :key="item.stat.name">
              {{ upperCaseFirstLetter(item.stat.name) }}:
              {{ item.base_stat }}
            </li>
          </ul>
          <div>
            <p>Forms:</p>
            <ul>
              <li v-for="form in pokemon.forms" :key="form.name">
                {{ upperCaseFirstLetter(form.name) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="games-list">
        <p>Game indices:</p>
        <br />
        <ul>
          <li v-for="game in pokemon.game_indices" :key="game.version.name">
            {{ upperCaseFirstLetter(game.version.name) }}
          </li>
        </ul>
      </div>
      <div class="moves-list">
        <p>Moves:</p>
        <br />
        <ul>
          <li v-for="item in pokemon.moves" :key="item.move.name">
            {{ upperCaseFirstLetter(item.move.name) }}
          </li>
        </ul>
      </div>
      <ToggleButton :is-favorite="pokemon.isFavorite" :pokemon="pokemon" />
    </div>
    <div v-else>
      <p>No Pokémon selected.</p>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { useStringUtils } from "@/utils/string-utils";
import { ToggleButton } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
  components: {
    ToggleButton,
  },
})
export default class PokemonDetails extends Vue {
  get pokemon() {
    return pokemonStore.selectedPokemon;
  }

  upperCaseFirstLetter(name: string) {
    return useStringUtils().upperCaseFirstLetter(name);
  }
}
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

img {
  width: 200px;
}

ul {
  list-style: none;
  padding: 0;
}

p {
  font-weight: 600;
}

button {
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.details-container {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2rem;
  align-items: center;
}

.moves-list ul,
.games-list ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.primary-information {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  align-items: center;
}

.flex-small-gap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
