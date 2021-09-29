import { createWebHistory, createRouter } from "vue-router";
// import Administrator from "../components/Administrator.vue";
import AdminCheck from "../components/AdminCheck.vue";
import User from "../components/User.vue";
import QuestionResponse from "../components/QuestionResponse.vue";

const routes = [
  {
    path: "/admin",
    name: "Admin",
    component: AdminCheck,
  },
  {
    path: "/",
    name: "User",
    component: User,
  },
  {
    path: "/userq/:qId",
    name: "QuestionResponse",
    component: QuestionResponse,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
