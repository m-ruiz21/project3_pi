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
            <router-link class="nav-link" to="/manager">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/manager/inventory">Manage
              Inventory</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/server">Orders</router-link>
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
  <div class="background">
    <div class="inventory container align-items-center justify-content-center rounded bg-white">
      <div class="row">
        <h1 class="mt-5 mb-0">Current Inventory</h1>
      </div>
      <div class="row mb-2">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col">
          <button v-if="!showAddModel" class="btn btn-primary" @click="showAdd">Add Item</button>
        </div>
      </div>
      <div class="row">
        <div class="table-wrapper-scroll-y my-custom-scrollbar mb-5">
          <table v-if="Inventory && Inventory.length" class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in Inventory" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                  <div class="dropdown dropend">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-three-dots-vertical" viewBox="0 0 16 16" data-bs-toggle="dropdown"
                      data-bs-target="#actionsDropdown{{item.id}}" aria-expanded="false">
                      <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                    <ul class="dropdown-menu" aria-labelledby="actionsDropdown{{item.id}}">
                      <li v-if="item.type == 'menu item'"><a class="dropdown-item" href="#"
                          @click.prevent="showEditModal(item)">Edit</a></li>
                      <li><a class="dropdown-item" href="#" @click.prevent="showRestockModal(item)">Restock</a></li>
                      <li><a class="dropdown-item text-danger" href="#" @click.prevent="deleteItem(item)">Delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <td></td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showAddModel" class="d-flex justify-content-center align-items-center">
    <div
      class="container2 border border-secondary px-4 align-items-center mt-4 mb-3 d-flex justify-content-center rounded bg-white">
      <form>
        <div class="row justify-content-end">
          <button type="button" class="btn-close mt-4" data-dismiss="modal" aria-label="Close" @click="hideAdd"></button>
        </div>
        <div class="row">
          <h4 style="border-bottom: solid 1px lightgray;" class="text-center py-2">Add Item</h4>
          <div class="col">
            <select class="form-select" v-model="SelectedAddCategory">
              <option value="">Choose Category</option>
              <option>Base</option>
              <option>Protein</option>
              <option>Topping</option>
              <option>Drink</option>
              <option>Dressing</option>
              <option>Menu Item</option>
              <option>Extra</option>
              <option>Cutlery</option>
            </select>
          </div>
          <div class="col">
            <div class="form-group">
              <input v-model="AddItemName" type="text" for="item-name-add" class="form-control" id="item-name-add"
                placeholder="Enter Item Name" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col mt-3">
            <div class="form-group">
              <input v-model="AddItemQuantity" type="text" for="quantity-add" class="form-control" id="quantity-add"
                placeholder="Enter Item Quantity" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col mt-3">
            <div class="form-group">
              <input v-model="AddItemPrice" type="text" for="price-add" class="form-control" id="price-add"
                placeholder="Enter Item Price" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex justify-content-center">
            <button type="button" @click="AddItem" class="btn mt-5 mb-4 btn-primary">
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <manager-footer></manager-footer>

  <restock-popup :item="selectedItem" :show-modal="showRestockPopupModal"
    :on-hide="() => { showRestockPopupModal = false }" :on-restock="restockItem" />

  <edit-popup :item="selectedItem" :show-modal="showEditPopupModal" :on-hide="() => { showEditPopupModal = false }" />
</template>

<style scoped>
@import "/src/assets/table.css";

.background,
h1,
h5 {
  font-family: 'Lato', sans-serif;
  letter-spacing: 0.1px;
}

.background {
  padding: 10px;
  min-height: 90vh;
  background-color: rgb(237, 239, 240);
}

.my-custom-scrollbar {
  height: 50vh;
}

.tab-pane {
  padding: 0px 40px;
}

.container2 {
  top: 17%;
  max-width: 40%;
  position: absolute;
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

<script>
import { getInventory, InventoryAdd, InventoryRemove, InventoryEdit } from "/src/services/InventoryService";
import Footer from "/src/components/Manager/Footer.vue"
import RestockPopup from "/src/components/Manager/Restock.vue"
import EditPopup from "/src/components/Manager/Edit.vue"

export default {
  name: "Inventory",
  data() {
    return {
      Inventory: {},
      SelectedAddCategory: '',
      AddItemName: '',
      AddItemQuantity: '',
      AddItemPrice: '',
      SelectedEditItem: '',
      SelectedEditAttribute: '',
      EditItemValue: '',
      SelectedRemoveItem: '',
      returnData: {},
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      selectedItem: { name: '', quantity: 0, category: '' },
      showRestockPopupModal: false,
      showEditPopupModal: false,
      showAddModel: false,
    };
  },
  components: {
    'manager-footer': Footer,
    'restock-popup': RestockPopup,
    'edit-popup': EditPopup
  },
  methods: {
    AddItem() {
      if (!this.SelectedAddCategory || !this.AddItemName || !this.AddItemQuantity || !this.AddItemPrice) {
        alert("Invalid Input. Please Reenter Values")
      }
      else {
        InventoryAdd(this.AddItemName, this.SelectedAddCategory, this.AddItemPrice, this.AddItemQuantity).then((response) => {
          this.returnData = response.data;
          console.log(response.data);
          console.log("Item Added Successfully: " + this.returnData.name)
          this.showAddModel = false
          this.SelectedAddCategory = ''
          this.AddItemName = ''
          this.AddItemQuantity = ''
          this.AddItemPrice = ''
          getInventory().then((response) => {
            this.Inventory = response.data;
            console.log(response.data);
          }).catch((error) => {
            alert("Error Retrieving Inventory: " + error)
            this.showAddModel = false
          });
        }).catch((error) => {
          alert("Error Adding Item. Please Try Again")
          this.showAddModel = false
          window.location.reload()
        });
      }

    },
    hideAdd() {
      this.showAddModel = false
    },
    showAdd() {
      this.showAddModel = true
    },

    deleteItem(item) {
      console.log(item)
      InventoryRemove(item.name, item.type).then((response) => {
        this.returnData = response.data;
        console.log("Item Removed: " + item.name)

        //refresh inventory
        getInventory().then((response) => {
          this.Inventory = response.data;
          console.log(response.data);
        }).catch((error) => {
          alert("Error Retrieving Inventory: " + error)
        });

        console.log(response.data);
      }).catch((error) => {
        alert("Error Removing Item: " + error)
        window.location.reload()
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
    showRestockModal(item) {
      this.selectedItem = item;
      this.showRestockPopupModal = true;
    },
    restockItem(item, value) {
      InventoryEdit(item.name, 'Quantity', item.quantity + value, item).then((response) => {
        this.returnData = response.data;
        console.log(response.data)
        console.log("Item Restocked: " + item.name)

        //refresh inventory
        getInventory().then((response) => {
          this.Inventory = response.data;
          console.log(response.data);
        }).catch((error) => {
          alert("Error Retrieving Inventory: " + error)
        });

      }).catch((error) => {
        if (!(error instanceof TypeError)) {
          alert("Error Restocking Item: " + error)
          window.location.reload()
        }
        console.log(error)
      });
    },
    showEditModal(item) {
      this.selectedItem = item;
      this.showEditPopupModal = true;
      console.log(this.showEditPopupModal);
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
    if (!this.isManager()) {
      window.location.href = '/access-denied';
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
