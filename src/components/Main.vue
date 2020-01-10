<template>
  <div class="mainWarp">
    <scroll
      ref="wrapper"
      class="wrapper"
      :probeType="3"
      :listenScroll="true"
      @scroll="pageScrolled"
    >
      <div class="content">
        <div class="card card-1">
          <span class="online">当前在线: {{onlineCount}}</span>
          <span class="toPreviewVersion" @click="toPreviewVersion">切换旧版</span>
          <swiper
            ref="swiperOptionsImg"
            class="images-content"
            :options="swiperOptionsImg"
            v-if="settingImages.lunbo"
          >
            <swiper-slide class="swiper-demo-img" v-for="(n,k) in settingImages.lunbo" :key="k">
              <img :src="n.img" width="100%" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="card-footer">
            <div class="notice" @click="toPage('/User/message?type=1')">
              <i class="iconfont icon-laba"></i>
              <VSwiper
                auto
                height="30px"
                direction="vertical"
                :interval="3000"
                class="VSwiper"
                :show-dots="false"
              >
                <template v-for="(item, index) in announcement">
                  <swiper-item v-for="(item, key) in item.data" :key="index+key+'-'+index">
                    <p>{{item.title}}</p>
                  </swiper-item>
                </template>
              </VSwiper>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="tabBox">
            <div :class="{'tabActive':tabBoxActive == 1}" @click="changeTabBoxActive(1)">
              <span class="iconfont icon-caipiaoyouxi"></span>
              <p>彩票游戏</p>
            </div>
            <div :class="{'tabActive':tabBoxActive == 2}" @click="changeTabBoxActive(2)">
              <span class="iconfont icon-qipaiyouxi"></span>
              <p>棋牌游戏</p>
            </div>
            <div :class="{'tabActive':tabBoxActive == 3}" @click="changeTabBoxActive(3)">
              <span class="iconfont icon-hongbao"></span>
              <p>红包游戏</p>
            </div>
            <div @click="toAppDownload">
              <span class="iconfont icon-APPxiazai1"></span>
              <p>APP下载</p>
            </div>
          </div>
          <div v-show="tabBoxActive == 3" class="RedPackGame">
            <!-- 红包游戏 -->
            <grid :cols="1" :show-lr-borders="false">
              <grid-item
                :class="item.name"
                class="item"
                @click.native="toRedPackGame(item)"
                v-for="(item,index) in redPackGameBaseInfo.gameType"
                :key="index"
              ></grid-item>
            </grid>
            <!-- 红包游戏 -->
            <!-- <games-card-small
              :game="{openTime: 0}"
              :index="'hbyx'"
              :count="0"
              v-show="baseInfo.is_open_reGame == 1"
            ></games-card-small>-->
          </div>
          <div v-show="tabBoxActive == 2">
            <div class="cardBox" @click="toGame('kyqp')">
              <games-card-small
                :game="{openTime: 0}"
                :index="'kyqp'"
                v-show="baseInfo.is_open_kaiyuan == 1"
                :count="0"
              ></games-card-small>
              <games-card-small
                :game="{openTime: 0}"
                :index="'kyqp'"
                v-show="baseInfo.is_open_dafa == 1"
                :count="0"
              ></games-card-small>
            </div>
          </div>
          <div v-show="tabBoxActive == 1">
            <div class="warp tabItemBox" ref="warp" v-show="slidHideBoxShow">
              <tab :line-width="2" v-model="gameGroupSelected" bar-active-color="transparent">
                <tab-item
                  :selected="gameGroupSelected == parseInt(item.id)-1"
                  :active-class="'active'"
                  v-for="(item, index) in classification"
                  :key="index"
                >{{item.name}}</tab-item>
                <tab-item
                  v-if="openResult && classification"
                  :selected="gameGroupSelected == parseInt(3)-1"
                  :active-class="'active'"
                >我的关注</tab-item>
              </tab>
            </div>
            <swiper
              ref="swiper"
              class="swiper"
              :options="swiperOptions"
              @slideChangeTransitionEnd="indexChange"
              v-if="openResult && classification"
            >
              <swiper-slide v-for="(obj, index) in classification" :key="index">
                <div
                  class="cardBox"
                  :class="{'moreHeight':obj.data && obj.data.length<9 && obj.data.length>3,'moreHeightMore':obj.data && obj.data.length<4}"
                >
                  <template v-for="(item, key) in obj.data">
                    <games-card-small :game="item" :index="item.code" :key="key" :count="key + 1"></games-card-small>
                  </template>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="cardBox">
                  <template v-for="(obj, index) in classification">
                    <template v-for="(item, key) in obj.data">
                      <games-card-small
                        v-show="followLotteryList.indexOf(item.code) !=-1 && obj.key == 'quanbu'"
                        :game="item"
                        :index="item.code"
                        @refreshFollowLotteryList="loadFollowLotteryListFunc"
                        :changeIndex="gameGroupSelected"
                        :key="`${key+key+index}-quanbu`"
                        :count="key + 1"
                      ></games-card-small>
                    </template>
                  </template>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </scroll>
    <!-- 首页小红包 animete-->
    <div
      v-if="redPackageHomeMsg.open_status == 1"
      class="smallred"
      id="moveDiv"
      @click="openRedPcak"
      @touchstart="down()"
      @touchmove="move()"
      @touchend="end()"
    >
      <span
        v-if="curTimeNum > 0"
      >{{formatTime(curTimeNum).hour}}:{{formatTime(curTimeNum).min}}:{{formatTime(curTimeNum).second}}</span>
      <span v-else>00:00:00</span>
    </div>
    <!-- 红包弹窗 -->
    <div class="bigred_mask" v-if="showRedPack">
      <div class="redPackModal">
        <div class="redPackModalBody">
          <div class="redPackModalHeader">
            <span class="close" @click="closeRedPack">
              <i class="closeIcon iconfont icon-tuichu"></i>
            </span>
          </div>
          <div class="redPackModalMain">
            <div class="redPackInfo">
              <!-- <img :src="settingImages.new_logo" alt /> -->
              <div class="info-font">
                <p>{{redPackageHomeMsg.title}}</p>
                <!-- grab_status: 0, // 抢包状态 0：倒计时  1：可抢中  2：异常 -->
                <!-- v-if="redPackageHomeMsg.grab_status == 0" -->
                <p>
                  红包倒计时:
                  <span
                    v-if="curTimeNum > 0"
                  >{{formatTime(curTimeNum).hour}}:{{formatTime(curTimeNum).min}}:{{formatTime(curTimeNum).second}}</span>
                  <span v-else>00:00:00</span>
                </p>
              </div>
            </div>
            <div class="redPackOpen">
              <!-- curRedPackState //0可抢 1,抢完 -->
              <img
                v-if="curRedPackState == 0 || curIsQ == true"
                class="openImg"
                @click="openRedPack"
                :class="{'openingAni':isOpenIng}"
                src="../assets/images/redPackGame/open.png"
                alt
              />
              <span class="money-q" v-else>{{redPackMoneyText}}</span>
            </div>
          </div>
          <div class="redPackModalBot">
            <div class="seeRedPack">
              <p class="botMsgImg">
                <img src="../assets/images/redPackGame/ic_red_packet_position.png" alt />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Grid,
  GridItem,
  Tab,
  TabItem,
  Swiper as VSwiper,
  SwiperItem
} from "vux";
import { mapState, mapGetters, mapActions } from "vuex";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { onlineCount } from "@/methods";
import { loadFollowLotteryList } from "@/methods/cache";
import GamesCardSmall from "@/components/common/GamesCardSmall";
import scroll from "@/components/common/scroll";
import { GAMES } from "@/config";
import { formatTimerCallback } from "@/methods";

export default {
  name: "Main",
  components: {
    scroll,
    Grid,
    GridItem,
    swiper,
    swiperSlide,
    Tab,
    TabItem,
    GamesCardSmall,
    VSwiper,
    SwiperItem
  },
  props: [],
  data() {
    return {
      tabBoxActive: 1,
      img_index: 0,
      isShowCard: true,
      scrollY: 0,
      deviceWidth: document.body.clientWidth,
      onlineNum: 18888,
      gameGroupSelected: 0,
      slidHideBoxShow: true, //slidHideBox显示隐藏
      swiperOptions: {},
      swiperOptionsImg: {
        loop: true,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      followLotteryList: [],
      // 红包相关
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      isClick: false,
      firstTime: 0,
      lastTime: 0,
      showRedPack: false,
      curTimeNum: 0,
      curIsQ: true,
      setTimeFunc: null,
      isOpenIng: false,
      curRedPackState: 0, //0可抢 1,抢完
      redPackMoneyText: "",
      redPackMoney: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.followLotteryList = loadFollowLotteryList();
      this.swiperOptionsImg = {
        loop: true,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      };
      this.$emit("tabsChange", "main");
      const _this = this;
      window.addEventListener("resize", function() {
        _this.deviceWidth = document.body.clientWidth;
      });
      this.classData();
      if (this.redPackageHomeMsg) {
        this.timeDown();
      }
    });
  },
  created() {
    let self = this;
    this.swiperOptions = {
      autoHeight: true,
      loop: false,
      on: {
        click(swiper) {
          let dataIndex = swiper.target.attributes["data-index"];
          if (!dataIndex) return;
          let code = dataIndex.nodeValue;
          self.toGame(code);
        }
      }
    };
  },
  methods: {
    ...mapActions(["homeChatGetRedPackageTime", "homeChatGetRedPackage"]),
    toGame(code) {
      if (code == "kyqp") {
        this.$router.push(`/qipai`);
      } else if (code == "hbyx") {
        this.$router.push(`/redPack/redpackgame`);
      } else {
        this.$store.commit("CHANGE_CODE", code);
        var p = GAMES[code].play[0];
        let t = GAMES[code].count[p].lt;
        this.$router.push(`/lottery/${code}/${t}`);
      }
    },

    // 切换游戏玩法
    changeTabBoxActive(tab) {
      this.tabBoxActive = tab;
    },

    toRedPackGame(item) {
      this.$router.push(`/redPack/gameGroup/${item.id}`);
    },

    loadFollowLotteryListFunc() {
      this.followLotteryList = loadFollowLotteryList();
    },

    toPreviewVersion() {
      let _this = this;
      this.$vux.confirm.show({
        title: "切换旧版",
        content: "是用不习惯？点击可切换至旧版APP",
        onCancel() {
          _this.$vux.toast.show({
            text: "已取消",
            type: "cancel"
          });
        },
        onConfirm() {
          if (_this.isApp) {
            window.location.href = "/mobile?p=app";
          } else {
            window.location.href = "/mobile";
          }
        }
      });
    },
    indexChange(e) {
      this.gameGroupSelected = this.$refs.swiper.swiper.activeIndex;
      this.$store.commit("SCROLL_REFRESH");
      this.followLotteryList = loadFollowLotteryList();
    },

    pageScrolled(pos) {
      this.scrollY = pos.y;
    },

    luckDraw() {
      if (!this.user || this.user.agmem != 1) {
        this.$vux.alert.show({
          title: "提示",
          content: `请登录为正式用户!`
        });
        return false;
      }
      this.$router.push("/luckDraw");
    },

    openAgentChat() {
      var _this = this;
      this.$vux.confirm.show({
        title: "打开QQ",
        content: `即将打开QQ会话窗口，部分机型和浏览器可能出现打开QQ失败的情况，请联系QQ号${item.initVal}，或联系在线客服处理。`,
        onConfirm() {
          window.open(item.value);
        }
      });
    },

    //js路由跳转
    toPage(e) {
      this.$router.push(e);
    },
    toOnlineSupport() {
      window.location.href = this.outLink.customer_service;
    },
    toAppDownload() {
      window.open(this.outLink.app_download_url)
      // window.location.href = this.outLink.app_download_url;
    },
    toPC() {
      if (this.baseInfo.isAgent && !this.user.username) {
        window.location.href = window.location.origin + "/main/login.html?f=";
      } else {
        window.location.href = window.location.origin + "/game";
      }
    },
    classData() {
      if (this.classification) {
        this.classification.forEach(item => {
          this.$set(item, "data", []);
          Object.keys(this.openResult).forEach((obj, key) => {
            this.$set(this.openResult[obj], "code", obj);
            if (this.openResult[obj].classification.indexOf(item.id) != -1) {
              if (item.data) {
                item.data.push(this.openResult[obj]);
              } else {
                this.$set(item, "data", []);
                item.data.push(this.openResult[obj]);
              }
            }
          });
        });
      }
    },

    // 手指按下
    down() {
      this.flags = true;
      // 记录时间
      this.firstTime = new Date().getTime();
    },

    // 手指移动
    move() {
      if (this.flags) {
        moveDiv.style.transition = "none";
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;

        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";

        //阻止页面的滑动默认事件
        document.addEventListener(
          "touchmove",
          function() {
            event.stopPropagation();
          },
          false
        );
      }
    },

    //手指释放
    end() {
      this.flags = false;

      const maxWidth = document.body.clientWidth; //屏幕宽度
      const maxHeight = document.body.clientHeight; //屏幕高度

      //左
      if (this.nx < maxWidth / 2) {
        moveDiv.style.left = 0 + "px";
      } else {
        //右
        moveDiv.style.left = maxWidth - 40 + "px";
      }

      //上
      if (this.ny < 0) {
        moveDiv.style.top = 40 + "px";
      } else if (this.ny > maxHeight - 60 - 50) {
        //下
        moveDiv.style.top = maxHeight - 60 - 50 + "px";
      }

      moveDiv.style.transition = "all 0.5s ease 0s";
    },

    // 点击小红包事件
    openRedPcak() {
      this.lastTime = new Date().getTime();
      if (this.lastTime - this.firstTime < 200) {
        this.homeChatGetRedPackageTime({
          red_package_id: this.redPackageHomeMsg.red_package_id
        }).then(res => {
          if (res.resCode == 1000) {
            this.showRedPack = true;
            this.curRedPackState = res.data.user_grab_status;
            this.redPackMoney = res.data.grab_money;
            if (res.data.grab_money > 0) {
              this.curIsQ = false;
              this.redPackMoneyText = `您已领取过${res.data.grab_money}元红包!`;
            }
          } else if (res.resCode == 1004) {
            this.$vux.alert.show({
              title: "提示",
              content: `登录后可抢红包！`
            });
          }
        });
      }
    },

    formatTime(time) {
      return formatTimerCallback(time);
    },

    // 红包倒计时
    timeDown() {
      let _self = this;
      _self.curTimeNum = _self.redPackageHomeMsg.over_time;

      if (_self.curTimeNum <= 0) {
        if (_self.redPackMoney > 0) {
          _self.curIsQ = false;
        }
        return;
      }
      clearTimeout(_self.setTimeFunc);
      let _run = () => {
        _self.setTimeFunc = setTimeout(() => {
          _self.curTimeNum--;
          if (_self.curTimeNum > 0) {
            _self.curIsQ = true;
            _self.redPackMoney = 0;
            _run();
          } else {
            return;
          }
        }, 1000);
      };
      _run();
    },

    //关闭红包弹窗
    closeRedPack() {
      this.showRedPack = false;
    },

    // 点击开红包
    openRedPack() {
      this.isOpenIng = true;
      this.homeChatGetRedPackage({
        red_package_id: this.redPackageHomeMsg.red_package_id
      }).then(res => {
        if (res.resCode == 1000) {
          this.isOpenIng = false;
          this.curIsQ = false;
          this.redPackMoneyText = `恭喜您抢到${res.data.grab_amount}元!`;
          this.redPackMoney = res.data.grab_amount;
          this.curRedPackState = res.data.user_grab_status;
        } else {
          this.isOpenIng = false;
          this.$vux.alert.show({
            title: "提示",
            content: res.msg
          });
        }
      });
    }
  },
  watch: {
    // scrollY() {
    //   // let curHeight = 0;
    //   // curHeight = this.$refs.slidHideBox.clientHeight;
    //   if (this.scrollY < -100) {
    //     this.$store.commit("CHANGE_APP_DOWNLOAD_SHOW", "2");
    //   } else {
    //     this.$store.commit("CHANGE_APP_DOWNLOAD_SHOW", "1");
    //   }
    // },
    classification() {
      this.classData();
    },
    gameGroupSelected() {
      this.$refs.swiper.swiper.slideTo(this.gameGroupSelected, 500, false);
      this.followLotteryList = loadFollowLotteryList();
    },
    redPackageHomeMsg() {
      this.timeDown();
    }
  },
  computed: {
    ...mapState([
      "showCode",
      "openResult",
      "qipai",
      "announcement",
      "outLink",
      "skin",
      "onlineCount",
      "settingImages",
      "user",
      "isApp",
      "redPackageHomeMsg"
    ]),
    ...mapGetters(["baseInfo", "classification", "redPackGameBaseInfo"]),
    deviceHeight() {
      return this.deviceWidth / 2.285 + "";
    },

    announcementText() {
      if (this.announcement.length) {
        var res = [];
        for (var i = 0; i < this.announcement.length; i++) {
          res.push(`${i + 1}. ${this.announcement[i].content}`);
        }
        return res.join("; ");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  user-select: none;
  overflow: hidden;
  .arrows {
    position: absolute;
    bottom: px2rem(200px);
    z-index: 999;

    img {
      width: px2rem(60px);
    }

    &.arrowsLeft {
      left: px2rem(10px);

      img {
        transform: rotate(180deg);
      }
    }

    &.arrowsRight {
      right: px2rem(10px);
    }
  }
}

.mainWarp {
  background: -webkit-linear-gradient(
    #ededed 20%,
    #fff 80%
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#ededed 20%, #fff 80%); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    #ededed 20%,
    #fff 80%
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(#ededed 20%, #fff 80%); /* 标准的语法 */
  height: 100%;
  overflow: hidden;
}

.content {
  width: 100%;
  // padding-top: px2rem(180px);
  padding-bottom: px2rem(12px);
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  z-index: 10;
}

.swiper-container {
  background-color: #fff;
}

.game {
  margin-bottom: px2rem(12px);
  text-align: center;
  font-size: px2rem(14px);
  color: #7f858a;
  height: px2rem(100px);
}

.game .img {
  padding-top: px2rem(10px);
  box-sizing: border-box;
  height: px2rem(70px);
  vertical-align: middle;
}

.game p {
  margin: 0;
}

.slidHideBox {
  height: px2rem(165px);
  background-color: #fff;
  margin-top: px2rem(15px);
  margin-bottom: px2rem(15px);
  display: flex;
  box-sizing: border-box;
  padding: px2rem(20px);
  transition: height 0.3s;

  .imgBox {
    position: relative;
    flex: 1;
    width: px2rem(224px);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: px2rem(24px);
    padding: px2rem(15px);

    .tap {
      position: absolute;
      z-index: 14;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .tapNoEnv {
      pointer-events: none;
    }

    h2 {
      font-weight: 400;
      font-size: px2rem(30px);
    }

    &:nth-of-type(1) {
      background-image: url("../assets/images/luckDraw.png");
    }

    &:nth-of-type(2) {
      margin: 0 px2rem(9px);
      background-image: url("../assets/images/agent.png");
    }

    &:nth-of-type(3) {
      background-image: url("../assets/images/plan.png");
    }

    img {
      width: 100%;
    }
  }
}

.card-footer {
  margin-bottom: px2rem(15px);
  height: px2rem(66px);
  line-height: px2rem(66px);
  color: #3bb3ff;
  text-align: center;
  background-color: #fff;
  padding-top: px2rem(13px);
  box-sizing: border-box;

  .notice {
    height: px2rem(40px);
    padding: 0 px2rem(20px);
    line-height: px2rem(40px);
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    i {
      font-size: px2rem(40px);
      width: px2rem(70px);
      vertical-align: middle;
    }
  }

  .VSwiper {
    flex: 1;
    font-size: px2rem(26px);
    text-align: left;
    color: #333;
  }
}
.tabBox {
  display: flex;
  height: px2rem(140px);
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  > div {
    flex: 1;
    text-align: center;
    line-height: px2rem(40px);
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      font-size: px2rem(60px);
      height: px2rem(80px);
      width: px2rem(80px);
      line-height: px2rem(80px);
      color: #fff;
      background-color: #ccc;
      border-radius: 50%;
      display: block;
    }
    p {
      font-size: px2rem(24px);
    }
    &.tabActive {
      color: #60abf9;
      span {
        background-color: #60abf9;
        color: #fff;
      }
    }
  }
}
.tabItemBox {
  width: 100%;
  overflow: hidden;
  user-select: none;
  background-color: #fff;
  .active {
    color: #60abf9;
    border-bottom: px2rem(6px) solid #60abf9 !important;
  }

  &.toTop {
    top: px2rem(400px);
    position: absolute;
    z-index: 11;
  }

  .vux-tab-wrap {
    width: 100%;
  }

  /deep/ .vux-tab-ink-bar {
    margin: 0 !important;
  }
}

.swipe-imgs {
  width: 100%;
}

.vux-slider {
  background: #fff;
}

.images-content {
  overflow: hidden;
  height: px2rem(320px);
}

.card-1 {
  overflow: hidden;

  /deep/ .vux-swiper-item {
    overflow: hidden;
    touch-action: none;
  }
}

.gamesList {
  margin-bottom: px2rem(16px);
  overflow: auto;
  background-color: #fff;
}

.online {
  position: absolute;
  z-index: 5;
  right: px2rem(12px);
  top: px2rem(20px);
  font-size: px2rem(24px);
  color: #eee;
  display: inline-block;
  padding: px2rem(3px) px2rem(14px);
  border-radius: 12px;
  background-color: rgba($color: #000000, $alpha: 0.6);
}

.toPreviewVersion {
  position: absolute;
  z-index: 5;
  left: 0;
  top: px2rem(100px);
  background-color: rgba(0, 0, 0, 0.6);
  color: #f8f8f8;
  font-size: px2rem(28px);
  padding: px2rem(10px) px2rem(20px) px2rem(10px) px2rem(40px);
  border-radius: 0 px2rem(80px) px2rem(80px) 0;

  &:after {
    content: "";
    position: absolute;
    width: px2rem(20px);
    height: px2rem(20px);
    border-left: 2px solid #ddd;
    border-top: 2px solid #ddd;
    transform: rotate(-45deg);
    left: px2rem(20px);
    top: px2rem(15px);
  }

  &:before {
    content: "";
    top: px2rem(15px);
    left: px2rem(10px);
    position: absolute;
    width: px2rem(20px);
    height: px2rem(20px);
    border-left: 2px solid #ddd;
    border-top: 2px solid #ddd;
    transform: rotate(-45deg);
  }
}

.cardBox {
  display: flex;
  flex-flow: row wrap;
  touch-action: none;
  overflow: hidden;
  background-color: #fff;
  user-select: none;
  color: #555;

  &.moreHeight {
    padding-bottom: px2rem(400px);
  }

  &.moreHeightMore {
    padding-bottom: px2rem(600px);
  }
}

.toolLink {
  padding: px2rem(6px) px2rem(6px) 0 px2rem(6px);
  text-align: center;

  span {
    display: inline-block;
    padding: px2rem(6px) px2rem(13px);
    font-size: px2rem(13px);
    color: #fff;
    border-radius: 4px;
  }
}

.bg-home-btnBgColor {
  background-color: $public-header-background-color;
}

.tabs {
  position: relative;
  left: 0;
  right: 0;
  height: px2rem(80px);
  line-height: px2rem(77px);
  background-color: #fff;
  overflow: hidden;
  white-space: nowrap;
  border-bottom: 1px solid #dddddd;

  .tabItem {
    float: left;
    width: px2rem(132px);
    color: #333;

    p {
      text-align: center;
      font-size: px2rem(30px);
      box-sizing: border-box;
    }

    &.active {
      p {
        border-bottom: 2px solid #3c91e9;
        color: #3a63aa;
      }
    }
  }
}

.tools {
  padding-bottom: px2rem(110px);
}

/deep/ .vux-slider {
  touch-action: none;
  overflow: auto !important;

  .vux-swiper {
    overflow: auto !important;
  }

  .vux-swiper-item {
    overflow: hidden;
    touch-action: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.animete {
  -webkit-box-shadow: 0 0 6px #ffd000;
  box-shadow: 0 0 6px #ffd000;
  -webkit-animation: change-hongbao 0.5s infinite;
  animation: change-hongbao 0.5s infinite;
}

.smallred {
  z-index: 111;
  position: fixed;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 3px;
  overflow: hidden;
  width: 40px;
  height: 50px;
  background: url(../assets/images/hongbao.jpg) no-repeat 50%;
  background-size: contain;
  left: 0;
  top: 145px;
}

.smallred span {
  font-size: 10px;
  -webkit-transform: scale(0.75);
  transform: scale(0.75);
  color: #ff0;
}

@-webkit-keyframes change-hongbao {
  0% {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  to {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }
}
@keyframes change-hongbao {
  0% {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  to {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }
}
.bigred_mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 222;
}
.redPackModal {
  width: px2rem(500px);
  height: px2rem(600px);
  position: absolute;
  outline: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #d95940;
  border-radius: px2rem(20px);
}
.money-q {
  color: #f8d5a4;
  font-size: px2rem(30px);
}
.redPackModalBody {
  // position: relative;
  .redPackModalHeader {
    display: flex;
    top: 0;
    position: relative;
    height: px2rem(50px);
    .close {
      position: absolute;
      right: px2rem(15px);
      top: px2rem(5px);
    }
    .closeIcon {
      color: #fff;
      font-size: px2rem(80px);
      &:hover {
        color: #eee;
      }
    }
  }
  .redPackModalMain {
    height: px2rem(500px);
    .redPackInfo {
      position: relative;
      width: 100%;
      height: px2rem(240px);
      // line-height: px2rem(240px);
      // position: absolute;
      // outline: 0;
      // top: px2rem(200px);
      // left: 50%;
      // margin: px2rem(-120px) -50%;
      text-align: center;
      img {
        width: px2rem(300px);
      }
      .userName {
        color: rgb(248, 213, 164);
        font-size: px2rem(38px);
        font-weight: bold;
      }
      .redPackDescription {
        color: rgb(248, 213, 164);
        font-size: px2rem(30px);
        margin-top: px2rem(7px);
      }
      .redPackMoneyDes {
        color: rgb(248, 213, 164);
        font-size: px2rem(38px);
        margin-top: px2rem(16px);
        font-weight: 400;
      }
      .finished {
        color: rgb(248, 213, 164);
        font-size: px2rem(40px);
        margin-top: px2rem(40px);
        font-weight: bold;
      }
      .info-font {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: px2rem(30px);
        color: #f8d5a4;
      }
    }
    .redPackOpen {
      height: px2rem(180px);
      line-height: px2rem(180px);
      text-align: center;
      .openImg {
        width: px2rem(150px);
        height: px2rem(150px);
        vertical-align: middle;
        &.openingAni {
          animation: openRedPackAni 1s linear both infinite;
        }
      }
      .isOpenIngImg {
        width: px2rem(200px);
        height: px2rem(200px);
        transition: all 1s ease-in-out;
        transform-style: preserve-3d;
      }
    }
  }
  .redPackModalBot {
    text-align: center;
    color: #fff;
    display: flex;
    position: relative;
    bottom: 0;
    width: 100%;
    .seeRedPack {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 100%;
      font-size: px2rem(28px);
      color: #f09d7a;
      text-align: center;
      .botMsg {
        font-size: px2rem(37px);
        font-weight: bold;
        color: rgb(248, 213, 164);
      }
      .botMsgImg {
        padding: px2rem(10px) 0;
        img {
          width: px2rem(38px);
          vertical-align: middle;
        }
      }
    }
  }
}
.main {
  background-color: #fff;
  height: 100%;
}
@keyframes openRedPackAni {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.end-redpack {
  margin-top: px2rem(10px);
}

.RedPackGame {
  .weui-grids:before {
    border: none;
  }
  .item {
    background-size: 100% 100%;
    height: px2rem(250px);
    margin-top: px2rem(20px);
  }
  .sl {
    background-image: url("../assets/images/redPackGame/slbg.png");
  }
  .niuniu {
    background-image: url("../assets/images/redPackGame/niuniubg.png");
  }
  .jq {
    background-image: url("../assets/images/redPackGame/jqbg.png");
  }
  .fl {
    background-image: url("../assets/images/redPackGame/flbg.png");
  }
  .weui-grids {
    text-align: center;
    padding: 0 px2rem(20px) px2rem(20px) px2rem(20px);
    box-sizing: border-box;
    .gameIcon {
      width: 80%;
    }
    p {
      font-size: px2rem(34px);
      color: #555;
    }
  }
}

.vux-tab-wrap {
  padding-top: px2rem(70px);
  border-bottom: 1px solid #f2f2f2;
  /deep/ .vux-tab-container {
    height: px2rem(70px);
    .vux-tab {
      height: px2rem(70px);
      .vux-tab-item {
        line-height: px2rem(70px);
        background: none;
      }
    }
  }
}
</style>
