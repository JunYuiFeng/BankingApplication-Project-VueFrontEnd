<template>
  <div class="navDiv">
    <nav
      class="navbar navbar-expand-lg"
      aria-label="Oitavo exemplo de barra de navegação"
    >
      <div class="Container">
        <router-link to="/" class="navbar-brand">
          <img src="/pictures/logo1.jpg" alt="Logo" class="logo-img" />
        </router-link>
      </div>
      <div class="navbar-collapse justify-content-between">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!this.store.isLoggedIn">
            <router-link to="/RegisterUser" class="nav-link">
              Register
            </router-link>
          </li>

          <ul class="navbar-nav">
            <li class="nav-item" v-if="this.store.isLoggedIn">
              <router-link to="/Overview" class="nav-link">
                Overview
              </router-link>
            </li>
            <li class="nav-item" v-if="this.store.isLoggedIn">
              <router-link to="/ATM" class="nav-link">
                ATM
              </router-link>
            </li>
            <li class="nav-item" v-if="this.store.isLoggedIn">
              <router-link to="/Transactions" class="nav-link">
                Transactions
              </router-link>
            </li>
            <li class="nav-item" v-if="this.store.getRole == 'ROLE_EMPLOYEE'">
              <router-link to="/UserManagement" class="nav-link">
                UserManagement
              </router-link>
            </li>
            <li class="nav-item" v-if="this.store.role == 'ROLE_EMPLOYEE'">
              <router-link
                to="/BankAccountsManagement"
                class="nav-link"
                active-class="active"
              >
                BankAccountManagement
              </router-link>
            </li>
            <li class="nav-item" v-if="this.store.role == 'ROLE_EMPLOYEE'">
              <router-link
                to="/TransferService"
                class="nav-link"
                active-class="active"
              > 
                Transfer Service
              </router-link>
            </li>
          </ul>
          <li class="nav-item" v-if="this.store.isLoggedIn">
            <router-link to="/Profile" class="nav-link">
              <img
                src="/pictures/profilePic.png"
                alt="profilePicture"
                class="profile-icon"
              />
            </router-link>
          </li>

          <li v-if="this.store.isLoggedIn" class="nav-item">
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
import { useUserSessionStore } from "../store/userSessionStore";

export default {
  name: "Navbar",
  setup() {
    return { store: useUserSessionStore() };
  },
  methods: {
    logout() {
      this.store.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navDiv {
  background-color: #5d0c1d;
}

.nav-item a.nav-link {
  color: white;
}

.navbar-nav.ml-auto {
  margin-left: auto;
}

.profile-icon {
  width: 30px; /* Adjust the width as needed */
  height: 30px; /* Adjust the height as needed */
  border-radius: 50%; /* Optional: Add border-radius for a circular profile icon */
  margin-left: 20px;
}
.nav-link:hover {
  transform: scale(1.2); /* Increase the size on hover */
}
</style>
