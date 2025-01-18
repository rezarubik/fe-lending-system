<template>
  <div class="container mt-5">
    <h2 class="text-center">Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="phone_number" class="form-label">Phone Number</label>
        <input
          type="text"
          class="form-control"
          v-model="form.phone_number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="form.password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "../services/api";

export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/login", this.form);
        console.log("response", response);
        console.log("response data", response.data);
        const data = response.data;
        console.log("data", data);
        console.log("token", data.token);
        console.log("role", data.user.role);
        localStorage.setItem("token", data.token);

        if (data.user.role === "borrower") {
          this.$router.push("/borrower-dashboard");
        } else {
          this.$router.push("/lender-dashboard");
        }
      } catch (error) {
        console.error(error);
        alert("Login failed. Please check your credentials.");
      }
    },
  },
};
</script>
