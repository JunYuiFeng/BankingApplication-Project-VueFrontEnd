import { defineStore } from "pinia";
import Axios from "../Axios-auth";
import axios from "axios";

export const useUserSessionStore = defineStore("userSessionStore", {
  state: () => ({
    username: "",
    token: "",
  }),
  getters: {
    isLoggedIn: (state) => {
      return state.username !== "";
    },
  },
  actions: {
    autologin() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
      }
    },
    login(username, password) {
      return new Promise((resolve, reject) => {
        Axios.post("/login", { username: username, password: password })
          .then((response) => {
            console.log(response);
            this.token = response.data.token;
            this.username = response.data.username;

            localStorage.setItem('token', response.data.token);
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout() {
      this.username = "";
    },
  },
});
