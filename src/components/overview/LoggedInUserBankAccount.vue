<template>
    <div>
        {{ bankAccount.type }} account
        <div class="bankAccountContainer shadow-sm p-3 mb-4 d-flex justify-content-between">
            <div>
                <p>{{ bankAccount.userAccount.firstName }} {{ bankAccount.userAccount.lastName }}</p>
                <p>{{ bankAccount.iban }}</p>
                <p>absoluteLimit: {{ bankAccount.absoluteLimit }}</p>
            </div>
            <div class="d-flex align-items-center">
                <p>€ {{ formatNumber(bankAccount.balance) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bankAccount: Object
    },
    methods: {
        formatNumber(number) {
            const parts = number.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return parts.join(',');
        }
    }
}
</script>

<style scoped>
.bankAccountContainer {
    background: #D9D9D9;
    border-radius: 18px;
}
</style>