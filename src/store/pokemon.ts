import {
    Action,
    getModule,
    Module,
    Mutation,
    MutationAction,
    VuexModule,
} from "vuex-module-decorators";
import type { PokemonType } from "@/types";
import store from "@/store";

@Module({ name: "pokemon-module", store, dynamic: true, namespaced: true })
class PokemonModule extends VuexModule {
    public pokemon: PokemonType[] = [];
    public selectedPokemon: PokemonType | null = null;
    public favorites: PokemonType[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );
    public loading = false;
    public notFound = false;

    @Action
    async getPokemonDetailsByName(name: string) {
        if (this.selectedPokemon?.name === name) return;
        this.SET_SELECTED_POKEMON(null);
        this.SET_LOADING(true);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
        ).then((res) => res.json());
        this.CHECK_FAVORITE(response);
        this.SET_LOADING(false);
        this.SET_SELECTED_POKEMON(response);
    }

    @Action
    async searchPokemon(query: string) {
        this.SET_LOADING(true);
        this.SET_POKEMON([]);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${query}`
        );
        if (response.status === 404) {
            this.SET_LOADING(false);
            this.SET_POKEMON([]);
            this.SET_NOT_FOUND(true);
            return;
        } else {
            this.SET_NOT_FOUND(false);
            const pokemon: PokemonType = await response.json();
            this.CHECK_FAVORITE(pokemon);
            this.SET_LOADING(false);
            this.SET_POKEMON([pokemon]);
        }
    }

    @Action
    async getNextBatch() {
        this.SET_LOADING(true);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${this.pokemon.length}&limit=20`
        ).then((res) => res.json());
        const pokemon = await Promise.all(
            response.results.map((result: any) =>
                fetch(result.url).then((res) => res.json())
            )
        );
        pokemon.forEach((p) => this.CHECK_FAVORITE(p));
        this.SET_LOADING(false);
        this.SET_NOT_FOUND(false);
        if (this.pokemon.length === 1) this.SET_POKEMON([]);
        if (
            this.pokemon[this.pokemon.length - 1]?.id ===
            pokemon[pokemon.length - 1]?.id
        )
            return;
        this.SET_POKEMON([...this.pokemon, ...pokemon]);
    }

    @Mutation
    SET_POKEMON(pokemon: PokemonType[]) {
        this.pokemon = pokemon;
    }

    @Mutation
    SET_SELECTED_POKEMON(pokemon: PokemonType | null) {
        this.selectedPokemon = pokemon;
    }

    @Mutation
    TOGGLE_FAVORITE(pokemon: PokemonType) {
        const index = this.favorites.findIndex((p) => p.id === pokemon.id);
        if (index === -1) {
            pokemon.isFavorite = true;
            this.favorites.push(pokemon);
        } else {
            this.favorites.splice(index, 1);
            pokemon.isFavorite = false;
        }
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }

    @Mutation
    CHECK_FAVORITE(pokemon: PokemonType) {
        pokemon.isFavorite = this.favorites.some((p) => p.id === pokemon.id);
    }

    @Mutation
    SET_LOADING(loading: boolean) {
        this.loading = loading;
    }

    @Mutation
    SET_NOT_FOUND(notFound: boolean) {
        this.notFound = notFound;
    }
}

export const pokemonStore = getModule(PokemonModule);
