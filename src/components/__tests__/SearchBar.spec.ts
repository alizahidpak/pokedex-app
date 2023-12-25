import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { SearchBar } from "@/components";

describe("SearchBar", () => {
    it("renders properly", () => {
        const wrapper = mount(SearchBar);
        expect(wrapper.exists()).toBeTruthy();
    });

    it("binds input value with v-model", async () => {
        const wrapper = mount(SearchBar);
        const input = wrapper.find("input");
        await input.setValue("test query");
        expect(wrapper.vm.query).toBe("test query");
    });

    it("clears the search query when clear button is clicked", async () => {
        const wrapper = mount(SearchBar, {
            data() {
                return { query: "test" };
            },
        });
        await wrapper.find(".clear-button").trigger("click");
        expect(wrapper.vm.query).toBe("");
    });

    it("emits input event after debouncing", async () => {
        const debounceTime = 600;
        const wrapper = mount(SearchBar);
        const input = wrapper.find("input");

        vi.useFakeTimers();
        await input.setValue("test query");
        expect(wrapper.emitted("input")).toBeFalsy();

        vi.advanceTimersByTime(debounceTime);

        await nextTick();

        expect(wrapper.emitted("input")?.[0] || []).toEqual(["test query"]);

        vi.useRealTimers();
    });
});
