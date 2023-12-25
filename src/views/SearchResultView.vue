<template>
    <main ref="mainElement">
        <TransitionFade>
            <div v-if="!notFound" key="list">
                <TableBase :pokemon="pokemon" />
                <LoaderPokeball v-if="loading" />
            </div>
            <div v-else key="not-found" class="not-found">
                <h2>No Pokémon found</h2>
            </div>
        </TransitionFade>
    </main>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { TableBase, LoaderPokeball, TransitionFade } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
    components: {
        TableBase,
        TransitionFade,
        LoaderPokeball,
    },
})
export default class PokemonSearchResult extends Vue {
    @Ref("mainElement") readonly mainElement!: HTMLElement;

    get pokemon() {
        return pokemonStore.pokemon;
    }

    get loading() {
        return pokemonStore.loading;
    }

    get notFound() {
        return pokemonStore.notFound;
    }

    handleScroll() {
        const scrollPosition = this.mainElement.scrollTop;
        const maxScroll = this.mainElement.scrollHeight;
        const height = this.mainElement.clientHeight;
        const atBottom = maxScroll - scrollPosition === height;
        if (atBottom) {
            pokemonStore.getNextBatch();
        }
    }

    mounted() {
        this.mainElement.addEventListener("scroll", this.handleScroll);
    }

    beforeDestroy() {
        this.mainElement.removeEventListener("scroll", this.handleScroll);
    }
}
</script>

<style lang="scss" scoped>
.not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

h2 {
    font-size: 2rem;
}
</style>
