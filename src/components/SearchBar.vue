<template>
  <div class="search-bar">
    <input
      v-model="query"
      :placeholder="placeholder"
      :style="{ padding: padding }"
      autofocus
    />
    <button class="clear-button" @click="clearSearch">X</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { debounce } from "lodash";

@Component
export default class SearchBar extends Vue {
  query = "";
  @Prop({ default: "Search" }) placeholder!: string;
  @Prop({ default: "18px 0" }) padding!: string;

  debouncedInput = debounce((query: string) => {
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
$input-bg-color: #e5e5e5;

.search-bar {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 5px;
  background-color: $input-bg-color;
  gap: 12px;
  width: 100%;
}

input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: $input-bg-color;
  font-size: 1.2rem;
}

.clear-button {
  height: 2rem;
  width: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: 0.5s;
  font-size: 1.5rem;
}
</style>
