<template>
  <div class="bet" @click="betClick" :class="{checked: isChecked}">
    <span class="name">{{item.desc}}</span>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Swiper, SwiperItem, Grid, GridItem, GroupTitle, LoadMore } from "vux";
export default {
  name: "NBet",
  components: { Swiper, SwiperItem, Grid, GridItem, GroupTitle, LoadMore },
  props: ["item"],

  methods: {
    betClick() {
      if (this.closed) {
        this.$vux.alert.show({
          title: "提示",
          content: `封盘中，请稍后`
        });
        return;
      }
      if (!this.isChecked) {
        var item = this.item;
        this.$store.commit("SAVE_CHECKED", {
          uid: this.nid,
          desc: this.item.desc,
          name: this.item.name,
          odds: this.item.odds,
          play: this.item.play,
          type: this.item.type,
          key: this.play
        });
      } else {
        this.$store.commit("DELETE_CHECKED", this.nid);
      }
    }
  },
  computed: {
    ...mapState(["code", "checkedData", "closed","play"]),
    nid() {
      if (this.item.play) {
        return this.item.play.replace("@", "");
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
  border-radius: px2rem(10px);
  box-sizing: border-box;
  border: 1px solid #ccc;
  text-align: center;
  margin: px2rem(5px) 0 0 px2rem(5px);
  .name {
    font-weight: 600;
    display: inline-block;
    text-align: center;
    line-height: px2rem(92px);
    color: #666;
  }
  .odds {
    font-size: px2rem(24px);
    color: orange;
  }
}
.checked {
  background: #51a4fb;
  .odds,.name {
    color: #fff;
  }
  .name span:nth-of-type(1){
    background-color: #fff;
    color: #51a4fb;
  }
}
</style>
