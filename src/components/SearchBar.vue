<template>
  <div class="search-bar">
    <input
      v-model="query"
      :placeholder="placeholder"
      :style="{ padding: padding, fontSize: fontSize }"
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
  @Prop({ default: "1.8rem 0" }) padding!: string;
  @Prop({ default: "2rem" }) fontSize!: string;

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
  padding: 1.2rem 2.4rem;
  border-radius: 0.5rem;
  background-color: $input-bg-color;
  gap: 1.2rem;
  width: 100%;
}

input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: $input-bg-color;
}

.clear-button {
  width: 4.8rem;
  height: 4.8rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.5s;
  color: #555;
  font-size: 3.2rem;
}
</style>
