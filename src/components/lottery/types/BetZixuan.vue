<template>
  <div class="bet-lianma">

    <lma-radio :data="gamePlay" v-if="play == 'zix'" @lmaIndexChanged="lmaIndexChanged"></lma-radio>

    <p class="lma-odds" v-if="(play == 'zix') && playChecked">赔率: <span>{{playChecked.odds || '--'}}</span></p>
    
    <div class="bet-con" v-if="gameData && gameData.numbers">
        <grid :cols="cols(gameData.numbers.length)" :show-lr-borders="true" :show-vertical-dividers="true">
          <grid-item v-for="(item, index) of gameData.numbers" :key="index">
            <div class="bet" @click="betClick" :class="{checked: isChecked}">
              <span class="name">{{item}}</span>
            </div>
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
    name: 'BetZixuan',
    components: {LmaRadio, LBet, Grid, GridItem},
    data() {
      return {
        odds: 0,
        lmaIndex: 0,
        tabData: {
          hk6lxlw: [
            {name: '二连肖', ikey: 'LX2'},
            {name: '三连肖', ikey: 'LX3'},
            {name: '四连肖', ikey: 'LX4'},
            {name: '五连肖', ikey: 'LX5'},
            {name: '二连尾', ikey: 'LW2'},
            {name: '三连尾', ikey: 'LW3'},
            {name: '四连尾', ikey: 'LW4'},
            {name: '五连尾', ikey: 'LW5'},
          ]
        }
      }
    },

    methods: {
      lxlwTabChange(t) {
        this.$store.commit('CHANGE_BET_HK6TAB', {key: 'hk6LxlwTab', value: t});
      },
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
    padding: 0;
    text-align: center;
  }
  .weui-grids:before,.weui-grids:after,.weui-grid:after,.weui-grid:before {
    // border-color: #5fa1ca !important;
  }
  .bet-con {
    padding: px2rem(6px) 0;
  }
  .lma-odds {
    text-align: center;
    font-size: px2rem(14px);
    font-weight: 600;
    color: #666;
    height: px2rem(22px);
    line-height: px2rem(22px);
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
