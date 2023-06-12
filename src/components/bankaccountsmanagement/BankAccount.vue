<template>
  <div class="bankAccount rounded shadow-sm p-3 mb-4">
    <div class="row">
      <div class="col d-flex justify-content-center align-items-center">
        <p>{{ bankAccount.userAccount.firstName }}</p>
      </div>
      <div class="col d-flex justify-content-center align-items-center">
        <p>{{ bankAccount.type }}</p>
      </div>
      <div class="col d-flex justify-content-center align-items-center">
        <p>{{ bankAccount.iban }}</p>
      </div>
      <div class="col d-flex justify-content-center align-items-center">
        <p v-if="!editing">€ {{ bankAccount.absoluteLimit }}</p>
        <input v-else type="number" class="form-control" v-model="editedAbsoluteLimit" min="0" @input="handleInput" />
      </div>
      <div class="col-2 d-flex justify-content-center align-items-center">
        <p>€ {{ bankAccount.balance }}</p>
      </div>
      <div class="col-1 d-flex justify-content-center align-items-center">
        <p>{{ bankAccount.status }}</p>
      </div>
      <div class="col d-flex justify-content-center align-items-center">
        <div>
          <button v-if="bankAccount.status.toLowerCase() === 'active'" class="btn btn-danger btn-sm mb-2"
            @click="deactivateBankAccount">
            deactivate
          </button>
          <button v-else class="btn btn-success mb-2 pe-4 btn-sm" @click="activateBankAccount">
            activate
          </button>
          <br />
          <button v-if="editing" class="btn btn-success pe-4 btn-sm" @click="confirmEdit">
            confirm
          </button>
          <button v-else class="btn btn-primary pe-5 btn-sm" @click="startEditing">
            edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../Axios-auth";

export default {
  name: "BankAccount",
  data() {
    return {
      editing: false,
      editedAbsoluteLimit: 0,
    };
  },
  props: {
    bankAccount: Object,
  },
  methods: {
    updateBankAccountStatus(status) {
      const statusPayload = {
        status: status,
      };

      axios
        .patch(`/BankAccounts/${this.bankAccount.iban}`, statusPayload)
        .then((response) => {
          this.bankAccount.status = response.data.status; // Update the status
        })
        .catch((error) => {
          console.log("An error occurred:", error.response.data.message);
        });
    },
    activateBankAccount() {
      this.updateBankAccountStatus("active");
    },
    deactivateBankAccount() {
      this.updateBankAccountStatus("inactive");
    },
    startEditing() {
      this.editing = true;
      this.editedAbsoluteLimit = this.bankAccount.absoluteLimit;
    },
    confirmEdit() {
      // Check if the input is empty
      if (!this.editedAbsoluteLimit) {
        this.editedAbsoluteLimit = 0; // Assign the value of 0 if the input is empty
      }
      axios
        .patch(`/BankAccounts/${this.bankAccount.iban}`, {
          absoluteLimit: this.editedAbsoluteLimit,
        })
        .then((response) => {
          console.log(response.data);
          this.bankAccount.absoluteLimit = this.editedAbsoluteLimit;
        })
        .catch((error) => {
          console.log("An error occurred:", error.response.data.message);
        });
      this.editing = false;
    },
    handleInput(event) {
      let sanitizedValue = event.target.value.replace(/-/g, ''); // Remove "-" from the input value
      event.target.value = sanitizedValue; // Update the input value without "-"
      this.editedAbsoluteLimit = sanitizedValue; // Update the v-model with the sanitized value
    },
  },
};
</script>

<style scoped>
.bankAccount {
  background: white;
}
</style>
