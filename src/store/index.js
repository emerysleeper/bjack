import Vue from 'vue'
import Vuex from 'vuex'
import game from "./game";
import deck from "./deck";
import persons from "./persons";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    game,
    deck,
    persons
  }
})
