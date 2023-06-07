<template>
    <div class="transferSuccess d-flex justify-content-center align-items-center">
        <div class="transferSuccessContainer shadow">
            <div class="d-flex justify-content-center m-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64" width="180"
                    height="180" class="d-flex justify-content">
                    <path d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50
	                    l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z"
                        fill="#43a047" />
                </svg>
            </div>
            <h1 class="d-flex justify-content-center">Transaction successfull</h1>
            <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-primary" @click="$emit('close')">Close</button>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
export default {
    name: 'TransferSuccess'
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
</style>