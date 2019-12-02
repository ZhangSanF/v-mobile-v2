<template>
  <div class="bet-normal">
    <lma-radio
      :data="tabData[codeAndPlay]"
      v-if="codeAndPlay == 'hk6tm' ||  codeAndPlay == 'hk6zmt' ||  codeAndPlay == 'fc3dezhs'"
      @lmaIndexChanged="lmaIndexChanged"
    ></lma-radio>
    <div class="bet-con" v-if="gameData">
      <div
        :class="['table-item', code+play+index, play+index, code+play]"
        v-for="(datas, index) of gameData"
        :key="index"
      >
        <h4 v-show="datas.title">{{datas.title || ''}}</h4>
        <grid :cols="cols(datas.data, index)" :show-lr-borders="false" :show-vertical-dividers="true">
          <grid-item v-for="(item, index) of datas.data" :key="index">
            <bet :item="item"></bet>
          </grid-item>
        </grid>
      </div>
    </div>

    <load-more v-else :tip="'正在加载'"></load-more>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import {Swiper, SwiperItem, Grid, GridItem, GroupTitle, LoadMore} from "vux";
  import Bet from "./Bet";
  import LmaRadio from "./LmaRadio";

  export default {
    name: "BetNormal",
    components: {
      Swiper,
      SwiperItem,
      Grid,
      GridItem,
      GroupTitle,
      LoadMore,
      Bet,
      LmaRadio
    },
    data() {
      return {
        tabData: {
          fc3dezhs: [
            {desc: "佰拾", ikey: "bs"},
            {desc: "佰个", ikey: "bg"},
            {desc: "拾个", ikey: "sg"}
          ],
          hk6tm: [{desc: "特码A", ikey: "tma"}, {desc: "特码B", ikey: "tmb"}],
          hk6zmt: [
            {desc: "正一特", ikey: "zm1"},
            {desc: "正二特", ikey: "zm2"},
            {desc: "正三特", ikey: "zm3"},
            {desc: "正四特", ikey: "zm4"},
            {desc: "正五特", ikey: "zm5"},
            {desc: "正六特", ikey: "zm6"}
          ],
          hk6yx: [{desc: "一肖", ikey: "yx"}, {desc: "尾数", ikey: "ws"}]
        },
        lmaIndex: 0
      };
    },
    methods: {
      lmaIndexChanged(t) {
        this.lmaIndex = t;
        var v = this.tabData[this.codeAndPlay][t];
        this.$store.commit("CHANGE_BET_HK6TAB", {
          key: this.codeAndPlay,
          value: v.ikey
        });
      },
      cols(data, key) {
        var type = this.codeType + this.play + key;

        switch (this.codeAndPlay) {
          case "gdklsflm":
          case "cqklsflm":
            return 2;
            break;

          default:
            switch (type) {
              case "klsflmsum":
              case "klsfzmasum":

              case "11x5lmsum":

              case "hk6lmlm":
              case "hk6sbbb":
              case "hk6sbbbb":
              case "hk6zmtzml":
              case "hk6zoxzox":
              case "hk6zm16b0":
              case "hk6zm16b1":
              case "hk6zm16b2":
              case "hk6zm16b3":
              case "hk6zm16b4":
              case "hk6zm16b5":

              case "pcddsbwsum":

                return 4;
                break;

              case "fc3dzhuezl12":
              case "fc3dzhuezl13":
              case "fc3dzhuezl23":
              case "fast3slhslh":
              case "fast3sthsth":
                return 2;
                break;

              default:
                var len = data.length;
                if (len === 4) {
                  return 4;
                }
                if (len === 5) {
                  return 5;
                }
                if (len === 10 || len === 14 || len === 7 || len === 13) {
                  return 5;
                }
                if (len === 20) {
                  return 3;
                }
                if (len % 4 === 0) {
                  return 4;
                }
                if (len % 3 === 0) {
                  return 3;
                } else {
                  return 4;
                }
            }
        }
      }
    },
    computed: {
      ...mapGetters(["gameData", "codeAndPlay"]),
      ...mapState(["code", "play", "openResult"]),
      codeType() {
        if (this.openResult && this.openResult[this.code]) {
          return this.openResult[this.code].code_type;
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .bet-normal {
    padding-bottom: px2rem(50px);
  }

  .tab_title02 {
    a {
      cursor: pointer;
    }
  }

  .lma-radio {
    height: px2rem(60px);
    line-height: px2rem(60px);

    /deep/ .vux-tab-container {
      line-height: px2rem(60px) !important;
      height: px2rem(60px) !important;

      .vux-tab-item {
        line-height: px2rem(60px) !important;
        height: px2rem(60px) !important;
        background-color: #dfdfdf !important;;
        color: #666 !important;;
        font-size: px2rem(28px) !important;;
      }

      .vux-tab-selected {
        background-color: #fff !important;;
        color: #3a63aa !important;;
      }
    }
  }

  .table-item {
    text-align: center;

    h4 {
      text-align: center;
      font-size: px2rem(28px);
      line-height: px2rem(60px);
      height: px2rem(60px);
      color: #51a4fb;
      background-color: #fff;
    }

    .weui-grid {
      padding: px2rem(1px);
      box-sizing: border-box;
    }
  }

  .bet-con {
    background-color: #fff;
    /*border-bottom: 1px solid #ddd;*/
  }

  .weui-grids:before, .weui-grid:before {
    border: none;
  }

  .weui-grids:after, .weui-grid:after {
    border: none;
  }
</style>
