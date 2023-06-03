<template>
    <div class="requestBankAccount d-flex justify-content-center align-items-center">
        <div class="requestBankAccountContainer shadow">
            <div @click="requestBankAccount" class="bankAccountOption shadow m-4 p-2 ps-5 d-flex">
                <p>Current account</p>
            </div>

            <div class="bankAccountOption shadow m-4 p-2 ps-5 d-flex mb-5">
                <p>Savings account</p>
            </div>

            <div class="mt-5">
                <div class="row">
                    <div class="col d-flex justify-content-end">
                        <button class="btn btn-danger cancelBtn" @click="$emit('cancel')">Cancel</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-warning requestBtn">Request</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            bankAccountType: 'CURRENT',
            id: 2,
        }
    },
    methods: {
        requestBankAccount() {
            axios.post("http://localhost/BankAccounts", {
                type: this.bankAccountType,
                id: this.id
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }
}
};
</script>

<style scoped>
.createBankAccount {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    backdrop-filter: blur(3px);
}

.createBankAccountContainer {
    background: #D9D9D9;
    width: 50%;
    height: 40%;
    border-radius: 18px;
    z-index: 1;
}

.bankAccountOption {
    background: white;
    border-radius: 10px;
    font-size: 18pt;
    /* TODO: make font size to responsive */
}

.bankAccountOption:hover {
    background-color: #8E8E8E;
    cursor: pointer;
}
</style>