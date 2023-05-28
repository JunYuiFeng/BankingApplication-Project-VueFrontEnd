<template>
    <div>
  
        <div id="userContainer">

            <div class="userContainerFields row">
                <div class="row">
                    <label class="col">First Name</label>
                    <label class="col">Last Name</label>
                    <label class="col">Email</label>
                    <label class="col">Username</label>
                    <label class="col">Account Type</label>
                </div>
                <p class="col" v-if="!confirmClicked">{{ userAccount.firstName }}</p>
                <input class="inputField col" v-else v-model="firstName"/>
                <p class="col" v-if="!confirmClicked">{{ userAccount.lastName }}</p>
                <input class="inputField col" v-else v-model="lastName" />
                <p class="col" v-if="!confirmClicked">{{ userAccount.email }}</p>
                <input class="inputField col" v-else v-model="email" />
                <p class="col" v-if="!confirmClicked">{{ userAccount.username }}</p>
                <input class="inputField col" v-else v-model="username" />
                <p class="col" v-if="!confirmClicked">{{ userAccount.types }}</p>
                <select class="inputField col" v-else="!confirmClicked" v-model="types">
                    <option value="CUSTOMER">Customer</option>
                    <option value="EMPLOYEE">Employee</option>
                </select>
            </div>

            <div class="userContainerFields row mb-5">
                <div class="row">
                    <label class="col">Phone Number</label>
                    <label class="col">BSN Number</label>
                    <label class="col">Day Limit</label>
                    <label class="col">Transaction Limit</label>
                    <label class="col"></label>
                </div>
                <p class="col" v-if="!confirmClicked">{{ userAccount.phoneNumber }}</p>
                <input class="inputField col" v-else v-model="phoneNumber" />
                <p class="col" v-if="!confirmClicked">{{ userAccount.bsn }}</p>
                <input class="inputField col" v-else v-model="bsn" />
                <p class="col" v-if="!confirmClicked">{{ userAccount.dayLimit }}</p>
                <input class="inputField col" v-else v-model="dayLimit" />
                <p class="col" v-if="!confirmClicked">{{ userAccount.transactionLimit }}</p>
                <input class="inputField col" v-else v-model="transactionLimit" />
                <button id="editButton" class="col btn" :class="['btn-primary', { 'btn-confirm': confirmClicked }]" @click="edit">
                    <template v-if="!confirmClicked">Edit</template>
                    <template v-else>Confirm</template>
                </button>  
                <div v-if="editUserMessage" class="alert mt-3" :class="['alert-success', {'alert-danger': displayError }]">
                    {{ editUserMessage }}
                </div> 
            </div>
            
        </div>      
    </div>
</template>

<script>
import axios from '../../Axios-auth';

export default {
  props: {
    userAccount: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      confirmClicked: false,
      displayError: null,
      editUserMessage: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      types: '',
      phoneNumber: '',
      bsn: '',
      dayLimit: '',
      transactionLimit: ''
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
        this.types = this.userAccount.types;
        this.phoneNumber = this.userAccount.phoneNumber;
        this.bsn = this.userAccount.bsn;
        this.dayLimit = this.userAccount.dayLimit;
        this.transactionLimit = this.userAccount.transactionLimit;


    },
    confirm() {

        this.userAccount.firstName = this.firstName,
        this.userAccount.lastName = this.lastName,
        this.userAccount.email = this.email,
        this.userAccount.username = this.username,
        this.userAccount.types = this.types,
        this.userAccount.phoneNumber = this.phoneNumber,
        this.userAccount.bsn = this.bsn,
        this.userAccount.dayLimit = this.dayLimit,
        this.userAccount.transactionLimit = this.transactionLimit

        axios
        .put(`/UserAccounts/update/${this.userAccount.id}`, this.userAccount)
        .then(response => {
            console.log(response);
            this.displayError = false;
            this.editUserMessage = "Edit successful";
        })
        .catch(error => {
            console.log(error);
            this.displayError = true;
            this.editUserMessage = "Failed to edit user";  
        });
    },
}
}
</script>

<style scoped>
    .userContainerFields {
        background-color: #FFFFFF;
        padding: 2%
    }

    p {
        margin: 0.3%;
    }

    .inputField {
        margin: 0.3%;
        border: 1px solid #D9D9D9 ;
        border-radius: 5px;
    }

    .btn-confirm {
        background-color: #15D804;
    }
</style>
 