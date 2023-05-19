<template>
    <div class="container">
        <h1 class="d-flex justify-content-center p-3 mb-5">BankAccounts</h1>

        <div class="d-flex">
            <button class="btn btn-primary me-2">All</button>
            <button class="btn btn-primary me-2">pending</button>
            <button class="btn btn-primary me-2">approved</button>
        </div>

        <div class="bankAccountsListContainer p-4 mt-5">
            <BankAccount></BankAccount>
        </div>
    </div>
</template>

<script>
import BankAccount from './BankAccount.vue';

export default {
    components: {
        BankAccount
    }

}
</script>

<style scoped>
.bankAccountsListContainer {
    background: #D9D9D9;
}

.bankAccount {
    background: white;
}

</style>