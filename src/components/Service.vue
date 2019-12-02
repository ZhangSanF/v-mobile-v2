<template>
  <div class="service">
    <scroll :data="scrollDatas" class="serviceScroll" ref="serviceScroll">
      <div>
        <div class="backgroundCircle"></div>
        <div class="service-content">
          <div class="preferentialEntrence" @click="toPreferentialActive">
            <img :src="settingImages.yhdt_pic" alt width="100%">
          </div>
          <div class="specialPreferentialImg" @click="luckDraw">
            <img src="/static/images/testImgs/roll.png" alt width="100%">
          </div>

          <div :cols="2" class="gridContainer">
            <template v-for="(item,index) in serviceDatas">
              <div :key="index" v-if="item.id == 'fwdt_yuebao'">
                <!--    余额宝 -->
                <img @click="openUrl(item)" src="/static/images/testImgs/img_yuebao.png">
              </div>

              <div :key="index" v-if="item.id == 'customer_service'">
                <!--          在线客服-->
                <img @click="openUrl(item)" src="/static/images/testImgs/img_service.png">
              </div>
              <div :key="index" v-if="item.id == 'fwdt_dlqq'">
                <img @click="openUrl(item)" src="/static/images/testImgs/img_daili.png">
              </div>
              <div :key="index" v-if="item.id == 'fwdt_kfqq'">
                <img @click="openUrl(item)" src="/static/images/testImgs/img_qq.png">
              </div>
              <div :key="index" v-if="item.id == 'fwdt_tsqq'">
                <img @click="openUrl(item)" src="/static/images/testImgs/img_tousu.png">
              </div>
              <div :key="index" v-if="item.id == 'fwdt_callback_service'">
                <img @click="openUrl(item)" src="/static/images/testImgs/fwdt_callback_service.png">
              </div>
              <div :key="index" v-if="item.id == 'fwdt_faq'">
                <img @click="showText(item)" src="/static/images/testImgs/img_faq.png">
              </div>
              <div :key="index" v-if="item.id == 'fwdt_kfwx'">
                <img @click="showQRcodeFun(item.value)" src="/static/images/testImgs/img_kfwx.png">
              </div>
              <div :key="index" v-if="item.id == 'fwdt_tel'">
                <a :href="'tel:'+item.value">
                  <img src="/static/images/testImgs/img_tel.png">
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </scroll>

    <div v-transfer-dom>
      <x-dialog v-model="showQRcode" class="dialog-demo">
        <div class="img-box">
          <img :src="wxQrCodeImg" style="max-width:100%">
        </div>
        <div @click="showQRcode=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="faqIsShow" class="dialog-demo">
        <div class="txt-box">
          <h2>常见问题</h2>
          <scroll :data="scrollDatas" class="scrollTxt">
            <div class="scrollTxtBox">
              <div v-html="faqTxt"></div>
            </div>
          </scroll>
        </div>
        <div @click="faqIsShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>


<script>
import Scroll from "@/components/common/scroll";
import { mapActions, mapState, mapGetters } from "vuex";
import {
  Grid,
  GridItem,
  XDialog,
  TransferDomDirective as TransferDom
} from "vux";
import { setTimeout } from 'timers';

export default {
  name: "service",
  data() {
    return {
      scrollDatas: [],
      showQRcode: false,
      serviceDatas: [],
      wxQrCodeImg: "",
      faqIsShow: false,
      faqTxt: "",
      testImgs: ["img_daili", "img_qq", "img_service", "img_tousu"]
    };
  },
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    Scroll,
    Grid,
    GridItem
  },
  mounted() {
    this.$nextTick(() => {
      this.getServiceHallData().then(res => {
        if (res.resCode === 1000) {
          this.serviceDatas = this.converterFormDatas(res.data);
        } else {
          this.$vux.alert.show({
            title: "获取数据失败",
            content: `获取数据失败,请重试或者联系客服处理![${res.msg}]`
          });
        }
        this.$refs.serviceScroll.refresh();
      });
    });
  },

  methods: {
    ...mapActions(["getServiceHallData"]),

    openUrl(item) {
      setTimeout(() => {
        if (item.type == "qq") {
          var _this = this;
          this.$vux.confirm.show({
            title: "打开链接",
            content: `即将打开外部链接，部分机型和浏览器可能出现打开QQ失败的情况，请联系QQ号${
              item.initVal
            }，或联系在线客服处理。`,
            onConfirm() {
              window.open(item.value);
            }
          });
        } else if (item.type == "link") {
          var _this = this;
          this.$vux.confirm.show({
            title: "打开链接",
            content: `即将打开外部链接，结束后请后退返回本站。`,
            onConfirm() {
              window.open(item.value);
            }
          });
        } else if (item.type == "router") {
          var _this = this;
          if (!this.user || this.user.agmem != 1) {
            this.$vux.alert.show({
              title: "提示",
              content: `请登录为正式用户!`
            });
            return false;
          }
          _this.$router.push(item.value);
        }
      }, 50);
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

    toPreferentialActive() {
      this.$router.push("/preferential");
    },

    showQRcodeFun(src) {
      this.wxQrCodeImg = src;
      this.showQRcode = true;
    },

    showText(txt) {
      this.faqTxt = txt.value;
      this.faqIsShow = true;
    },

    filterDatasTop(arr) {
      let data = arr.filter(item => {
        return item.tips == "";
      });
      return data;
    },
    filterDatasList(arr) {
      return arr.filter(item => {
        return item.tips != "";
      });
    },

    converterMobileOrPCToQQ(qq) {
      var kefu101 =
        "http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=oicqzone.com&menu=yes";
      var kefu102 =
        "mqq://im/chat?chat_type=wpa&uin=" + qq + "&version=1&src_type=web";
      if (
        /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ||
        /(Android)/i.test(navigator.userAgent)
      ) {
        return kefu102;
      } else {
        return kefu101;
      }
    },

    converterFormDatas(data = []) {
      let newData = [];
      if (data) {
        data.forEach(item => {
          switch (item.sign) {
            case "fwdt_yuebao":
              var obj = {
                name: "余额宝",
                tips: "",
                id: item.sign,
                type: "router",
                value: "/money/MoneyCenter",
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "customer_service":
              var obj = {
                name: "在线客服",
                tips: "",
                id: item.sign,
                type: "link",
                value: item.value,
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_dlqq":
              var obj = {
                name: "独家代理",
                tips: "点击在线申请独家代理",
                id: item.sign,
                type: "qq",
                value: this.converterMobileOrPCToQQ(item.value),
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_kfqq":
              var obj = {
                name: "QQ客服",
                tips: "",
                id: item.sign,
                type: "qq",
                value: this.converterMobileOrPCToQQ(item.value),
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_kfwx":
              var obj = {
                name: "微信客服",
                tips: "",
                id: item.sign,
                type: "img",
                value: "/payment/rg_qrcode/" + item.value,
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_tel":
              var obj = {
                name: "联系电话",
                tips: item.value,
                id: item.sign,
                type: "tel",
                value: item.value,
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_tsqq":
              var obj = {
                name: "投诉部门",
                tips: "让我们为您提供更好的服务",
                id: item.sign,
                type: "router",
                value: "/Feedback",
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_callback_service":
              var obj = {
                name: "回电服务",
                tips: "让我们为您提供更好的服务",
                id: item.sign,
                type: "router",
                value: "/Callback",
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_faq":
              var obj = {
                name: "常见问题",
                tips: "常见问题都汇总在这里",
                id: item.sign,
                type: "text",
                value: item.value,
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_yhdt":
              if (this.baseInfo.isAgent) {
                return;
              }
              var obj = {
                name: "优惠大厅",
                tips: "丰富活动已全新上线",
                id: item.sign,
                type: "click",
                value: item.value,
                initVal: item.value
              };
              newData.push(obj);
              break;
            case "fwdt_xydzp":
              var obj = {
                name: "幸运大转盘",
                tips: "幸运大转盘",
                id: item.sign,
                type: "luck",
                value: item.value,
                initVal: item.value
              };
              newData.push(obj);
              break;
          }
        });
      }
      return newData;
    }
  },
  computed: {
    ...mapState(["user", "settingImages"]),
    ...mapGetters(["baseInfo"])
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~vux/src/styles/close";
</style>

<style scoped lang="scss">
.service {
  height: 100%;
  background-color: #ededed;
  position: relative;

  .serviceScroll {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    >div{
      padding-bottom: 150px;
    }
  }
}

.backgroundCircle {
  background-color: #51a4fb;
  height: px2rem(200px);
  border-radius: 0 0 px2rem(60px) px2rem(60px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.service-content {
  position: relative;
  z-index: 2;
  padding-top: px2rem(10px);
}

.preferentialEntrence {
  /*margin-top: px2rem(10px);*/
  padding: 0 px2rem(20px);
  height: px2rem(310px);
  overflow: hidden;
  font-size: 0;
}

.specialPreferentialImg {
  margin-top: px2rem(20px);
  padding: 0 px2rem(20px);
}

.gridContainer {
  padding: 0 px2rem(12px);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  div {
    margin-bottom: px2rem(16px);
    width: 50%;
    height: px2rem(132px);
    box-sizing: border-box;
    padding: px2rem(10px);
    padding-top: 0;

    img {
      width: 100%;
      height: auto;
    }
  }
}

.scrollTxt {
  overflow: hidden;
  position: relative;
  padding: px2rem(25px) 0;
  height: px2rem(320px);
}

.txt-box {
  padding: px2rem(5px);

  h2 {
    padding: px2rem(10px) 0;
  }
}

.scroll {
  overflow: hidden;
  position: relative;
  top: 0;
  height: 100%;

  .scrollBox {
    padding-bottom: px2rem(25px);
  }
}

.connectionBox {
  display: flex;
  font-size: px2rem(16px);
  justify-content: center;
  padding: px2rem(10px);
  margin: px2rem(15px) 0;

  a,
  div {
    color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
      font-size: px2rem(35px);
    }

    span {
      font-size: px2rem(14px);
      display: block;
    }
  }
}

.vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}

.card {
  margin: px2rem(8px) px2rem(5px);
}

.card-content-inner {
  padding: 0;
  display: block;
  font-size: px2rem(24px);
  line-height: px2rem(38px);
  height: px2rem(64px);
  vertical-align: top;
  position: relative;

  p {
    line-height: px2rem(11px);
    padding: 0 0 0 px2rem(34px);
    color: #6f6f6f;
    font-size: px2rem(24px);
  }
}

.card-content-inner .img {
  margin-top: px2rem(20px);
  display: inline-block;
  float: right;
  width: px2rem(24px);
  height: px2rem(24px);
  background-image: url("../assets/images/sprites.png");
  background-position: px2rem(345px, false) px2rem(52px, false);
}

.icon-qipaishi {
  color: darkorchid;
}

.card-content-inner {
  padding-left: px2rem(13px);

  .text {
    margin-left: px2rem(6px);
    position: relative;
    top: px2rem(3px, false);
    font-size: px2rem(14px);
    color: #333;
  }

  .iconfont {
    font-weight: 600;
    font-size: px2rem(26px);
    position: relative;
    top: px2rem(10px);
  }

  .icon-dailizizhizizhiqiyezizhi {
    color: orange;
  }

  .icon-youhui {
    color: #4a85fe;
  }

  .icon-changjianwenti {
    color: #319e80;
  }

  .icon-changjianwenti {
    color: coral;
  }

  .icon-tousu {
    color: #9851cb;
  }

  .icon-iconset0214 {
    color: #6adc54;
  }

  .icon-choujiang {
    color: #f44336;
  }
}

.card-content {
  border-radius: px2rem(3px);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.08);
}

.vux-x-icon {
  fill: #bbb;
  float: right;
  margin-top: px2rem(18px);
  font-size: px2rem(26px);
}
</style>
