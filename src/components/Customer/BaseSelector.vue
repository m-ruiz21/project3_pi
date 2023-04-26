<template>
  <div class="row align-items-center">
    <div class="col-md-4 order-md-1">
      <div class="d-flex justify-content-start">
        <h1> Base: </h1>
      </div>
    </div>
    <div class="col-md-6 order-md-2 align-items-start">
      <div class="d-flex justify-content-start">
        <radio-buttons
          first-choice="Brown Rice"
          second-choice="Rice Pilaf "
          :left-selected="leftSelected"
          @update:leftSelected="updateLeftSelected"
        ></radio-buttons>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButtons from "./RadioButtons.vue";

export default {
  components: {
    "radio-buttons": RadioButtons,
  },
  data() {
    return {
      leftSelected: true,
    };
  },
  methods: {
    updateLeftSelected(newValue) {
        this.leftSelected = newValue;
        this.$emit('update-base', !newValue);
    },
  },
};
</script>