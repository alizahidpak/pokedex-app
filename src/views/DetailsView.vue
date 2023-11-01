<template>
  <main>
    <div v-if="pokemon" class="details-container">
      <h2 class="text-align-center">
        {{ upperCaseFirstLetter(pokemon.name) }}
      </h2>
      <div class="primary-information">
        <div class="grid--2">
          <div>
            <p>Height</p>
            {{ pokemon.height }}
          </div>
          <div>
            <p>Weight</p>
            {{ pokemon.weight }}
          </div>
          <div>
            <p>Types</p>
            <ul>
              <li v-for="item in pokemon.types" :key="item.type.name">
                {{ upperCaseFirstLetter(item.type.name) }}
              </li>
            </ul>
          </div>
          <div>
            <p>Abilities</p>
            <ul>
              <li v-for="item in pokemon.abilities" :key="item.ability.name">
                {{ upperCaseFirstLetter(item.ability.name) }}
              </li>
            </ul>
          </div>
        </div>
        <div class="img-box text-align-center">
          <img
            :alt="pokemon.name"
            :src="
              pokemon.sprites.front_default || '/src/assets/images/pokeball.png'
            "
          />
        </div>
        <div class="flex-small-gap">
          <ul class="grid--2">
            <li
              v-for="item in pokemon.stats"
              :key="item.stat.name"
              class="flex-col"
            >
              <p>{{ removeHyphens(item.stat.name) }}</p>
              {{ item.base_stat }}
            </li>
          </ul>
        </div>
      </div>
      <div class="secondary-information">
        <div class="games-list">
          <p class="text-align-center">Game indices</p>
          <ul>
            <li v-for="game in pokemon.game_indices" :key="game.version.name">
              {{ upperCaseFirstLetter(game.version.name) }}
            </li>
          </ul>
        </div>
        <div class="moves-list">
          <p class="text-align-center">Moves</p>
          <ul class="grid--3">
            <li v-for="item in pokemon.moves" :key="item.move.name">
              {{ upperCaseFirstLetter(item.move.name) }}
            </li>
          </ul>
        </div>
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

  mounted() {
    const name = this.$route.params.name;
    pokemonStore.getPokemonDetailsByName(name);
  },
})
export default class PokemonDetails extends Vue {
  get pokemon() {
    return pokemonStore.selectedPokemon;
  }

  upperCaseFirstLetter(name: string) {
    return useStringUtils().upperCaseFirstLetter(name);
  }

  removeHyphens(name: string) {
    return useStringUtils().removeHyphens(name);
  }
}
</script>

<style scoped>
img {
  width: 200px;
}

ul {
  list-style: none;
  padding: 0;
}

p {
  color: #777;
  font-weight: 600;
}

button {
  position: absolute;
  right: 1rem;
}

.details-container {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2rem;
  padding: 0 8rem;
}

.grid--2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  gap: 1rem;
}

.grid--3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  gap: 1rem;
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.text-align-center {
  text-align: center;
}

.moves-list ul,
.games-list ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.primary-information {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
}

.secondary-information {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.flex-small-gap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 832px) {
  .primary-information {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .primary-information li {
    align-items: flex-start;
  }

  .img-box {
    grid-row: 1 / span 2;
  }
}

@media (max-width: 592px) {
  .primary-information {
    grid-template-columns: 1fr;
  }
}
</style>
