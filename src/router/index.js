import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/HomePage.vue";
import Login from "../components/login/Login.vue";
import RegisterUser from "../components/RegisterUser.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/RegisterUser", component: RegisterUser },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
