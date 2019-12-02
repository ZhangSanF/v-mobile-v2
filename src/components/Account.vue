<template>
  <div class="account content">
    <scroll class="scroll" :data="scrollDatas">
      <div class="scrollBox">
        <div class="money bg-theme-color">
        <p class="money-title">账户余额（RMB:元）
          <span class="iconfont"
            :class="moneyShow ? 'icon-icon-eye-open' : 'icon-icon-eye-close'"
            @click="moneyShow = !moneyShow"
          ></span>
        </p>
        <p class="money-text">{{moneyShow ? user.money : '恭喜發財'}}</p>
        <p class="winorlose">今日输赢：{{moneyShow ? user.winorlose : '****'}}元</p>
      </div>

      <div class="card">
        <div class="card-content bg-public-deep-bgColor">
          <div class="card-content-inner" @click="toMoney('pay')">
            <span class="iconfont icon-zhifu"></span>
            <span class="text">充值</span>
            <!-- <span class="img"></span> -->
            <x-icon type="ios-arrow-right"></x-icon>
            <p>支持网银支付/支付宝/微信/QQ等支付方式</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content bg-public-deep-bgColor">
          <div class="card-content-inner" @click="getMoney">
            <span class="iconfont icon-yunongtongqukuanfuwu"></span>
            <span class="text">提现</span>
            <!-- <span class="img"></span> -->
            <x-icon type="ios-arrow-right"></x-icon>
            <p>提现到银行卡，极速到账</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content bg-public-deep-bgColor">
          <div class="card-content-inner" @click="toMoney('bills')">
            <span class="iconfont icon-zhangdan"></span>
            <span class="text">存取款记录</span>
            <!-- <span class="img"></span> -->
            <x-icon type="ios-arrow-right"></x-icon>
            <p>查询账户金额变动，包括红包、充值、提现等</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content bg-public-deep-bgColor">
          <div class="card-content-inner" @click="toMoney('qipaiMoney')">
            <span class="iconfont icon-qipaishi"></span>
            <span class="text">棋牌游戏额度转换</span>
            <!-- <span class="img"></span> -->
            <x-icon type="ios-arrow-right"></x-icon>
            <p>棋牌游戏余额和当前账户余额相互转换</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content bg-public-deep-bgColor">
          <div class="card-content-inner" @click="toMoney('card')">
            <span class="iconfont icon-iconset0291"></span>
            <span class="text">我的银行卡</span>
            <!-- <span class="img"></span> -->
            <x-icon type="ios-arrow-right"></x-icon>
            <p>查看当前绑定的银行卡</p>
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <loading :show="loadingShow" :text="loadingText"></loading>
      </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Scroll from '@/components/common/scroll'
  import {
    setTimeout
  } from 'timers';
  import {Loading, TransferDom} from 'vux'
  export default {
    name: 'Account',
    components: {Loading,Scroll},
    directives: {TransferDom},
    data() {
      return {
        moneyShow: false,
        loadingShow: false,
        loadingText: '加载中',
        scrollDatas:[]
      }
    },
    methods: {
      ...mapActions(['homeIndexInit']),

      toMoney(e) {
        if(!this.user || this.user.agmem != 1){
          this.$vux.alert.show({
            title: '提示',
            content: `请登录为正式用户`,
          })
          return;
        }
        this.$router.push('/money/' + e);
      },
      getMoney() {
        if(!this.user || this.user.agmem != 1){
          this.$vux.alert.show({
            title: '提示',
            content: `请登录为正式用户!`,
          })
          return;
        }
        this.loadingShow = true;
        this.homeIndexInit({actions: 'bankInfo'})
        .then((res) => {
          this.loadingShow = false;
          if(res.resCode == 1000){
            var bankInfo = res.data.bankInfo; //银行卡信息
            bankInfo && this.$store.commit('SAVE_USER_BANKCARD_INFO', bankInfo);
            if(bankInfo.bankcard){ //已经绑定了银行卡
              this.$router.push('/money/draw');
            }else{
              this.$router.push('/money/addcard');
            }
          }else{
            this.$vux.alert.show({
              title: '提示',
              content: `账户信息获取失败，请刷新重试！${res.msg}`,
            })
          }
        })
        .catch(err=>{
          this.loadingShow = false;
          this.$vux.alert.show({
            title: '提示',
            content: `账户信息获取失败，请刷新重试！${err}`,
          })
        });
      }
    },
    mounted() {
      setTimeout(() => {
        this.$emit('tabsChange', 'account');
        this.scrollDatas = [0,1,2,3,4,5,6,7,8,9];
      }, 50);
    },
    computed: {
      ...mapState(['user']),
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .account {
    // background: #f0eff5;
    height: 100%;
  }

  .scroll{
    overflow: hidden;
    position: relative;
    height: 100%;
    .scrollBox{
      padding-bottom: px2rem(25px);
    }
  }

  .money {
    height: px2rem(160px);
    padding: px2rem(10px) px2rem(20px);
    width: 100%;
    // background: linear-gradient(90deg, #ff4b3e, #fb2351);
    color: #fff;
    position: relative;
    box-sizing: border-box;
  }

  .winorlose {
    position: absolute;
    font-size: px2rem(16px);
    bottom: px2rem(16px);
    right: px2rem(22px);
  }

  .money-title {
    margin: 0;
    font-size: px2rem(16px);
    .iconfont {
      float: right;
      font-size: px2rem(20px);
    }
  }

  .money-text {
    margin: 0;
    font-size: px2rem(37px);
    padding: px2rem(16px) px2rem(6px);
  }

  .card {
    margin: px2rem(8px) px2rem(5px);
  }

  .card-content-inner {
    padding: 0;
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
    background-position: px2rem(345px,false) px2rem(52px,false);
  }

  .icons {
    font-size: px2rem(18px);
    position: absolute;
    top: px2rem(8px);
    left: px2rem(8px);
  }

  .icon-refresh {
    font-weight: 800;
    margin-top: px2rem(6px);
    margin-right: px2rem(20px);
    float: right;
  }

  .icon-qipaishi {
    color: darkorchid;
  }

  .card-content-inner {
    padding-left: px2rem(13px);
    .text {
      margin-left: px2rem(6px);
      position: relative;
      top: px2rem(3px,false);
      font-size: px2rem(14px);
      color: #333;
    }
    .iconfont {
      font-weight: 600;
      font-size: px2rem(26px);
      position: relative;
      top: px2rem(10px);
    }
    .icon-zhifu {
      color: orange;
    }
    .icon-yunongtongqukuanfuwu {
      color: #4a85fe;
    }
    .icon-zhangdan {
      color: #319e80;
    }
    .icon-iconset0291 {
      color: coral;
    }
  }

  .icon-refresh {
    font-weight: normal;
  }

  .card-content {
    // background: #fff;
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
