<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<style lang="scss">
/* a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
} */
</style>

<script>
import navbar from "./components/Navbar";
export default {
  components: {
    navbar
  }
};
</script>
