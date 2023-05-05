<template>
  <div class="container">
    <div id="loginDiv" class="text-center col-12" style="height: 500px">
      <br /><br />
      <br /><br /><br />
      <h2>Login</h2>
      <div class="mt-5" method="post">
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Username"
        /><br /><br />
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
        /><br /><br />
        <button
          id="loginButton"
          type="submit"
          name="LoginButton"
          @click="login"
        >
          Login</button
        ><br /><br />
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/main.css";
import axios from "../../Axios-auth";
import { useUserSessionStore } from "../store/userSessionStore";

export default {
  setup() {
    return { store: useUserSessionStore() };
  },
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.store
        .login(this.username, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
