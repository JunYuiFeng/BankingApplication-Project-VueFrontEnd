<template>
  <div id="firstCart" class="text-center" style="min-height: 500px">
    <br /><br /><br /><br />
    <h2>Create new User</h2>
    <br />
    <div>
      <input
        v-model="username"
        required
        type="text"
        name="username"
        placeholder="Username"
      /><br /><br />
      <input
        v-model="password"
        required
        type="password"
        name="password"
        placeholder="Password"
      /><br /><br />
      <input
        v-model="firstname"
        required
        type="text"
        name="firstname"
        placeholder="First name"
      /><br /><br />
      <input
        v-model="lastname"
        required
        type="text"
        name="lastname"
        placeholder="Last name"
      /><br /><br />
      <input
        v-model="email"
        required
        type="text"
        name="email"
        placeholder="Email"
      /><br /><br />
      <input
        v-model="phoneNumber"
        required
        type="text"
        name="phoneNumber"
        placeholder="Phone number"
      /><br /><br />
      <input
        v-model="bsn"
        required
        name="bsn"
        placeholder="BSN"
      /><br /><br />
      <button class="btn btn-warning" @click="createUser">
        Create new User</button
      ><br /><br />
    </div>
  </div>
  <div
    v-if="registerUserMessage"
    class="alert"
    :class="{
      'alert-success': status === 'success',
      'alert-danger': status === 'error',
    }"
  >
    {{ registerUserMessage }}
  </div>
</template>

<script>
import axios from "../Axios-auth";
export default {
  data() {
    return {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      registerUserMessage: "",
      phoneNumber: "",
      bsn: "",
      status: "",
    };
  },
  methods: {
    createUser() {
      axios
        .post("/UserAccounts", {
          firstName: this.firstname,
          lastName: this.lastname,
          email: this.email,
          username: this.username,
          password: this.password,
          types: ["ROLE_USER"],
          phoneNumber: this.phoneNumber,
          bsn: this.bsn,
          dayLimit: 1000,
          transactionLimit: 250,
        })
        .then((response) => {
          this.registerUserMessage = "User was registered successfully";
          this.status = "success";
          this.success = true;
        })
        .catch((error) => {
          this.registerUserMessage =
            "An error occured while creating user, please try again!";
          this.status = "error";
          this.success = false;
        });
    },
  },
};
</script>
<style scoped>
input {
  margin: 0.3%;
  border: 1px solid #D9D9D9 ;
  border-radius: 5px;
}
</style>
