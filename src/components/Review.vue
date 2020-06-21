<template>
    <div class="modal fade" id="Review" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">

                            <h5 class="text-center">Plaats hier een review</h5>
                            <div class="form-group">
                                <label >Naam</label>
                                <input type="email" v-model="review.name" class="form-control" aria-describedby="emailHelp" placeholder="Plaats hier uw naam">
                            </div>
                            <div class="form-group">
                                <label >Ervaring</label>
                                <input type="email" v-model="review.experience" class="form-control" aria-describedby="emailHelp" placeholder="Plaats hier een ervaring">

                            </div>

                            <div class="form-group">
                                <label>Rating</label>
                                <star-rating :star-size="25" v-model="review.stars"></star-rating>
                            </div>



                            <div class="form-group">
                                <button class="btn btn-primary" @click="postReview">Schrijf review </button>
                                <button class="btn btn-primary" @click="close">Sluit scherm </button>
                            </div>

                        </div>

                    </div>


                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Review",
        props: {
            msg: String,
            pId: Number
        },
        data(){
            return {
                review: {
                    name: null,
                    experience: null,
                    productId: this.pId,
                    stars: null,
                    timestamp: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                }
            }
        },
        methods: {
            close(){
                $('#Review').modal('hide')
            },
            postReview: async function(){
                    await this.$http.post("http://localhost:8082/api/reviews/", this.review)
                    Swal.fire({
                        type: 'success',
                        title: 'Review is geplaatst'
                    })

                    $('#Review').modal('hide');
                await this.$parent.getReviews();
                await this.$parent.getReviewStats();
                this.review.experience = null;
                this.review.stars = null;
                this.review.name = null;

                },

            }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
