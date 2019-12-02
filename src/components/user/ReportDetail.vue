<template>
  <div class="repostDate">
    <x-header :left-options="{backText: '', preventGoBack: true, }" @on-click-back="backToReportCode" class="public-header-background-color public-header-boxShadow">
      历史报表
      <span class="icon-con" @click="toHome"><i class="iconfont icon-home1">&#xe620;</i></span>
    </x-header>
    <div class="container">
      <h5 class="font-light-color">{{date}}日 {{cnCode}}，点击可查看详细信息</h5>
      <div class="datalist">
        <scroll class="scroll" 
        :data="listDataArray" 
        :pullup="true" @scrollToEnd="scrollEnd"  
        :pulldown="true" @topRefresh="refresh"
        > 
          <div class="scrollContent">
            <p v-show="refreshLoading">
              <load-more :tip="'正在刷新数据'" v-if="refreshLoading"></load-more>
            </p>
            <x-table :cell-bordered="false">
              <thead>
                <tr>
                  <th>时间</th>
                  <th>期号</th>
                  <th>玩法</th>
                  <th>金额</th>
                  <th>结果</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of listData" @click="showDetail(item)" :key="index">
                  <td>{{item.time.split(' ')[1]}}</td>
                  <td>{{item.cn_code}} <br> {{item.open_phase}}</td>
                  <td>{{item.notes}}</td>
                  <td>{{item.money}}</td>
                  <td :class="parseInt(item.result) > 0 ? 'win' : 'lose'">{{item.result}}</td>
                </tr>
              </tbody>
            </x-table>
            <p v-show="moreLoading"><load-more :tip="'正在加载更多数据'" ></load-more></p>
          </div>
          
        </scroll>
        
      </div>
    </div>
    <alert v-model="alertShow" title="详细注单" class="orderAlert">
      <div class="orderAlert">
        <p>订单号: {{showData.id}}</p>
        <p>时间: {{showData.time}}</p>
        <p>号码: {{showData.notes}}</p>
        <p>赔率: {{showData.odds}}</p>
        <p>下注金额: {{showData.money}}</p>
        <p>退水: {{showData.rebate}}</p>
        <p>冻结金额: {{showData.frozen}}</p>
        <p>返还: {{showData.return}}</p>
        <p>结果: {{showData.result}}</p>
        <p>状态: {{showData.status}}</p>
      </div>
    </alert>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {XHeader, XTable, Alert, LoadMore} from 'vux'
  import Scroll from '@/components/common/scroll'
  import {GAMES,hk6EtoC} from '@/config'
  export default {
    name: 'ReportDate',
    components: {XHeader, XTable, Alert, Scroll, LoadMore},
    data () {
      return {
        listData: {},
        p: 1,
        date: '',
        code: '',
        showData: {},
        alertShow: false,
        cnCode: '',
        GAMES: '',
        refreshLoading: false,
        moreLoading: false,
      }
    },
    methods: {
      ...mapActions(['homeUserReport']),
      hk6EtoC(obj){
        return hk6EtoC(obj);
      },
      getData(){
        var params = {
          p: this.p,
          date: this.date,
          code: this.code,
          report_type: "reportOrderList"
        };
        this.homeUserReport(params)
        .then((res) => {
          this.moreLoading = false;
          this.refreshLoading = false;
          if(res.resCode == 1000){
            if(!res.data.data.orderList.length){
              this.$vux.toast.text('没有更多数据', 'center');
              return;
            }
            var p = parseInt(res.data.data.p);
            if(p == 1){
              this.listData = res.data.data.orderList;
            }else{
              this.listData = [...this.listData, ...res.data.data.orderList];
            }
            this.p = p + 1;
          }
        })
        .catch(err => {
          this.moreLoading = false;
          this.refreshLoading = false;
          this.$vux.toast.text('没有更多数据', 'center');
        });
      },
      toReportCode(date) {
        this.$router.push({name: 'ReportCode', params: {date: this.date}});
      },
      showDetail(item) {
        this.alertShow = true;
        this.showData = item;
      },
      toHome() {
        this.$router.push('/home/main');
      },
      scrollEnd() {
        this.moreLoading = true;
        this.getData();
      },
      refresh() {
        this.refreshLoading = true;
        this.p = 1;
        this.getData();
      },
      backToReportCode() {
        this.$router.push({name: 'ReportCode', params: {date: this.date}});
      },
    },
    mounted() {
      setTimeout(() => {
        this.GAMES = GAMES;
        this.code = this.$route.params.code;
        this.cnCode = GAMES[this.code].name;
        this.date = this.$route.params.date;
        this.getData();
      }, 20);
    },
    computed: {
      listDataArray() {
        return _.values(this.listData);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  // @import '@/assets/css/public.scss';
  // .vux-header {
  //   background: $public-header-background-color;
  // }
  .container {
    font-size: px2rem(24px);
    position: absolute;
    top: px2rem(92px);
    bottom: 0;
    width: 100%;
    overflow: auto;
  }
  .repostDate {
    // background: #f0eff5;
    height: 100%;
  }
  h5 {
    color: #555;
    font-size: px2rem(24px);
    padding: px2rem(12px) 0 px2rem(6px) px2rem(6px);
  }
  .datalist {
    thead {
      font-size: px2rem(24px);
    }
    tbody {
      font-size: px2rem(24px);
      line-height: px2rem(40px);
      .win {
        color: orangered;
      }
      .lose {
        color: #009aff;
      }
    }
  }
  .orderAlert {
    padding: 0 px2rem(6px);
    text-align: left;
    font-size: px2rem(24px);
  }
  .icon-con {
    position: absolute;
    right: px2rem(16px);
    i {
      font-size: px2rem(44px);
    }
  }
  .scroll {
    overflow: hidden;
    position: absolute;
    top: px2rem(56px);
    bottom: 0;
    left: 0;
    right: 0;
  }
  
</style>
