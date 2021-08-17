<template>
  <div class="field">
    <div class="field__table">
      <Card
          v-for="(card, i) in deck"
          :key="card.suit + '.' + card.value + '.' + i"
          :turned="false"
          :card="card"
          :cardNum="i"
          :place="'deck'"
      />
      <Card
          v-for="(card, i) in player.cards"
          :key="card.suit + '.' + card.value + '.' + i"
          :card="card"
          :cardNum="i"
          :place="'player'"
          :discarded="curTurn === 'end'"
      />
      <Card
          v-for="(card, i) in dealer.cards"
          :key="card.suit + '.' + card.value + '.' + i"
          :card="card"
          :cardNum="i"
          :place="'dealer'"
          :discarded="curTurn === 'end'"
      />
      <p class="field__cardsum--player">Your hand: {{ player.cardSum }}</p>
      <p class="field__cardsum--dealer">Dealer hand: {{ dealer.cardSum }}</p>
      <p class="field__stake">Your stake: {{ player.stake }}</p>
      <p class="field__money">Your money: {{ player.money }}</p>
      <div class="field__message" v-if="message" >
        <p>{{ message }}</p>
      </div>
      <div class="field__controls">
        <input
            v-if="curTurn === 'stake'"
            class="field__input"
            placeholder="Enter your stake"
            v-model="enterStake"
        />
        <button
            v-if="curTurn === null"
            @click="start">
          <p>Start the game</p>
        </button>
        <button
            v-if="curTurn === 'end'"
            @click="startRound"
        >
          <p>Begin round</p>
        </button>
        <button v-if="curTurn === 'chooseBlackJack'" @click="win1to1">
          <p>Take 1 to 1</p>
        </button>
        <button v-if="curTurn === 'chooseBlackJack'" @click="playerWantContinue">
          <p>Continue</p>
        </button>
        <button
            v-if="curTurn === 'stake'"
            @click="sendStake"
        >
          <p>Play</p>
        </button>
        <button v-if="curTurn === 'player'" @click="takeCard">
          <p>Hit</p>
        </button>
        <button v-if="curTurn === 'player'" @click="dealerTurn">
          <p>Stand</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from "@/components/Card";
export default {
  name: 'Field',
  components: {Card},
  data () {
    return {
      allCards: null,
      curCard: null,
      enterStake: null
    }
  },
  computed: {
    ...mapGetters('deck', {
      deck: 'getDeck'
    }),
    ...mapGetters('persons', {
      player: 'getPlayer',
      dealer: 'getDealer'
    }),
    ...mapGetters('game', {
      curTurn: 'getCurTurn',
      message: 'getMessage'
    })
  },
  methods: {
    ...mapActions('persons', {
      clearBoth: 'clearBoth',
      setStake: 'setStake',
      takeCard: 'takeCard'
    }),
    ...mapActions('game', {
      beginDispense: 'beginDispense',
      startRound: 'startRound',
      start: 'startGame',
      dealerTurn: 'dealerTurn',
      win3to2: 'win3to2',
      win1to1: 'win1to1',
      loseStake: 'loseStake',
      playerWantContinue: 'playerWantContinue',
      setMessage: 'createMessage'
    }),
    sendStake () {
      if(this.enterStake.replace(/[0-9]/g, '').trim().length > 0) {
        this.setMessage('Only numbers are allowed in this field!')
      } else if (this.enterStake < 100) {
        this.setMessage('The minimum stake is 100!')
      } else if (this.enterStake > this.player.money) {
        this.setMessage('You don\t have such amount of money')
      } else {
        this.setStake(this.enterStake)
        this.enterStake = 0
        this.beginDispense()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  &__table {
    display: flex;
    position: relative;
    width: 1000px;
    height: 700px;
    background: no-repeat url('https://img.freepik.com/free-vector/poker-table-background-green-color_47243-1068.jpg?size=664&ext=jpg');
    background-size: cover;
    font-family:  sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    color: green;
  }
  &__cardsum--player {
    position: absolute;
    left: 400px;
    top: 500px;
  }
  &__cardsum--dealer {
    position: absolute;
    left: 400px;
    top: 0;
  }
  &__stake {
    position: absolute;
    left: 400px;
    top: 550px;
  }
  &__money {
    position: absolute;
    left: 400px;
    top: 600px;
  }

  &__message {
    position: relative;
    display: flex;
    margin: auto;
  }

  &__controls {
    position: absolute;
    top: 500px;
    left: 800px;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  button {
    background: gold;
    border: 4px solid goldenrod;
    border-radius: 5px;
  }
}
</style>
