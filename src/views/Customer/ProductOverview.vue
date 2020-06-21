<template>
  <div class="About">
  <div class="container">
    <navbar> </navbar>
    <div class="row">

      <div class="col-sm-2.8">

        <div class="card bg-light mb-3" style="margin-top: 72px">

          <div class="card-body">

            <h5 class="card-title">Openingstijden</h5>
            <p> Ma: Gesloten
            <p>
              Di: Gesloten
            </p>
            <p>
              Wo: 17:00 - 20:00

            </p>
            <p>
              Do: 17:00 - 20:00
            </p>
            <p>
              Vrij: 17:00 - 20:00
            </p>
            <p>
              Za: 17:00 - 20:00
            </p>
            <p>
              Zon: 17:00 - 20:00
            </p>
          </div>
        </div>
        <div class="card bg-light mb-3" style="margin-top: 10px">
          <div class="card-body">
            <h5 class="card-title">Contact gegevens</h5>
            <hr>
            <p> Adres: Wilhelminastraat 6
            <p>
              Postcode: 5951 BV
            </p>
            <p>
            Email: test123@hotmail.com

            </p>

          </div>
        </div>
      </div>

      <div class="col-sm-9">

        <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
              <img class="d-block img-fluid" src="https://i.imgur.com/hM7lN28.png" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block img-fluid" src="https://i.imgur.com/6UAk1Qm.png" alt="Second slide">
            </div>
            <div class="carousel-item">
              <img class="d-block img-fluid" src="https://i.imgur.com/CgOVJ1Y.png" alt="Third slide">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <div class="row">

          <div class="col-lg-4 col-md-6 mb-4" v-for="product in products">
            <div class="card h-100">
              <router-link :to="{ name: 'products', params: {id: product.id } }">
                <img class="card-img-top" :src="product.imageSource" alt="">
              </router-link>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">{{product.name}}</a>
                </h4>
                <h5 class="card-priceS">{{ product.price | currency }}</h5>
                <p class="card-text">{{product.description}}</p>
              </div>
              <div class="card-footer">
                <add-to-cart
                        :imageSource="product.imageSource"
                        :id="product.id"
                        :price="product.price"
                        :name="product.name">
                </add-to-cart>
              </div>

            </div>

          </div>

        </div>

        </div>
        <!-- /.row -->

      </div>
      <!-- /.col-lg-9 -->
    </div>
    <Login></Login>
    <Cart></Cart>
  </div>
    <!-- /.row -->


  <!-- /.container -->
</template>

<script>

  import Login from "@/components/Login.vue";
  import Cart from "@/components/Cart.vue"
  export default {
    name: "About",
    props: {
      msg: String
    },
    components: {
      Login, Cart
    },
    data(){
      return {
        products: [],

      }
    },
    methods: {
      getProducts() {
        this.$http
                .get("http://localhost:8081/api/products")
                .then(response => (this.products = response.data))
      }
    },
    created() {
      this.getProducts();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
