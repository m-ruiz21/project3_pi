<template>
    <nav class="navbar sticky-top py-3 navbar-dark navbar-expand-lg" id="navbar" style="background-color: rgb(46, 56, 116)">
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
                        <router-link class="nav-link" aria-current="page" to="/manager">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/manager/inventory">Manage Inventory</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/server">Place Orders</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link class="nav-link dropdown-toggle active" to="#" role="button" data-bs-toggle="dropdown"
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
                <ul v-if="isAuthenticated" class="navbar-nav profile justify-content-end align-items-center" style="margin-right: 120px;">
                    <div class="dropdown">
                        <img class="rounded-circle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                            aria-expanded="false" :src="user.picture" height="40">
                        <ul class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button class="btn" @click="logout">Sign out</button>
                            </li>
                        </ul>
                    </div>
                    <h5 style="margin: 5px 0px 0px 8px; font-size: 17px;">{{ user.given_name }}</h5>
                </ul>
            </div>
        </div>
    </nav>
    <div class="background">
        <div class="inventory container align-items-center justify-content-center rounded bg-white">
            <div class="row">
                <div class="col">
                    <h1 style="margin-left: -5%;" class="mb-4 mt-5">Sales Report</h1>
                </div>
            </div>
            <form style="padding: 0 5vw;">
                <div class="row mb-4">
                    <div class="col">
                        <select class="form-select" v-model="SelectedItem">
                            <option value="">Select Item</option>
                            <option v-for="item in Inventory">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <input v-model="StartTime" type="text" for="start-time" class="form-control" id="item-name-add"
                                placeholder="Start Time" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <input v-model="EndTime" type="text" for="end-time" class="form-control" id="item-name-add"
                                placeholder="End Time" />
                        </div>
                    </div>
                    <div class="col-2">
                        <button type="button" @click='SubmitReport' class="btn btn-primary">
                            Generate
                        </button>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col">
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in SalesReport">
                                    <td>{{ item.date }}</td>
                                    <td>{{ item.sold }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <manager-footer></manager-footer>
</template>
  
<script>
import { getInventory } from "/src/services/InventoryService";
import { getSalesReport } from "/src/services/ReportService";
import Footer from "/src/components/Manager/Footer.vue"

export default {

    name: "SalesReport",
    data() {
        return {
            Inventory: {},
            SalesReport: {},
            SelectedItem: '',
            StartTime: '',
            EndTime: '',
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
            isLoading: this.$auth0.isLoading,
        };
    },
    components: {
        'manager-footer': Footer
    },
    methods: {
        SubmitReport() {
            if (!this.SelectedItem || !this.StartTime || !this.EndTime) {
                alert("Invalid Input. Please Try Again \nPlease Enter Time in This Format: YYYY-MM-DD")
            }
            else {
                getSalesReport(this.SelectedItem, this.StartTime, this.EndTime).then((response) => {
                    this.SalesReport = response.data;
                    console.log(response.data);

                    //counts the size of the z report
                    var salesCount = 0;
                    for (var i in this.SalesReport) {
                        if (this.SalesReport.hasOwnProperty(i)) salesCount++;
                    }

                    //loops through inventory and sets type for item
                    for (let i = 0; i < salesCount; i++) {
                        this.SalesReport[i].date = this.SalesReport[i].date.slice(0, -9)
                    }

                }).catch((error) => {
                    alert("Error Retrieving Sales Report: " + error + "\nPlease Enter Time in This Format: YYYY-MM-DD")
                });
            }
        },
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
            console.log(response.data);
        }).catch((error) => {
            alert("Error Retrieving Inventory: " + error)
        });
    },
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@500&display=swap');

.background,
h1,
h5 {
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.1px;
}

.container {
    text-align: center;
    max-width: 63vw;
    margin-top: 30px;
    padding-bottom: 4%;
}

.my-custom-scrollbar {
    position: relative;
    width: 56vw;
    overflow: auto;
    padding-left: 5vw;
    height: 55vh;
}

.table-wrapper-scroll-y {
    display: block;
}

.background {
    padding-top: 10px;
    background-color: lightgray;
    height: 100vh;
}

.rounded-circle img:hover {
  filter: brightness(70%)
}

@media (max-width: 990px) {
  
  .profile, h5{
    margin: 0px 0px 0px 0px!important;
  }

}
</style>
  