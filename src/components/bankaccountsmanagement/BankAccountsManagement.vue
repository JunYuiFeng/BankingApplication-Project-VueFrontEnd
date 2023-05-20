<template>
    <div class="container">
        <h1 class="d-flex justify-content-center p-3 mb-4">Bank accounts management</h1>

        <div class="d-flex">
            <button class="btn btn-primary me-2">All</button>
            <button class="btn btn-primary me-2">pending</button>
            <button class="btn btn-primary me-2">approved</button>
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
            <BankAccount v-for="bankAccount in bankAccounts" :bankAccount="bankAccount"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BankAccount from './BankAccount.vue'

export default {
    name: 'BankAccountsManage',
    components: {
        BankAccount
    },
    data() {
        return {
            bankAccounts: [],
        }
    },
    mounted() {
        this.getBankAccounts();
    },
    methods: {
        getBankAccounts() {
            axios.get('http://localhost/BankAccounts')
                .then(response => {
                    this.bankAccounts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
}
</script>

<style scoped>.bankAccountsListContainer {
    background: #D9D9D9;
}

.header {
    background: white;
}
</style>