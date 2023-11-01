<template>
  <table v-if="pokemon.length > 0">
    <tbody>
      <tr v-for="item in pokemon" :key="item.id">
        <td>
          <div class="primary-information" @click="goToDetails(item)">
            <img
              :alt="item.name"
              :src="
                item.sprites.front_default || '/src/assets/images/pokeball.png'
              "
            />
            <p class="name">
              {{ upperCaseFirstLetter(item.name) }}
            </p>
          </div>
          <div class="secondary-information">
            <div>
              <ul>
                <li v-for="item in item.types" :key="item.type.name">
                  {{ upperCaseFirstLetter(item.type.name) }}
                </li>
              </ul>
              <p>Height: {{ item.height }}</p>
              <p>Weight: {{ item.weight }}</p>
            </div>
            <ToggleButton :pokemon="item" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { useStringUtils } from "@/utils/string-utils";
import { ToggleButton } from "@/components";
import { pokemonStore } from "@/store/pokemon";
import type { PokemonType } from "@/types";

@Component({
  components: {
    ToggleButton,
  },
})
export default class BaseTable extends Vue {
  @Prop({
    default: () => [],
    type: Array,
  })
  readonly pokemon!: PokemonType[];

  goToDetails(pokemon: PokemonType) {
    this.$router.push({ name: "details", params: { name: pokemon.name } });
    pokemonStore.SET_SELECTED_POKEMON(pokemon);
  }

  upperCaseFirstLetter(name: string) {
    return useStringUtils().upperCaseFirstLetter(name);
  }
}
</script>

<style lang="scss" scoped>
table {
  border-spacing: 0;
  width: 100%;
  margin-bottom: auto;
}

td {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid rgba(85, 85, 85, 0.5);
}

tr:last-child td {
  border-bottom: none;
}

img {
  width: 100px;
  height: 100px;
}

ul {
  list-style: none;
  display: flex;
  gap: 10px;
  font-weight: 600;
}

.primary-information {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
}

.name:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.secondary-information {
  display: flex;
  justify-content: space-between;
}

.secondary-information div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
