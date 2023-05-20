<template>
    <div class="bankAccount rounded shadow-sm p-3 mb-4">
        <div class="row">
            <div class="col d-flex justify-content-center align-items-center">
                <p>{{bankAccount.userAccount.firstName}}</p>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <p>{{bankAccount.type}}</p>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <p>{{bankAccount.iban}}</p>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <p>€ {{bankAccount.absoluteLimit}}</p>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
                <p>€ {{bankAccount.balance}}</p>
            </div>
            <div class="col-1 d-flex justify-content-center align-items-center">
                <p>{{bankAccount.status}}</p>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <div>
                    <button v-if="bankAccount.status.toLowerCase() === 'active'" class="btn btn-danger btn-sm mb-2">deactivate</button>
                    <button v-else class="btn btn-success mb-2 pe-4 btn-sm">activate</button>
                    <br>
                    <button class="btn btn-primary pe-5 btn-sm">edit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BankAccount',
    props: {
        bankAccount: Object,
    }
}
</script>

<style scoped>
.bankAccount {
    background: white;
    }
</style>