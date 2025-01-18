<template>
  <div class="container mt-5">
    <h2 class="text-center">Lender Dashboard</h2>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Hi, {{ user.name }}</h5>
        <p class="card-text">
          Total Investment:
          <strong>{{ formatToRupiah(totalInvestment) }}</strong>
        </p>
      </div>
    </div>
    <div class="mt-2 mb-2">
      <router-link to="/add-investment" class="btn btn-primary"
        >Add Investment</router-link
      >
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
          <td>{{ formatDate(log.created_at) }}</td>
          <td>{{ formatToRupiah(log.amount) }}</td>
          <td>{{ log.bank }}</td>
          <td>{{ log.virtual_account }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../services/api";
import { format } from "date-fns"; // Import fungsi format dari date-fns
import { id } from "date-fns/locale"; // Locale untuk Indonesia

export default {
  data() {
    return {
      user: {},
      totalInvestment: 0,
      investmentLogs: [],
    };
  },
  methods: {
    formatToRupiah(value) {
      // Format angka ke Rupiah
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    formatDate(dateString) {
      // Format tanggal ke format yang lebih mudah dibaca
      return format(new Date(dateString), "dd MMMM yyyy 'at' HH:mm", {
        locale: id,
      });
    },
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
