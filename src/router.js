import Manager from "./components/Manager.vue";
import Inventory from "./components/ManageInventory.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "Manager", component: Manager, path: "/manager" },
  { name: "Inventory", component: Inventory, path: "/manager/inventory" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
