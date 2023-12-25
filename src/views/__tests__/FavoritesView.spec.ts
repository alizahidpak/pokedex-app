import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import PokemonFavorites from "@/views/FavoritesView.vue";
import TableBase from "@/components/TableBase.vue";
import { pokemonStore } from "../../store/pokemon";

vi.mock("@/store/pokemon", () => ({
    pokemonStore: {
        favorites: [],
    },
}));

const samplePokemon = {
    name: "pikachu",
    sprites: { front_default: "pikachu.png" },
    id: 1,
    isFavorite: true,
    types: [],
    abilities: [],
    stats: [],
    game_indices: [],
    moves: [],
    height: 4,
    weight: 60,
};

describe("PokemonFavorites View", () => {
    it("Should render without any favorites", () => {
        pokemonStore.favorites = [];
        const wrapper = mount(PokemonFavorites);
        expect(wrapper.text()).toContain(
            "You have no pokémon in your favorites"
        );
    });

    it("Should render with favorites", () => {
        pokemonStore.favorites = [samplePokemon];
        const wrapper = mount(PokemonFavorites);
        expect(wrapper.findComponent(TableBase).exists()).toBeTruthy();
    });

    it("Should render 'No results found' when search does not match any favorites", () => {
        pokemonStore.favorites = [samplePokemon];
        const wrapper = mount(PokemonFavorites, {
            data() {
                return {
                    noResults: true,
                };
            },
        });
        expect(wrapper.text()).toContain("No results found");
    });

    it("Should filter favorites based on search query", async () => {
        const wrapper = mount(PokemonFavorites);
        wrapper.vm.filterFavorites("pikachu");
        expect(wrapper.vm.filteredFavorites).toEqual([samplePokemon]);
    });

    it("Should set noResults to true when search query does not match any favorites", async () => {
        const wrapper = mount(PokemonFavorites);
        wrapper.vm.filterFavorites("charizard");
        expect(wrapper.vm.noResults).toBeTruthy();
    });

    it("Should clear filteredFavorites and set noResults to false when search query is empty", async () => {
        const wrapper = mount(PokemonFavorites);
        wrapper.vm.filterFavorites("");
        expect(wrapper.vm.filteredFavorites).toEqual([]);
        expect(wrapper.vm.noResults).toBeFalsy();
    });
});
