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
               <img :src="n.img" width="100%">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          <div class="card-footer">
            <div class="notice" @click="toPage('/User/message?type=1')">
              <i class="iconfont icon-xiaoxi_default"></i>
              <VSwiper
                auto
                height="30px"
                direction="vertical"
                :interval="3000"
                class="VSwiper"
                :show-dots="false"
              >
                <swiper-item v-for="(item, index) of announcement" :key="index">
                  <p>{{item.title}}</p>
                </swiper-item>
              </VSwiper>
            </div>
          </div>
        </div>
        <div class="main">
          <div>
            <div class="warp tabItemBox" ref="warp" v-show="slidHideBoxShow">
              <tab :line-width="2" v-model="gameGroupSelected" bar-active-color="transparent">
                <tab-item
                  :selected="gameGroupSelected == parseInt(item.id)-1"
                  :active-class="'active'"
                  v-for="(item, index) in classification"
                  :key="index"
                >{{item.name}}
                </tab-item>
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
                <div class="cardBox "
                     :class="{'moreHeight':obj.data && obj.data.length<9 && obj.data.length>3,'moreHeightMore':obj.data && obj.data.length<4}">
                  <games-card-small
                    :game="{openTime: 0}"
                    :index="'kyqp'"
                    v-show="index=='0' && (baseInfo.is_open_kaiyuan == 1 || baseInfo.is_open_dafa == 1)"
                    :count="0"
                  ></games-card-small>
                  <template v-for="(item, key) in obj.data">
                    <games-card-small :game="item" :index="item.code" :key="key" :count="key + 1"></games-card-small>
                  </template>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {Tab, TabItem, Swiper as VSwiper, SwiperItem} from "vux";
  import {mapState, mapGetters} from "vuex";
  import "swiper/dist/css/swiper.css";
  import {swiper, swiperSlide} from "vue-awesome-swiper";
  import {onlineCount} from "@/methods";
  import GamesCardSmall from "@/components/common/GamesCardSmall";
  import scroll from "@/components/common/scroll";
  import {GAMES} from "@/config";

  export default {
    name: "Main",
    components: {
      scroll,
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
            el: '.swiper-pagination'
          }
        },
      };
    },
    mounted(){
      this.$nextTick(()=>{
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
            el: '.swiper-pagination'
          }
        }
      })
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
      toGame(code) {
        if (code == "kyqp") {
          this.$router.push(`/qipai`);
        } else {
          this.$store.commit("CHANGE_CODE", code);
          var p = GAMES[code].play[0];
          let t = GAMES[code].count[p].lt;
          this.$router.push(`/lottery/${code}/${t}`);
        }
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
            if(_this.isApp){
              window.location.href = '/mobile?p=app';
            }else{
              window.location.href = '/mobile';
            }
          }
        });
      },
      indexChange(e) {
        this.gameGroupSelected = this.$refs.swiper.swiper.activeIndex;
        this.$store.commit("SCROLL_REFRESH");
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
          content: `即将打开QQ会话窗口，部分机型和浏览器可能出现打开QQ失败的情况，请联系QQ号${
            item.initVal
            }，或联系在线客服处理。`,
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
        window.location.href = this.outLink.app_download_url;
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
    },
    mounted() {
      setTimeout(() => {
        this.$emit("tabsChange", "main");
        const _this = this;
        window.addEventListener("resize", function () {
          _this.deviceWidth = document.body.clientWidth;
        });
        this.classData();
      }, 20);
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
        "isApp"
      ]),
      ...mapGetters(["baseInfo", "classification"]),
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
    // top: px2rem(400px);
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

    .vux-tab-item {
      width: px2rem(160px) !important;
      flex: none;
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

  .warp {
    background-color: #ddd;
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
</style>
