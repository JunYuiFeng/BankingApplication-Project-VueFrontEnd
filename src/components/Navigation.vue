<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Oitavo exemplo de barra de navegação"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <font>Home</font>
        </router-link>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/RegisterUser" class="nav-link">
              Register
            </router-link>
          </li>
          <li v-if="store.isLoggedIn" class="nav-item">
            <button
              type="button"
              class="btn btn-danger"
              @click="logout"
              style="margin: 2px 30px"
            >
              Log out
            </button>
          </li>
          <li v-else class="nav-item">
            <button
              type="button"
              class="btn btn-success"
              @click="$router.push('/login')"
              style="margin: 2px 30px"
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { useUserSessionStore } from "./store/userSessionStore";

export default {
  name: "Navbar",
  setup() {
    const store = useUserSessionStore();
    return { store };
  },
  data() {
    return {
      isLoggedIn: this.store.isLoggedIn,
    };
  },
  methods: {
    logout() {
      this.store.logout();
    },
  },
};
</script>

<style scoped></style>
