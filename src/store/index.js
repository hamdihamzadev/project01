// store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import allOrders from '../store/orders'
import allProducts from '../store/products'
import allCategories from '../store/categories'
import allCustomers from '../store/customers'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    allOrders,
    allProducts,
    allCategories,
    allCustomers
  }
});
