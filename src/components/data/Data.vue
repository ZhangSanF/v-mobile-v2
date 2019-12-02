<template>
  <div class="data">
    <x-header :left-options="{backText: ''}" class="public-header-background-color public-header-boxShadow">
      <div class="header-content">
        <button-tab>
          <button-tab-item :selected="page=='History'" @click.native="toPage('History')">开奖结果</button-tab-item>
          <button-tab-item :selected="page=='DraDew'" @click.native="toPage('DraDew')">露珠长龙</button-tab-item>
          <button-tab-item :selected="page=='Rules'" @click.native="toPage('Rules')">游戏规则</button-tab-item>
        </button-tab>
      </div>
    </x-header>
    <div class="container" :is="page">

    </div>
    
  </div>
</template>

<script>
  import {XHeader, ButtonTab, ButtonTabItem} from 'vux'
  import DraDew from './DraDew'
  import History from './History'
  import Rules from './Rules'
  import { setTimeout } from 'timers';
  export default {
    name: 'Data',
    components: {XHeader, ButtonTab, ButtonTabItem, DraDew, History, Rules},
    data() {
      return {
        page: 'History',
        code: 'bjpk10',
      }
    },
    mounted() {
      setTimeout(() => {
        this.page = this.$route.query.page;
        this.code = this.$route.query.code;
      }, 20);
    },
    methods: {
      toPage(e) {
        this.page = e;
      }
    },
  }
</script>

<style scoped lang="scss">  
  @import '@/assets/css/public.scss';
  .vux-header {
    // background: $public-header-background-color;
    /deep/ .vux-header-title {
      margin: 0 px2rem(100px);
      .header-content {
        padding: px2rem(8px) 0;
        box-sizing: border-box;
        .vux-button-group > a {
          font-size: px2rem(24px);
          &.vux-button-group-current {
            font-weight: 600;
            color: #51a4fb;
            background: #ffffff;
          }
        }
      }
    }
  }
  .data {
    font-size: px2rem(24px);
  }
</style>
