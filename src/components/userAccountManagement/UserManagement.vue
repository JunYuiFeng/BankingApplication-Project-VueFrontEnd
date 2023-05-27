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
import axios from 'axios';

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
      const token = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJKb2huRG9lIiwiYXV0aCI6WyJST0xFX0NVU1RPTUVSIl0sImlhdCI6MTY4NTIxNTM4NSwiZXhwIjoxNjg1MjE4OTg1fQ.a5pMgTdRSSf-N3PIAlJ1_aUD_fL7UZ62r-feQW9vTDXXjW0F07l0KWKIpYmS3Wc8htcox-1sWwpY4J_GSkF6tn9j_jTzoqmBumhatTKJ9CgaZq52EK9mzdoYCbHTo1mmQ43XIRUaHw9N1XcsJtVHTLOB_xBRw_eQ5J9BfLDWayIS_N_bahPnOKfHD3T7TtLCjH1JeQfGAkjOGZt6GNTSWiCj4tFBYJTEtRMKSOgpOHDPj7f-SaGlrV5RPCwZwz4pvO_gHpRfXObf_84s5hzD2bdm_uoOGRXF02mP1nqmO0Or0kG-J2LzJ1pOoFKniiqjOCQV7Yux95K2uWelTJWNhw";
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
 