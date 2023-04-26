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
            <router-link class="nav-link" to="/manager">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/manager/inventory">Manage
              Inventory</router-link>
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
    <div class="inventory container align-items-center justify-content-center rounded bg-white">
      <div class="row">
        <div class="col">
          <h1 class="mt-5 mb-4">Current Inventory</h1>
          <div class="table-wrapper-scroll-y my-custom-scrollbar mb-5">
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
    <div class="container align-items-center mt-4 mb-3 justify-content-center rounded bg-white">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item mt-4" role="presentation">
          <button class="nav-link active" id="add-tab" data-bs-toggle="tab" data-bs-target="#add" type="button" role="tab"
            aria-controls="add" aria-selected="true">
            Add Item
          </button>
        </li>
        <li class="nav-item mt-4" role="presentation">
          <button class="nav-link" id="edit-tab" data-bs-toggle="tab" data-bs-target="#edit" type="button" role="tab"
            aria-controls="edit" aria-selected="false">
            Edit Item
          </button>
        </li>
        <li class="nav-item mt-4" role="presentation">
          <button class="nav-link" id="remove-tab" data-bs-toggle="tab" data-bs-target="#remove" type="button" role="tab"
            aria-controls="remove" aria-selected="false">
            Remove Item
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active mt-5" id="add" role="tabpanel" aria-labelledby="add-tab">
          <!-- <h5>Category: {{ SelectedAddCategory }}, Name: {{ AddItemName }}, #: {{ AddItemQuantity }}, Price: {{ AddItemPrice }}</h5> -->
          <form>
            <div class="row">
              <div class="col">
                <select class="form-select" v-model="SelectedAddCategory">
                  <option value="">Choose Category</option>
                  <option>Base</option>
                  <option>Protein</option>
                  <option>Topping</option>
                  <option>Drink</option>
                  <option>Dressing</option>
                  <option>Side</option>
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
            <button type="button" @click="AddItem" class="btn mt-5 mb-5 btn-primary">
              Add Item
            </button>
          </form>
        </div>
        <div class="tab-pane fade mt-5" id="edit" role="tabpanel" aria-labelledby="edit-tab">
          <!-- <h5>Item: {{ SelectedEditItem }}, Attribute: {{ SelectedEditAttribute }}, Name: {{ EditItemName }}</h5> -->
          <form>
            <div class="row">
              <div class="col">
                <select class="form-select" v-model="SelectedEditItem">
                  <option value="">Select Item</option>
                  <option v-for="item in Inventory">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col">
                <select class="form-select" v-model="SelectedEditAttribute">
                  <option value="">Select Attribute</option>
                  <option>Category</option>
                  <option>Price</option>
                  <option>Quantity</option>
                </select>
              </div>
              <div class="col">
                <div class="form-group">
                  <input v-model="EditItemValue" type="text" for="item-name-add" class="form-control" id="item-name-add"
                    placeholder="Enter New Value" />
                </div>
              </div>
            </div>
            <button type="button" @click="EditItem" class="btn mt-5 mb-5 btn-primary">
              Edit Item
            </button>
          </form>
        </div>
        <div class="tab-pane fade mt-5" id="remove" role="tabpanel" aria-labelledby="remove-tab">
          <!-- <h5>Item: {{ SelectedRemoveItem }}</h5> -->
          <form>
            <div class="row">
              <div class="col">
                <select v-model="SelectedRemoveItem" class="form-select">
                  <option value="">Select Item</option>
                  <option v-for="item in Inventory">{{ item.name }}</option>
                </select>
              </div>
            </div>
            <button type="button" @click='RemoveItem' class="btn mt-5 mb-5 btn-primary">
              Remove Item
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <manager-footer></manager-footer>
</template>

<style scoped>
@import "/src/assets/table.css";
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@500&display=swap');

.background, h1, h5 {
  font-family: 'Lato', sans-serif;
  letter-spacing: 0.1px;
}

.background {
  padding: 10px;
  background-color: lightgray;
}

.my-custom-scrollbar {
  height: 50vh;
}

.tab-pane {
  padding: 0px 40px;
}
</style>

<script>
import { getInventory, InventoryAdd, InventoryRemove, InventoryEdit } from "/src/services/InventoryService";
import Footer from "/src/components/Manager/Footer.vue"

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
    };
  },
  components: {
      'manager-footer': Footer
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
          alert("Item Added Successfully: " + this.returnData.name)
          window.location.reload()
        }).catch((error) => {
          alert("Error Adding Item: " + error)
          window.location.reload()
        });
      }

    },

    EditItem() {
      if (!this.SelectedEditAttribute || !this.SelectedEditItem || !this.EditItemValue) {
        alert("Invalid Input. Please Reenter Values")
      }
      else {

        //counts the size of the inventory
        var inventoryCount = 0;
        for (var i in this.Inventory) {
          if (this.Inventory.hasOwnProperty(i)) inventoryCount++;
        }

        //stores item in dictionary
        var item = {}

        //loops through inventory and sets information for item
        for (let i = 0; i < inventoryCount; i++) {
          if (this.Inventory[i].name == this.SelectedEditItem) {
            item = this.Inventory[i]
          }
        }

        console.log(item)

        InventoryEdit(this.SelectedEditItem, this.SelectedEditAttribute, this.EditItemValue, item).then((response) => {
          this.returnData = response.data;
          console.log(response.data)
          alert("Item Edited: " + this.SelectedEditItem)
          window.location.reload()
        }).catch((error) => {
          if (!(error instanceof TypeError)) {
            alert("Error Editing Item: " + error)
            window.location.reload()
          }
          console.log(error)
        });
      }
    },

    RemoveItem() {
      if (this.SelectedRemoveItem) {
 
        //counts the size of the inventory
        var inventoryCount = 0;
        for (var i in this.Inventory) {
          if (this.Inventory.hasOwnProperty(i)) inventoryCount++;
        }

        //sets type
        var type = 'menu-item'

        //loops through inventory and sets type for item
        for (let i = 0; i < inventoryCount; i++) {
          if (this.Inventory[i].name == this.SelectedRemoveItem) {
            if (this.Inventory[i].type == 'cutlery') {
              type = 'cutlery'
            }
          }
        }

        //calls Inventory Remove with name and type
        InventoryRemove(this.SelectedRemoveItem, type).then((response) => {
          this.returnData = response.data;
          alert("Item Removed: " + this.SelectedRemoveItem)
          window.location.reload()
          console.log(response.data);
        }).catch((error) => {
          alert("Error Removing Item: " + error)
          window.location.reload()
        });
      }
      else {
        alert("No Item Selected. Please Select an Item")
      }
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
