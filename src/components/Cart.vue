<template>
    <div class="modal fade" id="Cart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">My Bag</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul>
                        <li v-for="product in this.$store.state.cart" class="media">
                            <img :src="product.productImageSource" width="80px" class="align-self-center mr-3" alt="">
                            <div class="media-body">
                                <h5 class="mt-0">{{product.productName}}
                                <span class='float-right' @click="$store.commit('removeFromCart',item)">X</span>
                                </h5>
                                <p class="mt-0">{{product.productPrice | currency}}</p>
                                <p class="mt-0">Hoeveelheid : {{product.productQuantity }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button id="test123"type="button" class="btn btn-secondary" data-dismiss="modal">Doorgaan met winkelen </button>
                    <button type="button" class="btn btn-primary" @click="checkout">Afrekenen</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        props: {
            msg: String
        },
        methods: {
            checkout(){
                $('#Cart').modal('hide')
                this.$router.push('/checkout')
            }
        }
    };
</script>


<style scoped lang="scss">

</style>
