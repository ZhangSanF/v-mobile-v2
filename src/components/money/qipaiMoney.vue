<template>
  <div class="pay">
    <x-header :left-options="{backText: ''}" class="public-header-background-color public-header-boxShadow">棋牌额度转换</x-header>
    <div class="container">
      <div class="moneyShow">
        <div v-if="source=='kaiyuan'" :class="{'active':outPocket == 2}" @click="outPocket=2;inPocket=1">转出到我的钱包</div>
        <div v-if="source=='dafa'" :class="{'active':outPocket == 4}" @click="outPocket=4;inPocket=1">转出到我的钱包</div>
        <i class="line"></i>
        <div :class="{'active':outPocket == 1}" @click="outPocket=1;inPocket=(source=='kaiyuan' ? 2 : 4)">转到{{source==="dafa" ? baseInfo.dfqipai_name : `开元棋牌`}}</div>

      </div>
      <div class="inputBox">
        <p>
          <span v-if="outPocket == 2 || outPocket == 4"><i class="iconfont icon-homepage_fill"></i>{{source==="dafa" ? baseInfo.dfqipai_name : `开元棋牌`}}</span>
          <span v-if="outPocket == 1"><i class="iconfont icon-homepage_fill"></i>我的钱包</span>
          <span v-if="outPocket == 2">余额：{{kaiyuanMoney ? kaiyuanMoney : '--'}}<span class="icon-qiangzhishuaxin iconfont" @click="inquire(source)"></span></span>
          <span v-if="outPocket == 4">余额：{{dafaMoney ? dafaMoney : '--'}}<span class="icon-qiangzhishuaxin iconfont" @click="inquire(source)"></span></span>
          <span v-if="outPocket == 1">余额：{{user.money}}</span>
        </p>
        <div class=""><i class="iconfont icon-homepage_fill"></i><input v-model="money" placeholder="输入转换金额" type="number"></div>
      </div>

      
      <div class="btns">
        <x-button  @click.native="trasnAction">确认转出</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {XHeader, Group, XInput, XButton, TransferDom, Divider, Flexbox, FlexboxItem,} from 'vux'
  import BankCardInfo from './BankCardInfo'
  export default {
    name: 'qipaiMoney',
    components: {XHeader, Divider, XInput, Group, XButton, Flexbox, FlexboxItem,},
    data () {
      return {
        money: '',
        kaiyuanMoney: 0,
        dafaMoney: 0,
        outPocket: '',
        inPocket: '',
        source: '', //棋牌源 kaiyuan=>开元 dafa=>大发
      }
    },
    mounted(){
      this.outPocket = this.$route.query.out;
      this.inPocket = this.$route.query.in;
      this.source = this.$route.query.source;
    },
    methods: {
      ...mapActions(['homeKaiyuanDepositWithdrawal','homeKaiyuanSearchBalance']),

      trasnAction() {
        if(!this.money){
          this.$vux.alert.show({
            title: '操作失败',
            content: `请输入转换金额`,
          });
          return ;
        }

        if(!this.outPocket || !this.inPocket || this.inPocket == this.outPocket){
          this.$vux.alert.show({
            title: '操作失败',
            content: `请选择转出和转入的钱包,不能转到相同的钱包!`,
          });
          return ;
        }

        if (!(/(^[1-9]\d*$)/.test(this.money))) {
          this.$vux.alert.show({
            title: '操作失败',
            content: `请输入正整数金额`,
          });
          return;
        }

        this.$vux.loading.show({text: '转换中'});
        this.homeKaiyuanDepositWithdrawal({
          inType: this.inPocket,
          outType: this.outPocket,
          money: this.money,
          source: this.source
        })
        .then(res=>{
          this.$vux.loading.hide();
          if(res.resCode === 1000){
            this.$vux.toast.show({
              text: '转换成功',
              type: 'success',
            });
            this.inquire(this.source);
          }else{
            this.$vux.alert.show({
              title: '转换失败',
              content: `转换失败，请重试！${res.msg}`,
            })
          }
        })
        .catch(err=>{
          this.$vux.loading.hide();
          this.$vux.alert.show({
            title: '转换失败',
            content: `转换失败，请重试！${err}`,
          })
        });
      },
      inquire(source) {
        this.$vux.loading.show({
          text: '更新中'
        });
        this.homeKaiyuanSearchBalance(source)
        .then(res=>{
          this.$vux.loading.hide();
          if(res.resCode === 1000){
            this[`${source}Money`] = res.data.money;
          }else{
            this.$vux.alert.show({
              title: '查询失败',
              content: `查询失败，请重试！${res.msg}`,
            })
          }
        })
        .catch(err=>{
          this.$vux.loading.hide();
          this.$vux.alert.show({
            title: '查询失败',
            content: `查询失败，请重试！${err}`,
          })
        });
        
      }
    },
    computed: {
      ...mapState(['user', 'skin', 'baseInfo']),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  
  .container {
    position: absolute;
    top: px2rem(92px);
    font-size: px2rem(16px);
    bottom: 0;
    width: 100%;
    overflow: auto;
    background-color: #ededed;
    .moneyShow{
      background-color: #fff;
      align-items: center;
      display: flex;
      div{
        flex: 1;
        font-size: px2rem(30px);
        color: #333;
        height: px2rem(85px);
        display: flex;
        justify-content: center;
        align-items: center;
        &.active{
          color: #51a4fb;
        }
      }
      i{
        width: 1px;
        background-color: #ddd;
        height: px2rem(22px);
      }
    }
    .inputBox{
      margin-top: px2rem(20px);
      p{
        height: px2rem(120px);
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0 px2rem(30px);
        font-size: px2rem(30px);
        color: #333;
        align-items: center;
        span:nth-of-type(2){
          color: #c1c1c1;
          span{
            margin-left: px2rem(10px);
          }
        }
      }
      div {
        position: relative;
        i{
        position: absolute;
        left: px2rem(30px);
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: px2rem(40px);
        height: px2rem(40px);

      }
      }
      input{
        height: px2rem(120px);
        outline: 0;
        border: 0;
        padding: 0 px2rem(30px) 0 px2rem(100px);
        width: 100%;
      }
    }
  }
  .pay {
    height: 100%;
  }
  h4 {
    color: #555;
    padding: px2rem(12px) 0 0 px2rem(6px);
  }
  .btns {
    padding: 0 px2rem(50px);
    margin-top: px2rem(172px);
    button{
      background-color: #51a4fb;
      color: #fff;
    }
  }
  .pass-notice {
    font-size: px2rem(24px);
    padding: px2rem(2px) px2rem(14px);
    color: #999;
  }
  .vux-flexbox-item {
    &:nth-of-type(1) {
      .pocket {
        margin-left: px2rem(10px);
      }
    }
    &:nth-of-type(2) {
      .pocket {
        margin-right: px2rem(10px);
      }
    }
    .selected {
      background: #ff751b;
    }
  }
  .pocket {
    text-align: center;
    padding: px2rem(8px);
    background: #c8c8c8;
    color: #fff;
    margin: px2rem(6px) 0;
    line-height: px2rem(22px);
    .name {
      font-weight: 600;
      font-size: px2rem(24px);
    }
    .money {
      color: yellow;
    }
    .icon-shuaxin {
      position: relative;
      left: px2rem(16px);
      color: cadetblue;
    }
    
  }
  
</style>
