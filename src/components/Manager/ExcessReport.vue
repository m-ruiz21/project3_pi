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
            </div>
        </div>
    </nav>
    <div class="background">
        <div class="inventory container align-items-center justify-content-center rounded bg-white">
            <div class="row">
                <div class="col">
                    <h1 style="margin-left: -5%;" class="mb-4 mt-5">Excess Report</h1>
                </div>
            </div>
            <form style="padding: 0 5vw;">
                <div class="row mb-4">
                    <div class="col-9">
                        <div class="form-group">
                            <input v-model="StartTime" type="text" for="start-time" class="form-control" id="item-name-add"
                                placeholder="Start Time" />
                        </div>
                    </div>
                    <div class="col-3">
                        <button type="button" @click='SubmitReport' class="btn btn-primary">
                            View Report
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
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Amount Sold</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in ExcessReport">
                                    <td>{{ item.menuItemName }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ item.amountSold }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getExcessReport } from '/src/services/ReportService';

export default {

    name: "Excess",
    data() {
        return {
            ExcessReport: {},
            StartTime: '',
        };
    },
    methods: {
        SubmitReport() {
            if (this.StartTime) {
                getExcessReport(this.StartTime).then((response) => {
                    this.ExcessReport = response.data;
                    console.log(response.data);
                }).catch((error) => {
                    alert("Error Retrieving Excess Report: " + error + "\nPlease Enter Time in This Format: YYYY-MM-DD")
                });
            }
            else{
                alert("Invalid Input")
            }
        },
    },
    mounted() {
    },
};
</script>
  
<style scoped>
.container {
    text-align: center;
    max-width: 50%;
    margin-top: 30px;
}

.my-custom-scrollbar {
    position: relative;
    width: 45vw;
    overflow: auto;
    padding-left: 3vw;
}

.table-wrapper-scroll-y {
    display: block;
}

.background {
    padding-top: 10px;
    background-color: lightgray;
    height: 100vh;
}

.my-custom-scrollbar {
    height: 55vh;
}

.container {
    padding-bottom: 4%;
}
</style>
  