<template>
  <header>
    <SearchBar
      :placeholder="'Search for pokemon'"
      @input="onSearchTermChanged"
    />

    <router-link v-if="$route.name === 'favorites'" :to="{ name: 'home' }"
      >Home
    </router-link>

    <router-link v-else-if="$route.name === 'home'" :to="{ name: 'favorites' }"
      >Favorites
    </router-link>

    <a v-else href="#" @click="goBack">Back</a>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SearchBar } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
  components: {
    SearchBar,
  },
})
export default class MainHeader extends Vue {
  onSearchTermChanged(query: string) {
    pokemonStore.SET_LOADING(true);
    pokemonStore.searchPokemon(query).then(() => {
      if (this.$route.name !== "home") {
        this.$router.push({ name: "home" });
      }
    });
  }

  goBack() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  gap: 2rem;
  padding-bottom: 32px;
  border-bottom: 1px solid #f1f1f1;
}
</style>
