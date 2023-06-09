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
          <div v-if="showError" class="alert mt-3 alert-danger">
            {{ notFound }}
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
          userAccounts: [],
          notFound: "",
          showError: false,
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
        this.showError = false;
        this.userAccounts = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.userAccounts = [];
        this.showError = true;
        this.notFound = error.response.data.message;
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

.container {
    height: 100%;
    margin-bottom: 10%;
}
</style>
 