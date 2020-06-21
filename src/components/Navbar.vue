<template>
  <div class="hello">
   <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light ">
     <div class="container">
        <router-link class="navbar-brand" to="/">D'n hook Webshop</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">


            <li class="nav-item">
              <router-link id="klikken123" to="/productOverview" class="nav-link" >Onze producten</router-link>
            </li>



          </ul>
          <form class="form-inline my-2 my-lg-0">
              <a id="registerButton" class="btn btn-outline-success my-2 my-sm-0 mx-2" data-toggle="modal" data-target="#login">Registreren/ Inloggen </a>
          </form>
        </div>
             <a class="btn btn-outline-info my-2 my-sm-0 mx-2" data-toggle="modal" data-target="#Cart">Winkelmand
                 <i class="fas fa-cart-plus"></i>
             </a>
     </div>

</nav>

  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  components:{}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @media (min-width: 992px) {

    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background-color: #fff !important;
    }

   }

</style>
