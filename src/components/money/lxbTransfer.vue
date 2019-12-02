<template>
  <div class="lxbTransfer">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >{{lxbDatas.name}}</x-header>
    <scroll class="scroll" :data="[0,1,2]" >
      <div>
        <div class="handerBox">
          <div class="money">
            <p>{{lxbDatas.name}}余额(元)</p>
            <p>
              <span>{{lxbMoney?lxbMoney:'----'}}</span>
            </p>
          </div>
          <div class="infoBox">
            <div>
              <p>
                <span>{{lxbDatas.lastAmount?lxbDatas.lastAmount:'暂无收益'}}</span>
              </p>
              <p>上次收益(元)</p>
            </div>
            <div>
              <p>
                <span>{{lxbDatas.totalAmount?lxbDatas.totalAmount:'暂无收益'}}</span>
              </p>
              <p>累计收益(元)</p>
            </div>
            <div>
              <p>
                <span>{{lxbDatas.rate?lxbDatas.rate:'0'}}</span>
              </p>
              <p>年化率(%)</p>
            </div>
          </div>
        </div>
        <div class="tabBox">
          <div :class="{'active':tabIndex == 1}" @click="tabIndex = 1">转入</div>
          <i>|</i>
          <div :class="{'active':tabIndex == 2}" @click="tabIndex = 2">转出</div>
        </div>
        <div class="tipsBox" v-show="tabIndex == 1">
          您今日可用打码量为
          <span>{{curAvailableCodes}}</span>
          元，可转入{{lxbDatas.name}}
          <span>{{curAvailableTrCodeMoney}}</span>元
          <p>(可转今日为打码量的{{lxbDatas.availableCodeRatio*100}}%)</p>
          <p>
            最低存入
            <span>{{lxbDatas.incomeMinMoney}}</span>元，可产生收益
          </p>
        </div>
        <div class="tipsBox" v-show="tabIndex == 2">
          <p>{{lxbDatas.name}}转出只能为正整数金额</p>
        </div>
        <div class="inputBox">
          <div class="tips">{{inOrOutTxt()}}金额(元)</div>
          <div class="input">
            <span>金额</span>
            <input
              type="text"
              v-model.number="curMoney"
              :placeholder="`最多可以`+inOrOutMoneyText()+`元`"
            />
            <span class="allIn" @click="inputAll">全部</span>
          </div>
        </div>
        <div class="btn" @click="convertMoney">确定{{inOrOutTxt()}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { XHeader } from "vux";
import Scroll from "@/components/common/scroll";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "lxbTransfer",
  data() {
    return {
      curMoney: "",
      tabIndex: 1,
      lxbMoney: "",
      curAvailableCodes: 0,
      curAvailableTrCodeMoney: 0,
      btnIsLock: false
    };
  },
  mounted() {
    this.tabIndex = this.$route.query.tab;
    this.lxbMoney = this.lxbDatas.money;
    this.curAvailableCodes = this.lxbDatas.availableCodes;
    this.curAvailableTrCodeMoney = this.lxbDatas.availableTrCodeMoney;
  },
  methods: {
    ...mapActions(["homeWalletTransfer", "homeWalletTransferOut"]),

    convertMoney() {
      if (!this.curMoney) {
        this.$vux.alert.show({
          title: "提示信息",
          content: "请输入金额"
        });
        return;
      }
      if (!/(^[1-9]\d*$)/.test(this.curMoney)) {
        this.$vux.alert.show({
          title: "提示信息",
          content: "请输入正整数金额"
        });
        return;
      }
      if (this.btnIsLock) {
        return;
      }
      this.btnIsLock = true;
      if (this.tabIndex == 1) {
        this.homeWalletTransfer(this.curMoney).then(res => {
          if (res.resCode == 1000) {
            this.lxbMoney = res.money;
            this.curAvailableCodes = res.availableCodes;
            this.curAvailableTrCodeMoney = res.availableTrCodeMoney;
            this.curMoney = "";
            this.$vux.alert.show({
              title: "提示信息",
              content: res.msg
            });
          } else {
            this.$vux.alert.show({
              title: "提示信息",
              content: `操作失败，请重试！${res.msg ? res.msg : ""}`
            });
          }
          this.btnIsLock = false;
        });
      } else {
        this.homeWalletTransferOutFunc(0);
      }
    },

    homeWalletTransferOutFunc(confirm) {
      this.homeWalletTransferOut({
        money: this.curMoney,
        confirm: confirm
      }).then(res => {
        if (res.resCode == 1000) {
          this.curMoney = "";
          this.lxbMoney = res.money;
          this.$vux.alert.show({
            title: "提示信息",
            content: res.msg
          });
        } else if (res.resCode == 8888) {
          this.$vux.confirm.show({
            title: "提示信息",
            content: res.msg,
            onConfirm: () => {
              this.homeWalletTransferOutFunc(1);
            }
          });
        } else {
          this.$vux.alert.show({
            title: "提示信息",
            content: `操作失败，请重试！${res.msg ? res.msg : ""}`
          });
        }
        this.btnIsLock = false;
      });
    },

    inOrOutTxt() {
      return this.tabIndex == 1 ? "转入" : "转出";
    },

    inOrOutMoneyText() {
      let curMoney = 0;
      if (this.lxbDatas.userMoney < this.curAvailableTrCodeMoney) {
        curMoney = this.lxbDatas.userMoney;
      } else {
        curMoney = this.curAvailableTrCodeMoney;
      }
      return this.tabIndex == 1
        ? "转入" + curMoney
        : "转出" + parseInt(this.lxbMoney);
    },

    inputAll() {
      if (this.tabIndex == 1) {
        if (this.lxbDatas.userMoney < this.curAvailableTrCodeMoney) {
          this.curMoney = this.lxbDatas.userMoney;
        } else {
          this.curMoney = parseInt(this.curAvailableTrCodeMoney);
        }
      } else {
        this.curMoney = parseInt(this.lxbMoney);
      }
    }
  },
  computed: {
    ...mapGetters(["lxbDatas"])
  },
  watch: {
    tabIndex() {
      this.curMoney = "";
    }
  },
  components: { XHeader,Scroll }
};
</script>


<style lang="scss" scoped>
.lxbTransfer {
  background-color: #f8f8f8;
  height: 100%;
  .scroll {
    position: absolute;
    overflow: hidden;
    top: px2rem(90px);
    left: 0;
    right: 0;
    bottom: 0;
  }
  .handerBox {
    position: relative;
    background-image: url("../../assets/images/lxbTitleBg.png");
    height: px2rem(358px);
    background-size: 100% 100%;
    color: #fff;
    padding: px2rem(30px);
    .money {
      margin-top: px2rem(30px);
      p {
        font-size: px2rem(24px);
      }
      span {
        display: inline-block;
        margin-top: px2rem(42px);
        font-size: px2rem(68px);
      }
    }
    .infoBox {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      background-color: rgba(0, 0, 0, 0.2);
      height: px2rem(127px);
      justify-content: center;
      align-items: center;
      & > div {
        flex: 1;
        font-size: px2rem(24px);
        text-align: center;
        line-height: px2rem(40px);
        span {
          font-size: px2rem(36px);
        }
      }
    }
  }
  .tabBox {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: px2rem(88px);
    background-color: #fff;
    font-size: px2rem(30px);
    border-bottom: 1px solid #ddd;
    color: #999;
    .active {
      color: #333;
    }
    i {
      color: #ddd;
      font-style: normal;
    }
  }
  .tipsBox {
    font-size: px2rem(24px);
    padding: px2rem(30px);
    color: #666;
    span {
      color: #f44336;
    }
  }
  .inputBox {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    padding: px2rem(40px) px2rem(30px);
    font-size: px2rem(30px);
    .tips {
      color: #666;
    }
    .input {
      margin-top: px2rem(80px);
      display: flex;
      color: #333;
      input {
        margin: 0 px2rem(20px);
        flex: 1;
        border: 0;
      }
      .allIn {
        color: #ffa628;
      }
    }
  }
  .btn {
    width: px2rem(650px);
    height: px2rem(88px);
    line-height: px2rem(88px);
    margin: 0 auto;
    color: #fff;
    background-color: #ffa628;
    text-align: center;
    font-size: px2rem(30px);
    border-radius: px2rem(8px);
    margin-top: px2rem(80px);
  }
}
.public-header-background-color {
  background-color: #ffa728;
}
</style>
