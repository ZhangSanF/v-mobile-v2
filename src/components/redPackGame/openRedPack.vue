<template>
  <div class="openRedPack" v-if="showRedPack">
    <div class="redPackModal">
      <div class="redPackModalBody">
        <div class="redPackModalHeader">
          <span class="close" @click="closeRedPackModal">
            <i class="closeIcon iconfont icon-tuichu"></i>
          </span>
        </div>
        <div class="redPackModalMain">
          <div class="redPackInfo">
            <img
              :src="userInfo.header_img"
              onerror="this.src = '/static/images/default_avatar.png'"
              alt
            />
            <p class="userName">{{userInfo.nickname}}</p>
            <div class="redPackDetail">
              <div class="notFinished" v-if="userInfo.status == 0">
                <p class="redPackDescription">{{redPackDescription}}</p>
                <p class="redPackMoneyDes">{{redPackMoneyDes}}</p>
              </div>
              <div class="finished" v-else-if="userInfo.status == 1 || userInfo.status == 2">红包已截止</div>
            </div>
          </div>
          <!-- -->
          <div class="redPackOpen" v-if="userInfo.status == 0 && userData.is_grab !=1">
            <img
              class="openImg"
              @click="openRedPack"
              :class="{'openingAni':isOpenIng}"
              src="../../assets/images/redPackGame/open.png"
              alt
            />
          </div>
        </div>
        <div class="redPackModalBot">
          <!-- 红包状态 0 为未开 1 为已抢完  2 已过期 -->
          <div class="seeRedPack" v-if="userInfo.status == 0 && userData.is_grab !=1">
            <p class="botMsg">{{getBotMsg}}</p>
            <p class="botMsgImg">
              <img src="../../assets/images/redPackGame/ic_red_packet_position.png" alt />
            </p>
          </div>
          <div class="seeRedPack" v-else-if="userInfo.status == 1 && userData.is_grab !=1" @click="seeEveryonesLuck">
            <p class="botMsg">{{getBotMsg}}</p>
            <p class="botMsgImg">
              <img src="../../assets/images/redPackGame/ic_red_packet_position.png" alt />
            </p>
          </div>
          <div class="seeRedPack" v-else-if="userInfo.status == 2 && userData.is_grab !=1" @click="seeEveryonesLuck">
            <p class="botMsg">{{getBotMsg}}</p>
            <p class="botMsgImg">
              <img src="../../assets/images/redPackGame/ic_red_packet_position.png" alt />
            </p>
          </div>
          <div class="seeRedPack" v-else-if="userData.is_grab ==1" @click="seeEveryonesLuck">
            <p class="botMsg">{{getBotMsg}}</p>
            <p class="botMsgImg">
              <img src="../../assets/images/redPackGame/ic_red_packet_position.png" alt />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vux";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Icon
  },
  watch: {},

  data() {
    return {
      setTimeFunc: null,
      redPackDescription: "",
      redPackMoneyDes: "恭喜发财，大吉大利",
      isOpenIng: false
    };
  },
  props: {
    seeEveryonesLuck: {
      // 查看大家的手气
      type: Function,
      default() {
        return () => {};
      }
    },
    showRedPack: {
      type: Boolean,
      default() {
        return false;
      }
    },
    closeRedPackModal: {
      type: Function,
      default() {
        return () => {};
      }
    },
    userInfo: {
      type: [Object],
      default() {
        return {};
      }
    },
    recordId: {
      type: [Number, String],
      default() {
        return "";
      }
    },
    userData:{
        type:[Object],
        default(){
            return{}
        }
    }
  },
  methods: {
    ...mapActions(["redPackGameGameGrab"]),

    //关闭弹窗
    onCancel() {
      this.show = false;
    },
    openRedPack() {
      this.isOpenIng = true;
      if (this.isOpenIng) {
        this.redPackGameGameGrab(this.recordId).then(res => {
          this.isOpenIng = false;
          if (res.resCode == 1000) {
            this.$emit('changeIsShow',true);
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: `请求失败！<br>原因: ${res.msg}`
            });
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters(["redPackGameBaseInfo"]),
    getBotMsg() {
      if (this.userInfo.status == 0 && this.userData.is_grab !=1) {
        return "";
      } else {
        return "查看详情";
      }
    }
  },
  watch: {
    showRedPack() {
      if (this.showRedPack) {
        let curGameInfo = {};
        this.redPackGameBaseInfo.gameInfo.forEach(item => {
          if (item.id == this.userInfo.game_id) {
            curGameInfo = item;
          }
        });
        if(this.userData.is_grab == 1){
            this.redPackDescription = "您已领取过该红包！"
            this.redPackMoneyDes = `￥${this.userData.amount}`
        }else{
        this.redPackMoneyDes = "恭喜发财，大吉大利"
            this.redPackDescription = `发了一个${curGameInfo.title}红包,金额随机`;
        }
      }
    }
  },
  mounted() {
    this.isOpenIng = false;
  }
};
</script>
<style lang="scss" scoped>
.redPackModal {
  width: px2rem(600px);
  height: px2rem(800px);
  position: absolute;
  outline: 0;
  top: 50%;
  left: 50%;
  background-color: #d95940;
  margin: px2rem(-400px) 0 0 px2rem(-300px);
  border-radius: px2rem(20px);
  .redPackModalBody {
    position: relative;
    .redPackModalHeader {
      display: flex;
      top: 0;
      position: relative;
      height: px2rem(50px);
      .close {
        position: absolute;
        right: px2rem(15px);
        top: px2rem(15px);
      }
      .closeIcon {
        color: #fff;
        font-size: px2rem(80px);
        &:hover {
          color: #eee;
        }
      }
    }
    .redPackModalMain {
      height: px2rem(598px);
      .redPackInfo {
        width: 100%;
        height: px2rem(240px);
        position: absolute;
        outline: 0;
        top: px2rem(200px);
        left: 50%;
        margin: px2rem(-120px) -50%;
        text-align: center;
        img {
          width: px2rem(120px);
          height: px2rem(120px);
        }
        .userName {
          color: rgb(248, 213, 164);
          font-size: px2rem(38px);
          font-weight: bold;
        }
        .redPackDescription {
          color: rgb(248, 213, 164);
          font-size: px2rem(30px);
          margin-top: px2rem(7px);
        }
        .redPackMoneyDes {
          color: rgb(248, 213, 164);
          font-size: px2rem(38px);
          margin-top: px2rem(16px);
          font-weight: 400;
        }
        .finished {
          color: rgb(248, 213, 164);
          font-size: px2rem(40px);
          margin-top: px2rem(40px);
          font-weight: bold;
        }
      }
      .redPackOpen {
        width: px2rem(240px);
        height: px2rem(240px);
        position: absolute;
        outline: 0;
        top: 68%;
        left: 50%;
        margin: px2rem(-120px);
        text-align: center;
        .openImg {
          width: px2rem(200px);
          height: px2rem(200px);
          &.openingAni {
            animation: openRedPackAni 1s linear both infinite;
          }
        }
        .isOpenIngImg {
          width: px2rem(200px);
          height: px2rem(200px);
          transition: all 1s ease-in-out;
          transform-style: preserve-3d;
        }
      }
    }
    .redPackModalBot {
      text-align: center;
      color: #fff;
      display: flex;
      position: relative;
      bottom: 0;
      width: 100%;
      height: px2rem(162px);
      .seeRedPack {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        width: 100%;
        font-size: px2rem(30px);
        color: #f09d7a;
        text-align: center;
        .botMsg {
          font-size: px2rem(37px);
          font-weight: bold;
          color: rgb(248, 213, 164);
        }
        .botMsgImg {
          padding: px2rem(18px) 0 px2rem(30px) 0;
          img {
            width: px2rem(38px);
          }
        }
      }
    }
  }
}

@keyframes openRedPackAni {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>