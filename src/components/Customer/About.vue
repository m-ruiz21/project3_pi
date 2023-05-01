<template>
  <!-- nav bar -->
  <navbar></navbar>

  <!-- Add text here -->
  <div class="about-box position-relative">
  <img src="src/assets/aboutus.png" class="img-fluid">
    <!-- <div class = "image_text">
      <h1 class="text-white position-absolute top-50 start-25 text-white fw-bold me-10 margin-left: 50px" style="font-size: 7rem; margin-left: 50px;">About Us</h1>
    </div> -->
  </div>
  <div class="row justify-content-center">
    <div class="col-md-6 mt-5 d-flex align-items-center justify-content-center">
      <img src="src/assets/about2.png" class="img-fluid" style="height: 100%; width: 100%; object-fit: cover;">
    </div>
    <div class="col-md-6 d-flex align-items-center">
      <div class="about-text-box mt-3 px-5">
        <h1 style="font-weight: bold;"> OUR MISSION </h1>
        <h2 style="font-weight: semi-bold"> Fresh, healthy Mediterranean cuisine & exceptional service. </h2>
        <p class="text-start mt-3">
          We are Pom and Honey, a Mediterranean grill located in the heart of our beloved aggie campus. We are proud to be a
          part of the local A&M community serving fresh and healthy food inspired by the flavors of the Mediterranean.
          Our menu features a variety of dishes, including meatballs, falafel, and chipotle-style dishes.
          At Pom and Honey, we are committed to providing our customers with exceptional service and a warm and welcoming
          atmosphere.
          Whether you're dining in or taking out, we strive to make every visit a memorable one.
          Thank you for choosing Pom and Honey. We look forward to serving you soon!
        </p>
      </div>
    </div>
</div>
  <h1 class="text-center mt-5" style="font-weight: bold;">OUR LOCATION</h1>
  <div class="gmap">
    <iframe width="70%" height="450" style="border:0" loading="lazy" allowfullscreen
      :src="maps_request"></iframe>
  </div>



  <!-- footer -->
  <customer-footer></customer-footer>
</template> 
    
<style scoped>
@import '../../assets/customer.css';

p {
  font-size: 20px;
}

image-footer{
 margin-left: 10% !important;
}

@media (max-width: 50%) {
  .image_text {
    font-size: 2.5rem !important;
  }
}

.gmap {
  text-align: center;
}
</style>
  
<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import api from '/src/api.json'

export default {
  name: "Customer",
  data() {
    return {
      maps_request: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJn6dlKVmDRoYRcDLBU7gFpPc&key=" + api.maps_api
    };
  },
  components: {
    'navbar': Navbar,
    'customer-footer': Footer
  },
};
</script>