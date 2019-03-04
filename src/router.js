import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Backstage from "./views/Backstage.vue";
import ProductModify from "./views/ProductModify.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/products",
      name: "products",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Products.vue")
    },
    {
      path: "/backstage",
      // name: "backstage",
      component: Backstage,
      children: [
        {
          path: "",
          name: "product-modify",
          component: ProductModify
        }
      ]
    }
  ]
});
