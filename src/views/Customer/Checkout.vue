<template>
    <div class="chekout">
        <Navbar></Navbar>

        <div class="container mt-5 pt-5">
            <div class="row">
                <table class="table table-borderless">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th scope="col">Producten</th>
                        <th scope="col">Hoeveelheid</th>
                        <th scope="col">Prijs per stuk</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in this.$store.state.cart">
                        <td>
                            <span @click="$store.commit('removeFromCart',item)" class="remove-item">X</span>
                        </td>
                        <td>
                            <img :src="item.productImageSource" alt style="width:100px">
                            {{item.productName}}
                        </td>
                        <td>
                            <div class="left ">
                                <div class="input-group">

                      <button
                              type="button"
                              class="btn btn-danger"
                              @click="decreaseQty(item.productId)">

                        <i class="fa fa-minus"></i>
                      </button>
                                    <input
                                            type="text"
                                            :value="item.productQuantity"
                                            class="form-control input-number"
                                    >
                      <button
                              type="button"
                              class="btn btn-success"
                              @click="increaseQty(item.productId)"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                                </div>
                            </div>
                        </td>
                        <td>{{item.productPrice | currency}}</td>
                    </tr>

                    </tbody>


                </table>
                <div class="col-md-5">
                    <p> <b>Totale prijs:  {{ this.$store.getters.totalPrice | currency }} </b> </p>

                    <button @click="$router.go(-1)"  href="" class="btn btn-primary">
                        <i class="fas fa-cart-arrow-down"></i>
                        Doorgaan met met winkelen
                    </button>

                </div>

                <div class="col-md-4">
                    <form>
                        <div class="form-group">
                            <label >Uw Email address</label>
                            <input type="email"  v-model="order.customerEmail" class="form-control" id="mail" placeholder="naam@voorbeeld.nl">
                        </div>

                        <div class="form-group">
                            <label >Uw Naam</label>
                            <input v-model="order.customerName" type="text" class="form-control" id="name" placeholder="david weng">
                        </div>

                        <div class="form-group">
                            <label >Uw address</label>
                            <input v-model="order.shippingAddress" type="text" class="form-control" id="address" placeholder="jolingstraat 54">
                        </div>


                    </form>
                    <button class="btn btn-success mt-6" @click="pay" >Afrekenen</button>
                </div>


               <!-- <div class="col-md-6">
                    <card class='stripe-card'
                          :class='{ complete }'
                          stripe='pk_test_zyJXcCFfgLVZ83FNyMKGcdDS003HoAFrPn'
                          :options='stripeOptions'
                          @change='complete = $event.complete'
                    />

                    <button class='pay-with-stripe btn btn-primary mt-6' @click='pay' :disabled='!complete'>Afrekenen</button>
                    </form>
                </div>-->
                </div>

            </div>

            </div>
</template>
<script src="https://js.stripe.com/v3/"></script>
<script>

    import axios from 'axios';
    var stripe = Stripe('pk_test_zyJXcCFfgLVZ83FNyMKGcdDS003HoAFrPn');

    export default {
        data() {
            return {
                sessionId: '',
                    order: {
                        orderDate:null,
                        deliveryTime: null,
                        shippingAddress: null,
                        orderReference: null,
                        orderStatus: null,
                        totalPrice: 5,
                        customerName: null,
                        customerEmail: null,
                    }
                }
            },
        methods: {
            increaseQty(id) {
                this.$store.commit('increment', id)
            },
            decreaseQty(id) {
                this.$store.commit('decrement', id)
            },
            pay() {
                this.order.orderDate = new Date().toLocaleDateString()
                var d = new Date();
                d.setDate(d.getDate() + 1)
                this.order.deliveryTime =  d.toLocaleDateString();
                this.order.orderReference = Math.random().toString(36).substr(1, 10);
                this.order.totalPrice = this.$store.getters.totalPrice;
                this.order.orderStatus = "Bevestigd";
                this.$http.post("http://localhost:8099/api/orders", this.order)

                         let data = this.$store.state.cart.slice();

                        // axios.get('http://localhost:5101/webshop-f0820/us-central1/CheckoutSession', {
                axios.get('http://localhost:9329/webshop-f0820/us-central1/CheckoutSession',
                    {
                             params: {
                                 products: data
                             }
                         })
                             .then(response => {
                                 console.log(response);
                                 this.sessionId = response.data
                                 stripe.redirectToCheckout({ sessionId: this.sessionId.id
                                 }).then(function (result) {
                                     console.log(result);


                                 });
                             })
                             .catch(error => {
                                 console.log(error);
                             });
                     }
                 }
    }


</script>
<style scoped lang="scss">
    .center {
        width: 25%;
        margin: 40px auto;
    }
</style>
