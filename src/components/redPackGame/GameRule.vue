<template>
  <div class="gameRule">
    <x-header
      ref="xheader"
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >游戏规则</x-header>
    <Scroll class="content" :click="false" :data="[]">
      <div>
        <img src="../../assets/images/redPackGame/rules/bg_1.png" alt width="100%" />
        <img src="../../assets/images/redPackGame/rules/bg_2.png" alt width="100%" />
        <img src="../../assets/images/redPackGame/rules/bg_3.png" alt width="100%" />
        <img src="../../assets/images/redPackGame/rules/bg_4.jpg" alt width="100%" />
        <!-- 禁枪红包 -->
        <div
          :class="item.name == 'jq' ? 'ban-div' : item.name == 'niuniu' ? 'niuniu-div' : 'boom-div'"
          v-for="(item, index) in redPackGameRule"
          :key="index"
          v-if="item.name !== 'fl'"
        >
          <div class="left">
            <router-link tag="a" :to="'/redPack/ruleInfo/' + item.rule[0].id">
              <img :src="item.rule[0].icon" alt />
            </router-link>
          </div>
          <div class="right">
            <router-link tag="a" :to="'/redPack/ruleInfo/' + item.rule[1].id">
              <img :src="item.rule[1].icon" alt />
            </router-link>
            <router-link tag="a" :to="'/redPack/ruleInfo/' + item.rule[2].id">
              <img :src="item.rule[2].icon" alt />
            </router-link>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { XHeader } from "vux";
import Scroll from "@/components/common/scroll";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "gameRule",
  components: { XHeader, Scroll },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["redPackGameRule"])
  }
};
</script>

<style lang="scss" scoped>
.gameRule {
  .public-header-background-color {
    background: linear-gradient(to right, #ff3564, #ff703e);
    /deep/ .vux-header-title{
      line-height: px2rem(100px);
      height: px2rem(90px);
    }
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: px2rem(90px);
    bottom: 0;
    width: 100%;
    font-size: 0;
  }
  .ban-div,
  .niuniu-div,
  .boom-div,
  .banker-div,
  .twoBars-div {
    position: absolute;
    left: 0;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    .left {
      width: 3.44444rem;
      padding-left: 0.55556rem;
      a {
        width: 100%;
      }
      img {
        width: 100%;
      }
    }
    .right {
      padding-left: 0.27778rem;
      width: 5.16667rem;
      font-size: 0;
      a {
        width: 100%;
        display: block;
        margin-bottom: 0.27778rem;
      }
      img {
        width: 100%;
      }
    }
  }
  .ban-div {
    top: 8.25rem;
  }
  .niuniu-div {
    top: 16.02778rem;
  }
  .boom-div {
    top: 23.75944rem;
  }
  .banker-div {
    top: 31.44444rem;
  }
  .twoBars-div {
    top: 39.11111rem;
  }
}
</style>