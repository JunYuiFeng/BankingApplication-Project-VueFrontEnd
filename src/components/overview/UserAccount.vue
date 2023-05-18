<template>
    <div>
        <div class="usersOverviewContainer">
            <div id="userContainer">

                <div class="userContainerFields row">
                    <div class="row">
                        <label for="firstName" class="col">First Name</label>
                        <label for="firstName" class="col">Last Name</label>
                        <label for="firstName" class="col">Email</label>
                        <label for="firstName" class="col">Username</label>
                        <label for="firstName" class="col">Account Type</label>
                    </div>
                    <p class="col" v-if="!confirmClicked">{{ userAccount.firstName }}</p>
                    <input class="inputField col" v-else v-model="firstName"/>
                    <p class="col" v-if="!confirmClicked">{{ userAccount.lastName }}</p>
                    <input class="inputField col" v-else v-model="lastName" />
                    <p class="col" v-if="!confirmClicked">{{ userAccount.email }}</p>
                    <input class="inputField col" v-else v-model="email" />
                    <p class="col" v-if="!confirmClicked">{{ userAccount.username }}</p>
                    <input class="inputField col" v-else v-model="username" />
                    <p class="col" v-if="!confirmClicked">{{ userAccount.accountType }}</p>
                    <input class="inputField col" v-else v-model="accountType" />
                                
                </div>
        
                <div class="userContainerFields row mb-5">
                    <div class="row">
                        <label for="firstName" class="col">Phone Number</label>
                        <label for="firstName" class="col">BSN Number</label>
                        <label for="firstName" class="col">Day Limit</label>
                        <label for="firstName" class="col">Transaction Limit</label>
                        <label for="firstName" class="col"></label>
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
                </div>
            </div>      

        </div>
    </div>
</template>

<script>
import axios from 'axios';

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
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      accountType: '',
      phoneNumber: '',
      bsn: '',
      dayLimit: '',
      transactionLimit: ''
    };
  },
  methods: {
    edit() {
        this.confirmClicked = !this.confirmClicked;

        if (!this.confirmClicked) {
            const updatedUserAccount = {
                // ... Spread operator: Basically makes it so that you don't have to write out this.userAccount.firstName, this.userAccount.lastName, etc.
                ...this.userAccount,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                username: this.username,
                accountType: this.accountType,
                phoneNumber: this.phoneNumber,
                bsn: this.bsn,
                dayLimit: this.dayLimit,
                transactionLimit: this.transactionLimit
            };

            axios
            .put(`http://localhost/UserAccounts/update/${updatedUserAccount.id}`, updatedUserAccount)
            .then(response => {
                //this.$router.push('/UserManagement');
                console.log(response);

            })
            .catch(error => {
                console.log(error);
            });
        }
    }
  }
}
</script>

<style scoped>
    .usersOverviewContainer {
        background-color: #D9D9D9;
        margin-top: 5%;
        padding: 3%;
    }

    .userContainerFields {
        background-color: #FFFFFF;
        padding: 3%
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
 