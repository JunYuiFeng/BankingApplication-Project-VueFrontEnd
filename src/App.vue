<script>
import { useUserSessionStore } from "./store/userSessionStore";
//import { jwt } from "./server.js";
import Navbar from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
  setup() {
    return { store: useUserSessionStore() };
  },
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    this.store.autologin();
  },
  /*created() {
    const store = useUserSessionStore();
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      // Set the user session data in the Vuex store
      store.setToken(storedToken);
      store.setRole(storedRole);
    }
  },*/
};
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
