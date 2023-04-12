<template>
    <div>
        <menu-nav></menu-nav>
    </div>
        <h1>Sides</h1> 
        <ul>
            <li v-for="item in menuItems.side" :key="item.name">{{ item.name }}</li>
        </ul>
        <h1>Drink</h1> 
        <ul>
            <li v-for="item in menuItems.drink" :key="item.name">{{ item.name }}</li>
        </ul>
        <button type="submit" class="btn mt-4 btn-primary">Submit Item</button>

</template>

<script>
import MenuItemNav from './MenuItemNav.vue'
import { getAllMenuItems } from '../../services/MenuItemService.js'

export default {
    components: {
        'menu-nav': MenuItemNav 
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

