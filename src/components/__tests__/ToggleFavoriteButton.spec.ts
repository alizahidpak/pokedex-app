import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ToggleFavoriteButton } from "@/components";
import { pokemonStore } from "@/store/pokemon";

vi.mock("@/store/pokemon", () => ({
    pokemonStore: {
        TOGGLE_FAVORITE: vi.fn(),
    },
}));

describe("ToggleFavoriteButton", () => {
    it("toggles favorite class and calls store action on click", async () => {
        const pokemon = { id: 1, name: "Bulbasaur", isFavorite: false };

        const wrapper = mount(ToggleFavoriteButton, {
            propsData: { pokemon },
        });

        expect(wrapper.find("img").classes()).not.toContain("is-favorite");

        const button = wrapper.find("button");
        await button.trigger("click");

        expect(pokemonStore.TOGGLE_FAVORITE).toHaveBeenCalledWith(pokemon);

        await wrapper.setProps({ pokemon: { ...pokemon, isFavorite: true } });

        expect(wrapper.find("img").classes()).toContain("is-favorite");
    });
});
