<template>
  <nav class="navbar sticky-top py-3 navbar-dark navbar-expand-lg" style="background-color: rgb(46, 56, 116)">
    <div class="container-fluid">
      <a class="navbar-brand" href="/manager">
        <img src="/src/assets/p&hlogo.png" alt="Pom & Honey Logo" width="80" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse text-white" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/manager">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/manager/inventory">Manage Inventory</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Reports
            </router-link>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/manager/sales">Sales Report</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/manager/excess">Excess Report</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/manager/xz">X and Z Report</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="background">
    <div class="container">
      <div class="row">
        <div class="col py-4 rounded-pill container d-flex align-items-center justify-content-center bg-white"
          style="margin-top: 45px">
          <img src="src/assets/user-icon.png" alt="User's Profile Picture" width="50" />
          <h1 style="margin-left: 15px">Howdy, {{ name }}!</h1>
        </div>
      </div>
    </div>
    <div class="container mt-4 d-flex align-items-center justify-content-center">
      <div class="row">
        <div class="col-md-auto content rounded d-flex align-items-center justify-content-center bg-white">
          <div class="" style="width: 700px;"><canvas id="salesChart"></canvas></div>
        </div>
        <div class="col px-5"></div>
        <div class="col-md-auto content bg-white rounded px-5">
          <h2 class="mt-3 text-center">Restock Report</h2>
          <div v-if="RestockCount">
            <h5 style="font-weight: normal;" class="text-center mb-3">The Following Items Need To Be Restocked</h5>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Item Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in RestockItems">
                    <td>{{ item }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else>
            <h5 style="font-weight: normal;" class="text-center mb-3">No Items Need To Be Restocked</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  height: 95vh;
  background-color: lightgray;
}

.my-custom-scrollbar {
  text-align: center;
  position: relative;
  overflow: auto;
  height: 38vh;
}

.table-wrapper-scroll-y {
  display: block;
}

.content {
  height: 60vh;
}
</style>

<script>
import Chart from 'chart.js/auto';
import { getInventory } from "/src/services/InventoryService";

export default {
  name: "Manager",
  data() {
    return {
      name: "Manager",
      Inventory: {},
      RestockItems: [],
      RestockCount: 0,
    };
  },
  mounted() {
    (async function () {
      const data = [
        { date: '2023-04-10', sales: 10234.32 },
        { date: '2023-04-11', sales: 20267.38 },
        { date: '2023-04-12', sales: 15837.90 },
        { date: '2023-04-13', sales: 25246.92 },
        { date: '2023-04-14', sales: 22792.37 },
        { date: '2023-04-15', sales: 30629.32 },
        { date: '2023-04-16', sales: 28938.53 },
      ];

      new Chart(
        document.getElementById('salesChart'),
        {
          type: 'line',
          data: {
            labels: data.map(row => row.date),
            datasets: [
              {
                label: 'Past 7 Days in Sales Per Day',
                data: data.map(row => row.sales),
                borderColor: 'rgb(46,56,116)'
              }
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Pom & Honey's Recent Sales",
                padding: {
                  top: 10,
                  bottom: 10
                }
              }
            },
            scales: {
              y: {

                min: 0,
              }
            }
          }
        }
      );
    })();

    getInventory().then((response) => {
      this.Inventory = response.data;

      //counts the size of the inventory
      var inventoryCount = 0;
      for (var i in this.Inventory) {
        if (this.Inventory.hasOwnProperty(i)) inventoryCount++;
      }

      //loops through inventory and pushes low stock items
      for (let i = 0; i < inventoryCount; i++) {
        if (this.Inventory[i].quantity < 2000) {
          this.RestockItems.push(this.Inventory[i].name)
          this.RestockCount++;
        }
      }
    }).catch((error) => {
      alert("Error Retrieving Inventory: " + error)
    });

  }
};
</script>
