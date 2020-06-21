
<template>
    <div class="products">
        <div class="container">

            <div class="intro h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-6">
                        <h3>Producten overzicht</h3>

                        <p>
                  Hierin kun je alles beheren wat met producten te maken heeft.
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="/img/svg/products.svg" alt="" class="img-fluid">
                    </div>
                </div>
            </div>

            <hr>

            <div class="product-test">


                <h3 class="d-inline-block">Producten Overizcht</h3>
              <button @click="addNew" class="btn btn-primary float-right">Product Toevoegen</button>

                <div class="table-responsive">

                    <table class="table">
                        <thead>
                        <tr>
                            <td>Id</td>
                            <th>Naam</th>
                            <th>Beschrijving</th>
                            <th>Prijs</th>
                            <th>Leverancier</th>
                            <th class="offset-1 ">Acties</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="product in products">
                            <td>{{product.id}}</td>
                            <td>
                                {{product.name}}
                            </td>
                            <td>
                                {{product.description}}
                            </td>
                            <td>
                                {{product.price | currency}}
                            </td>
                            <td class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> {{product.vendor}} <span class="caret"></span>
                                <ul class="dropdown-menu">
                                    <li v-for="vend in vendors">
                                        <a @click="updateVendor(product.id, vend.data().name)"  >  {{vend.data().name}} </a>
                                    </li>
                                </ul>
                            </td>

                            <td> <button @click="editProduct(product.id)" class="btn btn-primary"> Aanpassen </button>
                                <button @click="deleteProduct(product.id)" class="btn btn-danger offset-1"> Verwijderen </button>
                            </td>


                        </tr>


                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLabel"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <!-- main product -->
                            <div class="col-md-8">
                                <div class="form-group">
                                    Product Naam
                                    <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                                </div>

                                Product Beschrijving
                                <div class="form-group">
                                    <textarea name="description" class="form-control" placeholder="Product description" v-model='product.description' cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <!-- product sidebar -->
                            <div class="col-md-4">
                                <h4 class="display-6">Product Details</h4>
                                <hr>

                                Product Prijs
                                <div class="form-group">
                                    <input type="text" placeholder="Naam" v-model="product.price" class="form-control">
                                </div>

                                Product Foto
                                <div class="form-group">
                                    <input type="text" placeholder="Beschrijving" v-model="product.imageSource" class="form-control">
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'create'" >Save changes</button>
                        <button @click="updateProduct(product.id)" type="button" class="btn btn-primary" v-if="modal == 'edit'" >Save changes</button>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    import {db} from '../../firebase';

    export default {
        name: "Products",
        props: {
            msg: String
        },
        data(){
            return {
                products: [],
                product: {
                    name:null,
                    description:null,
                    price:null,
                    imageSource:null,
                    vendor:null
                },
                activeItem:null,
                modal:null,
                vendors:[],
            }
        },
        methods:{
            watcher(){
                db.collection("vendors").onSnapshot((querySnapshot) => {
                    this.vendors = [];
                    querySnapshot.forEach((doc) => {
                        this.vendors.push(doc);
                    });
                });
            },
            getVendors(){
                db.collection("vendors").get().then((querySnapshot) => {

                    querySnapshot.forEach((doc) => {
                        this.vendors.push(doc);
                    });
                });
            },
            getProducts: function () {
                this.$http
                    .get("http://localhost:8081/api/products")
                    .then(response => (this.products = response.data))
            },
            addProduct: async function () {
                await this.$http.post("http://localhost:8081/api/products", this.product)
                $('#product').modal('hide');
                    this.getProducts();
                },
            editProduct(id)  {
                this.modal = 'edit';
                this.$http.get("http://localhost:8081/api/products/" +id ).then(
                   response => (this.product = response.data));
                $('#product').modal('show');
            },
            updateProduct: async function(id){
                await this.$http.put("http://localhost:8081/api/products/" +id, this.product)
                Swal.fire({
                    type: 'success',
                    title: 'Updated  successfully'
                })
                $('#product').modal('hide');
                this.getProducts();
            },
            deleteProduct: async function(id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.$http.delete("http://localhost:8081/api/products/" +id )
                        var index = this.products.map(function(item) {
                            return item.Id
                        }).indexOf(id);

                        this.products.splice(index, 1);
                        Swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        )

                    }


                })

            },
            addNew(){
                this.modal = "create"
                this.product.name = null,
                    this.product.imageSource = null,
                    this.product.price = null,
                    this.product.description = null,
                $('#product').modal('show');
            },
            updateVendor: async function(id, inputVendor){
                await this.$http.put("http://localhost:8081/api/products/" +id, inputVendor)
                Swal.fire({
                    type: 'success',
                    title: 'Leverancier gewijzigd'
                })
                this.getProducts();
            }
        },

        mounted() {
            this.getProducts();
            this.getVendors();
        },
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
