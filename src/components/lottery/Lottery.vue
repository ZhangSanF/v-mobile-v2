<template>
  <div class="lottery" ref="lottery" @click="bodyClick">
    <div class="main-content page">
      <header class="public-header-background-color header">
        <span class="moreGamesText" @click="moreGames">{{name}}</span>
        <span class="leftBtn icon-con" @click="moreGames">
          <!--          <i class="iconfont icon-xiala2" ></i>-->
          <span class="iconfont icon-xiala" :class="{onShow: moreGamesShow}"></span>
        </span>

        <span class="icon-right">
          <span class="zoushiBtn" @click="toPage(`/data?page=DraDew&code=${code}`, 1)">走势</span>
          <span class="homeBtn" @click="toPage('/home/main', 1)">
            首页
            <span class="iconfont icon-fanhuishouye"></span>
          </span>
          <span @click="openRightMenu">
            菜单
            <span class="iconfont icon-caidan"></span>
          </span>
        </span>
      </header>
      <div class="inner">
        <div class="info info1">
          <flexbox :gutter="0">
            <flexbox-item :span="1/5" :order="1" class="info-left">
              <span
                class="next-phase font-important-color"
              >{{openData ? ('' + openData.openPhase).slice(-6) : ''}}期</span>
            </flexbox-item>
            <flexbox-item :order="99" class="code-content font-light-color">
              <div class="code">
                <code-result :info="timeInfo" :code="code"></code-result>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="info">
          <flexbox :gutter="0">
            <flexbox-item :span="1/5" :order="1" class="info-left">
              <span
                class="next-phase font-important-color"
              >{{openData ? ('' + openData.nextPhase).slice(-6) : ''}}期</span>
            </flexbox-item>
            <flexbox-item :order="99" class="code-content font-light-color">
              <span class="timeTitle">
                封盘
                <span class="timeText">{{closed ? '已封盘' : closeTime}}</span>
              </span>
              <span class="timeTitle">
                开奖
                <span class="timeText">{{nextTime}}</span>
              </span>
              <span class="openResultButton" @click="openResultListVisibility">
                <span class="icon resultIcon iconfont icon-kaijiangshuju"></span>
                <span class="openResultButtonText">{{openResultListShow ? '收起' : '开奖数据'}}</span>
              </span>
            </flexbox-item>
          </flexbox>
        </div>

        <!--        切换彩种列表-->
        <div class="gamesList" v-show="moreGamesShow">
          <div class="gamesContent">
            <div
              v-for="(item, index) in openResult"
              :key="index"
              class="item"
              @click="toGame(index)"
              :class="{'is-code': index == code}"
            >
              <time-count-comp :item="item" :code="index"></time-count-comp>
            </div>
          </div>
        </div>

        <!--        开奖数据下拉列表-->
        <div class="openResultList">
          <open-result-list :openResultListShow="openResultListShow"></open-result-list>
        </div>

        <!--        tabs区-->
        <div class="tabsContent bet-bar-bgColor" :class="{tabsMoveDown: openResultListShow}">
          <flexbox :gutter="0">
            <flexbox-item
              class="font-light-color"
              :span="baseInfo.isAgent ? 1/3 : 1/4"
              :order="1"
              @click.native="areaTab = 'bet'"
              :class="{'selected active-bgColor active-color' : areaTab=='bet'}"
            >
              <span>投注区</span>
            </flexbox-item>
            <flexbox-item
              class="font-light-color"
              :span="baseInfo.isAgent ? 1/3 : 1/4"
              :order="2"
              @click.native="areaTab = 'orders'"
              :class="{'selected active-bgColor active-color' : areaTab=='orders'}"
            >
              <span>我的注单</span>
            </flexbox-item>
            <flexbox-item
              v-if="!baseInfo.isAgent"
              class="font-light-color"
              :span="1/4"
              :order="3"
              @click.native="areaTab = 'chat'"
              :class="{'selected active-bgColor active-color' : areaTab=='chat'}"
            >
              <span>聊天室</span>
            </flexbox-item>
            <flexbox-item
              class="font-light-color"
              :span="baseInfo.isAgent ? 1/3 : 1/4"
              :order="4"
              @click.native="areaTab = 'plan'"
              :class="{'selected active-bgColor active-color' : areaTab=='plan'}"
            >
              <span>跟单计划</span>
            </flexbox-item>
          </flexbox>
        </div>

        <!-- 投注区 -->
        <div
          class="bet-content"
          key="slide-fade"
          v-show="areaTab == 'bet'"
          :class="[{betContentMoveDown: openResultListShow}, {fastMoneyIsShow: fastMoneyIsShow}]"
        >
          <router-view v-if="areaTab == 'bet'"></router-view>
        </div>

        <!-- 当期注单 -->
        <div
          class="chat-content"
          key="slide-fade2"
          v-show="areaTab === 'orders'"
          :class="{betContentMoveDown: openResultListShow}"
        >
          <new-orders v-if="areaTab === 'orders'"></new-orders>
        </div>

        <!-- 聊天室 -->
        <div
          class="chat-content"
          key="slide-fade3"
          v-show="areaTab == 'chat'"
          :class="{betContentMoveDown: openResultListShow}"
        >
          <chat-room
            v-if="areaTab == 'chat'"
            @changeTabIndex="changeTabIndex"
            @chartMsg="chartMsg"
            :msg_content="chat.msgContent"
          ></chat-room>
        </div>

        <!-- 跟单计划 -->
        <div
          class="plan-content"
          key="slide-fade4"
          v-if="areaTab == 'plan'"
          :class="{betContentMoveDown: openResultListShow}"
        >
          <Plan v-if="areaTab == 'plan'"></Plan>
        </div>
      </div>

      <!-- 金额、按钮 -->
      <div class="fastMoney" v-show="betOrders.length">
        <div class="title">
          <p>快选</p>
          <p>金额</p>
        </div>
        <div class="moneyBtns">
          <span
            class="moneyBtnItem"
            v-for="(item, index) of fastMoneyArray"
            :key="index"
            @click="setFastMoney(item)"
          >{{item}}</span>
        </div>
      </div>
      <div
        v-if="areaTab == 'bet'"
        class="footer row"
        ref="betInput"
        :class="betInputFocused?'topFooter':'botFooter'"
      >
        <flexbox class="betFooter">
          <div class="bet-money-area">
            <span class="total-content">
              已经选中
              <span class="total-inner">{{betOrders.length}}</span> 注
            </span>
            <input class="bet-input" type="tel" v-model="betMoney" @change="betMoneyChanged" />
            <span class="total-content">元</span>
          </div>
          <div class="betButtons">
            <button class="reset" @click="reset">重置</button>
            <button class="bet" @click="betPop">提交</button>
          </div>
        </flexbox>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="betShow" position="bottom" height="60%">
        <!--        <ordersPopup :data="betOrders" :moneyInput="false" :initMoney="betMoney" />-->
        <div class="orders-content">
          <h4>请确认详细注单</h4>
          <div class="orders-table-con">
            <table :cell-bordered="false" style="background-color:#fff;" class="orders-table">
              <thead>
                <tr>
                  <th>号码</th>
                  <th>赔率</th>
                  <th>金额</th>
                </tr>
              </thead>
              <tbody>
                <virtual-list
                  :size="viretalListSize"
                  :remain="6"
                  :bench="25"
                  class="virtual"
                  ref="virtual"
                >
                  <template v-for="(item, index) of betOrders">
                    <tr :key="index" v-if="index <1000">
                      <td>{{item.name}}</td>
                      <td class="oddsText">{{item.odds}}</td>
                      <td>{{item.money || 0}}</td>
                    </tr>
                  </template>
                </virtual-list>
              </tbody>
            </table>
          </div>

          <div class="orders-btns">
            <span class="bet-money">
              总下注金额:
              <span class="totalMoney">{{ordersMoneyCount}}元</span>
            </span>
            <button @click="bet" class="bet-action">确认投注</button>
          </div>
        </div>
      </popup>
    </div>
    <toast
      v-model="showToast"
      :type="toastType"
      :time="1200"
      is-show-mask
      :text="toastText"
      :position="toastPosition"
    ></toast>
    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>
    <input
      id="imgUploadInput"
      ref="imginput"
      type="file"
      @change="imgChanged"
      accept=".jpg, .png, .gif, .jpeg, image/jpeg, image/png, image/gif"
      style="display: none;"
    />

    <!--    右侧菜单栏-->
    <div v-transfer-dom>
      <popup v-model="rightMenuShow" position="right">
        <div class="rightMenu">
          <right-menu @rightMenuClosed="rightMenuShow = false"></right-menu>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import virtualList from "vue-virtual-scroll-list";
import {
  Popover,
  Grid,
  GridItem,
  Loading,
  XTextarea,
  TransferDom,
  XHeader,
  Flexbox,
  FlexboxItem,
  XInput,
  Popup,
  Group,
  Cell,
  XTable,
  Toast,
  InlineLoading
} from "vux";
import OpenCode from "@/components/common/openCode";
import CodeResult from "@/components/common/codeResult";
import TimeCountComp from "@/components/common/TimeCountComp";
import ordersPopup from "@/components/common/ordersPopup";
import NewOrders from "@/components/data/NewOrders";
import ChatRoom from "./ChatRoom";
import RightMenu from "./RightMenu";
import Plan from "../user/Plan";
import OpenResultList from "./OpenResultList";
import { GAMES, TIME_INFO } from "@/config";
import { countDown, betTime, timeStamp, time } from "@/methods";
import { setTimeout, setInterval, clearInterval } from "timers";
import { debug } from "util";

export default {
  name: "Lottery",
  data() {
    return {
      closed: true,
      msg: "",
      BETS_INFO: {}, //彩种信息
      timeInfo: {}, //时间 期号 开奖信息
      popOpen: 0, //弹窗开启 scroll初始化
      betMoney: 1, //金额
      closeTime: "", //封盘时间
      nextTime: "", //距离下期时间
      time: 0,
      moreGamesShow: false, //左侧栏
      rightShow: false, //右侧栏
      betShow: false, //投注弹窗
      showToast: false, //显示toast
      loadingShow: false,
      loadingText: "",
      toastText: "",
      toastType: "cancel",
      toastPosition: "center",
      ordersMoneyCount: 0,
      areaTab: "bet",
      chat: {
        msgContent: "",
        imgUrl: ""
      },
      keybordScrollTimer: null,
      betInputFocused: false,
      orderListCount: {
        m: 0,
        r: 0,
        type: 0
      },
      getOpenInfoTimer: null,
      rightMenuShow: false,
      openResultListShow: false,
      viretalListSize: window.innerWidth / 8.9,
      fastMoneyArray: [10, 20, 50, 100, 200, 500] //快选金额
    };
  },
  directives: { TransferDom },
  components: {
    virtualList,
    Popover,
    Grid,
    GridItem,
    XTextarea,
    NewOrders,
    Loading,
    OpenCode,
    CodeResult,
    XInput,
    XHeader,
    Flexbox,
    FlexboxItem,
    Popup,
    Group,
    Cell,
    ChatRoom,
    XTable,
    Toast,
    InlineLoading,
    RightMenu,
    OpenResultList,
    Plan,
    TimeCountComp,
    ordersPopup
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("changeCode", this.code);
      this.timeInit(); //开奖 时间 初始化
      this.getOpenInfo(); //每10秒请求一次开奖 时间信息
      if (this.$route.query.tab) {
        this.areaTab = this.$route.query.tab;
      }
    }, 20);
  },
  computed: {
    ...mapState([
      "code",
      "play",
      "user",
      "showCode",
      "checkedData",
      "timeUpdate",
      "openInfo",
      "openResult"
    ]),
    ...mapGetters([
      "gameData",
      "openData",
      "betOrders",
      "openTime",
      "baseInfo"
    ]),
    name() {
      return this.openResult[this.code].name;
    },
    fastMoneyIsShow() {
      if (this.betOrders && this.betOrders.length > 0) {
        return true;
      }
      return false;
    }
  },
  beforeDestroy() {
    clearInterval(this.getOpenInfoTimer);
  },

  watch: {
    betOrders() {
      this.$nextTick(() => {
        this.getOrdersMoneyCount();
        this.$store.commit("SCROLL_REFRESH");
      });
    },
    $route(to, from) {
      if (this.$route.query.tab) {
        this.areaTab = this.$route.query.tab;
      }
    },
    betMoney() {
      this.betMoney = parseInt(this.betMoney) || "";
      if (parseInt(this.betMoney) > 1000000) {
        this.showToast = true;
        this.toastText = "单注金额不能超过100万";
        this.betMoney = 1000000;
      }
      this.$store.commit("SAVE_BET_MONEY", parseInt(this.betMoney));
    },
    timeUpdate() {
      if (this.openTime > 0) this.time = this.openTime;
    },
    closed() {
      this.$store.commit("CHANGE_CLOSED", this.closed);
    }
  },
  methods: {
    ...mapActions([
      "homeIndexInit",
      "homeOrdersPlaceOrder",
      "homeChatSendMsgToChatRoom",
      "lotteryAndUserInfo",
      "shareOrder"
    ]),

    changeTabIndex(val) {
      this.areaTab = val;
    },

    getOrdersMoneyCount() {
      if (this.betOrders.length) {
        var res = 0;
        for (var i = 0; i < this.betOrders.length; i++) {
          res += parseInt(this.betOrders[i].money) || 0;
        }
        this.ordersMoneyCount = res;
      }
    },

    betMoneyChanged() {
      let newMoney = parseInt(this.betMoney) || 0;
      this.$store.commit("CHANGE_ALL_CHECKED_DATA_MONEY", newMoney);
    },

    setFastMoney(m) {
      this.betMoney = m;
      this.$store.commit("CHANGE_ALL_CHECKED_DATA_MONEY", m);
    },

    timeCount(time) {
      let seconds = time;
      let res = 0;
      setInterval(() => {
        //倒计时 时间格式化
        seconds = countDown(seconds);
        seconds = seconds <= 0 ? betTime(this.code).allTime : seconds;
        // if (this.seconds - betTime(this.code).difference <= 0) {
        //   this.openFlag = false;
        // } else {
        //   this.openFlag = true;
        // }
        res = timeStamp(seconds);
      }, 1000);
      return res;
    },

    openResultListVisibility() {
      this.openResultListShow = !this.openResultListShow;
      this.$store.commit("SCROLL_REFRESH");
    },

    openRightMenu() {
      this.rightMenuShow = true;
    },

    chartMsg(str) {
      this.chat.msgContent = str;
    },

    getOpenInfo() {
      clearInterval(this.getOpenInfoTimer);
      this.getOpenInfoTimer = setInterval(() => {
        this.lotteryAndUserInfo({ code: this.code }).then(res => {
          if (res.resCode === 1000) {
            this.$store.commit("SAVE_OPEN_INFO", {
              code: this.code,
              data: res.data.openInfo
            });
            this.$store.commit("SAVE_TIME_INFO", {
              code: this.code,
              data: res.data.openInfo
            });
            this.$store.commit("SAVE_USER_MONEY_INFO", res.data.userInfo);
          }
        });
      }, 10000);
    },

    showMoneyInfo() {
      console.log(this.user);
    },
    betInputFocus(event) {
      setTimeout(() => {
        this.betInputFocused = true;
      }, 300);
    },
    betInputBlur() {
      this.betInputFocused = false;
    },
    bodyClick() {
      this.moreGamesShow = false;
    },
    toGame(code) {
      this.moreGamesShow = false;
      this.$store.commit("CHANGE_CODE", code);
      this.$store.dispatch("changeCode", code);
      var p = GAMES[code].play[0];
      let t = GAMES[code].count[p].lt;
      this.$router.push(`/lottery/${code}/${t}`);
    },
    areaChange(e) {
      this.areaTab = e;
    },
    betPop() {
      if (this.closed) {
        this.$vux.alert.show({
          title: "提示",
          content: `封盘中，请稍后`
        });
        return;
      }
      if (!/(^[1-9]\d*$)/.test(this.betMoney)) {
        this.showToast = true;
        this.toastType = "cancel";
        this.toastText = "请输入正确的金额";
        return;
      }
      if (!this.betOrders.length) {
        this.showToast = true;
        this.toastType = "cancel";
        this.toastText = "请至少选择一注";
        return;
      }
      this.betMoneyChanged();
      this.getOrdersMoneyCount();
      this.betShow = true;
    },

    // 分享投注
    shareOrderFunc(share) {
      this.shareOrder(share).then(res => {
        if (res.resCode === 1000) {
          this.$vux.alert.show({
            title: "提示",
            content: `分享成功`
          });
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `分享失败`
          });
        }
      });
    },
    bet() {
      let _this = this;
      this.betShow = false;
      this.loadingShow = true;
      this.loadingText = "投注中";
      var data = {
        code: this.code,
        bet_type: 1,
        orders: this.betOrders
      };
      this.betOrders.forEach(item => {
        if (!item.money) {
          this.$vux.alert.show({
            title: "提示",
            content: `投注失败，投注金额出现为0情况，请输入正确金额，如果重复出现此问题请联系客服处理！`
          });
          return;
        }
      });

      this.homeOrdersPlaceOrder(data)
        .then(res => {
          this.loadingShow = false;
          if (res.resCode == 2000) {
            this.$store.commit("DELETE_ALL_CHECKED_DATA"); //清空已选注单列表
            this.$store.commit("SAVE_USER_MONEY_INFO", res.data); //金额修改
            this.$store.commit("SAVE_NS_INFO", this.code); //存储未结彩种 开奖请求判断
            if (res.share) {
              this.$vux.confirm.show({
                title: "投注成功",
                content: `快把投注方案分享到聊天室吧`,
                confirmText: "分享",
                cancelText: "关闭",
                onConfirm: () => {
                  _this.shareOrderFunc(res.share);
                }
              });
            } else {
              this.showToast = true;
              this.toastType = "success";
              this.toastText = "投注成功";
            }
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: `投注失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[错误码:${res.resCode}][提示:${res.msg}]`
            });
          }
        })
        .catch(err => {
          this.loadingShow = false;
          this.$vux.alert.show({
            title: "提示",
            content: `投注失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[错误码:${err}]`
          });
        });
    },
    reset() {
      this.$store.commit("DELETE_ALL_CHECKED_DATA"); //清空已选注单列表
    },
    timeInit() {
      //开奖封盘时间初始化
      this.time = this.openTime;
      let newTime = 0;
      setInterval(() => {
        this.time--;
        if (this.time === -3) {
          this.homeIndexInit({
            actions: "timeInfo,openInfo",
            code: this.code
          }).then(res => {
            if (res.resCode === 1000) {
              this.$store.commit("SAVE_OPEN_INFO", {
                code: res.data.code,
                data: res.data.openInfo
              });
              this.$store.commit("SAVE_TIME_INFO", {
                code: res.data.code,
                data: res.data.openInfo
              });
            }
          });
        }
        var timeInfos = betTime(this.code, this.timeInfo.nextPhase);
        newTime = countDown(this.time);
        this.nextTime = timeStamp(newTime);
        var difftime = parseInt(this.openData.difftime);
        this.closeTime = timeStamp(newTime - difftime);
        //剩余时间大于彩种封盘时间  并且 （剩余时间小于彩种当期总时间 或者彩种为六合彩） 并且后台设置的status为1  => 开盘

        if (
          newTime - difftime > 0 &&
          (newTime <= timeInfos.allTime || this.code == "hk6") &&
          this.openData.status == 1
        ) {
          this.closed = false; //开盘
        } else {
          this.closed = true; //封盘
        }
      }, 1000);
    },
    toHome() {
      this.$router.push("/home/main");
    },
    toPage(path, a) {
      if (!a && (!this.user || this.user.agmem != 1)) {
        this.$vux.alert.show({
          title: "提示",
          content: `请登录为正式用户!`
        });
        return;
      }
      this.$router.push(path);
    },
    moreGames(e) {
      e.stopPropagation();
      this.moreGamesShow = !this.moreGamesShow;
      console.log(this.moreGamesShow);
    },
    toData() {
      this.$router.push(`/data?page=History&code=${this.code}`);
    },

    //聊天室
    sendMsg() {
      this.homeChatSendMsgToChatRoom({ content: this.chat.msgContent }).then(
        res => {
          if (res.resCode === 1000) {
            this.chat.msgContent = "";
          } else {
            this.$vux.alert.show({
              title: "发送失败",
              content: `消息发送失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[code:${res.resCode}][msg:${res.msg}]`
            });
          }
        }
      );
    },
    imgChanged() {
      var file = this.$refs.imginput.files[0];
      if (file.size > 2097152) {
        this.$vux.toast.text("您选择的图片大小超过2M", "center");
        return;
      }
      if (file.type.indexOf("image") <= -1) {
        this.$vux.toast.text("请选择png/jpg/gif等格式的图片", "center");
        return;
      }
      let formData = new FormData(); //创建form对象
      formData.append("file", file); //通过append向form对象添加数据
      formData.append("chunk", "0"); //添加form表单中其他数据
      let param = {
        data: formData,
        isChangeHeader: true
      };
      var _this = this;
      this.$vux.confirm.show({
        title: "提示",
        content: `您选择的图片大小为${parseInt(
          file.size / 1024
        )}KB，<br>发送图片会消耗相当的流量，确定发送吗？`,
        onCancel() {
          _this.$vux.toast.text("已取消", "center");
        },
        onConfirm() {
          _this.homeChatSendMsgToChatRoom(param).then(res => {
            if (res.resCode !== 1000) {
              _this.$vux.alert.show({
                title: "发送失败",
                content: `图片发送失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[code:${res.resCode}][msg:${res.msg}]`
              });
            }
          });
        }
      });
    },
    chooseImg() {
      this.$refs.imginput.click();
    },
    countChange(data) {
      console.log(data);
      this.orderListCount = data;
    },
    toReport() {
      this.$router.push("/user/reportdate");
    }
  }
};
</script>

<style scoped lang="scss">
.lottery {
  overflow: hidden;
  height: 100%;
  background-color: #efefef;
}

.vux-popup-right {
  background-color: #fff;
  height: 100%;
}

.timeTitle {
  color: #333;
  display: inline-block;
  height: px2rem(36px);
  line-height: px2rem(36px);
  vertical-align: middle;
  margin-right: px2rem(20px);
  font-size: px2rem(24px);
}

.timeText {
  display: inline-block;
  height: px2rem(36px);
  padding: 0 px2rem(10px);
  line-height: px2rem(36px);
  text-align: center;
  background-color: #51a4fb;
  font-size: px2rem(24px);
  color: #fff;
  border-radius: px2rem(8px);
}

.rightMenu {
  width: px2rem(446px);
  overflow: hidden;
}

.vux-popup-dialog {
  overflow: hidden;
}

header {
  font-size: px2rem(16px);
  height: px2rem(92px);
  line-height: px2rem(92px);
  color: #fff;
  padding: 0 px2rem(20px);

  span {
    font-size: px2rem(30px);
    vertical-align: middle;

    &.moreGamesText {
      position: relative;
      top: px2rem(-4px);
      left: px2rem(10px);
    }

    &.icon-right {
      .iconfont {
        position: relative;
        top: px2rem(-2px);
        left: px2rem(-4px);
      }
    }

    &.leftBtn {
      position: relative;
      top: px2rem(-2px);
      left: px2rem(6px);
    }

    &.zoushiBtn {
      margin-right: px2rem(30px);
      background-color: rgba(0, 0, 0, 0.15);
      padding: px2rem(4px) px2rem(20px);
      border-radius: px2rem(8px);
      position: relative;
      top: px2rem(2px);
    }

    &.homeBtn {
      margin-right: px2rem(10px);
    }
  }

  .iconfont {
    zoom: 1.4;
    position: relative;
  }

  .icon-right {
    float: right;

    .icon-chongzhi2-copy {
      vertical-align: middle;
    }
  }

  .icon-change {
    top: px2rem(2px);
  }

  .icon-menu {
    top: px2rem(3px);
  }
}

.lottery-name {
  display: inline-block;
}

.icon {
  margin-right: px2rem(8px);
  font-size: px2rem(19px);
}

.inner {
  position: absolute;
  top: px2rem(92px);
  bottom: 0;
  width: 100%;
}

.info {
  height: px2rem(82px);
  background-color: #fff;
  margin-bottom: px2rem(2px);

  &.info1 {
    border-bottom: 1px solid #f3f3f3;
  }

  .openResultButton {
    float: right;
    position: relative;
    top: px2rem(2px);
    font-size: px2rem(24px);
    color: #f00;

    .icon {
      color: #51a4fb;
      font-size: px2rem(36px);
      position: relative;
      left: px2rem(4px);
      margin: 0;
    }

    .openResultButtonText {
      position: relative;
      top: px2rem(-4px);
    }
  }
}

.openResultList {
  position: absolute;
  top: px2rem(168px);
  z-index: 0;
  width: 100%;
}

.bet-content {
  position: absolute;
  top: px2rem(218px);
  bottom: px2rem(86px);
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  transition: all 0.6s ease-in-out;
  &.fastMoneyIsShow {
    bottom: px2rem(168px);
  }
}

.betContentMoveDown {
  top: px2rem(698px) !important;
}

.tabsContent {
  position: absolute;
  top: px2rem(168px);
  height: px2rem(50px);
  line-height: px2rem(51px);
  border-bottom: 1px solid #ccc;
  width: 100%;
  color: #fff;
  transition: all 0.6s ease-in-out;

  &.tabsMoveDown {
    top: px2rem(648px);
  }

  .vux-flexbox-item {
    padding: 0;
    margin: 0;
    font-size: px2rem(24px);
    background-color: #a8d1fd;
    border-right: 1px solid #fff;

    &:nth-last-of-type(1) {
      border-right: none;
    }
  }

  .selected {
    background-color: #60abf9;
  }
}

.fastMoney {
  height: px2rem(82px);
  display: flex;
  align-items: center;
  width: 100%;
  bottom: px2rem(86px);
  font-size: px2rem(24px);
  padding: px2rem(4px) 0 0 0;
  position: absolute;
  box-sizing: border-box;
  background-color: #51a4fb;
  color: #fffef9;
  .title {
    width: px2rem(80px);
    text-align: center;
  }
  .moneyBtns {
    flex: 1;
    .moneyBtnItem {
      display: inline-block;
      width: 12%;
      margin-left: 2%;
      padding: px2rem(2px) 0;
      color: #777;
      font-weight: 600;
      font-size: px2rem(28px);
      text-align: center;
      border-radius: px2rem(4px);
      background-color: #fffef9;
    }
  }
}

.footer {
  height: px2rem(86px);
  display: flex;
  align-items: center;
  width: 100%;
  bottom: 0;
  font-size: px2rem(30px);
  padding: 0 px2rem(4px);
  position: absolute;
  box-sizing: border-box;
  background-color: #51a4fb;

  .betFooter {
    height: px2rem(60px);
    line-height: px2rem(60px);
  }

  .betButtons {
    position: absolute;
    right: px2rem(20px);

    button {
      /*width: px2rem(118px);*/
      /*height: px2rem(60px);*/
      padding: px2rem(10px) px2rem(28px);
      border-radius: px2rem(10px);
      font-size: px2rem(28px);
      font-weight: 400;
      border: none;
      color: #fff;

      &.bet {
        margin-left: px2rem(18px);
        background: #f18819;
        color: #fff;
      }

      &.reset {
        background-color: #2790ff;
      }
    }
  }
}

.topFooter {
  bottom: px2rem(16px);
}

.botFooter {
  bottom: 0px;
}

.phase {
  display: inline-block;
  width: auto;
  height: 100%;
  padding: px2rem(6px) px2rem(3px);
  font-size: px2rem(24px);
  text-align: center;
  box-sizing: border-box;
  line-height: px2rem(16px);
  color: #ffffc4;
}

.code {
  display: inline-block;
  width: 100%;
  height: px2rem(80px);
}

.time-content {
  border-top: 1px solid #e6e6e638;
  background: #70b9e6;
}

.open-result,
.time {
  width: 100%;
  background: #f7f7f8;
  padding: px2rem(3px);
  font-size: px2rem(24px);
  height: px2rem(43px);
}

.time {
  background: #70b9e6;
}

.status {
  background: #ffffc4;
  color: #fa8072;
  display: inline-block;
  padding: 0 px2rem(10px);
  border-radius: px2rem(16px);
}

.row {
  margin: 0;
}

.close {
  font-size: px2rem(10px);
  margin-left: px2rem(3px);
  box-sizing: border-box;
  color: #ffffc4;
  border-radius: px2rem(6px);
}

.open {
  font-size: px2rem(24px);
  color: #ffffc4;
}

.col {
  display: inline-block;
  float: none;
}

.close-time-text {
  // color: orangered;
  display: inline-block;
  font-size: px2rem(16px);
  padding: 0 px2rem(4px);
}

.col-20 {
  margin: 0;
  padding: px2rem(3px) 0;
  line-height: px2rem(19px);
  text-align: center;
}

.time-text {
  text-align: center;
}

.chat-content,
.plan-content {
  position: absolute;
  top: px2rem(220px);
  bottom: 0;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.6s ease-in-out;
}

p {
  margin-top: 0;
}

.content-block {
  padding-top: px2rem(10px);
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: px2rem(24px);
}

.card {
  background: none;
  margin: 0;
}

.list-block.theme-dark ul,
.theme-dark .list-block ul {
  background: rgba(0, 0, 0, 0.19);
}

.user-info p {
  margin: px2rem(10px) 0 !important;
}

.total-content {
  padding-left: px2rem(4px);
  font-size: px2rem(30px);
  color: #fff;
}

.total-inner {
  font-size: px2rem(30px);
  font-weight: 600;
  color: yellow;
}

.bet-input {
  border: none;
  height: px2rem(60px);
  width: px2rem(150px);
  margin: 0 px2rem(4px) 0 px2rem(8px);
  color: #555;
  font-size: px2rem(28px);
  border-radius: px2rem(10px);
  padding: 0 px2rem(10px);
  box-sizing: border-box;
  font-weight: 600;
}

.page {
  background: rgba(80, 189, 243, 0.48);
}

.pop-btns {
  position: absolute;
  margin: 0 auto;
  bottom: px2rem(16px);
  width: 100%;
}

.pop-btns a {
  /*display: inline-block;*/
  padding: px2rem(3px) 0;
  font-size: px2rem(16px);
  color: #fff;
  border-radius: px2rem(16px);
}

.close-popup {
  background: rgba(131, 222, 255, 0.26);
}

.details {
  position: absolute;
  top: px2rem(64px);
  bottom: px2rem(64px);
  width: 92%;
  overflow: hidden;
}

.order {
  font-size: px2rem(24px);
  color: #868686;
  padding: px2rem(5px) 0;
  border-bottom: 1px dotted #c9c9c9;
  text-align: left;
}

.money-text,
.num-text,
.odds-text {
  font-size: px2rem(24px);
  color: #f5693c;
}

p {
  margin: 0;
}

.notice {
  font-size: px2rem(24px);
  margin: 0;
}

.title-pop {
  font-weight: 800;
}

.popup {
  background: rgb(0, 55, 75);
}

.money-min {
  font-size: 0.6rem;
  padding-left: 0.1rem;
  color: #f5693c;
}

.vux-flexbox-item {
  text-align: center;
}

.code-content,
.bet-money-area {
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  textarea {
    width: 100%;
  }
}

.orders-content {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  font-size: px2rem(24px);
  background: #f0eff5;
  transition: all 0.6s ease-in-out;

  h4 {
    text-align: center;
    position: absolute;
    top: 0;
    height: px2rem(90px);
    line-height: px2rem(90px);
    width: 100%;
    text-align: center;
    font-size: px2rem(30px);
    font-weight: 400;
    color: #fff;
    text-align: center;
    background: #51a4fb;
  }

  .orders-table-con {
    position: absolute;
    top: px2rem(90px);
    bottom: px2rem(118px);
    overflow: hidden;
    width: 100%;
    .orders-table {
      display: block;
    }
    thead,
    tbody {
      width: 100%;
      display: block;
    }

    tr {
      display: flex;
      height: px2rem(80px);
      line-height: px2rem(80px);
      border-bottom: 1px solid #e0e0e0;
      th {
        flex: 1;
        color: #999;
        font-size: px2rem(28px);
      }
      td {
        flex: 1;
        color: #333;
        font-size: px2rem(26px);
        text-align: center;
      }
    }
  }

  .orders-btns {
    position: absolute;
    padding: 0 px2rem(16px);
    box-sizing: border-box;
    bottom: 0;
    height: px2rem(118px);
    width: 100%;
    text-align: left;
    vertical-align: middle;
    line-height: px2rem(118px);
    background: #51a4fb;

    .bet-money {
      color: #fff;
      font-size: px2rem(30px);

      .totalMoney {
        color: #fff000;
        font-size: px2rem(32px);
        font-weight: 600;
      }
    }

    .bet-action {
      background: #f18819;
      color: #fff;
      border: none;
      border-radius: px2rem(12px);
      /*height: px2rem(60px);*/
      /*width: px2rem(176px);*/
      padding: px2rem(10px) px2rem(28px);
      font-size: px2rem(28px);
      position: absolute;
      right: px2rem(30px);
      top: px2rem(28px);
    }

    .bet-cancel {
      padding: px2rem(10px) px2rem(48px);
    }
  }
}

.chat-tools {
  box-sizing: border-box;
  background: #f3f3f3;
  height: px2rem(110px);

  textarea {
    margin: px2rem(3px) 0;
    border-color: #ccc;
  }

  .chat-btn {
    margin: 0;
    height: px2rem(32px);
    font-size: px2rem(24px);
    width: px2rem(48px);
    padding: 0;
    text-align: center;
    position: relative;
  }

  .chat-btn-img {
    width: px2rem(48px);
    position: absolute;
    top: px2rem(3px);
    right: px2rem(61px);
    background: darkseagreen;
  }

  .chat-btn-send {
    position: absolute;
    top: px2rem(3px);
    right: px2rem(5px);
    background: #ff9a60;
  }
}

.chat-btns {
  text-align: center;
}

.gamesList {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: auto;
  height: auto !important;
  z-index: 9999;
  font-size: px2rem(20px);

  .gamesContent {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;

    > div {
      width: 33.3%;
      display: flex;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      /*border-right: 1px solid #ddd;*/
      /*border-bottom: 1px solid #ddd;*/
      &.is-code {
        .time-count-comp {
          background: #51a4fb;
          color: #fff;
          border: none;
        }
      }
    }
  }

  .item {
    display: inline-block;
    background: #fff;
    padding: 0;
    height: px2rem(100px);
    text-align: center;
    color: #555;
  }
}

.text-normal {
  font-size: px2rem(24px);
}

.info-left {
  font-size: px2rem(28px);
  color: #3a63aa;
  font-weight: 500;
}

.info {
  .vux-flexbox {
    height: 100%;
    font-size: px2rem(16px);
    line-height: px2rem(82px);
  }
}

.icon-shujutu {
  position: relative;
  top: px2rem(2px);
  // margin-left: 4px;
}

.icon-zhuanxiangzijin {
  position: relative;
  top: px2rem(2px);
  // margin-left: 4px;
}

.nextText {
  padding: 0 0 px2rem(4px) 0;
  font-size: px2rem(24px);

  span {
    font-size: px2rem(24px);
  }

  .orangered {
    // color: orangered;
  }
}

.icon-xiala {
  position: relative;
  top: px2rem(2px, false);
  /*left: px2rem(2px, false);*/
  font-size: px2rem(26px);
  display: inline-block;
  transition: all 0.3s linear;

  &.onShow {
    transform: rotateX(180deg);
    top: px2rem(6px, false);
  }
}

.bet-chat-area /deep/ {
  padding: px2rem(2px);

  textarea {
    resize: none;
  }

  .vux-x-input {
    padding: 0;
    border-radius: px2rem(6px);
  }

  .weui-cells {
    margin: 0;
    padding: 0 0 0 px2rem(4px);
    border-radius: px2rem(3px);
    width: 92%;
  }

  .weui-cells:before,
  .weui-cells::after {
    border: none;
  }
}

.bet-money-area /deep/ {
  .weui-cells {
    margin: 0;
    padding: 0;
    border-radius: px2rem(3px);
    width: 92%;
  }

  .weui-cells:before {
    border: none;
  }
}

.moneyInfoBtn {
  display: inline-block;
  height: px2rem(30px);
}

.popover-demo-content {
  font-size: px2rem(24px);
  padding: px2rem(10px);

  p {
    font-size: px2rem(24px);
  }
}

.countInfo {
  color: #333;
  line-height: px2rem(22px);
  font-size: px2rem(14px);

  .countTitle {
    margin-left: px2rem(26px);
  }

  .countMoney {
    font-weight: 600;
    color: orangered;
  }

  .lose {
    color: #4173f2;
  }

  .orderNoticeText {
    font-size: px2rem(24px);
    color: #666;
    margin-left: px2rem(26px);
  }
}

.toReportBtn {
  position: absolute;
  right: px2rem(10px);
  bottom: px2rem(10px);
  display: inline-block;
  padding: px2rem(2px) px2rem(6px);
  background: #ff8054;
  border-radius: px2rem(3px);
  font-size: px2rem(24px);
  color: #fff;
}
</style>
