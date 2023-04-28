<template>
    <!-- nav bar -->
    <navbar/>

    <!-- banner -->
    <div class="banner"> 
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-12 order-md-2">
                    <div class="banner-content">
                        <h1> {{ name.toUpperCase() }} </h1>
                        <p> {{ media.description }}</p>
                    </div>
                </div>
                <div class="d-none d-lg-block col-lg-6 order-md-1 align-items-end">
                    <div class="d-flex justify-content-end">
                        <div class="banner-image">
                            <img :src="media.img" :alt="media.alt" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Order -->
    <div class="container" style="margin-top: 2%">
        
        <!-- Protein  -->
        <protein-selector @update-extraMeat="updateExtraMeat"/>

        <!-- Toppings -->
        <h1 style="margin-top: 2%;">Toppings:</h1>
        <checkbox-grid style="margin-top: 2%" :items="menuItems.topping" @update-checked-labels="updateToppings"/>
        
        <!-- Dressings -->
        <h1 style="margin-top: 2%;">Dressings:</h1>
        <checkbox-grid style="margin-top: 2%" :items="menuItems.dressing" @update-checked-labels="updateDressings"/>

        <h3 class="price">Item Total: {{ price.toFixed(2) }}</h3>
        
        <div class="submit-btn">
            <button type="submit" class="btn btn-outline-light mt-4" v-on:click="addToCart()">Add To Cart</button>
        </div>
        <div v-if="showSuccess" class="alert alert-success" role="alert">
            Item added to cart!
        </div>
    </div>

    <!-- Footer -->
    <customer-footer/>
</template>

<script>
import { getAllMenuItems } from '../../services/MenuItemService.js'
import { getMenuItemByName } from '../../services/MenuItemService.js'
import Navbar from './Navbar.vue'
import RadioButtons from './RadioButtons.vue'
import ProteinSelector from './ProteinSelector.vue'
import CheckBox from './CheckBox.vue'
import CheckboxGrid from './CheckboxGrid.vue'  
import Footer from './Footer.vue'
import BaseSelector from './BaseSelector.vue'

export default {
    components: {
        'navbar': Navbar,
        'radio-buttons': RadioButtons,
        'protein-selector': ProteinSelector,
        'checkbox': CheckBox,
        'checkbox-grid': CheckboxGrid,
        'customer-footer': Footer,
        'base-selector': BaseSelector,
    },
    data() {
        return {
            protein_price: 0,
            extra_protein_price: 0,
            extra_dressing_price: 0,
            menuItems: {},
            extraMeat: false,
            price: 0,
            orderedMenuItems: {
                protein: `${this.$route.params.name}`,
                topping: [],
                dressing: [],
            },
            name: ``,
            media: {
                src: "",
                alt: "",
                description: "",
            },
            showSuccess: false
        }
    },
    methods: {
        updateExtraMeat(newValue) {
            this.extraMeat = newValue;
            this.updatePrice();
        },
        updateBase(newValue) {
            this.pilafOrdered = newValue;
        },
        updateToppings(newValue) {
            this.orderedMenuItems.topping = newValue;
        },
        updateDressings(newValue) {
            this.orderedMenuItems.dressing = newValue;
            this.updatePrice();
        },
        updatePrice() {
            this.price = this.protein_price;
            if (this.extraMeat) {
                this.price += this.extra_protein_price;
            }

            if (this.orderedMenuItems.topping.length > 0)
            {
                this.price += this.extra_dressing_price * (this.orderedMenuItems.dressing.length - 1);
                this.price = this.price;
            }
        },
        addToCart() {
            var cartItemMenuItems = ["pita"];
            cartItemMenuItems.push(this.orderedMenuItems.protein);
            
            if (this.extraMeat) {
                cartItemMenuItems.push("extra meat");
            } 
            
            for (var i = 0; i < this.orderedMenuItems.topping.length; i++) {
                cartItemMenuItems.push(this.orderedMenuItems.topping[i]);
            }

            for (var i = 0; i < this.orderedMenuItems.dressing.length; i++) {
                cartItemMenuItems.push(this.orderedMenuItems.dressing[i]);
            }

            console.log(cartItemMenuItems); 

            var cartItem = {
                name: `${this.name}`,
                price: this.price,
                menuItems: cartItemMenuItems,
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

            this.showSuccess = true;

            setTimeout(() => {
                this.showSuccess = false;
            }, 3000);

            window.dispatchEvent(new Event("storage"));
        },
        getMedia() {
            const name = this.$route.params.name;
            if (name === 'falafel') {
                this.name = 'Falafel Pita'
                this.media = {
                    img: '/src/assets/food/falafel pita.svg',
                    alt: 'falafel bowl',
                    description: "Spicy Meatball in a warm pita with your choice of toppings and dressing."
                };
            } else if (name === 'meatball') {
                this.name = 'Spicy Meatball Pita';
                this.media = {
                    img: '/src/assets/food/meatball pita.svg',
                    alt: 'meatball bowl',
                    description: "Fresh Falafel in a warm pita with your choice of toppings and dressing."
                };
            }
        }
    },
    mounted() {
        this.getMedia(),
        getAllMenuItems().then((response) => {
            this.menuItems = response.data
        }),
        getMenuItemByName(this.$route.params.name).then((response) => {
            this.protein_price = response.data.price
            this.price = response.data.price;
        }),
        getMenuItemByName(`extra meat`).then((response) => {
            this.extra_protein_price = response.data.price
        }),
        getMenuItemByName(`extra dressing`).then((response) => {
            this.extra_dressing_price = response.data.price
        })
    }
}
</script>

<style scoped>
.banner{
    background-color: #242B64;
    color: #ffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.banner-content h1 {
    font-size: 42px;
    font-weight: bold;
    margin-bottom: 10px;
}

.banner-content p {
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 20px;
}

.banner-image {
    max-width: 200%;
    margin-right: 10%;
}

.banner-image img {
    width: 350px;
    height: auto;
}

.price {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 2%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    background-color: #242B64;
    font-size: 24px;
    font-weight: 500;
    padding: 10px;
}

.submit-btn {
    margin-bottom: 2%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>