<template>
  <div
    class="bet"
    @click="betClick($event)"
    :class="{checked: isChecked,'filxedK3':codeClass == 'jsk3'}"
  >
    <span class="name" :class="[code, code+play]">
      <span
        v-if="ballStyle(play, code, item.desc) == 'pk10'"
        :class="['b' + item.desc, ' pk10ball', code +'b'+ item.desc]"
      >{{item.desc}}</span>
      <span
        v-else-if="ballStyle(play, code, item.desc) == 'ssc' && code != 'cqssc'"
        :class="['sscball', 'b'+ item.desc,hk6Color(code,item.desc)]"
      >{{item.desc}}</span>
      <span v-else-if="codeClass == 'jsk3'">
        <template v-if="!isNaN(item.desc)">
          <img
            v-for="(num,index) in item.desc"
            :key="index"
            class="jsk3Img"
            :src="convertImgPath(num)"
            alt
          >
        </template>
        <template v-else>{{item.desc}}</template>
      </span>
      <span v-else-if="code == 'cqssc'">
        <template v-if="!isNaN(item.desc)">
          <span v-for="(num,index) in item.desc" :key="index" class="cqsscImg" :class="'cqssc'+num"></span>
        </template>
        <template v-else>{{item.desc}}</template>
      </span>
      <span v-else>{{item.desc}}</span>
    </span>
    <span class="odds" v-if="codeClass == 'jsk3'">{{item.odds}}</span>
    <span class="odds" v-else>{{item.odds}}</span>
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
import { GAMES } from "@/config";
export default {
  name: "Bet",
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    LoadMore,
    Toast
  },
  props: ["item"],
  data() {
    return {
      a: 0,
      toastText: "",
      toastType: "cancel",
      toastPosition: "top",
      showToast: false
    };
  },
  methods: {
    // 香港六合彩波色
    hk6Color(code, num) {
      return hk6Color(code, num);
    },
    ballStyle(play, code, num) {
      var res = "";
      if (play == "n10") {
        res = "pk10";
      }
      if (
        (code == "cqssc" ||
          code == "xjssc" ||
          code == "tjssc" ||
          code == "hlssc" ||
          code == "jsssc") &&
        !this.isChinese(num)
      ) {
        res = "ssc";
      }
      if (play == "dh" && !this.isChinese(num)) {
        res = "ssc";
      }
      if ((code == "cqklsf" || code == "gdklsf") && !this.isChinese(num)) {
        res = "ssc";
      }
      if (
        this.codeClass == "hk6" &&
        play != "lxlw" &&
        play != "hx" &&
        !this.isChinese(num)
      ) {
        res = "ssc";
      }
      return res;
    },
    betClick($event) {
      if (this.closed) {
        this.$vux.alert.show({
          title: "提示",
          content: `封盘中，请稍后`
        });
        return;
      }
      $event.stopPropagation();
      if (!this.isChecked) {
        var item = this.item;
        this.$store.commit("SAVE_CHECKED", {
          uid: this.uid,
          name: item.name,
          odds: item.odds,
          desc: item.desc,
          type: item.type,
          play: item.play,
          key: this.play
        });
      } else {
        console.log(this.isChecked);
        this.$store.commit("DELETE_CHECKED", this.uid);
      }
    },
    isChinese(str) {
      var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
      if (!patrn.exec(str)) {
        return false;
      } else {
        return true;
      }
    }
  },
  computed: {
    ...mapState(["code", "play", "checkedData", "closed", "checkedDataKeys"]),
    codeClass() {
      if (this.code && GAMES) {
        return GAMES[this.code].class;
      }
    },
    uid() {
      if (this.item.play) {
        return this.item.play.replace("@", "");
      }
    },
    isChecked() {
      var keyArr;
      if (GAMES[this.code].class == "bjpk10") {
        keyArr = this.checkedDataKeys[this.play];
      } else {
        keyArr = _.keysIn(this.checkedData);
      }
      if (keyArr && keyArr.indexOf(this.uid) >= 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bet {
  font-size: px2rem(24px);
  height: px2rem(92px);
  padding: px2rem(15px) 0;
  border-radius: px2rem(10px);
  text-align: center;
  box-sizing: border-box;
  border:1px solid #ccc;
  margin: px2rem(3px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .name {
    display: block;
    font-weight: 600;
    color: #666;
    .jsk3Img {
      width: px2rem(40px);
      height: px2rem(40px);
      margin: 0 px2rem(5px);
      vertical-align: middle;
    }
    .cqsscImg {
      width: px2rem(40px);
      height: px2rem(40px);
      display: inline-block;
      vertical-align: middle;
      background: url("../../../assets/images/cqsscBall.png");
      background-repeat: no-repeat;
      background-size: 100%;
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
        background-position: 0px px2rem(-320px);
      }
      &.cqssc9 {
        background-position: 0px px2rem(-360px);
      }
    }
  }
  .odds {
    display: block;
    color: #ff2f4b;
  }
}

.pk10ball {
  width: px2rem(40px);
  height: px2rem(40px);
  border-radius: px2rem(4px);
  display: inline-block;
  margin-right: px2rem(2px);
  color: #fff;
  text-align: center;
  line-height: px2rem(40px);
  margin-right: px2rem(2px);
  $i: 0;
  @each $color
    in (
      (
        #ffa300,
        #0089ff,
        #4b4b4b,
        #ff7300,
        #00a3a3,
        #5235ff,
        #8a8a8a,
        #ff0000,
        #760000,
        #04bf00
      )
    )
  {
    $i: $i + 1;
    &.b#{$i} {
      background-color: $color;
    }
  }
}

.sscball {
  font-weight: 600;
  width: px2rem(40px);
  height: px2rem(40px);
  display: inline-block;
  text-align: center;
  line-height: px2rem(40px);
  margin-right: px2rem(2px);
  padding: px2rem(1px);
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

.checked {
  background: #51a4fb;
  border: none;
  .odds,.name {
    color: #fff;
  }
  .sscball{
    background-color: #fff;
    color: #51a4fb;
  }
}
</style>
