<template>
  <div class="containerWithFooter expand-lg">
    <div id="footer" class="">
      <footer
        class="d-flex flex-wrap justify-content-center align-items-center p-5 border-top"
      >
        <ul class="nav">
          <li class="nav-item">
            <a href="/" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <router-link to="/RegisterUser" class="nav-link">
              Register
            </router-link>
          </li>
          <li class="nav-item" v-if="this.store.isLoggedIn">
            <router-link to="/OverView" class="nav-link">
              OverView
            </router-link>
          </li>
          <li class="nav-item" v-if="this.store.isLoggedIn">
            <router-link to="/Transactions" class="nav-link">
              Transactions
            </router-link>
          </li>
        </ul>
        <div class="social-icons">
          <a href="https://www.instagram.com/" class="social-icon">
            <i style="margin-left: 200px" class="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/" class="social-icon">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com/" class="social-icon">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { useUserSessionStore } from "../store/userSessionStore";
import "../assets/main.css";
export default {
  name: "Footer",
  setup() {
    return { store: useUserSessionStore() };
  },
};
</script>

<style scoped>
.containerWithFooter {
  position: relative;
  bottom: 0;
  height: 100px;
  width: 100vw;
}

#footer {
  width: 100vw;
  flex-shrink: 0;
  background-color: #ccb38d;
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-item {
  list-style: none;
}

.nav-link {
  color: black;
  margin-right: 10px; /* Adjust the spacing between the links */
}
.nav-link:hover {
  transform: scale(1.2); /* Increase the size on hover */
}

.social-icons {
  justify-content: right;
  align-items: right;
  margin-top: 10px; /* Adjust the spacing between the links and icons */
}

.social-icon {
  color: black;
  margin-right: 10px; /* Adjust the spacing between the icons */
  font-size: 20px;
  transition: transform 0.3s ease-in-out;
}

.social-icon:hover {
  transform: scale(1.2); /* Increase the size on hover */
}
</style>
