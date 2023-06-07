import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/HomePage.vue";
import Login from "../components/login/Login.vue";
import RegisterUser from "../components/RegisterUser.vue";
import Overview from "../components/overview/Overview.vue";
import CreateTransaction from "../components/overview/CreateTransaction.vue";
import Transactions from "../components/overview/Transactions.vue";
import UserManagement from "../components/userAccountManagement/UserManagement.vue";
import BankAccountsManagement from "../components/bankaccountsmanagement/BankAccountsManagement.vue";
import ATM from "../components/atm/ATM.vue";
import Profile from "../components/profile/Profile.vue";
import AddressBook from "../components/overview/AddressBook.vue";
import TransferService from "../components/TransferService.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/RegisterUser", component: RegisterUser },
  { path: "/Overview", component: Overview },
  { path: "/CreateTransaction", component: CreateTransaction },
  { path: "/Transactions", component: Transactions },
  { path: "/UserManagement", component: UserManagement },
  { path: "/BankAccountsManagement", component: BankAccountsManagement },
  { path: "/ATM", component: ATM },
  { path: "/Profile", component: Profile },
  { path: "/AddressBook", component: AddressBook },
  { path: "/TransferService", component: TransferService },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
