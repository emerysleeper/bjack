<template>
  <div>
    <p>В руках игрока: {{ playerCards }}</p>
    <p>В руках дилера: {{ dealerCards }}</p>
    <p>Ставка игрока: {{ stake }}</p>
    <p>Деньги игрока: {{ money }}</p>
    <div @click="giveCardToPlayer">
      <p>Выдать карту игроку</p>
    </div>
    <div @click="giveCardToDealer">
      <p>Выдать карту дилеру</p>
    </div>
    <div @click="clearPlayerHands">
      <p>Очистить руки игрока</p>
    </div>
    <div @click="clearDealerHands">
      <p>Очистить руки дилера</p>
    </div>
    <div @click="clearBoth">
      <p>Очистить всех</p>
    </div>
    <div @click="setStake">
      <p>Поставить 100</p>
    </div>
    <div @click="win3to2">
      <p>3 к 2</p>
    </div>
    <div @click="win1to1">
      <p>1 к 1</p>
    </div>
    <div @click="loseStake">
      <p>Проигрыш</p>
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
      curCard: null
    }
  },
  computed: {
    ...mapGetters({
      playerCards: 'getPlayerCards',
      dealerCards: 'getDealerCards',
      stake: 'getStake',
      money: 'getPlayerMoney'
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
      loseStake: 'loseStake'
    })
  },
  created() {
    this.start()
  }
}
</script>
