<template>
  <div class="container mt-5 pt-5">
    <div class="row">
      <div class="col-md-9">
        <h4 class="py-4">Checkout page</h4>
        <ol class="list-group">
          <li
            v-for="item in this.$store.state.cart"
            :key="item.productid"
            class="list-group-item"
          >
            <div class="d-flex">
              <span class="" @click="removeFromCart(item)">X</span>
              <img
                :src="item.productImage"
                width="80px"
                class="align-self-center"
              />
              <!-- <p v-if="ifItemsNotInCart">No items in cart</p> -->
              <div>
                <h5 class="mt-0 ml-3">{{ item.productName }}</h5>
                <p class="mt-0 ml-3">{{ item.productPrice }}</p>
                <p class="mt-0 ml-3">Quantitiy:{{ item.productQuantity }}</p>
              </div>
            </div>
          </li>

          <!-- <p class="mt-0 ml-3">Total:{{ shoppingCartTotal }}</p> -->
        </ol>
      </div>
      <div class="col-md-3 d-flex">
        Total price :
        <p class="mt-0 ml-3">{{ shoppingCartTotal }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout",
  computed: {
    shoppingCartTotal() {
      return this.$store.getters.cartTotalPrice;
    }
  },
  methods: {
    removeFromCart(item) {
      this.$store.dispatch("removeItemFromCart", item);
    }
  }
};
</script>
