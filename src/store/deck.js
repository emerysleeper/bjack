
const deck = {
    namespaced: true,
    state: {
        //max - 8 or infinite
        decksAmount: 1,
        deck: null,
        nextCard: null
    },
    getters: {
        getDeck: state => state.deck
    },
    mutations: {
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
    },
    actions: {
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
        clearDecks({ commit }) {
          commit('POPULATE_DECK', [])
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
    },
}

export default deck
