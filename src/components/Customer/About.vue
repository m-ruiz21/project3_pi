
<template>
    <!-- nav bar -->
    <navbar></navbar>

    <!-- Add text here -->
    <div class="col-md-12">
    <h1 class="text-left font-weight-bold">About Us</h1>
    <p class="text-left pl-5" style="padding-left: 5px !important;">
    Welcome to Pom and Honey, a Mediterranean grill located in the heart of the city. We are proud to be a part of the local A&M community serving fresh and healthy food inspired by the flavors of the Mediterranean.
    Our menu features a variety of dishes, including meatballs, falafel, and chipotle-style dishes.
    At Pom and Honey, we are committed to providing our customers with exceptional service and a warm and welcoming atmosphere. 
    Whether you're dining in or taking out, we strive to make every visit a memorable one.
    Thank you for choosing Pom and Honey. We look forward to serving you soon!
    </p>
    <h1 class="text-left font-weight-bold">Where we're located</h1>
        <div style="text-align: center;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.7696670492605!2d-96.34386092491668!3d30.612259391445857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864683592965a79f%3A0xf7a405b853c13270!2sPom%20%26%20Honey%20-%20MSC!5e0!3m2!1sen!2sus!4v1682390516523!5m2!1sen!2sus" 
        width="50%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ></iframe>
        </div>
    </div>

  
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
        'menu-nav': MenuItemNavBar,
        'menu-items': MenuItems,
        'customer-footer': Footer
      },
    };
  </script>

