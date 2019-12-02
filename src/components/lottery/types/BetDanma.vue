<template>
  <div class="bet-lianma">

    <lma-radio :data="gamePlay" v-if="play == 'lma' || play == 'dma'" @lmaIndexChanged="lmaIndexChanged"></lma-radio>

    <p class="lma-odds" v-if="(play == 'lma' || play == 'dma') && playChecked">赔率: <span>{{playChecked.odds || '--'}}</span></p>
    <div class="bet-con" v-if="gameData && gameData.numbers">
        <grid :cols="cols(gameData.numbers.length)" :show-lr-borders="true" :show-vertical-dividers="true">
          <grid-item v-for="(item, index) of gameData.numbers" :key="index">
            <d-bet :item="item" :play="playChecked"></d-bet>
          </grid-item>
        </grid>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
import {Grid, GridItem} from 'vux'
import LmaRadio from './LmaRadio'
import DBet from './DBet'
  export default {
    name: 'BetDanma',
    components: {LmaRadio, DBet, Grid, GridItem},
    data() {
      return {
        odds: 0,
        lmaIndex: 0,
      }
    },

    methods: {
      lmaIndexChanged(e) {
        this.lmaIndex = e;
      }
    },
    methods: {
      lmaIndexChanged(e) {
        this.lmaIndex = e;
      },
      cols(len) {
        if(len == 4){
          return 2;
        }
        if(len % 4 == 0){
          return 4;
        }
        if(len % 3 == 0){
          return 3;
        }
        else{
          return 3
        }
      }
    },
    computed: {
      ...mapState(['code', 'play', 'codeAndPlay']),
      ...mapGetters(['gameData']),
      gamePlay() {
        if(this.gameData && this.gameData.play){
          return this.gameData.play;
        }
      },
      playChecked() {
        if(this.gamePlay){
          return this.gamePlay[this.lmaIndex];
        }
      },
    }
  }


</script>

<style lang="scss" scoped>
  .tab_title02 {
    a {
      cursor: pointer;
    }
  }
  .weui-grid {
    padding: px2rem(1px);
    text-align: center;
  }

  .bet-con {
    background-color: #fff;
  }
  
  .lma-radio{
    height: px2rem(60px);
    line-height: px2rem(60px);
    /deep/ .vux-tab-container{
      line-height: px2rem(60px) !important;
      height: px2rem(60px) !important;
      .vux-tab-item{
        line-height: px2rem(60px) !important;
        height: px2rem(60px) !important;
        background-color: #dfdfdf !important;;
        color: #666 !important;;
        font-size: px2rem(28px) !important;;
      }
      .vux-tab-selected{
        background-color: #fff !important;;
        color: #3a63aa !important;;
      }
    }
  }
  .lma-odds {
    text-align: center;
    font-size: px2rem(28px);
    font-weight: 600;
    color: #60abf9;
    height: px2rem(60px);
    background-color: #fff;
    line-height: px2rem(60px);
    span {
      color: orangered;
    }
  }

  .weui-grids:before, .weui-grid:before {
    border: none;
  }

  .weui-grids:after, .weui-grid:after {
    border: none;
  }
</style>
