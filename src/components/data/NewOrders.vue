<template>
  <div class="new-orders">
    <tab class="tabsContainer">
      <tab-item selected @on-item-click="onItemClick(0)">未结注单</tab-item>
      <tab-item @on-item-click="onItemClick(-3)">已结注单</tab-item>
    </tab>
    <scroll class="scroll"
            :data="listData"
            :pullup="true" @scrollToEnd="scrollEnd"
            :pulldown="true" @topRefresh="refresh"
    >
      <p v-if="refreshLoading">
        <load-more :tip="'正在刷新数据'" v-if="refreshLoading"></load-more>
      </p>
      <x-table :cell-bordered="false">
        <thead>
        <tr>
          <th>时间</th>
          <th>期号</th>
          <th>号码</th>
          <th v-if="type == 0">金额</th>
          <th v-if="type == -3">结果</th>
        </tr>
        </thead>
        <tbody>
        <tr class="noDataNotice" v-if="!listData.length">
          <td colspan="12">没有更多数据</td>
        </tr>
        <tr v-for="(item, index) of listData" :key="index" v-if="listData.length" @click="showDetail(item)">
          <td class="timeTd">{{item.time}}</td>
          <td class="phaseTd">{{item.cn_code}}<br> {{item.open_phase}}</td>
          <td>{{item.notes}}</td>
          <td v-if="type == 0">{{item.money}}</td>
          <td v-if="type == -3" class="result">
            <span :class="parseInt(item.result) > 0 ? 'win' : 'lose'">{{item.result}}</span><br>
            <span class="return" v-if="item.code == 'pk10nn' || item.code == 'jsnn'">返还:{{item.return}}</span>
          </td>
        </tr>
        <tr v-show="moreLoading" class="moreLoadingTr">
          <td colspan="4">
            <load-more :tip="'正在加载更多数据'" v-show="moreLoading"></load-more>
          </td>
        </tr>
        </tbody>
      </x-table>
    </scroll>

    <div class="footerCount">
      <p>点击注单可查看详细信息</p>
      <p>总金额：<span class="moneyText">{{moneyCount}}</span> {{type == 0 ? '可赢' : '输赢'}}：<span class="moneyText">{{resultCount}}</span></p>
      <a class="historyData" @click="toPage('/user/reportdate')">历史报表</a>
    </div>

    <alert v-model="alertShow" title="注单明细" class="orderAlert">
      <div class="orderAlert">
        <p>订单号: {{showData.id}}</p>
        <p>时间: {{showData.time}}</p>
        <p>号码: {{showData.notes}}</p>
        <p>赔率: {{showData.odds}}</p>
        <p>下注金额: {{showData.money}}</p>
        <p>退水: {{showData.rebate}}</p>
        <p>冻结金额: {{showData.frozen}}</p>
        <p>返还: {{showData.return}}</p>
        <p>结果(可赢): {{showData.result}}</p>
      </div>
    </alert>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import {XHeader, Tab, TabItem, XTable, LoadMore, TransferDomDirective as TransferDom, Alert} from 'vux'
  import Scroll from '@/components/common/scroll'

  export default {
    name: 'NewOrders',
    components: {XHeader, Tab, TabItem, XTable, Scroll, LoadMore, Alert},
    directives: {TransferDom},
    data() {
      return {
        refreshLoading: false,
        moreLoading: true,
        type: 0,
        listData: [],
        page: 1,
        alertShow: false,
        showData: {},
        moneyCount: 0, //未结总金额
        resultCount: 0, //未结可赢
      }
    },
    methods: {
      ...mapActions(['homeUserOrderList']),

      toPage(e) {
        this.$router.push(e);
      },

      onItemClick(e) {
        this.typeInit(e);
        this.moreLoading = true;
        this.getMoreData();
      },
      typeInit(e) {
        this.type = e;
        this.page = 1;
        this.listData = [];
      },
      getMoreData(e) {
        this.homeUserOrderList({
          page: this.page,
          status: this.type,
          // code: this.code, 
        })
          .then((res) => {
            if (this.page <= 1) {
              this.listData = [];
            }
            this.moreLoading = false;
            this.refreshLoading = false;
            if (res.resCode === 1000) {
              // this.$emit('countChange', {m: res.data.m, r: res.data.r, type: this.type});
              this.orderCount(res.data);
              if (res.data.orderList.length) {
                if (this.page <= 1) {
                  this.listData = res.data.orderList
                } else {
                  this.listData = [...this.listData, ...res.data.orderList];
                }
                if (this.page <= res.data.p) {
                  this.page = parseInt(res.data.p) + 1;
                }
              } else {
                // this.$vux.toast.text('数据已更新', 'center');
              }
            } else {
              // this.$vux.toast.text('没有更多数据', 'center');
            }
          })
          .catch(err => {
            this.moreLoading = false;
            this.refreshLoading = false;
            this.$vux.toast.text(`${err}`, 'center')
          });
      },
      orderCount(data) {
        console.log(data);
        this.moneyCount = data.m;
        this.resultCount = data.r;
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
      }
    },
    watch: {
      openDataPhase() {
        setTimeout(() => {
          this.page = 1;
          this.listData = [];
          this.getMoreData();
        }, 1200);
      },
      userNotSettled() {
        setTimeout(() => {
          this.page = 1;
          this.listData = [];
          this.getMoreData();
        }, 2000);
      },
    },
    mounted() {
      setTimeout(() => {
        this.typeInit(0);
        this.getMoreData();
      }, 20);
    },
    computed: {
      ...mapState(['user', 'code']),
      ...mapGetters(['openDataPhase']),
      userNotSettled() {
        return this.user.notsettled || 0;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '@/assets/css/public.scss';

  .vux-header {
    background: $public-header-background-color;
  }

  .tabsContainer {
    /deep/ .vux-tab-container {
      height: px2rem(60px);

      .vux-tab {
        height: px2rem(60px);

        .vux-tab-item {
          line-height: px2rem(60px);
        }
      }
    }
  }

  .new-orders {
    background: #f0eff5;
    height: 100%;
    font-size: px2rem(24px);
    overflow: hidden;
  }

  p {
    padding: px2rem(6px) px2rem(19px);
    font-size: px2rem(24px);
    color: #b7a98f;
  }

  th {
    height: px2rem(50px);
    line-height: px2rem(50px);
  }

  tr {

    line-height: px2rem(36px);

    td {
      padding: px2rem(12px) 0;
    }
  }

  .timeTd {
    width: px2rem(160px);
  }

  .phaseTd {
    width: px2rem(180px);
  }

  .scroll {
    position: absolute;
    top: px2rem(60px);
    bottom: px2rem(100px);
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .weui-loadmore {
    margin: 0;
    padding: .6rem 0;
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
    height: px2rem(32px);

    .vux-tab-item {
      line-height: px2rem(32px);
    }
  }

  .vux-table {
    line-height: px2rem(50px);
    font-size: px2rem(24px);
    color: #555;
  }

  .return {
    color: #9f9f9f;
  }

  .result {
    font-weight: 400;

    .win {
      color: orangered;
    }

    .lose {
      color: steelblue;
    }
  }

  .orderAlert {
    padding: 0 px2rem(6px);
    text-align: left;
  }

  .noDataNotice {
    text-align: center;
  }

  .footerCount {
    width: 100%;
    height: px2rem(100px);
    font-size: px2rem(24px);
    position: absolute;
    bottom: 0;
    background-color: #51A4FB;
    padding: px2rem(20px) px2rem(40px);
    box-sizing: border-box;

    p {
      color: #fff;
      font-size: px2rem(24px);
      padding: 0;
    }

    .moneyText {
      color: #fff000;
      margin-right: px2rem(20px);
    }

    .historyData {
      position: absolute;
      right: px2rem(20px);
      bottom: px2rem(26px);
      padding: px2rem(10px) px2rem(20px);
      box-sizing: border-box;
      background-color: orange;
      border-radius: px2rem(8px);
      color: #fff;
    }
  }

  .moreLoadingTr {
    height: px2rem(36px);
    line-height: px2rem(36px);
    /deep/ .vux-loadmore {
      padding: 0;
    }
  }
</style>
