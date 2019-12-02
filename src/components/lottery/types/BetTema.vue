<template>
  <div class="bet-tema">
    <template v-for="(data, key, index) of gameData" >
      <bet-content v-if="key == 'hk6lm'" :data="data" :key="index"></bet-content>
    </template>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex';
  export default {
    name: 'BetTema',
    components: {},
    computed: {
      ...mapGetters(['gameData']),
      ...mapState(['code', 'play',]),

    }
  }

</script>

<style lang="scss" scoped>

</style>
