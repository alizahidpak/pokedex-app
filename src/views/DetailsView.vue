<template>
    <main>
        <div v-if="pokemon" class="container">
            <h2 class="text-align-center">
                {{ stringUtils.upperCaseFirstLetter(pokemon.name) }}
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
                            <li
                                v-for="item in pokemon.types"
                                :key="item.type.name"
                            >
                                {{
                                    stringUtils.upperCaseFirstLetter(
                                        item.type.name
                                    )
                                }}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p>Abilities</p>
                        <ul>
                            <li
                                v-for="item in pokemon.abilities"
                                :key="item.ability.name"
                            >
                                {{
                                    stringUtils.upperCaseFirstLetter(
                                        item.ability.name
                                    )
                                }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="img-box text-align-center">
                    <img
                        :alt="pokemon.name"
                        :src="
                            pokemon.sprites.front_default ||
                            '/src/assets/img/pokeball.png'
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
                            <p>
                                {{ stringUtils.removeHyphens(item.stat.name) }}
                            </p>
                            {{ item.base_stat }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="secondary-information">
                <div class="games-list">
                    <p class="text-align-center">Game indices</p>
                    <ul v-if="pokemon.game_indices.length > 0">
                        <li
                            v-for="game in pokemon.game_indices"
                            :key="game.version.name"
                        >
                            {{
                                stringUtils.upperCaseFirstLetter(
                                    game.version.name
                                )
                            }}
                        </li>
                    </ul>
                    <p v-else>{{ fallbackMessage("game") }}</p>
                </div>
                <div class="moves-list">
                    <p class="text-align-center">Moves</p>
                    <ul v-if="pokemon.moves.length > 0" class="grid--3">
                        <li v-for="item in pokemon.moves" :key="item.move.name">
                            {{
                                stringUtils.upperCaseFirstLetter(item.move.name)
                            }}
                        </li>
                    </ul>
                    <p v-else>{{ fallbackMessage("move") }}</p>
                </div>
            </div>
            <ToggleFavoriteButton
                :is-favorite="pokemon.isFavorite"
                :pokemon="pokemon"
            />
        </div>
        <div v-else-if="loading" class="loading">
            <LoaderPokeball />
        </div>
        <div v-else>
            <p>No Pokémon selected.</p>
        </div>
    </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { useStringUtils } from "@/utils/string-utils";
import { LoaderPokeball, ToggleFavoriteButton } from "@/components";
import { pokemonStore } from "@/store/pokemon";

@Component({
    components: {
        LoaderPokeball,
        ToggleFavoriteButton,
    },
})
export default class PokemonDetails extends Vue {
    stringUtils = useStringUtils();

    get loading() {
        return pokemonStore.loading;
    }

    get pokemon() {
        return pokemonStore.selectedPokemon;
    }

    fallbackMessage(info: string) {
        return `No ${info} found`;
    }

    mounted() {
        const name = this.$route.params.name;
        pokemonStore.getPokemonDetailsByName(name);
    }
}
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

img {
    width: 20rem;
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

.container {
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

.moves-list,
.games-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    text-align: center;
}

.moves-list ul,
.games-list ul {
    display: flex;
    flex-wrap: wrap;
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
    flex-direction: column;
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
        gap: 3rem;
    }

    .primary-information > .grid--2 > div {
        display: flex;
        flex-direction: column;
    }

    .primary-information .grid--2 > :nth-child(2n) {
        align-items: flex-end;
        text-align: end;
    }
}
</style>
