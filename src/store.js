import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);
let storedCart = window.localStorage.getItem('cart');
export default new Vuex.Store({


    state: {
        cart: storedCart ? JSON.parse(storedCart) : []
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

            this.commit('saveData')
        },

        saveData(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart))

        },

        removeProductFromCart(state, payload) {
            state.cart = state.cart.filter(product => {
                return product.productid !== payload.productid;
            });
        }
    },

    getters: {
        cartItemsCount(state) {
            return state.cart.length;
        },
        cartTotalPrice(state) {
            let total = 0;
            state.cart.forEach(item => {
                total += item.productPrice * item.productQuantity;
            });

            return total;
        }
    },

    actions: {
        removeItemFromCart({ commit }, payload) {
            commit("removeProductFromCart", payload);
        }
    }
});