<template>
  <div class="redPackDetail">
    <x-header
      ref="xheader"
      @on-click-back="changeIsShowDetail"
      :left-options="{backText: '',preventGoBack:true}"
      class="header-background public-header-boxShadow"
    >红包详情</x-header>
    <div class="refreshTips">松开刷新页面</div>
    <Scroll
      class="content"
      ref="contentList"
      :click="false"
      :pulldown="true"
      @topRefresh="topRefresh"
      :data="detailList"
    >
      <group gutter="0">
        <div class="redUser">
          <div class="redUserInfo">
            <div class="userHeadBox">
              <img
                class="userHeaderImg"
                :src="userInfo.header_img"
                onerror="this.src = '/static/images/default_avatar.png'"
                alt
              />
            </div>
            <p>{{userInfo.nickname}}</p>
            <p class="amount">
              <span>{{userInfo.title}}</span>
            </p>
            <p class="amount">
              <span v-if="curInfo.is_grab == 1">{{curInfo.amount}}元</span>
            </p>
            <p class="amount timedown">
              <span v-if="userInfo.status == 0">{{timedownText}}</span>
              <span v-else-if="userInfo.status == 1 || userInfo.status == 2">红包已截止</span>
            </p>
            <div class="resultShow" v-if="userInfo.game_type == '2' && userInfo.status !='0'">
              <span class="left">庄赢{{userInfo.protagonistNum}}</span>
              <span class="right">闲赢{{userInfo.costarNum}}</span>
            </div>
          </div>

          <img
            class="winOrLoseIcon"
            v-if="userInfo.game_type == '2' && curInfo.prize_status == 2"
            src="../../assets/images/redPackGame/ic_cow_victory.png"
            alt
          />
          <img
            class="winOrLoseIcon"
            v-if="userInfo.game_type == '2' && curInfo.prize_status == 1"
            src="../../assets/images/redPackGame/ic_cow_defeate.png"
            alt
          />
        </div>
        <div class="detailTitle">{{detailTitle}}</div>
        <cell v-for="(item,index)  in detailList" :key="index">
          <img
            slot="icon"
            class="headImg"
            :src="item.header_img?item.header_img:'/static/images/default_avatar.png'"
            onerror="this.src = '/static/images/default_avatar.png'"
            alt
          />
          <div slot="title" class="itemInfo">
            <div class="userName">
              <span>{{item.nickname?item.nickname:''}}</span>
              <div v-if="item.is_owner == 1 && userInfo.game_type == 2" class="isBanker">
                <span>庄家</span>
              </div>
            </div>
            <p class="time">
              <span class="createTime">{{item.create_time}}</span>
              <img
                class="bombImg"
                v-if="item.prize_status == 2 && (userInfo.game_type == 1||userInfo.game_type == 3)"
                src="../../assets/images/redPackGame/ic_bomb.png"
              />
            </p>
          </div>
          <div>
            <p class="redMoney">
              <span v-html="canvertAmount(item)"></span>
              <span
                class="redMoneyImg"
                v-if="userInfo.game_type == 2"
                :class="getRedMoneyImg(item.extend)"
              ></span>
              <span v-else></span>
            </p>
            <p class="isKing">
              <img
                v-if="item.is_max == 1"
                class="kingImg"
                src="../../assets/images/redPackGame/ic_king.png"
              />
            </p>
          </div>
        </cell>
      </group>
    </Scroll>
  </div>
</template>

<script>
import { XHeader,Toast } from "vux";
import { timeStamp } from "@/methods";
import Scroll from "@/components/common/scroll";
import { mapActions } from "vuex";
export default {
  components: { XHeader, Scroll ,Toast},
  name: "redPackDetail",
  props: [
    "detailList",
    "userInfo",
    "curInfo",
    "isShowDetail",
    "refreshRedPackDetail",
    "recordId"
  ],
  data() {
    return {
      timedownCount: 0,
      timeFunc: {},
      timedownText: ""
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["redPackGameGameDetail"]),

    changeIsShowDetail() {
      this.$emit("changeIsShow", false);
    },

    topRefresh(pos) {
      if (pos.y > 60) {
        this.$emit("refreshDetail", true);
      }
    },

    // 金额转换
    canvertAmount(item) {
      let str = item.amount;
      let lastNum = str.substr(str.length - 1);
      if (this.userInfo.content.indexOf(lastNum) != -1) {
        return `${str.substr(
          0,
          str.length - 1
        )}<i style="color:orangered;font-style:normal">${lastNum}</i>`;
      } else {
        return item.amount;
      }
    },

    getRedMoneyImg(num) {
      return `cow${num}`;
    }
  },
  watch: {
    refreshRedPackDetail() {
      if (this.refreshRedPackDetail.content.id == this.recordId) {
        this.$emit("refreshDetail", true);
      }
    },
    isShowDetail() {
      this.timedownCount = 0;
      this.timedownText = "剩余" + timeStamp(this.timedownCount);
      clearTimeout(this.timeFunc);
      if (this.userInfo.left_second > 0) {
        this.timedownCount = this.userInfo.left_second;
        let _run = () => {
          this.timeFunc = setTimeout(() => {
            this.timedownCount--;
            this.timedownText = "剩余" + timeStamp(this.timedownCount);
            if (this.timedownCount > 0) {
              _run();
            } else {
              this.timedownText = "正在结算...";
              clearTimeout(this.timeFunc);
            }
          }, 1000);
        };
        _run();
      }
      setTimeout(() => {
        this.$refs.contentList.refresh();
      }, 50);
    }
  },
  computed: {
    detailTitle() {
      if (
        this.userInfo.done_count !== undefined &&
        this.userInfo.count !== undefined
      ) {
        return `已领取${this.userInfo.done_count}/${
          this.userInfo.count
        }, 共${parseFloat(this.userInfo.done_amount).toFixed(2)}/${parseFloat(
          this.userInfo.amount
        ).toFixed(2)}元`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.redPackDetail {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #f6f6f6;
  height: 100%;
  color: #555;
  .header-background {
    background: linear-gradient(to right, #ff3564, #ff703e);
    z-index: 99;
    position: relative;
    /deep/ .vux-header-title {
      line-height: px2rem(100px);
      height: px2rem(90px);
    }
  }
  .redUser {
    height: px2rem(500px);
    line-height: px2rem(350px);
    .winOrLoseIcon {
      width: px2rem(180px);
      height: px2rem(180px);
      position: absolute;
      left: px2rem(50px);
      top: px2rem(250px);
    }
    .resultShow {
      height: px2rem(80px);
      line-height: px2rem(80px);
      font-size: px2rem(26px);
      font-weight: bold;
      display: flex;
      justify-content: space-around;
    }
    .redUserInfo {
      background-image: url("../../assets/images/redPackGame/icon_under_line_half.png");
      background-size: 100%;
      background-repeat: no-repeat;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 100%;
      text-align: center;
      .userHeadBox {
        height: px2rem(260px);
        .userHeaderImg {
          height: px2rem(140px);
          border-radius: 8px;
          width: px2rem(140px);
          margin-top: px2rem(100px);
        }
      }
      p {
        line-height: px2rem(50px);
        font-size: px2rem(30px);
      }
      .amount {
        font-weight: bold;
        &.timedown {
          color: orangered;
        }
      }
    }
  }
  .headImg {
    width: px2rem(90px);
    height: px2rem(90px);
    border-radius: 8px;
    display: block;
    padding: px2rem(20px) px2rem(10px) px2rem(10px) px2rem(10px);
  }
  .userName {
    font-size: px2rem(31px);
    font-weight: bold;
    color: #555;
    span {
      display: inline-block;
      line-height: px2rem(31px);
    }
  }
  .time {
    position: relative;
    color: #666;
    .createTime {
      font-size: px2rem(27px);
      color: rgb(153, 153, 153);
    }
  }
  .detailTitle {
    padding: px2rem(20px) px2rem(14px);
    line-height: px2rem(60px);
    font-size: px2rem(33px);
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }
  .weui-cell {
    .itemInfo {
      padding: 0 px2rem(10px);
    }
    padding: px2rem(10px) px2rem(10px) !important;
  }
  .isKing {
    height: px2rem(30px);
    margin-right: px2rem(70px);
    .kingImg {
      line-height: px2rem(30px);
      height: px2rem(30px);
    }
  }

  .isBanker {
    background-color: orangered;
    color: #fff;
    display: inline-block;
    text-align: center;
    vertical-align: bottom;
    border-radius: px2rem(21px);
    width: px2rem(87px);
    height: px2rem(40px);
    line-height: px2rem(40px);
    font-size: px2rem(26px);
  }
  .redMoney {
    color: #333;
    padding-right: px2rem(20px);
    .redMoneyImg {
      display: inline-block;
      line-height: px2rem(30px);
      height: px2rem(35px);
      width: px2rem(20px);
      margin-left: px2rem(50px);
      background-size: 17px 17px;
      background-repeat: no-repeat;
      background-position: center;
    }
    span {
      display: inline-block;
      font-weight: bold;
      width: px2rem(39px);
      padding-left: px2rem(30px);
    }
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: px2rem(90px);
    bottom: 0;
    width: 100%;
  }
  .refreshTips {
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    height: px2rem(130px);
    line-height: px2rem(130px);
  }
  .bombImg {
    position: absolute;
    top: px2rem(-50px);
    width: px2rem(55px);
    height: px2rem(55px);
    left: 130%;
  }
}
.groupClass {
  overflow: hidden;
  .weui-cells {
    margin-top: 0 !important;
  }
}
</style>
