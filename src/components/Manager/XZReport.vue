<template>
    <nav class="navbar sticky-top py-3 navbar-dark navbar-expand-lg" style="background-color: rgb(46, 56, 116)">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
                <img src="/src/assets/p&hlogo.png" alt="Pom & Honey Logo" width="80" />
            </router-link>
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
                        <router-link class="nav-link" to="/server">Orders</router-link>
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
                <ul v-if="isAuthenticated" class="navbar-nav profile justify-content-end align-items-center"
                    style="margin-right: 120px;">
                    <div class="dropdown">
                        <img class="rounded-circle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                            aria-expanded="false" :src="user.picture" height="40">
                        <ul class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button class="btn" @click="goToPage('/manager')">Manager View</button>
                            </li>
                            <li>
                                <button class="btn" @click="goToPage('/server')">Server View</button>
                            </li>
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
    <div class="background row">
        <div class="x-report container align-items-center justify-content-center rounded bg-white">
            <div class="row">
                <div class="col">
                    <h1 class="mt-3 mb-3">X Report</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Today's Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${{ XReport.sales }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="container z-report align-items-center justify-content-center rounded bg-white">
            <div class="col">
                <h1 class="mt-3 mb-3">Z Report</h1>
                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                    <table v-if="ZReport.length" class="table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in ZReport">
                                <td>{{ item.date.split('T')[0] }}</td>
                                <td> {{ item.sales }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 class="mt-4" v-else style="font-weight: normal;">Please Press Generate</h2>
                </div>
                <button v-if="!ZReport.length" @click='GenerateZReport' class="btn mt-4 mb-5 btn-primary">
                    Generate
                </button>
                <button v-else @click='ZReportLoadMore' class="btn mt-4 mb-5 btn-primary">
                    Load More
                </button>
            </div>
        </div>
    </div>
    <manager-footer></manager-footer>
</template>
  
<script>

import { getXReport, getZReportWithSize } from '/src/services/ReportService';
import Footer from "/src/components/Manager/Footer.vue"


export default {
    name: "XZReport",
    data() {
        return {
            name: "Empty",
            pageSize: 50,
            XReport: {},
            ZReport: {},
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
            isLoading: this.$auth0.isLoading,
        };
    },

    components: {
        'manager-footer': Footer
    },

    methods: {
        GenerateZReport() {
            getZReportWithSize(this.pageSize).then((response) => {
                this.ZReport = response.data;
                console.log(response.data);

            }).catch((error) => {
                alert("Error Retrieving Z Report: " + error)
            });
        },

        ZReportLoadMore(){
            this.pageSize += 50
            getZReportWithSize(this.pageSize).then((response) => {
                this.ZReport = response.data;
                console.log(response.data);

            }).catch((error) => {
                alert("Error Retrieving Z Report: " + error)
            });
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
        },
        isServer() {
            const role = window.localStorage.getItem('role')
            if ((role == 'server') || (role == 'manager')) {
                return true;
            }
            return false;
        },
        isManager() {
            const role = window.localStorage.getItem('role')
            if (role == 'manager') {
                return true;
            }
            return false;
        },
        goToPage(pageName) {
            window.location.href = pageName;
        },
    },
    beforeMount() {
        if (this.isAuthenticated) {
            if (!this.isManager()) {
                window.location.href = '/access-denied';
            }
        }
    },
    mounted() {
        getXReport().then((response) => {
            this.XReport = response.data;
            console.log(response.data);
        }).catch((error) => {
            alert("Error Retrieving X Report: " + error)
        });
    },
};
</script>
  
<style scoped>
.background,
h1,
h5 {
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.1px;
}

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

.rounded-circle img:hover {
    filter: brightness(70%)
}

@media (max-width: 990px) {

    .profile,
    h5 {
        margin: 0px 0px 0px 0px !important;
    }

}
</style>
  