<template>
  <nav
    class="navbar py-3 navbar-dark navbar-expand-lg"
    style="background-color: rgb(46, 56, 116)"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/manager">
        <img src="/src/assets/p&hlogo.png" alt="Pom & Honey Logo" width="80" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse text-white"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/manager">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="/manager/inventory"
              >Manage Inventory</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <router-link
              class="nav-link dropdown-toggle"
              to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Reports
            </router-link>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="#"
                  >Sales Report</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="#"
                  >Excess Report</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="#"
                  >X and Z Report</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="background">
    <div
      class="inventory container align-items-center justify-content-center rounded bg-white"
    >
      <div class="row">
        <div class="col">
          <h1 class="mb-3">Current Inventory</h1>
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table v-if="Inventory && Inventory.length" class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in Inventory">
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container align-items-center mt-4 mb-3 justify-content-center rounded bg-white"
    >
      <div class="row">
        <div class="col">
          <h1 class="mb-4">Add Item</h1>
        </div>
      </div>
      <form>
        <div class="row">
          <div class="col">
            <select class="form-select" aria-label="Select Category">
              <option selected>Choose Category</option>
              <option value="1">base</option>
              <option value="2">side</option>
              <option value="3">extra</option>
            </select>
          </div>
          <div class="col">
            <div class="form-group">
              <input
                type="text"
                for="item-name-add"
                class="form-control"
                id="item-name-add"
                placeholder="Enter Item Name"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col mt-3">
            <div class="form-group">
              <input
                type="text"
                for="quantity-add"
                class="form-control"
                id="quantity-add"
                placeholder="Enter Item Quantity"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col mt-3">
            <div class="form-group">
              <input
                type="text"
                for="price-add"
                class="form-control"
                id="price-add"
                placeholder="Enter Item Price"
              />
            </div>
          </div>
        </div>
        <button type="submit" class="btn mt-4 btn-primary">Submit Item</button>
      </form>
    </div>
    <div
      class="container align-items-center mt-4 mb-3 justify-content-center rounded bg-white"
    >
      <div class="row">
        <div class="col">
          <h1 class="mb-4">Edit Item</h1>
        </div>
      </div>
      <form>
        <div class="row">
          <div class="col">
            <select class="form-select" aria-label="Select Item">
              <option selected>Select Item</option>
              <option value="{{ index }}" v-for="item in Inventory">{{ item.name }}</option>
            </select>
          </div>
          <div class="col">
            <select class="form-select" aria-label="Select Item">
              <option selected>Select Attribute</option>
              <option value="1">ID</option>
              <option value="2">Name</option>
              <option value="3">Category</option>
              <option value="4">Price</option>
            </select>
          </div>
          <div class="col">
            <div class="form-group">
              <input
                type="text"
                for="item-name-add"
                class="form-control"
                id="item-name-add"
                placeholder="Enter Item Name"
              />
            </div>
          </div>
        </div>
        <button type="submit" class="btn mt-4 btn-primary">Edit Item</button>
      </form>
    </div>
    <div
      class="container align-items-center mt-4 mb-3 justify-content-center rounded bg-white"
    >
      <div class="row">
        <div class="col">
          <h1 class="mb-4">Remove Item</h1>
        </div>
        <form>
          <div class="row">
            <div class="col">
              <select class="form-select" aria-label="Select Item">
                <option selected>Select Item</option>
              <option v-for="item in Inventory">{{ item.name }}</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn mt-4 btn-primary">
            Remove Item
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/assets/inventory.css";

.background {
  padding: 10px;
  background-color: lightgray;
}
</style>

<script>
import { getInventory } from "/src/services/InventoryService";

export default {
  name: "Inventory",
  data() {
    return {
      Inventory: {},
    };
  },
  mounted() {
    getInventory().then((response) => {
      this.Inventory = response.data;
      console.log(response.data);
    });
  },
};
</script>
