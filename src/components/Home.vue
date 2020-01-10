<template>
  <div>
    <div class="header" v-if="page != 'ucenter'">
      <div class="logoBox">
        <img :src="settingImages.new_logo" alt />
      </div>
      <div class="rightBox">
        <span
          v-if="user.username"
          class="username"
          @click="tabChange('ucenter')"
        >{{user.username == 'guest' ? '游客' : user.username}}</span>
        <span v-else class="login" @click="toLogin">登录</span>
        <span v-if="!user.username" class="login" @click="toReg">注册</span>
        <span v-if="!user.username" class="login" @click="guestLogin">试玩</span>
        <span v-if="user.username" class="logout" @click="doLogout">退出</span>
      </div>
    </div>
    <div :class="page == 'ucenter' ? 'ucBody bg-ucBody-bgColor' : 'body'">
      <keep-alive>
        <transition :name="transitionName" >
          <router-view @tabsChange="tabsChange" class="child-view"></router-view>
        </transition>
      </keep-alive>
    </div>
    <!-- <div class="download-wrap" v-show="appDownloadShow == 1">
      <a class="close" @click="hideAppDownload">X</a>
      <img src="../assets/images/app_download.gif" alt class="gifPic" />
      <div class="info">
        <p>下载APP 多重好礼等你拿</p>
      </div>
      <a class="download" @click="toAppDownload">立即下载</a>
    </div> -->

    <div class="footer row">
      <tabbar>
        <tabbar-item :selected="page == 'main'" @click.native="tabChange('main')">
          <span slot="label" class="tab-item-icon">
            <span class="iconfont icon-home_selected"></span>
            <p>首页</p>
          </span>
        </tabbar-item>
        <tabbar-item :selected="page == 'games'" @click.native="tabChange('games')">
          <span slot="label" class="tab-item-icon">
            <span class="iconfont icon-game_selected"></span>
            <p>游戏大厅</p>
          </span>
        </tabbar-item>
        <tabbar-item
          :selected="page == 'chat'"
          @click.native="tabChange('chat')"
          v-if="user.username && !baseInfo.isAgent"
        >
          <span slot="label" class="tab-item-icon">
            <span class="iconfont icon-chat_selected"></span>
            <p>聊天室</p>
          </span>
        </tabbar-item>
        <tabbar-item :selected="page == 'service'" @click.native="tabChange('service')">
          <span slot="label" class="tab-item-icon">
            <span class="iconfont icon-fuwudating_selected"></span>
            <p>服务大厅</p>
          </span>
        </tabbar-item>
        <tabbar-item :selected="page == 'ucenter'" @click.native="tabChange('ucenter')">
          <span slot="label" class="tab-item-icon">
            <span class="iconfont icon-yonghuming"></span>
            <p>个人中心</p>
          </span>
        </tabbar-item>
      </tabbar>
    </div>
    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>
    <keep-alive>
      <announcement-pop />
    </keep-alive>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Loading, TransferDom } from "vux";
import { mapState, mapActions } from "vuex";
import AnnouncementPop from "@/components/common/announcementPop";

const logoImg = "/static/images/1.jpg";

export default {
  name: "Home",
  components: {
    Tabbar,
    TabbarItem,
    Loading,
    AnnouncementPop
  },
  directives: { TransferDom },
  data() {
    return {
      page: "main",
      title: {
        main: "欢迎使用彩票APP",
        games: "游戏大厅",
        account: "我的账户",
        service: "服务大厅"
      },
      transitionName:"",
      loadingShow: false,
      loadingText: "加载中"
    };
  },
  mounted() {
    setTimeout(() => {
      this.title.main = this.ptName;
      this.tabChange(this.$route.name.toLowerCase());
      console.log(this.$route.name);
    }, 20);
  },
  watch: {
    ptName() {
      this.title.main = this.ptName;
    },
    $route(to, from) {
      if(to.meta.index > from.meta.index){
	    //设置动画名称
        this.transitionName= 'slide-left';
      }else{
        this.transitionName= 'slide-right';
      }
    }
  },
  methods: {
    ...mapActions([
      "homeIndexInitData",
      "homeLoginOrRegisterLogOff",
      "homeLoginOrRegisterLogin"
    ]),

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
              _this.page = "main";
            } else {
              _this.$vux.alert.show({
                title: "操作失败",
                content: `操作失败！请刷新页面重试或者联系客服处理！${res.msg},${res.resCode}`
              });
            }
          });
        }
      });
    },
    tabChange(e) {
      this.page = e;
      this.$router.push(e);
      setTimeout(() => {
        this.$store.commit("SCROLL_REFRESH");
      }, 100);
    },
    toLogin() {
      this.$router.push("/login");
    },
    toReg() {
      this.$router.push("/reg");
    },
    tabsChange(m) {
      this.page = m;
    },
    hideAppDownload() {
      this.$store.commit("CHANGE_APP_DOWNLOAD_SHOW", "2");
    },
    guestLogin() {
      this.loadingShow = true;
      var source = 3;
      if (this.isApp) {
        source = 3;
      } else {
        source = 2;
      }
      var data = {
        userName: "",
        password: "",
        regularOrguest: "guest",
        source: source,
        version: 2
      };
      this.homeLoginOrRegisterLogin(data)
        .then(res => {
          this.loadingShow = false;
          var _this = this;
          if (res.resCode === 1000) {
            this.$vux.alert.show({
              title: "游客登录",
              content: `游客账号登录成功，感谢您的关注！`
            });
            this.homeIndexInitData({ actions: "publicInfo,userInfo,all" });
          } else {
            this.$vux.alert.show({
              title: "登录失败",
              content: `登录失败！<br>原因: ${res.data.msg}`
            });
          }
        })
        .catch(err => {
          this.loadingShow = false;
          this.$vux.alert.show({
            title: "登录失败",
            content: `登录失败！请刷新页面重试，多次出现此问题请截图联系客服处理，${err}`
          });
        });
    },
    toAppDownload() {
      window.location.href = this.outLink.app_download_url;
    }
  },
  computed: {
    ...mapState([
      "user",
      "outLink",
      "appDownloadShow",
      "ptName",
      "isApp",
      "baseInfo",
      "settingImages"
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  height: px2rem(80px);
  line-height: px2rem(80px);
  font-size: 16px;
  background-color: $public-header-background-color;
  color: #fff;

  .logoBox {
    width: px2rem(242px);
    display: inline-block;
    padding: px2rem(4px) px2rem(20px);

    img {
      height: px2rem(70px);
    }
  }

  .rightBox {
    font-size: 0;
    float: right;
    margin-top: px2rem(8px);
    margin-right: 9px;

    span {
      display: inline-block;
      width: px2rem(120px);
      height: px2rem(48px);
      font-size: px2rem(26px);
      line-height: px2rem(48px);
      text-align: center;
      margin-right: px2rem(20px);
      background-color: #4183c9;
      border-radius: 3px;

      &.username {
        width: auto;
        padding: 0 px2rem(16px);
      }
    }
  }
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 30;
  height: px2rem(90px);

  .iconfont {
    font-size: px2rem(40px);

    &.icon-personal_default {
      /*font-size: px2rem(50px);*/
      position: relative;
    }

    &.icon-home_selected {
      position: relative;
    }
  }

  p {
    font-size: px2rem(20px);
  }

  .vux-tabbar-simple {
    height: px2rem(90px);
    line-height: px2rem(90px);
  }
}

.body {
  position: absolute;
  top: px2rem(80px);
  bottom: px2rem(90px);
  width: 100%;
  overflow: hidden;
}

.ucBody {
  top: 0;
  bottom: 0;
  width: 100%;
}

.tab-item {
  padding: px2rem(6px);
  box-sizing: border-box;
  display: inline-block;
  line-height: px2rem(14px);
  vertical-align: middle;
}

.tab-item span {
  font-size: px2rem(24px);
}

.weui-tabbar__label {
  height: 100%;
}

.weui-bar__item_on {
  p,
  i {
    color: #51a4fb;
  }
}

.tab-item-icon {
  display: block;
  line-height: px2rem(65px);
  height: px2rem(90px);

  p {
    line-height: 0px;
    font-size: px2rem(24px);
  }
}

.weui-tabbar__item {
  &:nth-of-type(2) {
    i {
      position: relative;
      top: px2rem(4px);
    }
  }

  &:nth-of-type(3) {
    i {
      position: relative;
      top: px2rem(2px);
    }
  }

  &:nth-of-type(4) {
    i {
      position: relative;
      top: px2rem(2px);
    }
  }
}

.bgShade {
  position: absolute;
  z-index: 8;
  width: 100%;
  top: 0;
  bottom: px2rem(80px);
  background-color: rgba(0, 0, 0, 0.7);
}

.download-wrap {
  position: absolute;
  bottom: px2rem(110px);
  height: px2rem(80px);
  left: 0;
  width: 100%;
  z-index: 10;
  background: #51a4fb;
  display: flex;
  color: #fff;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 0;
  overflow: auto;

  .gifPic {
    height: px2rem(76px);
    margin-left: px2rem(10px);
  }

  .close {
    font-size: px2rem(30px);
    display: inline-block;
    width: px2rem(60px);
    height: 100%;
    text-align: center;
    line-height: px2rem(80px);
  }

  a {
    display: block;
  }

  .info {
    font-style: px2rem(30px);
    line-height: px2rem(40px);
    margin-left: px2rem(20px);

    .logo {
      width: px2rem(80px);
      height: px2rem(80px);
      background-size: 100%;
      margin-right: px2rem(10px);
      border-radius: px2rem(8px);

      img {
        height: 100%;
        width: 100%;
      }
    }

    h3 {
      font-size: px2rem(30px);
    }

    p {
      font-size: px2rem(24px);
    }
  }

  .download {
    width: px2rem(180px);
    height: 100%;
    line-height: px2rem(80px);
    text-align: center;
    color: #fff;
    background-color: #0073eb;
    font-size: px2rem(30px);
    position: absolute;
    right: 0;
  }
}

.weui-tabbar:before {
  border: none;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}
.child-view {
  transition: all .3s ease;
}
</style>
