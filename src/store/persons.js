
const persons = {
    namespaced: true,
    state: {
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
        }
    },
    getters: {
        getPlayer: state => state.player,
        getDealer: state => state.dealer
    },
    mutations: {
        GIVE_PLAYER_CARD(state, payload) {
            state.player.cards.push(payload)
        },
        GIVE_DEALER_CARD(state, payload) {
            state.dealer.cards.push(payload)
        },
        CLEAR_PLAYER(state) {
            state.player.cards = []
        },
        CLEAR_DEALER(state) {
            state.dealer.cards = []
        },
        ASSIGN_STAKE(state, payload) {
            state.player.stake = payload
        },
        ASSIGN_MONEY(state, payload) {
            state.player.money = payload
        },
        SET_CARD_SUM(state, payload) {
            state[payload.person].cardSum = payload.value
        }
    },
    actions: {
        takeCard({ dispatch, state }) {
            dispatch('giveCardToPlayer')
            if(state.player.cardSum > 21) {
                dispatch('loseStake')
            }
        },
        giveCardToPlayer ({ dispatch, commit, rootState }) {
            dispatch('deck/randomCard', null, { root: true})
            commit('GIVE_PLAYER_CARD', rootState.deck.nextCard)
            dispatch('calculateSum', 'player')
        },
        giveCardToDealer ({ dispatch, commit, rootState }) {
            dispatch('deck/randomCard', null, { root: true})
            commit('GIVE_DEALER_CARD', rootState.deck.nextCard)
            dispatch('calculateSum', 'dealer')
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
        },
    }
}

export default persons
