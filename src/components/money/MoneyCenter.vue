<template>
  <div class="moneyCenter">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >钱包中心</x-header>
    <scroll class="scroll" :data="scrollDatas">
      <div class="scrollBox">
        <div class="headerBox">
          <div class="tips">
            <i class="iconfont icon-jinbi"></i>
            <span>总资产(元)</span>
          </div>
          <div class="money">
            <p>
              <span>{{allWalletAmount.totalMoney? allWalletAmount.totalMoney: '----'}}</span>
            </p>
            <p v-if="allWalletAmount.walletStatus == 1">上次收益到账时间：{{allWalletAmount.lastAmountTime}}</p>
          </div>
          <div class="otherInfo" >
            <div v-if="allWalletAmount.walletStatus == 1">
              <p>+{{allWalletAmount.lastAmount?allWalletAmount.lastAmount:'暂无收益'}}</p>
              <p>上次收益(元)</p>
            </div>
            <div v-if="allWalletAmount.walletStatus == 1">
              <p>+{{allWalletAmount.totalAmount?allWalletAmount.totalAmount:'暂无收益'}}</p>
              <p>累计收益(元)</p>
            </div>
            <div>
              <p>+{{allWalletAmount.userMoney?allWalletAmount.userMoney:'00'}}</p>
              <p>账户余额(元)</p>
            </div>
          </div>
        </div>
        <div class="lxb cardBox" v-if="allWalletAmount.walletStatus == 1">
          <div class="title">{{allWalletAmount.name}}</div>
          <div class="ruleBtn" @click="showRule">说明</div>
          <div class="money">
            <p>
              <span>{{allWalletAmount.money? allWalletAmount.money: '----'}}</span>
            </p>
            <p>{{allWalletAmount.name}}余额</p>
          </div>
          <div class="btns">
            <router-link tag="div" class="in" to="/money/lxbTransfer?tab=1">转入</router-link>
            <router-link tag="div" class="out" to="/money/lxbTransfer?tab=2">转出</router-link>
            <router-link tag="div" class="out" to="/money/lxbDetailData">明细</router-link>
          </div>
        </div>
        <div class="kyqp cardBox" v-if="baseInfo.is_open_kaiyuan == 1">
          <div class="title">开元棋牌</div>
          <div class="money">
            <p>
              <span>{{kaiyuanMoney ? kaiyuanMoney : '----'}}</span>
              <i @click="inquireQipai('kaiyuan')" class="iconfont icon-qiangzhishuaxin"></i>
            </p>
            <p>棋牌积分</p>
          </div>
          <div class="btns">
            <router-link tag="div" class="in" to="/money/qipaiMoney?in=2&out=1&source=kaiyuan">转入</router-link>
            <router-link tag="div" class="out" to="/money/qipaiMoney?in=1&out=2&source=kaiyuan">转出</router-link>
          </div>
        </div>
        <div class="kyqp cardBox" v-if="baseInfo.is_open_dafa == 1">
          <div class="title">{{baseInfo.dfqipai_name}}</div>
          <div class="money">
            <p>
              <span>{{dafaMoney ? dafaMoney : '----'}}</span>
              <i @click="inquireQipai('dafa')" class="iconfont icon-qiangzhishuaxin"></i>
            </p>
            <p>棋牌积分</p>
          </div>
          <div class="btns">
            <router-link tag="div" class="in" to="/money/qipaiMoney?in=4&out=1&source=dafa">转入</router-link>
            <router-link tag="div" class="out" to="/money/qipaiMoney?in=1&out=4&source=dafa">转出</router-link>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>


<script>
import { XHeader } from "vux";
import Scroll from "@/components/common/scroll";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "moneyCenter",
  data() {
    return {
      scrollDatas: [],
      allWalletAmount: {},
      kaiyuanMoney: "",
      dafaMoney: "",
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.getAmount();
    });
  },

  methods: {
    ...mapActions(["homeWalletGetWalletAmount", "homeKaiyuanSearchBalance"]),

    showRule() {
      let txt = this.allWalletAmount.rule
        ? this.allWalletAmount.rule.replace(/[$]/g, "<br>")
        : "";
        console.log(txt)
        txt = `<div style='text-align:left'>${txt}</div>`
      this.$vux.alert.show({
        title: "规则",
        content: txt
      });
    },

    inquireQipai(source) {
      this.$vux.loading.show({
        text: "更新中"
      });
      this.homeKaiyuanSearchBalance(source)
        .then(res => {
          this.$vux.loading.hide();
          if (res.resCode === 1000) {
            this[`${source}Money`] = res.data.money;
          } else {
            this.$vux.alert.show({
              title: "查询失败",
              content: `查询失败，请重试！${res.msg}`
            });
          }
        })
        .catch(err => {
          this.$vux.loading.hide();
          this.$vux.alert.show({
            title: "查询失败",
            content: `查询失败，请重试！${err}`
          });
        });
    },

    getAmount() {
      this.$vux.loading.show({
        text: "加载中..."
      });
      this.homeWalletGetWalletAmount().then(res => {
        if (res.resCode == 1000) {
          this.$store.commit("SAVE_LXB_DATA", res.data);
          this.allWalletAmount = res.data;
        }
        this.$vux.loading.hide();
      });
    }
  },
  computed:{
    ...mapGetters(['baseInfo'])
  },
  components: { Scroll, XHeader }
};
</script>


<style lang="scss" scoped>
.moneyCenter {
  .scroll {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: px2rem(90px);
    height: 100%;
    .scrollBox {
      padding-bottom: px2rem(80px);
      .headerBox {
        background-image: url("../../assets/images/moneyCenterHeaderBg.png");
        background-size: 100% 100%;
        height: px2rem(341px);
        width: 100%;
        padding: px2rem(10px) px2rem(30px);
        box-sizing: border-box;
        color: #fff;
        .tips {
          font-size: px2rem(24px);
          display: flex;
          align-items: center;
          i {
            margin-right: px2rem(10px);
          }
        }
        .money {
          margin-top: px2rem(40px);
          span {
            font-size: px2rem(68px);
          }
          p {
            font-size: px2rem(24px);
          }
        }
        .otherInfo {
          margin-top: px2rem(30px);
          display: flex;
          font-size: px2rem(28px);
          & > div {
            flex: 1;
          }
        }
      }

      .cardBox {
        position: relative;
        background-size: 100% 100%;
        padding: px2rem(30px);
        height: px2rem(358px);
        color: #fff;
        .title {
          font-size: px2rem(36px);
          font-weight: 600;
        }
        .money {
          margin-top: px2rem(50px);
          i {
            font-size: px2rem(40px);
            margin-left: px2rem(10px);
          }
          span {
            font-size: px2rem(48px);
            padding-bottom: px2rem(22px);
            display: inline-block;
          }
          p {
            font-size: px2rem(24px);
          }
        }
        .btns {
          margin-top: px2rem(52px);
          font-size: px2rem(30px);
          display: flex;
          div {
            width: px2rem(196px);
            height: px2rem(60px);
            border-radius: px2rem(30px);
            background-color: #fff;
            margin-right: px2rem(60px);
            line-height: px2rem(60px);
            text-align: center;
          }
        }
        .ruleBtn {
          position: absolute;
          background-color: #fff;
          color: #ffa729;
          padding: 0 px2rem(20px);
          border-top-left-radius: px2rem(20px);
          border-bottom-left-radius: px2rem(20px);
          right: 0;
          top: px2rem(30px);
          font-size: px2rem(30px);
        }
      }
      .kyqp {
        background-image: url("../../assets/images/kyqpBg.png");
        margin: px2rem(10px) px2rem(20px);
        .btns {
          color: #6497d8;
        }
      }
      .lxb {
        background-image: url("../../assets/images/lxbBg.png");
        margin: px2rem(20px) px2rem(20px) px2rem(10px) px2rem(20px);
        .btns {
          color: #fbb551;
        }
      }
    }
  }
}
.public-header-background-color {
  background-color: #278af1;
}


</style>
