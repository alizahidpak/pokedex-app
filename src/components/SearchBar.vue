<template>
    <div :style="{ fontSize: fontSize }" class="search-bar">
        <input v-model="query" :placeholder="placeholder" autofocus />
        <button v-show="query !== ''" class="clear-button" @click="clearSearch">
            X
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { useCommonUtils } from "@/utils/common-utils";

@Component
export default class SearchBar extends Vue {
    query = "";
    @Prop({ default: "Search" }) placeholder!: string;
    @Prop({ default: "2rem" }) fontSize!: string;

    commonUtils = useCommonUtils();

    debouncedInput = this.commonUtils.debounce((query: string) => {
        this.$emit("input", query);
    }, 600);

    clearSearch() {
        this.query = "";
    }

    @Watch("query")
    onQueryChanged(newQuery: string) {
        this.debouncedInput(newQuery);
    }
}
</script>

<style lang="scss" scoped>
.search-bar {
    position: relative;
    display: flex;
    align-items: center;
    padding: 1.2rem 2.4rem;
    border-radius: 1rem;
    border: 3px solid var(--color-border);
    gap: 1.2rem;
    width: 100%;
    color: var(--color-text);
    background-color: var(--vt-c-white-mute);
}

input {
    width: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    background: none;
    font-size: inherit;
}

.clear-button {
    position: absolute;
    height: 100%;
    aspect-ratio: 1;
    top: 50%;
    right: 0;
    transform: translate(0%, -50%);
    background: none;
    border: none;
    cursor: pointer;
    transition: 0.5s;
    color: rgba(85, 85, 85, 0.8);
    font-size: inherit;
}

.clear-button:hover {
    color: #000;
}
</style>
