<template>
  <div class="pay">
    <x-header :left-options="{backText: ''}" class="public-header-background-color public-header-boxShadow">存取款记录
    </x-header>
    <tab>
      <tab-item selected @on-item-click="onItemClick('deposit')">充值记录</tab-item>
      <tab-item @on-item-click="onItemClick('withdrawal')">取款记录</tab-item>
    </tab>
    <scroll class="scroll"
            :data="listData"
            :pullup="true" @scrollToEnd="scrollEnd"
            :pulldown="true" @topRefresh="refresh"
    >
      <p v-if="refreshLoading">
        <load-more :tip="'正在刷新数据'" v-if="refreshLoading"></load-more>
      </p>
      <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
        <tr>
          <th>时间</th>
          <th>金额</th>
          <th>状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) of listData" :key="index" v-show="listData.length" @click="showDetail(item)">
          <td class="timeTd">{{item.createtime}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.status}}</td>
        </tr>
        <tr v-show="moreLoading">
          <td colspan="3">
            <load-more :tip="'正在加载更多数据'"></load-more>
          </td>
        </tr>
        </tbody>
      </x-table>
    </scroll>
    <div v-transfer-dom>
      <alert class="detailAlert" v-model="alertShow" title="详细信息" v-if="showData">
        <p><span>信息:</span><span>{{showData.info}}</span></p>
        <p><span>金额:</span><span>{{showData.amount}}</span></p>
        <p><span>手续费:</span><span>{{showData.userfee}}</span></p>
        <p v-if="showData.remark"><span>备注:</span><span>{{showData.remark}}</span></p>
        <p><span>提交时间:</span><span>{{showData.createtime}}</span></p>
        <p><span>处理状态:</span><span>{{showData.status}}</span></p>
      </alert>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {XHeader, Tab, TabItem, XTable, LoadMore, TransferDomDirective as TransferDom, Alert} from 'vux'
  import Scroll from '@/components/common/scroll'

  export default {
    name: 'Bills',
    components: {XHeader, Tab, TabItem, XTable, Scroll, LoadMore, Alert},
    directives: {TransferDom},
    data() {
      return {
        refreshLoading: false,
        moreLoading: true,
        type: 'deposit',
        listData: [],
        page: 1,
        alertShow: false,
        showData: {},
      }
    },
    methods: {
      ...mapActions(['homeAllPaymentsUserTransactionRecord']),

      onItemClick(e) {
        this.typeInit(e);
        this.getMoreData();
      },
      typeInit(e) {
        this.type = e;
        this.page = 1;
        this.listData = [];
        this.moreLoading = true;
      },
      getMoreData(e) {
        this.homeAllPaymentsUserTransactionRecord({
          page: this.page,
          status: 2, //['-2'=>'已拒绝','-1'=>'失败','0'=>'处理中','1'=>'已通过','2'=>''全部]
          type: this.type,
        })
          .then((res) => {
            this.moreLoading = false;
            this.refreshLoading = false;
            if (res.resCode === 1000) {
              if (res.data.list.length) {
                if (e) {
                  this.listData = res.data.list
                } else {
                  this.listData = [...this.listData, ...res.data.list];
                }
                this.page = parseInt(res.data.current) + 1;
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
        this.page = 1;
        this.getMoreData(1);
      }
    },
    mounted() {
      setTimeout(() => {
        this.typeInit('deposit');
        this.getMoreData();
      }, 20);
    },
    computed: {
      ...mapState(['user']),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .pay {
    height: 100%;
    font-size: px2rem(24px);
    overflow: hidden;
  }

  tr {
    line-height: px2rem(40px);
  }

  p {
    padding: px2rem(6px) px2rem(12px);
    font-size: px2rem(24px);
    color: #b7a98f;
  }

  .timeTd {
    width: px2rem(176px);
  }

  .scroll {
    position: absolute;
    top: px2rem(192px);
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
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
</style>
