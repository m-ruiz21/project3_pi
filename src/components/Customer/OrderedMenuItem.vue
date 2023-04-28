<template>
  <div class="cart-item">
    <div class="cart-item-header">
      <h1 class="cart-item-title">{{ item.name }} - ${{ item.price.toFixed(2) }}</h1>
    </div>
    <div class="cart-item-body">
      <div class="cart-item-description">
        <p>{{ menuItems }}</p>
      </div>
    </div>
    <div class="item-actions">
      <button class="delete-btn" @click="removeItem">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderedMenuItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    menuItems() {
      return this.item.menuItems.join(', ');
    },
  },
  methods: {
    removeItem() {
      this.$emit('remove', this.item);
    },
  },
};
</script>

<style scoped>
.cart-item {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.cart-item-title {
  font-size: 20px;
  font-weight: bold;
}

.cart-item-description {
  margin-top: 15px;
}

.cart-item-description p {
  margin: 0;
}

.cart-item-description strong {
  font-weight: bold;
}

.cart-item-description ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.cart-item-description li {
  margin-bottom: 5px;
}

.delete-btn {
  background-color: white; 
  color: black;
  border: none;
  font-size: 1rem;
  margin-left: 0px;
  cursor: pointer;
  padding: 0;
}

.item-actions {
  margin-top: 10px;
}
</style>

