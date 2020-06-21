import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery';
import {fb}   from './firebase'
import VueFireStore from 'vue-firestore'
import Axios from 'axios'
import Vue2Filters from 'vue2-filters'
import StarRating from 'vue-star-rating'
import store from './store.js'
Vue.use(Vue2Filters)
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: { key: "AIzaSyDfG78PFLWDI0wNiPJ5agbjI-B0kXB0pTc" }
});
Vue.prototype.$http = Axios;

window.$ = window.jQuery = jQuery;

import 'popper.js';
import 'bootstrap';
import './assets/app.scss';

Vue.use(VueFireStore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('ProductList', require('./sections/ProductList.vue').default);
Vue.component('AddToCart', require('./components/AddToCart.vue').default);
Vue.component('AddToReview', require('./components/AddToReview.vue').default);
Vue.component('Login', require('./components/Login').default);
Vue.component('Cart', require('./components/Cart.vue').default);
Vue.component('Review', require('./components/Review.vue').default);
Vue.component('star-rating', StarRating);

import Swal from 'sweetalert2';

window.Swal = Swal;

Vue.config.productionTip = false;

let app = '';

// eslint-disable-next-line no-unused-vars
fb.auth().onAuthStateChanged(function(user) {

  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");

  }


});



