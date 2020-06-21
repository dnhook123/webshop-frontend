<template>
    <div class="product">
        <navbar></navbar>
        <div class="container">
            <div class="row">

                <div class="col-lg-12">

                    <div class="card mt-4">
                        <img class="card-img-top img-fluid"  :src="product.imageSource"  alt="">

                        <div class="card-body">
                            <h3 class="card-title">Product: {{product.name}}</h3>
                            <h4 class="card-priceS">Prijs: {{ product.price | currency }}</h4>

                            <p class="card-text">      {{ product.description }}</p>

                        </div>
                    </div>
                    <!-- /.card -->

                    <div class="card card-outline-secondary my-4">
                        <div class="card-header">
                            Product Reviews
                        </div>

                        <div class="card-body">
                            <h5> Beoordeling <star-rating :round-start-rating="false" :rating=stats.average :read-only="true" :star-size="25" ></star-rating> </h5>
                            <h5> Aantal reviews {{stats.countReviews}} </h5>
                            <hr>
                            <div v-for="review in reviews">
                                <span class="float-right"> <star-rating :rating=review.stars :read-only="true" :star-size="25" ></star-rating> </span>
                            <p> {{review.experience}}</p>

                            <small class="text-muted">Gemaakt door {{review.name }} op  {{review.timestamp}}</small>

                            <hr>

                            </div>


                        </div>

                    </div>
                    <!-- /.card -->

                    <button class="btn btn-success"   @click="showModal"> Plaats een review </button>
                </div>
                    </div>
                <!-- /.col-lg-9 -->

            </div>
<Review :pId=this.id ></Review>
        <Login></Login>
        <Cart></Cart>
    </div>
</template>

<script>


    export default {
        name: "product",
        components: {},
        props: {
            msg: String,
            id: Number
        },
        data(){
            return {
                product: {},
                reviews: [],
                stats: {},
            }
        },
        methods: {
            async getProduct () {
                await this.$http
                    .get("http://localhost:8081/api/products/" + this.id)
                    .then(response => (this.product = response.data))
              this.id = this.product.id;

            },
            async getReviews () {
                await this.$http
                    .get("http://localhost:8082/api/reviews/" + this.id)
                    .then(response => (this.reviews = response.data))

            },
            async getReviewStats() {
                await this.$http
                    .get("http://localhost:8082/api/reviews/average/" + this.id)
                    .then(response => (this.stats = response.data))
            },
            showModal(){
                $('#Review').modal('show');
            },
        },
        mounted() {
           this.getProduct();
           this.getReviews();
           this.getReviewStats();
    }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
