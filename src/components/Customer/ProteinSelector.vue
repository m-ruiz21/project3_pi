<template>
  <div class="row align-items-center">
    <div class="col-md-4 order-md-1">
      <div class="d-flex justify-content-start">
        <h1> Protein </h1>
      </div>
    </div>
    <div class="col-md-6 order-md-2 align-items-md-start align-items-center">
      <div class="d-flex justify-content-md-start justify-content-center">
        <radio-buttons
          first-choice="Regular"
          second-choice="Extra"
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
        this.$emit('update-extraMeat', !newValue);
    },
  },
};
</script>