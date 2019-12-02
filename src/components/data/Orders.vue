<template>
  <div class="info">
    <x-header :left-options="{backText: ''}">今日已结</x-header>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {XHeader} from 'vux'
  export default {
    name: 'Orders',
    components: {XHeader},
    computed: {
      ...mapState(['user']),
    }
  }
</script>

<style scoped lang="scss">  
  @import '@/assets/css/public.scss';
  .vux-header {
    background: $public-header-background-color;
  }
  
</style>
