<template>
  <div class="bet lbet" @click="betClick" :class="{checked: isChecked}">
    <span class="name cqsscImg" :class="'cqssc'+item" v-if="code == 'cqssc'"></span>
    <span class="name" v-else>{{item}}</span>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Swiper, SwiperItem, Grid, GridItem, GroupTitle, LoadMore } from "vux";
export default {
  name: "DBet",
  components: { Swiper, SwiperItem, Grid, GridItem, GroupTitle, LoadMore },
  props: ["item", "play"],

  methods: {
    betClick() {
      if (this.closed) {
        this.toastText = "封盘中，请稍后";
        this.showToast = true;
        return;
      }
      if (!this.isChecked) {
        this.$store.commit("DELETE_ALL_CHECKED_DATA");
        var item = this.item;
        this.$store.commit("SAVE_CHECKED", {
          uid: this.nid,
          num: this.item,
          play: this.play,
          key: this.play,
        });
      } else {
        this.$store.commit("DELETE_CHECKED", this.nid);
      }
    }
  },
  computed: {
    ...mapState(["code", "checkedData"]),
    nid() {
      if (this.play) {
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
    background: #fcfcfc;
    color: #d91d37;
    border-radius: 50%;
    font-size: px2rem(24px);
  }
  .odds {
    font-size: px2rem(24px);
    color: orange;
  }

  .cqsscImg {
      width: px2rem(40px);
      height: px2rem(40px);
      display: inline-block;
      vertical-align: middle;
      border-radius: 0;
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
        background-position: 0px px2rem(-230px);
      }
      &.cqssc9 {
        background-position: 0px px2rem(-370px);
      }
    }
}
.checked {
  background: #ff8676;
  .name {
    // color: #fff;
  }
  .odds {
    color: #adff97;
  }
}
</style>
