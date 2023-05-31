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
              type="radio"
              v-model="selectedFilter"
              value="userId"
              @change="resetInputs"
            />
            User ID
          </label>
          <div class="input-container" v-if="selectedFilter === 'userId'">
            <input v-model="userId" type="number" placeholder="Enter User ID" />
          </div>
        </div>
        <div v-if="selectedFilter === 'userId'">
          <input v-model="userId" type="number" />
          <button @click="filterByUserId">Filter</button>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="radio"
              v-model="selectedFilter"
              value="ibanFrom"
              @change="resetInputs"
            />
            IBAN From
          </label>
          <div class="input-container" v-if="selectedFilter === 'ibanFrom'">
            <input
              v-model="ibanFrom"
              type="text"
              placeholder="Enter IBAN From"
            />
          </div>
          <div v-if="selectedFilter === 'ibanFrom'">
            <br /><br />
            <input v-model="ibanFrom" type="text" />
            <button @click="filterByIbanFrom">Filter</button>
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="radio"
              v-model="selectedFilter"
              value="ibanTo"
              @change="resetInputs"
            />
            IBAN To
          </label>
          <div class="input-container" v-if="selectedFilter === 'ibanTo'">
            <input v-model="ibanTo" type="text" placeholder="Enter IBAN To" />
          </div>
          <div v-if="selectedFilter === 'ibanTo'">
            <br /><br />

            <input v-model="ibanTo" type="text" />
            <button @click="filterByIbanTo">Filter</button>
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="radio"
              v-model="selectedFilter"
              value="dateFrom"
              @change="resetInputs"
            />
            Date From
          </label>
          <div id="filterInput" v-if="selectedFilter === 'dateFrom'">
            <br /><br />
            <input v-model="dateFrom" type="datetime-local" />
            <button @click="filterByDateFrom">Filter</button>
          </div>
          <div class="input-container" v-if="selectedFilter === 'dateFrom'">
            <input v-model="dateFrom" type="datetime-local" />
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="radio"
              v-model="selectedFilter"
              value="dateTo"
              @change="resetInputs"
            />
            Date To
          </label>
          <div v-if="selectedFilter === 'dateTo'">
            <br /><br />

            <input v-model="dateTo" type="datetime-local" />
            <button @click="filterByDateTo">Filter</button>
          </div>
          <div class="input-container" v-if="selectedFilter === 'dateTo'">
            <input v-model="dateTo" type="datetime-local" />
          </div>
        </div>
        <div class="filter-option">
          <label>
            <input
              type="radio"
              v-model="selectedFilter"
              value="dateRange"
              @change="resetInputs"
            />
            Date Range
          </label>
          <div class="input-container" v-if="selectedFilter === 'dateRange'">
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
        let match = true;
        if (this.selectedFilter === "userId") {
          match = match && transaction.userId === this.userId;
        }
        if (this.selectedFilter === "ibanFrom") {
          match = match && transaction.IBANFrom === this.ibanFrom;
        }
        if (this.selectedFilter === "ibanTo") {
          match = match && transaction.IBANTo === this.ibanTo;
        }
        if (this.selectedFilter === "dateFrom") {
          match =
            match && new Date(transaction.date) >= new Date(this.dateFrom);
        }
        if (this.selectedFilter === "dateTo") {
          match = match && new Date(transaction.date) <= new Date(this.dateTo);
        }
        if (this.selectedFilter === "dateRange") {
          match =
            match &&
            new Date(transaction.date) >= new Date(this.dateRangeStart) &&
            new Date(transaction.date) <= new Date(this.dateRangeEnd);
        }
        return match;
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
    async filterByUserId() {
      try {
        const response = await axios.get(
          "/Transactions/UserId?userId=${this.userId}"
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByIbanFrom() {
      try {
        const response = await axios.get(
          "/Transactions/IBANFrom?IBAN=${this.ibanFrom}"
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByIbanTo() {
      try {
        const response = await axios.get(
          "/Transactions/IBANTo?IBAN=${this.ibanTo}"
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByDateFrom() {
      try {
        const response = await axios.get(
          "/Transactions/DateFrom?dateFrom=${this.dateFrom}"
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByDateTo() {
      try {
        const response = await axios.get(
          "/Transactions/DateTo?dateTo=${this.dateTo}"
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByDateRange() {
      try {
        const timestamps = [this.dateRangeStart, this.dateRangeEnd];
        const response = await axios.get(
          "/Transactions/DateBetween?timestamps=${timestamps}"
        );
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
