<template> 
    <div class="container ">
        
        <h1>ATM</h1>
        <ATMSuccess v-if="showATMSuccess" :successTitle="successTitle" @close="showATMSuccess = false"></ATMSuccess>
        <ATMFailed v-if="showATMFailed" :errorTitle="errorTitle" :errorMessage="errorMessage" @close="showATMFailed = false"></ATMFailed>
        
        <div class="d-flex justify-content-center">
            <div class="m-3" id="atm" v-if="showATM">
                <p v-if="!selectedAccount">Choose an account</p>
                <select class="inputField" v-model="selectedAccount">
                    <option v-for="bankAccount in bankAccounts" v-bind:value="bankAccount">{{ bankAccount.iban }}</option>
                </select>
                <p v-if="selectedAccount">{{ selectedAccount.type }} Account</p>
                <p v-if="selectedAccount">Balance</p>
                <p class="balance">
                    <span v-if="selectedAccount">€ {{ formatNumber(selectedAccount.balance) }}</span>               
                </p>
                <input v-if="selectedAccount" class="row" placeholder="enter an amount" v-model="amount" required/>
                <button v-if="selectedAccount" class="btn btn-primary m-2" @click="withdraw">Withdraw</button>
                <button v-if="selectedAccount" class="btn btn-primary m-2" @click="deposit">Deposit</button>             
            </div>       
        </div>

        <div v-if="showError" class="alert alert-danger mt-3 d-flex justify-content-center">
                    {{ showError }}
        </div> 
 
        
    </div>
</template>

<script>
import axios from '../../Axios-auth';
import { useUserSessionStore } from "../../store/userSessionStore";
import ATMSuccess from '../overview/ATMSuccess.vue';
import ATMFailed from '../overview/ATMFailed.vue';


export default {
    setup(){
        return { store : useUserSessionStore() };
    },
    components: {
        ATMSuccess,
        ATMFailed,
    },
    data() {
        return {    
            showATM: false,
            showError: "",
            hasCurrentAccount: true,
            hasSavingsAccount: true,
            errorMessage: "",
            amount: null,
            selectedAccount: null,
            showATMSuccess: false,
            showATMFailed: false,
            successTitle: "",
            errorTitle: "",
            bankAccount: {
                IBAN: "",
                type: "",
                status: "",
                balance: 0, 
                absoluteLimit: 0,
                userAccount: {},
            },
            transaction: {
                accountFrom: "",
                accountTo: "",
                amount: 0,
                description: "",
            },
        }
    },
    mounted() {
        this.userId = this.store.getUserId;
        this.getBankAccounts();  
    },
    methods: {
        getBankAccounts() {
            axios.get(`BankAccounts/UserAccount/${this.userId}`)
            .then(response => {
                console.log(response);
                this.bankAccounts = response.data;

                if (this.bankAccounts != null) {
                    this.showATM = true;                   
                }
                else {
                    this.showError = "You have no bank accounts";     
                }      
            })
            .catch(error => {
                console.log(error);
            })
        },
        withdraw() {
            if (this.amount == null || this.amount <= 0) {
                this.displayError = true;
                this.errorMessage = "Please enter a valid amount";
                return;
            }
            this.errorMessage = "";
            this.transaction.IBAN = this.selectedAccount.iban;
            this.transaction.amount = this.amount;

            axios.post(`Transactions/Withdrawal`, this.transaction)
            .then(response => {
                this.updateBankAccountBalance();  
                this.successTitle = "Withdraw successful";
                this.showATMSuccess = true;      
            })
            .catch(error => {
                console.log(error);
                this.errorTitle = "Withdraw failed";
                this.errorMessage = error.response.data.message;
                this.showATMFailed = true;
            })

        },
        deposit() {
            if (this.amount == null || this.amount <= 0) {
                this.displayError = true;
                this.errorMessage = "Please enter a valid amount";
                return;
            }
            this.errorMessage = "";
            this.transaction.IBAN = this.selectedAccount.iban;
            this.transaction.amount = this.amount;

            axios.post(`Transactions/Deposit`, this.transaction)
            .then(response => {
                this.updateBankAccountBalance();
                this.successTitle = "Deposit successful";
                this.showATMSuccess = true;  
            })
            .catch(error => {
                console.log(error);
                this.errorTitle = "Deposit failed";
                this.errorMessage = error.response.data.message;
                this.showATMFailed = true;
            })
        },
        updateBankAccountBalance() {
            axios.get(`BankAccounts/${this.selectedAccount.iban}`)
                .then(response => {
                this.selectedAccount.balance = response.data.balance;
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
};
</script>

<style scoped>
    input{
        margin: 0.3%;
        border: 1px solid #D9D9D9 ;
        border-radius: 5px;
        font-size: 20px;
    }

    p{
        font-size: 20px;
        margin: 1%;

    }

    select{
        font-size: 20px;
    }
</style>