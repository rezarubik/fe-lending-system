<template>
  <div class="container mt-5">
    <h2 class="text-center">Lender Dashboard</h2>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Hi, {{ user.name }}</h5>
        <p class="card-text">
          Total investment: <strong>{{ totalInvestment }}</strong>
        </p>
      </div>
    </div>
    <h4>Investment Log</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Bank</th>
          <th>VA Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in investmentLogs" :key="log.id">
          <td>{{ log.created_at }}</td>
          <td>{{ log.amount }}</td>
          <td>{{ log.bank }}</td>
          <td>{{ log.virtual_account }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../services/api";

export default {
  data() {
    return {
      user: {},
      totalInvestment: 0,
      investmentLogs: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/lender/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const listInvestments = await axios.get("/lender/investments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.user = response.data.user;
      this.totalInvestment = response.data.total_investment;
      this.investmentLogs = listInvestments.data.investments;
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard data.");
    }
  },
};
</script>
