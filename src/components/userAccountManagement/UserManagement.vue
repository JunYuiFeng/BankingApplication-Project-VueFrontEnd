<template>
  <div>
    <div class="container mt-5">
        <h1>User Accounts</h1>
        <div class="userOverview">
          <UserAccount v-for="userAccount in userAccounts" :userAccount="userAccount"/>
          <div class="d-flex justify-content-end">
            <button class="btn btn-warning" @click="CreateUserAccount">Create New User Account</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import UserAccount from './UserAccount.vue'
import axios from '../../Axios-auth';

export default {
  components: {
    UserAccount,
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
    load(){
      axios
      .get("/UserAccounts")
      .then((response) => {
        this.userAccounts = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    CreateUserAccount() {
      console.log("CreateUserAccount");
      this.$router.push("/RegisterUser");
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
 