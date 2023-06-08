<script>
import { useUserSessionStore } from "./store/userSessionStore";
//import { jwt } from "./server.js";
import Navbar from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
  setup() {
    return { store: useUserSessionStore() };
  },
  mounted() {
    // console.log("mounted");
    this.store.autologin();
    //this.role = localStorage.getItem("role");
    if (this.store.isLoggedIn) {
      //this.$router.push("/Overview");
    }
  },
  name: "App",
  components: {
    Navbar,
    Footer,
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
