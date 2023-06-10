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
                <div>
                    <p>€ {{ formatNumber(bankAccount.balance) }}</p>
                    <p>Status:
                        <span :class="{
                            active: bankAccount.status == 'ACTIVE',
                            inactive: bankAccount.status == 'INACTIVE'}">
                            {{ bankAccount.status }}
                        </span>
                    </p>
                </div>
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

.active {
    color: rgb(37, 176, 13);
}

.inactive {
    color: red;
}
</style>