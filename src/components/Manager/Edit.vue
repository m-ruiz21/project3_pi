<template>
  <div :class="{ 'show modal fade': showModal }" :style="{ display: showModal ? 'block' : 'none' }" tabindex="-1" role="dialog" data-backdrop="false" data-keyboard="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit {{ menuItem.name }}</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" @click="hideModal"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="item-name">Name</label>
            <input type="text" class="form-control" id="item-name" v-model="menuItem.name" required>
          </div>
          <div class="form-group">
            <label for="item-name">Category</label>
            <input type="text" class="form-control" id="item-name" v-model="menuItem.category" required>
          </div>
          <div class="form-group">
            <label for="item-price">Price</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                </div>
                <input type="number" class="form-control" id="item-price" v-model="menuItem.price" min="0" step="0.01" required>
            </div>
            </div>

          <div class="form-group">
            <label for="item-cutlery">Cutlery</label>
            <input type="text" class="form-control" id="item-cutlery" v-model="cutleryText" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="editItem">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMenuItemByName, updateMenuItem } from '../../services/MenuItemService';

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
    },
    data() {
        return {
            menuItem: { name: '', category: '', price: 0, quantity: 0, cutlery: []},
            cutleryText: ''
        };
    },
    watch: {
        showModal(value) {
            if (value) {
                this.fetchMenuItemData();
            }
        }
    },
    methods: {
        fetchMenuItemData() {
            getMenuItemByName(this.item.name)
                .then((response) => {
                    this.menuItem = response.data;
                    this.cutleryText = this.menuItem.cutlery.join(', ');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        hideModal() {
            this.onHide();
        },
        editItem() {
            const cutlery = this.cutleryText.split(',').map(item => item.trim()); 
            if (cutlery.length === 1 && cutlery[0] === '') {
                cutlery.pop();
            }
            console.log(cutlery);
    
            this.menuItem.cutlery = cutlery;
            console.log(this.menuItem);

            updateMenuItem(this.menuItem)
                .then(() => {
                    this.hideModal();     
                    alert("Item Updated!")
                    window.location.reload()
                })
                .catch((error) => {
                    alert(`Error While Updating: ${error.message}`)
                    window.location.reload()
                    console.log(error);
                });
        }
    }
};
</script>