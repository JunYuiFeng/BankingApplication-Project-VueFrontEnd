<template>
    <div>
        <div class="container mt-5">
            <h1>Overview</h1>

            <div class="d-flex justify-content-end mb-2" @click="this.$router.push('/CreateTransaction')">
                <button type="button" class="btn btn-primary shadow-sm">Transfer</button>
            </div>

            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-warning shadow-sm" @click="showCreateBankAccount=true">Request new bank account</button>
            </div>
            
            <CreateBankAccount v-if="showCreateBankAccount" @cancel="showCreateBankAccount=false"/>

            <div class="bankAccountsOverviewContainer ps-5 pe-5">
                <div class="d-flex justify-content-end mt-5">
                    <h5 class="">Total balance: 10000</h5>
                </div>

                <div>
                    current account
                    <div class="bankAccountContainer shadow-sm p-3 mb-4 d-flex justify-content-between">
                        <div>
                            <p>John Doe</p>
                            <p>NL29INHOL3124908</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <p>10000000</p>
                        </div>
                    </div>
                </div>

                <div>
                    savings account
                    <div class="bankAccountContainer shadow-sm p-3">
                        <p>John Doe</p>
                        <p>NL29INHOL3124908</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import CreateBankAccount from './CreateBankAccount.vue'

export default {
  components: {
    CreateBankAccount
  },
  data() {
    return {
      showCreateBankAccount: false
    }
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