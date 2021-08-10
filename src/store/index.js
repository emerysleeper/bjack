import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameStarted: false,
    //max - 8 or infinite
    decksAmount: null,
    deck: null,
    dealerCards: [],
    playerCards: [],
    playerStakes: null,
    nextCard: null
  },
  getters: {
    getPlayerCards: state => state.playerCards,
    getDealerCards: state => state.dealerCards
  },
  mutations: {
    GIVE_PLAYER_CARD (state, payload) {
      state.playerCards.push(payload)
    },
    GIVE_DEALER_CARD (state, payload) {
      state.playerCards.push(payload)
    },
    CLEAR_CARDS_PLAYER (state) {
      state.playerCards = []
    },
    CLEAR_CARDS_DEALER (state) {
      state.dealerCards = []
    },
    ASSIGN_NEXT_CARD (state, payload) {
      state.nextCard = payload
    }
  },
  actions: {
    startGame() {

    },
    giveCard ({ dispatch, commit, state }) {
      dispatch('infiniteDeckRandomCard')
      commit('GIVE_PLAYER_CARD', state.nextCard)
    },
    //Gives random card in case we play game with infinite decks
    infiniteDeckRandomCard({ commit }) {
      // if(Math.floor(Math.random() * 54) < 2) {
      //   return 'Joker'
      // } else {
        const suit = Math.floor(Math.random()*4)
        const cardValue = Math.floor(Math.random()*13)
        commit('ASSIGN_NEXT_CARD', [suit, cardValue])
      // }
    }
  },
  modules: {

  }
})
