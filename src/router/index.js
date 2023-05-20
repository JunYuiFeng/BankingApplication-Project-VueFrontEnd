import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/HomePage.vue";
import Login from "../components/login/Login.vue";
import RegisterUser from "../components/RegisterUser.vue";
import Overview from "../components/overview/Overview.vue";
import Transactions from "../components/overview/Transactions.vue";
import UserManagement from "../components/overview/UserManagement.vue";
import BankAccounts from "../components/bankaccountsmanagement/BankAccountsManagement.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/RegisterUser", component: RegisterUser },
  { path: "/Overview", component: Overview },
  { path: "/Transactions", component: Transactions },
  { path: "/UserManagement", component: UserManagement },
  { path: "/BankAccountsManagement", component: BankAccounts }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
