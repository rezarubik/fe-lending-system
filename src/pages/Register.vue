<template>
  <div class="container mt-5">
    <h2 class="text-center">Register</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" v-model="form.name" required />
      </div>
      <div class="mb-3">
        <label for="birth_place" class="form-label">Place of Birth</label>
        <input
          type="text"
          class="form-control"
          v-model="form.birth_place"
          required
        />
      </div>
      <div class="mb-3">
        <label for="birth_date" class="form-label">Date of Birth</label>
        <input
          type="date"
          class="form-control"
          v-model="form.birth_date"
          required
        />
      </div>
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
        <label for="id_card_number" class="form-label">KTP Number</label>
        <input
          type="text"
          class="form-control"
          v-model="form.id_card_number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="monthly_income" class="form-label">Monthly Income</label>
        <input
          type="number"
          class="form-control"
          v-model="form.monthly_income"
          required
        />
      </div>
      <div class="mb-3">
        <label for="role" class="form-label">Role</label>
        <select class="form-control" v-model="form.role" required>
          <option value="borrower">Borrower</option>
          <option value="lender">Lender</option>
        </select>
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
      <div class="mb-3">
        <label for="ktpPhoto" class="form-label">KTP Photo</label>
        <input type="file" class="form-control" @change="handleFileUpload" />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "../services/api";

export default {
  data() {
    return {
      form: {
        name: "",
        dob: "",
        phone: "",
        ktp: "",
        income: 0,
        role: "borrower",
        password: "",
        ktpPhoto: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.ktpPhoto = event.target.files[0];
    },
    async register() {
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      try {
        await axios.post("/register", formData);
        // const response = await axios.post("/register", formData);
        alert("Registration successful!");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Error during registration.");
      }
    },
  },
};
</script>
