<template>
    <div>
        <div class="container mt-5">
            <h1>Overview</h1>

            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-warning">Request new bank account</button>
            </div>

            <div class="bankAccountsOverviewContainer ps-5 pe-5">
                <div class="d-flex justify-content-end mt-5">
                    <h5 class="">Total balance: 10000</h5>
                </div>

                <div class="row">
                    current account
                    <div class="bankAccountContainer">
                        <p>John Doe</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bankAccountContainer {
    background: #D9D9D9;
}

.bankAccountsOverviewContainer {
    margin-right: 10%;
    margin-left: 10%;
}
</style>