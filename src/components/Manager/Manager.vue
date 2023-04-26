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
          <li class="nav-item">
            <router-link class="nav-link" to="/server">Place Orders</router-link>
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
        <ul v-if="isAuthenticated" class="navbar-nav justify-content-end profile align-items-center" style="margin-right: 120px;">
          <div class="dropdown">
            <img class="rounded-circle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
              aria-expanded="false" :src="user.picture" height="40">
            <ul class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="btn" @click="logout">Sign out</button>
              </li>
            </ul>
          </div>
          <h5 style="margin: 5px 0px 0px 8px; font-size: 17px;" >{{ user.given_name }}</h5>
        </ul>
      </div>
    </div>
  </nav>
  <div class="background">
    <div class="container">
      <div class="row">
        <div v-if="isAuthenticated"
          class="col-md-11 py-4 rounded-5 container d-flex align-items-center justify-content-center bg-white"
          style="margin-top: 45px">
          <h1 style="margin-left: 15px">Welcome, {{ user.given_name }}!</h1>
        </div>
        <div v-else class="col-md-11 py-4 rounded-5 container d-flex align-items-center justify-content-center bg-white"
          style="margin-top: 45px">
          <img class="rounded-circle" style="margin-top: -5px;" src="/src/assets/user-icon.png"
            alt="User's Profile Picture" width="50" />
          <h1 style="margin-left: 15px">Welcome, Manager!</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row align-items-center justify-content-evenly">
        <div class="col-lg-7 mt-4 mb-4 content rounded d-flex align-items-center justify-content-center bg-white">
          <canvas id="salesChart"></canvas>
        </div>
        <div class=" col-md-auto mt-4 mb-4 restock content bg-white rounded px-5">
          <h2 class="h2 mt-3 text-center">Restock Report</h2>
          <div v-if="RestockCount">
            <h5 style="font-weight: normal;" class="text-center mb-3 h5">Please Restock the Following Items</h5>
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
            <h5 style="font-weight: normal;" class="h5 text-center mb-3">No Items Need To Be Restocked</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <manager-footer></manager-footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@500&display=swap');

.background,
h1,
h5 {
  font-family: 'Lato', sans-serif;
  letter-spacing: 0.1px;
}

.background {
  min-height: 95vh;
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

img:hover {
  filter: brightness(70%)
}

.content {
  height: 60vh;
}

@media (max-width: 1200px) {
  .restock {
    margin: 30px;
  }

  .content,
  .rounded-5 {
    width: 80vw;
  }
}

@media (max-width: 990px) {
  
  .profile, h5{
    margin: 0px 0px 0px 0px!important;
  }

}

</style>

<script>
import Chart from 'chart.js/auto';
import { getInventory } from "/src/services/InventoryService";
import { getZReport } from "/src/services/ReportService";
import Footer from "/src/components/Manager/Footer.vue"

export default {
  name: "Manager",
  data() {
    return {
      name: "Manager",
      Inventory: {},
      RestockItems: [],
      RestockCount: 0,
      salesData: {},
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    };
  },
  components: {
    'manager-footer': Footer
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
  },
  mounted() {

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

    getZReport().then((response) => {
      this.salesData = response.data;
      console.log(response.data);

      //counts the size of the z report
      var count = 0;
      for (var i in this.salesData) {
        if (this.salesData.hasOwnProperty(i)) count++;
      }

      //loops through inventory and sets type for item
      for (let i = 0; i < count; i++) {
        this.salesData[i].date = this.salesData[i].date.slice(0, -23)
      }

      //update data here
      const data = [
        { date: this.salesData[count - 7].date, sales: this.salesData[count - 7].sales },
        { date: this.salesData[count - 6].date, sales: this.salesData[count - 6].sales },
        { date: this.salesData[count - 5].date, sales: this.salesData[count - 5].sales },
        { date: this.salesData[count - 4].date, sales: this.salesData[count - 4].sales },
        { date: this.salesData[count - 3].date, sales: this.salesData[count - 3].sales },
        { date: this.salesData[count - 2].date, sales: this.salesData[count - 2].sales },
        { date: this.salesData[count - 1].date, sales: this.salesData[count - 1].sales },
      ];

      new Chart(
        document.getElementById('salesChart'),
        {
          type: 'line',
          data: {
            labels: data.map(row => row.date),
            datasets: [
              {
                label: 'Last 7 Open Days in Sales',
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

    }).catch((error) => {
      alert("Error Retrieving Sales Data for Chart: " + error)
    });

  }
};
</script>
