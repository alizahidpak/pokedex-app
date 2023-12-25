<template>
    <header class="main-header">
        <SearchBar
            :placeholder="'Search for pokemon'"
            @input="onSearchTermChanged"
        />
        <ToggleThemeButton />
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'favorites' }">Favorites</router-link>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SearchBar, ToggleThemeButton } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
    components: {
        ToggleThemeButton,
        SearchBar,
    },
})
export default class MainHeader extends Vue {
    onSearchTermChanged(query: string) {
        pokemonStore.SET_LOADING(true);
        if (!query) pokemonStore.getNextBatch();
        else pokemonStore.searchPokemon(query);

        if (this.$route.name !== "home") this.$router.push({ name: "home" });
    }

    mounted() {
        pokemonStore.getNextBatch();
    }
}
</script>

<style lang="scss" scoped>
.main-header {
    display: flex;
    position: relative;
    align-items: center;
    color: white;
    font-size: 2.4rem;
    font-weight: bold;
    gap: 4rem;
    padding-bottom: 3.2rem;
    border-bottom: 1px solid #f1f1f1;
    margin: 4rem 0;
}
</style>
