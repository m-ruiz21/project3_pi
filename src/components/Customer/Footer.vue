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
                <div>
                    <div class="d-flex translate flex-row-reverse">
                        <div id="google_translate_element"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  beforeCreate() {
    // Check if Google Translate script has already been added
    const translateScript = document.querySelector(`script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]`)
    if (!translateScript) {
      // If the script has not been added, append it to the head of the document
      const newScript = document.createElement('script')
      newScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
      document.head.appendChild(newScript)
    }
  },
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
