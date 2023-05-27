<template>
    <div class="container mt-5">
        <h2>Transfer</h2>
        <form ref="form">
            <!-- From Account -->
            <div class="form-group mb-4 mt-5">
                <label for="fromAccount">From Account:</label>
                <select class="form-control" id="fromAccount" v-model="fromAccount">
                    <option>Select Account</option>
                    <option v-for="account in bankAccounts" :key="account.iban">{{ account.type }} {{ account.iban }}
                    </option>
                </select>
            </div>

            <!-- To Account -->
            <div class="form-group mb-4">
                <label for="toAccount">To Account:</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">NL</span>
                    </div>
                    <input type="number" class="form-control" id="amount" placeholder="Enter IBAN">
                </div>
            </div>

            <!-- Amount -->
            <div class="form-group mb-4">
                <label for="amount">Amount:</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">&#8364;</span>
                    </div>
                    <input type="number" class="form-control" id="amount" placeholder="Enter amount">
                </div>
            </div>

            <!-- Description -->
            <div class="form-group mb-4">
                <label for="description">Description:</label>
                <textarea class="form-control" id="description" rows="3" placeholder="Enter description"></textarea>
            </div>

            <!-- Submit -->
            <button type="submit" class="btn btn-primary" @click="makeTransaction">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from '../../Axios-auth';

export default {
    name: 'CreateTransaction',
    data() {
        return {
            bankAccounts: [],
            fromAccount: '',
            toAccount: 'NL',
            amount: null,
            description: ''
        }
    },
    mounted() {
        this.getBankAccounts();
    },
    methods: {
        getBankAccounts() {
            axios.get('/BankAccounts/UserAccount/3')
                .then(response => {
                    this.bankAccounts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        makeTransaction() {
            axios.post('/Transactions', {
                fromAccount: this.fromAccount,
                toAccount: this.toAccount,
                amount: this.amount,
                description: this.description
            })
                .then(response => {
                    console.log(response);
                    this.$refs.form.reset(); // Reset the form fields
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>

<style scoped></style>