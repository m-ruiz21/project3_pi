<template>
  <div class="d-none d-lg-block"> 
    <nav class="navbar navbar-expand-md bg-white navbar-white" ref="menuNav">
      <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li v-for="link in links" :key="link.id" class="nav-item">
              <router-link :to="link.url" class="nav-link" @click.prevent="scrollTo(link.url)">{{ link.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { scrollTo } from 'vue-scrollto'

export default {
  data() {
    return {
      links: [
        { id: 1, title: "Bowls", url: "#bowls" },
        { id: 2, title: "Pitas", url: "#pitas" },
        { id: 3, title: "Sides and Drinks", url: "#sides-and-drinks" },
      ]
    }
  },
  methods: {
    scrollTo(elementId) {
      scrollTo(elementId, 500, { offset: -70 })
    }
  }
};
</script>

<style scoped>
.nav-link {
  margin-left: 0px;
  margin-right: 20px;
  color: black;
  font-size: 25px;
  font-weight: semi-bold;
}

.nav-link:hover {
  color: black;
  text-decoration: underline;
}
</style>
