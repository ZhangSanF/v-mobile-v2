<template>
  <div class="signin">
    <x-header :left-options="{backText: ''}" class="header">签到</x-header>
    <scroll :data="scrollDatas" class="serviceScroll">
      <div>
        <div class="shadow">
          <inline-calendar
            ref="calendar"
            class="inline-calendar-demo"
            :show.sync="show"
            v-model="value"
            :show-last-month="false"
            :show-next-month="false"
            :disable-past="true"
            :disable-future="true"
          ></inline-calendar>
        </div>
        <div class="transparency"></div>
        <x-button
          class="signinBut"
          @click.native="signin"
          :class="{'signClick':isSigning}"
        >{{signBut}}</x-button>
        <div class="neirong"></div>
        <div class="contentRule">
          <p>
            <span class="title">活动说明：</span>
            <span class="instructions">{{baseInfo.sign_data.sign_desc}}</span>
          </p>
          <p>
            <span class="title">活动时间：</span>
            <span class="instructions">{{baseInfo.sign_data.sign_start_time}}</span>~
            <span class="instructions">{{baseInfo.sign_data.sign_end_time}}</span>
          </p>
          <p>
            <span class="instructions">
              您已连续签到
              <span class="title">{{continuousSign}}</span>天!
            </span>
          </p>
          <p class="colorRed">
            <span>{{baseInfo.sign_data.sign_bonus_type == 1 ? '签到成功后奖金实时发放到账户!' : '所有签到活动完成后，一次性发放所有奖金!'}}</span>
          </p>
        </div>
        <div class="award">
          <img src="../assets/images/redPackGame/rule-title.c42c938b.png" alt />

          <p v-for="(item,index) of baseInfo.sign_data.sign_bonus" :key="index">
            <span class="num">{{item.num}}</span>
            <span class="bonus numTitle">第{{item.num}}天：</span>
            <span class="bonus">{{item.bonus}}元</span>
          </p>
        </div>
      </div>
    </scroll>
  </div>
</template>


<script>
import Scroll from "@/components/common/scroll";
import { mapActions, mapState, mapGetters } from "vuex";
import { XHeader, Grid, GridItem, InlineCalendar } from "vux";
import { setTimeout } from "timers";
import moment from "moment";

export default {
  name: "signin",
  data() {
    return {
      scrollDatas: [],
      show: true,
      value: [],
      isSigning: false,
      signBut: "点击签到",
      continuousSign: ""
    };
  },

  components: {
    XHeader,
    Scroll,
    Grid,
    GridItem,
    InlineCalendar
  },
  mounted() {
    this.attendanceRecord();
  },

  methods: {
    ...mapActions(["getAttendanceRecord", "homeSigninSign"]),
    attendanceRecord() {
      this.getAttendanceRecord(this.user.username).then(res => {
        if (res.resCode === 1000) {
          this.value = res.sign_date;

          let firstTime = res.sign_date[res.sign_date.length - 1];
          let todyTime = moment().format("YYYY-MM-DD");
          this.continuousSign = res.sign_num;

          if (firstTime == todyTime) {
            this.isSigning = true;
            this.signBut = "您已签到";
          } else {
            this.isSigning == false;
          }
        } else {
          this.$vux.alert.show({
            content: `获取数据失败,请重试或者联系客服处理![${res.msg}]`
          });
        }
      });
    },
    signin() {
      if (this.isSigning) {
        return;
      }
      this.isSigning = true;
      this.homeSigninSign()
        .then(res => {
          if (res.resCode === 1000) {
            this.$vux.alert.show({
              content: "签到成功"
            });
            this.attendanceRecord();
          } else {
            this.attendanceRecord();
            this.$vux.alert.show({
              content: `${res.msg}`
            });
          }
          this.isSigning = true;
        })
        .catch(err => {
          this.$vux.alert.show({
            content: `${res.msg}`
          });
          this.isSigning = false;
        });
    }
  },
  computed: {
    ...mapState(["user", "settingImages"]),
    ...mapGetters(["baseInfo"])
  }
};
</script>


<style scoped lang="less">
@import "~vux/src/styles/close";
</style>

<style scoped lang="scss">
.signin {
  height: 100%;
  background-color: #ededed;
  position: relative;
  .header {
    background-color: #51a4fb;
  }
  .transparency{
    width:px2rem(460px);
    height:px2rem(400px);
    position:absolute;
    top:px2rem(760px);
    left:px2rem(140px);
  }
  .serviceScroll {
    position: absolute;
    height: 100%;
    top: px2rem(92px);
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to right, #2e4cab , #251547);;
    overflow: hidden;
    > div {
      background-size: 100% 100%;
      background-image: url("../assets/images/redPackGame/mrqd.1c4c2ba5.png");
      width: 100%;
      padding-bottom: px2rem(250px);
      padding-top: px2rem(570px);
      .shadow {
        width: 90%;
        height: px2rem(600px);
        background: #4654ae;
        margin: 0 auto;
        box-shadow: inset 0px 0px 10px 10px #5587cc;
        border-radius: 5px;
        text-align: center;
        padding-top: px2rem(100px);
      }
      .inline-calendar-demo {
        border-radius: px2rem(20px);
        border: px2rem(5px) solid #34429f;
        width: 70%;
        margin: 0 auto;
        background: #f2f2f2;
        z-index: 9999;
        height: px2rem(500px);
      }
      .signinBut {
        width: px2rem(400px);
        height: px2rem(60px);

        border-radius: px2rem(30px);
        line-height: px2rem(30px);
        background: #e34f8a;
        color: #fff;
        margin: px2rem(50px) auto;
      }
      .neirong {
        background-image: url("../assets/images/redPackGame/hdgz.7b6a2ce0.png");
        background-size: 100% 100%;
        width: px2rem(680px);
        margin: 0 auto;
        height: px2rem(160px);
      }
      .contentRule {
        margin: 0 auto;
        width: px2rem(580px);
        background: #e5e5e5;
        padding: px2rem(20px);
        word-break: break-word;
        p {
          font-size: 14px;
          padding: px2rem(15px);
        }
      }
    }
  }
}
/deep/ .calendar-header {
  font-size: 14px !important;
}
/deep/.inline-calendar th {
  font-size: 14px;
}
/deep/.inline-calendar td.current > span.vux-calendar-each-date {
  width: px2rem(70px);
  height: px2rem(70px);
  border-radius: px2rem(8px);
}
/deep/.inline-calendar td.current > span.vux-calendar-each-date:after {
  content: "签";
  font-size: 12px;
  width: px2rem(10px);
  height: px2rem(10px);
  position: absolute;
  right: px2rem(15px);
  top: px2rem(22px);
  color: #fffc00;
  font-weight: 600;
}
/deep/.inline-calendar td.is-disabled {
  color: #555;
}
.signClick {
  background: #a3a3a3 !important;
  color: #fff !important;
}
.title {
  color: #555;
  font-weight: 600;
}
.colorRed {
  color: orangered;
}
.award {
  width: 100%;
  top: px2rem(2150px);
  img {
    width: 50%;
    margin-left: 25%;
  }
  p {
    width: 80%;
    height: px2rem(70px);
    background: #4654ae;
    box-shadow: inset 0px 0px 10px 10px #5587cc;
    font-size: 14px;
    margin-left: 10%;
    margin-bottom: px2rem(20px);
    .num {
      width: px2rem(60px);
      height: px2rem(60px);
      line-height: px2rem(60px);
      color: #5382c8;
      background: #2b3887;
      display: inline-block;
      text-align: center;
      margin-left: px2rem(40px);
      margin-top: px2rem(5px);
      border-radius: 50%;
      font-size: 18px;
      font-weight: 600;
      font-style: italic;
      letter-spacing: px2rem(10px);
    }
    .numTitle {
      margin-left: px2rem(10px);
    }
    .bonus {
      color: #fff;
    }
  }
}
</style>
