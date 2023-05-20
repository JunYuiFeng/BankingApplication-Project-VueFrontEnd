<template>
    <div>
        <div class="container mt-5">
            <h1>User Accounts</h1>
            <div class="userOverview">
              <UserAccount v-for="userAccount in userAccounts" :userAccount="userAccount"/>
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
    load(){
        axios
      .get("http://localhost/UserAccounts")
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
 