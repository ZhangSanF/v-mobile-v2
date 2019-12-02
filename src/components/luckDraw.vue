<template>
  <div class="luckDraw">
    <div class="back" @click="backHome">
      <i class></i>
      <span>返回</span>
    </div>
    <div class="luckBox">
      <img src="../assets/images/tl.png" class="tl tree ani" alt>
      <img src="../assets/images/tr.png" class="tr tree ani" alt>
      <img src="../assets/images/luckTitle.png" class="luckTitle" alt>
      <div class="cardPop" v-if="winPrizeList.length>0">
        <transition name="fadeY">
          <span
            class="topTips"
            v-show="rollingTxtIsShow"
          >恭喜：<i>{{rollingTxt.name}}</i>&nbsp;&nbsp;获得：<i>{{rollingTxt.info}}</i></span>
        </transition>
      </div>
      <div class="rotateBox">
        <div
          class="prizeImg"
          :class="{'ani':isClearAni}"
          :style="{'transform':'rotate('+rotateVal+'deg)'}"
        ></div>
        <div class="printer" @click="statrLuckDraw"></div>
      </div>
      <div class="prizeList">
        <ul>
          <li v-for="(item,index) in prizeInfo" :key="index">
            <label>{{item.cn_name}}：</label>
            <span>{{item.amount}}</span>
          </li>
        </ul>
        <div class="tips">
          <h4>活动时间：</h4>
          <p>{{activeTime}}</p>
          <h4>活动规则：</h4>
          <p v-if="ruleTxt.length > 20"><marquee>{{ruleTxt}}</marquee></p>
          <p v-else>{{ruleTxt}}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions,mapState } from "vuex";
import { XHeader, TransferDomDirective as TransferDom } from "vux";
import { setTimeout } from "timers";

export default {
  name: "luckDraw",
  data() {
    return {
      rotateVal: 0,
      randomCount: 10,
      isCancel: false,
      isClearAni: false,
      prizeInfo: [],
      activeTime: "",
      winPrizeList: [],
      rollingTxtIsShow: false,
      rollingTxt: "",
      ruleTxt:""
    };
  },
  directives: {
    TransferDom
  },
  components: {
    XHeader
  },
 computed: {
    ...mapState(["user"])
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.user || this.user.agmem != 1) {
        this.$router.push("/");
      }
      
      this.withOutCheckBigWheel().then(res => {
        if (res.resCode === 1000) {
          this.prizeInfo = res.data;
          this.activeTime = res.date;
          this.ruleTxt = res.rule;
          this.winPrizeList = res.winInfo || [] ;
          this.loopRollingTxt();
        } else {
          this.$vux.alert.show({
            title: "获取数据失败",
            content: `获取数据失败,请重试或者联系客服处理![${res.msg}]`
          });
        }
      });
    });
  },

  methods: {
    ...mapActions(["turntableBigWheel", "withOutCheckBigWheel"]),

    //轮播文案
    loopRollingTxt() {
      if(this.winPrizeList.length<=0) return;
      var i = 0;
      this.rollingTxt = this.winPrizeList[i];
      var _run = () => {
        this.rollingTxtIsShow = true;
        setTimeout(() => {
          i++;
          if (i >= this.winPrizeList.length) {
            i = 0;
          }
          this.rollingTxt = this.winPrizeList[i];
          setTimeout(() => {
            this.rollingTxtIsShow = false;
          }, 1700);
          _run();
        }, 2000);
      };
      _run();
    },

    backHome() {
      this.$router.go(-1);
    },

    statrLuckDraw() {
      if (this.isCancel) return;
      this.isCancel = true;
      this.$vux.loading.show({
        text: ""
      });
      this.turntableBigWheel().then(res => {
        if (res.resCode === 1000) {
          this.$vux.loading.hide();
          let num = parseInt(res.data.id) - 1;
          let prizeName = res.data.name;
          this.statrRoteta(num,prizeName);
        } else {
          this.$vux.loading.hide();
          if (res.resCode == 1012) {
            this.$vux.alert.show({
              title: "抽奖次数不足",
              content: res.msg
            });
          } else {
            this.$vux.alert.show({
              title: "获取数据失败",
              content: `获取数据失败,请重试或者联系客服处理![${res.msg}]`
            });
          }

          this.isCancel = false;
          this.isClearAni = false;
        }
      });
    },

    statrRoteta(num,prizeName) {
      this.isClearAni = true;
      this.rotateVal = -(num * 45) + 3600;
      setTimeout(() => {
        this.isCancel = false;
        this.isClearAni = false;
        this.rotateVal = -(num * 45);
        if (prizeName != '谢谢') {
          this.$vux.alert.show({
            title: "温馨提示",
            content: `恭喜你获得:${prizeName}`
          });
        } else {
          this.$vux.alert.show({
            title: "温馨提示",
            content: `与大奖擦肩而过`
          });
        }
      }, 5000);
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~vux/src/styles/close";
</style>

<style scoped lang="scss">
.luckDraw {
  height: 100%;
  background-image: url("../assets/images/luckBg.jpg");
  background-size: 100% 100%;
  .back {
    position: absolute;
    left: px2rem(50px);
    top: px2rem(50px);
    font-size: px2rem(28px);
    color: #fff;
    i {
      display: inline-block;
      width: px2rem(20px);
      height: px2rem(20px);
      border-left: 1px solid #fff;
      border-top: 1px solid #fff;
      transform: rotate(-45deg);
    }
    span {
      margin-left: px2rem(5px, false);
    }
  }
  .header {
    background-color: transparent;
    .vux-header-back {
      color: #fff !important;
    }
  }
  .luckBox {
    width: 100%;
    height: 100%;
    padding-top: px2rem(20px);
    text-align: center;
    .tree {
      position: absolute;
      width: px2rem(82px);
      height: px2rem(170px);
      top: px2rem(160px);

      &.tl {
        right: 0;
        transform-origin: bottom right;
        &.ani {
          animation: treeAni1 3s linear both infinite;
        }
      }
      &.tr {
        left: 0;
        transform-origin: bottom left;
        &.ani {
          animation: treeAni2 3s linear both infinite;
        }
      }
    }
    .luckTitle {
      margin: 0 auto;
      width: px2rem(440px);
      height: px2rem(260px);
    }
    .rotateBox {
      position: relative;
      margin: 0 auto;
      width: px2rem(400px);
      height: px2rem(400px);
      text-align: center;
      .prizeImg {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        background-image: url("../assets/images/rotate.png");
        background-repeat: no-repeat;
        &.ani {
          transition: all 5s cubic-bezier(0.9, 0.02, 0.24, 0.97);
        }
      }
      .printer {
        position: absolute;
        left: 0;
        right: 0;
        top: px2rem(-40px, true);
        bottom: 0;
        margin: auto;
        width: px2rem(146px);
        height: px2rem(208px);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("../assets/images/pointer.png");
      }
    }
    .prizeList {
      border-radius: 8px;
      font-size: px2rem(24px);
      padding: px2rem(20px) px2rem(80px);
      box-sizing: border-box;
      margin: 15px auto;
      width: px2rem(700px);
      height: px2rem(580px);
      text-align: left;
      background-size: 100% 100%;
      background-image: url("../assets/images/prizeListBg.png");
      ul {
        list-style: none;
        margin-top: px2rem(40px);
        color: #333;
        label {
          width: px2rem(260px);
          display: inline-block;
          text-align: right;
        }
        span {
          color: #f50a0a;
          font-weight: bold;
        }
      }
      .tips {
        margin-top: px2rem(10px);
        font-size: px2rem(24px);
        line-height: px2rem(50px);
        color: #333;
      }
    }
  }
}
.cardPop {
  width: px2rem(400px);
  height: px2rem(40px);
  line-height: px2rem(44px);
  position: relative;
  top: px2rem(30px, false);
  overflow: hidden;
  margin: 0 auto;
  font-size: 12px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  .topTips {
    width: 100%;
    text-align: center;
    display: block;
    i{
      color: red;
      font-style: normal;
    }
  }
}
@keyframes treeAni1 {
  50% {
    transform: rotate(6deg);
  }
}

@keyframes treeAni2 {
  50% {
    transform: rotate(-6deg);
  }
}

.fadeY-enter-active {
  animation: Y50 ease 0.3s;
}
.fadeY-leave-active {
  animation: Y-50 0.3s reverse;
}
@keyframes Y-50 {
  0% {
    transform: translateY(-25px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes Y50 {
  0% {
    transform: translateY(25px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
