import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { FavoritesHeader, SearchBar } from "@/components";

describe("FavoritesHeader", () => {
    it("renders properly", () => {
        const wrapper = mount(FavoritesHeader);
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find("h1").text()).toBe("Favorite Pokémon");
        expect(wrapper.findComponent(SearchBar).exists()).toBeTruthy();
    });

    it("emits search event when search term is changed", async () => {
        const wrapper = mount(FavoritesHeader);
        const searchBar = wrapper.findComponent(SearchBar);

        searchBar.vm.$emit("input", "Pikachu");

        const searchEvents = wrapper.emitted("search");
        expect(searchEvents).toBeTruthy();

        if (searchEvents) {
            expect(searchEvents[0]).toEqual(["Pikachu"]);
        }
    });
});
