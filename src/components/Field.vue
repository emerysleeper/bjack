<template>
  <div class="field">
    <h1>Визуальное отображение</h1>
    <div class="field__table">
      <Card />
    </div>
    <div>
      <h1>Текстовое отображение происходящего</h1>
      <p>В руках игрока: {{ player.cards }}</p>
      <p>Сумма карт игрока: {{ player.cardSum }}</p>
      <p>В руках дилера: {{ dealer.cards }}</p>
      <p>Сумма карт дилера: {{ dealer.cardSum }}</p>
      <p>Ставка игрока: {{ player.stake }}</p>
      <p>Деньги игрока: {{ player.money }}</p>
      <div>
        <button  v-if="curTurn === null" @click="start">
          <p>Начать игру</p>
        </button>
        <button v-if="curTurn === 'end'" @click="startRound">
          <p>Начать ход</p>
        </button>
        <div v-if="curTurn === 'chooseBlackJack'">
          <button @click="win1to1">
            <p>Взять выигрыш 1 к 1</p>
          </button>
          <button @click="playerWantContinue">
            <p>Продолжить играть</p>
          </button>
        </div>
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
      playerWantContinue: 'playerWantContinue'
    }),
    sendStake () {
      if(this.enterStake.replace(/[0-9]/g, '').trim().length > 0) {
        alert('Поле должно содержать только число! ')
      } else if (this.enterStake < 100) {
        alert('Слишком маленькая ставка!')
      } else if (this.enterStake > this.player.money) {
        alert('У вас нет такой суммы')
      } else {
        this.setStake(this.enterStake)
        this.enterStake = 0
        this.beginDispense()
      }
    }
  }
}
</script>
