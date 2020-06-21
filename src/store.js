import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],
    },
    getters: {
        totalPrice: state => {
            let total = 0;
            state.cart.filter((product) => {
                total += (product.productPrice * product.productQuantity);
            });

            return total;
        }
    },
    mutations:{

        addToCart(state, product){
            let found = state.cart.find(prod => prod.productId == product.productId );

            if(found){
                found.productQuantity++;
            }else{
                state.cart.push(product);
            }
            this.commit('saveData');

        },

        saveData(state){
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        increment(state, id){

            let found = state.cart.find(product => product.productId == id );

            if(found){
                found.productQuantity++;
            }else{

            }

            this.commit('saveData');

        },

        decrement(state, id){

            let found = state.cart.find(product => product.productId == id );

            if(found){
                found.productQuantity--;
            }
            if (found.productQuantity < 1) {
                this.removeFromCart(state, found);
            }
            this.commit('saveData');

        },
        removeFromCart(state, item){

            let index = state.cart.indexOf(item);
            state.cart.splice(index,1);

            this.commit('saveData');

        },

        emptyCart(state) {
            state.cart.length = 0;
            this.commit('saveData');
        }
    }

})
