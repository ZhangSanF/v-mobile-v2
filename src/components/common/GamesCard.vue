<template>
  <div class="card">
    <div class="card-content">
      <div class="list-block media-list">
        <ul>
          <li class="item-content bg-public-bgColor">
            <div class="main">
              <div class="item-media">
                <div class="bet-img">
                  <img :src="info.pic_address">
                </div>
              </div>
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title font-main-color">{{info.name}}</div>
                  <div class="item-title-right">
                    <span @click.stop="toRule">
                      <i class="iconfont icon-wanfa"></i>玩法
                    </span>
                    <span @click.stop="toData">
                      <i class="iconfont icon-kaijiangshuju"></i>开奖数据
                    </span>
                  </div>
                </div>
                <div class="item-subtitle">
                  <open-code :code="code" :nums="info.openCode.split(',')" class="open-code"></open-code>
                </div>
                <div class="card-footer">
                  <span class="phase">当前期号：{{info.nextPhase}}</span>
                  <span class="status font-important-color">距离下期：{{time}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import OpenCode from "./openCode";
import { timeStamp, countDown, betTime } from "@/methods";
import { GAMES } from "@/config";
export default {
  name: "gamesCard",
  components: { OpenCode },
  props: ["info", "code"],
  data() {
    return {
      seconds: 0,
      time: "",
      openFlag: true //是否在投注
    };
  },
  mounted() {
    setTimeout(() => {
      this.seconds = this.info.openTime;
      setInterval(() => {
        //倒计时 时间格式化
        this.seconds = countDown(this.seconds);
        this.seconds =
          this.seconds <= 0 ? betTime(this.code).allTime : this.seconds;
        if (this.seconds - betTime(this.code).difference <= 0) {
          this.openFlag = false;
        } else {
          this.openFlag = true;
        }
        this.time = timeStamp(this.seconds);
      }, 1000);
    }, 20);
  },
  methods: {
    toData(e) {
      this.$router.push(`/data?page=History&code=${this.code}`);
    },
    toRule(e) {
      this.$router.push(`/data?page=Rules&code=${this.code}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/common.css";
.item-title {
  font-size: px2rem(30px);
  color: #333;
}

.status {
  margin-left: px2rem(30px);
}
.open-code {
  zoom: 0.9;
}
.item-content {
  padding: px2rem(20px);
  border-radius: px2rem(4px);
  font-size: px2rem(24px);
  box-sizing: border-box;
  .main {
    display: flex;
    .item-media {
      width: px2rem(96px);
      display: flex;
      justify-items: center;
      align-items: center;
      .bet-img {
        width: px2rem(96px);
        height: px2rem(96px);
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .item-inner {
      margin-left: px2rem(30px);
      flex: 1;
      .item-title {
        display: inline-block;
      }
      .item-title-row {
        height: px2rem(32px);
        line-height: px2rem(32px);
      }
      .item-title-right {
        float: right;
        font-size: px2rem(24px);
        color: #ff0000;
        i{
          color: #51a4fb;
          font-size: px2rem(30px);
        }
        span:nth-of-type(1){
          margin-right: px2rem(20px);
        }
      }
    }
  }
}
.item-subtitle {
  padding:px2rem(20px) 0;
}
.card-footer {
  box-sizing: border-box;
  font-size: px2rem(22px);
  color: #c1c1c1;
}
.iconfont {
  position: relative;
  top: px2rem(1px);
  font-size: px2rem(16px);
  margin-right: px2rem(4px);
}
.icon-qipaishi {
  font-size: px2rem(19px);
  top: px2rem(2px);
}
.vux-x-icon {
  fill: #bbb;
  position: relative;
  top: px2rem(3px);
}
</style>
