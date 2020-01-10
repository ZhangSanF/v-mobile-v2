<template>
  <div class="right-menu">
    <div class="topBtns">
      <a class="topBtn pay" @click="toPage('/money/pay',1)">我要充值</a>
      <a class="topBtn draw" @click="getMoney">立即提现</a>
    </div>
    <div class="list">
      <ul>
        <li class="onlyShow">
          <span class="icon iconfont icon-weijiesuan"></span>
          <span class="text">
            账户余额
            <span class="moneyText">{{user.money}}</span>
          </span>
        </li>
        <li class="onlyShow">
          <span class="icon iconfont icon-jinrishuying"></span>
          <span class="text">
            今日输赢
            <span class="moneyText">{{user.winorlose}}</span>
          </span>
        </li>

        <li @click="toPage('/user/reportdate')">
          <span class="icon iconfont icon-xiazhujilu"></span>
          <span class="text">历史报表</span>
        </li>
        <li @click="toPage(`/data?page=History&code=${code}`)">
          <span class="icon iconfont icon-kaijiangjieguo"></span>
          <span class="text">开奖结果</span>
        </li>
        <li @click="toPage(`/data?page=DraDew&code=${code}`)">
          <span class="icon iconfont icon-kaijiangshuju"></span>
          <span class="text">露珠长龙</span>
        </li>
        <li @click="toPage(`/data?page=Rules&code=${code}`)">
          <span class="icon iconfont icon-youxiguize"></span>
          <span class="text">游戏规则</span>
        </li>
        <li @click="toPage('/preferential')">
          <span class="icon iconfont icon-youhuihuodong"></span>
          <span class="text">优惠活动</span>
        </li>
        <li @click="toPage('/user/setting')">
          <span class="icon iconfont icon-xitongshezhi"></span>
          <span class="text">系统设置</span>
        </li>
        <li @click="toPage('/home/main')">
          <span class="icon iconfont icon-fanhuishouye"></span>
          <span class="text">返回首页</span>
        </li>
        <li @click="doLogout">
          <span class="icon iconfont icon-anquantuichu"></span>
          <span class="text">安全退出</span>
        </li>
      </ul>
    </div>
    <div class="activityPic" @click="toPage('/preferential')">
      <img :src="settingImages.yhdt_pic" alt>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";

Vue.use(Viewer);
import {
  Loading,
  XDialog,
  XButton,
  TransferDomDirective as TransferDom
} from "vux";
import BScroll from "better-scroll";
import scroll from "@/components/common/scroll";
import { betInit, PAGES, GAMES } from "@/config";
import { setTimeout } from "timers";

export default {
  name: "RightMenu",
  directives: {
    TransferDom
  },
  components: {
    scroll,
    BScroll,
    Loading,
    XDialog,
    XButton,
    Viewer
  },
  props: {
    msg_content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {}, 20);
  },
  methods: {
    ...mapActions([
      "homeChatGetChatLog",
      "homeChatGetRedPackage",
      "uploadErrorLog",
      "homeChatSendMsgToChatRoom",
      "homeLoginOrRegisterLogOff",
      "homeIndexInit",
    ]),

    toPage(url, isGo) {
      if (isGo && (!this.user || this.user.agmem != 1)) {
        this.$vux.alert.show({
          title: "提示",
          content: `请登录为正式用户!`
        });
        return;
      }
      this.$emit("rightMenuClosed");
      this.$router.push(`${url}`);
    },

    getMoney() {
      if (!this.user || this.user.agmem != 1) {
        this.$vux.alert.show({
          title: "提示",
          content: `请登录为正式用户!`
        });
        return;
      }
      this.loadingShow = true;
      this.homeIndexInit({ actions: "bankInfo" })
        .then(res => {
          this.loadingShow = false;
          if (res.resCode == 1000) {
            var bankInfo = res.data.bankInfo; //银行卡信息
            bankInfo && this.$store.commit("SAVE_USER_BANKCARD_INFO", bankInfo);
            if (bankInfo.bankcard) {
              //已经绑定了银行卡
              this.$router.push("/money/draw");
            } else {
              this.$router.push("/money/addcard");
            }
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: `账户信息获取失败，请刷新重试！${res.msg}`
            });
          }
        })
        .catch(err => {
          this.loadingShow = false;
          this.$vux.alert.show({
            title: "提示",
            content: `账户信息获取失败，请刷新重试！${err}`
          });
        });
    },

    doLogout() {
      var _this = this;
      this.$vux.confirm.show({
        title: "退出登录",
        content: "确定要退出吗？",
        onCancel() {
          _this.$vux.toast.show({
            text: "已取消",
            type: "cancel"
          });
        },
        onConfirm() {
          _this.homeLoginOrRegisterLogOff().then(res => {
            if (res.resCode === 1000) {
              _this.$store.commit("SAVE_USER_INFO", { data: {} });
              _this.$vux.toast.show({
                text: "您已退出当前登录！",
                type: "success"
              });
              _this.$router.push("/home/main");
            } else {
              _this.$vux.alert.show({
                title: "操作失败",
                content: `操作失败！请刷新页面重试或者联系客服处理！${
                  res.msg
                },${res.resCode}`
              });
            }
          });
        }
      });
    }
  },
  computed: {
    ...mapState(["code", "play", "chat", "user", "settingImages"])
  }
};
</script>

<style scoped lang="scss">
.right-menu {
  padding: px2rem(28px) 0 0 px2rem(20px);
  box-sizing: border-box;
  overflow: hidden;
  .topBtn {
    position: relative;
    top: px2rem(-6px);
    display: inline-block;
    width: px2rem(188px);
    box-sizing: border-box;
    padding: px2rem(20px) px2rem(34px);
    font-size: px2rem(28px);
    border-radius: px2rem(36px);

    &.pay {
      background-color: #51a4fb;
      color: #fff;
    }

    &.draw {
      box-sizing: border-box;
      border: 1px solid #51a4fb;
      background-color: #fff;
      color: #51a4fb;
    }
  }

  .list {
    position: absolute;
    top: px2rem(150px);
    bottom: px2rem(200px);
    overflow-x: auto;
    width: 100%;
    li {
      padding: px2rem(25px) px2rem(50px);
      font-size: px2rem(24px);
      color: #333;
      font-weight: 500;
      .iconfont {
        font-size: px2rem(44px);
        color: #51a4fb;
      }

      .text {
        position: relative;
        top: px2rem(-8px);

        .moneyText {
          font-weight: 500;
          margin-left: px2rem(10px);
          color: red;
        }
      }
    }
  }

  .activityPic {
    width: 100%;
    height: px2rem(180px);
    position: absolute;
    bottom: px2rem(20px);
    left: 0;
    padding: 0 px2rem(10px);
    box-sizing: border-box;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
}
</style>
