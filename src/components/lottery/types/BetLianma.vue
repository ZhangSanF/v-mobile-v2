<template>
  <div class="bet-lianma">

    <lma-radio :data="gamePlay" v-if="play == 'lma' || play == 'dma'" @lmaIndexChanged="lmaIndexChanged"></lma-radio>
    <lma-radio :data="tabData.hk6lxlw" v-if="play == 'lxlw'" @lmaIndexChanged="lxlwTabChange"></lma-radio>
    <p class="lma-odds" v-if="(play == 'lma' || play == 'dma') && playChecked">赔率: <span>{{playChecked.odds || '--'}}</span></p>
    <p class="lma-odds hx-odds" v-if="(play == 'hx' || play == 'zxbz' || play == 'zxsan' || play == 'zxliu') && hxPlayChecked">赔率: <span>{{hxPlayChecked.odds || '--'}}</span></p>
    <div class="bet-con" v-if="gameData && gameData.numbers">
        <grid :cols="cols(gameData.numbers, codeAndPlay)" :show-lr-borders="true" :show-vertical-dividers="true">
          <grid-item v-for="(item, index) of gameData.numbers" :key="index">
            <l-bet :item="item" :play="playChecked" :hxPlay="hxPlayChecked"></l-bet>
          </grid-item>
        </grid>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
import {Grid, GridItem} from 'vux'
import LmaRadio from './LmaRadio'
import LBet from './LBet'
  export default {
    name: 'BetLianma',
    components: {LmaRadio, LBet, Grid, GridItem},
    data() {
      return {
        odds: 0,
        lmaIndex: 0,
        tabData: {
          hk6lxlw: [
            {desc: '二连肖', ikey: 'lx2'},
            {desc: '三连肖', ikey: 'lx3'},
            {desc: '四连肖', ikey: 'lx4'},
            {desc: '五连肖', ikey: 'lx5'},
            {desc: '二连尾', ikey: 'lw2'},
            {desc: '三连尾', ikey: 'lw3'},
            {desc: '四连尾', ikey: 'lw4'},
            {desc: '五连尾', ikey: 'lw5'},
          ]
        }
      }
    },
    methods: {
      lxlwTabChange(t) {
        this.$store.commit('CHANGE_BET_HK6TAB', {key: this.codeAndPlay, value: this.tabData.hk6lxlw[t].ikey});
      },
      lmaIndexChanged(e) {
        this.lmaIndex = e;
      },
      cols(data, codeandplay) {
        switch(codeandplay) {
          case 'hk6lxlw':
          case 'xyhk6lxlw':
          case 'xyhk6hx':
          case 'hk6hx':
            return 2;
            break;

            default:
              var len = data.length;
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
    },
    computed: {
      ...mapState(['code', 'play', 'checkedData']),
      ...mapGetters(['gameData', 'codeAndPlay']),
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
      hxLmaIndex() {
        var checkedData = _.values(this.checkedData);
        if(this.play == 'zxbz'){
          return checkedData.length - 5;
        }else if(this.play == 'hx') {
          return checkedData.length - 2;
        }else if(this.play == 'zxliu') {
          return checkedData.length - 4;
        }else if(this.play == 'zxsan') {
          return checkedData.length - 5;
        }
      },
      hxPlayChecked() {
        if(this.hxLmaIndex >= 0){
          return this.gamePlay[this.hxLmaIndex];
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
  .bet-con {
    background-color: #fff;
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
  .hx-odds {
    padding-top: px2rem(10px);
  }

  .weui-grids:before, .weui-grid:before {
    border: none;
  }

  .weui-grids:after, .weui-grid:after {
    border: none;
  }
</style>
