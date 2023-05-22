<template>
  <div class="homepageContent">
    <div class="column">
      <h1 id="myH1">Blossom Bank</h1>
      <h3>The Leading Bank in The Netherlands</h3>
    </div>

    <div class="column">
      <img class="homepageImg" src="/pictures/homepageIMG.jpg" alt="Logo" />
    </div>
  </div>
</template>

<script>
import axios from "../Axios-auth.js";
import "../assets/main.css";

export default {
  name: "HomePage",
  data() {
    return {};
  },
};
</script>

<style scoped>
.homepageContent {
  display: flex;
  background-color: #5d0c1d;
}
#myH1 {
  margin-top: 5em;
}
.column {
  flex: 1;
  color: white;
  margin: 20px;
  align-items: center;
  text-align: center;
}

.homepageImg {
  width: 100%;
  height: auto;
  border-radius: 15px; /* Adjust the border-radius value as needed */
}
</style>
