<template>
  <div class="container">
    <div class="filtered-transactions">
      <h4>Filtered Transactions</h4>
      <ul>
        <li v-for="transaction in filteredTransactions" :key="transaction.id">
          {{ transaction }}
        </li>
      </ul>
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
              v-model="userId"
              value="userId"
              @change="resetInputs"
            />
            User ID
          </label>
          <div class="input-container">
            <input v-model="userId" type="number" placeholder="Enter User ID" />
          </div>
        </div>
        <div>
          <input v-model="userId" type="number" />
          <button @click="filterByUserId">Filter</button>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilter"
              value="ibanFrom"
              @change="resetInputs"
            />
            IBAN From
          </label>
          <div class="input-container">
            <input
              v-model="ibanFrom"
              type="text"
              placeholder="Enter IBAN From"
            />
          </div>
          <div>
            <br /><br />
            <input v-model="ibanFrom" type="text" />
            <button @click="filterByIbanFrom">Filter</button>
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilter"
              value="ibanTo"
              @change="resetInputs"
            />
            IBAN To
          </label>
          <div class="input-container">
            <input v-model="ibanTo" type="text" placeholder="Enter IBAN To" />
          </div>
          <div>
            <br /><br />

            <input v-model="ibanTo" type="text" />
            <button @click="filterByIbanTo">Filter</button>
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilter"
              value="dateFrom"
              @change="resetInputs"
            />
            Date From
          </label>
          <div id="filterInput">
            <br /><br />
            <input v-model="dateFrom" type="datetime-local" />
            <button @click="filterByDateFrom">Filter</button>
          </div>
          <div class="input-container">
            <input v-model="dateFrom" type="datetime-local" />
          </div>
        </div>
        <div class="filter-option" ref="dateTo">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilter"
              value="dateTo"
              @change="resetInputs"
            />
            Date To
          </label>
          <div>
            <br /><br />

            <input v-model="dateTo" type="datetime-local" />
            <button @click="filterByDateTo">Filter</button>
          </div>
          <div class="input-container">
            <input v-model="dateTo" type="datetime-local" />
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="checkbox"
              v-model="selectedFilter"
              value="dateRange"
              @change="resetInputs"
            />
            Date Range
          </label>
          <div class="input-container">
            <br /><br />
            <label>Start Date</label>
            <input v-model="dateRangeStart" type="datetime-local" />
            <label>End Date</label>
            <input v-model="dateRangeEnd" type="datetime-local" />
            <button @click="filterByDateRange">Filter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TransactionFilters",
  data() {
    return {
      showFilters: false,
      selectedFilter: "",
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
  computed: {
    filteredTransactions() {
      return this.transactions.filter((transaction) => {
        if (this.selectedFilter.length === 0) {
          return true; // Return all transactions if no filter is selected
        }
        return this.selectedFilter.every((filter) => {
          if (filter.selectedFilter === "userId") {
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
    async getAllTransactions() {
      try {
        const response = await axios.get("/Transactions");
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    resetInputs() {
      this.userId = null;
      this.ibanFrom = "";
      this.ibanTo = "";
      this.dateFrom = "";
      this.dateTo = "";
      this.dateRangeStart = "";
      this.dateRangeEnd = "";
    },
  },
  mounted() {
    this.getAllTransactions();
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
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-container {
  display: none;
  margin-top: 5px;
}

.filter-option input:checked + .input-container {
  display: block;
}

.filter-option label {
  margin-left: 10px;
}

.input-container input {
  margin-top: 5px;
}
</style>
