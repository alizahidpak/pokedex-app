<template>
    <main class="flex-col">
        <FavoritesHeader @search="filterFavorites" />
        <div ref="scrollContainer" class="container">
            <h2 v-if="noResults && favorites.length > 0">No results found</h2>
            <h2 v-else-if="favorites.length === 0">
                You have no pokémon in your favorites
            </h2>
            <TableBase v-else ref="scrollContainer" :pokemon="favorites" />
        </div>
    </main>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { TableBase, FavoritesHeader } from "@/components";
import { pokemonStore } from "@/store/pokemon";
import type { PokemonType } from "@/types";

@Component({
    components: {
        FavoritesHeader,
        TableBase,
    },
})
export default class PokemonFavorites extends Vue {
    filteredFavorites: PokemonType[] = [];
    noResults = false;

    get favorites() {
        if (this.filteredFavorites.length > 0) {
            return this.filteredFavorites;
        } else {
            return pokemonStore.favorites;
        }
    }

    filterFavorites(query: string) {
        if (query.length > 0) {
            this.filteredFavorites = pokemonStore.favorites.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            );
            this.noResults = this.filteredFavorites.length === 0;
        } else {
            this.noResults = false;
            this.filteredFavorites = [];
        }
    }
}
</script>

<style scoped>
.flex-col {
    display: flex;
    flex-direction: column;
}

.container {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
}
</style>
