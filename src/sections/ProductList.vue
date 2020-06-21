<template>
    <div class="products" id="products">
        <div class="container">
            <h1 class="text-center p-5">Onze smaakmakers</h1>
            <div class="row">

                <div class="col-md-4" v-for="product in products.slice(0, 3)">
                    <div class="card product-item">
                        <router-link :to="{ name: 'products', params: {id: product.id } }">
                        <img :src="product.imageSource" class="card-img-top" >
                        </router-link>
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">
                                {{ product.description }}
                            </p>
                                <h5 class="card-priceS">{{ product.price | currency }}</h5>
                            </div>
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

    </div>
</template>

<script>
    export default {
        name: "ProductList",
        props: {
            msg: String
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
                console.log(this.products);
            },
        },
        created() {
            this.getProducts();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>
