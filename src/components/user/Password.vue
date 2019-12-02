<template>
  <div class="password">
    <x-header :left-options="{backText: ''}" class="header">
      <span v-show="tabIndex == 0">修改登录密码</span>
      <span v-show="tabIndex == 1">修改取款密码</span>
    </x-header>

    <div class="tabs">
      <div @click="tabChange(0)" :class="{'active':tabIndex == 0}">登录密码</div>
      <i></i>
      <div @click="tabChange(1)" :class="{'active':tabIndex == 1}">取款密码</div>
    </div>

		<div  v-if="tabIndex == 0" class="groupBox">
			<input  type="password" placeholder="请输入旧密码" v-model="login.oldPass" :min="4" :max="20"/>
			<input  type="password" placeholder="请输入新密码" v-model="login.newPass1" :min="4" :max="20"/>
			<input  type="password" placeholder="请再次输入新密码" v-model="login.newPass2" :min="4" :max="20"/>
		</div>

		<div v-if="tabIndex == 1" class="groupBox">
			<input  type="password" placeholder="请输入旧密码" v-model="draw.oldPass" :min="4" :max="10" v-if="user.isset_atmpassword == 1"/>
			<input  type="password" placeholder="请输入新密码" v-model="draw.newPass1" :min="4" :max="10"/>
			<input  type="password" placeholder="请再次输入新密码" v-model="draw.newPass2" :min="4" :max="10"/>
      <p class="pass-notice">*取款密码为4位数字，如果忘记取款密码请联系客服处理！</p>
    </div>
		
    <div class="btns">
      <x-button  @click.native="passwordChange">确认提交</x-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {ButtonTab, ButtonTabItem, XHeader, Group, XInput, XButton, TransferDom, Divider} from 'vux'
  export default {
    name: 'Password',
    components: {ButtonTab, ButtonTabItem, XHeader, Divider, XInput, Group, XButton},
    data () {
      return {
				tabIndex: 1,
        login: {oldPass: '', newPass1: '', newPass2: '', type: 1},
        draw: {oldPass: '', newPass1: '', newPass2: '', type: 2},
      }
    },
    methods: {
      ...mapActions(['homeUserChangeAllPwd']),
      
      tabChange(e) {
				this.tabIndex = e;
      },
      passwordChange() {
        if(this.tabIndex === 0){
          if(!this.login.oldPass || !this.login.newPass1 || !this.login.newPass2){
            this.$vux.alert.show({
              title: '提示',
              content: `请填写完整信息`,
            })
            return ;
          }
          if(this.login.newPass1 != this.login.newPass2){
            this.$vux.alert.show({
              title: '提示',
              content: `两次输入的新密码不一致`,
            })
            return ;
          }
          this.doChange(this.login);
        }else if(this.tabIndex === 1){
          if(!this.draw.newPass1 || !this.draw.newPass2){
            this.$vux.alert.show({
              title: '提示',
              content: `请填写完整信息`,
            })
            return ;
          }
          if(this.draw.newPass1 != this.draw.newPass2){
            this.$vux.alert.show({
              title: '提示',
              content: `两次输入的新密码不一致`,
            })
            return ;
          }
          this.doChange(this.draw);
        }
      },
      doChange(e) {
        this.homeUserChangeAllPwd(e)
        .then(res=>{
          if(res.resCode === 1000){
            this.$vux.alert.show({
              title: '操作成功',
              content: `密码修改成功！`,
            })
            if(e.type == 2){
              this.$store.state.user.isset_atmpassword = 1;
            }
          }else{
            this.$vux.alert.show({
              title: '操作失败',
              content: `${res.msg}`,
            })
          }
        })
        .catch(err=>{
          this.$vux.alert.show({
            title: '操作失败',
            content: `${err}`,
          })
        });
      }
    },
    mounted() {
      setTimeout(() => {
        var type = this.$route.query.type;
        if(type === 'login'){
          this.tabIndex = 0;
        }else if(type === 'draw'){
          this.tabIndex = 1;
        }
      }, 20);
    },
    computed: {
      ...mapState(['user', 'skin']),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  .password {
    height: 100%;
    background-color: #f3f4f6;
    /deep/ .weui-cells {
      font-size: px2rem(14px);
    }
    .header{
      background-color: $public-header-background-color;
    }
    .tabs{
      display: flex;
      height: px2rem(88px);
      background-color: #fff;
      font-size: px2rem(30px);
      align-items: center;
      color: #999;
      div{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        &.active{
          color: #333;
        }
      }
      i{
        height: px2rem(22px);
        width: 1px;
        background-color: #dddddd;
      }
    }
  }

  .groupBox{
    text-align: center;
    input{
      width: px2rem(650px);
      height: px2rem(88px);
      border: 1px solid #ddd;
      border-radius: px2rem(10px);
      margin-top: px2rem(24px);
      padding: 0 px2rem(20px);
      font-size: xp2rem(30px);
      color: #333;
    }
  }
  h4 {
    color: #555;
    padding: px2rem(13px) 0 0 px2rem(6px);
  }
  .btns {
    padding: 0 px2rem(26px);
    margin-top: px2rem(100px);
    button{
      height: px2rem(88px);
      background-color: #51a4fb;
      color: #fff;
      font-size: px2rem(32px);
    }
  }
  .pass-notice {
    font-size: px2rem(24px);
    padding: px2rem(2px) px2rem(14px);
    margin-top: px2rem(24px);
    color: #999;
	}
	.vux-button-group {
		padding: px2rem(10px);
	}
  
  
</style>
