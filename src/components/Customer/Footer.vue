<template>
  <footer class="text-white py-md-5 py-2">
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-12">
                <div class="d-flex justify-content-md-start justify-content-center">
                    <div class="circle-navy">
                        <h1 class="circle-text">P&H</h1>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-12 text-md-end text-center mt-md-0 mt-2">
                <p>&copy; 2023 Team Pi</p>
            </div>
        </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>

footer {
    margin-top: 2%;
    background-color: #242B64;
}

.circle-navy {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #242B64;
    border: 2px solid white;
}

.circle-text {
    margin: 0;
    font-size: 32px;
    text-align: center;
    color: white;
}
</style>
