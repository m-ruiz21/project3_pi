<template>
  <div class="row">
    <div class="col-md-6">
      <checkbox v-for="item in firstHalf" :key="item" :label="item.name" @checked-labels="onCheckedLabels"/>
    </div>
    <div class="col-md-6">
      <checkbox v-for="item in secondHalf" :key="item" :label="item.name" @checked-labels="onCheckedLabels" />
    </div>
  </div>
</template>

<script>
import CheckBox from './CheckBox.vue';

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      checkedLabels: [],
    }
  },
  computed: {
    firstHalf() {
      if (!this.items || !this.items.length) {
        return [];
      }
      return this.items.slice(0, Math.ceil(this.items.length / 2));
    },
    secondHalf() {
      if (!this.items || !this.items.length) {
        return [];
      }
      return this.items.slice(Math.ceil(this.items.length / 2));
    }
  },
  methods: {
    onCheckedLabels(label, isChecked) {
      if (isChecked) {
        this.checkedLabels.push(label);
      } else {
        const index = this.checkedLabels.indexOf(label);
        if (index !== -1) {
          this.checkedLabels.splice(index, 1);
        }
      }
      this.$emit('update-checked-labels', this.checkedLabels);
    },
  },
  components: {
    'checkbox': CheckBox
  }
}
</script>