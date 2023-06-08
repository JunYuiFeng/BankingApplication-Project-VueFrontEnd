<template>
    <div class="createBankAccount d-flex justify-content-center align-items-center">
        <div class="createBankAccountContainer shadow">
            <div @click="setBankAccountType('CURRENT')" class="bankAccountOption shadow m-4 p-2 ps-5 d-flex">
                <p>Current account</p>
            </div>

            <div @click="setBankAccountType('SAVINGS')" class="bankAccountOption shadow m-4 p-2 ps-5 d-flex mb-5">
                <p>Savings account</p>
            </div>

            <div v-if="createMessage" class="alert ms-5 me-5 rounded text-center" :class="['alert-success', {'alert-danger': displayError }]">
                    {{ createMessage }}
            </div> 

            <div>
                <div class="row">
                    <div class="col d-flex justify-content-end">
                        <button class="btn btn-danger cancelBtn" @click="$emit('cancel')">Cancel</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-warning createBtn" @click="createBankAccount">Create</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
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
            bankAccountType: '',
            createMessage: ''
        }
    },
    methods: {
        createBankAccount() {
            if (this.bankAccountType == '') {
                this.displayError = true;
                this.createMessage = "Please select a bank account type";
                return;
            }

            axios.post("/BankAccounts", {
                type : this.bankAccountType,
                userId : this.userAccount.id
            })
            .then((response) => {
                if (this.userAccount.type == 'ROLE_USER') {
                    this.changeRoleUsertoCustomer();
                }
                this.displayError = false;
                this.createMessage = "Bank account successfully created";
                console.log(response);      
            })
            .catch((error) => {
                this.displayError = true;
                this.createMessage = error.response.data.message;
                console.log(error);
            })
        },        
        changeRoleUsertoCustomer() {
            this.userAccount.type = 'ROLE_CUSTOMER';

            axios.put(`/UserAccounts/${this.userAccount.id}`, this.userAccount)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        },
        setBankAccountType(type) {
            if (type == 'CURRENT') {
                this.displayError = false;
                this.createMessage = "Current account selected";
            } else if (type == 'SAVINGS') {
                this.displayError = false;
                this.createMessage = "Savings account selected";              
            }
            this.bankAccountType = type;
        }
    }
};
</script>

<style scoped>
.createBankAccount {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    backdrop-filter: blur(3px);
}

.createBankAccountContainer {
    background: #D9D9D9;
    width: 50%;
    height: 40%;
    border-radius: 18px;
    z-index: 1;
}

.bankAccountOption {
    background: white;
    border-radius: 10px;
    font-size: 18pt;
}

.bankAccountOption:hover {
    background-color: #8E8E8E;
    cursor: pointer;
}
</style>