import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TableBase from "@/components/TableBase.vue";

describe("TableBase", () => {
    it("renders a table when pokemon array is not empty", () => {
        const wrapper = mount(TableBase, {
            propsData: {
                pokemon: [
                    {
                        id: 1,
                        name: "bulbasaur",
                        height: 7,
                        weight: 69,
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
                ],
            },
        });

        expect(wrapper.find("table").exists()).toBe(true);
    });

    it("does not render a table when pokemon array is empty", () => {
        const wrapper = mount(TableBase, {
            propsData: {
                pokemon: [],
            },
        });

        expect(wrapper.find("table").exists()).toBe(false);
    });
});
