<template>
  <div>
    <p>В руках игрока: {{ player.cards }}</p>
    <p>Сумма карт игрока: {{ player.cardSum }}</p>
    <p>В руках дилера: {{ dealer.cards }}</p>
    <p>Сумма карт дилера: {{ dealer.cardSum }}</p>
    <p>Ставка игрока: {{ player.stake }}</p>
    <p>Деньги игрока: {{ player.money }}</p>
<!--    <div @click="giveCardToPlayer">-->
<!--      <p>Выдать карту игроку</p>-->
<!--    </div>-->
<!--    <div @click="giveCardToDealer">-->
<!--      <p>Выдать карту дилеру</p>-->
<!--    </div>-->
<!--    <div @click="clearPlayerHands">-->
<!--      <p>Очистить руки игрока</p>-->
<!--    </div>-->
<!--    <div @click="clearDealerHands">-->
<!--      <p>Очистить руки дилера</p>-->
<!--    </div>-->
<!--    <div @click="clearBoth">-->
<!--      <p>Очистить всех</p>-->
<!--    </div>-->
<!--    <div @click="setStake">-->
<!--      <p>Поставить 100</p>-->
<!--    </div>-->
<!--    <div @click="win3to2">-->
<!--      <p>3 к 2</p>-->
<!--    </div>-->
<!--    <div @click="win1to1">-->
<!--      <p>1 к 1</p>-->
<!--    </div>-->
<!--    <div @click="loseStake">-->
<!--      <p>Проигрыш</p>-->
<!--    </div>-->
    <div>
      <button  v-if="curTurn === null" @click="start">
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
      <div v-if="curTurn === 'player'">
        <button @click="takeCard">
          <p>Взять карту</p>
        </button>
        <button @click="dealerTurn">
          <p>Закончить</p>
        </button>
      </div>
      <div v-if="message">
        <p>{{ message }}</p>
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
      player: 'getPlayer',
      dealer: 'getDealer',
      curTurn: 'getCurTurn',
      message: 'getMessage'
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
      startRound: 'startRound',
      takeCard: 'takeCard',
      dealerTurn: 'dealerTurn'
    }),
    sendStake () {
      this.setStake(this.enterStake)
      this.enterStake = 0
      this.beginDispense()
    }
  }
}
</script>
