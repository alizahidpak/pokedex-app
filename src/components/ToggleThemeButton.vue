<template>
    <button
        :style="{ background: gradient }"
        class="toggle-theme-button"
        @click="toggleTheme"
    >
        <span
            :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }"
            class="mode"
        >
            <IconBase
                :height="height"
                :icon-color="iconColor"
                :iconName="iconName"
                :width="width"
            />
        </span>
    </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IconBase } from "@/components";

@Component({
    components: {
        IconBase,
    },
})
export default class ToggleThemeButton extends Vue {
    isDarkMode = true;
    height = "1.5rem";
    width = "1.5rem";

    get iconName() {
        return this.isDarkMode ? "Moon" : "Sun";
    }

    get gradient() {
        return this.isDarkMode
            ? "linear-gradient(270deg, var(--vt-c-white-mute) 0% 50%, transparent 50%)"
            : "linear-gradient(90deg, var(--color-border) 0% 50%, transparent 50%)";
    }

    get iconColor() {
        return "var(--color-text)";
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.classList.toggle("light");
    }
}
</script>

<style>
.toggle-theme-button {
    position: relative;
    border-radius: 999rem;
    width: 8rem;
    height: 2.5rem;
    border: 2px solid #f1f1f1;
    outline: var(--color-border) solid 2px;
}

.toggle-theme-button:hover {
    cursor: pointer;
}

.mode {
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    transform: translate(0%, -50%);
}

.dark-mode {
    left: 5px;
    background-color: var(--color-background);
    border-radius: 50% 0 0 50%;
}

.light-mode {
    right: 5px;
    background-color: var(--color-background);
    border-radius: 0 50% 50% 0;
}
</style>
