<template>
  <div class="BetCTSSCDW">
    <div v-if="gameData && gameData.bplay">
      <div v-for="(item, index) of locationArrayList" :key="index" class="col">
        <h2>
          {{item.name}}
          <b
            @click="autoSelectBall(item,'5')"
            :class="{'active':curAutoSelectList[item.play] == '5'}"
          >清</b>
          <b
            @click="autoSelectBall(item,'4')"
            :class="{'active':curAutoSelectList[item.play] == '4'}"
          >偶</b>
          <b
            @click="autoSelectBall(item,'3')"
            :class="{'active':curAutoSelectList[item.play] == '3'}"
          >奇</b>
          <b
            @click="autoSelectBall(item,'2')"
            :class="{'active':curAutoSelectList[item.play] == '2'}"
          >小</b>
          <b
            @click="autoSelectBall(item,'1')"
            :class="{'active':curAutoSelectList[item.play] == '1'}"
          >大</b>
          <b
            @click="autoSelectBall(item,'0')"
            :class="{'active':curAutoSelectList[item.play] == '0'}"
          >全</b>
        </h2>
        <ul>
          <li @click="numClick(item, obj)" v-for="(obj,index) in gameData.bnumbers" :key="index">
            <i
              :class="{'active':numsArray[item.play]&&numsArray[item.play].indexOf(obj) !=-1}"
            >{{obj}}</i>
          </li>
        </ul>
      </div>
    </div>
    <load-more v-else :tip="'正在加载'"></load-more>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { combination } from "@/methods";
import { Swiper, SwiperItem, Grid, GridItem, GroupTitle, LoadMore } from "vux";
import { GAMES } from "@/config";

export default {
  name: "BetCTSSCDW",
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    LoadMore
  },
  data() {
    return {
      locationArray: [],
      numsArray: [],
      curAutoSelectList: [],
      locationArrayList: [
        {
          name: "万",
          key: "0",
          play: "LLLEMDW0"
        },
        {
          name: "千",
          key: "1",
          play: "LLLEMDW1"
        },
        {
          name: "百",
          key: "2",
          play: "LLLEMDW2"
        },
        {
          name: "十",
          key: "3",
          play: "LLLEMDW3"
        },
        {
          name: "个",
          key: "4",
          play: "LLLEMDW4"
        }
      ]
    };
  },
  methods: {
    autoSelectBall(item, type) {
      this.locationArray = [];
      let locIndex = this.locationArray.indexOf(item.play);
      this.curAutoSelectList[item.play] = type;
      if (locIndex == -1) {
        this.locationArray.push(item.play);
      }
      this.numsArray[item.play] = [];
      const FLAG = 5;
      switch (type) {
        case "0":
          for (let num of this.gameData.bnumbers) {
            this.numsArray[item.play].push(num);
          }
          break;
        case "1":
          for (let num of this.gameData.bnumbers) {
            if (num >= FLAG) {
              this.numsArray[item.play].push(num);
            }
          }
          break;
        case "2":
          for (let num of this.gameData.bnumbers) {
            if (num < FLAG) {
              this.numsArray[item.play].push(num);
            }
          }
          break;
        case "3":
          for (let num of this.gameData.bnumbers) {
            if (num % 2 == 1) {
              this.numsArray[item.play].push(num);
            }
          }
          break;
        case "4":
          for (let num of this.gameData.bnumbers) {
            if (num % 2 != 1) {
              this.numsArray[item.play].push(num);
            }
          }
          break;
        case "5":
          this.numsArray[item.play] = [];
          this.locationArray = [];
          break;
      }

      this.numsArray = this.numsArray.sort();
      this.curAutoSelectList = this.curAutoSelectList.sort();
      this.numGroup(item);
    },

    numClick(item, num) {
      this.curAutoSelectList = [];
      let locIndex = this.locationArray.indexOf(item.play);
      if (locIndex == -1) {
        this.locationArray.push(item.play);
      }

      if (this.numsArray[item.play]) {
        let index = this.numsArray[item.play].indexOf(num);
        if (index >= 0) {
          this.numsArray[item.play].splice(index, 1);
        } else {
          this.numsArray[item.play].push(num);
        }
      } else {
        this.numsArray[item.play] = [];
        this.numsArray[item.play].push(num);
      }
      this.numsArray = this.numsArray.sort();

      this.numGroup(item);
    },

    //生成注单
    numGroup(item) {
      let res = [[], [], [], [], []];

      for (let obj in this.numsArray) {
        res[obj.replace("LLLEMDW", "")] = this.numsArray[obj];
      }
      let nums = [];
      res.forEach(k => {
        if (k.length > 0) {
          nums.push(k.length);
        }
      });

      if (nums.length < 2) return;

      let play = this.gameData.bplay;

      this.$store.commit("SAVE_CHECKED", {
        name: item.name,
        odds: item.odds,
        num: res,
        play: play
      });
    }
  },

  watch: {
    betOrders(n, o) {
      if (n.length < o.length && n.length === 0) {
        this.locationArray = [];
        this.numsArray = [];
        this.curAutoSelectList = [];
      }
    }
  },
  mounted() {
    this.$store.commit("DELETE_ALL_CHECKED_DATA");
  },
  destroyed() {
    this.$store.commit("DELETE_ALL_CHECKED_DATA");
  },
  computed: {
    ...mapGetters(["gameData", "codeAndPlay", "betOrders"]),
    ...mapState(["code", "play", "openResult"])
  }
};
</script>

<style lang="scss" scoped>
.BetCTSSCDW {
  padding-bottom: px2rem(50px);
  font-size: px2rem(24px);
  .col {
    margin-top: px2rem(20px);
    h2 {
      padding: px2rem(10px) px2rem(10px) px2rem(10px) px2rem(20px);
      font-size: px2rem(26px);
      line-height: px2rem(55px);
      background: #fff;
      border-left: 6px solid #dd575c;
      border-bottom: 1px solid #e2e2e2;
      font-weight: 500;
      b {
        float: right;
        font-weight: normal;
        background: #f5eded;
        color: #877474;
        border-radius: 50%;
        height: px2rem(50px);
        width: px2rem(50px);
        font-size: px2rem(24px);
        line-height: px2rem(55px);
        margin: 0 0 0 px2rem(10px);
        text-align: center;
        &.active {
          background: #e05456;
          color: #fff;
        }
      }
    }
    ul {
      background: #fff;
      padding: px2rem(20px) 0;
      margin-bottom: px2rem(20px);
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #e2e2e2;
      li {
        // flex: 1;
        width: 18%;
        box-sizing: border-box;
        margin: px2rem(5px);
        i {
          width: px2rem(80px);
          height: px2rem(80px);
          border-radius: 50%;
          display: inline-block;
          background: #f5eded;
          color: #877474;
          line-height: px2rem(80px);
          text-align: center;
          font-size: px2rem(28px);
          font-style: normal;
          &.active {
            background: #e05456;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
