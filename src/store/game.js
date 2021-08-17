function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const game = {
    namespaced: true,
    state: {
        curTurn: null,
        message: null
    },
    getters: {
        getCurTurn: state => state.curTurn,
        getMessage: state => state.message
    },
    mutations: {
        SET_CUR_TURN (state, payload) {
            state.curTurn = payload
        },
        SET_MESSAGE (state, payload) {
            state.message = payload
        }
    },
    actions: {
        startGame({ dispatch, commit }) {
            dispatch('persons/clearBoth', null, { root: true })
            commit('deck/SET_DECKS_AMOUNT', 1, { root: true })
            commit('persons/ASSIGN_MONEY', 5000, { root: true })
            commit('SET_CUR_TURN', 'stake')
            dispatch('deck/populateDeck', null, { root: true })

            // commit('GIVE_PLAYER_CARD', { suite: 0, value: 0})
            // commit('GIVE_PLAYER_CARD', { suite: 1, value: 0})
        },
        startRound({ commit, dispatch, rootState }) {
            if(rootState.deck.deck.length < 15) {
                dispatch('deck/clearDecks', null, { root: true })
                dispatch('deck/populateDeck', null, { root: true })
            }
            dispatch('persons/clearBoth', null, { root: true })
            commit('SET_MESSAGE', null)
            commit('SET_CUR_TURN', 'stake')
        },
        beginDispense({ dispatch, commit }) {
            commit('SET_CUR_TURN', 'dispense')

            //Normal game
            dispatch('persons/giveCardToPlayer', null, { root: true })
            sleep(1000).then(() => {dispatch('persons/giveCardToPlayer', null, { root: true })})
            sleep(2000).then(() => {dispatch('persons/giveCardToDealer', null, { root: true })})


            //BlackJack override. Comment normal game and uncomment this if you want to see the what happens on BlackJack
            // commit('persons/GIVE_PLAYER_CARD', { suite: 0, value: 0}, { root: true })
            // commit('persons/GIVE_PLAYER_CARD', { suite: 1, value: 9}, { root: true })
            // commit('persons/SET_CARD_SUM', { person: 'player', value: 21 }, { root: true })
            // commit('persons/GIVE_DEALER_CARD', { suite: 1, value: 0}, { root: true })
            // commit('persons/SET_CARD_SUM', { person: 'dealer', value: 11 }, { root: true })



            dispatch('playerTurn')
        },
        playerTurn({ commit, dispatch, rootState }) {
            if (rootState.persons.player.cardSum === 21) {
                dispatch('dealerTurn')
            } else {
                sleep(3000).then(() => {dispatch('persons/giveCardToDealer', null, { root: true })})
                commit('SET_CUR_TURN', 'player')
            }
        },
        dealerTurn({ commit, dispatch, rootState }) {
            commit('SET_CUR_TURN', 'dealer')
            //If player have Blackjack from the beginning
            if (rootState.persons.player.cardSum === 21 && rootState.persons.player.cards.length === 2) {
                //If dealer have possibility for Blackjack
                if(rootState.persons.dealer.cardSum === 10 || rootState.persons.dealer.cardSum === 11) {
                    // dispatch('giveCardToDealer')

                    //We give player chance to get his win, but 1 to 1
                    dispatch('playerBlackJack1to1')

                //If dealer has no possibility for blackjack
                } else if (rootState.persons.dealer.cardSum !== 21) {
                    //Player won and dealer got no Blackjack
                    dispatch('win3to2')
                } else {
                    //Both have blackjack, includes the case while player has chosen giving card to dealer
                    dispatch('winPush')
                }
            } else {
                //Here goes everything that is not blackjack
                while (rootState.persons.dealer.cardSum < 17) {
                    dispatch('persons/giveCardToDealer', null, { root: true })
                }
                //Dealer lost
                if(rootState.persons.dealer.cardSum > 21) {
                    dispatch('win1to1')

                    //Push
                } else if (rootState.persons.dealer.cardSum === rootState.persons.player.cardSum) {
                    dispatch('winPush')

                    //Player lost by having less sum
                } else if (rootState.persons.dealer.cardSum > rootState.persons.player.cardSum) {
                    dispatch('loseStake')

                    //Player won by having more sum than the dealer
                } else {
                    dispatch('win1to1')
                }
            }
        },
        playerBlackJack1to1({ commit }) {
            commit('SET_CUR_TURN', 'chooseBlackJack')
            commit('SET_MESSAGE', 'Dealer might have a BlackJack. Take your 1 to 1 win or continue the round.')
        },
        playerWantContinue({ dispatch }) {
            dispatch('persons/giveCardToDealer', null, { root: true })
            dispatch('dealerTurn')
        },
        win3to2({ commit, rootState }) {
            const wonStake = rootState.persons.player.stake * 2.5
            const newPlayerMoney = rootState.persons.player.money + wonStake
            commit('persons/ASSIGN_STAKE', 0, { root: true })
            commit('persons/ASSIGN_MONEY', newPlayerMoney, { root: true })
            commit('SET_CUR_TURN', 'between')
            commit('SET_MESSAGE', 'It\'s a black jack! You win 3 to 2')
            sleep(3000).then(() => {commit('SET_CUR_TURN', 'end')})
        },
        win1to1({ commit, rootState }) {
            const wonStake = rootState.persons.player.stake * 2
            const newPlayerMoney = rootState.persons.player.money + wonStake
            commit('persons/ASSIGN_STAKE', 0, { root: true })
            commit('persons/ASSIGN_MONEY', newPlayerMoney, { root: true })
            commit('SET_CUR_TURN', 'between')
            commit('SET_MESSAGE', 'You win 1 to 1')
            sleep(3000).then(() => {commit('SET_CUR_TURN', 'end')})
        },
        winPush({ commit, rootState }) {
            const newPlayerMoney = rootState.persons.player.money + rootState.persons.player.stake
            commit('persons/ASSIGN_MONEY', newPlayerMoney, { root: true })
            commit('persons/ASSIGN_STAKE', 0, { root: true })
            commit('SET_CUR_TURN', 'between')
            commit('SET_MESSAGE', 'It\'s a push! You keep your stake')
            sleep(3000).then(() => {commit('SET_CUR_TURN', 'end')})
        },
        loseStake({ commit }) {
            commit('persons/ASSIGN_STAKE', 0, { root: true })
            commit('SET_CUR_TURN', 'between')
            commit('SET_MESSAGE', 'You lost!')
            sleep(3000).then(() => {commit('SET_CUR_TURN', 'end')})

        },
        createMessage({ commit }, payload) {
            setTimeout(() => {
                commit('SET_MESSAGE', null)
            }, 5000)
            commit('SET_MESSAGE', payload)
        }
        // createDelay(payload) {
            // let delay
            // if (payload) {
            //     delay = payload
            // } else {
            //     delay = 1000
            // }
            // await setTimeout(() => {
            //     return true
            // }, delay)
        // }
    }
}

export default game
