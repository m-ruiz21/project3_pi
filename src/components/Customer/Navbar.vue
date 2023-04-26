<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="../../assets/p&hlogo.png" alt="Pom and Honey Logo" height="75">
      </a>
      <div class="justify-content-end">
        <ul class="navbar-nav">

          <li class="nav-item" style="margin-right: 5vw;">
            <button class="btn-secondary" style="color: rgb(46,56,116); width: fit-content;" onclick="location.href = '/about'">About Us</button>
          </li>
          <li v-if="!isAuthenticated" class="nav-item" style="margin-right: 10px;">
            <button class="btn profile" @click="login"><img class="rounded-circle" height="42"
                src="/src/assets/user-icon.png"></button>
          </li>
          <li v-else class="nav-item log-in dropdown">
            <img class="rounded-circle profile" style="margin-right: 20px; margin-top: 2px;" height="42" to="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false" :src="user.picture">
            <ul class="dropdown-menu justify-content-center text-center">
              <li>
                <button class="btn" @click="logout">Sign out</button>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="profile" href="#">
              <img src="../../assets/cart.svg" alt="Cart" height="30">
            </a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
h1 {
  text-align: center;
}

.btn-secondary {
    width: 40%;
    background-color: white;
    color: #242B64;
    border-radius: 20px;
    border: 2px solid #242B64;
    padding: 9px 22px;
    font-size: 18px;
    font-weight: bold;
}

.btn-secondary:hover{
    background-color: rgb(248, 241, 241);
}

.profile {
  margin-top: -6px;
  font-size: 25px;
}

.profile:hover {
  color: rgb(212, 0, 0);
}
</style>

<script>

export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    };
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
  }
};
</script>