<template>
  <nav class="navbar py-3 navbar-dark navbar-expand-lg" style="background-color: rgb(46, 56, 116)">
    <div class="container-fluid">
      <a class="navbar-brand" href="/manager">
        <img src="/src/assets/p&hlogo.png" alt="Pom & Honey Logo" width="80" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse text-white" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/manager">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/manager/inventory">Manage Inventory</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Reports
            </router-link>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/manager/sales">Sales Report</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/manager/excess">Excess Report</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/manager/xz">X and Z Report</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="background">
    <div class="container">
      <div class="row">
        <div class="col py-4 rounded-pill container d-flex align-items-center justify-content-center bg-white"
          style="margin-top: 50px">
          <img src="src/assets/user-icon.png" alt="User's Profile Picture" width="50" />
          <h1 style="margin-left: 15px">Howdy, {{ name }}!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  height: 95vh;
  background-color: lightgray;
}
</style>

<script>
export default {
  name: "Manager",
  data() {
    return { name: "Manager" };
  },
};
</script>
