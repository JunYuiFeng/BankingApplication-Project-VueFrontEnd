<template>
  <div class="filters">
    <h4>Transaction Filters</h4>
    <label>User ID:</label>
    <input v-model="userId" type="number" />
    <button @click="filterByUserId">Filter</button>

    <label>IBAN From:</label>
    <input v-model="ibanFrom" type="text" />
    <button @click="filterByIbanFrom">Filter</button>

    <label>IBAN To:</label>
    <input v-model="ibanTo" type="text" />
    <button @click="filterByIbanTo">Filter</button>

    <label>Date From:</label>
    <input v-model="dateFrom" type="datetime-local" />
    <button @click="filterByDateFrom">Filter</button>

    <label>Date To:</label>
    <input v-model="dateTo" type="datetime-local" />
    <button @click="filterByDateTo">Filter</button>

    <label>Date Range:</label>
    <input v-model="dateRangeStart" type="datetime-local" />
    <input v-model="dateRangeEnd" type="datetime-local" />
    <button @click="filterByDateRange">Filter</button>
  </div>
  <div>
    <h4>Filtered Transactions</h4>
    <ul>
      <li v-for="transaction in filteredTransactions" :key="transaction.id">
        {{ transaction }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TransactionFilters",
  data() {
    return {
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
        if (this.userId) {
          match = match && transaction.userId === this.userId;
        }
        if (this.ibanFrom) {
          match = match && transaction.IBANFrom === this.ibanFrom;
        }
        if (this.ibanTo) {
          match = match && transaction.IBANTo === this.ibanTo;
        }
        if (this.dateFrom) {
          match =
            match && new Date(transaction.date) >= new Date(this.dateFrom);
        }
        if (this.dateTo) {
          match = match && new Date(transaction.date) <= new Date(this.dateTo);
        }
        if (this.dateRangeStart && this.dateRangeEnd) {
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
    async filterByUserId() {
      try {
        const response = await axios.get("/Transactions/Transactions/UserId", {
          params: {
            userId: this.userId,
          },
        });
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByIbanFrom() {
      try {
        const response = await axios.get(
          "/Transactions/Transactions/IBANFrom",
          {
            params: {
              IBAN: this.ibanFrom,
            },
          }
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByIbanTo() {
      try {
        const response = await axios.get("/Transactions/Transactions/IBANTo", {
          params: {
            IBAN: this.ibanTo,
          },
        });
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByDateFrom() {
      try {
        const response = await axios.get(
          "/Transactions/Transactions/DateFrom",
          {
            params: {
              dateFrom: new Date(this.dateFrom),
            },
          }
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByDateTo() {
      try {
        const response = await axios.get("/Transactions/Transactions/DateTo", {
          params: {
            dateTo: new Date(this.dateTo),
          },
        });
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByDateRange() {
      try {
        const response = await axios.get(
          "/Transactions/Transactions/DateBetween",
          {
            params: {
              timestamps: [
                new Date(this.dateRangeStart),
                new Date(this.dateRangeEnd),
              ],
            },
          }
        );
        this.transactions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getAllTransactions();
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
  },
};
</script>

<style>
/* Add your custom styles here */
.filters {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  margin: 20px;
}
</style>
