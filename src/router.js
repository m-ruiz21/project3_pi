import Manager from "./components/Manager/Manager.vue";
import Inventory from "./components/Manager/ManageInventory.vue";
import XZReport from "./components/Manager/XZReport.vue";
import SalesReport from "./components/Manager/SalesReport.vue";
import ExcessReport from "./components/Manager/ExcessReport.vue";
import Customer from "./components/Customer/Customer.vue";
import Server from "./components/Server/Server.vue";
import Pita from "./components/Customer/Pita.vue";
import Bowl from "./components/Customer/Bowl.vue";
import About from "./components/Customer/About.vue";
import SidesandDrink from "./components/Customer/SidesandDrink.vue";
import { isValidRoute } from "./services/ValidationService.js";
import NotFound from "./components/Common/NotFound.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "Manager", component: Manager, path: "/manager" },
  { name: "Inventory", component: Inventory, path: "/manager/inventory" },
  { name: "XZReport", component: XZReport, path: "/manager/xz" },
  { name: "SalesReport", component: SalesReport, path: "/manager/sales" },
  { name: "ExcessReport", component: ExcessReport, path: "/manager/excess" },
  { name: "Server", component: Server, path: "/server" },
  { name: "Customer", component: Customer, path: "/" },
  { name: "NotFound", component: NotFound, path: "/not-found" },
  { name: "Bowl", component: Bowl, path: "/bowl/:name", beforeEnter: isValidRoute},
  { name: "Pita", component: Pita, path: "/pita/:name", beforeEnter: isValidRoute},
  { name: "About", component: About, path: "/About"},
  { name: "Not Found", path: '/:catchAll(.*)', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
