<template>
  <div id="app">
    <MainHeader />
    <TransitionFade>
      <router-view />
    </TransitionFade>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MainHeader, TransitionFade } from "@/components";
import "animate.css";

@Component({
  components: {
    MainHeader,
    TransitionFade,
  },
})
export default class App extends Vue {}
</script>
