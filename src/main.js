import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

global.jQuery = jQuery;
global.$ = jQuery;

Vue.config.productionTip = false;
/* import db from "./firebase/init"; */
import firebase from "firebase";

let app = null;
firebase.auth().onAuthStateChanged(() => {

    if (!app) {
        app = new Vue({
            router,
            render: h => h(App)
        }).$mount("#app");
    }
})