
<template>
    <footer class="text-lg-start bg-white text-muted">
        <!-- Copyright -->
        <div class="text-center" style="background-color: rgba(0, 0, 0, 0.025); padding: 30px 0;">
            © 2023 Copyright:
            <a class="text-reset fw-bold" href="/">Pom & Honey</a>
            <div class="d-flex translate flex-row-reverse">
                <div id="google_translate_element"></div>
            </div>
        </div>
        <!-- Copyright -->
    </footer>
</template>
  
<script>
export default {
    name: "Footer",
    mounted() {
        let translateScript = document.createElement('script')
        translateScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
        document.head.appendChild(translateScript)
    }
};
</script>

<style>

.translate{
    margin-top: -30px; 
    margin-right: 20px;
}

@media (max-width: 630px) {
    .translate{
    margin-top: 10px;
    margin-right: 33vw;
}
}

</style>