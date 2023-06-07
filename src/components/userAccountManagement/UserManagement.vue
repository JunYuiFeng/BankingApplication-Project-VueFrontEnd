<template>
  <div>
    <div class="container mt-5">
        <h1>User Accounts</h1>
        <div class="row">
          <div class="d-flex mt-2 mb-2">
            <input type="radio" class="btn-check" name="options" id="radio1" autocomplete="off" @change="loadAllUsers">
            <label class="btn btn-outline-primary me-2" for="radio1">All</label>

            <input type="radio" class="btn-check" name="options" id="radio2" autocomplete="off" @change="loadAllRegisteredUsers">
            <label class="btn btn-outline-primary me-2" for="radio2">No Bank Accounts</label>

            <div class="flex-grow-1"></div>

            <div>
              <button class="btn btn-warning" @click="CreateUserAccount">Create New User Account</button>
            </div>
          </div>
          
        </div>

        <div class="userOverview">
          
          <UserAccount v-for="userAccount in userAccounts" :userAccount="userAccount"/>
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
    this.loadAllUsers();
  },
  methods: {
    getUsers(url){
      axios
      .get(url)
      .then((response) => {
        this.userAccounts = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    loadAllUsers(){
      this.getUsers("/UserAccounts/Exclude/1");
    },
    loadAllRegisteredUsers(){
      this.getUsers("/UserAccounts/registered");
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
  padding: 3%;
}
</style>
 