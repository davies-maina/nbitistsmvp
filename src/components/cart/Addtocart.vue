<template>
  <div>
    <a href="" class="btn btn-primary">Add to cart</a>
  </div>
</template>

<script>
export default {
  name: "Addtocart",
  props: ["prodName", "prodPrice", "prodid", "prodImage"],
  data() {
    return {
      productName: this.prodName,
      productPrice: this.prodPrice,
      productid: this.prodid,
      productImage: this.prodImage
    };
  }
};
</script>
