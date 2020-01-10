<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <div class="bg" v-if="bgShow"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { setTimeout, setInterval } from "timers";
import { storage, getQueryString, setCookie } from "@/methods";
import { GAMES } from "@/config";

export default {
  name: "App",
  components: {},
  data() {
    return {
      bgShow: true,
      lastPath: "",
      wsTimer: null,
      wsConnecTesting: 0,
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      storage.setStorage("lastPath", to.fullPath, 1000 * 60 * 10);
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },

    stateUsername() {
      if (this.user.username && this.wsLink) {
        this.wsConnect(this.wsLink);
        this.redPackGameIndexInitFunc();
      }
    }
  },
  created() {
    //获取上次最后访问的URL
    this.lastPath = storage.setStorage("lastPath") || "";

    //COOKIE保存当前版本(旧版1 新版2)
    setCookie("mobileVersion", 2, 30);
  },
  mounted() {
    setTimeout(() => {
      this.$vux.loading.show({
        text: "初始化"
      });
      document
        .getElementsByTagName("body")[0]
        .setAttribute("class", "skin_" + this.skin);
      this.homeWithOutCheckLoginInit({
        actions: "games,name,announcement,links",
        version: 2
      })
        .then(res => {
          this.urlParams();
          this.homeIndexInitData({ actions: "publicInfo,userInfo,all" }).then(
            res => {
              if (
                this.lastPath.indexOf("/lottery") >= 0 ||
                this.lastPath.indexOf("/home") >= 0
              ) {
                this.$router.push(this.lastPath || this.$route.path);
              } else {
                this.$router.push("/home/main");
              }
              setTimeout(() => {
                this.$vux.loading.hide();
                this.bgShow = false;
              }, 1000);
            }
          );
        })
        .catch(err => {
          this.$vux.alert.show({
            title: "提示",
            content: `初始化失败，请刷新重试！${err}`
          });
          this.$router.push(this.path || "/home/main");
          this.$vux.loading.hide();
          throw err;
        });
    }, 20);
  },
  methods: {
    ...mapActions([
      "homeIndexInit",
      "homeIndexInitData",
      "homeWithOutCheckLoginInit",
      "homeChatBind",
      "homeIndexQuestNewData",
      "redPackGameIndexInit"
    ]),

    redPackGameIndexInitFunc() {
      this.$vux.loading.show({
        text: "加载中"
      });
      this.redPackGameIndexInit().then(res => {
        this.$vux.loading.hide();
        if (res.resCode == 1000) {
          console.log(res.data);
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },

    wsConnect(wsUrl) {
      var _this = this;
      var Socket = new WebSocket(wsUrl);
      Socket.onmessage = function(res) {
        _this.wsConnecTesting = 0;
        if (!_this.user.username) {
          return;
        }
        var res = JSON.parse(res.data);
        switch (res.type) {
          case "connect_msg": //初始化
            _this.$store.commit("SAVE_USER_CHATID", res.data); //保存用户websocket ID
            _this.homeChatBind({ clientId: res.data }).then(res => {
              if (res.resCode === 1000) {
                console.log("绑定成功");
              } else {
                _this.$vux.alert.show({
                  title: "提示",
                  content: "初始化失败，请刷新重试！"
                });
              }
            });
            break;

          case "auto_upgrade_money": //用户金额更新
            if (res.resCode === 1000) {
              _this.$store.commit("SAVE_USER_MONEY_INFO", res.data);
            }
            break;

          case "chat_msg": //新增聊天消息
          if (res.resCode === 1000) {
              _this.$store.commit("ADD_CHAT_MSG", {
                id: `n${res.data.chat_id}`,
                data: res.data
              });
            }
            break;
          case "red": //新增聊天消息
            if (res.resCode === 1000) {
              _this.$store.commit("ADD_CHAT_REDPACK_MSG", {
                id: `n${new Date().getTime()}`,
                data: res.data
              });
            }
            break;

          case "delete_msg": //删除消息
            if (res.resCode === 1000) {
              _this.$store.commit("DELETE_CHAT_MSG", {
                id: "n" + res.data.chat_id
              });
            }
            break;

          case "red_package_msg": //红包发送通知(代理用户不处理)
            if (res.resCode === 1000 && !_this.baseInfo.isAgent) {
              _this.$store.commit("ADD_CHAT_MSG", {
                id: `n${res.data.red_package_id}`,
                data: {
                  header_img: res.data.admin_header_img,
                  content_type: res.data.content_type,
                  red_package_id: res.data.red_package_id,
                  send_time: res.data.send_time
                }
              });
              _this.$vux.toast.text(`红包来啦！`, "top");
            }
            break;

          case "get_red_package_msg": //抢红包结果列表
            if (res.resCode === 1000) {
              _this.$store.commit("ADD_CHAT_MSG", {
                id: `n${new Date().getTime()}`,
                data: {
                  chat_id: `n${new Date().getTime()}`,
                  nick: res.data.chat_nickname,
                  money: res.data.money,
                  content_type: "list"
                }
              });
            }
            break;

          case "offline_msg": //单点登录掉线
            if (res.resCode === 1000) {
              _this.$vux.alert.show({
                title: "提示",
                content: "当前登录已失效，请重新登录！",
                onHide() {
                  window.location.reload(); //刷新页面
                }
              });
            }
            break;

          case "open_msg": //开奖
            if (res.resCode === 1000) {
              _this.$store.commit("SAVE_OPEN_INFO", {
                code: res.data.code,
                data: res.data
              });
              var randomTime = Math.floor(Math.random() * 3000);
              setTimeout(() => {
                _this.requestResult(res.data.code, res.data.open_phase);
              }, 1200 + randomTime);
            }
            break;

          case "time_msg": //时间更新
            if (res.resCode === 1000) {
              for (var k in res.data) {
                _this.$store.commit("SAVE_TIME_INFO", {
                  code: k,
                  data: res.data[k]
                });
              }
            }
            break;

          case "sys_msg": //个人消息推送
            if (
              (res.data.mark &&
                (res.data.mark == 1 && _this.baseInfo.isAgent)) ||
              (res.data.mark == 2 && !_this.baseInfo.isAgent)
            ) {
              return;
            }
            if (res.resCode === 1000) {
              _this.$vux.alert.show({
                title: "系统消息",
                content: `${res.data.content}`
              });
            }
            break;

          case "change_odds_msg": //赔率更新
            if (res.resCode === 1000) {
              _this.oddsUpdate(res.data);
            }
            break;

          case "change_code_msg": //彩种后台关闭 封盘 处理
            if (res.resCode === 1000) {
              if (res.data.display) {
                var dis = parseInt(res.data.display);
                if (dis === 0) {
                  var code = res.data.code;
                  if (code == _this.code) {
                    //用户当前彩种被关闭
                    _this.$router.push("/home/main");
                    setTimeout(() => {
                      window.location.reload();
                    }, 200);
                  }
                  var games = _this.showCode;
                  for (var i = 0; i < games.length; i++) {
                    if (games[i] == code) {
                      games.splice(i, 1);
                    }
                  }
                  _this.$store.commit("SAVE_GAMES", { data: games });
                  _this.$store.commit("DELETE_OPEN_INFO", { code: code });
                }
              }
            }
            break;

            case "red_package_home_msg": //首页红包数据
              if(res.resCode === 1000) {
                _this.$store.commit("SAVE_RED_PACKAGE_HOME_MSG", res.data);
              }
            break;
        }
      };

      if (_this.wsLink) {
        setTimeout(wsTest, 5000);
      }

      function wsTest() {
        clearTimeout(wsTest);
        if (_this.wsConnecTesting == 1) {
          //重连
          _this.wsConnect(_this.wsLink);
        } else {
          //正常检测
          if (!_this.stateUsername) {
            Socket.close();
            return;
          }
          _this.wsConnecTesting = 1;
          if (Socket.readyState != 0) {
            Socket.send("ping");
          }
          setTimeout(wsTest, 5000);
        }
      }
    },
    // closeHandle() {
    //   clearTimeout(this.wsTimer);
    //   this.wsTimer = setTimeout(() => {
    //     this.wsConnectTimes ++;
    //     if(this.wsConnectTimes >= 5){
    //       this.wsConnectTimes = 0;
    //       var _this = this;
    //       this.$vux.alert.show({
    //         title: '提示',
    //         content: `实时网络连接断开，可能影响到聊天和自动开奖，请刷新重试！`,
    //         onHide() {
    //           _this.wsConnect(_this.wsLink);
    //         }
    //       })
    //       return
    //     }
    //     this.wsConnect(this.wsLink);
    //   }, 3000);
    // },
    oddsUpdate(code) {
      if (code) {
        console.log(code + "赔率更新");
        var data = this.gameDataStore;
        if (typeof data[code] !== "undefined") {
          if (this.code == code) {
            //当前彩种 更新
            this.$store.commit("DELETE_GAMEDATA_STORE", { code: code });
            this.homeIndexInit({
              actions: "playInfo",
              code: code,
              page: this.play
            }).then(res => {
              var resData = res.data;
              this.$store.commit("SAVE_GAMEDATA_STORE", {
                data: resData.playInfo,
                code: resData.code,
                play: resData.page
              });
            });
          } else {
            //非当前彩种但有本地存储 删除本地存储
            this.$store.commit("DELETE_GAMEDATA_STORE", { code: code });
          }
        }
      }
    },
    urlParams() {
      var promocode = getQueryString("f");
      var p = getQueryString("p");
      if (p == "app") {
        localStorage.appDownloadShow = "2";
        this.$store.commit("CHANGE_APP_DOWNLOAD_SHOW", "2");
        this.$store.commit("SAVE_IS_APP", true);
      }
      if (promocode) {
        this.$store.commit("SAVE_PROMOCODE", promocode);
      }
    },
    requestResult(c, p) {
      if (this.nsInfo.indexOf(c) >= 0) {
        this.homeIndexQuestNewData({ code: c, phase: p }).then(res => {
          if (res.resCode === 1000) {
            if (res.data.order && res.data.order.length) {
              var cName = GAMES[c].name;
              this.$vux.toast.text(`恭喜${cName}已中奖！`, "top");
            }
            this.$store.commit("SAVE_USER_MONEY_INFO", res.data.money); //金额修改
          }
        });
      }
    }
  },
  computed: {
    ...mapState([
      "code",
      "user",
      "gameDataStore",
      "showCode",
      "wsLink",
      "nsInfo",
      "skin",
      "play",
      "baseInfo"
    ]),
    ...mapGetters(["stateUsername"])
  }
};
</script>

<style scoped>
.bg {
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(255, 255, 255, 1);
  z-index: 999;
}

#app {
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(150px, 0, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 1;
  transform: translate3d(-150px, 0, 0);
}
.child-view {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
