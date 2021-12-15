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
    {
      path: "/register",
      name: "register",
      component: () => import("./pages/Register.vue"),
    },
    /////COURSES/////
    {
      path: "/courses",
      name: "courses_index",
      component: () => import("./pages/courses/Index.vue"),
    },
    {
      path: "/courses/create",
      name: "courses_create",
      component: () => import("./pages/courses/Create.vue"),
    },
    {
      path: "/courses/:id",
      name: "courses_show",
      component: () => import("./pages/courses/Show.vue"),
    },
    {
      path: "/courses/edit/:id",
      name: "courses_edit",
      component: () => import("./pages/courses/Edit.vue"),
    },
    ///////////////////
    /////LECTURERS/////
    {
      path: "/lecturers",
      name: "lecturers_index",
      component: () => import("./pages/lecturers/Index.vue"),
    },
    {
      path: "/lecturers/create",
      name: "lecturers_create",
      component: () => import("./pages/lecturers/Create.vue"),
    },
    {
      path: "/lecturers/:id",
      name: "lecturers_show",
      component: () => import("./pages/lecturers/Show.vue"),
    },
    {
      path: "/lecturers/edit/:id",
      name: "lecturers_edit",
      component: () => import("./pages/lecturers/Edit.vue"),
    },
    ///////////////////
    /////ENROLLMENTS/////
    {
      path: "/enrolments",
      name: "enrolments_index",
      component: () => import("./pages/enrolments/Index.vue"),
    },
    {
      path: "/enrolments/create",
      name: "enrolments_create",
      component: () => import("./pages/enrolments/Create.vue"),
    },
    {
      path: "/enrolments/:id",
      name: "enrolments_show",
      component: () => import("./pages/enrolments/Show.vue"),
    },
    {
      path: "/enrolments/edit/:id",
      name: "enrolments_edit",
      component: () => import("./pages/enrolments/Edit.vue"),
    },
    ///////////////////
  ],
});
