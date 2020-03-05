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
              @click="editProd(product)"
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
            <h5 class="modal-title" id="editLabel" v-if="editMode == true">
              Edit product
            </h5>
            <h5 class="modal-title" id="editLabel" v-else>Add product</h5>
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
                  <vue-editor v-model="product.description"></vue-editor>
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
                    @keyup.188="addTag"
                    v-model="tag"
                  />

                  <div class="d-flex">
                    <p v-for="(tag, index) in product.tags" :key="index">
                      <span class="badge badge-info p-1 mx-1">{{ tag }}</span>
                    </p>
                  </div>
                </div>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input
                    type="file"
                    class="form-control"
                    accept="image/*"
                    @change="uploadImage"
                  />
                </div>

                <div class="form-group d-flex">
                  <div
                    class="mx-1"
                    v-for="(image, index) in product.images"
                    :key="index"
                  >
                    <img alt="product-images" width="70px" :src="image" />
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
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
              v-if="editMode == true"
            >
              Save changes
            </button>
            <button
              type="button"
              @click="addProduct"
              class="btn btn-primary"
              v-else
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase/init";
import { VueEditor } from "vue2-editor";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      product: {
        name: "",
        description: "",
        tags: [],
        price: "",
        images: []
      },

      editId: "",
      editMode: false,
      tag: ""
    };
  },
  components: {
    VueEditor
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    addNew() {
      this.editMode = false;
      this.product.name = "";
      this.product.description = "";
      $("#product").modal("show");
    },

    addTag() {
      let string = this.tag;
      string = string.replace(",", "");
      this.product.tags.push(string);
      this.tag = "";
    },
    addProduct() {
      this.$firestore.products.add(this.product);
      $("#product").modal("hide");
    },

    deleteProd(id) {
      this.$firestore.products.doc(id[".key"]).delete();
    },

    editProd(product) {
      this.editMode = true;
      $("#product").modal("show");
      /* this.product = product.data(); */
      this.editId = product[".key"];
      /* console.log(product[".key"]); */
      this.product = product;
    },
    updateProduct() {
      this.$firestore.products.doc(this.editId).update({
        name: this.product.name,
        description: this.product.description
      });
      $("#product").modal("hide");
    },

    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        /* console.log(e.target.files[0]); */
        let user = firebase.auth().currentUser;
        /* console.log(user.uid); */
        let storageRef = firebase
          .storage()
          .ref(`productimages/${user.uid}/` + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              /* console.log("File available at", downloadURL); */
              this.product.images.push(downloadURL);
            });
          }
        );
      }
    }
  }
};
</script>
