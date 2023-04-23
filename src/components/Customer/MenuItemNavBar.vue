<template>
  <nav class="navbar navbar-expand-md bg-white navbar-white" ref="menuNav">
    <div class="container">
      <ul class="navbar-nav">
        <li v-for="link in links" :key="link.id" class="nav-item">
          <a :href="link.url" class="nav-link">{{ link.title }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const menuNav = this.$refs.menuNav;
      const navbar = document.querySelector('.navbar');
      const distance = menuNav.$el.getBoundingClientRect().top - navbar.offsetHeight;

      if (distance <= 0) {
        menuNav.$el.classList.add('fixed-top');
      } else {
        menuNav.$el.classList.remove('fixed-top');
      }
    },
  },
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

.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
}
</style>
