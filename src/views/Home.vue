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
    <login></login>
  </div>
</template>

<script>
import Login from "./Auths/Login";

export default {
  name: "Home",
  components: {
    Login
  }
};
</script>
