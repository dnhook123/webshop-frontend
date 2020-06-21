<template>
    <div class="add-to-review">

        <button class="btn btn-primary"   @click="addReview"> Plaats een review </button>
        <Review> </Review>
    </div>

</template>

<script>
    export default {
        name: "add-to-review",
        props: {
            id: String,
        },
        data(){
            return {
                review :{
                   productId: this.id
                }
            }
        },
        methods:{
            addReview(){
                $('#Review').modal('show');
            }
        }
    };
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
