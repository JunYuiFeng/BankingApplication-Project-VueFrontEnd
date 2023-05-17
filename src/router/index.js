import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/HomePage.vue";
import Login from "../components/login/Login.vue";
import RegisterUser from "../components/RegisterUser.vue";

import Transaction from "../components/user/Transactions.vue";

import Overview from "../components/overview/Overview.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/RegisterUser", component: RegisterUser },
  { path: "/Overview", component: Overview },
  { path: "/Transactions", component: Transaction },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
