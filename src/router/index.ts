import Vue from "vue";
import VueRouter from "vue-router";
import PokemonSearchResult from "@/views/SearchResultView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: PokemonSearchResult,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView.vue"),
    },
    {
      path: "/pokemon/:name",
      name: "details",
      component: () => import("../views/DetailsView.vue"),
    },
  ],
});

export default router;
