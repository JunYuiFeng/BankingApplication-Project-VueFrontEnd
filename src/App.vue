<script>
import { useUserSessionStore } from "./store/userSessionStore";
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
  }
};
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
