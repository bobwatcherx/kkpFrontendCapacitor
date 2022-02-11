
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    nama:"BEJO"
  },
  getters: {
    // products({ state }) {
    //   return state.products;
    // }
    getnama({state}){
      return state.nama
    }
  },
  actions: {
    // addProduct({ state }, product) {
    //   state.products = [...state.products, product];
    // },
    ganti({state},payload){
      state.nama = payload.new
    }
  },
})
export default store;
