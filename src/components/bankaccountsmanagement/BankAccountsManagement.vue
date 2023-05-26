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
            <template v-if="bankAccounts.length === 0">
                <p class="d-flex justify-content-center mt-5 mb-5">No bank accounts available</p>
            </template>
            <template v-else>
                <BankAccount v-for="bankAccount in bankAccounts" :key="bankAccount.id" :bankAccount="bankAccount" />
            </template>
        </div>
    </div>
</template>

<script>
import axios from '../../Axios-auth';
import BankAccount from './BankAccount.vue'

export default {
    name: 'BankAccountsManagement',
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
            const token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJKdW5GZW5nIiwiYXV0aCI6WyJST0xFX0NVU1RPTUVSIl0sImlhdCI6MTY4NTA1ODI4MywiZXhwIjoxNjg1MDYxODgzfQ.c12pVk1hs44kX3-Qo4FRgGo2n7kw0zvJAk8t5ji6cRO_u1r5sZwDY66NyLebE73WxeswVZ89nBVDwCxDM92sEqiUH38AccbzwXAwFE9Shgmbgk_mPk2pjdnvzvhw-8gg3p2Ti3gx45BaoegXCf4dIzNFkFO3tKbwsL650uS1ssmWXuae_xO_u0aT7TYxCQoIVewiqD67YCapDRmG5EbzlSQZYCyRig3Cl39dN6RKY9nQ4fSRtqpPnz6XMF1kPTt8pGIvnKOsRiBDy0ArTPRzPA60Fz1IZqsm3ppFF5nVpMQMZFM42JboJkLS7MUbuy7qTYrkOULqkHlhkn8XpaAQQg'; // Replace 'your_token_here' with your actual token
            axios.get('/BankAccounts', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    this.bankAccounts = response.data;
                    console.log("hello");
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getActiveBankAccounts() {
            axios.get('/BankAccounts?status=active')
                .then(response => {
                    this.bankAccounts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getInactiveBankAccounts() {
            axios.get('/BankAccounts?status=inactive')
                .then(response => {
                    this.bankAccounts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
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