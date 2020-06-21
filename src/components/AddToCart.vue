<template>
    <div class="add-to-cart">

        <button class="btn btn-primary" @click="addToCart"> Toevoegen aan winkelmand </button>



    </div>
</template>

<script>
    export default {
        name: "add-to-cart",
        props: {
            name: String,
            price: String,
            id: String,
            imageSource: String,
        },
        data(){
            return {
                product :{
                    productName: this.name,
                    productImageSource: this.imageSource,
                    productPrice: this.price,
                    productId: this.id,
                    productQuantity: 1,
                },
                stats: {},
            }
        },
        methods:{
            async addToCart(){
                 await this.getReviewStats();
                if( this.stats.average < 1.5 || this.stats.average == null)
                {
                    Swal.fire({
                        title: 'Weet je het zeker?',
                        text: "Dit is een product met een gemiddelde van 1.5 sterren",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ja voeg hem toe,'
                    }).then((result) => {
                        if (result.value) {
                            $('#Cart').modal('show');
                            this.$store.commit('addToCart', this.product)
                        }
                    })
                }
                else {
                    $('#Cart').modal('show');
                    this.$store.commit('addToCart', this.product)
                }
            },
             async getReviewStats() {
                 await this.$http
                    .get("http://localhost:8082/api/reviews/average/"+this.id)
                    .then(response => (this.stats = response.data))
            }
        }
    };
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
