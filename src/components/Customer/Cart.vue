<template>
  <div class="sidebar">
    <div class="navy-container">
        <button type="button" class="close-btn" @click="closeSidebar">
            &lt Return to Menu
        </button>
    </div>
    <div v-if="cartItems.length" class="container">
        <div class="cart-items">
            <div>
            <OrderedMenuItem
                v-for="(item, index) in cartItems"
                :key="index"
                :item="item"
                @remove="deleteItem"
            />
            </div>
        </div>
        <div v-if="showSuccessDeleteMessage" class="alert alert-success" role="alert">
            Item has been deleted successfully.
        </div>  
        <div v-if="showSuccessSubmit" class="alert alert-success" role="alert">
            Item has been submitted successfully.
        </div>   
        <div class="cart-footer">
            <div class="cart-total">
                <p>Cart Total</p>
                <p>${{ total.toFixed(2) }}</p>
            </div>
            <button class="btn-secondary" @click="checkout">Checkout</button>
        </div>
    </div>
    <div v-else class="row justify-content-center">
        <div class="col-md-11 text-center">
        <img
          src="../../assets/cart.svg"
          alt="Image description"
          class="img-fluid my-5"
          style="width: 25%; height: auto"
        />
        <h3>Your Cart Is Empty</h3>
            <p>
                As you add menu items, they'll appear here, you'll have a chance to
                review before placing your order.
            </p>
            <a href="/">
                <button class="btn-secondary mt-4"> Add Items </button>
            </a>
        </div>
    </div>
  </div>
</template>

<script>
import OrderedMenuItem from './OrderedMenuItem.vue';
import { submitOrderAsync } from '../../services/OrderService.js'

export default {
    name: 'Sidebar',
    components: {
        OrderedMenuItem,
    },
    data() {
        return {
            total: 0,
            cartItems: [],
            showSuccessDeleteMessage: false,
            showSuccessSubmit: false,
        };
    },
    methods: {
        closeSidebar() {
            this.$emit('close');
        },
        updateCart() {
            const cart = localStorage.getItem('cart');
            if (cart) {
                this.cartItems = JSON.parse(cart);
            }

            this.updateTotal();
        },
        updateTotal() {
            this.total = this.cartItems.reduce((acc, item) => {
                return acc + item.price;
            }, 0);
        },
        deleteItem(index) {
            this.cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
            this.updateTotal();
            
            this.showSuccessDeleteMessage = true;
            setTimeout(() => {
                this.showSuccessDeleteMessage = false;
            }, 3000);
        },
        checkout() {
            const menuItems = this.cartItems.reduce((acc, item) => {
                return acc.concat(item.menuItems);
            }, []);

            submitOrderAsync(menuItems)
                .then(() => {
                    this.showSuccessSubmit = true; 
                    setTimeout(() => {
                        this.showSuccessSubmit = false;
                        this.cartItems = [];
                        localStorage.setItem('cart', JSON.stringify(this.cartItems));
                        this.updateTotal();
                    }, 2000);
                })
        }
    },
    created() {
        this.updateCart();
        window.addEventListener('storage', this.updateCart, false);        
    },
    destroyed() {
        window.removeEventListener('storage', this.updateCart, false); 
    },
};
</script>

<style scoped>
.container {
    height: 100%; 
}
.btn-secondary {
    width: 40%;
    background-color: white;
    color: #242B64;
    border-radius: 20px;
    border: 2px solid #242B64;
    padding: 7px 15px;
    font-size: 18px;
    font-weight: bold;
    margin-top: 2px;
}

.btn-secondary:hover {
  background-color: rgb(218, 218, 218);
}

.sidebar {
  width: 25vw;
  height: 100%;
  position: fixed;
  top: 0;
  right: -25vw;
  z-index: 9999;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.sidebar.open {
  right: 0;
}

.navy-container {
    background-color: #ffff;
    border-bottom: 2px solid #242B64;
    padding-top: 30px;
    padding-bottom: 5px;
    padding-left: 5px;
}

.close-btn {
  font-weight: bold;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.cart-items {
    margin-top: 20px;
    padding: 20px;
}

.cart-items ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cart-items li {
    padding: 10px 0;
}

.cart-footer {
    padding: 20px;
    background-color: #ffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 2px solid #242B64;
}

.cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.cart-total p {
    font-weight: bold;
    font-size: larger;
}
</style>

