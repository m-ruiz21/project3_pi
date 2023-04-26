<template>
    <!-- nav bar -->
    <navbar/>

    <!-- banner -->
    <div class="banner"> 
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6 order-md-2 align-items-center">
                    <div class="banner-content">
                        <h1> {{ $route.params.name.toUpperCase() }} BOWL </h1>
                    </div>
                </div>
                <div class="col-md-6 order-md-1 align-items-end">
                    <div class="d-flex justify-content-end">
                        <div class="banner-image">
                            <img src="../../assets/food/falafel bowl.svg" alt="alt" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Order -->
    <div class="container" style="margin-top: 2%">
        
        <!-- Protein  -->
        <protein-selector :extraMeat="true" @update-extraMeat="updateExtraMeat"/>

        <!-- Toppings -->
        <h1 style="margin-top: 2%;">Toppings:</h1>
        <checkbox-grid style="margin-top: 2%" :items="menuItems.topping" @update-checked-labels="updateToppings"/>
        
        <!-- Dressings -->
        <h1 style="margin-top: 2%;">Dressings:</h1>
        <checkbox-grid style="margin-top: 2%" :items="menuItems.dressing" @update-checked-labels="updateDressings"/>

        <h3 class="price">Item Total: {{ price.toFixed(2) }}</h3>
        
        <div class="submit-btn">
            <button type="submit" class="btn btn-outline-light mt-4">Add To Cart</button>
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

export default {
    components: {
        'navbar': Navbar,
        'radio-buttons': RadioButtons,
        'protein-selector': ProteinSelector,
        'checkbox': CheckBox,
        'checkbox-grid': CheckboxGrid,
        'customer-footer': Footer,
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
            name: `${this.$route.params.name} Bowl`, 
        }
    },
    methods: {
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        updateExtraMeat(newValue) {
            this.extraMeat = newValue;
            this.updatePrice();
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
            var cartItem = [];
            if (this.extraMeat) {
                cartItem.push("extra meat");
            }
            
            for (var i = 0; i < this.orderedMenuItems.topping.length; i++) {
                cartItem.push(this.orderedMenuItems.topping[i]);
            }

            for (var i = 0; i < this.orderedMenuItems.dressing.length; i++) {
                cartItem.push(this.orderedMenuItems.dressing[i]);
            }

            console.log(cartItem);
        }
    },
    mounted() {
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