<template>
  <div class="containerWithFooter expand-lg">
    <div id="footer" class="container">
      <footer
        class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
      >
        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item">
            <a href="/" class="nav-link px-2" style="color: #add5d5">Home</a>
          </li>
        </ul>
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
  min-height: 100vh;
  background-color: black;
}
</style>
