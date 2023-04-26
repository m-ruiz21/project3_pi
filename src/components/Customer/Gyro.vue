<template>
        <h1>Protein</h1> 
        <ul>
            <li v-for="item in menuItems.protein" :key="item.name">{{ item.name }}</li>
        </ul>
        <h1>Topping</h1>
        <ul>
            <li v-for="item in menuItems.topping" :key="item.name">{{ item.name }}</li>
        </ul>  
        <h1>Dressing</h1>
        <ul>
            <li v-for="item in menuItems.dressing" :key="item.name">{{ item.name }}</li>
        </ul>
        <button type="submit" class="btn mt-4 btn-primary">Submit Item</button>
</template>

<script>
import { getAllMenuItems } from '../../services/MenuItemService.js'

export default {
    components: {
    },
    data() {
        return {
            menuItems: {}
        }
    },
    mounted() {
        getAllMenuItems().then((response) => {
            this.menuItems = response.data
            console.log(response.data)
        })
    }
}
</script>