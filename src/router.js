import Manager from "./components/Manager.vue";
import Inventory from "./components/ManageInventory.vue";
import Customer from "./components/Customer/Customer.vue";
import Server from "./components/Server.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "Manager", component: Manager, path: "/manager" },
  { name: "Inventory", component: Inventory, path: "/manager/inventory" },
  { name: "Server", component: Server, path: "/server" },
  { name: "Customer", component: Customer, path: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
