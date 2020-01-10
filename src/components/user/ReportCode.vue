<template>
  <div class="repostDate">
    <x-header :left-options="{backText: '',preventGoBack: true,}" @on-click-back="backToReportDate" class="public-header-background-color public-header-boxShadow">
      历史报表
      <span class="icon-con" @click="toHome"><i class="iconfont icon-fanhuishouye"></i></span>
    </x-header>
    <div class="container">
      <h5 class="font-light-color">{{date}} 报表，点击可查看单彩种详细注单</h5>
      <div class="datalist">
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th>彩种</th>
              <th>注数</th>
              <th>金额</th>
              <th>返水</th>
              <th>盈亏</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of listData" @click="toReportDetail(item.code, date)">
              <td>{{GAMES[item.code].name}}</td>
              <td>{{item.betsum}}</td>
              <td>{{item.betmoney}}</td>
              <td>{{item.rebate}}</td>
              <td>{{item.result}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {XHeader, XTable} from 'vux'
  import {GAMES} from '@/config'
  export default {
    name: 'ReportDate',
    components: {XHeader, XTable},
    data () {
      return {
        listData: {},
        date: '',
        GAMES: '',
      }
    },
    methods: {
      ...mapActions(['homeUserReport']),
      getData(date){
        var params = {
          date: date,
          report_type: "reportList"
        };
        this.homeUserReport(params)
        .then((res) => {
          if(res.resCode == 1000){
            this.listData = res.data;
          }
        });
      },
      backToReportDate(){
        this.$router.push({name: 'ReportDate', params: {date: this.date}});
      },
      toReportDetail(code, date) {
        this.$router.push({name: 'ReportDetail', params: {date: date, code: code}});
      },
      toHome() {
        this.$router.push('/home/main');
      },
    },
    mounted() {
      setTimeout(() => {
        this.GAMES = GAMES;
        var date = this.$route.params.date
        this.date = date;
        this.getData(date)
      }, 20);
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
    }
  }
  .icon-con {
    position: absolute;
    right: px2rem(16px);
    i {
      font-size: px2rem(44px);
    }
  }
  
</style>
