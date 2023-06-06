<template>
    <div>
        <div class="container mt-5">
            <h1>Overview</h1>

            <div class="d-flex justify-content-between mt-3">
                <h5>Daylimit remaining: {{ getDayLimitRemaining }}</h5>

                <div>
                    <div class="d-flex justify-content-end mb-2" @click="this.$router.push('/CreateTransaction')">
                        <button type="button" class="btn btn-primary shadow-sm">Transfer</button>
                    </div>

                    <!-- <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-warning shadow-sm"
                            @click="showCreateBankAccount = true">Request
                            new
                            bank
                            account</button>
                    </div> -->
                </div>
            </div>

            <!-- <CreateBankAccount v-if="showCreateBankAccount" @cancel="showCreateBankAccount = false" /> -->

            <div class="bankAccountsOverviewContainer ps-5 pe-5">
                <div class="d-flex justify-content-end mt-5">
                    <h5 class="">Total balance: €{{ formatNumber(calculateTotalBalance()) }}</h5>
                </div>

                <LoggedInUserBankAccount v-for="bankAccount in bankAccounts" :key="bankAccount.id"
                    :bankAccount="bankAccount" />

            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../Axios-auth';
import LoggedInUserBankAccount from './LoggedInUserBankAccount.vue'
import { useUserSessionStore } from "../../store/userSessionStore";

export default {
    setup() {
        return { store: useUserSessionStore() };
    },
    components: {
        LoggedInUserBankAccount
    },
    data() {
        return {
            bankAccounts: [],
            loggedInUser: {},
            showCreateBankAccount: false
        }
    },
    mounted() {
        this.getLoggedInUserBankAccounts();
        this.getLoggedInUser();
    },
    methods: {
        getLoggedInUserBankAccounts() {
            axios.get(`/BankAccounts/UserAccount/${this.store.getUserId}`)
                .then((response) => {
                    this.bankAccounts = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        calculateTotalBalance() {
            return this.bankAccounts.reduce((total, bankAccount) => {
                return total + bankAccount.balance;
            }, 0);
        },
        getLoggedInUser(){
            axios.get(`/UserAccounts/${this.store.getUserId}`)
                .then((response) => {
                    this.loggedInUser = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        formatNumber(number) {
            const parts = number.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return parts.join(',');
        },
    },
    computed: {
        getDayLimitRemaining() {
            if (this.loggedInUser != null) {
                return this.loggedInUser.dayLimit - this.loggedInUser.currentDayLimit;
            }
            return 0;
        },
    }
}

</script>

<style scoped>
.bankAccountContainer {
    background: #D9D9D9;
    border-radius: 18px;
}

.bankAccountsOverviewContainer {
    margin-right: 10%;
    margin-left: 10%;
}
</style>