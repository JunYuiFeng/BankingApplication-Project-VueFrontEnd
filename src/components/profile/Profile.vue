<template>
    <div>
        <div class="container mt-5">
            <h1>User Account Details</h1>

            <div class="profileContainer mt-3 ms-3 row">
                <div class="col">
                    <label>First Name</label>
                    <p v-if="!confirmClicked">{{ userAccount.firstName }}</p>
                    <input class="inputField" v-else v-model="firstName"/>

                    <label>Last Name</label>
                    <p v-if="!confirmClicked">{{ userAccount.lastName }}</p>
                    <input class="inputField" v-else v-model="lastName" />

                    <label>Email</label>
                    <p v-if="!confirmClicked">{{ userAccount.email }}</p>
                    <input class="inputField" v-else v-model="email" />

                    <label>Username</label>
                    <p v-if="!confirmClicked">{{ userAccount.username }}</p>
                    <input class="inputField" v-else v-model="username" />
                    
                    <label>Account Type</label>
                    <p>CUSTOMER</p>
                    
                </div>

                <div class="col">
                    <label>Phone Number</label>
                    <p  v-if="!confirmClicked">{{ userAccount.phoneNumber }}</p>
                    <input class="inputField" v-else v-model="phoneNumber" />

                    <label>BSN Number</label>
                    <p v-if="!confirmClicked">{{ userAccount.bsn }}</p>
                    <input class="inputField" v-else v-model="bsn" />

                    <label>Day Limit</label>
                    <p>€ {{ formatNumber(userAccount.dayLimit) }}</p>

                    <label>Transaction Limit</label>
                    <p>€ {{ formatNumber(userAccount.transactionLimit) }}</p>

                    <button id="editButton" class="btn" :class="['btn-primary', { 'btn-confirm': confirmClicked }]" @click="edit">
                        <template v-if="!confirmClicked">Edit Profile</template>
                        <template v-else>Confirm</template>
                    </button>  

                </div>

                <div v-if="editUserMessage" class="alert mt-3" :class="['alert-success', {'alert-danger': displayError }]">
                    {{ editUserMessage }}
                </div> 
            
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../Axios-auth';
import { useUserSessionStore } from "../../store/userSessionStore";

export default {
    setup() {
        return { store : useUserSessionStore() };
    },
    name: 'Profile',
    data() {
        return {
            confirmClicked: false,
            editUserMessage: null,
            userAccount: {
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                type: '',
                phoneNumber: '',
                bsn: '',
                dayLimit: '',
                transactionLimit: '',
            }
           
        }
    },
    mounted() {
        this.userId = this.store.getUserId;
        this.load();    
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
            this.userAccount.phoneNumber = this.phoneNumber,
            this.userAccount.bsn = this.bsn,
            this.userAccount.dayLimit = this.dayLimit,
            this.userAccount.transactionLimit = this.transactionLimit

            axios
            .put(`/UserAccounts/${this.userId}`, this.userAccount)
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
        load() {
            console.log(this.userId);

            axios
            .get(`/UserAccounts/${this.userId}`)
            .then(response => {
                
                console.log(response);
                this.userAccount = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
        formatNumber(number) {
            const parts = number.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return parts.join(',');
        }
     }
}
</script>

<style scoped>

    .container {
        height: calc(100vh - 270px);
    }

    label {
        margin-top: 1%;
    }

    input {
        width: 100%;
        margin-bottom: 2%;
        border-radius: 5px;
        border: 1px solid #D9D9D9;
    }

    .btn-confirm {
        background-color: #15D804;
    } 
</style>
 