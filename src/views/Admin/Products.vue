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
                    @keyup.188="addTag()"
                    v-model="tag"
                  />

                  <div class="d-flex">
                    <p v-for="(tag, index) in product.tags" :key="index">
                      <span class="badge badge-info p-1 mx-1">{{ tag }}</span>
                      <span
                        @click="deleteTag(tag, index)"
                        v-if="editMode == true"
                        >x</span
                      >
                      <span @click="deleteaddTag(tag, index)" v-else>x</span>
                    </p>
                  </div>
                </div>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input
                    type="file"
                    id="uploadImages"
                    class="form-control"
                    accept="image/*"
                    @change="uploadImage"
                    multiple
                  />
                </div>

                <div class="form-group d-flex">
                  <div
                    class="mx-1"
                    v-for="(image, index) in product.images"
                    :key="index"
                  >
                    <img alt="product-images" width="70px" :src="image" />
                    <span class="" @click="deleteImage(image, index)">x</span>
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
      this.product.price = "";
      this.product.images = [];
      this.product.tags = [];
      this.product.description = "";
      /* this.product.tags = ""; */
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
        description: this.product.description,
        tags: this.product.tags,
        images: this.product.images
      });
      $("#product").modal("hide");
    },

    uploadImage(e) {
      if (e.target.files) {
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let user = firebase.auth().currentUser;

          let storageRef = firebase
            .storage()
            .ref(`productimages/${user.uid}/` + file.name);

          let uploadTask = storageRef.put(file);

          uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {},
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                this.product.images.push(downloadURL);
              });
            }
          );
        }
      } /* if (
        e.target.files
      ) {
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
          var file = files[i];
          console.log(file);
        }
      } */
    },

    deleteImage(img, index) {
      let image = firebase.storage().refFromURL(img);
      this.product.images.splice(index, 1);

      image
        .delete()
        .then(() => {
          console.log("deleted");
        })
        .catch(() => {
          console.log("error");
        });
      if (this.product.images.length < 1) {
        document.getElementById("uploadImages").value = null;
      }
    },

    deleteTag(tag, index) {
      this.product.tags.splice(index, 1);
      var cityRef = db.collection("products").doc(this.editId);

      var removeCapital = cityRef
        .update({
          tags: firebase.firestore.FieldValue.delete()
        })
        .then(() => {
          var washingtonRef = db.collection("products").doc(this.editId);

          // Set the "capital" field of the city 'DC'
          return washingtonRef
            .update({
              tags: this.product.tags
            })
            .then(function() {
              console.log("Document successfully updated!");
            });
        });
    },
    deleteaddTag(index) {
      this.product.tags.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.deleteimage:hover {
  cursor: pointer;
}
</style>
