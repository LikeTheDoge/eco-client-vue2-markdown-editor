import { createRouter, createWebHistory } from "vue-router";


console.log(import.meta.env.BASE_URL)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/markdown/:fileId",
      name: "editor",
      component: () => import("./pages/EditorPage.vue"),
    },
  ],
});

export default router;
