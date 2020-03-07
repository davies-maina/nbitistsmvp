<template>
  <div class="container">
    <h1 class="text-center p-5">Product list</h1>
    <div class="row">
      <div class="container">
        <button @click="showMiniCart">{{ cartItemCount }} cart</button>
      </div>
      <div class="col-md-4" v-for="(product, index) in products" :key="index">
        <div class="card">
          <carousel :perPage="1">
            <slide
              v-for="(image, index) in product.images"
              :key="index['.key']"
            >
              <img :src="image" class="card-img-top" alt="product-image" />
            </slide>
          </carousel>
          <img src="" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text" v-html="product.description"></p>
            <p class="card-text">{{ product.price }}</p>
            <addtocart
              :prodName="product.name"
              :prodPrice="product.price"
              :prodid="product['.key']"
              :prodImage="getFirstImage(product.images)"
            ></addtocart>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="addtocart"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <minicart></minicart>
    </div>
  </div>
</template>
<script>
import db from "../firebase/init";
import { Carousel, Slide } from "vue-carousel";
import Addtocart from "../components/cart/Addtocart";
import Minicart from "../components/cart/Minicart";
export default {
  name: "productlist",
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    getFirstImage(images) {
      return images[0];
    },
    showMiniCart() {
      $("#addtocart").modal("show");
    }
  },
  components: {
    Carousel,
    Slide,
    Addtocart,
    Minicart
  },
  computed: {
    cartItemCount() {
      return this.$store.getters.cartItemsCount;
    }
  }
};
</script>
