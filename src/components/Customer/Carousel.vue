<template>
<div class="d-none d-lg-block"> 
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(image, index) in images" :class="{ active: index === 0 }" :key="index">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-6 order-md-2 align-items-center">
                            <div class="carousel-content">
                                <h3>{{image.subtitle}}</h3>
                                <h1>{{image.title}}</h1>
                                <p>{{image.description}}</p>
                                <a>
                                    <button class="btn btn-outline-light" style="max-width: 25%;">Order Now</button>     
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 order-md-1 align-items-end">
                            <div class="d-flex justify-content-end">
                                <div class="carousel-image">
                                    <img :src="image.src" :alt="image.alt" class="img-fluid">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

export default {
  data() {
    return {
      images: [
        {   
            src: 'src/assets/food/SpicyMeatball.svg', 
            alt: 'Spicy Meatball Bowl Image', 
            subtitle: 'Bold flavor, every bite.', 
            title: 'SPICY MEATBALL BOWL', 
            description: 'Spice up your meal game with our Mediterranean-inspired Spicy Meatball Bowl.' 
        }, 
        {   
            src: 'src/assets/food/falafel bowl.svg', 
            alt: 'Falafel Bowl Image', 
            subtitle: 'Healthy Has Never Tasted So Good', 
            title: 'FALAFEL BOWL', 
            description: 'Take your taste buds on a Mediterranean adventure with our Falafel Bowl.' 
        },
        {
            src: 'src/assets/food/falafel pita.svg',
            alt: 'Falafel Pita Image',
            subtitle: 'Bold Flavors, On the Go',
            title: 'FALAFEL PITA',
            description: 'The perfect option for those who want to enjoy a taste of the Mediterranean on the go.'
        }
      ]
    };
  }
}
</script>

<style>
.carousel-item {
  background-color: #242B64;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.carousel-image {
  max-width: 200%;
  margin-right: 10%;
}

.carousel-image img {
  width: 350px;
  height: auto;
}

.carousel-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.carousel-content h3 {
  font-size: 25px;
  font-weight: semi-bold;
  margin-bottom: 5px;
}

.carousel-content h1 {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 10px;
}

.carousel-content p {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 20px;
}
</style>