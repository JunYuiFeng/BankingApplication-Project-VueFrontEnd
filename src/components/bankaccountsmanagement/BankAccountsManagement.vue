<template>
    <div class="container">
        <h1 class="d-flex justify-content-center p-3 mb-4">Bank accounts management</h1>

        <div class="d-flex">
            <input type="radio" class="btn-check" name="options" id="radio1" autocomplete="off" @change="getBankAccounts">
            <label class="btn btn-outline-primary me-2" for="radio1">All</label>

            <input type="radio" class="btn-check" name="options" id="radio2" autocomplete="off"
                @change="getActiveBankAccounts">
            <label class="btn btn-outline-primary me-2" for="radio2">Active</label>

            <input type="radio" class="btn-check" name="options" id="radio3" autocomplete="off"
                @change="getInactiveBankAccounts">
            <label class="btn btn-outline-primary me-2" for="radio3">Inactive</label>
        </div>

        <div class="bankAccountsListContainer p-4 mt-5">
            <div class="header p-3 mb-2">
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <h5>name</h5>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <h5>account type</h5>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <h5>IBAN</h5>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <h5>absolute limit</h5>
                    </div>
                    <div class="col-2 d-flex justify-content-center">
                        <h5>balance</h5>
                    </div>
                    <div class="col-1 d-flex justify-content-center">
                        <h5>status</h5>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <h5>actions</h5>
                    </div>
                </div>
            </div>
            <div v-if="bankAccounts.length === 0">
                <p class="d-flex justify-content-center mt-5 mb-5">No bank accounts available</p>
            </div>
            <div v-else-if="errorMessage">
                <p class="d-flex justify-content-center mt-5 mb-5">{{ errorMessage }}</p>
            </div>
            <div v-else>
                <BankAccount v-for="bankAccount in bankAccounts" :key="bankAccount.iban" :bankAccount="bankAccount" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../Axios-auth';
import BankAccount from './BankAccount.vue';

export default {
    name: 'BankAccountsManagement',
    components: {
        BankAccount
    },
    data() {
        return {
            bankAccounts: [],
            errorMessage: '',
        }
    },
    mounted() {
        this.getBankAccounts();
    },
    methods: {
        getBankAccounts() {
            this.errorMessage = "";

            axios.get('/BankAccounts/ExcludeUserAccount/1')
                .then(response => {
                    this.bankAccounts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getActiveBankAccounts() {
            this.errorMessage = "";

            axios.get('/BankAccounts?status=active')
                .then(response => {
                    this.bankAccounts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getInactiveBankAccounts() {
            this.errorMessage = "";

            axios.get('/BankAccounts?status=inactive')
                .then(response => {
                    this.bankAccounts = response.data;
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.message) {
                        const errorMessage = error.response.data.message;

                        this.errorMessage = errorMessage;
                    } else {
                        console.log(error); // Fallback to logging the error if the message is not available
                    }
                });
        }
    }
}
</script>

<style scoped>
.bankAccountsListContainer {
    background: #D9D9D9;
}

.header {
    background: white;
}
</style>