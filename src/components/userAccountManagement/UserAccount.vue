<template>
  <div>
    <div id="userContainer">
      <CreateBankAccount @cancel="cancel" v-if="showBankAccountForm" :userAccount="userAccount" />
      <div class="userContainerFields row">
        <div class="row">
          <label class="col">First Name</label>
          <label class="col">Last Name</label>
          <label class="col">Email</label>
          <label class="col">Username</label>
          <label class="col">Account Type</label>
        </div>
        <p class="col" v-if="!confirmClicked">{{ userAccount.firstName }}</p>
        <input class="inputField col" v-else v-model="firstName" />
        <p class="col" v-if="!confirmClicked">{{ userAccount.lastName }}</p>
        <input class="inputField col" v-else v-model="lastName" />
        <p class="col" v-if="!confirmClicked">{{ userAccount.email }}</p>
        <input class="inputField col" v-else v-model="email" />
        <p class="col" v-if="!confirmClicked">{{ userAccount.username }}</p>
        <input class="inputField col" v-else v-model="username" />
        <p class="col" v-if="!confirmClicked">{{ userAccount.type }}</p>
        <select class="inputField col" v-else="!confirmClicked" v-model="type">
          <option value="ROLE_CUSTOMER">Customer</option>
          <option value="ROLE_EMPLOYEE">Employee</option>
        </select>
      </div>

      <div class="userContainerFields row mb-5">
        <div class="row">
          <label class="col">Phone Number</label>
          <label class="col">BSN Number</label>
          <label class="col">Day Limit</label>
          <label class="col">Transaction Limit</label>
          <label class="col">Status</label>
        </div>
        <p class="col" v-if="!confirmClicked">{{ userAccount.phoneNumber }}</p>
        <input class="inputField col" v-else v-model="phoneNumber" />
        <p class="col" v-if="!confirmClicked">{{ userAccount.bsn }}</p>
        <input class="inputField col" v-else v-model="bsn" />
        <p class="col" v-if="!confirmClicked">{{ userAccount.dayLimit }}</p>
        <input class="inputField col" v-else v-model="dayLimit" />
        <p class="col" v-if="!confirmClicked">{{ userAccount.transactionLimit }}</p>
        <input class="inputField col" v-else v-model="transactionLimit" />
        <p class="col" v-if="!confirmClicked">{{ userAccount.status }}</p>
        <div v-if="userMessage" class="alert mt-3" :class="['alert-success', { 'alert-danger': displayError }]">
          {{ userMessage }}
        </div>
        <div class="row mt-3">   
          <div class="col-6">
            <button class="btn btn-warning w-50" @click="showForm">
              Create New Bank Account
            </button>
          </div>
          <div class="col-3 d-flex justify-content-end">
            <button v-if="userAccount.type !== 'ROLE_USER'" id="changeStatusButton" class="btn w-50" :class="['btn-danger', { 'btn-green': userAccount.status === 'INACTIVE' }]" @click="changeStatus">
              <template v-if="userAccount.status === 'ACTIVE'">Deactivate</template>
              <template v-else>Activate</template>
            </button>

            <button v-if="userAccount.type === 'ROLE_USER'" id="deleteButton" class="btn btn-danger w-50" @click="deleteUser">Delete</button>

          </div>
          <div class="col-3">
            <button id="editButton" class="btn w-50" :class="['btn-primary', { 'btn-green': confirmClicked }]" @click="edit">
              <template v-if="!confirmClicked">Edit</template>
              <template v-else>Confirm</template>
            </button>
          </div>
        </div>
      </div>
      

      <div class="d-flex justify-content-end"></div>
    </div>
  </div>
</template>

<script>
import axios from "../../Axios-auth";
import CreateBankAccount from "../overview/CreateBankAccount.vue";

export default {
  props: {
    userAccount: {
      type: Object,
      CreateBankAccount,
      required: true,
    },
  },
  data() {
    return {
      confirmClicked: false,
      statusClicked: false,
      showBankAccountForm: false,
      displayError: null,
      userMessage: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      type: "",
      phoneNumber: "",
      bsn: "",
      dayLimit: "",
      transactionLimit: "",
      user: {
        status: "",
      },
    };
  },
  methods: {
    edit() {
      if (this.confirmClicked) {
        this.confirm();
      }
      this.confirmClicked = !this.confirmClicked;
      this.firstName = this.userAccount.firstName;
      this.lastName = this.userAccount.lastName;
      this.email = this.userAccount.email;
      this.username = this.userAccount.username;
      this.type = this.userAccount.type;
      this.phoneNumber = this.userAccount.phoneNumber;
      this.bsn = this.userAccount.bsn;
      this.dayLimit = this.userAccount.dayLimit;
      this.transactionLimit = this.userAccount.transactionLimit;
    },
    confirm() {
      (this.userAccount.firstName = this.firstName),
        (this.userAccount.lastName = this.lastName),
        (this.userAccount.email = this.email),
        (this.userAccount.username = this.username),
        (this.userAccount.type = this.type),
        (this.userAccount.phoneNumber = this.phoneNumber),
        (this.userAccount.bsn = this.bsn),
        (this.userAccount.dayLimit = this.dayLimit),
        (this.userAccount.transactionLimit = this.transactionLimit);
      axios
        .put(`/UserAccounts/${this.userAccount.id}`, this.userAccount)
        .then((response) => {
          console.log(response);
          this.displayError = false;
          this.userMessage = "Edit successful";
        })
        .catch((error) => {
          console.log(error);
          this.displayError = true;
          this.userMessage = "Failed to edit user";
        });
    },
    changeStatus() {
      if (this.userAccount.status === "ACTIVE") {
        this.user.status = "INACTIVE";       
      } else {
        this.user.status = "ACTIVE";
      }

      axios
        .patch(`/UserAccounts/${this.userAccount.id}`, this.user)
        .then((response) => {
          console.log(response);
          this.displayError = false;
          this.userMessage = "Account is now " + this.user.status;
          this.updateStatusDisplay();
        })
        .catch((error) => {
          console.log(error);
          this.displayError = true;
          this.userMessage = error.response.data.message;
        });
    },
    deleteUser(){
      if (confirm("Are you sure you want to delete this user account?")) {
        axios
          .delete(`/UserAccounts/${this.userAccount.id}`)
          .then((response) => {
            console.log(response);
            this.displayError = false;
            this.userMessage = "User has been deleted";
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            this.displayError = true;
            this.userMessage = error.response.data.message;
          });
      }
    },
    updateStatusDisplay(){
      axios
      .get(`/UserAccounts/${this.userAccount.id}`)
      .then((response) => {
        this.userAccount.status = response.data.status;
      })
      .catch((error) => {
        console.log(error);
        this.displayError = true;
        this.userMessage = error.response.data.message;
      });
    },
    showForm() {
      this.userMessage = "";
      this.showBankAccountForm = true;
    },
    cancel() {
      this.showBankAccountForm = false;
    },
  },
  components: { CreateBankAccount },
};
</script>

<style scoped>
.userContainerFields {
  background-color: #ffffff;
  padding: 2%;
}

p {
  margin: 0.3%;
}

.inputField {
  margin: 0.3%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}

.btn-green {
  background-color: #15d804;
}
</style>
