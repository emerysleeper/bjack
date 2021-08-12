<template>
  <div>
    <p>В руках игрока: {{ playerCards }}</p>
    <p>Сумма карт игрока: {{ playerSum }}</p>
    <p>В руках дилера: {{ dealerCards }}</p>
    <p>Сумма карт дилера: {{ dealerSum }}</p>
    <p>Ставка игрока: {{ stake }}</p>
    <p>Деньги игрока: {{ money }}</p>
    <div @click="giveCardToPlayer">
      <p>Выдать карту игроку</p>
    </div>
    <div @click="giveCardToDealer">
      <p>Выдать карту дилеру</p>
    </div>
<!--    <div @click="clearPlayerHands">-->
<!--      <p>Очистить руки игрока</p>-->
<!--    </div>-->
<!--    <div @click="clearDealerHands">-->
<!--      <p>Очистить руки дилера</p>-->
<!--    </div>-->
    <div @click="clearBoth">
      <p>Очистить всех</p>
    </div>
<!--    <div @click="setStake">-->
<!--      <p>Поставить 100</p>-->
<!--    </div>-->
    <div @click="win3to2">
      <p>3 к 2</p>
    </div>
    <div @click="win1to1">
      <p>1 к 1</p>
    </div>
    <div @click="loseStake">
      <p>Проигрыш</p>
    </div>
    <div>
      <button @click="start">
        <p>Начать игру</p>
      </button>
      <button v-if="curTurn === 'end'" @click="startRound">
        <p>Начать ход</p>
      </button>
      <div v-if="curTurn === 'stake'">
        <input placeholder="Введите ставку" v-model="enterStake" />
        <button @click="sendStake">
          <p>Поставить</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Field',
  data () {
    return {
      allCards: null,
      curCard: null,
      enterStake: null
    }
  },
  computed: {
    ...mapGetters({
      playerCards: 'getPlayerCards',
      dealerCards: 'getDealerCards',
      stake: 'getStake',
      money: 'getPlayerMoney',
      curTurn: 'getCurTurn'
    })
  },
  methods: {
    ...mapActions({
      giveCardToPlayer: 'giveCardToPlayer',
      giveCardToDealer: 'giveCardToDealer',
      start: 'startGame',
      clearPlayerHands: 'clearPlayerHands',
      clearDealerHands: 'clearDealerHands',
      clearBoth: 'clearBoth',
      setStake: 'setStake',
      win3to2: 'win3to2',
      win1to1: 'win1to1',
      loseStake: 'loseStake',
      beginDispense: 'beginDispense',
      startRound: 'startRound'
    }),
    sendStake () {
      this.setStake(this.enterStake)
      this.enterStake = 0
      this.beginDispense()
    }
  }
}
</script>
