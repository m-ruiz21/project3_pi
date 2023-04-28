<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="../../assets/p&hlogo.png" alt="Pom and Honey Logo" height="75">
      </a>
      <div class="justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item" style="margin-right: 10px;">
            <button class="btn-secondary about" style="color: rgb(46,56,116); width: fit-content;"
              onclick="location.href = '/about'">About Us</button>
          </li>
          <li v-if="!isAuthenticated" class="nav-item" style="margin-right: 10px;">
            <button class="btn profile" @click="login"><img class="rounded-circle" height="42"
                src="/src/assets/user-icon-2.png"></button>
          </li>
          <li v-else class="nav-item dropdown">
            <img class="rounded-circle profile-signin" style="margin-right: 20px; margin-top: 2px;" height="42" to="#"
              role="button" data-bs-toggle="dropdown" aria-expanded="false" :src="user.picture">
            <ul class="dropdown-menu justify-content-center text-center">
              <li>
                <button class="btn" @click="logout">Sign out</button>
              </li>
            </ul>
          </li>
          <li class="nav-item cart-li">
            <a class="cart position-relative" href="#" @click="showSidebar = true">
              <img src="../../assets/cart.svg" alt="Cart" height="30">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <cart :class="{ open: showSidebar }" @close="showSidebar = false" /> 
  </nav>
</template>

<script>
import Cart from './Cart.vue';
export default {
  components: {
    'cart': Cart 
  },
  data() {
    return {
      showSidebar: false,
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

<style scoped>
.navbar {
  border-bottom: 2px solid #242B64;
}

h1 {
  text-align: center;
}

.btn-secondary {
  width: 40%;
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

.profile {
  margin-top: -6px;
  font-size: 25px;
}

.profile-signin {
  margin-top: -6px;
  font-size: 25px;
}

.cart {
  margin-top: -6px;
  font-size: 25px;
}

.profile:hover {
  filter: invert(80%);
}

.profile-signin:hover {
  filter: brightness(70%)
}

.cart:hover {
  filter: invert(50%);
}

@media (max-width: 770px) {
  .about {
    margin-right: 120px;
  }

  .profile {
    margin-left: 110px;
    margin-top: -73px;
  }

  .profile-signin {
    margin-left: 124px;
    margin-top: -70px !important;
  }

  .container {
    width: 100vw;
  }

  .cart {
    margin-left: 180px !important;
  }

  .cart-li {
    margin-top: -66px !important;
  }

}
</style>