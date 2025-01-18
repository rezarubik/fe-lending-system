import { createRouter, createWebHistory } from "vue-router";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import BorrowerDashboard from "../pages/BorrowerDashboard.vue";
import LenderDashboard from "../pages/LenderDashboard.vue";

const routes = [
  {
    path: "/",
    redirect: "/register", // Redirect ke halaman Register saat pertama kali akses
  },
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/borrower-dashboard",
    name: "BorrowerDashboard",
    component: BorrowerDashboard,
  },
  {
    path: "/lender-dashboard",
    name: "LenderDashboard",
    component: LenderDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
