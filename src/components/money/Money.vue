<template>
  <div class="money">
      <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Money',
    data () {
      return {
          msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: {
      ...mapState(['user']),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .money {
    height: 100%;
  }
  
</style>
