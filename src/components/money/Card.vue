<template>
  <div class="pay">
    <x-header :left-options="{backText: ''}" class="header">银行卡管理</x-header>
    <bank-card-info></bank-card-info>
    <p class="font-light-color">以上是您的银行卡信息，如有疑问请联系客服处理！</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {XHeader} from 'vux'
  import BankCardInfo from './BankCardInfo'
  export default {
    name: 'Draw',
    components: {XHeader, BankCardInfo},
    computed: {
      ...mapState(['user']),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  
  .pay {
    height: 100%;
    background-color: #001847;
  }
  .header{
    background-color: #001847;
  }
  p {
    padding: 0 px2rem(40px);
    font-size: px2rem(24px);
    color: #b7a98f;
  }
</style>
