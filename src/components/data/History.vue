<template>
  <div class="pay">
    <scroll class="scroll" :data="listData" :pullup="true" @scrollToEnd="scrollEnd" :pulldown="true"
            @topRefresh="refresh">
      <p v-if="refreshLoading">
        <load-more :tip="'正在刷新数据'" v-if="refreshLoading"></load-more>
      </p>
      <div class="scrollContainer">
        <div class="item bg-public-deep-bgColor" v-for="(item, index) in listData" :key="'b' + index"
             v-if="listData.length" @click="showDetail(item)">
          <p class="head"><span>第{{item.open_phase}}期</span><span class="time">开奖时间: {{item.open_time}}</span></p>
          <div class="nums">
            <div v-if="codeClass == 'hk6'">
              <template v-for="(num,index) in item.result[0]">
                <!-- {{num}} -->
                <span :key="index" class="ball hk6-ball"
                      :class="hk6Color(code,num.split('@')[0])">{{num.split('@')[0]}}</span>
              </template>
            </div>
            <div v-else-if="code == 'bjkl8'">
              <div class="bjkl8BallContent">
                <span class="ball bjkl8-ball row1" v-for="(num,index) in item.result[0]" :key="index"
                      v-if="index<item.result[0].length/2">{{num}}</span><br>
                <span class="ball bjkl8-ball row1" v-for="(num,index) in item.result[0]" :key="index"
                      v-if="index>=item.result[0].length/2">{{num}}</span>
              </div>
            </div>
            <div v-else-if="code == 'cqssc'">
              <div class="cqsscBallContent">
                <span class="ball cqsscImg" :class="'cqssc'+num" v-for="(num,index) in item.result[0]"
                      :key="index"></span>
              </div>
            </div>
            <div v-else>
              <span v-for="(num,index) in item.result[0]" :key="index"
                    :class="codeClass + 'b' + num + ' ' + codeClass +'-ball ball'" v-text="codeClass=='jsk3' ? '' : num"
                    v-if="code != 'bjkl8' && code != 'hk6'"></span>
              <span class="ball pcdd-ball red-ball-pcdd" v-if="code=='pcdd'">{{item.result[5].join('')}}</span>
            </div>
          </div>
          <div class="result">
            <span v-for="(res, index) in item.result[0]" :key="'d' + index" v-if="codeClass == 'hk6'">
              <span class="text hk6Zodiac">{{hk6EtoC[res.split('@')[1]]}}</span>
            </span>
            <span v-for="(res, index) in item.result_detail" :key="'d' + index" v-if="codeClass == 'pk10nn'">
              <span class="text nnDetail" :class="{'nnWin': res.is_win != 0}">{{nnResult(res.result)}}</span>
            </span>
            <span v-for="(res, index) in resultCount(code, item.result[0])" :key="'c' + index"
                  v-if="codeClass != 'hk6' && codeClass != 'pk10nn'">
              <span class="text" v-for="(r, i) in res" :key="'a' + i">{{r}}</span>
            </span>

          </div>
        </div>
      </div>
      <p>
        <load-more :tip="'正在加载更多数据'" v-show="moreLoading"></load-more>
      </p>

    </scroll>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import {
    XHeader,
    Tab,
    TabItem,
    XTable,
    LoadMore,
    TransferDomDirective as TransferDom,
    Alert
  } from 'vux'
  import Scroll from '@/components/common/scroll'
  import {
    hk6Color, resultCount
  } from '@/methods'
  import {GAMES, hk6EtoC} from '@/config'

  export default {
    name: 'History',
    components: {
      XHeader,
      Tab,
      TabItem,
      XTable,
      Scroll,
      LoadMore,
      Alert
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        refreshLoading: false,
        moreLoading: true,
        type: 0,
        listData: [],
        page: 1,
        alertShow: false,
        showData: {},
        code: 'bjpk10',
        codeClass: '',
        hk6EtoC: '',
      }
    },
    methods: {
      ...mapActions(["homeIndexGetCodeResult"]),

      //牛牛结果计算
      nnResult(num) {
        if (num == 0) {
          return '无牛'
        }
        if (num == 10) {
          return '牛牛'
        }
        return `牛${num}`
      },

      // 香港六合彩波色
      hk6Color(code, num) {
        return hk6Color(code, num);
      },

      typeInit(e) {
        this.type = e;
        this.page = 1;
        this.listData = [];
      },
      getMoreData(e) {
        this.homeIndexGetCodeResult({
          page: this.page,
          code: this.code,
        })
          .then((res) => {
            this.moreLoading = false;
            this.refreshLoading = false;
            if (res.resCode === 1000) {
              console.log(res.data.data);

              if (res.data.data.length) {
                if (e) {
                  this.listData = res.data.data
                } else {
                  this.listData = [...this.listData, ...res.data.data];
                }
                this.page = parseInt(res.page) + 1;
              } else {
                this.$vux.toast.text('没有更多数据', 'center');
              }
            } else {
              this.$vux.toast.text('没有更多数据', 'center');
            }
          })
          .catch(err => {
            this.moreLoading = false;
            this.refreshLoading = false;
            this.$vux.toast.text(`${err}`, 'center')
          });
      },
      scrollEnd() {
        this.moreLoading = true;
        this.getMoreData();
      },
      showDetail(item) {
        this.showData = item;
        this.alertShow = true;
      },
      refresh() {
        this.refreshLoading = true;
        this.listData = [];
        this.page = 1;
        this.getMoreData(1);
      },
    },
    mounted() {
      setTimeout(() => {
        this.code = this.$route.query.code;
        this.codeClass = GAMES[this.code].class;
        this.hk6EtoC = hk6EtoC;
        this.typeInit('deposit');
        this.getMoreData();
        this.resultCount = resultCount;
      }, 20);
    },
    computed: {
      ...mapState(['user']),
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '@/assets/css/public.scss';

  .vux-header {
    background: $public-header-background-color;
  }

  .pay {
    background: #f0eff5;
    height: 100%;
    font-size: px2rem(24px);
    overflow: hidden;
  }

  p {
    padding: px2rem(12px) px2rem(38px);
    font-size: px2rem(24px);
    color: #b7a98f;
  }

  .timeTd {
    width: px2rem(192px);
  }

  .phaseTd {
    width: px2rem(192px);
  }

  .cqsscImg {
    width: px2rem(25px);
    height: px2rem(25px);
    display: inline-block;
    vertical-align: middle;
    background: url("../../assets/images/cqsscBall.png");
    background-repeat: no-repeat;
    background-size: 100%;

    &.cqssc0 {
      background-position: 0px px2rem(0);
    }

    &.cqssc1 {
      background-position: 0px px2rem(-25px);
    }

    &.cqssc2 {
      background-position: 0px px2rem(-50px);
    }

    &.cqssc3 {
      background-position: 0px px2rem(-75px);
    }

    &.cqssc4 {
      background-position: 0px px2rem(-100px);
    }

    &.cqssc5 {
      background-position: 0px px2rem(-125px);
    }

    &.cqssc6 {
      background-position: 0px px2rem(-150px);
    }

    &.cqssc7 {
      background-position: 0px px2rem(-175px);
    }

    &.cqssc8 {
      background-position: 0px px2rem(-200px);
    }

    &.cqssc9 {
      background-position: 0px px2rem(-225px);
    }

  }

  .scroll {
    position: absolute;
    top: px2rem(92px);
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .weui-loadmore {
    margin: 0;
    padding: px2rem(10px) 0;
    text-align: center;
    width: 100%;
  }

  .detailAlert {
    p {
      text-align: left;

      span {
        display: inline-block;
        height: 100%;
        width: auto;

        &:nth-of-type(1) {
          width: px2rem(64px);
        }
      }
    }
  }

  .vux-tab {
    height: px2rem(44px);

    .vux-tab-item {
      line-height: px2rem(44px);
    }
  }

  .vux-table {
    line-height: px2rem(22px);
    font-size: px2rem(24px);
  }

  .bjkl8BallContent {
    line-height: px2rem(20px);
  }

  .bjkl8Ball {
    display: inline-block;
    width: px2rem(16px);
    margin-right: px2rem(2px);
    line-height: px2rem(16px);
  }

  .openCodeWifth {
    width: px2rem(336px);
  }


  .ball {
    display: inline-block;
    font-size: px2rem(36px);
    color: #fff;
    text-align: center;
    line-height: px2rem(48px);
    margin-right: px2rem(8px);
    vertical-align: middle;
    /*font-weight: 200;*/
    /*font-weight: 600;*/

  }

  .bjpk10-ball,
  .pk10nn-ball {
    width: px2rem(48px);
    height: px2rem(48px);
    border-radius: px2rem(8px);
  }

  .bjpk10b2,
  .pk10nnb2 {
    background: #0089ff;
  }

  .bjpk10b1,
  .pk10nnb1 {
    background: #ffde52;
  }

  .bjpk10b3, .pk10nnb3 {
    background: #4b4b4b;
  }

  .bjpk10b4, .pk10nnb4 {
    background: #ff7300;
  }

  .bjpk10b5, .pk10nnb5 {
    background: #00a3a3;
  }

  .bjpk10b6, .pk10nnb6 {
    background: #5234ff;
  }

  .bjpk10b7, .pk10nnb7 {
    background: #8a8a8a;
  }

  .bjpk10b8, .pk10nnb8 {
    background: #ff0000;
  }

  .bjpk10b9, .pk10nnb9 {
    background: #760000;
  }

  .bjpk10b10, .pk10nnb10 {
    background: #04bf00;
  }

  .cqssc-ball {
    padding: px2rem(1px);
    width: px2rem(20px);
    height: px2rem(20px);
    line-height: px2rem(20px);
    border-radius: px2rem(16px);
    background: #fcfcfc;
    color: #d91d37;
    border-radius: 50%;
    margin-right: px2rem(2px);
    font-size: px2rem(16px);
    margin-right: px2rem(4px);
  }

  .jsk3-ball {
    width: px2rem(30px);
    height: px2rem(30px);
    zoom: 0.8;
  }

  .jsk3b1 {
    background-image: url("../../assets/images/jsk31.png");
    background-size: cover
  }

  .jsk3b2 {
    background-image: url("../../assets/images/jsk32.png");
    background-size: cover
  }

  .jsk3b3 {
    background-image: url("../../assets/images/jsk33.png");
    background-size: cover
  }

  .jsk3b4 {
    background-image: url("../../assets/images/jsk34.png");
    background-size: cover
  }

  .jsk3b5 {
    background-image: url("../../assets/images/jsk35.png");
    background-size: cover
  }

  .jsk3b6 {
    background-image: url("../../assets/images/jsk36.png");
    background-size: cover
  }

  .pcdd-ball,
  .cqklsf-ball {
    width: px2rem(25px);
    height: px2rem(25px);
    line-height: px2rem(25px);
    border-radius: px2rem(16px);
    background: #fcfcfc;
    box-shadow: 1px 1px 3px 0px #c7c7c7;
    color: #d91d37;
    font-size: px2rem(14px);
    margin-right: px2rem(4px);
  }

  .red-ball-pcdd {
    background: #ff4c1e;
    color: #fff;
  }

  .gd11x5-ball,
  .bjkl8-ball {
    width: px2rem(25px);
    height: px2rem(25px);
    border-radius: 4px;
    line-height: px2rem(25px);
    font-size: px2rem(14px);
    margin-right: px2rem(4px);
    background: #fcfcfc;
    box-shadow: 1px 1px 3px 0px #c7c7c7;
    color: #d91d37;
    border-radius: 50%;
    margin-right: px2rem(2px);
  }

  .hk6-ball {
    color: #000;
    width: px2rem(26px);
    height: px2rem(26px);
    line-height: px2rem(26px);
    border-radius: px2rem(16px);
    background: #fcfcfc;
    box-shadow: 1px 1px 3px 0px #c7c7c7;
    color: #d91d37;
    box-sizing: border-box;
    font-size: px2rem(24px);
  }

  .hk6-ball-last {
    background: #ff4c1e;
    color: #fff;
  }

  .red-ball-hk6 {
    background: #ff4c1e;
    width: px2rem(26px);
    height: px2rem(26px);
    line-height: px2rem(18px);
    border: 3px solid #ff4c1e;
  }

  .red {
    color: #fff;
    background: #ff5b71;
  }

  .blue {
    color: #fff;
    background: #0094f3;
  }

  .green {
    color: #fff;
    background: #429f31;
  }

  .timeTd {
    .phase {
      color: #fd304c;
    }

    .time {
      color: #555;
    }
  }

  .scrollContainer {
    padding: px2rem(6px);

    .item {
      border-bottom: 1px solid #eee;
      padding: px2rem(20px) 0;

      .head {
        color: #555;
        padding: px2rem(6px) px2rem(32px) 0 px2rem(16px);

        .time {
          float: right;
        }
      }

      .nums {
        padding: px2rem(6px) 0 px2rem(3px) px2rem(16px);
      }

      .result {
        padding: px2rem(10px) 0 px2rem(6px) px2rem(14px);

        .text {
          border: 1px solid #e4e4e4;
          border-radius: 0.05333rem;
          color: #88bbf1;
          display: inline-block;
          height: px2rem(19px);
          line-height: px2rem(19px);
          margin: 0 px2rem(3px);
          text-align: center;
          padding: px2rem(4px) px2rem(6px);
        }

        .hk6Zodiac {
          margin-right: px2rem(4px);
        }

        .nnDetail {
          /*width: px2rem(50px);*/
          padding: px2rem(8px) px2rem(12px);
        }

        .nnWin {
          background-color: orange;
          color: #fff;
          border-color: orange;
        }
      }
    }
  }


  .codes {
    height: px2rem(80px);
    line-height: px2rem(80px);
    vertical-align: middle;
  }

  .ball {
    display: inline-block;
    font-size: px2rem(28px);
    color: #fff;
    text-align: center;
    line-height: px2rem(40px);
    height: px2rem(40px);
    width: px2rem(40px);
    margin-right: px2rem(10px);
    font-weight: 400;
  }

  .bjpk10-ball,
  .jssc-ball,
  .jsnn-ball,
  .pk10nn-ball {
    border-radius: px2rem(4px);
  }

  .pk10nnb1,
  .jsnnb1,
  .bjpk10b2,
  .jsscb2,
  .mlaftb2,
  .jsftb2 {
    background: #0089ff;
  }

  .pk10nnb2,
  .jsnnb2,
  .bjpk10b1,
  .jsscb1,
  .mlaftb1,
  .jsftb1 {
    background: #ffa300;
  }

  .pk10nnb3,
  .jsnnb3,
  .bjpk10b3,
  .jsscb3,
  .mlaftb3,
  .jsftb3 {
    background: #4b4b4b;
  }

  .pk10nnb4,
  .jsnnb4,
  .bjpk10b4,
  .jsscb4,
  .mlaftb4,
  .jsftb4 {
    background: #ff7300;
  }

  .pk10nnb5,
  .jsnnb5,
  .bjpk10b5,
  .jsscb5,
  .mlaftb5,
  .jsftb5 {
    background: #00a3a3;
  }

  .pk10nnb6,
  .jsnnb6,
  .bjpk10b6,
  .jsscb6,
  .mlaftb6,
  .jsftb6 {
    background: #5235ff;
  }

  .pk10nnb7,
  .jsnnb7,
  .bjpk10b7,
  .jsscb7,
  .mlaftb7,
  .jsftb7 {
    background: #8a8a8a;
  }

  .pk10nnb8,
  .jsnnb8,
  .bjpk10b8,
  .jsscb8,
  .mlaftb8,
  .jsftb8 {
    background: #ff0000;
  }

  .pk10nnb9,
  .jsnnb9,
  .bjpk10b9,
  .jsscb9,
  .mlaftb9,
  .jsftb9 {
    background: #760000;
  }

  .pk10nnb10,
  .jsnnb10,
  .bjpk10b10,
  .jsscb10,
  .mlaftb10,
  .jsftb10 {
    background: #04bf00;
  }

  .mlaft-ball,
  .jsft-ball {
    border-radius: px2rem(16px);
  }

  .cqssc-ball,
  .jsssc-ball,
  .tjssc-ball,
  .xjssc-ball {
    padding: px2rem(1px);
    width: px2rem(40px);
    height: px2rem(40px);
    line-height: px2rem(40px);
    border-radius: px2rem(16px);
    color: #fff;
    background-color: #FF3C00;
    border-radius: 50%;
    margin-right: px2rem(10px);
  }

  .jsk3-ball {
    width: px2rem(40px);
    height: px2rem(40px);
    zoom: 0.8;
  }

  .jsk3b1 {
    background-image: url("../../assets/images/jsk31.png");
    background-size: cover;
  }

  .jsk3b2 {
    background-image: url("../../assets/images/jsk32.png");
    background-size: cover;
  }

  .jsk3b3 {
    background-image: url("../../assets/images/jsk33.png");
    background-size: cover;
  }

  .jsk3b4 {
    background-image: url("../../assets/images/jsk34.png");
    background-size: cover;
  }

  .jsk3b5 {
    background-image: url("../../assets/images/jsk35.png");
    background-size: cover;
  }

  .jsk3b6 {
    background-image: url("../../assets/images/jsk36.png");
    background-size: cover;
  }

  .cqsscImg {
    width: px2rem(40px);
    height: px2rem(40px);
    display: inline-block;
    vertical-align: middle;
    background: url("../../assets/images/cqsscBall.png");
    background-repeat: no-repeat;
    background-size: 100%;

    &.cqssc0 {
      background-position: 0px px2rem(0);
    }

    &.cqssc1 {
      background-position: 0px px2rem(-40px);
    }

    &.cqssc2 {
      background-position: 0px px2rem(-80px);
    }

    &.cqssc3 {
      background-position: 0px px2rem(-120px);
    }

    &.cqssc4 {
      background-position: 0px px2rem(-160px);
    }

    &.cqssc5 {
      background-position: 0px px2rem(-200px);
    }

    &.cqssc6 {
      background-position: 0px px2rem(-240px);
    }

    &.cqssc7 {
      background-position: 0px px2rem(-280px);
    }

    &.cqssc8 {
      background-position: 0px px2rem(-320px);
    }

    &.cqssc9 {
      background-position: 0px px2rem(-360px);
    }

  }

  .pcdd-ball,
  .cqklsf-ball {
    border-radius: 50%;
    color: #d91d37;
    margin-right: px2rem(4px);
  }

  .red-ball-pcdd {
    background: #ff4c1e;
    color: #fff;
  }

  .gd11x5-ball,
  .gdklsf-ball {
    color: #fff;
    background-color: #FF3C00;
    border-radius: 50%;
    margin-right: px2rem(10px);
  }

  .hk6-ball {
    border-radius: px2rem(40px);
    color: #d91d37;
    box-sizing: border-box;
  }

  .red-ball-hk6 {
    background: #ff4c1e;
    border: 1px solid #ff4c1e;
  }

  .red {
    color: #fff;
    background: #ff5b71;
  }

  .blue {
    color: #fff;
    background: #0094f3;
  }

  .green {
    color: #fff;
    background: #429f31;
  }

  .bjkl8-row {
    line-height: px2rem(40px);
  }

  .bjkl8-ball {
    position: relative;
    margin-top: px2rem(2px);
    border-radius: px2rem(40px);
    font-weight: 400;
    color: #fff;
    background-color: #FF3C00;
    width: px2rem(36px);
    height: px2rem(36px);
    line-height: px2rem(36px);
    font-size: px2rem(26px);
    zoom: 0.7;
  }

</style>
