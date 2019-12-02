<template>
  <div class="scan-pay">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >{{name}}</x-header>
    <scroll class="container" :click="false" :data="scrollDatas">
      <div class="scanpayPage">
        <div v-if="payItems">
          <div class="title">选择支付通道</div>
          <div class="payRadioContainer">
            <div
              class="payRadio"
              :key="index"
              v-for="(item, index) of paydata"
              @click="payIndex = index"
            >
              <div class="header logo">
                <!--                <span>{{getPayName(item)[0]}}</span>-->
                <img :src="payIcons[id]" alt />
              </div>
              <div class="info">
                <p>{{ getPayName(item) }}</p>
                <p>此通道需支付手续费{{item.get_fee}}%</p>
                <p>单笔金额下限{{item.min}},上限{{item.max}}</p>
              </div>
              <div class="selectBox">
                <i v-if="payIndex == index" class="iconfont icon-xuanzhong"></i>
                <i v-else class="iconfont icon-weixuanzhong"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="title">请扫描下方二维码转账</div>
        <span class="tips">
          温馨提示：最低充值{{getCurPayInfo().min}}元,请不要保存二维码重复支付，我们会不定时更换收款码
          <span
            v-if="payInfo.float_limit_type == 1"
          >,充值金额必须含有两位小数</span>。
        </span>

        <div style="text-align:center">
          <img class="scanImg" slot="header" :src="'/payment/rg_qrcode/' + payInfo.code_img" />
          <div slot="content" class="card-padding">
            <p class="p1 redFont">
              <span>账户名: {{payInfo.name}}</span>
              <label
                class="copyBtn"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                v-clipboard:copy="payInfo.name"
              >复制</label>
            </p>
            <p class="p1 redFont">
              <span>账号: {{payInfo.accounts}}</span>
              <label
                class="copyBtn"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                v-clipboard:copy="payInfo.accounts"
              >复制</label>
            </p>
            <p class="p2" v-if="payInfo.remark">
              <span>备注: {{payInfo.remark}}</span>
              <label
                class="copyBtn"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                v-clipboard:copy="payInfo.remark"
              >复制</label>
            </p>
            <p
              class="p1 redFont"
              v-if="payInfo.int_limit_type != 0"
              v-text="payInfo.int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"
            ></p>
            <p class="p3">请截图或长按保存二维码，打开支付APP从相册选择二维码扫描转账（如没有二维码请直接转账到账户），转账前请核对账户名和账号是否一致。</p>
          </div>
        </div>
        <div class="user-content">
          <div class="title">请填写您的账户和转账信息</div>
          <x-input
            title="账户名"
            name="uname"
            :placeholder="getPlaceholder()"
            is-type="text"
            v-model="uname"
          ></x-input>
          <x-input title="账号" name="num" placeholder="请输入您的账号" is-type="text" v-model="num"></x-input>
          <x-input title="充值金额" name="money" placeholder="请输入充值金额" is-type="number" v-model="money"></x-input>
          <datetime v-model="date" format="YYYY-MM-DD HH:mm" title="转账时间"></datetime>
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
  name: "ScanPay",
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
      scrollDatas: [],
      payIcons: {
        alipay: require("../../assets/images/alipay.png"),
        jdpay: require("../../assets/images/jdpay.png"),
        qqpay: require("../../assets/images/qqpay.png"),
        weixinpay: require("../../assets/images/weixinpay.png"),
        scanwxpay: require("../../assets/images/weixinpay.png"),
        // scanysfpay: require("../../assets/images/scanpay.png"),
        scanalipay: require("../../assets/images/alipay.png"),
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
    }, 100);
    this.$nextTick(() => {
      this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    });
  },
  methods: {
    ...mapActions(["homeAllPaymentsDepositWithdrawPlatform"]),

    onCopy() {
      this.$vux.toast.show({ text: "复制成功", type: "ok" });
    },

    onError() {
      this.$vux.toast.show({ text: "复制失败请重试", type: "cancel" });
    },

    getPlaceholder() {
      let str = "请输入您的账户名";
      if (this.payInfo.type == 3) {
        str = "付款支付宝绑定姓名";
      }
      if (this.payInfo.type == 4) {
        str = "付款微信昵称";
      }
      return str;
    },

    getCurPayInfo() {
      return this.paydata[this.payIndex];
    },

    payAction() {
      if (!this.uname || !this.num || !this.date || !parseInt(this.money)) {
        this.$vux.toast.show({ text: "请填写完整信息", type: "cancel" });
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
      var payInfo = this.paydata[this.payIndex];
      var data = {
        remark: payInfo.remark,
        i_d: `code_${payInfo.id}`,
        type: payInfo.type,
        method: `artificialTransfer`,
        cardName: `${payInfo.name}`,
        cardNum: `${payInfo.accounts}`,
        order_amount: this.money,
        info: `账户名:${payInfo.name}<br/>账号:${payInfo.accounts}`,
        pay_letter: `存款人:${this.uname}<br/>存款账号:${this.num}<br/>存款时间:${this.date}`
      };
      this.homeAllPaymentsDepositWithdrawPlatform(data).then(res => {
        this.loadingShow = false;
        if (res.resCode == 1000) {
          this.$vux.toast.show({ text: "提交成功", type: "success" });
        } else {
          this.$vux.alert.show({
            title: "提交失败",
            content: `提交失败！请刷新页面重试或者联系客服处理！[${res.msg},code:${res.resCode}]`
          });
        }
      });
    },

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
          res.push({
            key: i,
            value: this.paydata[i].remark || `支付通道${i + 1}`
          });
        }
        return res;
      }
    },
    payInfo() {
      if (this.paydata && this.paydata[this.payIndex]) {
        return this.paydata[this.payIndex];
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
}

.money {
  height: 100%;
}

.vux-1px-b {
  text-align: center;
}

.user-content {
  margin: px2rem(30px) 0;

  /deep/ label {
    width: px2rem(150px) !important;
  }
}

.btns {
  padding: px2rem(16px) px2rem(16px);

  button {
    background-color: #51a4fb;
    color: #fff;
  }
}

.tips {
  padding: px2rem(30px);
  color: #ff0000;
  display: block;
  font-size: px2rem(30px);
}

.scanImg {
  height: px2rem(400px);
  width: px2rem(400px);
  margin: 0 auto;
  padding: px2rem(16px);
}

.card-padding {
  padding: 0 px2rem(30px);

  .copyBtn {
    display: inline-block;
    padding: 0 5px;
    line-height: 20px;
    color: #fff;
    background-color: #51a4fb;
    border-radius: 4px;
  }

  p.p1 {
    font-size: px2rem(24px);
    line-height: px2rem(50px);
    span {
      display: inline-block;
      width: px2rem(350px);
      text-align: left;
    }
  }

  p.p2 {
    color: #333;
    font-size: px2rem(24px);
    line-height: px2rem(40px);
    span {
      display: inline-block;
      width: px2rem(350px);
      text-align: left;
    }
  }

  p.p3 {
    color: #999;
    font-size: px2rem(24px);
    line-height: px2rem(40px);
  }
}

.redFont {
  color: #ff0000;
}

.scanpayPage {
  .title {
    background-color: #ededed;
    font-size: px2rem(30px);
    height: px2rem(96px);
    line-height: px2rem(96px);
    padding: 0 px2rem(30px);
  }

  .vux-divider {
    font-size: px2rem(15px);
    font-weight: 800;
    color: #51a4fb;
  }
}

.payRadioContainer {
  display: flex;
  flex-direction: column;

  .payRadio {
    flex: 1;
    display: flex;
    align-items: center;
    height: px2rem(160px);
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: px2rem(30px);

    div {
      &.header {
        width: px2rem(100px);
        height: px2rem(100px);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: px2rem(20px);

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #4bb6ee;
          width: 100%;
          font-size: px2rem(35px);
          font-weight: 600;
          height: 100%;
          color: #fff;
          border-radius: 50%;
        }
      }

      &.info {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        line-height: px2rem(35px);

        p {
          font-size: px2rem(20px);
          color: #999999;
        }

        p:nth-of-type(1) {
          color: #333333;
        }
      }

      &.selectBox {
        width: px2rem(100px);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #51a4fb;

        .icon-weixuanzhong {
          color: #bbbbbb;
        }
      }
    }
  }
}

.logo {
  width: px2rem(100px);
  display: flex;
  margin-right: px2rem(10px);
  justify-content: center;
  align-items: center;

  img {
    height: px2rem(100px);
    width: px2rem(100px);
  }
}
</style>
