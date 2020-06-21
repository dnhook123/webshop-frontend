<template>
  <div class="orders">
      <div class="container">

        <div class="">
            <div class="">
              <div class="">
                    <h3>Alle Lopende orders</h3>
                  <table class="table table-dark">
                      <thead>
                      <tr>
                          <th scope="col">Order referentie</th>
                          <th  scope="col">Klanten mail</th>
                          <th scope="col">Klanten naam</th>
                          <th scope="col">Oplever Datum</th>
                          <th scope="col">OrderStatus</th>
                          <th scope="col">Bezorgadres</th>
                          <th scope="col">Prijs</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="order in orders">

                          <td>{{order.orderReference}}</td>
                          <td>{{order.customerEmail}} </td>
                          <td> {{order.customerName}}</td>
                          <td> {{order.deliveryTime}}</td>
                          <td>
                              <div class="dropdown">
                                  <a class="btn btn-secondary" href="#" role="button" id="dropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      {{order.orderStatus}}
                                  </a>
                                  <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                      <a class="dropdown-item" @click="updateOrder(order.id, 'Klaargemaakt')"  >Klaargemaakt</a>
                                      <a class="dropdown-item" @click="updateOrder(order.id, 'Onderweg')"  >Onderweg</a>
                                      <a class="dropdown-item" @click="updateOrder(order.id, 'Geleverd')"  >Geleverd</a>
                                  </div>
                              </div>
                          </td>
                          <td> {{order.shippingAddress}}</td>
                          <td> {{order.totalPrice | currency}} </td>
                      </tr>
                      </tbody>
                  </table>
              </div>
              <div class="col-md-6">
              </div>
            </div>
          </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "Orders",
  props: {
    msg: String,
      orders: [],
      order: {
        id: null,
          orderStatus: ""

      }
  },
    methods: {
        async getOrder() {
            await this.$http
                .get("http://localhost:8099/api/orders/")
                .then(response => (this.orders = response.data))
        },
        updateOrder: async function(id, inputStatus){
            this.status = inputStatus;
            await this.$http.put("http://localhost:8099/api/orders/" +id, this.status)
            Swal.fire({
                type: 'success',
                title: 'Updaten van order is gelukt'
            })
            this.getOrder();
        }
    },
    created(){
      this.getOrder();
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
