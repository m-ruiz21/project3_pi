<template>
  <!-- nav bar -->
  <customer-nav></customer-nav>

  <!-- menu items -->
  <div class="container">
		<div class="row">
      <div class="row justify-content-center">
        <div v-for="menuItem in menuItems" :key="menuItem.name" class="col-sm-12 col-md-4 menu-item text-center d-flex flex-column justify-content-center">
          <a :href="menuItem.link">
            <img class="menu-item-img" :src="menuItem.src" :alt="menuItem.name"> 
          </a>
          <h2 class="h1" style="color: #242B64; font-weight: bold;">{{ menuItem.name }}</h2>
        </div>
		  </div>
    </div>
	</div>
</template> 
  
<style scoped>
  @import '../../assets/customer.css';
  
  h1 {
    text-align: center;
  }
</style>

<script>
import CustomerNav from './CustomerNav.vue'
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
      'customer-nav': CustomerNav
    },
  };
</script>