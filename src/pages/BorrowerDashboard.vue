<template>
  <div class="container mt-5">
    <h2 class="text-center">Borrower Dashboard</h2>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Hi, {{ user.name }}</h5>
        <p class="card-text">
          Your monthly income: <strong>{{ user.monthly_income }}</strong>
        </p>
        <p class="card-text">
          Your loan limit: <strong>{{ loanLimit }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../services/api";

export default {
  data() {
    return {
      user: {},
      loanLimit: 0,
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/borrower/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.user = response.data.user;
      this.loanLimit = response.data.loan_limit;
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard data.");
    }
  },
};
</script>
