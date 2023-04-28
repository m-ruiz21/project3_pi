<template>
  <h1>Server Side</h1>
</template>

<script>
export default {
  name: "Server",
  data() {
    return { name: "Empty" };
  },
  methods: {
    isServer() {
      const role = window.localStorage.getItem('role')
      if ((role == 'server') || (role == 'manager')) {
        return true;
      }
      return false;
    },
    isManager() {
      const role = window.localStorage.getItem('role')
      if (role == 'manager') {
        return true;
      }
      return false;
    }
  },
  beforeMount() {
    if (!this.isServer()) {
      window.location.href = '/';
    }
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
