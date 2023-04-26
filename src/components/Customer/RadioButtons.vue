<template>
    <div>
        <button class="radio-btn" :class="{ 'btn-selected': leftSelected, 'btn-not-selected': !leftSelected }" @click="setLeftSelected(true)">{{ firstChoice }}</button>
        <button class="radio-btn" :class="{ 'btn-selected': !leftSelected, 'btn-not-selected': leftSelected }" @click="setLeftSelected(false)">{{ secondChoice }}</button>
    </div>
</template>

<script>
export default {
    props: {
        firstChoice: {
            type: String,
            required: true
        },
        secondChoice: {
            type: String,
            required: true
        },
        leftSelected: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        setLeftSelected(value) {
            this.$emit('update:leftSelected', value);
        }
    }
}
</script>

<style scoped>
    .radio-btn {
        border-radius: 10px;
        width: 210px;
        height: 70px;
        margin: 10px;
        font-weight: bold;
        font-size: large;
    }

    /* btn-selected: navy button with white text */
    .btn-selected {
        background-color: #242B64;
        color: white;
        border: 3px solid #242B64;
    }

    /* btn-not-selected: white button with navy text and navy border */
    .btn-not-selected {
        background-color: white;
        color: #242B64;
        border: 3px solid #242B64;
    }
</style>