<template>
  <div
    class="navbar py-3 navbar-dark navbar-expand-lg"
    style="background-color: rgb(46, 56, 116)"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/manager">
        <img src="/src/assets/p&hlogo.png" alt="Pom & Honey Logo" width="80" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse text-white"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="/manager"
              >Dashboard</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/manager/inventory"
              >Manage Inventory</a
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Reports
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Sales Report</a></li>
              <li><a class="dropdown-item" href="#">Excess Report</a></li>
              <li><a class="dropdown-item" href="#">X and Z Report</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div
        class="col py-4 rounded-pill container d-flex align-items-center justify-content-center bg-white"
        style="margin-top: 50px"
      >
        <img
          src="src/assets/user-icon.png"
          alt="User's Profile Picture"
          width="50"
        />
        <h1 style="margin-left: 15px">Howdy, Manager!</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Manager",
};
</script>
