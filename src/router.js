import Manager from "/src/components/Manager/Manager.vue";
import Inventory from "/src/components/Manager/ManageInventory.vue";
import XZReport from "/src/components/Manager/XZReport.vue";
import SalesReport from "/src/components/Manager/SalesReport.vue";
import ExcessReport from "/src/components/Manager/ExcessReport.vue";
import Customer from "/src/components/Customer/Customer.vue";
import Server from "/src/components/Server/Server.vue";
import Pita from "/src/components/Customer/Pita.vue";
import Bowl from "/src/components/Customer/Bowl.vue";
import About from "/src/components/Customer/About.vue";
import Sides from "/src/components/Customer/Sides.vue";
import Orders from '/src/components/Server/ServerOrders.vue'
import { isValidRoute } from "/src/services/ValidationService.js";
import { isValidSideRoute } from "/src/services/ValidationService.js";
import NotFound from "/src/components/common/NotFound.vue";
import AccessDenied from "/src/components/common/AccessDenied.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "Manager", component: Manager, path: "/manager" },
  { name: "Inventory", component: Inventory, path: "/manager/inventory" },
  { name: "XZReport", component: XZReport, path: "/manager/xz" },
  { name: "SalesReport", component: SalesReport, path: "/manager/sales" },
  { name: "ExcessReport", component: ExcessReport, path: "/manager/excess" },
  { name: "Server", component: Server, path: "/server" },
  { name: "Orders", component: Orders, path: "/server/orders" },
  { name: "Customer", component: Customer, path: "/" },
  { name: "NotFound", component: NotFound, path: "/not-found" },
  { name: "Bowl", component: Bowl, path: "/bowl/:name", beforeEnter: isValidRoute},
  { name: "Pita", component: Pita, path: "/pita/:name", beforeEnter: isValidRoute},
  { name: "About", component: About, path: "/About"},
  { name: "SidesandDrink", component: Sides, path: "/side/:name", beforeEnter: isValidSideRoute},
  { name: "Access Denied", component: AccessDenied , path: "/access-denied" },
  { name: "Not Found", path: '/:catchAll(.*)', component: NotFound }
];

const router = createRouter({
  // history: createWebHistory(),
  routes,
});

export default router;
