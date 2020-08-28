<template>
  <div id="app" >
    <Nav/>
    <router-view/>
    <Footer/>
  </div>
</template>

<style scoped>
  @import "assets/css/style.css";
</style>

<script>
  import Nav from "./components/Nav";
  import Footer from "./components/Footer";
  export default {
    components: {Nav, Footer},
    created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise((resolve, reject) => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  }
  }
</script>
