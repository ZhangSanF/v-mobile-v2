<template>
  <div class="gameGroup">
    <x-header
      ref="xheader"
      :left-options="{backText: '',preventGoBack:true}"
      @on-click-back="backPrev"
      class="public-header-background-color public-header-boxShadow"
    >红包游戏</x-header>
    <tab :line-width="2" active-color="#ff3564" class="tabBox" v-model="index" ref="xtab">
      <tab-item
        class="vux-center"
        @on-item-click="chagneRouter(index)"
        v-for="(item,index) in redPackGameBaseInfo.gameType"
        :key="index"
      >
        <p>
          <img class="titleImg" :src="item.static_icon" alt />
        </p>
        <p>{{item.title}}</p>
      </tab-item>
    </tab>
    <scroll class="content" :click="false" :data="redPackGameBaseInfo.groupList">
      <swiper ref="swiper" v-model="index" :show-dots="false"  @on-index-change="chagneRouter">
        <swiper-item v-for="(item,index) in redPackGameBaseInfo.gameType" :key="index">
          <div
            class="tab-swiper vux-center"
            v-for="(group,key) in redPackGameBaseInfo.groupList"
            :key="key"
            v-show="group.game_type == item.id"
            @click="toChart(group)"
          >
            <div>
              <img class="gameImg" :src="group.icon" alt="群头像" />
            </div>
            <div class="textBox">
              <p>{{group.title}}</p>
              <p>{{group.rule}}</p>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </scroll>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, XHeader } from "vux";
import Scroll from "@/components/common/scroll";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "gameGroup",
  data() {
    return {
      tabList: [],
      index: 0
    };
  },
  props: ["type"],
  mounted() {
    this.$nextTick(() => {
      this.index = this.type - 1;
      let xheaderHeight = this.$refs.xheader.$el.clientHeight;
      let xtabHeight = this.$refs.xtab.$el.clientHeight;
      let xheight = window.screen.height - xheaderHeight - xtabHeight;
      this.$refs.swiper.xheight = xheight + "px";
    });
    this.redPackGameIndexGameRule();
  },
  methods: {
    ...mapActions(["redPackGameChatRoomJoinRoom", "redPackGameIndexGameRule"]),

    chagneRouter(index) {
      this.$router.replace("/redPack/gameGroup/" + (index + 1));
    },

    toChart(item) {
      this.$router.push(`/redPack/chartRoom/${item.id}`);
    },

    backPrev(){
      this.$router.replace(`/`);
    },

    toRule(item) {
      this.$router.push(`/redPack/gameRule/${item.game_type}`);
    }
  },
  computed: {
    ...mapGetters(["redPackGameBaseInfo", "redPackGameClientId"])
  },
  components: { Tab, TabItem, Swiper, SwiperItem, Scroll, XHeader }
};
</script>

<style lang="scss" scoped>
.gameGroup {
  height: 100%;
  .public-header-background-color {
    background: linear-gradient(to right, #ff3564, #ff703e);
    /deep/ .vux-header-title{
      line-height: px2rem(100px);
      height: px2rem(90px);
    }
  }
  .gameIcon {
    width: px2rem(50px);
  }
  .tab-swiper {
    display: flex;
    border-bottom: 1px solid #ddd;
    font-size: px2rem(32px);
    padding: px2rem(20px) px2rem(30px);
    .gameImg {
      display: block;
      flex: 1;
      width: px2rem(80px);
      height: px2rem(80px);
    }
    .textBox {
      margin-left: px2rem(20px);
      font-size: px2rem(30px);
      flex: 1;
      color: #555;
      vertical-align: middle;
      p {
        line-height: px2rem(45px);
        text-overflow: ellipsis;
        overflow: hidden;
        width: 90%;
        white-space: nowrap;
      }
      p:nth-of-type(2) {
        font-size: px2rem(24px);
      }
    }
  }
}
.content {
  overflow: hidden;
  position: absolute;
  top: px2rem(280px);
  bottom: 0;
  width: 100%;
}
.titleImg {
  width: px2rem(80px);
  height: px2rem(80px);
}
.tabBox {
  margin-top: px2rem(30px);
  /deep/ .vux-tab-container {
  height: px2rem(180px);
  .vux-tab {
    height: px2rem(150px);
    p {
      margin: 0;
      line-height: px2rem(50px);
    }
  }
}
}
</style>