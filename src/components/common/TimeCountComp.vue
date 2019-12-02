<template>
  <div class="time-count-comp">
    <p>{{item.name}}</p>
    <p>{{time}}</p>
  </div>
</template>

<script>
  import OpenCode from "./openCode";
  import {timeStamp, countDown, betTime} from "@/methods";
  import {GAMES} from "@/config";

  export default {
    name: "TimeCountComp",
    props: ["item", 'code'],
    data() {
      return {
        seconds: 0,
        time: "",
        openFlag: true //是否在投注
      };
    },
    mounted() {
      setTimeout(() => {
        this.seconds = this.item.openTime;
        setInterval(() => {
          //倒计时 时间格式化
          this.seconds = countDown(this.seconds);
          this.seconds =
            this.seconds <= 0 ? betTime(this.code).allTime : this.seconds;
          this.time = timeStamp(this.seconds);
          if (!this.seconds || this.seconds <= 0) {
            this.time = '封盘中'
          }
        }, 1000);
      }, 20);
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../assets/css/common.css";
  .time-count-comp{
    width: 95%;
    height: px2rem(90px);
    line-height: px2rem(38px);
    font-size: px2rem(24px);
    padding: px2rem(8px) 0;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: px2rem(8px);

  }
  p:nth-of-type(1) {
    font-weight: 600;
  }
  p:nth-of-type(2) {
    font-size: px2rem(20px);
  }
</style>
