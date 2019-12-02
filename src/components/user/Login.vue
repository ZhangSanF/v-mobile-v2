<template>
  <div class="login">
    <x-header :left-options="{backText: ''}" class="header">登录</x-header>
    <div class="container">
      <div class="logo">
        <img v-if="settingImages" :src="settingImages.new_logo" alt>
      </div>
      <div class="inputBox">
        <i class="icon iconfont icon-yonghuming"></i>
        <input title placeholder="请输入用户名" max="20" v-model="username">
      </div>
      <div class="inputBox">
        <i class="icon iconfont icon-mima"></i>
        <input title type="password" placeholder="请输入密码" v-model="password" min="6" max="16">
      </div>
      <div class="inputBox" v-if="isShowCode">
        <i class="icon iconfont icon-yanzhengma"></i>
        <input title="验证码：" v-model="code" placeholder="请输入验证码" class="code">
        <img :src="codeSrc" alt="none" title="看不清？点击更换一张验证图片" @click="newCode">
      </div>
      <p>
        <a class="btn loginBtn" @click="login">立即登录</a>
      </p>
      <p class="btns2">
        <a class="btn guestBtn" @click="guestLogin">免费试玩</a>
        <a class="btn regBtn" @click="toReg">立即注册</a>
      </p>
      <p class="forget">
        <a @click="forget">忘记密码？</a>
      </p>
    </div>
    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>
  </div>
</template>

<script>
import { Group, XInput, Loading, TransferDom, XHeader } from "vux";
import { setTimeout } from "timers";
import { mapState, mapActions } from "vuex";
export default {
  name: "Login",
  components: { Group, XInput, Loading, XHeader },
  directives: { TransferDom },
  data() {
    return {
      username: "",
      password: "",
      loadingShow: false,
      loadingText: "加载中",
      codeSrc: "",
      source: 2,
      isShowCode: false,
      code: ""
    };
  },
  mounted() {
    setTimeout(() => {
      if(this.user.username){
					this.$router.push('/')
				}
      this.codeSrc = "/all/home_LoginOrRegister_getCode?id=2";
      if (this.baseInfo && this.baseInfo.captcha) {
        this.isShowCode = true;
      }
      if (this.isApp) {
        this.source = 3;
      } else {
        this.source = 2;
      }
    }, 1000);
  },
  methods: {
    ...mapActions(["homeLoginOrRegisterLogin"]),

    newCode() {
      this.codeSrc =
        "/all/home_LoginOrRegister_getCode?id=2&r=" +
        Math.random() * ~~new Date();
    },

    toHome() {
      this.$router.push("/home/main");
    },
    forget() {
      this.$vux.alert.show({
        title: "忘记密码？",
        content: `不用着急，请在APP首页下方选择“个人中心”，然后在页面下方点击”联系我们“找回密码`
      });
    },
    toReg() {
      this.$router.push("/reg");
    },
    guestLogin() {
      this.loadingShow = true;
      var data = {
        userName: "",
        password: "",
        regularOrguest: "guest"
      };
      this.loginApi(true, data);
    },
    login() {
      if (!this.username || !this.password) {
        this.$vux.toast.text("请输入完整信息", "center", "error");
        this.$vux.toast.show({
          text: "请输入完整信息",
          type: "cancel",
          position: "middle"
        });
        return;
      }
      this.loadingShow = true;
      var data = {
        userName: this.username,
        password: this.password,
        source: this.source,
        version:2,
        identifyCode: this.code
      };
      this.loginApi(false, data);
    },
    loginApi(isGuest, data) {
      
      let title = "登录成功";
      let content = "账号登录成功，即将跳转到首页，感谢您的使用！";
      if (isGuest) {
        title = "游客登录";
        content = "游客账号登录成功，即将跳转到首页，感谢您的关注！";
      }
      this.homeLoginOrRegisterLogin(data)
        .then(res => {
          this.loadingShow = false;
          var _this = this;
          if (!isNaN(res.captcha) && res.captcha >= 3) {
            this.isShowCode = true;
          } else {
            this.isShowCode = false;
          }
          if (res.resCode === 1000) {
            this.$vux.alert.show({
              title: title,
              content: content,
              onHide() {
                _this.$router.push("/home/main");
              }
            });
            this.$store.dispatch("userInit");
          } else {
            this.newCode();
            this.$vux.alert.show({
              title: "登录失败",
              content: `登录失败！<br>原因: ${res.msg}`
            });
          }
        })
        .catch(err => {
          this.newCode();
          this.loadingShow = false;
          this.loginError(err);
        });
    },
    loginError(err) {
      this.$vux.alert.show({
        title: "登录失败",
        content: `登录失败！请刷新页面重试，多次出现此问题请截图联系客服处理，${err}`
      });
    }
  },
  computed: {
    ...mapState(["user", "isApp", "baseInfo", "settingImages"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: #409dff;
  .header {
    background-color: #51a4fb;
  }
  .icon-con {
    position: absolute;
    top: px2rem(10px);
    right: px2rem(16px);
    i {
      font-size: px2rem(26px);
      color: #fff;
    }
  }
  .container {
    height: 100%;
    box-sizing: border-box;
    .inputBox {
      position: relative;
      text-align: center;
      width: px2rem(610px);
      margin: 0 auto;
      height: px2rem(100px);
      margin-top: px2rem(20px);
      font-size: 0;
      img {
        position: absolute;
        right: 0;
        height: px2rem(100px);
      }
      input {
        width: px2rem(610px);
        height: px2rem(100px);
        border-radius: px2rem(10px);
        outline: 0;
        border: 0;
        font-size: px2rem(26px);
        padding: 0 px2rem(85px);
        box-sizing: border-box;
      }
      i {
        position: absolute;
        left: px2rem(20px);
		top: 0;
		color: #51a4fb;
        margin: auto 0;
        width: px2rem(45px);
        height: px2rem(45px);
        bottom: 0;
        font-size: px2rem(45px);
      }
    }
    .vux-x-input-right-full img {
      vertical-align: middle;
      width: px2rem(70px);
      height: px2rem(30px);
      margin-top: px2rem(7px);
    }
    /deep/ .weui-cells {
      background: rgba(#fff, 0);
      &::before {
        border-top: none;
      }
      &::after {
        border: none;
      }
      .weui-label {
        color: #b2b2b2;
        width: px2rem(62px);
        position: relative;
        top: px2rem(2px, false);
      }
      .iconfont {
        font-size: px2rem(22px);
        position: relative;
        top: px2rem(3px);
        left: px2rem(2px, false);
      }
      .weui-input {
        background: #fafce5;
        width: 95%;
      }
    }
    .weui-cell {
      background: #ede9e6;
      border-radius: px2rem(6px);
      padding: px2rem(4px) px2rem(15px);
    }
  }
}
.logo {
  width: px2rem(390px);
  height: px2rem(120px);
  background-size: 100%;
  margin: 0 auto;
  margin-top: px2rem(70px);
  margin-bottom: px2rem(80px);
  img {
    width: 100%;
    height: 100%;
  }
}
.btn {
  display: block;
  color: #fff;
  font-weight: 400;
  border-radius: px2rem(10px);
  text-align: center;
  font-size: px2rem(30px);
}
.loginBtn {
  background: #ff9900;
  width: px2rem(610px);
  height: px2rem(100px);
  line-height: px2rem(100px);
  margin: 0 auto;
  margin-top: px2rem(50px);
}
.regBtn {
  background: #d91d37;
  width: px2rem(274px);
  height: px2rem(100px);
  line-height: px2rem(100px);
}
.guestBtn {
  background: #308cdb;
  width: px2rem(274px);
  height: px2rem(100px);
  line-height: px2rem(100px);
}
.btns2 {
  width: px2rem(610px);
  margin: 0 auto;
  margin-top: px2rem(30px);
  display: flex;
  justify-content: space-between;
}
.forget {
  clear: both;
  margin-top: px2rem(50px);
  text-align: right;
  color: #fff;
  padding-right: px2rem(70px);
  font-size: px2rem(30px);
}
</style>
