<template>
  <div class="home">
    <Navbar></Navbar>
   <LandingComponent> </LandingComponent>
<ProductList></ProductList>
      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/product.svg" alt="" width="400">
          </div>
          <div class="col-md-6">
            <h3>Lees eens over onze locaties</h3>
            <p>
              D'n hook heeft na zoveel jaren inmiddels 2 locaties!, kom gerust langs
            </p>
            <button class="btn custom-btn btn-outline-primary mr-4" @click="$router.push('/map')">Onze locaties</button>
          </div>
        </div>
      </div>
      <login></login>
<Cart></Cart>

  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/LandingComponent.vue";
import ProductList from "@/sections/ProductList";
import Login from "@/components/Login.vue";
import LandingComponent from "@/components/LandingComponent";

export default {
  name: "home",
  components: {
    LandingComponent,
    Hero,ProductList,Login
  }
};
</script>

<style>

</style>

