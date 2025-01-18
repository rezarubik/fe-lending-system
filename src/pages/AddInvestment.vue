<template>
  <div class="container">
    <h2>Add Investment</h2>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Hi, {{ user.name }}</h5>
      </div>
    </div>
    <form @submit.prevent="submitInvestment">
      <div class="form-group">
        <label for="investmentAmount">Investment Amount</label>
        <input
          type="number"
          class="form-control"
          id="investmentAmount"
          v-model="investmentAmount"
          placeholder="Enter investment amount"
          required
        />
      </div>

      <div class="form-group">
        <label for="bank">Select Bank</label>
        <select class="form-control" v-model="selectedBank" required>
          <option value="">Choose One</option>
          <option value="BCA">BCA</option>
          <option value="BRI">BRI</option>
          <option value="BNI">BNI</option>
          <option value="Mandiri">Mandiri</option>
        </select>
      </div>
      <div class="mt-3">
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link
          to="/lender-dashboard"
          class="btn btn-primary"
          style="margin-left: 20px"
          >Back</router-link
        >
      </div>
    </form>

    <div v-if="vaNumber">
      <h3>Virtual Account Number (VA):</h3>
      <p>{{ vaNumber }}</p>
    </div>
  </div>
</template>

<script>
import axios from "../services/api";

export default {
  data() {
    return {
      user: {},
      investmentAmount: "",
      selectedBank: "",
      vaNumber: "",
    };
  },
  methods: {
    async submitInvestment() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You need to log in to add an investment.");
          return;
        }

        const response = await axios.post(
          "/lender/investments",
          {
            amount: this.investmentAmount,
            bank: this.selectedBank,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const virtual_account =
          response.data.investment.virtual_account || "08123456789";
        this.vaNumber = virtual_account;

        alert("Investment successfully added!");
        console.log("VA Number:", this.vaNumber);
      } catch (error) {
        console.error(error);
        alert("Failed to submit investment. Please try again.");
      }
    },
    getBankCode(bankName) {
      const bankCodes = {
        BCA: "1123",
        BRI: "1124",
        BNI: "1125",
        Mandiri: "1126",
      };
      return bankCodes[bankName] || "";
    },
  },
  async created() {
    const token = localStorage.getItem("token");
    const response = await axios.get("/lender/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.user = response.data.user;
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

h2 {
  margin-bottom: 20px;
}
</style>
