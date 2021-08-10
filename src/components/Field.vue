<template>
  <div>
    <p>В руках игрока: {{ playerCards }}</p>
    <p>В руках дилера: {{ dealerCards }}</p>
    <div @click="giveCard">
      <p>Выдать карту игроку</p>
    </div>
    <div @click="giveCard">
      <p>Выдать карту дилеру</p>
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
      playerCards: 'getPlayerCards'
    })
  },
  methods: {
    ...mapActions({
      giveCard: 'giveCard'
    })
  }
}
</script>
