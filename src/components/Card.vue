<template>
  <div
      class="card"
      :class="{'card--animated': place !== 'deck'}"
      :style="{top: posTop + 'px', left: posLeft + 'px'}"
  >
    <!--Transition allowed to animate turning the card, in case you needed such thing; -->
    <!-- Sadly, currently it leads to an animation bug; -->
<!--    <transition name="card" mode="out-in">-->
<!--      <div v-if="turned" :key="'front'" class="card__front">-->
<!--        <p>{{ values[card.value] }} {{ suits[card.suit] }}</p>-->
<!--      </div>-->
<!--      <div v-else :key="'back'" class="card__back">-->
<!--      </div>-->
<!--    </transition>    -->
      <div v-if="turned" :key="'front'" class="card__front">
        <p>{{ values[card.value] }} {{ suits[card.suit] }}</p>
      </div>
      <div v-else :key="'back'" class="card__back">
      </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    turned: {
      type: Boolean,
      required: false,
      default: true
    },
    card: {
      type: Object,
      required: true
    },
    cardNum: {
      type: Number,
      required: true
    },
    place: {
      type: String,
      required: false,
      default: 'deck'
    },
    discarded: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      posTop: 50,
      posLeft: 800,
      suits: [
        "Пик",
        "Червей",
        "Крести",
        "Бубен"
      ],
      values: [
        "Туз",
        "Двойка",
        "Тройка",
        "Четверка",
        "Пятерка",
        "Шестерка",
        "Семерка",
        "Восьмерка",
        "Девятка",
        "Десятка",
        "Валет",
        "Дама",
        "Король"
      ]
    }
  },
  watch: {
    discarded (newVal) {
      if (newVal === true) {
        setTimeout(() => {
          this.posTop = -500
          this.posLeft = 50
        }, 100)
      }
    },
    place (newVal) {
      if (newVal !== 'deck') {
        if (this.place === 'player') {
          this.posTop = 400
          this.posLeft = 50 + this.cardNum * 150
        } else {
          this.posTop = 50
          this.posLeft = 50 + this.cardNum * 150
        }
      }
    }
  },
  created() {
    setTimeout(() => {
      if (this.place === 'player') {
        this.posTop = 400
        this.posLeft = 50 + this.cardNum * 150
      } else if (this.place === 'deck') {
        this.posTop = 50 + this.cardNum
        this.posLeft = 700 + this.cardNum
      } else {
        this.posLeft = 50 + this.cardNum * 150
      }
    }, 100)
  },
}
</script>


<style lang="scss" scoped>
.card {
  width: 160px;
  height: 260px;
  display: flex;
  position: absolute;


  &__front {
    background-color: white;
    height: 100%;
    width: 100%;
    border: 1px solid #b8b3a5;
    border-radius: 15px;
    color: black;
  }
  &__back {
    background-image: linear-gradient(-45deg, transparent 40%, rgba(255, 97, 94, .7) 41%, rgba(255, 97, 94, .7) 60%, transparent 61%), linear-gradient(135deg, rgba(255, 97, 94, .7) 10%, transparent 10%), linear-gradient(-45deg, rgba(255, 97, 94, .7) 10%, transparent 11%), linear-gradient(45deg, transparent 40%, #FFC45C 41%, #FFC45C 60%, transparent 61%), linear-gradient(45deg, #FFC45C 10%, transparent 11%), linear-gradient(-135deg, #FFC45C 10%, transparent 10%);
    background-color: #FCFAFB;
    background-size: 2em 2em;
    height: 100%;
    width: 100%;
    border: 1px solid #b8b3a5;
    border-radius: 15px;
  }

  &--animated {
    transition: all 0.4s ease-in-out;
    transition-delay: 0.3s;
  }
}

.card-leave-active,
.card-enter-active {
  transition: transform 0.4s linear;
  transform-origin: 50% 50%;
}

.card-leave-to {
  transform: rotateY(90deg);
}

.card-enter {
  transform: rotateY(-90deg);
}

.card-enter-to {
  transform: rotateY(0);
}

</style>
