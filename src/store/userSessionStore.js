import { defineStore } from "pinia";
import Axios from "../Axios-auth";
import VueJwtDecode from 'vue-jwt-decode';

export const useUserSessionStore = defineStore("userSessionStore", {
  state: () => ({
    userId: "",
    username: "",
    token: "",
    role: "",
  }),
  getters: {
    isLoggedIn: (state) => {
      return state.username !== "";
    },
    getRole: (state) => {
      return state.role;
    },
    // getUserId: (state) => {
    //   this.userId = localStorage.getItem("userId");
    //   return state.userId;
    // }
  },
  actions: {
    autologin() {
      if (localStorage.getItem("token")) {
        this.token = localStorage.getItem("token");
        Axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
      }
    },
    login(username, password) {
      return new Promise((resolve, reject) => {
        Axios.post("/login", { username: username, password: password })
          .then((response) => {
            const tokenPayload = VueJwtDecode.decode(response.data.token);
            this.role = tokenPayload.auth;
            this.userId = tokenPayload.jti;
            
            this.token = response.data.token;
            this.username = response.data.sub;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", tokenPayload.auth);
            localStorage.setItem("userId", tokenPayload.jti);
            //localStorage.setItem("username", response.data.sub);
            Axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.token;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout() {
      this.username = "";
      this.token = "";
      this.role = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      Axios.defaults.headers.common["Authorization"] = "";
      localStorage.clear();
    },
  },
});
