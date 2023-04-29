<template>
    <navbar/>

    <!-- banner -->
    <div class="flex-grow-1 d-flex align-items-center overflow-auto">
      <div class="container-fluid">
        <div class="row h-100">
          <div class="col-md-6 d-flex align-items-center justify-content-center">
            <img :src="media.img" class="img-fluid w-auto h-100" style="background-color: #F1F1EB;" :alt="media.alt">
          </div>
          <div class="col-md-6 d-flex align-items-start justify-content-start banner-content ml-5">
            <div>
                <h1>{{ displayName.toUpperCase() }}</h1>
                <h3 class="mb-5">${{ price }}</h3>
                <p>{{ media.description }}</p>
                <button class="btn-secondary" @click="addToCart">Add To Cart</button>
                <div v-if="showSuccess" class="alert alert-success mt-5" role="alert">
                    Item added to cart!
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <custom-footer/>

</template>

<script>
import Footer from './Footer.vue'
import Navbar from './Navbar.vue'
import { getMenuItemByName } from '../../services/MenuItemService'

export default {
    components: {
        'navbar': Navbar,
        'custom-footer': Footer
    },
    data() {
        return {
            displayName: '',
            queryName: '',
            media: {
                img: '', 
                alt: '',
                description: ''
            },
            price: 0,
            showSuccess: false
        }
    },
    methods: {
        getMedia() {
            const name = this.$route.params.name;
            if (name === 'drink') {
                this.displayName = 'Fountain Drink';
                this.queryName = 'drink';
                this.media = {
                    img: '/src/assets/food/drink.svg',
                    alt: 'drink',
                    description: 'Refreshing fountain drinks of your choice. From classic cola to fruity options, we offer a variety of refreshing beverages to suit any taste. Sip on something cold and delicious with every meal.',
                };
            } else if (name === 'pita') {
                this.displayName = 'Hummus and Pita';
                this.queryName = 'hummus and pita';
                this.media = {
                    img: '/src/assets/food/pitas.svg',
                    alt: 'Salad',
                    description: 'Crafted in small batches on-site, our pita chips are designed to accompany generous portions of hummus. With a satisfyingly crisp exterior and a soft, fluffy interior, they are the perfect vehicle for scooping up every last bit of our delectable hummus.'
                };
            }
            else if (name === 'salad') {
                this.displayName = 'Side Salad';
                this.queryName = 'salad';
                this.media = {
                    img: '/src/assets/food/Salad2.svg',
                    alt: 'meatball bowl',
                    description: 'Fresh greens, juicy tomatoes, and crisp cucumbers combine to make our side salad a refreshing and delicious addition to any meal. Topped with a light, tangy vinaigrette, it\'s the perfect complement to your dish.'
                };
            }
        },
        addToCart() {
            var cartItemMenuItems = [];
            cartItemMenuItems.push(this.queryName);

            var cartItem = {
                name: `${this.displayName}`,
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
    },
    created() {
        this.getMedia();
    },
    mounted() {
        getMenuItemByName(`${this.queryName}`).then((response) => {
            this.price = response.data.price
        })
    }
}
</script>

<style scoped>
.banner-content{
    margin-top: 10%;
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
    margin-right: 10%;
}

.banner-image {
    margin-right: 10%;
    height: 100%;
    background-color: #F1F1EB;
}

.banner-image img {
    width: 100%;
    height: auto;
}

footer {
    margin-top: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #242B64;
}

.circle-navy {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #242B64;
    border: 2px solid white;
}

.circle-text {
    margin: 0;
    font-size: 32px;
    text-align: center;
    color: white;
}

.btn-secondary {
    width: 250px;
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
</style>