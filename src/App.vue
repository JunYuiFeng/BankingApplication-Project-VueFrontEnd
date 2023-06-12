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
    this.store.autologin();
    if (this.store.isLoggedIn) {
      //this.$router.push("/Overview");
    }
  },
  name: "App",
  components: {
    Navbar,
    Footer,
  },

};
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped>
</style>
