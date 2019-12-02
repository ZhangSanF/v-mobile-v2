<template>
  <div class="repostDate">
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="toLotteryPage" class="header">历史报表
    </x-header>
    <div class="container">
      <div class="datalist">
        <x-table :cell-bordered="false">
          <thead>
          <tr>
            <th>日期</th>
            <th>注数</th>
            <th>金额</th>
            <th>返水</th>
            <th>盈亏</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of listData" @click="toReportCode(item.date)" :key="index" v-if="listData.length">
            <td>{{item.date}}</td>
            <td>{{item.betsum}}</td>
            <td>{{item.betmoney}}</td>
            <td>{{item.rebate}}</td>
            <td>{{item.result}}</td>
          </tr>
          <tr v-if="!listData.length" class="noDataNotice">
            <td colspan="12">暂无数据</td>
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

  export default {
    name: 'ReportDate',
    components: {XHeader, XTable},
    data() {
      return {
        listData: [],
      }
    },
    methods: {
      ...mapActions(['homeUserReport']),
      getData() {
        this.homeUserReport()
          .then((res) => {
            if (res.resCode == 1000) {
              this.listData = res.data;
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: `请求数据失败，${res.msg}`,
              })
            }
          });
      },
      toReportCode(date) {
        this.$router.push({name: 'ReportCode', params: {date: date}});
      },
      toLotteryPage() {
        // this.$router.push('/home/main');
        this.$router.go(-1);
      },
      toHome() {
        this.$router.push('/home/main');
      },
    },
    computed: {
      ...mapState(['code']),
    },
    mounted() {
      setTimeout(() => {
        this.getData()
      }, 20);
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    font-size: px2rem(16px);
    position: absolute;
    top: px2rem(92px);
    background-color: #ededed;
    bottom: 0;
    width: 100%;
    overflow: auto;
  }

  .repostDate {
    height: 100%;
  }

  .header {
    background-color: #51a4fb;
  }

  h5 {
    color: #555;
    font-size: px2rem(16px);
    padding: px2rem(12px) 0 px2rem(6px) px2rem(6px);
  }

  .datalist {
    thead {
      font-size: px2rem(26px);
      color: #999;
    }

    tbody {
      font-size: px2rem(26px);
      color: #333;
      background-color: #fff;
    }
  }

  .icon-con {
    position: absolute;
    right: px2rem(16px);

    i {
      font-size: px2rem(22px);
    }
  }

  .noDataNotice {
    background-color: #ededed ;
    border: none;
  }

</style>
