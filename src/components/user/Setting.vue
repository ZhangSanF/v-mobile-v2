<template>
  <div class="pay">
    <x-header :left-options="{backText: ''}" class="header">系统设置</x-header>
    <div class="container">
      <div class="chaangePassword">
        <div class="title" @click="toPage('/user/Password?type=login', 1)">
          <span class="iconcon iconcon-3">
            <i class="icon iconfont icon-denglumima"></i>
          </span>
          <span class="userInfo">修改登录密码</span>
          <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
        </div>
        <div class="title" @click="toPage('/user/Password?type=draw', 1)">
          <span class="iconcon iconcon-3">
            <i class="icon iconfont icon-denglumima"></i>
          </span>
          <span class="userInfo">修改取款密码</span>
          <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
        </div>
      </div>
      <div class="seting">
        <div class="title" @click="clearStorage">
          <span class="iconcon iconcon-3">
            <i class="icon iconfont icon-qingchuhuancun"></i>
          </span>
          <span class="userInfo">清除缓存</span>
          <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
        </div>
        <div class="title" @click="reLoad">
          <span class="iconcon iconcon-3">
            <i class="icon iconfont icon-qiangzhishuaxin"></i>
          </span>
          <span class="userInfo">强制刷新</span>
          <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
        </div>
        <div class="title" @click="toAppDownload">
          <span class="iconcon iconcon-3">
            <i class="icon iconfont icon-APPxiazai"></i>
          </span>
          <span class="userInfo">APP下载</span>
          <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
        </div>
        <div class="title" @click="logout">
          <span class="iconcon iconcon-3">
            <i class="icon iconfont icon-tuichu"></i>
          </span>
          <span class="userInfo">退出</span>
          <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from "vuex";
  import {XHeader, Grid, GridItem} from "vux";

  export default {
    name: "Setting",
    components: {XHeader, Grid, GridItem},
    methods: {
      ...mapActions(["homeLoginOrRegisterLogOff"]),

      toPage(e, a) {
        if (!a && (!this.user || this.user.agmem != 1)) {
          this.$vux.alert.show({
            title: "提示",
            content: `请登录为正式用户!`
          });
          return;
        }
        this.$router.push(e);
      },

      clearStorage() {
        localStorage.clear();
        this.$router.push('/home/main');
        window.location.reload(true);
      },
      reLoad() {
        this.$router.push('/home/main');
        window.location.reload(true);
      },
      logout() {
        var _this = this;
        this.$vux.confirm.show({
          title: "退出登录",
          content: "确定要退出吗？",
          onCancel() {
            _this.$vux.toast.show({
              text: "已取消",
              type: "cancel"
            });
          },
          onConfirm() {
            _this.homeLoginOrRegisterLogOff().then(res => {
              if (res.resCode === 1000) {
                _this.$store.commit("SAVE_USER_INFO", {data: {}});
                _this.$vux.toast.show({
                  text: "您已退出当前登录！",
                  type: "success"
                });
                _this.$router.push("/home/main");
              } else {
                _this.$vux.alert.show({
                  title: "操作失败",
                  content: `操作失败！请刷新页面重试或者联系客服处理！${
                    res.msg
                    },${res.resCode}`
                });
              }
            });
          }
        });
      },
      toAppDownload() {
        window.location.href = this.outLink.app_download_url;
      }
    },
    computed: {
      ...mapState(["user", "outLink"])
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .pay {
    background: #ededed;
    height: 100%;
    text-align: center;

    .header {
      background-color: #51a4fb;
    }
  }

  .seting {
    margin-top: px2rem(20px);
  }

  .title {
    background-color: #fff;
    padding: 0 px2rem(50px);
    font-size: px2rem(28px);
    height: px2rem(100px);
    display: flex;
    align-items: center;
    color: #333;
    border-bottom: 1px solid #eaeceb;
    position: relative;

    .iconcon {
      color: #333;
      margin-right: px2rem(30px);

      i {
        font-size: px2rem(56px);
      }
    }

    .arrow-right {
      position: absolute;
      right: px2rem(50px);
      fill: #cfcfcf;
      float: right;
    }
  }
</style>
