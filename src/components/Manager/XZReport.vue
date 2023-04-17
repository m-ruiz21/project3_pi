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
    <div class="background row">
        <div class="x-report container align-items-center justify-content-center rounded bg-white">
            <div class="row">
                <div class="col">
                    <h1 class="mt-3 mb-3">X Report</h1>
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Time</th>
                                    <th scope="col">Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>11:23</td>
                                    <td>$24.02</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="container z-report align-items-center justify-content-center rounded bg-white">
            <div class="col">
                <h1 class="mt-3 mb-3">Z Report</h1>
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
                                <td>3/2/23</td>
                                <td>$112424.02</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button @click='GenerateZReport' class="btn mb-5 btn-primary">
                    Generate
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "XZReport",
    data() {
        return {
            name: "Empty",
            XReport: {},
            ZReport: {},
        };
    },

    methods: {
        GenerateZReport() {
            alert("Generate Pressed")
        }
    }
};
</script>
  
<style scoped>
.container {
    text-align: center;
    justify-content: center;
    max-width: 40%;
    margin-top: 3%;
    margin-bottom: 5%;
}

.my-custom-scrollbar {
    position: relative;
    width: 37vw;
    height: 58vh;
    overflow: auto;
    padding-left: 2%;
}

.table-wrapper-scroll-y {
    display: block;
}

.background {
    background-color: lightgray;
    padding-top: 10px;
    margin-right: 0px;
    height: 100vh;
}
</style>
  