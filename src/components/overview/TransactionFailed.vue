<template>
    <div class="Failed d-flex justify-content-center align-items-center">
        <div class="FailedContainer shadow">
            <h2 class="d-flex justify-content-center mt-3">Transaction Failed</h2>
            <div class="d-flex justify-content-center m-3">
                <div class="circle-border"></div>
                <div class="circle">
                    <div class="error"></div>
                </div>
            </div>
            <div class="alert alert-danger ms-2 me-2" role="alert">
                {{ errorMessage }}
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary" @click="$emit('close')">Close</button>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
export default {
    name: 'TransactionFailed',
    props: {
        errorMessage: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.Failed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background: rgba(0, 0, 0, 0.2);
}

.FailedContainer {
    background: white;
    width: 35%;
    height: 43%;
    border-radius: 18px;
    z-index: 1;
}

.circle,
.circle-border {
    width: 90px;
    height: 90px;
    border-radius: 50%;
}

.circle {
    z-index: 1;
    position: relative;
    background: white;
    transform: scale(1);
    animation: success-anim 700ms ease;
}

.circle-border {
    z-index: 0;
    position: absolute;
    transform: scale(1.1);
    animation: circle-anim 400ms ease;
    background: #f86;
}

@keyframes success-anim {
    0% {
        transform: scale(0);
    }

    30% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes circle-anim {
    from {
        transform: scale(0);
    }

    to {
        transform: scale(1.1);
    }
}

.error::before,
.error::after {
    content: "";
    display: block;
    height: 4px;
    background: #f86;
    position: absolute;
}

.error::before {
    width: 40px;
    top: 48%;
    left: 30%;
    transform: rotateZ(50deg);
}

.error::after {
    width: 40px;
    top: 48%;
    left: 30%;
    transform: rotateZ(-50deg);
}
</style>