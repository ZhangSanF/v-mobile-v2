<template>
  <div class="ucenter bg-ucBody-bgColor">
    <div class="userinfo">
      <div class="userhead">
        <div class="info">
          <div class="avatar">
            <img class="avatar" :src="avatarImgUrl || defaultAvataUrl" alt @click="editAvatar">
            <div class="infoBox">
              <span @click="toLogin" v-if="!user.username">请登录</span>
              <span v-else>{{user.username == 'guest' ? '游客' : user.username}}</span>
              <span>余额：{{user.money || 0}}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="pay">
            <a @click="toPage('/money/pay')">
              <span class="iconcon iconcon-left">
                <i class="icon iconfont icon-Recharge_selectedl"></i>
              </span>
              <span>充值</span>
            </a>
            <a @click="getMoney">
              <span class="iconcon iconcon-right">
                <i class="icon iconfont icon-tixian_default"></i>
              </span>
              <span>提现</span>
            </a>
            <a @click="toPage('/money/bills', 0)">
              <span class="iconcon iconcon-right">
                <i class="icon iconfont icon-zhanghu_default"></i>
              </span>
              <span>账户明细</span>
            </a>
            <a @click="toPage('/money/MoneyCenter', 0)">
              <span class="iconcon iconcon-right">
                <i class="icon iconfont icon-qianbao-"></i>
              </span>
              <span>钱包中心</span>
            </a>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="record card">
          <div class="title" @click="toPage('/user/reportdate', 1)">
            <span class="iconcon iconcon-3">
              <i class="icon iconfont icon-jilu_default"></i>
            </span>
            <span class="userInfo">投注记录</span>
            <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
          </div>
          <div class="title" @click="toPage('/money/card',0)">
            <span class="iconcon iconcon-3">
<!--              <i class="icon iconfont icon-yinhangka_default"></i>-->
              <span class="iconfont icon icon-yinhangka_default">&#xe63d;</span>
            </span>

            <span class="userInfo">银行卡</span>
            <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
          </div>
          <div class="title" @click="toPage('/user/info', 1)">
            <span class="iconcon iconcon-3">
              <i class="icon iconfont icon-zhanghuxinxi_default"></i>
            </span>
            <span class="userInfo">账户信息</span>
            <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
          </div>
          <div class="title"  @click="toPage('/user/setting', 1)">
            <span class="iconcon iconcon-3">
              <i class="icon iconfont icon-shezhi_default"></i>
            </span>
            <span class="userInfo">设置</span>
            <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
          </div>
        </div>

        <div class="record card record2">
          <div class="title" @click="toPage('/user/message?type=0',1)">
            <span class="iconcon iconcon-3">
              <i class="icon iconfont icon-xiaoxi_default"></i>
            </span>
            <span class="userInfo">我的消息</span>
            <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
          </div>
          <div class="title" @click="toPage('/user/message?type=1', 1)">
            <span class="iconcon iconcon-3">
              <i class="icon iconfont icon-bangzhu_default"></i>
            </span>
            <span class="userInfo">平台公告</span>
            <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
          </div>
          <div class="title" @click="toOnlineSupport">
            <span class="iconcon iconcon-3">
              <i class="icon iconfont icon-lianxi_default"></i>
            </span>
            <span class="userInfo">联系我们</span>
            <x-icon type="ios-arrow-right" class="arrow-right"></x-icon>
          </div>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>
    <input
      id="imgUploadInput"
      ref="imginput"
      type="file"
      @change="imgChanged"
      accept=".jpg, .png, .gif, .jpeg, image/jpeg, image/png, image/gif"
      style="display: none;"
    >
  </div>
</template>

<script>
// import {APP_INFO} from '@/config'
import { Flexbox, FlexboxItem, Loading, TransferDom } from "vux";
import { mapState, mapActions, mapGetters } from "vuex";
import { resolve } from "path";

export default {
  name: "ucenter",
  directives: { TransferDom },
  components: {
    Flexbox,
    FlexboxItem,
    Loading
  },
  data() {
    return {
      AppInfo: {},
      loadingShow: false,
      loadingText: "加载中",
      avadaUrl: "",
      avatarImgUrl: "",
      defaultAvataUrl: require("../assets/images/chat/default_avatar.png")
    };
  },
  mounted() {
    setTimeout(() => {
      this.$emit("tabsChange", "ucenter");
      if (this.user.chat_headerimg == "") {
        this.avatarImgUrl = require("../assets/images/userhead.png");
      } else {
        this.avatarImgUrl = this.user.chat_headerimg;
      }
    }, 20);
  },
  methods: {
    ...mapActions(["homeIndexInit", "homeUserUploadChatHeaderImg"]),

    toLogin() {
      this.$router.push("/login");
    },

    userName(name) {
      return name == 'guest' ? '游客' : name;
    },

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

    getMoney() {
      if (!this.user || this.user.agmem != 1) {
        this.$vux.alert.show({
          title: "提示",
          content: `请登录为正式用户!`
        });
        return;
      }
      this.loadingShow = true;
      this.homeIndexInit({ actions: "bankInfo" })
        .then(res => {
          this.loadingShow = false;
          if (res.resCode == 1000) {
            var bankInfo = res.data.bankInfo; //银行卡信息
            bankInfo && this.$store.commit("SAVE_USER_BANKCARD_INFO", bankInfo);
            if (bankInfo.bankcard) {
              //已经绑定了银行卡
              this.$router.push("/money/draw");
            } else {
              this.$router.push("/money/addcard");
            }
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: `账户信息获取失败，请刷新重试！${res.msg}`
            });
          }
        })
        .catch(err => {
          this.loadingShow = false;
          this.$vux.alert.show({
            title: "提示",
            content: `账户信息获取失败，请刷新重试！${err}`
          });
        });
    },
    imgChanged(e) {
      var t = this,
        n = e.target.files[0];
      if (/\.(jpe?g|png|gif)$/i.test(n.name)) {
        var i = new FileReader();
        i.addEventListener(
          "load",
          function(e) {
            var i = new Image();
            (i.title = n.name), (i.src = e.target.result), (t.imgUrl = i.src);
            t.avadaUrl = i.src;
            console.log(t.avadaUrl);
            t.changeAvatar(t.avadaUrl);
          },
          !1
        ),
          i.readAsDataURL(n);
      }
    },
    editAvatar() {
      if (!this.user || this.user.agmem != 1) {
        this.$vux.alert.show({
          title: "提示",
          content: `请登录为正式用户!`
        });
        return;
      }
      this.$refs.imginput.click();
    },
    changeAvatar(e) {
      this.loadingShow = true;
      let img = this.dataURItoBlob(this.avadaUrl);
      if (img.size > 1024 * 1024) {
        this.$vux.alert.show({
          title: "提示",
          content: `请不要上传超过2M的图片！${img.size}B`
        });
        this.loadingShow = false;
        return;
      }
      let param = new FormData(); //创建form对象
      param.append("file", img, "image.png"); //通过append向form对象添加数据
      param.append("chunk", "0"); //添加form表单中其他数据
      this.homeUserUploadChatHeaderImg(param)
        .then(res => {
          this.loadingShow = false;
          if (res.resCode === 1000) {
            this.$vux.alert.show({
              title: "提示",
              content: `头像修改成功！`
            });
            this.avatarImgUrl = res.data;
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: `头像修改失败！${res.msg}`
            });
          }
        })
        .catch(err => {
          this.loadingShow = false;
          this.$vux.alert.show({
            title: "提示",
            content: `头像修改失败！${err}`
          });
        });
    },
    dataURItoBlob(dataURI) {
      debugger
      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
    toOnlineSupport() {
      window.location.href = this.outLink.customer_service;
    }
  },
  computed: {
    ...mapState(["user", "outLink"]),
    ...mapGetters(["baseInfo"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ucenter {
  position: absolute;
  top: 0;
  bottom: px2rem(110px);
  left: 0;
  height: 100%;
  right: 0;
  overflow: auto;
  background-color: #ededed;
  /*.iconfont {*/
  /*  font-size: px2rem(24px);*/
  /*}*/
}
.userhead {
  height: px2rem(310px);
  padding: px2rem(20px);
  background: #51a4fb;
  box-sizing: border-box;
  .info {
    position: relative;
    z-index: 2;
    display: flex;
    box-pack: justify;
    justify-content: space-between;
    .avatar {
      position: relative;
      top: px2rem(10px);
      display: flex;
      box-align: center;
      align-items: center;
      img {
        display: block;
        width: px2rem(125px);
        height: px2rem(125px);
        border-radius: 50%;
        margin-right: px2rem(16px);
        border: 2px solid #fff;
      }
      .infoBox {
        margin-left: px2rem(20px);
        height: px2rem(125px);
        display: flex;
        flex-direction: column;
        justify-items: center;
        span {
          &:nth-of-type(1) {
            color: #fff;
            font-size: px2rem(34px);
          }
          &:nth-of-type(2) {
            margin-top: px2rem(10px);
            font-size: px2rem(30px);
            padding: 0 5px;
            display: block;
            height: px2rem(48px);
            line-height: px2rem(48px);
            background-color: #fff000;
            color: #000;
            border-radius: 3px;
            text-align: center;
          }
        }
      }
    }
    .setting {
      height: px2rem(36px);
      width: px2rem(68px);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      .server,
      .option {
        .icon {
          font-size: px2rem(24px);
          color: #fff;
          font-weight: 400;
        }
      }
    }
  }

  .card {
    background-color: #fff;
    margin-top: px2rem(68px);
    position: relative;
    height: px2rem(182px);
    z-index: 11;
    border-radius: px2rem(10px);
    overflow: hidden;
    padding: 0 px2rem(20px);
    color: #333333;
    .balance {
      padding: px2rem(10px) 0;
      display: flex;
      position: relative;
      font-size: px2rem(16px);
      border-bottom: 1px solid #e3e3e3;
      div {
        flex: 1;
        text-align: center;
        &:nth-last-of-type(1) {
          border-left: 1px solid #e3e3e3;
        }
        p {
          font-weight: 600;
          font-size: px2rem(16px);
        }
        span {
          font-size: px2rem(13px);
          color: #555;
        }
      }
    }
    .pay {
      padding: px2rem(10px) 0;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        line-height: px2rem(40px);
        text-align: center;
        font-size: px2rem(26px);
        .iconcon {
          width: px2rem(82px);
          height: px2rem(82px);
          line-height: px2rem(82px);
          background-color: #e9f3ff;
          border-radius: 50%;
          display: block;
          i {
            font-size: px2rem(48px);
            color: #51a4fb;
          }

        }
      }
    }
  }
}

.content {
  width: 98%;
  margin-left: 1%;
  margin-top: px2rem(110px);
  margin-bottom: px2rem(110px);
  .iconcon {
    width: px2rem(26px);
    height: px2rem(26px);
    line-height: px2rem(26px);
    border-radius: 50%;
    display: inline-block;
    margin-right: px2rem(6px);
    color: #fff;
    text-align: center;
  }
  .record2 {
    margin-top: px2rem(20px);
  }
  .record {
    background-color: #fff;
    border-radius: px2rem(10px);
    position: relative;
    padding: 0 px2rem(30px);
    box-sizing: border-box;

    .arrow-right {
      position: absolute;
      right: 0;
      fill: #cccccc;
      float: right;
      font-size: px2rem(30px);
      width: px2rem(30px);
      height: px2rem(30px);
    }
    .title {
      font-size: px2rem(28px);
      height: px2rem(100px);
      display: flex;
      align-items: center;
      color: #010101;
      border-bottom: 1px solid #eaeceb;
      position: relative;
      .iconcon {
        color: #51a4fb;
        margin-right: px2rem(30px);
        i{
          font-size: px2rem(38px);
        }
        .icon-yinhangka_default {
            zoom: 1.2;
            color: #51a4fb;
          }
      }
    }
  }
}

.userhead .username {
  padding: 0 0 px2rem(10px) 0;
  margin: 0;
  color: #fff;
  font-size: px2rem(22px);
  border-radius: px2rem(10px);
  overflow: hidden;
  padding: 0 px2rem(20px);
}

.change {
  margin: px2rem(4px);
}

.col-33 {
  text-align: center;
  background: darkkhaki;
  color: #fff;
  border: 2px solid #fff;
  padding: px2rem(6px) 0;
  font-size: px2rem(24px);
}

.click {
  font-size: px2rem(24px);
}
</style>
