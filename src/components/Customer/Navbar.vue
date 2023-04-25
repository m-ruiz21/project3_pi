<template>
  
  <nav class="navbar navbar-expand-md navbar-light bg-white">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="../../assets/p&hlogo.png" alt="Pom and Honey Logo" height="75">
      </a>
      <div class="justify-content-end" >
        <ul class="navbar-nav">

          <li class="about">
            <a class = "about-link" href="/about" style="max-width: 25%;">About</a>
    
          </li>

          <li class="nav-item">
          </li>
            <a class="nav-link" href="#">
              <img src="../../assets/cart.svg" alt="Cart" height="30">
            </a>
        </ul>
      </div>
    </div>
  </nav>

</template>

<style scoped>
  @import '../../assets/customer.css';
  
  h1 {
    text-align: center;
  }
</style>

<style scoped>
.about-link {
  display: inline-block;
  padding: 10px;
  background-color: #242B64;
  color: #fff;
  text-decoration: none;
  border: none;
  font-size: 25px;
  font-weight: semi-bold;
  padding-right: 100%;
  border-radius: 10px;
}

.about-link:hover {
  background-color: #fff;
  color: #000;
  text-decoration: none;
  border: 1px solid #000;
}
</style>