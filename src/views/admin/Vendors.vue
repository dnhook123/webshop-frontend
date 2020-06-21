<template>
    <div class="vendors">
        <div class="container">

            <div class="intro h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-8">
                        <h3>Pagina van leveranciers</h3>
                        <table class="table">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">Naam bedrijf</th>
                                <th scope="col">Contact Persoon</th>
                                <th scope="col">Telefoonnummer</th>
                                <th scope="col">Adres</th>
                                <th scope="col">Acties</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="vend in vendors">
                            <td> {{vend.data().name}} </td>
                            <td> {{vend.data().contactperson}} </td>
                            <td> {{vend.data().phonenumber}} </td>
                            <td> {{vend.data().address}} </td>
                                <td>
                                    <button @click="editVendor(vend)" class="btn btn-primary">Aanpassen</button>
                                    <button @click="deleteVendor(vend.id)" class="btn btn-danger">Verwijderen</button>
                                </td>
                           </tr>
                            </tbody>
                        </table>


                    </div>
                    <div class="col-md-4">
                        <h3>Toevoegen Leverancier</h3>
                        <div class="form-group">
                            <p> Naam Bedrijf</p>
                            <input type="text" placeholder="Naam bedrijf" v-model="vendorToAdd.name" class="form-control">
                        </div>

                        <div class="form-group">
                            <p> Contactpersoon</p>
                            <input type="text" placeholder="Contactpersoon" v-model="vendorToAdd.contactperson"  class="form-control">
                        </div>
                        <div class="form-group">
                            <p> Telefoonnummer</p>
                            <input type="text" placeholder="Telefoonnummer" v-model="vendorToAdd.phonenumber" class="form-control">
                        </div>

                        <div class="form-group">
                            <p> Adres</p>
                            <input type="text" placeholder="Adres" v-model="vendorToAdd.address" class="form-control">
                        </div>

                        <div class="form-group">
                            <button @click="addVendor" class="btn btn-primary">Save Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLabel">Aanpassen leverancier</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                            <input type="text" placeholder="Naam" v-model="vendorToAdd.name" class="form-control">
                        </div>

                        <div class="form-group">
                            <input type="text" placeholder="Contactpersoon" v-model="vendorToAdd.contactperson" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Telefoonnummer" v-model="vendorToAdd.phonenumber" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Adres" v-model="vendorToAdd.address" class="form-control">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Sluiten</button>
                        <button @click="updateVendor()" type="button" class="btn btn-primary">Wijzig gegevens</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {db} from '../../firebase';

    export default {
        name: "Vendors",
        props: {
            msg: String
        },

        data() {
            return {
                vendors: [],
                vendorToAdd: {
                    name: null,
                    contactperson: null,
                    phonenumber: null,
                    address: null
                },
                activeVendor:null
            }
        },

        methods: {
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
            addVendor(){
                db.collection("vendors").add(this.vendorToAdd)
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id)
                        Object.assign(this.$data, this.$options.data.apply(this))
                        this.getVendors()
                    })
            },
            updateVendor(){
                db.collection("vendors").doc(this.activeVendor).update(this.vendorToAdd)
                    .then(() => {
                        $('#edit').modal('hide');
                        console.log("Document successfully updated!");
                        this.watcher();
                        console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            },
            editVendor(vendor){
                $('#edit').modal('show');
                this.vendorToAdd = vendor.data();
                this.activeVendor = vendor.id;
            },
            deleteVendor(doc){
                if(confirm('Are you sure ? ')){
                    db.collection("vendors").doc(doc).delete().then(function() {
                        console.log("Document successfully deleted!");

                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                    this.watcher();
                }
            }
        },
        mounted() {
            this.getVendors();
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
