<template>
    <button class="btn btn-secondary m-4" @click="this.$router.push('/CreateTransaction')">Back</button>
    <div class="container mt-5">
        <div class="d-flex justify-content-center">
            <input type="search" placeholder="Search IBAN by name" class="form-control searchBar" v-model="searchQuery"
                @input="searchBankAccounts">
        </div>
        <table class="table table-striped mt-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">IBAN</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(bankAccount, index) in bankAccounts" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ bankAccount.userAccount.firstName }}</td>
                    <td>{{ bankAccount.userAccount.lastName }}</td>
                    <td>{{ bankAccount.iban }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from '../../Axios-auth';

export default {
    name: 'AddressBook',
    data() {
        return {
            bankAccounts: [],
            searchQuery: ''
        }
    },
    mounted() {
        this.getBankAccounts();
    },
    methods: {
        getBankAccounts() {
            axios.get('/BankAccounts')
                .then(response => {
                    this.bankAccounts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        searchBankAccounts() {
            axios.get(`/BankAccounts?name=${this.searchQuery}`)
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

<style scoped>
.searchBar {
    width: 20%;
}
</style>