<template>
  <div class="auto-pay">
    <x-header :left-options="{backText: ''}" class="header">{{name}}</x-header>
    <scroll class="container" :click="false" :data="scrollDatas">
      <div>
      <div class="inputBox">
        <p>请输入充值金额</p>
        <x-input
          name="money"
          :placeholder="'最低充值'+paydata[payIndex].min+'元'"
          is-type="number"
          v-model="money"
        ></x-input>
      </div>
      <div class="payRadioContainer" v-if="payItems">
        <div class="title">选择支付通道</div>
        <ul class="paylist">
          <li
            :key="index"
            class="payRadio"
            v-for="(item, index) of payItems"
            @click="payIndex = index"
          >
            <div class="logo">
              <img :src="payIcons[id]" alt>
            </div>
            <div class="info">
              <h4>{{getPayName(item)}}</h4>
              <p v-if="paydata[index].get_fee">此通道需支付手续费{{paydata[index].get_fee}}%</p>
              <p v-if="paydata[index].max">单笔金额下限{{paydata[index].min}}，上限{{paydata[index].max}}</p>
              <p
                v-if="paydata[index].int_limit_type != 0"
                v-text="paydata[index].int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"
              ></p>
              <p class="tips"><span>{{paydata[index].remark}}</span></p>
            </div>
            <div class="checkbox">
              <span>
                <i class="iconfont icon-xuanzhong" v-show="payIndex == index"></i>
                <i class="iconfont icon-weixuanzhong" v-show="payIndex != index"></i>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <group v-if="payInfo && payInfo.banklist && bankItems">
        <popup-radio
          title="选择银行"
          @on-show="popRadioShow()"
          @on-hide="popRadioHide()"
          class="pop"
          :options="bankItems"
          v-model="bankIndex"
          placeholder="请选择"
        >
          <p slot="popup-header" class="vux-1px-b demo3-slot">请选择银行</p>
          <template slot-scope="props" slot="each-item">
            <p>
              {{ bankItems[props.index].value }}
              <br>
            </p>
          </template>
        </popup-radio>
      </group>
      <div class="submitBox">
        <div class="btns">
          <x-button @click.native="payAction">提交充值</x-button>
        </div>
      </div>
      </div>
    </scroll>

    <form method="post" ref="payForm" :action="formData.requestUrl">
      <input
        type="hidden"
        v-for="(item, index) of formData.requestData"
        :name="index"
        :value="item"
        :key="index"
      >
    </form>
    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>
    <toast
      v-model="showToast"
      :type="toastType"
      :time="1200"
      is-show-mask
      :text="toastText"
      :position="'center'"
    ></toast>
    <div v-transfer-dom>
      <x-dialog v-model="scanShow" class="dialog-demo">
        <div class="img-box">
          <img :src="requestData.filePath" style="max-width:100%">
        </div>
        <div @click="scanShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  XHeader,
  Group,
  PopupRadio,
  XInput,
  XButton,
  Toast,
  Loading,
  TransferDom,
  XDialog
} from "vux";
import { setTimeout } from "timers";
import Scroll from "@/components/common/scroll";
export default {
  name: "AutoPay",
  components: {
    XHeader,
    Group,
    PopupRadio,
    XInput,
    XButton,
    Toast,
    Loading,
    XDialog,
    Scroll
  },
  directives: { TransferDom },
  data() {
    return {
      payIndex: 0,
      payItem: 0,
      money: "",
      bankIndex: 0,
      showToast: false,
      toastType: "cancel",
      toastText: "",
      loadingShow: false,
      loadingText: "正在提交",
      formData: {},
      scanShow: false,
      requestData: {},
      scrollDatas: [],
      payIcons: {
        alipay: require("../../assets/images/alipay.png"),
        jdpay: require("../../assets/images/jdpay.png"),
        qqpay: require("../../assets/images/qqpay.png"),
        weixinpay: require("../../assets/images/weixinpay.png"),
        scanwxpay: require("../../assets/images/scanpay.png"),
        scanysfpay: require("../../assets/images/scanpay.png"),
        scanalipay: require("../../assets/images/scanpay.png"),
        otc: require("../../assets/images/scanpay.png"),
        bankcard: require("../../assets/images/bankcard.png"),
        online: require("../../assets/images/online.png"),
        union: require("../../assets/images/union2.png"),
        quick: require("../../assets/images/union2.png"),
        alipay_bank: require("../../assets/images/alipay.png")
      }
    };
  },
  mounted() {
    setTimeout(() => {
      if (!this.id) {
        this.$router.go(-1);
      }
      console.log(this.$route);
    }, 100);
    this.$nextTick(() => {
      this.openScrolling();
      this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    });
  },
  methods: {
    ...mapActions(["homeAllPaymentsDepositWithdrawPlatform"]),

    //支付名称判断 根据type值
    getPayName(e) {
      if (e && e.type) {
        switch (parseInt(e.type)) {
          case 3:
            return "支付宝扫码支付";
            break;

          case 4:
            return "微信扫码支付";
            break;

          case 12:
            return "人工支付宝收款";
            break;

          case 13:
            return "微信/支付宝转帐";
            break;

          default:
            return "支付通道";
        }
      } else {
        return "支付通道";
      }
    },

    payAction() {
      if (!parseFloat(this.money)) {
        this.toastText = "请输入金额";
        this.showToast = true;
        return;
      }

      if (this.payInfo.float_limit_type == 1) {
        let moneyArr = parseFloat(this.money)
          .toString()
          .split(".");
        if (moneyArr.length <= 1 && (!moneyArr[1] || moneyArr[1] <= 0)) {
          this.$vux.alert.show({
            title: "提交失败",
            content: `充值金额必须含有两位小数`
          });
          return;
        }
      }

      this.loadingShow = true;
      var data = {
        method: "thirdPayment",
        order_amount: this.money,
        type: this.payInfo.type,
        i_d: this.payInfo.id,
        bank_code: this.bankInfo ? this.bankInfo.bankcode : "",
        bank_type: this.bankInfo ? this.bankInfo.banktype : ""
      };
      if (this.id == "otc") {
        data.method = "otcPayment";
        data.i_d = this.payInfo.truename;
      }
      this.homeAllPaymentsDepositWithdrawPlatform(data).then(res => {
        this.loadingShow = false;
        if (res.resCode == 1000) {
          switch (res.data.requestType) {
            case "form":
              this.formData = res.data;
              var _this = this;
              this.$vux.confirm.show({
                title: "提交成功",
                content: "请点击确认跳转到支付页面",
                onCancel() {
                  _this.$vux.toast.show({
                    text: "已取消",
                    type: "cancel"
                  });
                },
                onConfirm() {
                  _this.$refs.payForm.submit(); //提交支付表单
                }
              });
              break;
            case "jump":
              this.$vux.confirm.show({
                title: "提交成功",
                content: "请点击确认跳转到支付页面",
                onCancel() {
                  _this.$vux.toast.show({
                    text: "已取消",
                    type: "cancel"
                  });
                },
                onConfirm() {
                  window.location.href = res.data.requestUrl;
                }
              });
              break;
            case "scan":
              var data = res.data.requestData;
              this.$router.push({
                path: `/money/scanpage`,
                query: {
                  name: data.payName,
                  money: data.money,
                  img: data.filePath
                }
              });
              break;
          }
        } else {
          if (res.msg) {
            this.$vux.alert.show({
              title: "提交失败",
              content: `提交失败！请刷新页面重试或者联系客服处理！[${res.msg}]`
            });
          } else {
            this.$vux.alert.show({
              title: "提交失败",
              content: `${res}`
            });
          }
        }
      });
    },
    popRadioShow(e) {
      document.getElementsByClassName("vux-popup-show")[0].style.height = "60%";
      this.openScrolling();
    },
    popRadioHide() {
      this.stopScrolling();
    }
  },
  computed: {
    ...mapState(["user", "payData", "skin"]),
    id() {
      return this.$route.params.id;
    },
    name() {
      return this.$route.params.name;
    },
    paydata() {
      if (this.id) {
        return this.payData[this.id];
      }
    },
    payItems() {
      if (this.paydata) {
        var res = [];
        for (var i = 0; i < this.paydata.length; i++) {
          res.push({ key: i, value: `支付通道${i + 1}` });
        }
        return res;
      }
    },
    payInfo() {
      if (this.paydata) {
        return this.paydata[this.payIndex];
      }
    },
    bankItems() {
      if (this.payInfo && this.payInfo.banklist) {
        var res = [];
        var data = this.payInfo.banklist;
        for (var i = 0; i < data.length; i++) {
          res.push({ key: i, value: data[i].bankname });
        }
        return res;
      }
    },
    bankInfo() {
      if (this.bankItems) {
        return this.payInfo.banklist[this.bankIndex];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  background-color: #ededed;
  position: absolute;
  top: px2rem(80px);
  bottom: 0;
  width: 100%;
  overflow: hidden;
  font-size: px2rem(16px);
  .inputBox {
    p {
      padding: px2rem(30px);
      font-size: px2rem(36px);
    }
    .vux-x-input {
      background-color: #fff;
      font-size: px2rem(28px);
    }
  }
}
.submitBox {
  margin-top: px2rem(88px);
  button {
    height: px2rem(88px);
    width: px2rem(650px);
    background-color: #51a4fb;
    color: #fff;
    font-size: px2rem(30);
    font-weight: 500;
  }
}
.header {
  background-color: $public-header-background-color;
  height: px2rem(80px);
}

.pay {
  background: #f4f3e0;
  font-size: px2rem(16px);
}
.popTxt {
  color: #ff9759;
  font-size: px2rem(24px);
}
.listTxt {
  color: #ff9759;
  font-size: px2rem(24px);
  padding: 0 0 px2rem(10px) px2rem(16px);
}
h4 {
  color: #555;
  padding: px2rem(12px) 0 0 px2rem(6px);
}
.vux-popup-dialog {
  height: 50% !important;
  p {
    font-size: px2rem(30px) !important;
  }
}
.vux-1px-b {
  text-align: center;
  padding: px2rem(6px) 0;
}
.btns {
  padding: px2rem(16px) px2rem(16px);
}
.vux-popup-dialog {
  height: 60% !important;
}

.payRadioContainer {
  .title {
    padding: px2rem(30px);
    font-size: px2rem(36px);
  }
  .paylist {
    background-color: #fff;
    padding: 0 px2rem(30px);
    list-style: none;
    li {
      display: flex;
      border-bottom: 1px solid #ededed;
      .logo {
        width: px2rem(100px);
        display: flex;
        margin-right: px2rem(35px);
        justify-content: center;
        align-items: center;
        img {
          height: px2rem(100px);
          width: px2rem(100px);
        }
      }
      .info {
        flex: 1;
        padding: px2rem(20px) 0;
        h4 {
          font-size: px2rem(32px);
          color: #333;
          font-weight: 400;
          padding: 0;
        }
        p {
          font-size: px2rem(20px);
          color: #999999;
        }
        .tips{
          padding: px2rem(10px) 0;
        }
      }
      .checkbox {
        text-align: right;
        width: px2rem(50px);
        margin-left: px2rem(35px);
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: block;
          width: px2rem(40px);
          height: px2rem(40px);
          box-sizing: border-box;
          border-radius: 50%;
          i {
            vertical-align: middle;
            font-size: px2rem(40px);
            color: #bbbbbb;
            &.icon-xuanzhong {
              color: #51a4fb;
            }
          }
        }
      }
    }
  }
}
</style>
