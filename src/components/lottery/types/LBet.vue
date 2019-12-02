<template>
  <div
    class="bet lbet"
    v-if="codeAndPlay == 'hk6lxlw' || codeAndPlay == 'xyhk6lxlw' || codeAndPlay == 'hk6hx' || codeAndPlay == 'xyhk6hx'"
    @click="lxlwBetClick"
    :class="{checked: isChecked}"
  >
    <span class="name">{{item.cn}}</span>
    <span class="odds" v-if="codeAndPlay == 'hk6lxlw' || codeAndPlay == 'xyhk6lxlw' ">{{item.odds}}</span>
    <toast
      v-model="showToast"
      :type="toastType"
      :time="1200"
      is-show-mask
      :text="toastText"
      :position="toastPosition"
    ></toast>
  </div>
  <div class="bet lbet" v-else @click="betClick" :class="{checked: isChecked}">
    <span class="name cqsscImg" v-if="code == 'cqssc'" :class="'cqssc'+item"></span>
    <span class="name" v-else :class="hk6Color(code,item)">{{item}}</span>
    <toast
      v-model="showToast"
      :type="toastType"
      :time="1200"
      is-show-mask
      :text="toastText"
      :position="toastPosition"
    ></toast>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  Swiper,
  SwiperItem,
  Grid,
  GridItem,
  GroupTitle,
  LoadMore,
  Toast
} from "vux";
import { hk6Color } from "@/methods";
export default {
  name: "LBet",
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    LoadMore,
    Toast
  },
  props: ["item", "play", "hxPlay"],
  data() {
    return {
      toastText: "",
      toastType: "cancel",
      toastPosition: "top",
      showToast: false
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.codeAndPlay == "hk6zxbz" || this.codeAndPlay == "hk6zxbz") {
        this.play.max = 12;
      }
      if (this.codeAndPlay == "hk6hx" || this.codeAndPlay == "xyhk6hx") {
        this.play.max = 10;
      }
      if (this.codeAndPlay.indexOf('zxliu') != -1) {
        this.play.max = 8;
      }
    }, 20);
  },
  methods: {
    betClick() {
      if (this.closed) {
        this.toastText = "封盘中，请稍后";
        this.showToast = true;
        return;
      }
      if (!this.isChecked) {
        if (this.checkedDataLength >= this.play.max) {
          this.showToast = true;
          this.toastText = `当前玩法最多可选${this.play.max}个号码!`;
          return;
        }
        var item = this.item;
        this.$store.commit("SAVE_CHECKED", {
          uid: this.nid,
          num: this.item,
          play: this.play,
          key: this.play
        });
      } else {
        this.$store.commit("DELETE_CHECKED", this.nid);
      }
    },
    // 香港六合彩波色
    hk6Color(code, num) {
      return hk6Color(code, num);
    },
    lxlwBetClick() {
      if (this.closed) {
        this.toastText = "封盘中，请稍后";
        this.showToast = true;
        return;
      }
      if (!this.isChecked) {
        if (this.checkedDataLength >= this.play.max) {
          this.showToast = true;
          this.toastText = `当前玩法最多可选${this.play.max}个号码!`;
          return;
        }
        var item = this.item;
        this.$store.commit("SAVE_CHECKED", {
          uid: this.nid,
          desc: this.item.desc,
          cn: this.item.cn,
          hxPlay: this.hxPlay,
          key: this.play
        });
      } else {
        this.$store.commit("DELETE_CHECKED", this.nid);
      }
    }
  },
  computed: {
    ...mapState(["code", "checkedData", "closed"]),
    ...mapGetters(["codeAndPlay"]),
    nid() {
      if (this.play) {
        if (
          this.codeAndPlay == "hk6lxlw" ||
          this.codeAndPlay == "xyhk6lxlw" ||
          this.codeAndPlay == "hk6hx" ||
          this.codeAndPlay == "xyhk6hx"
        ) {
          return this.play.play.replace("@", "") + this.item.desc;
        }
        return this.play.play.replace("@", "") + this.item;
      }
    },
    isChecked() {
      var list = this.checkedData;
      var keyArr = _.keysIn(this.checkedData);
      if (keyArr.indexOf(this.nid) >= 0) {
        return true;
      } else {
        return false;
      }
    },
    checkedDataLength() {
      var arr = _.values(this.checkedData);
      return arr.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.bet,
.lbet {
  font-size: px2rem(24px);
  height: px2rem(92px);
  padding: px2rem(15px) 0;
  border-radius: px2rem(10px);
  box-sizing: border-box;
  border:1px solid #ccc;
  margin: px2rem(5px) 0 0 px2rem(5px);
  .name {
    font-weight: 600;
    width: px2rem(40px);
    height: px2rem(40px);
    display: inline-block;
    text-align: center;
    line-height: px2rem(40px);
    background: #51a4fb;
    color: #fff;
    border-radius: 50%;
  }
  .red {
    color: #fff;
    background: #ff5b71;
  }
  .blue {
    color: #fff;
    background: #0094f3;
  }
  .green {
    color: #fff;
    background: #429f31;
  }
  .odds {
    font-size: px2rem(24px);
    color: orangered;
  }

  .cqsscImg {
      width: px2rem(40px);
      height: px2rem(40px);
      display: inline-block;
      vertical-align: middle;
      background: url("../../../assets/images/cqsscBall.png");
      background-repeat: no-repeat;
      background-size: 100%;
      border-radius: 0;
      &.cqssc0 {
        background-position: 0px 0;
      }
      &.cqssc1 {
        background-position: 0px px2rem(-40px);
      }
      &.cqssc2 {
        background-position: 0px px2rem(-80px);
      }
      &.cqssc3 {
        background-position: 0px px2rem(-120px);
      }
      &.cqssc4 {
        background-position: 0px px2rem(-160px);
      }
      &.cqssc5 {
        background-position: 0px px2rem(-200px);
      }
      &.cqssc6 {
        background-position: 0px px2rem(-240px);
      }
      &.cqssc7 {
        background-position: 0px px2rem(-280px);
      }
      &.cqssc8 {
        background-position: 0px px2rem(-230px);
      }
      &.cqssc9 {
        background-position: 0px px2rem(-370px);
      }
    }
}
.checked {
  background: #51a4fb;
  .odds,.name {
    color: #fff;
  }
  span:nth-of-type(1){
    background-color: #fff;
    color: #51a4fb;
  }
}
</style>
