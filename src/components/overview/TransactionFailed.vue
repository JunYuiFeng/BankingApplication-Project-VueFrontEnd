<template>
    <div class="transferSuccess d-flex justify-content-center align-items-center">
        <div class="transferSuccessContainer shadow">
            <div class="d-flex justify-content-center m-4">
                <img src="/pictures/red-cross-check-mark-icon-simple-style-vector.jpeg" alt="" class="redCrossCheckMarkImg"/>
            </div>
            <h1 class="d-flex justify-content-center">Transaction failed</h1>
            <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-primary" @click="$emit('close')">Close</button>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
export default {
    name: 'TransferSuccess',
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
.transferSuccess {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background: rgba(0, 0, 0, 0.2);
}

.transferSuccessContainer {
    background: white;
    width: 40%;
    height: 50%;
    border-radius: 18px;
    z-index: 1;
}

.redCrossCheckMarkImg {
    width: 40%;
}
</style>