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
                <img
                  :src="item.productImage"
                  width="80px"
                  class="align-self-center"
                />
                <div>
                  <h5 class="mt-0 ml-3">{{ item.productName }}</h5>
                  <p class="mt-0 ml-3">{{ item.productPrice }}</p>
                  <p class="mt-0 ml-3">Quantitiy:{{ item.productQuantity }}</p>
                </div>
              </div>
            </li>
          </ol>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            resume shopping
          </button>
          <button type="button" class="btn btn-primary">checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group {
  list-style: decimal inside;
}
.list-group-item {
  display: list-item;
}
</style>
