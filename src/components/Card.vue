<template>
  <div>
    <transition name="card" mode="out-in">
      <div v-if="turned" class="card__front">
        <p>Обратная сторона</p>
      </div>
      <div v-else class="card__back">
        <p>Карта</p>
      </div>
    </transition>

  </div>

</template>

<script>
export default {
  name: 'Card',
  props: {
    turned: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>


<style lang="scss" scoped>
.card {
  width: 150px;
  height: 250px;
  border: 5px solid #b8b3a5;
  border-radius: 15px;

  &__front {
    background-color: red;
  }
  &__back {
    background-image: linear-gradient(-45deg, transparent 40%, rgba(255, 97, 94, .7) 41%, rgba(255, 97, 94, .7) 60%, transparent 61%), linear-gradient(135deg, rgba(255, 97, 94, .7) 10%, transparent 10%), linear-gradient(-45deg, rgba(255, 97, 94, .7) 10%, transparent 11%), linear-gradient(45deg, transparent 40%, #FFC45C 41%, #FFC45C 60%, transparent 61%), linear-gradient(45deg, #FFC45C 10%, transparent 11%), linear-gradient(-135deg, #FFC45C 10%, transparent 10%);
    background-color: #FCFAFB;
    background-size: 2em 2em;
  }
}

</style>
