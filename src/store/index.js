import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameStarted: false,
    //max - 8 or infinite
    decksAmount: 1,
    deck: null,
    dealerCards: [],
    playerCards: [],
    playerStakes: null,
    nextCard: null,
    stake: 0,
    playerMoney: 5000
  },
  getters: {
    getPlayerCards: state => state.playerCards,
    getDealerCards: state => state.dealerCards,
    getStake: state => state.stake,
    getPlayerMoney: state => state.playerMoney
  },
  mutations: {
    GIVE_PLAYER_CARD (state, payload) {
      state.playerCards.push(payload)
    },
    GIVE_DEALER_CARD (state, payload) {
      state.dealerCards.push(payload)
    },
    CLEAR_CARDS_PLAYER (state) {
      state.playerCards = []
    },
    CLEAR_CARDS_DEALER (state) {
      state.dealerCards = []
    },
    ASSIGN_NEXT_CARD (state, payload) {
      state.nextCard = payload
    },
    POPULATE_DECK (state, payload) {
      state.deck = payload
    },
    SET_DECKS_AMOUNT (state, payload) {
      state.decksAmount = payload
    },
    DELETE_CARD_FROM_DECK (state, payload) {
      state.deck.splice(payload, 1)
    },
    CLEAR_PLAYER (state) {
      state.playerCards = []
    },
    CLEAR_DEALER (state) {
      state.dealerCards = []
    },
    ASSIGN_STAKE (state, payload) {
      state.stake = payload
    },
    ASSIGN_MONEY (state, payload) {
      state.playerMoney = payload
    }
  },
  actions: {
    startGame({ dispatch, commit }) {
      commit('SET_DECKS_AMOUNT', 1)
      dispatch('populateDeck')
    },
    giveCardToPlayer ({ dispatch, commit, state }) {
      dispatch('populateDeck')
      dispatch('randomCard')
      commit('GIVE_PLAYER_CARD', state.nextCard)
    },
    giveCardToDealer ({ dispatch, commit, state }) {
      dispatch('randomCard')
      commit('GIVE_DEALER_CARD', state.nextCard)
    },
    populateDeck ({ commit, state }) {
      const decks = []
      for (let nums = 0; nums < state.decksAmount; nums++) {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 13; j++) {
            decks.push({suit: i, value: j})
          }
        }
      }
      commit('POPULATE_DECK', decks)
    },
    // Gives random card from the populated deck and deletes
    // the card from the deck
    randomCard({ commit, state }) {
      const cardNumber = Math.floor(Math.random()*state.deck.length)
      commit('ASSIGN_NEXT_CARD', state.deck[cardNumber])
      commit('DELETE_CARD_FROM_DECK', cardNumber)
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
    },
    clearPlayerHands({ commit }) {
      commit('CLEAR_PLAYER')
    },
    clearDealerHands({ commit }) {
      commit('CLEAR_DEALER')
    },
    clearBoth({ commit }) {
      commit('CLEAR_PLAYER')
      commit('CLEAR_DEALER')
    },
    setStake({ commit, state }) {
      const stake = 100
      commit('ASSIGN_STAKE', stake)
      const newPlayerMoney = state.playerMoney - stake
      commit('ASSIGN_MONEY', newPlayerMoney)
    },
    win3to2({ commit, state }) {
      const wonStake = state.stake * 2.5
      const newPlayerMoney = state.playerMoney + wonStake
      commit('ASSIGN_STAKE', 0)
      commit('ASSIGN_MONEY', newPlayerMoney)
    },
    win1to1({ commit, state }) {
      const wonStake = state.stake * 2
      const newPlayerMoney = state.playerMoney + wonStake
      commit('ASSIGN_STAKE', 0)
      commit('ASSIGN_MONEY', newPlayerMoney)
    },
    loseStake({ commit }) {
      commit('ASSIGN_STAKE', 0)
    }
  },
  modules: {

  }
})
