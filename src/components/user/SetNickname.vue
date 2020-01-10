<template>
  <div class="SetNickname">
    <x-header :left-options="{backText: ''}" class="header">设置昵称</x-header>
    <div class="groupBox">
      <input type="text" v-model="nickname" placeholder="请输入昵称" :disabled="user.chat_nickname.indexOf('***') ==-1 " />
      <p class="pass-notice">*昵称只能设置一次！</p>
    </div>

    <div class="btns">
      <x-button @click.native="homeUserChangeChatNicknameFunc">确认提交</x-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { XHeader, XInput, XButton, TransferDom, Divider } from "vux";
export default {
  name: "SetNickname",
  components: { XHeader, Divider, XInput, XButton },
  data() {
    return {
      nickname: ""
    };
  },
  mounted(){
    if (this.user.chat_nickname.indexOf('***') ==-1) {
      this.nickname = this.user.chat_nickname;
    }
  },
  methods: {
    ...mapActions(["homeUserChangeChatNickname", "homeIndexInit"]),

    homeUserChangeChatNicknameFunc() {
      if (this.user.chat_nickname.indexOf('***') ==-1) {
        this.$vux.alert.show({
          title: "提示",
          content: `您已修改过一次昵称！`
        });
        return;
      }
      if (!this.nickname) {
        this.$vux.alert.show({
          title: "提示",
          content: `请输入正确的昵称`
        });
        return;
      }
      this.homeUserChangeChatNickname(this.nickname).then(res => {
        if (res.resCode == 1000) {
          this.$vux.alert.show({
            title: "操作成功",
            content: `修改昵称成功`
          });
          this.homeIndexInitFunc();
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: res.msg
          });
        }
      });
    },

    homeIndexInitFunc() {
      this.homeIndexInit({ actions: "userInfo" }).then(res => {
        if (res.resCode == 1000) {
          this.$store.commit("SAVE_USER_INFO", { data: res.data.userInfo });
        }
      });
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.SetNickname {
  height: 100%;
  background-color: #f3f4f6;
  /deep/ .weui-cells {
    font-size: px2rem(14px);
  }
  .header {
    background-color: $public-header-background-color;
  }
  .tabs {
    display: flex;
    height: px2rem(88px);
    background-color: #fff;
    font-size: px2rem(30px);
    align-items: center;
    color: #999;
    div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        color: #333;
      }
    }
    i {
      height: px2rem(22px);
      width: 1px;
      background-color: #dddddd;
    }
  }
}

.groupBox {
  text-align: center;
  input {
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
  button {
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
