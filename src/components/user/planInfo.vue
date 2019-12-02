<!-- 计划 -->
<template>
  <div class="plan-info">
    <x-header :left-options="{backText: ''}" class="header">计划详情
      <span class="openRightCodeMenu" @click="rightMenuOpen = true">{{openResult[code].name}}</span>
    </x-header>
    <div class="tab"
         v-show="!isLoadingData && planData.expert_forecast_data_list && planData.expert_forecast_data_list.length > 0">
      <p class="location" @click="location = item.location" v-for="(item, index) in planData.location" :key="index"
         :class="item.location == location ? 'active' : ''">
        {{item.location_name.length == '3' ? item.location_name.slice(1, 2) : item.location_name.slice(0, 1)}}
        <transition name="fade">
          <span class="line" v-show="item.location == location"></span>
        </transition>
      </p>
    </div>
    <div class="tab"
         v-show="!isLoadingData && planData.expert_forecast_data_list && planData.expert_forecast_data_list.length > 0">
      <p class="forecast-qantity" @click="forecastQuantity = item"
         v-for="(item, index) in planData.forecast_quantity_list" :key="index"
         :class="item == forecastQuantity ? 'active' : ''">
        {{item}}码榜
        <transition name="fade">
          <span class="line" v-show="item == forecastQuantity"></span>
        </transition>
      </p>
    </div>
    <p class="noDataNotice"
       v-show="!isLoadingData && (!planData.expert_forecast_data_list || planData.expert_forecast_data_list.length <= 0)">
      {{failNotice}}</p>
    <scroll class="content wrapper"
            v-show="!isLoadingData && planData.expert_forecast_data_list && planData.expert_forecast_data_list.length > 0"
            :data="planData.expert_forecast_data_list">
      <div>
        <div class="top">
          专家: {{this.$route.query.name}} 1天/{{planData.wheel_quantity}}轮
          1轮/{{planData.wheel_expect_quantity}}期 <span class="refresh" @click="refresh">  刷新数据</span>
        </div>
        <ul v-for="(item, index) of planData.expert_forecast_data_list" :key="index">
          <li class="title">第{{planData.expert_forecast_data_list.length - index}}轮
            待开奖:{{calcOopenNumToTal(item).noOpen}}
            中:{{calcOopenNumToTal(item).win}} 挂:{{calcOopenNumToTal(item).noWin}} 胜率:{{calcOopenNumToTal(item).winPro}}
          </li>
          <li class="item">
            <p>期</p>
            <p>轮次</p>
            <p>期号</p>
            <p>预测</p>
            <p>开奖</p>
            <p>结果</p>
            <p>盈利</p>
          </li>
          <li class="item" v-for="(obj, key) in item" :key="key">
            <p>{{item.length - key}}</p>
            <p>第{{planData.expert_forecast_data_list.length - index}}轮</p>
            <p>{{obj.expect.slice(-4)}}</p>
            <p>
            <span :style="{color: obj.open_number == temp ? 'red' : ''}" v-for="(temp,k) in obj.forecast_numbers"
                  :key="k"><template v-if="k!=0">,</template>{{temp}}</span>
            </p>
            <p>
              <span v-if="obj.status == 0">待开</span>
              <span v-else v-for="(temp,k) in obj.open_numbers" :key="k"><span style="color: red"
                                                                               v-show="obj.open_number == temp">{{temp}}</span></span>
            </p>
            <p>
              <span v-if="obj.status == 0 && key === 0" class="followBetting" @click="followBetting(obj, platformCode)">跟投</span>
              <span style="color: green" v-else-if="obj.forecast_numbers.indexOf(obj.open_number) != -1">中</span>
              <span style="color: red" v-else>挂</span>
            </p>
            <p>{{obj.deadline_win_or_lose}}</p>
          </li>
        </ul>
      </div>
    </scroll>


    <div v-transfer-dom>
      <popup v-model="betShow" position="bottom" height="55%">
        <ordersPopup ref="ordersPopupComp" @closePopup="closePopup" @betSuccessed="betSuccessed"/>
      </popup>
    </div>

    <div v-transfer-dom>
      <loading :show="isLoadingData" text="加载中"></loading>
    </div>

    <div class="popContainer">
      <planPop/>
    </div>

    <div v-transfer-dom>
      <popup v-model="rightMenuOpen" position="right" v-if="openResult[code]">
        <div style="width:200px;">
          <span class="gameCode" v-for="(item, index) of openResult" :class="{selectedCode: index == code}"
                @click="changeCode(index)">
            {{item.name}}
          </span>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, XHeader, Loading, Popup, TransferDomDirective as TransferDom} from 'vux'
  import {mapGetters, mapActions, mapState} from "vuex";
  import {GAMES} from '../../config'
  import planPop from './planPop'
  import Scroll from "../common/scroll";
  import ordersPopup from "@/components/common/ordersPopup";

  export default {
    components: {Scroll, Tab, TabItem, XHeader, Loading, planPop, Popup, ordersPopup},
    directives: {
      TransferDom
    },
    data() {
      return {
        planData: {},
        expertId: 0,    //专家id
        forecastQuantity: 0, //规则(码)
        location: 1, //名次
        isLoadingData: false,
        betShow: false, //跟投弹窗显示
        betData: {}, //跟投内容
        platformCode: '', //后台返回数据彩种
        failNotice: '暂无数据', //后台返回无数据提示
        rightMenuOpen: false,
      }
    },
    created() {
      this.expertId = this.$route.query.expertId || 0;
      this.forecastQuantity = this.$route.query.forecastQuantity || 0;
      this.location = this.$route.query.location || 1;
      this.getForecastPlanFunc(
        this.code,
        this.expertId,
        this.getDateCur(new Date()),
        this.forecastQuantity,
        this.location
      );
    },
    methods: {
      ...mapActions(["getForecastPlan"]),
      changeCode(code) {
        this.$store.commit('CHANGE_CODE', code);
        this.expertId = 0;
        this.forecastQuantity = 5;
        this.location = 1;
        this.rightMenuOpen = false;
        this.getForecastPlanFunc(
          this.code,
          this.expertId,
          this.getDateCur(new Date()),
          this.forecastQuantity,
          this.location
        );

      },
      followBetting(item, code) {
        setTimeout(() => {
          this.betShow = true;
          this.$refs.ordersPopupComp.dataInit(item, code);
        }, 50);

      },
      closePopup() {
        this.$store.commit('DELETE_ALL_CHECKED_DATA');
        this.betShow = false;
      },
      getForecastPlanFunc(code, expert_id, open_date, forecast_quantity, location) {
        this.isLoadingData = true;
        this.planData = {};
        this.getForecastPlan({
          code: code,
          expert_id: expert_id || 0,
          open_date: open_date,
          forecast_quantity: forecast_quantity || 0,
          location: location || 0
        }).then(res => {
          this.isLoadingData = false;
          if (res.resCode === 1000) {
            this.planData = res.data;
            this.platformCode = res.platformCode;
          } else {
            this.failNotice = res.msg;
          }
        })
      },
      refresh() {
        this.getForecastPlanFunc(
          this.code,
          this.expertId,
          this.getDateCur(new Date()),
          this.forecastQuantity,
          this.location
        );
      },
      // 计算开奖统计
      calcOopenNumToTal(item) {
        let noOpen = 0; //待开
        let win = 0; // 赢
        let noWin = 0; // 挂
        let winPro = 0; //胜率
        item.forEach(obj => {
          if (obj.status == 0) {
            noOpen++;
          } else {
            if (obj.result == 0) {
              noWin++;
            }
            if (obj.result == 1) {
              win++;
            }
          }
        });
        if (item.length == 1 && noOpen == 1) {
          winPro = 0 + '%'
        } else {
          winPro = ((win / (item.length - noOpen)) * 100).toFixed(2) + "%";
        }
        return {
          noOpen: noOpen,
          win: win,
          noWin: noWin,
          winPro: winPro
        };
      },
      getDateCur(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      betSuccessed() {
        let _this = this;
        this.$vux.confirm.show({
          title: "投注成功",
          content: "投注成功，点击“查看注单”可查看投注详情",
          confirmText: '查看注单',
          onConfirm() {
            _this.$store.commit("CHANGE_CODE", _this.code);
            var p = GAMES[_this.code].play[0];
            let t = GAMES[_this.code].count[p].lt;
            _this.$router.push(`/lottery/${_this.code}/${t}?tab=orders`);
          }
        });
      },
    },
    filters: {

      numFilter(value) {

        // 截取当前数据到小数点后三位
        let tempVal = parseFloat(value).toFixed(2)
        let realVal = tempVal.substring(0, tempVal.length - 1)
        return realVal
      }

    },
    computed: {
      ...mapState(["code", 'openResult'])
    },
    watch: {
      code: function () {
        this.refresh();
      },
      expertId() {
        this.refresh();
      },
      location() {
        this.refresh();
      },
      forecastQuantity() {
        this.refresh();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .plan-info {
    height: 100%;

    .header {
      background-color: #51a4fb;
    }

    .tab {
      width: 100%;
      height: px2rem(72px);
      line-height: px2rem(72px);
      display: flex;
      justify-content: space-around;
      background: #fff;
      color: #555;
      font-size: px2rem(24px);
      border-bottom: px2rem(2px) solid #e6e6e6;

      p {
        height: 100%;
        line-height: px2rem(72px);
        text-align: center;
        position: relative;

        .line {
          width: 100%;
          height: px2rem(2px);
          position: absolute;
          background: #51a4fb;
          bottom: 0;
          left: 0;
        }
      }

      .location {
        width: 10%;
      }

      .forecast-qantity {
        width: 33.33%;
      }

      .active {
        color: #51a4fb
      }

      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
      }

      .fade-enter, .fade-leave-active {
        opacity: 0
      }
    }

    .content {
      width: 100%;
      position: absolute;
      top: px2rem(246px);
      bottom: 0;
      overflow: hidden;

      .top {
        height: px2rem(82px);
        text-align: center;
        font-size: px2rem(24px);
        color: #666;
        line-height: px2rem(82px);

        .refresh {
          margin-left: px2rem(10px);
          color: #51a4fb;
        }
      }

      .title {
        height: px2rem(62px);
        text-align: center;
        font-size: px2rem(24px);
        line-height: px2rem(62px);
        color: #51a4fb;
        background: #f2f9ff
      }

      .item {
        display: flex;
        height: px2rem(82px);
        align-items: center;
        font-size: px2rem(24px);
        color: #777;
        box-sizing: border-box;
        border-bottom: px2rem(2px) solid #f1f1f1;

        P {
          text-align: center;
        }

        P:nth-child(1) {
          width: 8%;
        }

        P:nth-child(2) {
          width: 13%;
        }

        P:nth-child(3) {
          width: 17%;
        }

        P:nth-child(4) {
          width: 25%;
        }

        P:nth-child(5) {
          width: 10%;
        }

        P:nth-child(6) {
          width: 12%;
        }

        P:nth-child(7) {
          width: 15%;
        }
      }

      .item:nth-child(odd) {
        background: #fff
      }

      .item:nth-child(even) {
        background: #f5f7fb
      }
    }
  }

  .popContainer {
    position: absolute;
    z-index: 300;
    bottom: px2rem(80px);
    width: 100%;
    box-sizing: border-box;
  }

  .openRightCodeMenu {
    font-size: px2rem(24px);
    position: absolute;
    right: px2rem(20px);
  }

  .followBetting {
    padding: px2rem(4px) px2rem(18px);
    background-color: #51a4fb;
    color: #fff;
    border-radius: px2rem(4px);
  }

  .openRightCodeMenu {
    font-size: px2rem(24px);
    position: absolute;
    right: px2rem(20px);
  }

  .gameCode {
    font-size: px2rem(30px);
    display: inline-block;
    padding: px2rem(8px) px2rem(12px);
    background-color: #fff;
    color: #999;
    border-radius: px2rem(8px);
    margin-left: px2rem(8px);

    &.selectedCode {
      background-color: #51a4fb;
      color: #fff;
    }
  }

  .noDataNotice {
    margin-top: px2rem(100px);
    font-size: px2rem(24px);
    text-align: center;
    color: #999;
  }
</style>
