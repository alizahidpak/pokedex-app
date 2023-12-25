import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MainHeader from "../MainHeader.vue";
import { pokemonStore } from "@/store/pokemon";

vi.mock("@/store/pokemon", () => ({
    pokemonStore: {
        SET_LOADING: vi.fn(),
        searchPokemon: vi.fn().mockResolvedValue([]),
        getNextBatch: vi.fn(),
    },
}));

describe("MainHeader", () => {
    const wrapper = mount(MainHeader, {
        mocks: {
            $route: {
                name: "wilderness",
            },
            $router: {
                push: vi.fn(),
            },
        },
    });

    it("onSearchTermChanged updates the loading state and searches for pokemon", async () => {
        const query = "pikachu";

        wrapper.vm.onSearchTermChanged(query);

        expect(pokemonStore.SET_LOADING).toHaveBeenCalledWith(true);
        expect(pokemonStore.searchPokemon).toHaveBeenCalledWith(query);
    });

    it("calls random pokemons when query is empty", async () => {
        const query = "";

        wrapper.vm.onSearchTermChanged(query);

        expect(pokemonStore.getNextBatch).toHaveBeenCalled();
    });
});
