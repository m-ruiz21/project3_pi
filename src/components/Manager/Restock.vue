<template>
  <div :class="{ 'show modal fade': showModal }" :style="{ display: showModal ? 'block' : 'none' }" tabindex="-1" role="dialog" data-backdrop="false" data-keyboard="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Restock {{ item.name }}</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" @click="hideModal"></button>
        </div>
        <div class="modal-body">
          <p>How much inventory do you want to add?</p>
          <div class="input-group">
            <input type="number" class="form-control" v-model="restockQuantity" min="1" step="1" required>
            <span class="input-group-text">{{ item.unit }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="restockItem">Restock</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    },
    onHide: {
      type: Function,
      required: true
    },
    onRestock: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      restockQuantity: 0
    };
  },
  methods: {
    hideModal() {
      this.onHide();
    },
    restockItem() {
      this.onRestock(this.item, this.restockQuantity);
    }
  }
};
</script>

