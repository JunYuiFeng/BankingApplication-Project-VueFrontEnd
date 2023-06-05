<template>
  <div class="container">
    <div class="filtered-transactions">
      <div
        style="background-color: #d9d9d9; border-radius: 18px"
        class="TranscationHistory p-4 mt-5"
      >
        <h2 style="text-align: center">Transaction History</h2>
        <div class="header p-3 mb-2">
          <div class="row">
            <div class="col d-flex">
              <h5>Date</h5>
            </div>
            <div class="col d-flex">
              <h5>From</h5>
            </div>
            <div class="col d-flex">
              <h5>To</h5>
            </div>
            <div class="col d-flex">
              <h5>Amount</h5>
            </div>
          </div>
        </div>

        <span
          v-for="transaction in transactions"
          :key="transaction.id"
          class="col d-flex justify-content-center"
        >
          <div class="col">
            <p>{{ formatDate(transaction.occuredAt) }}</p>
          </div>
          <div class="col">
            <p>
              User ID: {{ transaction.accountFrom.userAccount.id }} <br />
              {{ transaction.accountFrom.userAccount.firstName }}
              {{ transaction.accountFrom.userAccount.lastName }}
              <br />{{ transaction.accountFrom.iban }}
            </p>
          </div>
          <div class="col">
            <p>
              User ID: {{ transaction.accountTo.userAccount.id }} <br />
              {{ transaction.accountTo.userAccount.firstName }}
              {{ transaction.accountTo.userAccount.lastName }}
              <br />{{ transaction.accountTo.iban }}
            </p>
          </div>
          <div class="col">
            <p>&euro; {{ transaction.amount }}</p>
          </div>
        </span>
      </div>
    </div>
    <div class="filters">
      <button class="filter-button" @click="toggleFilters">
        <span class="filter-icon" style="color: black">🔍</span> Filters
      </button>
      <div class="filter-options" :class="{ open: showFilters }">
        <div
          class="filter-option"
          v-for="checkBox in checkBoxes"
          :key="checkBox.value + checkBox.inputValue"
        >
          <label>
            <input
              type="checkbox"
              v-model="selectedFilters"
              :value="checkBox.value"
              @change="resetInputs(checkBox.value)"
            />
            {{ checkBox.label }}
          </label>
          <div class="input-container">
            <input
              v-if="selectedFilters.includes(checkBox.value)"
              type="text"
              v-model="checkBox.inputValue"
              :placeholder="checkBox.placeholder"
            />
          </div>
        </div>
        <button @click="applyFilters">Filter</button>
        <br />
      </div>
    </div>
  </div>
  <div>
    <br />
    <h5>selected filters:</h5>
    <span v-for="item in filteredItems" :key="item.value">
      {{ item.value }}: {{ item.inputValue }}
    </span>
  </div>
</template>
<script>
import axios from "../../Axios-auth";

export default {
  name: "TransactionFilters",
  data() {
    return {
      showFilters: false,
      userId: null,
      ibanFrom: "",
      ibanTo: "",
      amountEqualTo: "",
      amountLessThan: "",
      amountGreaterThan: "",
      dateFrom: "",
      dateTo: "",
      dateRangeStart: "",
      dateRangeEnd: "",
      transactions: [],
      checkBoxes: [
        {
          value: "userId",
          label: "User ID",
          inputValue: "",
          type: "number",
          placeholder: "Enter User ID",
        },
        {
          value: "ibanFrom",
          label: "IBAN From",
          inputValue: "",
          type: "text",
          placeholder: "Enter IBAN From",
        },
        {
          value: "ibanTo",
          label: "IBAN To",
          inputValue: "",
          type: "text",
          placeholder: "Enter IBAN To",
        },
        {
          value: "amountEqualTo",
          label: "Amount Equal To",
          inputValue: "",
          type: "number",
          placeholder: "Enter Amount",
        },
        {
          value: "amountLessThan",
          label: "Amount Less Than",
          inputValue: "",
          type: "number",
          placeholder: "Enter Amount",
        },
        {
          value: "amountGreaterThan",
          label: "Amount Greater Than",
          inputValue: "",
          type: "number",
          placeholder: "Enter Amount",
        },
        {
          value: "dateFrom",
          label: "Date From",
          inputValue: "",
          type: "datetime-local",
        },
        {
          value: "dateTo",
          label: "Date To",
          inputValue: "",
          type: "datetime-local",
        },
      ],
      selectedFilters: [],
    };
  },
  computed: {
    filteredItems() {
      return this.checkBoxes.filter(
        (checkBox) =>
          checkBox.inputValue && this.selectedFilters.includes(checkBox.value)
      );
    },

    filteredTransactions() {
      return this.transactions.filter((transaction) => {
        if (this.selectedFilters.length === 0) {
          return true; // Return all transactions if no filter is selected
        }
        return this.selectedFilters.every((filter) => {
          if (filter === "userId") {
            return transaction.userId === this.userId;
          }
          if (filter === "ibanFrom") {
            return transaction.IBANFrom === this.ibanFrom;
          }
          if (filter === "ibanTo") {
            return transaction.IBANTo === this.ibanTo;
          }
          if (filter === "dateFrom") {
            return new Date(transaction.date) >= new Date(this.dateFrom);
          }
          if (filter === "dateTo") {
            return new Date(transaction.date) <= new Date(this.dateTo);
          }
          if (filter === "amountEqualTo") {
            return transaction.amount === this.amountEqualTo;
          }
          if (filter === "amountLessThan") {
            return transaction.amount < this.amountLessThan;
          }
          if (filter === "amountGreaterThan") {
            return transaction.amount > this.amountGreaterThan;
          }
          return true; // Return true for unknown filters
        });
      });
    },
  },
  methods: {
    async getFilteredTransactions() {
      try {
        axios.get("/Transactions").then((response) => {
          this.transactions = response.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString(); // Adjust the formatting as per your requirements
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    resetInputs(filter) {
      if (!this.selectedFilters.includes(filter)) {
        // Remove the filter from selectedFilters if unchecked
        const index = this.selectedFilters.indexOf(filter);
        if (index !== -1) {
          this.selectedFilters.splice(index, 1);
        }
      }
    },
    applyFilters() {
      // Implement your logic to apply the filters
      // You can access the filtered transactions from the computed property "filteredTransactions"
    },
  },
  mounted() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    } else {
      this.getFilteredTransactions(); // Call the method to fetch transactions
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.filtered-transactions {
  flex: 9;
}

.filters {
  flex: 3;
  order: 2;
  text-align: left;
}
.TranscationHistory {
  flex: 9;
  color: black;
}

.filter-button {
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

.filter-icon {
  margin-right: 5px;
}

.filter-options {
  display: none;
  position: absolute;
  bottom: 50%;
  right: 0;
  width: 100%;
  max-width: calc(3 / 12 * 100%);
  background-color: #ccb38d;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.filter-options.open {
  display: block;
}

.filter-option {
  margin-bottom: 10px;
}

.input-container {
  margin-top: 5px;
}

input[type="number"],
input[type="text"],
input[type="datetime-local"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

li {
  margin-bottom: 5px;
}
</style>
