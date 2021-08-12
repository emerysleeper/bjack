import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //max - 8 or infinite
    decksAmount: 1,
    deck: null,
    player: {
      cards: [],
      secondHand: [],
      cardSum: 0,
      cardSumSecond: 0,
      stake: 0,
      money: 0
    },
    dealer: {
      cards: [],
      cardSum: 0
    },
    dealerCards: [],
    playerCards: [],
    nextCard: null,
    curTurn: null
  },
  getters: {
    getPlayerCards: state => state.playerCards,
    getDealerCards: state => state.dealerCards,
    getStake: state => state.stake,
    getPlayerMoney: state => state.playerMoney,
    getCurTurn: state => state.curTurn
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
    },
    SET_CUR_TURN (state, payload) {
      state.curTurn = payload
    }
  },
  actions: {
    startGame({ dispatch, commit }) {
      dispatch('clearBoth')
      commit('SET_DECKS_AMOUNT', 1)
      commit('ASSIGN_MONEY', 5000)
      commit('SET_CUR_TURN', 'stake')
      dispatch('populateDeck')

      // commit('GIVE_PLAYER_CARD', { suite: 0, value: 0})
      // commit('GIVE_PLAYER_CARD', { suite: 1, value: 0})
    },
    startRound({ commit, dispatch }) {
      dispatch('clearBoth')
      commit('SET_CUR_TURN', 'stake')
    },
    beginDispense({ dispatch, commit }) {
      commit('SET_CUR_TURN', 'dispense')
      dispatch('giveCardToPlayer')
      dispatch('giveCardToPlayer')
      dispatch('giveCardToDealer')
      dispatch('giveCardToDealer')
    },
    giveCardToPlayer ({ dispatch, commit, state }) {
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
    },
    calculateSum({ commit, state }, payload) {
      const cardSums = []
      for(let card of arr) {
        if (card.value === 0) {
          cardSums.push('Ace')
        } else if (card.value > 9) {
          cardSums.push(10)
        } else {
          cardSums.push(card.value+1)
        }
      }
      const aceAmount = cardSums.filter(card => card === 'Ace').length
      if (aceAmount === 0) {
        return cardSums.reduce((oldVal, newVal) => oldVal + newVal, 0)
      } else if (aceAmount === 1) {
        const acePos = cardSums.indexOf('Ace')
        cardSums.splice(acePos, 1)
        let endSum = cardSums.reduce((oldVal, newVal) => oldVal + newVal, 0)
        if(endSum + 11 > 21) {
          return endSum + 1
        } else {
          return endSum + 11
        }
      } else {
        return cardSums.filter(val => val !== 'Ace')
            .reduce((oldVal, newVal) => oldVal + newVal, 0) + aceAmount
      }
      // const acePos = cardSums.indexOf('Ace')
      // if (acePos !== -1) {
      //   cardSums.splice(acePos, 1)
      //
      // }
      // return cardSums
    },
  },
  modules: {

  }
})
