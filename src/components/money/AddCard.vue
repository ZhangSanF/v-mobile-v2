<template>
  <div class="pay">
    <x-header :left-options="{backText: ''}" class="header">添加银行卡</x-header>
    <scroll class="container" :click="false" :data="bankData">
    <div class="content">
      <group v-if="bankList">
        <popup-radio
          title="请选择银行"
          class="pop"
          :options="bankList"
          v-model="bankIndex"
          @on-show="popRadioShow()"
          @on-hide="popRadioHide()"
        >
          <p slot="popup-header" class="vux-1px-b demo3-slot">请选择银行</p>
          <template slot-scope="props" slot="each-item">
            <p>
              {{ props.index + 1 }}. {{bankData[props.index].bankname}}
              <br>
            </p>
          </template>
        </popup-radio>
      </group>
      <group>
        <x-input
          title="开户网点"
          name="address"
          placeholder="请输入您的开户行网点"
          is-type="text"
          v-model="address"
        ></x-input>
      </group>
      <group>
        <x-input
          title="卡号"
          name="address"
          placeholder="请输入您的银行卡号"
          is-type="number"
          v-model="account"
        ></x-input>
      </group>
      <group v-if="!serverTruename">
        <x-input
          title="开户姓名"
          name="truename"
          placeholder="请输入开户姓名,真实有效才可提款"
          is-type="text"
          v-model="truename"
        ></x-input>
      </group>
      <group v-if="massegeVerify == 1">
        <x-input
          title="手机号"
          name="mobile"
          placeholder="请输入手机号码"
          v-model="phone"
          keyboard="number"
          is-type="china-mobile"
        >
          <x-button
            slot="right"
            class="sendMsg"
            type="primary"
            mini
            @click.native="sendSmsCode"
          >发送验证码</x-button>
        </x-input>
        <x-input title="短信验证码" placeholder="请输入您收到的短信验证码" v-model="smsCode" :min="3" :max="8"></x-input>
      </group>
      <div class="btns">
        <x-button @click.native="submitInfo">提交信息</x-button>
      </div>
    </div>

    </scroll>

    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll";
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
  Card
} from "vux";
export default {
  name: "AddCard",
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
    Scroll
  },
  directives: { TransferDom },
  data() {
    return {
      bankIndex: 0,
      bankData: [],
      address: "",
      account: "",
      phone: "",
      smsCode: "",
      loadingShow: false,
      loadingText: "正在提交",
      massegeVerify: 0, // 是否需要短信验证
      truename: "",
      serverTruename: "" //服务器返回的用户真实姓名
    };
  },
  methods: {
    ...mapActions([
      "homeAllPaymentsSendSmsCode",
      "homeAllPaymentsUserBindBankCard",
      "homeAllPaymentsGetWithdrawalBankList"
    ]),

    sendSmsCode() {
      this.loadingShow = true;
      this.homeAllPaymentsSendSmsCode({ phone: this.phone })
        .then(res => {
          this.loadingShow = false;
          if (res.resCode == 1000) {
            this.$vux.alert.show({
              title: "验证码已发送",
              content: `短信验证码已发送到您的手机，请查收`
            });
          } else {
            this.$vux.alert.show({
              title: "验证码获取失败",
              content: `${res.msg}`
            });
          }
        })
        .catch(err => {
          this.loadingShow = false;
          this.$vux.alert.show({
            title: "验证码获取失败",
            content: `${err}`
          });
        });
    },
    submitInfo() {
      if (
        parseFloat(this.user.money) < parseFloat(this.user.minWithdrawMoney)
      ) {
        this.$vux.alert.show({
          title: "温馨提示",
          content: `金额小于${this.user.minWithdrawMoney}元不能绑卡`,
          type: "cancel"
        });
        return;
      }
      if (this.serverTruename) {
        this.truename = this.serverTruename;
      }
      if (
        !this.address ||
        !this.truename ||
        !this.account ||
        (this.massegeVerify && !this.smsCode)
      ) {
        this.$vux.toast.show({ text: "请填写完整信息", type: "cancel" });
        return;
      }
      this.loadingShow = true;
      var data = {
        bankName: this.bankData[this.bankIndex].bankname,
        address: this.address,
        account: this.account,
        phone: this.phone,
        smsCode: this.smsCode,
        truename: this.truename
      };
      this.homeAllPaymentsUserBindBankCard(data).then(res => {
        this.loadingShow = false;
        if (res.resCode == 1000) {
          this.$vux.toast.show({ text: "提交成功", type: "success" });
          this.$router.push("/home/account");
        } else {
          this.$vux.alert.show({
            title: "提交失败",
            content: `提交失败！请刷新页面重试或者联系客服处理！[${res.msg},${
              res.resCode
            }]`
          });
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
  mounted() {
    setTimeout(() => {
      this.homeAllPaymentsGetWithdrawalBankList().then(res => {
        if (res.resCode == 1000) {
          this.bankData = res.data;
          this.massegeVerify = parseInt(res.massegeVerify) || 0;
          this.serverTruename = res.truename || null;
        }
      });
    }, 20);
  },
  computed: {
    ...mapState(["user", "skin"]),
    bankList() {
      if (this.bankData) {
        var res = [];
        for (var i = 0; i < this.bankData.length; i++) {
          res.push({ key: i, value: this.bankData[i].bankname });
        }
        return res;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pay {
  height: 100%;
  background-color: #ededed;
  font-size: px2rem(24px);
}
.container {
  position: absolute;
  top: px2rem(130px);
  bottom: 0;
  width: 100%;
  overflow: hidden;
  }
.content {
  padding: 0 px2rem(50px);
  box-sizing: border-box;
}
.header {
  background-color: #51a4fb;
}
.sendMsg {
  background-color: #51a4fb;
  height: px2rem(60px);
  font-size: px2rem(28px);
  padding: 0 px2rem(10px);
}
.btns {
  margin-top: px2rem(50px);
  button {
    background-color: #51a4fb;
    color: #fff;
    font-size: px2rem(30px);
  }
}
.vux-popup-dialog {
  height: 60% !important;
  p {
    &.vux-1px-b {
      font-size: px2rem(30px);
      padding: px2rem(8px);
    }
    font-size: px2rem(24px);
  }

}
</style>
