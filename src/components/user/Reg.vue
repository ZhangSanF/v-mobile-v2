<template>
  <div class="reg">
    <scroll class="wrapper">
      <div class="content">
        <x-header :left-options="{backText: ''}" class="header">注册</x-header>

        <div class="container">
          <div class="logo">
            <img v-if="settingImages" :src="settingImages.new_logo" alt />
          </div>
          <div class="inputWarp">
            <div class="inputBox">
              <i class="icon iconfont icon-yonghuming"></i>
              <input title="用户名：" :max="20" v-model="username" placeholder="请输入用户名" />
            </div>
            <div class="inputBox">
              <i class="icon iconfont icon-mima"></i>
              <input
                title="密码："
                type="password"
                placeholder="请输入密码"
                v-model="password"
                min="6"
                max="16"
              />
            </div>
            <div class="inputBox">
              <i class="icon iconfont icon-mima"></i>
              <input title="确认密码：" v-model="password2" type="password" placeholder="请再次输入密码" />
            </div>
            <div class="inputBox" v-if="baseInfo && baseInfo.register_need_truename == 1">
              <i class="icon iconfont icon-zhenshixingming"></i>
              <input title="真实姓名：" v-model="chinaName" name="username" placeholder="请输入与提款银行卡相同真实姓名" />
            </div>
            <div class="inputBox" v-if="baseInfo && baseInfo.register_need_phone == 1">
              <i class="icon iconfont icon-shouji"></i>
              <input
                title="手机号："
                v-model="phone"
                :max="13"
                is-type="china-mobile"
                placeholder="请输入手机号"
              />
            </div>
            <div class="inputBox" v-show="baseInfo.isAgent && !promocode">
              <i class="icon iconfont icon-yaoqingma"></i>
              <input title="邀请码：" v-model="promocodeVal" name="promocode" placeholder="请输入邀请码" />
            </div>
            <div class="inputBox" v-if="baseInfo && baseInfo.register_need_email == 1">
              <i class="icon iconfont icon-youxiangdizhi"></i>
              <input title="邮箱：" v-model="email" name="email" placeholder="请输入邮箱地址" is-type="email" />
            </div>
            <div
              class="inputBox borderBottom"
              v-if="baseInfo && baseInfo.register_need_atmkey == 1"
            >
              <i class="icon iconfont icon-mima"></i>
              <select v-model="atmPassword1">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
              <select v-model="atmPassword2">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
              <select v-model="atmPassword3">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
              <select v-model="atmPassword4">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
              <label>取款密码</label>
            </div>
            <div class="inputBox">
              <i class="icon iconfont icon-yanzhengma"></i>
              <input title="验证码：" v-model="code" placeholder="请输入验证码" class="code" />
              <img
                slot="right-full-height"
                :src="codeSrc"
                alt="none"
                title="看不清？点击更换一张验证图片"
                @click="newCode"
              />
            </div>
          </div>
          <p class="btn">
            <a @click="reg">注 册</a>
          </p>
        </div>
      </div>
    </scroll>

    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>
  </div>
</template>

<script>
import { Group, XHeader, XInput, Loading, TransferDom } from "vux";
import { setTimeout } from "timers";
import { mapState, mapGetters, mapActions } from "vuex";
import scroll from "@/components/common/scroll";
export default {
  name: "Reg",
  components: {
    Group,
    XInput,
    XHeader,
    Loading,
    scroll
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      username: "",
      phone: "",
      code: "",
      password: "",
      password2: "",
      chinaName: "",
      email: "",
      codeSrc: "",
      loadingShow: false,
      loadingText: "加载中",
      promocodeVal: "",
      atmPassword1: '0',
      atmPassword2: '0',
      atmPassword3: '0',
      atmPassword4: '0'
    };
  },
  methods: {
    ...mapActions(["homeLoginOrRegisterRegister", "getPromoteScript"]),

    toHome() {
      this.$router.push("/home/main");
    },
    back() {
      this.$router.go(-1);
    },
    newCode() {
      this.codeSrc = "";
      setTimeout(() => {
        this.codeSrc = "/all/home_LoginOrRegister_getCode?r=" + Math.random();
      }, 500);
    },
    reg() {
      if (!this.username || !this.password || !this.password2 || !this.code) {
        this.$vux.toast.text("请输入完整信息", "center", "error");
        this.$vux.toast.show({
          text: "请输入完整信息",
          type: "cancel",
          position: "middle"
        });
        return;
      }
      let temp_atmPassword ='';
      if (this.baseInfo && this.baseInfo.register_need_atmkey == 1) {
        if (
          this.atmPassword1 == this.atmPassword2 &&
          this.atmPassword2 == this.atmPassword3 &&
          this.atmPassword3 == this.atmPassword4
        ) {
          this.$vux.toast.text("取款密码不能都为同样的数字", "center", "error");
          this.$vux.toast.show({
            text: "取款密码不能都为同样的数字",
            type: "cancel",
            position: "middle"
          });
          return;
        }
         temp_atmPassword =
        this.atmPassword1 +
        this.atmPassword2 +
        this.atmPassword3 +
        this.atmPassword4;
      }
      this.loadingShow = true;
      
      var data = {
        userName: this.username,
        password: this.password,
        rePassword: this.password2,
        email: this.email,
        phone: this.phone,
        trueName: this.chinaName,
        identifyCode: this.code,
        atmPassword:temp_atmPassword || ''
      };
      if (this.promocode) {
        data["promocode"] = this.promocode;
      }
      if (this.promocodeVal) {
        data["promocode"] = this.promocodeVal;
      }
      this.homeLoginOrRegisterRegister(data)
        .then(res => {
          this.loadingShow = false;
          var _this = this;
          if (res.resCode === 1000) {
            setTimeout(() => {
              _this.$router.push("/home/main");
            }, 5000);
            this.$vux.alert.show({
              title: "注册成功",
              content: `账号注册成功，即将跳转到首页，感谢您的使用！`,
              onHide() {
                _this.$router.push("/home/main");
              }
            });
            this.$store.dispatch("userInit");
          } else {
            this.$vux.alert.show({
              title: "注册失败",
              content: `注册失败！<br>原因: ${res.msg},请刷新页面重试!`
            });
            this.newCode();
          }
        })
        .catch(err => {
          this.loadingShow = false;
          this.$vux.alert.show({
            title: "注册失败",
            content: `注册失败！请刷新页面重试，多次出现此问题请截图联系客服处理，${err}`
          });
          this.newCode();
        });
    },
    countPromoteData() {
      //加载代理注册统计代码
      this.getPromoteScript().then(res => {
        if (res.resCode === 1000) {
          var hmt = hmt || [];
          var hm = document.createElement("script");
          hm.src = res.data.promote_script;
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        }
        this.newCode();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      //代理注册统计代码 (nb500w)
      if (this.promocode) {
        this.countPromoteData();
      } else {
        //获取验证码
        this.newCode();
      }
    }, 20);
  },
  computed: {
    ...mapState(["promocode", "ptName", "settingImages"]),
    ...mapGetters(["baseInfo"])
  },
  watch: {
    promocode: function() {
      this.promocodeVal = this.promocode;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.reg {
  height: 100%;
  font-size: px2rem(16px);
  background: #409dff;
}

.header {
  background-color: #51a4fb;
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

.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.btn {
  text-align: center;

  a {
    width: 100%;
    height: px2rem(100px);
    line-height: px2rem(100px);
    display: block;
    background: #ff9900;
    font-size: px2rem(30px);
    border-radius: px2rem(10px);
    margin-top: px2rem(50px);
    color: #fff;
  }
}

.container {
  border-radius: px2rem(10px);
  width: px2rem(610px);
  margin: 0 auto;

  .inputWarp {
    background-color: #fff;
    border-radius: px2rem(10px);
    overflow: hidden;
  }
  .inputBox {
    position: relative;
    text-align: center;
    width: px2rem(610px);
    margin: 0 auto;
    height: px2rem(100px);
    font-size: 0;
    &.borderBottom {
      border-bottom: 1px solid #ddd;
      padding-left: px2rem(25px);
      label{
        font-size: 12px;
        color: #555;
      }
    }
    img {
      position: absolute;
      right: 0;
      height: px2rem(100px);
    }
    select {
      width: px2rem(80px);
      height: px2rem(100px);
      margin: 0 px2rem(10px);
      border-top: 0;
      border-bottom: 0;
      border-color: #ddd;
    }
    input {
      width: px2rem(610px);
      height: px2rem(100px);
      outline: 0;
      border: 0;
      border-bottom: 1px solid #ddd;
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
}
</style>
