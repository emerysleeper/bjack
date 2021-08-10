<template>
  <div>
    <p>Вам выдана {{ curCard }}</p>
    <div @click="giveCard">
      <p>Выдать карту</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Field',
  data () {
    return {
      allCards: null,
      curCard: null
    }
  },
  methods: {
    giveCard () {
      this.curCard = this.randomCard()
    },
    randomCard() {
      if(Math.floor(Math.random() * 54) < 2) {
        return 'Joker'
      } else {
        const suit = Math.floor(Math.random()*4)
        const cardValue = Math.floor(Math.random()*13)
        return [suit, cardValue]

      }
    }
  }
  // created () {
  //   const fullDeck = []
  //   for (let suit in 4) {
  //     for (let val in )
  //   }
  // }
}
</script>
