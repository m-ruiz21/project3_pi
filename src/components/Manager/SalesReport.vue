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
                        <button @click='SubmitReport' class="btn btn-primary">
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
                                    <th scope="col">Date</th>
                                    <th scope="col">Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
                                </tr>
                                <tr>
                                    <td>16-04-2023</td>
                                    <td>10325.24</td>
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
import { getInventory } from "/src/services/InventoryService";

export default {

    name: "SalesReport",
    data() {
        return {
            Inventory: {},
            SelectedItem: '',
            StartTime: '',
            EndTime: '',
        };
    },
    methods: {
        SubmitReport() {
            alert("Button Pressed:\n" + this.SelectedItem + "\n" + this.StartTime + "\n" + this.EndTime)
        },
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
@import "/src/assets/table.css";

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
  