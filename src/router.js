import Manager from "./components/Manager/Manager.vue";
import Inventory from "./components/Manager/ManageInventory.vue";
import Customer from "./components/Customer/Customer.vue";
import Server from "./components/Server/Server.vue";
import Gyro from "./components/Customer/Gyro.vue"

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "Manager", component: Manager, path: "/manager" },
  { name: "Inventory", component: Inventory, path: "/manager/inventory" },
  { name: "Server", component: Server, path: "/server" },
  { name: "Customer", component: Customer, path: "/" },
  { name: "Gyro", component: Gyro, path: "/gyro" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
