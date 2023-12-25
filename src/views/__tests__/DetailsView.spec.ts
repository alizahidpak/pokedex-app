import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { pokemonStore } from "@/store/pokemon";
import PokemonDetails from "@/views/DetailsView.vue";
import { ToggleFavoriteButton } from "@/components";

vi.mock("@/store/pokemon", () => ({
    pokemonStore: {
        getPokemonDetailsByName: vi.fn(),
        selectedPokemon: {},
    },
}));

const samplePokemon = {
    name: "pikachu",
    sprites: { front_default: "pikachu.png" },
    id: 1,
    types: [
        {
            type: { name: "electric" },
        },
    ],
    abilities: [
        {
            ability: { name: "lightning-rod" },
        },
    ],
    stats: [
        {
            base_stat: 90,
            stat: { name: "speed" },
        },
    ],
    game_indices: [],
    moves: [],
    height: 4,
    weight: 60,
    isFavorite: false,
};

pokemonStore.selectedPokemon = samplePokemon;

describe("PokemonDetails", () => {
    const wrapper = mount(PokemonDetails, {
        mocks: {
            $route: {
                params: {
                    name: "pikachu",
                },
            },
        },
    });

    it("renders correctly with a selected pokemon", () => {
        expect(wrapper.text()).toContain("Pikachu");
        expect(wrapper.find(".primary-information").exists()).toBeTruthy();
        expect(wrapper.find(".secondary-information").exists()).toBeTruthy();
        expect(
            wrapper.findComponent(ToggleFavoriteButton).exists()
        ).toBeTruthy();
    });

    it("calls getPokemonDetailsByName on mounted", () => {
        expect(pokemonStore.getPokemonDetailsByName).toHaveBeenCalledWith(
            samplePokemon.name
        );
    });

    it("renders fallback message for empty game indices and moves", () => {
        pokemonStore.selectedPokemon = {
            ...samplePokemon,
            game_indices: [],
            moves: [],
        };

        expect(wrapper.text()).toContain("No game found");
        expect(wrapper.text()).toContain("No move found");
    });

    it("renders pokemon details correctly", () => {
        expect(wrapper.text()).toContain("Height");
        expect(wrapper.text()).toContain(samplePokemon.height.toString());
        expect(wrapper.text()).toContain("Weight");
        expect(wrapper.text()).toContain(samplePokemon.weight.toString());
        expect(wrapper.text()).toContain("Speed");
        expect(wrapper.text()).toContain(
            samplePokemon.stats[0].base_stat.toString()
        );
    });
});
