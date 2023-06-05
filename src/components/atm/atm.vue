<template>
    <div class="container ">
        <h1>ATM</h1>
        
        <div class="d-flex justify-content-center">
            <div class="m-3" id="atm" v-if="showATM">
                <p v-if="!selectedAccount">Choose an account</p>
                <select class="inputField" v-model="selectedAccount">
                    <option v-for="bankAccount in bankAccounts" v-bind:value="bankAccount">{{ bankAccount.iban }}</option>
                </select>
                <p v-if="selectedAccount">{{ selectedAccount.type }} Account</p>
                <p v-if="selectedAccount">Balance</p>
                <p class="balance">
                    <span v-if="selectedAccount">€{{ selectedAccount.balance }}</span>               
                </p>
                <input v-if="selectedAccount" class="row" placeholder="enter an amount" v-model="amount" required/>
                <button v-if="selectedAccount" class="btn btn-primary m-2" @click="withdraw">Withdraw</button>
                <button v-if="selectedAccount" class="btn btn-primary m-2" @click="deposit">Deposit</button>             
            </div>       
        </div>

        <div v-if="errorMessage" class="alert mt-3 d-flex justify-content-center" :class="['alert-success', {'alert-danger': displayError }]">
                    {{ errorMessage }}
        </div> 
 
    </div>
</template>

<script>
import axios from '../../Axios-auth';
import { useUserSessionStore } from "../../store/userSessionStore";

export default {
    setup(){
        return { store : useUserSessionStore() };
    },
    data() {
        return {    
            showATM: false,
            hasCurrentAccount: true,
            hasSavingsAccount: true,
            errorMessage: "",
            displayError: false,
            amount: null,
            selectedAccount: null,
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
                    this.errorMessage = "You have no bank accounts";
                    this.displayError = true;        
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

            this.transaction.IBAN = this.selectedAccount.iban;
            this.transaction.amount = this.amount;

            axios.post(`Transactions/Withdrawal`, this.transaction)
            .then(response => {
                this.displayError = false;
                this.errorMessage = "Withdraw successful";
                this.updateBankAccountBalance();      
            })
            .catch(error => {
                console.log(error);
                this.showErrorMessage(error);
            })

        },
        deposit() {
            if (this.amount == null || this.amount <= 0) {
                this.displayError = true;
                this.errorMessage = "Please enter a valid amount";
                return;
            }
            
            this.transaction.accountTo = this.selectedAccount.iban;
            this.transaction.amount = this.amount;

            axios.post(`Transactions/Deposit`, this.transaction)
            .then(response => {
                this.displayError = false;
                this.errorMessage = "Deposit successful";
                this.updateBankAccountBalance();
            })
            .catch(error => {
                console.log(error);
                this.showErrorMessage(error);
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
        showErrorMessage(error) {
            this.displayError = true;
            if (error != null && error.response != null && error.response.data != null && error.response.data.message != null){
                const message = error.response.data.message;
                const parts = message.split(" ");
                parts.splice(0, 2);
                this.errorMessage = parts.join(" ").trim();
            }        
            else{
                this.errorMessage = "Transaction failed";
            }
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