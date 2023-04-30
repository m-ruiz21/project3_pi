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
            <router-link class="nav-link active" aria-current="page" to="/manager">Place Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/server/orders">View Orders</router-link>
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
    <div class="container">
      <div class="row">
        <div class="col order-container mt-4 rounded align-items-center"
          style="height: auto; text-align: center; border-radius: none; background-color: white;">
          <h2 class="mt-5">Main Dish</h2>
          <div class="row">
            <div class="mt-2">
              <!-- {{ checkedItems }} -->
              <h5>Base</h5>
              <div v-for="base in menuItems.base" class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" :value='base.name' v-model="checkedItems">
                <label class="form-check-label">{{ base.name }}</label>
              </div>
            </div>
            <div class="mt-3">
              <!-- {{ checkedProteins }} -->
              <h5>Protein</h5>
              <div v-for="protein in menuItems.protein" class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" :value='protein.name' v-model="checkedItems">
                <label class="form-check-label">{{ protein.name }}</label>
              </div>
            </div>
            <div class="mt-3">
              <!-- {{ checkedToppings }} -->
              <h5>Toppings</h5>
              <div v-for="topping in menuItems.topping" class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" :value='topping.name' v-model="checkedItems">
                <label class="form-check-label">{{ topping.name }}</label>
              </div>
            </div>
            <div class="mt-3">
              <!-- {{ checkedDressings }} -->
              <h5>Dressings</h5>
              <div v-for="dressing in menuItems.dressing" class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" :value='dressing.name' v-model="checkedItems">
                <label class="form-check-label">{{ dressing.name }}</label>
              </div>
            </div>
            <div class="mt-3">
              <!-- {{ checkedExtras }} -->
              <h5>Extras</h5>
              <div v-for="extra in menuItems.extra" class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" :value='extra.name' v-model="checkedItems">
                <label class="form-check-label">{{ extra.name }}</label>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <button v-for="side in menuItems['menu item']" type="button" @click="addSide(side.name)"
                class="btn mx-2 btn-primary">
                {{ side.name.charAt(0).toUpperCase() + side.name.slice(1) }}
              </button>
              <button type="button" @click="addToCart" class="btn mx-2 btn-success">
                Add to Order
              </button>
            </div>
          </div>
        </div>
        <div class="col order-container mx-3 mt-4 bg-white rounded justify-content-center text-center">
          <h2 class="mt-5" style="border-bottom: solid 1px lightgray; padding-bottom: 25px;">Current Order</h2>
          <div class="row order">
            <div class="col">
              <div v-if="items.length" class="cart">
                <OrderedMenuItem v-for="(item, index) in items" :key="index" :item="item" @remove="deleteItem(index)" />
              </div>
              <div v-else class="cart">
                <h3 class="text-secondary" style="margin-top: 13vh;"> No Items Added</h3>
              </div>
              <h2 v-if="items.length" class="total">Total: ${{ total.toFixed(2) }}</h2>
              <button v-if="items.length" type="button" @click="checkout" class="btn mt-1 mx-2 btn-success">
                Submit Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <manager-footer></manager-footer>
</template>

<script>
import Footer from "/src/components/Manager/Footer.vue"
import { getAllMenuItems, getMenuItemByName } from '../../services/MenuItemService.js'
import { submitOrderAsync } from "../../services/OrderService";
import OrderedMenuItem from '/src/components/Customer/OrderedMenuItem.vue'

export default {
  name: "Server",
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      currentRole: 'server',
      menuItems: {},
      checkedItems: [],
      items: [],
      total: 0.00,
    };
  },
  components: {
    'manager-footer': Footer,
    'OrderedMenuItem': OrderedMenuItem,
  },
  methods: {
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
    updateCart() {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.items = JSON.parse(cart);
      }

      this.updateTotal();
    },
    updateTotal() {
      this.total = this.items.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
    },
    deleteItem(index) {
      this.items.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.updateTotal();

      this.showSuccessDeleteMessage = true;
      setTimeout(() => {
        this.showSuccessDeleteMessage = false;
      }, 3000);
    },
    checkout() {
      const menuItems = this.items.reduce((acc, item) => {
        return acc.concat(item.menuItems);
      }, []);

      submitOrderAsync(menuItems)
        .then(() => {
          this.showSuccessSubmit = true;
          setTimeout(() => {
            console.log(menuItems);
            this.showSuccessSubmit = false;
            this.items = [];
            localStorage.setItem('cart', JSON.stringify(this.items));
            this.updateTotal();
          }, 0);
        });
    },
    async addToCart() {
      if (this.checkedItems.length) {
        var orderType = 'Dish';
        var dishPrice = 0.00;

        for (let i = 0; i < this.checkedItems.length; i++) {
          var currentItem = this.checkedItems.at(i)
          await getMenuItemByName(currentItem).then((response) => {
            dishPrice += response.data.price
          })

          if (currentItem == 'pita') {
            orderType = 'Pita'
          }
          else if ((currentItem == 'rice pilaf') || (currentItem == 'brown rice')) {
            orderType = 'Bowl'
          }
        }

        var cartItem = {
          name: orderType,
          price: dishPrice,
          menuItems: this.checkedItems,
        }

        // add cartItem to cart in local storage
        const cartData = localStorage.getItem("cart");
        if (cartData) {
          this.cartItems = JSON.parse(cartData);
        } else {
          this.cartItems = [];
        }

        this.cartItems.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(this.cartItems));

        window.dispatchEvent(new Event("storage"));
        this.checkedItems = []
      }
      else {
        alert('No Items Selected')
      }
    },
    async addSide(name) {
      var sideName = name;
      var price = 0.00;

      await getMenuItemByName(name).then((response) => {
        price = response.data.price
      })

      sideName =
        sideName.charAt(0).toUpperCase()
        + sideName.slice(1)

      var sideList = []
      sideList.push(name)

      var cartItem = {
        name: sideName,
        price: price,
        menuItems: sideList,
      }

      // add cartItem to cart in local storage
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        this.cartItems = JSON.parse(cartData);
      } else {
        this.cartItems = [];
      }

      this.cartItems.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(this.cartItems));

      window.dispatchEvent(new Event("storage"));
    }
  },
  created() {
    this.updateCart();
    window.addEventListener('storage', this.updateCart, false);
  },
  destroyed() {
    window.removeEventListener('storage', this.updateCart, false);
  },
  mounted() {
    getAllMenuItems().then((response) => {
      this.menuItems = response.data
      console.log(response.data)
    })
  },
  beforeMount() {
    if (!this.isServer()) {
      window.location.href = '/';
    }
  },
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

.order-container {
  min-height: 81vh;
}

.cart {
  min-height: 46vh;
}

.total {
  position: relative;
}

.order {
  overflow: auto;
  max-height: 62vh;
}

.background {
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
