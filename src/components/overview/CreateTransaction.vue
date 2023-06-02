<template>
    <button class="btn btn-secondary m-4" @click="this.$router.push('/Overview')">Back</button>

    <div class="container mt-3">
        <div class="d-flex justify-content-between">
            <h2>Transfer</h2>

            <button class="btn btn-secondary" @click="this.$router.push('/AddressBook')">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                    class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                    <path
                        d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
            </button>
        </div>
        <form ref="form" @submit.prevent>
            <!-- From Account -->
            <div class="form-group mb-4 mt-4">
                <label for="fromAccount">From Account:</label>
                <select class="form-control" id="fromAccount" v-model="accountFrom">
                    <option>Select Account</option>
                    <option v-for="account in bankAccounts" :key="account.iban" :value="account.iban">{{ account.type }} {{ account.iban }}
                    </option>
                </select>
            </div>

            <!-- To Account -->
            <div class="form-group mb-4">
                <label for="toAccount">To Account:</label>
                <div class="input-group">
                    <!-- <div class="input-group-prepend">
                        <span class="input-group-text">NL</span>
                    </div> -->
                    <input type="text" class="form-control" id="amount" v-model="accountTo" placeholder="Enter IBAN">
                </div>
            </div>

            <!-- Amount -->
            <div class="form-group mb-4">
                <label for="amount">Amount:</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">&#8364;</span>
                    </div>
                    <input type="number" class="form-control" id="amount" v-model="amount" placeholder="Enter amount">
                </div>
            </div>

            <!-- Description -->
            <div class="form-group mb-4">
                <label for="description">Description:</label>
                <textarea class="form-control" id="description" v-model="description" rows="3" placeholder="Enter description"></textarea>
            </div>

            <!-- Submit -->
            <button class="btn btn-primary" type="submit" @click="makeTransaction">Submit</button>
        </form>
        <TransactionSuccess v-if="showTransactionSuccess" @cancel="showTransactionSuccess=false"/>
        <TransactionFailed v-if="showTransactionFailed" @cancel="showTransactionFailed=false"/>
    </div>
</template>

<script>
import axios from '../../Axios-auth';
import TransactionSuccess from './TransactionSuccess.vue';
import TransactionFailed from './TransactionFailed.vue';

export default {
    name: 'CreateTransaction',
    data() {
        return {
            showTransactionSuccess: false,
            showTransactionFailed: false,
            bankAccounts: [],
            accountFrom: '',
            accountTo: '',
            amount: '',
            description: ''
        }
    },
    components: {
        TransactionSuccess,
        TransactionFailed
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
                accountFrom: this.accountFrom,
                accountTo: this.accountTo,
                amount: this.amount,
                description: this.description
            })
                .then(response => {
                    this.showTransactionSuccess = true;
                    console.log(response);
                    //this.$refs.form.reset(); // Reset the form fields
                })
                .catch(error => {
                    this.showTransactionFailed = true;
                    console.log(error);
                })
        }
    }
}
</script>

<style scoped></style>