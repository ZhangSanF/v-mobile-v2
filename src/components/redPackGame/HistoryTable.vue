<template>
  <div class="historyTable">
    <x-header
      ref="xheader"
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >游戏报表</x-header>
    <div class="titleBox">
      <div class="gridItems fullWidth">
        <p>当前条件下总盈亏：{{sumData.total_profit || 0}}</p>
      </div>
      <div class="gridItems fullWidth">
        <p>当前条件下总金额：{{sumData.total_amount || 0}}</p>
      </div>
      <div class="gridItems fullWidth">
        <p>当前条件下总流水：{{sumData.money_water || 0}}</p>
      </div>
      <div class="gridItems">
        <popup-radio title="游戏类型" :options="gameLists" v-model="curGameType" ></popup-radio>
      </div>

      <div class="gridItems">
        <popup-radio title="红包类型" :options="lists" v-model="type">
          <template slot-scope="props" slot="each-item">
            <p class="itemStyle">{{props.label}}</p>
          </template>
        </popup-radio>
      </div>

      <div class="gridItems">
        <span>开始时间：</span>
        <span>
          <datetime
            @on-change="startDateChange"
            v-model="start"
            format="YYYY-MM-DD"
            :end-date="maxYear"
          ></datetime>
        </span>
      </div>
      <div class="gridItems">
        <span>结束时间：</span>
        <span>
          <datetime
            @on-change="endDateChange"
            v-model="end"
            format="YYYY-MM-DD"
            :end-date="maxYear"
          ></datetime>
        </span>
      </div>
    </div>
    <ul class="listBox title">
      <li>
        <div>游戏名称</div>
        <div>金额</div>
        <div>盈利</div>
        <div class="time">时间</div>
        <div>操作</div>
      </li>
    </ul>
    <scroll
      class="content"
      ref="msgcontent"
      :pullup="true"
      @scrollToEnd="scrollToEnd"
      :click="false"
      :data="curDataList"
    >
      <ul class="listBox item">
        <li v-for="(item,index) in curDataList" :key="index">
          <div class="name">{{item.cn_name}}</div>
          <div>{{item.amount}}</div>
          <div>{{item.profit}}</div>
          <div>{{item.create_time}}</div>
          <div class="btn" @click="toRedPackDetail(item)">
            详情>
            <!-- <x-button :gradients="['#ff3564', '#ff3564']" @click.native="toRedPackDetail(item)" mini></x-button> -->
          </div>
        </li>
      </ul>
    </scroll>
    <red-pack-detail
      v-show="isShowDetail"
      :isShowDetail="isShowDetail"
      @changeIsShow="changeIsShowDetail"
      @refreshDetail="changeIsShowDetail"
      :detailList="detailList"
      :userInfo="userInfo"
      :curInfo="userData"
    />
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll";
import RedPackDetail from "./RedPackDetail";
import { XHeader, Grid, GridItem, Datetime, PopupRadio, XButton } from "vux";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "historyTable",
  data() {
    return {
      userInfo: {},
      detailList: [],
      curItem:{},
      userData: {},
      curPage: 1,
      isShowDetail: false,
      typeId: 1,
      gameLists: [
        {
          value: "全部",
          key: 0
        }
      ],
      curGameType: "全部",
      gameType: 0,
      sumData: {},
      type: "发包",
      lists: [
        {
          value: "发包",
          key: 1
        },
        {
          value: "抢包",
          key: 2
        }
      ],
      start: moment().format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
      maxYear: moment().format("YYYY-MM-DD"),
      curDataList: [],
      totalPage: 0,
      limit: 20
    };
  },
  mounted() {
    this.redPackGameIndexReReportFunc();
    this.redPackGameBaseInfo.gameType.forEach(item => {
      let obj = {
        key: item.id,
        value: item.title
      };
      this.gameLists.push(obj);
    });
  },
  methods: {
    ...mapActions(["redPackGameIndexReReport", "redPackGameGameDetail"]),

    changeIsShowDetail(flag) {
      if(flag){
        this.toRedPackDetail(this.curItem);
      }
      this.isShowDetail = flag;
    },

    startDateChange() {
      this.redPackGameIndexReReportFunc();
    },

    endDateChange() {
      this.redPackGameIndexReReportFunc();
    },

    toRedPackDetail(item) {
      this.redPackGameGameDetail(item.recordId).then(res => {
        if (res.resCode == 1000) {
          this.userInfo = res.data.info;
          this.detailList = res.data.list;
          this.userData = res.data.user_data;
          this.isShowDetail = true;
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },

    scrollToEnd() {
      if (this.curPage < this.totalPage) {
        this.curPage++;
        this.redPackGameIndexReReportFunc();
      }
    },

    redPackGameIndexReReportFunc() {
      let params = {
        page: this.curPage, //页码
        limit: this.limit, //每页条数，默认20条数据
        gameType: this.gameType, //游戏类型 参考初始化接口中的 GameType
        typeId: this.typeId, //抢发包类型 1-代表发包 2-代表发包，默认类型为发包
        start: this.start, //开始时间  时间格式为YYYY-MM-DD,默认为当天时间
        end: this.end //结束时间  时间格式为YYYY-MM-DD,默认为当天时间
      };
      this.redPackGameIndexReReport(params).then(res => {
        if (res.resCode == 1000) {
          this.totalPage = Math.ceil(res.count / this.limit);
          if (this.curPage > 1) {
            res.data.forEach(item => {
              this.curDataList.push(item);
            });
          } else {
            this.curDataList = res.data;
          }
          this.sumData = res.sum;
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    }
  },
  watch: {
    type() {
      this.typeId = this.type;
      this.redPackGameIndexReReportFunc();
    },
    curGameType() {
      this.gameType = this.curGameType;
      this.redPackGameIndexReReportFunc();
    }
  },
  computed: {
    ...mapGetters(["redPackGameBaseInfo"])
  },
  components: {
    Scroll,
    XHeader,
    Grid,
    GridItem,
    Datetime,
    PopupRadio,
    XButton,
    RedPackDetail
  }
};
</script>

<style lang="scss" scoped>
.historyTable {
  font-size: px2rem(26px);
  .public-header-background-color {
    background: linear-gradient(to right, #ff3564, #ff703e);
    /deep/ .vux-header-title{
      line-height: px2rem(100px);
      height: px2rem(90px);
    }
  }
  .titleBox {
    display: flex;
    flex-wrap: wrap;
    .gridItems {
      width: 50%;
      display: flex;
      padding: px2rem(20px);
      font-size: px2rem(28px);
      color: #333;
      box-sizing: border-box;
      border: 1px solid #ccc;
      &.fullWidth {
        width: 100%;
        justify-content: center;
        display: flex;
      }
      &:nth-of-type(n-2) {
        border-left: 0;
        border-top: 0;
      }
      img {
        width: px2rem(100px);
        height: px2rem(100px);
        display: inline-block;
      }
      > div {
        flex: 1;
        display: flex;
        margin-left: px2rem(20px);
        justify-content: center;
      }
    }
  }
  .listBox {
    padding: 0 px2rem(20px);
    &.title {
      height: px2rem(80px);
      line-height: px2rem(80px);
      li {
        font-weight: bold;
      }
    }
    li {
      display: flex;
      font-size: px2rem(24px);
      color: #333;
      border-bottom: 1px solid #ccc;
      > div {
        flex: 1;
        text-align: center;
        line-height: px2rem(80px);
        &:nth-of-type(1) {
          flex: none;
          width: px2rem(150px);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &:nth-of-type(4) {
          flex: none;
          width: px2rem(150px);
          line-height: px2rem(35px);
        }
        &.time {
          line-height: px2rem(80px);
        }
        &.btn{
          color: #ff3564;
        }
      }
    }
  }
}
.vux-datetime {
  padding: 0;
}
/deep/ .weui-cell_access {
  padding: 0;
}
/deep/ .vux-cell-box:not(:first-child):before {
  display: none;
}
.content {
  position: absolute;
  left: 0;
  top: px2rem(580px);
  right: 0;
  overflow: hidden;
  bottom: 0;
}
.itemStyle {
  font-size: px2rem(26px);
}
</style>