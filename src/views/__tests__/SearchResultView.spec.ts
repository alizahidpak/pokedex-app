import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import PokemonSearchResult from "@/views/SearchResultView.vue";
import { pokemonStore } from "@/store/pokemon";

vi.mock("@/store/pokemon", () => ({
    pokemonStore: {
        pokemon: [],
        loading: false,
        notFound: false,
        getNextBatch: vi.fn(),
    },
}));

describe("PokemonSearchResult", () => {
    it("renders a table when pokemon array is not empty", () => {
        pokemonStore.pokemon = [
            {
                id: 1,
                name: "bulbasaur",
                height: 7,
                weight: 69,
                stats: [],
                game_indices: [],
                moves: [],
                sprites: {
                    front_default:
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                },
                types: [
                    {
                        type: {
                            name: "grass",
                        },
                    },
                ],
            },
        ];

        const wrapper = mount(PokemonSearchResult);

        expect(wrapper.find("table").exists()).toBe(true);
    });

    it("does not render a table when pokemon array is empty", () => {
        pokemonStore.pokemon = [];

        const wrapper = mount(PokemonSearchResult);

        expect(wrapper.find("table").exists()).toBe(false);
    });

    it("renders a loader when loading is true", () => {
        pokemonStore.loading = true;

        const wrapper = mount(PokemonSearchResult);

        expect(wrapper.find(".pokeball").exists()).toBe(true);
    });

    it("does not render a loader when loading is false", () => {
        pokemonStore.loading = false;

        const wrapper = mount(PokemonSearchResult);

        expect(wrapper.find(".pokeball").exists()).toBe(false);
    });

    it("renders a not found message when notFound is true", () => {
        pokemonStore.notFound = true;

        const wrapper = mount(PokemonSearchResult);

        expect(wrapper.find(".not-found").exists()).toBe(true);
    });

    it("does not render a not found message when notFound is false", () => {
        pokemonStore.notFound = false;

        const wrapper = mount(PokemonSearchResult);

        expect(wrapper.find(".not-found").exists()).toBe(false);
    });
});
