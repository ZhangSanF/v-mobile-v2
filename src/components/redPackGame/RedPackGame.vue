<template>
  <div class="RedPackGame">
    <x-header
      :left-options="{backText: '',preventGoBack:true}"
      @on-click-back="backPrev"
      class="public-header-background-color public-header-boxShadow"
    >红包游戏</x-header>
    <scroll class="content" :click="false" :data="games">
      <div>
        <grid :cols="1" :show-lr-borders="false">
          <grid-item
            :class="item.name"
            class="item"
            @click.native="toGame(item)"
            v-for="(item,index) in redPackGameBaseInfo.gameType"
            :key="index"
          >
          </grid-item>
        </grid>
      </div>
    </scroll>
  </div>
</template>

<script>
import { Grid, GridItem, XHeader, ButtonTab, ButtonTabItem } from "vux";
import { mapState, mapGetters, mapActions } from "vuex";
import Scroll from "@/components/common/scroll";

export default {
  name: "RedPackGame",
  components: { Grid, GridItem, XHeader, Scroll, ButtonTab, ButtonTabItem },
  props: [],
  data() {
    return {
      games: []
    };
  },
  mounted() {
    // this.redPackGameIndexInitFunc();
  },
  methods: {
    // ...mapActions(["redPackGameIndexInit"]),

    backPrev(){
      this.$router.replace(`/`);
    },

    // redPackGameIndexInitFunc() {
    //   this.$vux.loading.show({
    //     text: "游戏列表加载中"
    //   });
    //   this.redPackGameIndexInit().then(res => {
    //     this.$vux.loading.hide();
    //     if (res.resCode == 1000) {
    //       console.log(res.data);
    //     } else {
    //       this.$vux.alert.show({
    //         title: "提示",
    //         content: `请求失败！<br>原因: ${res.msg}`
    //       });
    //     }
    //   });
    // },

    toGame(item) {
      this.$router.push(`/redPack/gameGroup/${item.id}`);
    }
  },
  computed: {
    ...mapGetters(["redPackGameBaseInfo"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.RedPackGame {
  overflow: hidden;
}

.public-header-background-color {
  height: px2rem(90px);
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
  .weui-grids:before {
    border: none;
  }
  .item{
    background-size: 100% 100%;
    height: px2rem(250px);
    margin-top: px2rem(20px);
  }
  .sl{
    background-image: url('../../assets/images/redPackGame/slbg.png');
  }
  .niuniu{
    background-image: url('../../assets/images/redPackGame/niuniubg.png');
  }
  .jq{
    background-image: url('../../assets/images/redPackGame/jqbg.png');
  }
  .fl{
    background-image: url('../../assets/images/redPackGame/flbg.png');
  }
  .weui-grids {
    text-align: center;
    padding: 0 px2rem(20px) px2rem(20px) px2rem(20px);
    box-sizing: border-box;
    .gameIcon {
      width: 80%;
    }
    p {
      font-size: px2rem(34px);
      color: #555;
    }
  }
}
</style>
