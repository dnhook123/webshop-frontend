import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Customer/Home.vue";
import Admin from "./views/admin/Admin.vue";
import Products from "./views/admin/Products.vue";
import Orders from "./views/admin/Orders.vue";
import Vendors from "./views/admin/Vendors.vue";
import Profile from "./views/admin/Profile.vue";
import Checkout from './views/Customer/Checkout';
import Product from "@/views/Customer/Product";
import Map from './views/Customer/Map';
import OrderStatus from "@/views/Customer/OrderStatus";
import {fb} from './firebase'

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/map",
      name: "map",
      component: Map
    },
    {
      path: "/orderStatus",
      name: "orderStatus",
      component: OrderStatus
    },
    {
      path: '/products/:id',
      name: 'products',
      component: Product,
      props: true
    },
    {
      path: "/ProductOverview",
      name: "ProductOverview",
      component: () =>
          import(/* webpackChunkName: "about" */ "./views/Customer/ProductOverview.vue")
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true },
      children:[
        {
          path: "products",
          name: "products",
          component: Products
        },
        {
          path: "orders",
          name: "orders",
          component: Orders
        },
        {
          path: "vendors",
          name: "vendors",
          component: Vendors
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        },

      ]
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router;
