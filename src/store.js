import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        addToCart(state, payload) {
            let checkIfProductIsInCart = state.cart.find(product => {
                return product.productid == payload.productid;
            });

            if (checkIfProductIsInCart) {
                checkIfProductIsInCart.productQuantity++;
            } else {
                state.cart.push(payload);
            }
        }
    }
});