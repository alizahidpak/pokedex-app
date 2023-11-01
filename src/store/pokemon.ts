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

@Module({ name: "pokemonModule", store, dynamic: true, namespaced: true })
class PokemonModule extends VuexModule {
  public pokemon: PokemonType[] = [];
  public selectedPokemon: PokemonType | null = null;
  public favorites: PokemonType[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  public maxPokemon = 0;
  public loading = false;
  public notFound = false;

  @MutationAction
  async getMaxPokemonCount() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`).then(
      (res) => res.json()
    );
    return { maxPokemon: response.count };
  }

  @Action
  async getPokemonDetailsByName(name: string) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    ).then((res) => res.json());
    this.CHECK_FAVORITE(response);
    this.SET_SELECTED_POKEMON(response);
  }

  @Action
  async searchPokemon(query: string) {
    this.SET_LOADING(true);
    this.SET_POKEMON([]);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
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
  async getMultipleRandomPokemon(count: number) {
    this.SET_LOADING(true);

    const getRandomPokemonId = () =>
      Math.floor(Math.random() * this.maxPokemon) + 1;

    const fetchPokemonById = async (id: number) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (response.status === 404) {
        return null;
      }
      const pokemon: PokemonType = await response.json();
      this.CHECK_FAVORITE(pokemon);
      return pokemon;
    };

    const fetchBatch = async (ids: number[]) => {
      const fetchPromises = ids.map((id) => fetchPokemonById(id));
      return await Promise.all(fetchPromises);
    };

    const uniqueIds = new Set<number>();
    let validPokemonData: PokemonType[] = [];

    while (validPokemonData.length < count) {
      const remaining = count - validPokemonData.length;
      const batchIds: number[] = [];

      while (batchIds.length < remaining) {
        const id = getRandomPokemonId();
        if (!uniqueIds.has(id)) {
          uniqueIds.add(id);
          batchIds.push(id);
        }
      }

      const batchResults = await fetchBatch(batchIds);
      const validBatchResults = batchResults.filter(Boolean) as PokemonType[];
      validPokemonData = [...validPokemonData, ...validBatchResults];
    }

    this.SET_LOADING(false);
    this.SET_POKEMON(validPokemonData);
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
