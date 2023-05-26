<script>
//import { useUserSessionStore } from "./components/store/userSessionStore.js";
import Navbar from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
  // setup() {
  //   return { store: useUserSessionStore() };
  // },
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  // mounted() {
  //   this.store.isLoggedIn();
  // },
};
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
