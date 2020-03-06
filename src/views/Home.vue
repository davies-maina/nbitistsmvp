<template>
  <div>
    <div class="container justify-content-lg-center my-4 mx-auto">
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Get started
      </button>
    </div>
    <productlist></productlist>
    <login></login>
  </div>
</template>

<script>
import Login from "./Auths/Login";
import Productlist from "./Productlist";

export default {
  name: "Home",
  components: {
    Login,
    Productlist
  }
};
</script>
