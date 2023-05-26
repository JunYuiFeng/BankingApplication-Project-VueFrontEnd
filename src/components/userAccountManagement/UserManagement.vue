<template>
  <div>
    <div class="container mt-5">
      <h1>User Accounts</h1>
      <div class="userOverview">
        <UserAccount v-for="userAccount in userAccounts" :userAccount="userAccount" />
        <div class="d-flex justify-content-end">
          <button class="btn btn-warning cancelBtn" @click="createUserAccount">Create New User Account</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { loadRouteLocation } from 'vue-router';
import UserAccount from './UserAccount.vue'
import CreateUserAccount from './CreateUserAccount.vue'
import axios from 'axios';

export default {
  components: {
    UserAccount,
    CreateUserAccount
  },
  data() {
    return {
      userAccounts: []
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    createUserAccount() {

    },
    load() {
      const token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJKdW5GZW5nIiwiYXV0aCI6WyJST0xFX0NVU1RPTUVSIl0sImlhdCI6MTY4NTA1ODI4MywiZXhwIjoxNjg1MDYxODgzfQ.c12pVk1hs44kX3-Qo4FRgGo2n7kw0zvJAk8t5ji6cRO_u1r5sZwDY66NyLebE73WxeswVZ89nBVDwCxDM92sEqiUH38AccbzwXAwFE9Shgmbgk_mPk2pjdnvzvhw-8gg3p2Ti3gx45BaoegXCf4dIzNFkFO3tKbwsL650uS1ssmWXuae_xO_u0aT7TYxCQoIVewiqD67YCapDRmG5EbzlSQZYCyRig3Cl39dN6RKY9nQ4fSRtqpPnz6XMF1kPTt8pGIvnKOsRiBDy0ArTPRzPA60Fz1IZqsm3ppFF5nVpMQMZFM42JboJkLS7MUbuy7qTYrkOULqkHlhkn8XpaAQQg'; // Replace 'your_token_here' with your actual token
      axios
        .get("http://localhost/UserAccounts", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((response) => {
          this.userAccounts = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.userOverview {
  background-color: #D9D9D9;
  margin-top: 5%;
  padding: 3%;
}
</style>
 