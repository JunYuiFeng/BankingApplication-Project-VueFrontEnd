<template>
  <div id="firstCart" class="text-center d-flex flex-column" style="min-height: 500px">
    <h2>Register</h2>
    <div>
      <input
        class="row"
        v-model="username"
        required
        type="text"
        name="username"
        placeholder="Username"
      >
      <input
        class="row"
        v-model="password"
        required
        type="password"
        name="password"
        placeholder="Password"
      >
      <input
        class="row"
        v-model="firstname"
        required
        type="text"
        name="firstname"
        placeholder="First name"
      >
      <input
        class="row"
        v-model="lastname"
        required
        type="text"
        name="lastname"
        placeholder="Last name"
      >
      <input
        class="row"
        v-model="email"
        required
        type="text"
        name="email"
        placeholder="Email"
      >
      <input
        class="row"
        v-model="phoneNumber"
        required
        type="text"
        name="phoneNumber"
        placeholder="Phone number"
      >
      <input
        class="row"
        v-model="bsn"
        required
        name="bsn"
        placeholder="BSN"
      >
      <button class="btn btn-warning" @click="createUser">
        Create new User</button
      >  
    </div>
    <div v-if="registerMessage" class="message alert rounded text-center w-25 mt-5" :class="['alert-success', {'alert-danger': displayError }]">
      {{ registerMessage }}
    </div> 
  </div>
  
</template>

<script>
import axios from "../Axios-auth";
export default {
  data() {
    return {
      displayError: false,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      registerMessage: "",
      phoneNumber: "",
      bsn: "",
    };
  },
  methods: {
    createUser() {
      axios
        .post("/UserAccounts/register", {
          firstName: this.firstname,
          lastName: this.lastname,
          email: this.email,
          username: this.username,
          password: this.password,
          phoneNumber: this.phoneNumber,
          bsn: this.bsn,
        })
        .then((response) => {
          this.displayError = false;
          this.registerMessage = "User registered successfully";
          console.log(response);
        })
        .catch((error) => {
          this.displayError = true;
          this.registerMessage = error.response.data.message;
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
#firstCart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 9%;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin: 10%;
  border: 1px solid #D9D9D9 ;
  border-radius: 5px;
}


.message  {
  margin-inline: auto;
}
</style>
