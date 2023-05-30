<template>
    <div>
        {{ bankAccount.type }} account
        <div class="bankAccountContainer shadow-sm p-3 mb-4 d-flex justify-content-between">
            <div>
                <p>{{ bankAccount.userAccount.firstName }}</p>
                <p>{{ bankAccount.iban }}</p>
            </div>
            <div class="d-flex align-items-center">
                <p>€ {{ bankAccount.balance }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bankAccount: Object
    },
}
</script>

<style scoped>
.bankAccountContainer {
    background: #D9D9D9;
    border-radius: 18px;
}
</style>