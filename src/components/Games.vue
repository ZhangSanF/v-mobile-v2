<template>
  <div class="games">
    <!-- <scroll
      ref="scroll"
      class="tabs bg-public-bgColor"
      :scrollX="true"
      :scrollY="false"
      :eventPassthrough="'vertical'"
      :data="showGameGroupTabsArr"
    >
      <div ref="tabItemBox">
        <div
          class="tabItem"
          ref="tabItem"
          :class="{'active':gameGroupSelected == parseInt(item.id)-1}"
          v-for="(item, index) in classification"
          :key="index"
          @click="gameGroupSelected = item.id -1"
        >
          <p class="font-main-color">{{item.name}}</p>
        </div>
      </div>
    </scroll> -->

    <div class="tabs tabItemBox" ref="warp" >
      <tab :line-width="2" v-model="gameGroupSelected" bar-active-color="transparent">
        <tab-item
          :selected="gameGroupSelected == parseInt(item.id)-1"
          :active-class="'active'"
          v-for="(item, index) in classification"
          @click="gameGroupSelected = item.id -1"
          :key="index"
        >{{item.name}}</tab-item>
      </tab>
    </div>
    <scroll class="wrapper game-content" :data="allDataArray" v-if="allDataArray.length">
      <div class="wrapper-tontent">
          <games-card
            v-for="(item, key,index) of openResult"
            @click.native="toGame(key)"
            v-show="item.classification && item.classification.indexOf((gameGroupSelected+1)) != -1"
            :code="key"
            :info="item"
            :key="index"
          ></games-card>
      </div>
    </scroll>

    <load-more v-if="!allDataArray.length" :tip="'正在加载'"></load-more>
  </div>
</template>

<script>
import GamesCard from "@/components/common/GamesCard";
import scroll from "@/components/common/scroll";
import { GAMES } from "@/config";
import { Tab, TabItem, Swiper, SwiperItem, LoadMore } from "vux";
import { mapState } from "vuex";
import { constants } from "fs";

export default {
  name: "games",
  components: { Tab, TabItem, Swiper, SwiperItem, GamesCard, scroll, LoadMore },
  data() {
    return {
      gameGroupSelected: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("tabsChange", "games");
    });
  },
  methods: {
    toGame(e) {
      let p = GAMES[e].play[0];
      let t = GAMES[e].count[p].lt;
      this.$store.commit("CHANGE_CODE", e);
      this.$store.dispatch("changeCode", e);
      this.$router.push(`/lottery/${e}/${t}`);
    }
  },
  computed: {
    ...mapState(["openResult", "classification"]),
    allDataArray() {
      return _.keys(this.openResult);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.games {
  height: 100%;
  overflow: hidden;
  background-color: #ededed;
}

.card {
  background: #fff;
  border-radius: px2rem(10px);
  margin-top: px2rem(20px);
}

.game-content {
  position: absolute;
  top: px2rem(86px);
  bottom: 0;
  padding: 0 px2rem(20px);
  list-style-type: none;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.wrapper-tontent {
  padding: px2rem(10px) 0 px2rem(10px) 0;
}

.tabs {
  position: relative;
  left: 0;
  right: 0;
  line-height: px2rem(80px);
  background-color: #fff;
  overflow: hidden;
  white-space: nowrap;
  .active {
    color: #60abf9;
    border-bottom: 3px solid #60abf9 !important;
  }
}
</style>
