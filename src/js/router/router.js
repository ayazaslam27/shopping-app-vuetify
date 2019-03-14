import Vue from "vue";
import Router from "vue-router";

import front from "@/components/front";
import Products from "@/components/Products";
import Product from "@/components/Product";
import Registration from "@/components/Registration";
import frontLayout from "@/components/front-layout";
import Checkout from "@/components/Checkout";
import Order from "@/components/Order";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: front,
      children: [
        {
          path: "",
          component: frontLayout
        },
        {
          path: "product/:brand/:id",
          name: "detail-article",
          component: Product
        },
        {
          path: "products/:category/:brand",
          name: "main-category-with-brand",
          component: Products
        },
        {
          path: "products/:category",
          name: "main-category",
          component: Products
        }
      ]
    },
    {
      path: "/Registration",
      name: "registration",
      component: Registration
    },
    {
      path: "/Checkout",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/Profile",
      name: "profile"
    },
    {
      path: "/Order",
      name: "order",
      component: Order
    }
  ]
});
