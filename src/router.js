import Manager from "./components/Manager/Manager.vue";
import Inventory from "./components/Manager/ManageInventory.vue";
import XZReport from "./components/Manager/XZReport.vue";
import SalesReport from "./components/Manager/SalesReport.vue";
import ExcessReport from "./components/Manager/ExcessReport.vue";
import Customer from "./components/Customer/Customer.vue";
import Server from "./components/Server/Server.vue";
import Gyro from "./components/Customer/Gyro.vue";
import Bowl from "./components/Customer/Bowl.vue";
import SidesandDrink from "./components/Customer/SidesandDrink.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "Manager", component: Manager, path: "/manager" },
  { name: "Inventory", component: Inventory, path: "/manager/inventory" },
  { name: "XZReport", component: XZReport, path: "/manager/xz" },
  { name: "SalesReport", component: SalesReport, path: "/manager/sales" },
  { name: "ExcessReport", component: ExcessReport, path: "/manager/excess" },
  { name: "Server", component: Server, path: "/server" },
  { name: "Customer", component: Customer, path: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
