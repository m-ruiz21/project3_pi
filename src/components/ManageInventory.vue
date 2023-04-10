<template>
  <nav
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
            <a class="nav-link" href="/manager">Dashboard</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="/manager/inventory"
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
  </nav>
  <div
    class="inventory container align-items-center justify-content-center rounded bg-white"
  >
    <div class="row">
      <div class="col">
        <h1 class="mb-3">Current Inventory</h1>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">7278bd76-b7a8-11ed-b486-00155d0752bf</td>
                <td>brown rice</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c294-b7a8-11ed-b486-00155d0752bf</td>
                <td>rice pilaf</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c370-b7a8-11ed-b486-00155d0752bf</td>
                <td>pita</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c370-b7a8-11ed-b486-00155d0752bf</td>
                <td>pita</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c370-b7a8-11ed-b486-00155d0752bf</td>
                <td>pita</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c370-b7a8-11ed-b486-00155d0752bf</td>
                <td>pita</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c370-b7a8-11ed-b486-00155d0752bf</td>
                <td>pita</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c370-b7a8-11ed-b486-00155d0752bf</td>
                <td>pita</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c370-b7a8-11ed-b486-00155d0752bf</td>
                <td>pita</td>
                <td>2000</td>
                <td>base</td>
              </tr>
              <tr>
                <td scope="row">7278c370-b7a8-11ed-b486-00155d0752bf</td>
                <td>pita</td>
                <td>2000</td>
                <td>base</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div
    class="container align-items-center mt-4 mb-3 justify-content-center rounded bg-white"
  >
    <div class="row">
      <div class="col">
        <h1 class="mb-4">Add Item</h1>
      </div>
    </div>
    <form>
      <div class="row">
        <div class="col">
          <select class="form-select" aria-label="Select Category">
            <option selected>Choose Category</option>
            <option value="1">base</option>
            <option value="2">side</option>
            <option value="3">extra</option>
          </select>
        </div>
        <div class="col">
          <div class="form-group">
            <input
              type="text"
              for="item-name-add"
              class="form-control"
              id="item-name-add"
              placeholder="Enter Item Name"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col mt-3">
          <div class="form-group">
            <input
              type="text"
              for="quantity-add"
              class="form-control"
              id="quantity-add"
              placeholder="Enter Item Quantity"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col mt-3">
          <div class="form-group">
            <input
              type="text"
              for="price-add"
              class="form-control"
              id="price-add"
              placeholder="Enter Item Price"
            />
          </div>
        </div>
      </div>
      <button type="submit" class="btn mt-4 btn-primary">Submit Item</button>
    </form>
  </div>
  <div
    class="container align-items-center mt-4 mb-3 justify-content-center rounded bg-white"
  >
    <div class="row">
      <div class="col">
        <h1 class="mb-4">Edit Item</h1>
      </div>
    </div>
    <form>
      <div class="row">
        <div class="col">
          <select class="form-select" aria-label="Select Item">
            <option selected>Select Item</option>
            <option value="1">rice pilaf</option>
            <option value="2">pita</option>
            <option value="3">brown rice</option>
          </select>
        </div>
        <div class="col">
          <select class="form-select" aria-label="Select Item">
            <option selected>Select Attribute</option>
            <option value="1">ID</option>
            <option value="2">Name</option>
            <option value="3">Category</option>
            <option value="4">Price</option>
          </select>
        </div>
        <div class="col">
          <div class="form-group">
            <input
              type="text"
              for="item-name-add"
              class="form-control"
              id="item-name-add"
              placeholder="Enter Item Name"
            />
          </div>
        </div>
      </div>
      <button type="submit" class="btn mt-4 btn-primary">Edit Item</button>
    </form>
  </div>
  <div
    class="container align-items-center mt-4 mb-3 justify-content-center rounded bg-white"
  >
    <div class="row">
      <div class="col">
        <h1 class="mb-4">Remove Item</h1>
      </div>
      <form>
        <div class="row">
          <div class="col">
            <select class="form-select" aria-label="Select Item">
              <option selected>Select Item</option>
              <option value="1">rice pilaf</option>
              <option value="2">pita</option>
              <option value="3">brown rice</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn mt-4 btn-primary">Remove Item</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  max-width: 90%;
  margin-top: 30px;
  padding: 70px;
}

.my-custom-scrollbar {
  position: relative;
  width: 80vw;
  height: 50vh;
  overflow: auto;
}
.table-wrapper-scroll-y {
  display: block;
}
</style>

<script>
export default {
  name: "Inventory",
};
</script>
