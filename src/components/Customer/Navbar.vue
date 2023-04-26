<template>
  
  <nav class="navbar navbar-expand-md navbar-light bg-white">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="../../assets/p&hlogo.png" alt="Pom and Honey Logo" height="75">
      </a>
      <div class="justify-content-end" >
        <ul class="navbar-nav">

          <li class="nav-item about">
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
  /* display: inline-block; */
  padding: 5px;
  padding-right: 80px;
  margin-top: 5px;
  text-decoration: none;
  color: black;
  font-size: 25px;
  font-weight: semi-bold;
  border: none;
  font-size: 25px;
}

.about-link:hover {
  color: black;
  text-decoration: underline;
}
</style>