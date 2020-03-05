<template>
  <div class="container">
    <h4 class="d-inline">Products</h4>
    <button class="btn btn-primary float-right" @click="addNew">
      Add Product
    </button>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">product</th>
          <th scope="col">price</th>
          <th scope="col">Modify</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ product.name }}</td>
          <td></td>
          <td></td>
          <td>
            <button
              class="btn btn-primary mx-2"
              data-toggle="modal"
              data-target="#product"
            >
              Edit
            </button>

            <button class="btn btn-danger mx-2" @click="deleteProd(product)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit product</h5>
            <h5 class="modal-title" id="editLabel">Add product</h5>
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
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <label for="product_name">Product name</label>
                  <input
                    class="form-control"
                    id="name"
                    placeholder="product name"
                    v-model="product.name"
                  />
                </div>

                <div class="form-group">
                  <label for="product_description">Product desc.</label>
                  <!-- <vue-editor></vue-editor> -->
                </div>
              </div>

              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr />

                <div class="form-group">
                  <label for="product_price">Product price</label>
                  <input
                    type="number"
                    placeholder="Product price"
                    class="form-control"
                    v-model="product.price"
                  />
                </div>

                <div class="form-group d-inline">
                  <label for="product_tag">Product tags</label>
                  <span
                    class="fa fa-info-circle mx-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="If you have multiple tags,separate them using a comma"
                  ></span>
                  <input
                    type="text"
                    placeholder="Product tags"
                    class="form-control"
                  />

                  <div class="d-flex">
                    <p>
                      <span class="badge badge-info p-1 mx-1"></span>
                    </p>
                  </div>
                </div>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input type="file" class="form-control" />
                </div>

                <div class="form-group d-flex">
                  <div class="mx-1">
                    <img alt="product-images" width="70px" />
                    <span class=""><i class="fa fa-trash del"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" @click="addProduct" class="btn btn-primary">
              Save Product
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase/init";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      product: {
        name: ""
      }
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    addNew() {
      $("#product").modal("show");
    },
    addProduct() {
      this.$firestore.products.add(this.product);
      $("#product").modal("hide");
    },

    deleteProd(id) {
      this.$firestore.products.doc(id[".key"]).delete();
    }
  }
};
</script>
