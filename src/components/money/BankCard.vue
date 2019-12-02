<template>
  <div class="scan-pay">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >{{name}}</x-header>
    <scroll class="container" :click="false" :data="scrollDatas">
      <div>
        <divider class="font-main-color">1. 请选择您方便转入的银行卡</divider>

        <div v-if="payItems">
          <div
            v-for="(item,index) in payItems"
            :key="index"
            :class="{'selected': payIndex == index}"
            @click="payIndex = index"
            class="carList"
          >
            <p>
              <label v-if="id == 'alipay_bank'" >支付宝</label>
              <label v-else>银行卡</label>
            </p>
            <p>请转账到以下账户：</p>
            <div v-if="id == 'alipay_bank'" class="scanShow">
              <p class="label">
                开户行：{{paydata[index].bank_name}}
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="paydata[index].bank_name"
                >复制</label>
              </p>
              <p class="label">
                持卡人：{{paydata[index].cardholder}}
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="paydata[index].cardholder"
                >复制</label>
              </p>
              <p class="label">
                卡号：{{paydata[index].card_num}}
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="paydata[index].card_num"
                >复制</label>
              </p>

              <div class="scanImg" v-if="paydata[index].qrcode_url">
                <img width="100" :src="paydata[index].qrcode_url" alt="二维码图片获取失败，请刷新重试">
              </div>
              <p class="label" v-if="paydata[index].qrcode_url">请用支付宝APP扫描上方二维码转账</p>
              <p class="label" v-else>请用支付宝APP向上方银行卡账户转账</p>
              <p class="label">转账完成后在下方填写转账信息，提交稍后即可自动到账</p>
            </div>

            <div v-else class="bankinfoShow">
              <p class="label">
                开户行：{{paydata[index].bank_name}}
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="paydata[index].bank_name"
                >复制</label>
              </p>
              <p class="label">
                持卡人：{{paydata[index].cardholder}}
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="paydata[index].cardholder"
                >复制</label>
              </p>
              <p class="label">
                卡号：{{paydata[index].card_num}}
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="paydata[index].card_num"
                >复制</label>
              </p>

              <p class="label">
                开户行地址：{{paydata[index].place_of_account}}
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="paydata[index].place_of_account"
                >复制</label>
              </p>

            </div>
            <p
              v-if="parseFloat(paydata[index].rebate) > 0"
              class="label rebateText"
            >当前支付方式赠送充值金额的{{parseFloat(paydata[index].rebate)}}%</p>
            <p
              class="redFont fontSize12"
              v-if="paydata[index].int_limit_type != 0"
              v-text="paydata[index].int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"
            ></p>
          </div>
        </div>

        <div class="user-content">
          <divider class="font-main-color">2. 请填写您的账户和转账信息</divider>
          <group>
            <x-input
              v-if="id == 'alipay_bank'"
              title="账户名"
              name="uname"
              placeholder="请输入您的账户名"
              is-type="text"
              v-model="uname"
            ></x-input>
            <x-input
              v-else
              title="持卡人"
              name="uname"
              placeholder="请输入您的账户名"
              is-type="text"
              v-model="uname"
            ></x-input>
          </group>
          <group>
            <x-input
              v-if="id != 'alipay_bank'"
              title="卡号"
              name="num"
              placeholder="请输入您的账号"
              is-type="text"
              v-model="num"
            ></x-input>
          </group>
          <group>
            <x-input
              title="转账金额"
              name="money"
              placeholder="请输入充值金额"
              is-type="number"
              v-model="money"
            ></x-input>
          </group>
          <group>
            <datetime v-model="date" format="YYYY-MM-DD HH:mm" title="转账时间"></datetime>
          </group>
        </div>
        <div class="btns">
          <x-button @click.native="payAction">提交充值</x-button>
        </div>
        <div v-transfer-dom>
          <loading :show="loadingShow" :text="loadingText"></loading>
        </div>
      </div>
    </scroll>
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
  XDialog,
  Divider,
  Card,
  Datetime
} from "vux";
import Scroll from "@/components/common/scroll";
export default {
  name: "BankCard",
  components: {
    XHeader,
    Group,
    PopupRadio,
    XInput,
    XButton,
    Toast,
    Loading,
    XDialog,
    Divider,
    Card,
    Datetime,
    Scroll
  },
  directives: { TransferDom },
  data() {
    return {
      payIndex: 0,
      uname: "",
      num: "",
      money: "",
      date: "",
      loadingShow: false,
      loadingText: "正在提交",
      scrollDatas: []
    };
  },
  mounted() {
    setTimeout(() => {
      if (!this.id) {
        this.$router.go(-1);
      }
      this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }, 100);
  },
  methods: {
    ...mapActions(["homeAllPaymentsDepositWithdrawPlatform"]),

    onCopy() {
      this.$vux.toast.show({ text: "复制成功", type: "ok" });
    },

    onError() {
      this.$vux.toast.show({ text: "复制失败请重试", type: "cancel" });
    },

    popRadioShow(e) {
      document.getElementsByClassName("vux-popup-show")[0].style.height = "60%";
      this.openScrolling();
    },
    popRadioHide() {
      this.stopScrolling();
    },

    payAction() {
      if (this.id == "alipay_bank") {
        if (!this.uname || !this.date || !parseInt(this.money)) {
          this.$vux.toast.show({ text: "请填写完整信息", type: "cancel" });
          return;
        }
      } else {
        if (!this.uname || !this.num || !this.date || !parseInt(this.money)) {
          this.$vux.toast.show({ text: "请填写完整信息", type: "cancel" });
          return;
        }
      }

      var payInfo = this.paydata[this.payIndex];
      if (payInfo.float_limit_type == 1) {
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
      let isShowStr = `<br/>存款账号:${this.num}`;
      if (this.id == "alipay_bank") {
        isShowStr = "";
      } else {
        isShowStr = `<br/>存款账号:${this.num}`;
      }

      var data = {
        remark: payInfo.remark || "",
        i_d: `bank_${payInfo.id}`,
        type: payInfo.type,
        method: `artificialTransfer`,
        cardName: `${payInfo.cardholder}`,
        cardNum: `${payInfo.card_num}`,
        cardBank: `${payInfo.bank_name}`,
        order_amount: this.money,
        info: `银行:${payInfo.bank_name}<br/>卡号:${
          payInfo.card_num
        }<br/>持卡人:${payInfo.cardholder}`,
        pay_letter: `存款人:${this.uname}${isShowStr}<br/>存款时间:${this.date}`
      };
      this.homeAllPaymentsDepositWithdrawPlatform(data).then(res => {
        this.loadingShow = false;
        if (res.resCode == 1000) {
          this.$vux.toast.show({ text: "提交成功", type: "success" });
        } else {
          this.$vux.alert.show({
            title: "提交失败",
            content: `提交失败！请刷新页面重试或者联系客服处理！[${res.msg},${
              res.resCode
            }]`
          });
        }
      });
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
          res.push({ key: i, value: this.paydata[i].bank_name });
        }
        return res;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  position: absolute;
  top: px2rem(92px);
  bottom: 0;
  width: 100%;
  overflow: hidden;
  font-size: px2rem(16px);
  .label {
    color: #51a4fb;
    font-size: px2rem(24px);
    .copyBtn {
      display: inline-block;
      float: right;
      padding: 0 5px;
      line-height: 20px;
      color: #fff;
      background-color: #51a4fb;
      border-radius: 4px;
    }
  }
  .rebateText {
    color: #51a4fb;
  }
}
.fontSize12 {
  font-size: px2rem(24px);
}
.carList {
  margin: px2rem(15px) 0;
  padding: px2rem(10px) px2rem(15px);
  background-color: #fff;
  line-height: 35px;
  font-size: 14px;

  &.selected {
    background-color: #51a4fb;
    .bankinfoShow p {
      color: #fff;
    }
    .label{
      color: #fff;
    }
    .rebateText {
      color: #fff;
    }
    .copyBtn {
      color: #51a4fb;
      background-color: #fff;
    }
  }
}
.money {
  height: 100%;
}
.vux-1px-b {
  text-align: center;
}
.user-content {
  margin: px2rem(32px) 0;
}
.btns {
  padding: px2rem(16px) px2rem(16px);
  button {
    background-color: #51a4fb;
    color: #fff;
  }
}
.scanShow {
  padding: 4px 10px;
  text-align: center;
  img {
  }
}
</style>
