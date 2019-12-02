<!-- 计划 -->
<template>
  <div class="plan">
    <tab v-if="!dataIntalling" :line-width=2 active-color='#0072c6'>
      <tab-item class="vux-center" :selected="activeTab === item.name" v-for="(item, index) in forecastRanking"
                @on-item-click="onItemClick(item.name)" :key="index">{{item.name}}码榜
      </tab-item>
    </tab>
    <scroll class="wrapper container" v-if="!dataIntalling && forecastRanking.length" :data="forecastRanking">
      <div >
        <ul v-show="activeTab == list.name" class="content-wrapper" v-for="(list, index) in forecastRanking" :key="index">
          <li class="title">
            <p>专家名称</p>
            <p>车道</p>
            <p>码数</p>
            <p>成绩</p>
            <p>胜率</p>
            <p>盈利</p>
            <p>查看</p>
          </li>
          <li class="content" v-for="(item, index) in list.list" :key="index + 'b'"
              @click="goPlanInfo(item.expert_id, item.forecast_quantity, item.location, item.name)"
          >
            <p>{{item.name}}</p>
            <p>{{item.location}}</p>
            <p>{{item.forecast_quantity}}码</p>
            <p>{{item.last_sum}}中{{item.result_sum}}</p>
            <p class="colorRed">{{Math.floor(item.result * 10000) / 100}}%</p>
            <p class="colorGreen">{{item.profit}}</p>
            <p>查看</p>
          </li>
        </ul>
      </div>
    </scroll>

    <p v-else-if="dataIntalling && !forecastRanking.length" class="dataInstallingSpinner">
      <span>加载中<spinner type="lines"></spinner></span>
    </p>
    <p class="dataInstallFailText" v-if="dataInstallFailText !== ''">
      {{dataInstallFailText}}
    </p>

    <div class="popContainer">
      <planPop/>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, Spinner} from 'vux'
  import {mapState, mapActions} from "vuex";
  import planPop from './planPop'
  import scroll from '@/components/common/scroll'

  export default {
    components: {Tab, TabItem, Spinner, planPop, scroll},
    data() {
      return {
        activeTab: 5,
        dataIntalling: true,
        dataInstallFailText: '',
        curSelectTime: new Date(),
        popData: {},
        popDataIndex: [],
        _socket: null,
      }
    },
    computed: {
      ...mapState(['code', 'forecastRanking']),
    },
    mounted() {
      this.$nextTick(() => {
        this.getData();
      });
      // this.openWSconnect('wss://wss-kaijiangwang-dev.e2048.com');
    },
    beforeDestroy() {
      // this._socket.close();
    },
    watch: {
      code() {
        this.getData();
      }
    },
    methods: {
      ...mapActions(['getForecastRanking']),
      toShow(item) {
        this.goPlanInfo(item.expert_id, item.forecast_quantity, item.location, item.name);
      },
      getData() {
        this.dataIntalling = true;
        this.dataInstallFailText = '';
        this.getForecastRanking({code: this.code})
          .then(res => {
            this.dataIntalling = false;
            if (res.resCode !== 1000) {
              this.dataInstallFailText = res.msg || '暂无数据';
              this.$store.commit('FORECATST_RANKING', []);
            }
          })
      },

      onItemClick(name) {
        this.activeTab = name
      },
      goPlanInfo(expert_id, forecast_quantity, location, name) {
        this.$router.push({
          path: '/user/planInfo',
          query: {
            'expertId': expert_id,
            'forecastQuantity': forecast_quantity,
            'location': this.rankingMap(location),
            'name': name
          }
        })
      },
      rankingMap(data) {
        let obj = {
          '冠军': 1,
          '亚军': 2,
          '第三名': 3,
          '第四名': 4,
          '第五名': 5,
          '第六名': 6,
          '第七名': 7,
          '第八名': 8,
          '第九名': 9,
          '第十名': 10
        }
        return obj[data]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .plan {
    height: 100%;
    background-color: #fff;

    /deep/ .vux-tab-wrap {
      height: px2rem(70px);
      padding: 0;

      .vux-tab-container {
        height: px2rem(70px);
      }

      .vux-tab {
        height: px2rem(70px);

        .vux-tab-item {
          line-height: px2rem(70px);
        }
      }

    }

    .container {
      position: absolute;
      top: px2rem(70px);
      bottom: 0;
      width: 100%;
      overflow: hidden;

      li {
        width: 100%;
        height: px2rem(82px);
        font-size: px2rem(24px);
        color: #777;
        box-sizing: border-box;
        border-bottom: px2rem(2px) solid #f1f1f1;
        display: flex;
        align-items: center;

        P {
          text-align: center;
        }

        P:nth-child(1) {
          width: 18%;
        }

        P:nth-child(2) {
          width: 15%;
        }

        P:nth-child(3) {
          width: 10%;
        }

        P:nth-child(4) {
          width: 15%;
        }

        P:nth-child(5) {
          width: 15%;
        }

        P:nth-child(6) {
          width: 15%;
        }

        P:nth-child(7) {
          width: 12%;
        }
      }

      .title {
        background: #fbfbfb
      }

      .content:nth-child(odd) {
        background: #f5f7fb
      }

      .content:nth-child(even) {
        background: #fff
      }
    }
  }

  .dataInstallingSpinner {
    font-size: px2rem(30px);
    line-height: px2rem(200px);
    text-align: center;
    color: #999;

    /deep/ .vux-spinner {
      stroke: #51a4fb;
      fill: #51a4fb;
      vertical-align: middle;
      display: inline-block;
      width: 28px;
      height: 28px;
      position: relative;

      svg {
        position: absolute;
        top: px2rem(4px, false);
      }
    }
  }

  .dataInstallFailText {
    font-size: px2rem(28px);
    color: #999;
    text-align: center;
  }

  .colorRed {
    color: #ff3505;
  }

  .colorGreen {
    color: #149214;
  }

  .popContainer {
    position: absolute;
    z-index: 999;
    bottom: px2rem(80px);
    width: 100%;
    box-sizing: border-box;
  }
</style>
