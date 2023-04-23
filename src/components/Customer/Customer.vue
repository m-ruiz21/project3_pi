<template>
  <!-- nav bar -->
  <navbar></navbar>

  <!-- carousel -->
  <carousel></carousel>

  <!-- menu item nav bar -->
  <menu-nav></menu-nav>

  <!-- menu items -->
  <menu-items></menu-items>

  <!-- footer -->
  <customer-footer>
  </customer-footer>
</template> 
  
<style scoped>
  @import '../../assets/customer.css';
  
  h1 {
    text-align: center;
  }
</style>

<script>
import Navbar from './Navbar.vue'
import Carousel from './Carousel.vue'
import MenuItemNavBar from './MenuItemNavBar.vue'
import MenuItems from '../customer/MenuItems.vue'
import Footer from '../customer/Footer.vue'

  export default {
    name: "Customer",
    data() {
      return {
        menuItems: [
          {
            name: 'Gyro',
            src: 'src/assets/gyro.png',
            link: '/gyro'
          },
          {
            name: 'Bowl',
            src: 'src/assets/bowl.png',
            link: '/bowl'
          },
          {
            name: 'Sides And Drink',  
            src: 'src/assets/sides.png',
            link: '/sidesanddrink'
          }
        ]
      };
    },
    components: {
      'navbar': Navbar,
      'carousel': Carousel,
      'menu-nav': MenuItemNavBar,
      'menu-items': MenuItems,
      'customer-footer': Footer
    },
  };
</script>