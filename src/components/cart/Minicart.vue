<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
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

            <p class="mt-0 ml-3">Total:{{ shoppingCartTotal }}</p>
          </ol>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            resume shopping
          </button>
          <button type="button" class="btn btn-primary" @click="goCheckout">
            checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Minicart",
  data() {
    return {};
  },
  computed: {
    shoppingCartTotal() {
      return this.$store.getters.cartTotalPrice;
    }
  },

  methods: {
    removeFromCart(item) {
      this.$store.dispatch("removeItemFromCart", item);
    },
    goCheckout() {
      $("#addtocart").modal("hide");
      this.$router.push("/checkout");
    }
  }
};
</script>

<style scoped>
.list-group {
  list-style: decimal inside;
}
.list-group-item {
  display: list-item;
}
</style>
