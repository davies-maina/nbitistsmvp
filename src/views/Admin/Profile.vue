<template>
  <div class="card">
    <h1>{{ userName }}</h1>
    <p class="title">{{ email }}</p>
    <p>Harvard University</p>
    <a href="#"><i class="fa fa-dribbble"></i></a>
    <a href="#"><i class="fa fa-twitter"></i></a>
    <a href="#"><i class="fa fa-linkedin"></i></a>
    <a href="#"><i class="fa fa-facebook"></i></a>
    <p><button>Contact</button></p>
  </div>
</template>

<script>
/* import db from "../firebase/init"; */
import firebase from "firebase";
export default {
  mounted() {
    let user = firebase.auth().currentUser;

    if (user !== null) {
      this.userName = user.displayName;
      this.email = user.email;
    }
  },

  data() {
    return {
      userName: "",
      email: ""
    };
  }
};
</script>
