<template>
    <div class="container ">
        <h1>ATM</h1>
        
        <div class="d-flex justify-content-center">
            <div class="account m-3" id="checkingAccount">
                <h2>Checking Account</h2>
                <p class="IBAN">NL29INHOL111111</p>
                <p class="checkingBalance">€0</p>
                <input class="row" placeholder="enter an amount"/>
                <button class="btn btn-primary m-1" @click="withdraw">Withdraw</button>
                <button class="btn btn-primary m-1" @click="deposit">Deposit</button>
            </div>
            <div class="account m-3" id="savingsAccount">
                <h2>Savings Account</h2>
                <p class="IBAN">NL29INHOL222222</p>
                <p class="savingsBalance">€0</p>
                <input class="row" placeholder="enter an amount"/>
                <button class="btn btn-primary m-1" @click="withdraw">Withdraw</button>
                <button class="btn btn-primary m-1" @click="deposit">Deposit</button>
            </div>
        </div>
 
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
        withdraw() {
          
        },
        deposit() {
            
        }
    },
};
</script>

<style scoped>
    input{
        margin: 0.3%;
        border: 1px solid #D9D9D9 ;
        border-radius: 5px;
    }
</style>