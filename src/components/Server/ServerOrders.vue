<template>
    <nav class="navbar sticky-top py-3 navbar-dark navbar-expand-lg" id="navbar" style="background-color: rgb(46, 56, 116)">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="/src/assets/p&hlogo.png" alt="Pom & Honey Logo" width="80" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse text-white" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/server">Place Orders</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/server/orders">View Orders</router-link>
                    </li>
                </ul>
                <ul v-if="isAuthenticated" class="navbar-nav justify-content-end profile align-items-center"
                    style="margin-right: 120px;">
                    <div class="dropdown">
                        <img class="rounded-circle" type="button" id="dropdownMenuButton0" data-bs-toggle="dropdown"
                            aria-expanded="false" :src="user.picture" height="40" @click="isManager">
                        <ul class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton0">
                            <li v-if="currentRole == 'manager'">
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
    <div class="background pb-5">
        <div class="inventory container align-items-center justify-content-center rounded bg-white">
            <div class="row">
                <div class="col">
                    <h1 style="margin-left: -5%;" class="mb-2 mt-5">Order History</h1>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col"></div>
                <div class="col-md-auto">
                    <button type="button" @click='previousPage' class="btn btn-secondary">
                        Previous
                    </button>
                </div>
                <div class="col-md-auto" style="margin-right: 60px;">
                    <button type="button " @click='nextPage' class="btn px-4 btn-primary">
                        Next
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Items</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders">
                                    <td>{{ order.dateTime.split('T')[0] }}</td>
                                    <td>{{ order.dateTime.split('T')[1] }}</td>
                                    <td>{{ order.Items }}</td>
                                    <td>{{ order.price }}</td>
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
import Footer from "/src/components/Manager/Footer.vue"
import { getOrders } from '/src/services/ReportService.js'

export default {
    name: "Orders",
    data() {
        return {
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
            isLoading: this.$auth0.isLoading,
            currentRole: 'server',
            orders: {},
            pageNumber: 1,
        };
    },
    components: {
        'manager-footer': Footer,
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
                this.currentRole = 'manager'
                return true;
            }
            this.currentRole = 'false'
            return false;
        },
        goToPage(pageName) {
            window.location.href = pageName;
        },
        nextPage() {
            this.pageNumber++;
            getOrders(this.pageNumber).then((response) => {
                this.orders = response.data;
                console.log(response.data);
            }).catch((error) => {
                alert("Error Retrieving Orders: " + error)
            });
        },
        previousPage() {
            this.pageNumber--;
            if (this.pageNumber <= 0) {
                this.pageNumber = 1;
            }
            getOrders(this.pageNumber).then((response) => {
                this.orders = response.data;
                console.log(response.data);
            }).catch((error) => {
                alert("Error Retrieving Orders: " + error)
            });
        },
    },
    beforeMount() {
        if (!this.isServer()) {
            window.location.href = '/';
        }
    },
    mounted() {
        getOrders(this.pageNumber).then((response) => {
            this.orders = response.data;
            console.log(response.data);
        }).catch((error) => {
            alert("Error Retrieving Orders: " + error)
        });
    }
};
</script>
  
<style scoped>
h1 {
    text-align: center;
}

.background,
h1,
h5 {
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.1px;
}

.rounded-circle img:hover {
    filter: brightness(70%)
}

.container {
    text-align: center;
    max-width: 70vw;
    margin-top: 30px;
}

.my-custom-scrollbar {
    position: relative;
    width: 65vw;
    overflow: auto;
    padding-left: 3vw;
}

.table-wrapper-scroll-y {
    display: block;
}


.my-custom-scrollbar {
    height: 55vh;
}

.container {
    padding-bottom: 4%;
}


.background {
    padding: 20px;
    min-height: 95vh;
    background-color: lightgray;
}

@media (max-width: 990px) {

    .profile,
    h5 {
        margin: 0px 0px 0px 0px !important;
    }

}
</style>
  