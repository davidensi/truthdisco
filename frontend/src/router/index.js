import { createWebHistory, createRouter } from "vue-router";
import Administrator from "../components/Administrator.vue";
import User from "../components/User.vue";

const routes = [
  {
    path: "/admin",
    name: "Admin",
    component: Administrator,
  },
  {
    path: "/",
    name: "User",
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
