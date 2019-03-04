import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {
    ACT_LOADING(context, payload) {
      context.commit("SET_LOADING", payload);
    }
  }
});
