<template>
    <button class="btn btn-secondary m-4" @click="this.$router.push('/CreateTransaction')">Back</button>
    <div class="container mt-5">
        <div class="d-flex justify-content-center">
            <input type="search" placeholder="Search IBAN by name" class="form-control searchBar me-1"
                v-model="searchQuery" @keyup.enter="searchBankAccounts">
            <button class="btn btn-primary" @click="searchBankAccounts">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button>
        </div>
        <table class="table table-striped mt-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">IBAN</th>
                    <th scope="col">Type</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(bankAccount, index) in bankAccounts" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ bankAccount.userAccount.firstName }}</td>
                    <td>{{ bankAccount.userAccount.lastName }}</td>
                    <td>{{ bankAccount.iban }}</td>
                    <td>{{ bankAccount.type }}</td>
                </tr>
            </tbody>
        </table>

        <div v-if="errorMessage">
            <p class="d-flex justify-content-center mt-5 mb-5">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import axios from '../../Axios-auth';

export default {
    name: 'AddressBook',
    data() {
        return {
            bankAccounts: [],
            searchQuery: '',
            errorMessage: ''
        }
    },
    methods: {
        searchBankAccounts() {
            this.bankAccounts = []; // Clear the search results
            this.errorMessage = '';

            axios.get(`/BankAccounts?name=${this.searchQuery}`)
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