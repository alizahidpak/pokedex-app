import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ToggleThemeButton from "../ToggleThemeButton.vue";

describe("ToggleThemeButton", () => {
    it("toggles theme on click", async () => {
        const wrapper = mount(ToggleThemeButton, {});

        const html = document.documentElement;

        const button = wrapper.find("button");

        if (html.classList.contains("light")) {
            await button.trigger("click");
            expect(Array.from(html.classList)).not.toContain("light");
        } else {
            await button.trigger("click");
            expect(Array.from(html.classList)).toContain("light");
        }
    });
});
