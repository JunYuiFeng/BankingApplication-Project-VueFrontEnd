import { defineStore } from "pinia";
import Axios from "../Axios-auth";
import VueJwtDecode from "vue-jwt-decode";

export const useUserSessionStore = defineStore("userSessionStore", {
  state: () => ({
    username: "",
    token: "",
    role: "",
  }),
  getters: {
    isLoggedIn: (state) => {
      return state.username !== "";
    },
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
            console.log(response);
            this.token = response.data.token;
            this.username = response.data.username;
            let decoded = VueJwtDecode.decode(response.data.token);
            current_user = decoded;
            // Extract the role from the JWT
            const tokenPayload = parseJwt(response.data.token);
            this.role = tokenPayload.role;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", tokenPayload.role);
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
    },
  },
});
