import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    /////COURSES/////
    {
      path: "/courses",
      name: "courses_index",
      component: () => import("./pages/courses/Index.vue"),
    },
    {
      path: "/courses/:id",
      name: "courses_show",
      component: () => import("./pages/courses/Show.vue"),
    },
    ///////////////////
  ],
});
