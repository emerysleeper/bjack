import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //max - 8 or infinite
    decksAmount: 1,
    deck: null,
    message: null,
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
    getPlayer: state => state.player,
    getDealer: state => state.dealer,
    getCurTurn: state => state.curTurn,
    getMessage: state => state.message
  },
  mutations: {
    GIVE_PLAYER_CARD (state, payload) {
      state.player.cards.push(payload)
    },
    GIVE_DEALER_CARD (state, payload) {
      state.dealer.cards.push(payload)
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
      state.player.cards = []
    },
    CLEAR_DEALER (state) {
      state.dealer.cards = []
    },
    ASSIGN_STAKE (state, payload) {
      state.player.stake = payload
    },
    ASSIGN_MONEY (state, payload) {
      state.player.money = payload
    },
    SET_CUR_TURN (state, payload) {
      state.curTurn = payload
    },
    SET_CARD_SUM (state, payload) {
      state[payload.person].cardSum = payload.value
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
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
      commit('SET_MESSAGE', null)
      commit('SET_CUR_TURN', 'stake')
    },
    beginDispense({ dispatch, commit }) {
      commit('SET_CUR_TURN', 'dispense')
      dispatch('giveCardToPlayer')
      dispatch('giveCardToPlayer')
      // commit('GIVE_PLAYER_CARD', { suite: 0, value: 0})
      // commit('GIVE_PLAYER_CARD', { suite: 1, value: 9})
      // commit('SET_CARD_SUM', { person: 'player', value: 21 })
      // dispatch('giveCardToDealer')
      dispatch('giveCardToDealer')
      dispatch('playerTurn')
    },
    playerTurn({ commit, dispatch, state }) {
      if (state.player.cardSum === 21) {
        dispatch('dealerTurn')
      } else {
        commit('SET_CUR_TURN', 'player')
      }
    },
    takeCard({ dispatch, state }) {
      dispatch('giveCardToPlayer')
      if(state.player.cardSum > 21) {
        dispatch('loseStake')
      }
    },
    dealerTurn({ commit, dispatch, state }) {
      commit('SET_CUR_TURN', 'dealer')
      //If player have Blackjack from the beginning
      if (state.player.cardSum === 21 && state.player.cards.length === 2) {
        //If dealer have possibility for Blackjack
        if(state.dealer.cardSum === 10 || state.dealer.cardSum === 11) {
          dispatch('giveCardToDealer')
          //But if dealer didn't have a blackjack
          if (state.dealer.cardSum !== 21) {
            //Player won and dealer got no Blackjack
            dispatch('win3to2')
          } else {
            //Both have blackjack
            dispatch('winPush')
          }
        } else {
          //Player won with Blackjack on hands,
          // dealer didn't have even the possibility of Blackjack
          dispatch('win3to2')
        }
      } else {
        //Here goes everything that is not blackjack
        while (state.dealer.cardSum < 17) {
          dispatch('giveCardToDealer')
        }
        //Dealer lost
        if(state.dealer.cardSum > 21) {
          dispatch('win1to1')

          //Push
        } else if (state.dealer.cardSum === state.player.cardSum) {
          dispatch('winPush')

          //Player lost by having less sum
        } else if (state.dealer.cardSum > state.player.cardSum) {
          dispatch('loseStake')

          //Player won by having more sum than the dealer
        } else {
          dispatch('win1to1')
        }
      }

    },
    giveCardToPlayer ({ dispatch, commit, state }) {
      dispatch('randomCard')
      commit('GIVE_PLAYER_CARD', state.nextCard)
      dispatch('calculateSum', 'player')
    },
    giveCardToDealer ({ dispatch, commit, state }) {
      dispatch('randomCard')
      commit('GIVE_DEALER_CARD', state.nextCard)
      dispatch('calculateSum', 'dealer')
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
      commit('SET_CARD_SUM', { person: 'player', value: 0 })
      commit('SET_CARD_SUM', { person: 'dealer', value: 0 })
    },
    setStake({ commit, state }, payload) {
      commit('ASSIGN_STAKE', parseInt(payload, 10))
      const newPlayerMoney = state.player.money - parseInt(payload, 10)
      commit('ASSIGN_MONEY', newPlayerMoney)
    },
    win3to2({ commit, state }) {
      const wonStake = state.player.stake * 2.5
      const newPlayerMoney = state.player.money + wonStake
      commit('ASSIGN_STAKE', 0)
      commit('ASSIGN_MONEY', newPlayerMoney)
      commit('SET_MESSAGE', 'It\'s a black jack! You win 3 to 2')
      commit('SET_CUR_TURN', 'end')
    },
    win1to1({ commit, state }) {
      const wonStake = state.player.stake * 2
      const newPlayerMoney = state.player.money + wonStake
      commit('ASSIGN_STAKE', 0)
      commit('ASSIGN_MONEY', newPlayerMoney)
      commit('SET_MESSAGE', 'You win 1 to 1')
      commit('SET_CUR_TURN', 'end')
    },
    winPush({ commit, state }) {
      const newPlayerMoney = state.player.money + state.player.stake
      commit('ASSIGN_MONEY', newPlayerMoney)
      commit('ASSIGN_STAKE', 0)
      commit('SET_MESSAGE', 'It\'s a push! You keep your stake')
      commit('SET_CUR_TURN', 'end')
    },
    loseStake({ commit }) {
      commit('ASSIGN_STAKE', 0)
      commit('SET_MESSAGE', 'You lost')
      commit('SET_CUR_TURN', 'end')
    },
    calculateSum({ commit, state }, payload) {
      const arr = state[payload].cards
      let endSum
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
        endSum =  cardSums.reduce((oldVal, newVal) => oldVal + newVal, 0)
      } else if (aceAmount === 1) {
        const acePos = cardSums.indexOf('Ace')
        cardSums.splice(acePos, 1)
        const prepSum = cardSums.reduce((oldVal, newVal) => oldVal + newVal, 0)
        if(prepSum + 11 > 21) {
          endSum = prepSum + 1
        } else {
          endSum = prepSum + 11
        }
      } else {
        endSum = cardSums.filter(val => val !== 'Ace')
            .reduce((oldVal, newVal) => oldVal + newVal, 0) + aceAmount
      }
      commit('SET_CARD_SUM', { person: payload, value: endSum})
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
