<template>
  <div class="container">
    <div class="filtered-transactions">
      <h4>Filtered Transactions</h4>

      <div class="Transcation History p-4 mt-5">
        <div class="header p-3 mb-2">
          <div class="row">
            <div class="col d-flex justify-content-center">
              <h5>Date</h5>
            </div>
            <div class="col d-flex justify-content-center">
              <h5>From</h5>
            </div>
            <div class="col d-flex justify-content-center">
              <h5>To</h5>
            </div>
            <div class="col d-flex justify-content-center">
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
            <h5>{{ formatDate(transaction.occuredAt) }}</h5>
          </div>
          <div class="col">
            <h5>
              {{ transaction.accountFrom.userAccount.firstName }}
              {{ transaction.accountFrom.userAccount.lastName }}
            </h5>
          </div>
          <div class="col">
            <h5>
              {{ transaction.accountTo.userAccount.firstName }}
              {{ transaction.accountTo.userAccount.lastName }}
            </h5>
          </div>
          <div class="col">
            <h5>&euro; {{ transaction.amount }}</h5>
          </div>
        </span>
      </div>

      <!--for each date that there are transactions i want to list the
      transactions for that day. So if the transaction was a - i will display
      the name of the person who got the transaction and the amount that it was
      paid to them. If the transaction was a + then i want to display th name of
      the person who did the sent them money and the amount that was sent to
      them. I also want to display the date of the transaction.-->
    </div>
    <div class="filters">
      <button class="filter-button" @click="toggleFilters">
        <span class="filter-icon">🔍</span> Filters
      </button>
      <div class="filter-options" :class="{ open: showFilters }">
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilters"
              value="userId"
              @change="resetInputs('userId')"
            />
            User ID
          </label>
          <div class="input-container">
            <input
              v-if="selectedFilters.includes('userId')"
              v-model="userId"
              type="number"
              placeholder="Enter User ID"
            />
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilters"
              value="ibanFrom"
              @change="resetInputs('ibanFrom')"
            />
            IBAN From
          </label>
          <div class="input-container">
            <input
              v-if="selectedFilters.includes('ibanFrom')"
              v-model="ibanFrom"
              type="text"
              placeholder="Enter IBAN From"
            />
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilters"
              value="ibanTo"
              @change="resetInputs('ibanTo')"
            />
            IBAN To
          </label>
          <div class="input-container">
            <input
              v-if="selectedFilters.includes('ibanTo')"
              v-model="ibanTo"
              type="text"
              placeholder="Enter IBAN To"
            />
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilters"
              value="dateFrom"
              @change="resetInputs('dateFrom')"
            />
            Date From
          </label>
          <div class="input-container">
            <input
              v-if="selectedFilters.includes('dateFrom')"
              v-model="dateFrom"
              type="datetime-local"
            />
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilters"
              value="dateTo"
              @change="resetInputs('dateTo')"
            />
            Date To
          </label>
          <div class="input-container">
            <input
              v-if="selectedFilters.includes('dateTo')"
              v-model="dateTo"
              type="datetime-local"
            />
          </div>
        </div>
        <button @click="applyFilters">Filter</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../Axios-auth";

export default {
  name: "TransactionFilters",
  data() {
    return {
      showFilters: false,
      selectedFilters: [],
      userId: null,
      ibanFrom: "",
      ibanTo: "",
      dateFrom: "",
      dateTo: "",
      dateRangeStart: "",
      dateRangeEnd: "",
      transactions: [],
    };
  },
  name: "Transactions",
  setup() {
    return { transactions: [] };
  },
  computed: {
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
          if (filter === "dateRange") {
            return (
              new Date(transaction.date) >= new Date(this.dateRangeStart) &&
              new Date(transaction.date) <= new Date(this.dateRangeEnd)
            );
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
    }
    axios
      .get("/Transactions")
      .then((response) => {
        this.transactions = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    // this.getFilteredTransactions();
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
