<template>
  <div class="pay">
    <x-header :left-options="{backText: ''}" class="header">提款</x-header>
    <scroll class="container" :data="scrollDatas">
    <div>
      <bank-card-info></bank-card-info>
      <div class="inputBox">
        <p>
          <span>输入提款金额</span>
          <span>全部提现</span>
        </p>
        <input title="提款金额" name="money" placeholder="请输入提款金额" is-type="number" v-model="money"/>
      </div>
      <div class="inputBox">
        <p>
          <span>输入提款密码</span>
        </p>
        <input title="提款密码" type="password" placeholder="请输入密码" v-model="password" :min="4" :max="16"/>
      </div>

      <div class="infoBox">
        <p>提现说明</p>
        <p class="pass-notice">如果您没有或者忘记了提款密码，<br>请到首页“个人中心”-“安全设置”设置提款密码，如有疑问请联系客服处理！</p>
      </div>
 
      
      <div class="btns">
        <x-button  @click.native="drawAction">确认提交</x-button>
      </div>
    </div>
    </scroll>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {XHeader, Group, PopupRadio, XInput, XButton, Toast, Loading, TransferDom, XDialog, Divider, Card, Datetime} from 'vux'
  import BankCardInfo from './BankCardInfo'
  import Scroll from '@/components/common/scroll'
  export default {
    name: 'Draw',
    components: {XHeader, BankCardInfo, Divider, XInput, Group, XButton,Scroll},
    data () {
      return {
        money: '',
        password: '',
        scrollDatas:[]
      }
    },
    mounted() {
      setTimeout(() => {
        this.scrollDatas = [0,1,2,3,4,5,6,7,8,9];
      }, 100);
    },
    methods: {
      ...mapActions(['homeAllPaymentsDepositWithdrawPlatform']),

      drawAction() {
        if(parseFloat(this.user.money) < parseFloat(this.user.minWithdrawMoney)){
          this.$vux.alert.show({title:"温馨提示",content: `金额小于${this.user.minWithdrawMoney}元不能提款`,type: 'cancel'})
          return ;
        }
        if(!this.money || !this.password){
          this.$vux.toast.show({text: '请填写完整信息',type: 'cancel'});
          return ;
        }
        var data = {
          method: 'memberWithdrawal',
          order_amount: this.money,
          password: this.password,
        };
        this.homeAllPaymentsDepositWithdrawPlatform(data)
        .then((res) => {
          if(res.resCode === 1000){
            this.$vux.alert.show({
              title: '取款成功',
              content: `取款提交成功，请稍后查询您的账户！`,
            })
          }else{
            this.$vux.alert.show({
              title: '操作失败',
              content: `取款操作失败！${res.msg}`,
            })
          }
        })
        .catch(err=>{
          this.$vux.alert.show({
            title: '操作失败',
            content: `取款操作失败！${err}`,
          })
        });

      }
    },
    computed: {
      ...mapState(['user', 'skin']),
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
    overflow: hidden;
  }
  .infoBox{
    margin-top: px2rem(160px);
    padding: 0 px2rem(50px);
    box-sizing: border-box;
    p{
      font-size: px2rem(30px);
      color: #fff;
      display: flex;
      justify-content: space-between;
      &:nth-of-type(2){
        font-size: px2rem(24px);
        margin-top: px2rem(30px);
      }
    }
  }
  .inputBox{
    padding: 0 px2rem(50px);
    box-sizing: border-box;
    p{
      font-size: px2rem(28px);
      color: #fff;
      display: flex;
      justify-content: space-between;
      padding: px2rem(30px) 0;
    }
    input{
      width: 100%;
      height: px2rem(80px);
      outline: 0;
      font-size: px2rem(28px);
      border-radius: px2rem(10px);
      border: 0;
      box-sizing: border-box;
      padding: 0 px2rem(30px);
    }
  }
  .pay {
    height: 100%;
    background-color: #001847;
  }
  h4 {
    color: #555;
    padding: px2rem(12px) 0 0 px2rem(6px);
  }
  .btns {
    padding: 0 px2rem(50px);
    margin-top: px2rem(30px);
    button{
      background-color: #51a4fb;
      color: #fff;
    }
  }
  .header{
    background-color: #001847;
  }
  
</style>
