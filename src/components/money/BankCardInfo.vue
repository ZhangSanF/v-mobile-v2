<template>
    <div class="card-content">
      <div class="card">
        <p class="head">
          <span class="bankname">{{bankName}}</span>
        </p>
        <p class="num">**** **** **** {{bankNum}}</p>
        <p class="footer">
          <span class="truename">持卡人：{{truename}}</span>
          <img src="../../assets/images/union.png" alt="">
        </p>
      </div>
      <div v-transfer-dom>
        <loading :show="loadingShow" :text="loadingText"></loading>
      </div>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {Loading, TransferDom} from 'vux'
  export default {
    name: 'BankCardInfo',
    components: {Loading, TransferDom},
    directives: {TransferDom},
    data () {
      return {
        loadingShow: false,
        loadingText: '加载中',
        bankName: '暂未绑定银行卡',
        bankNum: '',
        truename: '',
      }
    },
    methods: {
      ...mapActions(['homeIndexInit'])
    },
    mounted() {
      setTimeout(() => {
        this.loadingShow = true;
        this.homeIndexInit({actions: 'bankInfo'})
        .then((res) => {
          this.loadingShow = false;
          if(res.resCode == 1000){
            var bankInfo = res.data.bankInfo; //银行卡信息
            bankInfo && this.$store.commit('SAVE_USER_BANKCARD_INFO', bankInfo);
            if(bankInfo.bankcard){ //已经绑定了银行卡
              this.bankName = bankInfo.bankname;
              this.bankNum = bankInfo.bankcard;
              this.truename = bankInfo.truename;
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
      }, 20);
    },
    computed: {
      ...mapState(['user']),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  .card-content {
    padding: px2rem(30px) px2rem(40px);
    font-size: px2rem(30px);
    box-sizing: border-box;
    width: px2rem(670px);
    /*height: px2rem(238px);*/
    margin: px2rem(60px) auto;
    /*background-size: contain;*/
    background-color: #e6e6e6;
    border-radius: px2rem(12px);
    /*background-image: url('../../assets/images/bankcar.png');*/
    .card {
      text-shadow: 1px 1px 1px #777;
      color: #fff;
      height: 100%;
      padding: px2rem(12px);
      position: relative;
      .head {
        padding: px2rem(10px);
        border-bottom: 1px solid #c0c0c0;
        .bankname {
          font-weight: 600;
        }
      }
      .num {
        margin: px2rem(50px) 0;
        padding: 0 px2rem(16px);
        font-size: px2rem(34px);
        font-weight: 600;
      }
      .footer {
        /*position: absolute;*/
        /*bottom: 0;*/
        width: 100%;
        color: #fff;
        .truename {
          margin-left: px2rem(16px);
          font-size: px2rem(24px);
        }
        img {
          float: right;
          width: px2rem(112px);
          opacity: .5;
          position: relative;
          bottom: px2rem(16px);
          right: px2rem(32px);
        }
      }
    }
  }
  
</style>
