<template>
  <div
    style="border-width:1px"
    class="gameCardSmall bg-public-bgColor"
    :class="count%2===0 ? 'left' : 'right'"
    :data-index="index"
  >
    <div class="gameCard">
      <div class="logo">
        <img v-if="index == 'kyqp'" src="/static/images/codeimgs/g-kyqp.png">
        <img v-else :src="game.pic_address">
      </div>
      <div v-if="index != 'kyqp'" class="content">
        <p class="title font-main-color">
          {{game.name}}
          <img
            class="icon"
            v-if="game.icon == '3'"
            :src="require(`../../assets/images/75s.png`)"
          >
          <img
            class="icon"
            v-if="game.icon == '2'"
            :src="require(`../../assets/images/mhot.png`)"
          >
          <img
            class="icon"
            v-if="game.icon == '1'"
            :src="require(`../../assets/images/new.png`)"
          >
          <img
            class="today"
            v-if="game.icon == '4'"
            :src="require(`../../assets/images/today.png`)"
          >
          <img
            class="icon"
            v-if="!openFlag"
            :src="require(`../../assets/images/stop.png`)"
          >
        </p>
        <p class="timeText">每{{codeTimeStamp(game.code_time, index)}}开奖</p>
        <!-- <p class="timeName font-light-color">距离封盘:</p> -->
      </div>
      <div v-else class="content">
        <p class="timeName font-light-color">棋牌游戏</p>
        <p class="timeText">热门棋牌游戏</p>
      </div>
    </div>
  </div>
</template>

<script>
import OpenCode from "./openCode";
import { timeStamp, countDown, betTime, codeTimeStamp } from "@/methods";
import { GAMES } from "@/config";
export default {
  name: "gamesCardSmall",
  components: { OpenCode },
  props: ["game", "index", "count"],
  data() {
    return {
      seconds: 0,
      time: "",
      bet_info: {},
      openFlag: true //是否在投注
    };
  },
  created() {
    this.codeTimeStamp = codeTimeStamp;
  },
  mounted() {
    setTimeout(() => {
      if (this.index == "kyqp") {
        return;
      }
      this.seconds = this.game.openTime;

      setInterval(() => {
        //倒计时 时间格式化
        this.seconds = countDown(this.seconds);
        this.seconds =
          this.seconds <= 0 ? betTime(this.index).allTime : this.seconds;
        if (this.seconds - betTime(this.index).difference <= 0) {
          this.openFlag = false;
        } else {
          this.openFlag = true;
        }
        this.time = timeStamp(this.seconds, 1);
      }, 1000);
    }, 20);
  },
  methods: {
    // toGame(game) {
    //   //进入游戏投注页
    //   console.log(game);
    //   if (game == "kyqp") {
    //     this.$router.push(`/qipai`);
    //   } else {
    //     this.$store.commit("CHANGE_CODE", game);
    //     var p = GAMES[game].play[0];
    //     let t = GAMES[game].count[p].lt;
    //     this.$router.push(`/lottery/${game}/${t}`);
    //   }
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/css/common.css";

.gameCardSmall {
  width: 33.33%;
  height: px2rem(218px);
  touch-action: none;
  box-sizing: border-box;
  position: relative;
  z-index: 15;
  padding: px2rem(16px) px2rem(13px);
  box-sizing: border-box;
  text-align: center;
  border-bottom: 1px solid #e2e2e2;
  &:nth-of-type(1n - 2) {
    border-right: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
  }
  .gameCard {
    pointer-events: none;
    touch-action: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
      touch-action: none;
      width: 100%;
      margin: px2rem(8px) px2rem(6px) 0 0;
      vertical-align: middle;
      font-size: 0;
      padding-bottom: px2rem(10px);
      img {
        touch-action: none;
        width: px2rem(110px);
        height: px2rem(110px);
      }
    }
    .content {
      font-size: px2rem(24px);
      flex: 1;
      .icon{
        position: absolute;
        top: px2rem(8px);
        right: px2rem(8px);
        width: px2rem(70px);
        /*height: px2rem(28px);*/
      }
      .today{
        position: absolute;
        top: 0;
        left: px2rem(12px);
        width: px2rem(40px);
      }
      .title {
        font-weight: 400;
        font-size: px2rem(24px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #555;
      }
      .timeName {
        font-size: px2rem(24px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time {
        font-size: px2rem(24px);
      }
    }
  }
}
  .timeText {
    font-size: px2rem(20px);
    color: #999;
  }
</style>
