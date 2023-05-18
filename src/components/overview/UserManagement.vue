<template>
    <div>
        <div class="container mt-5">
            <h1>User Accounts</h1>
            <UserAccount v-for="userAccount in userAccounts" :userAccount="userAccount"/>
        </div>
    </div>
</template>

<script>
import { loadRouteLocation } from 'vue-router';
import UserAccount from './UserAccount.vue'
import axios from 'axios';

export default {
  components: {
    UserAccount
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

</style>
 