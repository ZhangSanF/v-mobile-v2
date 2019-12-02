<template>
  <div class="bet-kuaijie">
    <div class="bet-location" v-if="gameData && gameData.btopData">
      <grid :cols="5" :show-lr-borders="false" :show-vertical-dividers="true">
        <grid-item v-for="(item, index) of gameData.btopData" :key="index" @click.native="locationClick(item, index)">
          <span class="locationItem" :class="{selected: locationArray.indexOf(index) >= 0}">{{item.text}}</span>
        </grid-item>
      </grid>
    </div>
    <div class="bet-num" v-if="gameData && gameData.bdownData">
      <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="true">
        <grid-item v-for="(item, index) of gameData.bdownData" :key="index">
          <div
            class="bet"
            @click="numClick(item, index)"
            :class="[
            {checked: numsArray.indexOf(index) >= 0},
            codeClass, code + 'Img',
            /[0-9]+/.test(item.text) ? 'numBall' : 'textBall'
            ]"
          >
            <span class="name b" :class="'b' + item.text" v-if="code == 'cqssc' && /[0-9]+/.test(item.text)"></span>
            <span class="name ball" :class="'b' + item.text" v-else>{{item.text}}</span>
          </div>
        </grid-item>
      </grid>
    </div>

    <load-more v-else :tip="'正在加载'"></load-more>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import {Swiper, SwiperItem, Grid, GridItem, GroupTitle, LoadMore} from "vux";
  import {GAMES} from "@/config";

  export default {
    name: "BetKuaijie",
    components: {
      Swiper,
      SwiperItem,
      Grid,
      GridItem,
      GroupTitle,
      LoadMore
    },
    data() {
      return {
        locationArray: [],
        numsArray: [],
      };
    },
    methods: {
      locationClick(item, i) {
        let locIndex = i;
        let index = this.locationArray.indexOf(locIndex);
        if (index >= 0) {
          this.locationArray.splice(index, 1);
        } else {
          this.locationArray.push(locIndex);
        }
        this.numGroup();
      },
      numClick(item, i) {
        let numIndex = i;
        let index = this.numsArray.indexOf(numIndex);
        if (index >= 0) {
          this.numsArray.splice(index, 1);
        } else {
          this.numsArray.push(numIndex);
        }
        this.numGroup();
      },

      //生成注单
      numGroup() {
        this.$store.commit("DELETE_ALL_CHECKED_DATA");
        if (!this.locationArray.length || !this.numsArray.length) return;
        for (let i = 0; i < this.locationArray.length; i++) {
          for (let j = 0; j < this.numsArray.length; j++) {
            let top = this.gameData.btopData;
            let bot = this.gameData.bdownData;
            let id = bot[this.numsArray[j]].left + top[this.locationArray[i]].code + bot[this.numsArray[j]].right;
            this.$store.commit("SAVE_CHECKED", {
              uid: id.replace("@", ""),
              name: top[this.locationArray[i]].text + bot[this.numsArray[j]].text,
              odds: bot[this.numsArray[j]].odds,
              desc: top[this.locationArray[i]].text + bot[this.numsArray[j]].text,
              play: id,
              key: this.play,
            });
          }
        }
      },
    },
    mounted() {
      this.$store.commit("DELETE_ALL_CHECKED_DATA");
    },
    destroyed() {
      this.$store.commit("DELETE_ALL_CHECKED_DATA");
    },
    watch: {
      betOrders(n, o) {
        if(n.length < o.length && n.length === 0){
          this.locationArray = [];
          this.numsArray = [];
        }
      },
    },
    computed: {
      ...mapGetters(["gameData", "codeAndPlay", "betOrders"]),
      ...mapState(["code", "play", "openResult"]),
      codeType() {
        if (this.openResult && this.openResult[this.code]) {
          return this.openResult[this.code].code_type;
        }
      },
      codeClass() {
        if (this.code && GAMES) {
          return GAMES[this.code].class;
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .bet-kuaijie {
    padding-bottom: px2rem(50px);
    font-size: px2rem(24px);

    .weui-grid {
      padding: 0;
    }

    .bet-location {
      text-align: center;
      margin-bottom: px2rem(20px);
      padding: px2rem(8px);

      .weui-grids:before, .weui-grid:before {
        border: none;
      }

      .weui-grids:after, .weui-grid:after {
        border: none;
      }

      .weui-grid {
        margin-top: px2rem(8px);
        box-sizing: border-box;

        span {
          display: block;
          margin: px2rem(4px) px2rem(2px);
          padding: px2rem(8px) px2rem(2px);
          border: 1px solid #ccc;
          color: #555;
          box-sizing: border-box;
          border-radius: px2rem(8px);

          &.selected {
            background-color: #1d83d9;
            color: #fff;
            box-sizing: border-box;
            border: 1px solid #1d83d9;
          }
        }
      }
    }
  }

  h4 {
    text-align: center;
    color: #f45541;
    font-size: px2rem(16px);
  }

  .weui-grid {
    padding: px2rem(1px);
  }

  .bet {
    font-size: px2rem(24px);
    height: px2rem(92px);
    padding: px2rem(15px) 0;
    text-align: center;
    box-sizing: border-box;
    margin: px2rem(5px) 0 0 px2rem(5px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #555;
    line-height: px2rem(40px);

    &.numBall {

      .ball {
        font-weight: 600;
        width: 0.53333rem;
        height: 0.53333rem;
        display: inline-block;
        text-align: center;
        line-height: 0.53333rem;
        margin-right: 0.02667rem;
        padding: 0.01333rem;
        background: #51a4fb;
        color: #fff;
        border-radius: 50%;
      }

      &.checked {
        background-color: #60abf9;

        .ball {
          background-color: #fff;
          color: #60abf9;
        }
      }
    }

    &.textBall {
      font-weight: 600;
      color: #666;

      &.checked {
        background-color: #60abf9;

        .ball {
          background-color: #60abf9;
          color: #fff;
        }
      }
    }

    .odds {
      font-size: px2rem(24px);
      color: orange;
    }

  }

  .bjpk10 {
    .ball {
      width: px2rem(40px);
      height: px2rem(40px);
      border-radius: px2rem(4px) !important;
      display: inline-block;
      color: #555;
      text-align: center;
      line-height: px2rem(40px);
      margin-right: px2rem(2px);
      $i: 0;
      @each $color in (
          (
            #ffa300,
            #0089ff,
            #4b4b4b,
            #ff7300,
            #00a3a3,
            #5235ff,
            #8a8a8a,
            #ff0000,
            #760000,
            #04bf00
          )
      ) {
        $i: $i + 1;
        &.b#{$i} {
          background-color: $color;
          color: #fff;
        }
      }
    }
  }

  .cqsscImg {
    .b {
      width: px2rem(40px);
      height: px2rem(40px);
      display: inline-block;
      vertical-align: middle;
      background: url("../../../assets/images/cqsscBall.png");
      background-repeat: no-repeat;
      background-size: 100%;
    }

      .b0 {
        background-position: 0px 0;
      }
      .b1 {
        background-position: 0px px2rem(-40px);
      }
      .b2 {
        background-position: 0px px2rem(-80px);
      }
      .b3 {
        background-position: 0px px2rem(-120px);
      }
      .b4 {
        background-position: 0px px2rem(-160px);
      }
      .b5 {
        background-position: 0px px2rem(-200px);
      }
      .b6 {
        background-position: 0px px2rem(-240px);
      }
      .b7 {
        background-position: 0px px2rem(-280px);
      }
      .b8 {
        background-position: 0px px2rem(-320px);
      }
      .b9 {
        background-position: 0px px2rem(-360px);
      }
    }

</style>
