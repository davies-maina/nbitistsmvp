<template>
  <div>
    <button class="btn btn-primary" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
export default {
  name: "Addtocart",
  props: ["prodName", "prodPrice", "prodid", "prodImage"],
  data() {
    return {
      item: {
        productName: this.prodName,
        productPrice: this.prodPrice,
        productid: this.prodid,
        productImage: this.prodImage
      }
    };
  },

  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.item);
    }
  }
};
</script>
