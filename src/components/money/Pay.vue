<template>
  <div class="pay">
    <x-header :left-options="{backText: ''}" class="header">充值方式</x-header>
    <scroll class="container" :click="false" :data="payData">
      <ul class="pay-content">
        <li
          class="pay-item bg-public-deep-bgColor"
          v-for="(item, index) of payData"
          @click="toPay(item, index)"
          :key="index"
        >
          <div class="left">
            <img :src="payIcons[index]" alt>
          </div>
          <div class="right">
            <p class="title">{{payDetail[index].split('@')[0]}}</p>
            <p class="detail">{{payDetail[index].split('@')[1]}}</p>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Scroll from "@/components/common/scroll";
import { XHeader } from "vux";
import { setTimeout } from "timers";
export default {
  name: "Pay",
  components: { XHeader, Scroll },
  data() {
    return {
      payData: {},
      payDetail: {
        online: "网银在线支付@通过网银或者支付APP等充值",
        quick: "银联快捷支付@通过网银或者支付APP等充值",
        union: "银联扫码支付@通过网银或者支付APP等充值",
        alipay: "支付宝支付@使用支付宝APP扫码或转账充值",
        jdpay: "京东支付@使用京东钱包APP扫码或转账充值",
        qqpay: "QQ支付@使用QQ钱包APP扫码或转账充值",
        weixinpay: "微信支付@使用微信APP扫码或转账充值",
        scanwxpay: "微信扫码支付@使用支付APP扫码转账充值",
        scanysfpay: "云闪付扫码支付@使用支付APP扫码转账充值",
        scanalipay: "支付宝扫码支付@使用支付APP扫码转账充值",
        otc: "微信/支付宝OTC@通过OTC渠道支付",
        bankcard: "银行卡转账@通过银行卡转账充值",
        alipay_bank: "支付宝转账银行卡@通过支付宝转账到银行卡充值"
      },
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
  methods: {
    ...mapActions(["homeAllPaymentsGetPaymentInfo"]),
    toPay(item, key) {
      var name = this.payDetail[key].split("@")[0];
      switch (key) {
        case "bankcard":
        case "alipay_bank":
          this.$router.push({
            name: "BankCard",
            params: { id: key, name: name }
          });
          break;
        case "scanalipay":
        case "scanwxpay":
        case "scanysfpay":
          this.$router.push({
            name: "ScanPay",
            params: { id: key, name: name }
          });
          break;
        default:
          this.$router.push({
            name: "AutoPay",
            params: { id: key, name: name }
          });
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$vux.loading.show({
        text: "加载中..."
      });
      let source = this.isApp ? 3 : 2;
      this.homeAllPaymentsGetPaymentInfo({source: source}).then(res => {
        if (res.resCode == 2000) {
          this.payData = res.payData;
          this.$store.commit("SAVE_PAY_DATA", res.payData);
        }
        this.$vux.loading.hide();
      });
    }, 20);
  },
  computed: {
    ...mapState(["user", "isApp"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  position: absolute;
  top: px2rem(85px);
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.pay {
  height: 100%;
  font-size: px2rem(16px);
  .header {
    background-color: $public-header-background-color;
  }
}
h4 {
  color: #555;
  padding: px2rem(12px) 0 0 px2rem(6px);
}
.pay-content {
  padding: 0 px2rem(6px) px2rem(6px) px2rem(6px);
  .pay-item {
    height: px2rem(158px);
    display: flex;
    border-radius: px2rem(5px);
    padding: px2rem(30px);
    border-bottom: 1px solid #ededed;
    box-sizing: border-box;
    .left {
      vertical-align: middle;
      display: inline-block;
      width: px2rem(98px);
      height: px2rem(98px);
      text-align: center;
      img {
        max-width: 90%;
        max-height: 90%;
      }
    }
    .right {
      vertical-align: middle;
      display: inline-block;
      margin-left: px2rem(35px);
      flex: 1;
      p {
        display: block;
        width: 100%;
        padding: px2rem(5px) 0 px2rem(5px) px2rem(3px);
      }
      .title {
        font-weight: 400;
        font-size: px2rem(32px);
        color: #333;
      }
      .detail {
        color: #999999;
        font-size: px2rem(24px);
      }
    }
  }
}
</style>
