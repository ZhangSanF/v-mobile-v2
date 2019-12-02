<template>
  <div class="scan-pay">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >扫码支付</x-header>
    <div class="container">
      <divider class="font-light-color">请确认信息并扫码转账</divider>
      <div class="info">
        <div class="img">
          <img :src="scanData.img" alt>
        </div>
        <p>
          支付类型:
          <span>{{scanData.name}}</span>
        </p>
        <p>
          支付金额:
          <span>{{scanData.money}}</span>
        </p>
        <span
          class="notice font-light-color"
        >请长按或者截图保存二维码图片到手机相册，在支付APP中扫描二维码处从相册选择二维码图片，核对金额无误后转账，转账成功后会直接到账，如有疑问请咨询在线客服处理！谢谢！</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { XHeader, Divider } from "vux";
export default {
  name: "ScanPage",
  components: { XHeader, Divider },
  data() {
    return { scanData: "" };
  },
  mounted() {
    setTimeout(() => {
      this.scanData = this.$route.query;

    }, 20);
  },
  computed: {
    ...mapState(["user", "payData"])
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
  p {
    font-size: px2rem(30px);
  }
}
.info {
  padding: px2rem(16px) px2rem(32px);
  .img {
    text-align: center;
    img {
      width: px2rem(300px);
    }
  }
  p {
    padding: px2rem(10px) 0;
    text-align: center;
    span {
      font-size: px2rem(16px);
      color: orangered;
      font-weight: 600;
    }
  }
  .notice {
    font-size: px2rem(24px);
    color: #888;
  }
}
</style>
