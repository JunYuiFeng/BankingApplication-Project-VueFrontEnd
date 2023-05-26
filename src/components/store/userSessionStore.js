import { defineStore } from "pinia";
import Axios from "../../Axios-auth";

export const useUserSessionStore = defineStore("userSessionStore", {
  state: () => ({
    username: "",
  }),
  getters: {
    isLoggedIn: (state) => {
      return state.username !== "";
    },
  },
  actions: {
    login(username, password) {
      return new Promise((resolve, reject) => {
        Axios.post("/login", { username: username, password: password })
          .then((response) => {
            console.log(response);
            this.username = response.data.username;
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
