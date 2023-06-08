<template>
  <div class="containerWithFooter expand-lg">
    <div id="footer" class="container">
      <footer
        class="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top absolute-bottom"
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
          <li class="nav-item">
            <router-link to="/OverView" class="nav-link">
              OverView
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Transaction" class="nav-link">
              Transactions
            </router-link>
          </li>
        </ul>
        <div class="social-icons">
          <a href="#" class="social-icon">
            <i style="margin-left: 200px" class="fab fa-instagram"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="social-icon">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import "../assets/main.css";
export default {
  name: "Footer",
};
</script>

<style scoped>
.containerWithFooter {
  min-height: 100px;
  background-color: #ccb38d;
}
#footer {
  flex-shrink: 0;
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
