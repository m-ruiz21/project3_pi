<template>
  <!-- nav bar -->
  <div class="container py-3">
    <div class="row align-items-center">
      <div class="col-4">
        <a class="navbar-brand" href="#">
          <img src="../../assets/p&hlogo.png" alt="Pom and Honey Logo" width="200">
        </a>
      </div>
      <div class="col-4 text-center">
        <button type="button" class="btn-primary mx-2">Menu</button>
        <button type="button" class="btn-secondary mx-2">Order</button>
      </div>
      <div class="col-4"></div>
    </div>
  </div>

  <!-- menu items -->
  <div class="container">
		<div class="row">
      <div class="row justify-content-center">
        <div v-for="menuItem in menuItems" :key="menuItem.name" class="col-sm-12 col-md-4 menu-item text-center d-flex flex-column justify-content-center">
          <a href="#">
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
  export default {
    name: "Customer",
    data() {
      return {
        menuItems: [
          {
            name: 'Gyro',
            src: 'src/assets/gyro.png'
          },
          {
            name: 'Bowl',
            src: 'src/assets/bowl.png'
          },
          {
            name: 'Sides And Drink',  
            src: 'src/assets/sides.png'
          }
        ]
      };
    }, 
  };
</script>