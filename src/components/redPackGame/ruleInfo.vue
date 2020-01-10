<template>
  <div class="rule-info">
    <x-header
      ref="xheader"
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >游戏规则</x-header>
    <Scroll class="content" ref="content" :click="false" :data="[]">
      <div v-html="curContent"></div>
    </Scroll>
  </div>
</template>

<script>
import { XHeader } from "vux";
import Scroll from "@/components/common/scroll";
import { mapGetters } from "vuex";

export default {
  name: "ruleInfo",
  components: { XHeader, Scroll },
  methods: {
    htmlDecodeByRegExp(str) {
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "'");
      s = s.replace(/&apos;/g, "'");
      s = s.replace(/&quot;/g, '"');
      s = s.replace(/<br\/>/g, "\n");
      return s;
    }
  },
  computed: {
    ...mapGetters(["redPackGameRule"]),
    curContent() {
      // console.log(this.$route.params.id)
      for (let item of this.redPackGameRule) {
        for (let i of item.rule) {
          if (this.$route.params.id == i.id) {
            let content = this.htmlDecodeByRegExp(i.content);
            // console.log(content)
            setTimeout(() => {
              this.$refs.content.refresh();
              setTimeout(() => {
                this.$refs.content.refresh();
              }, 5000);
            }, 1000);
            return content;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.rule-info {
  .public-header-background-color {
    background: linear-gradient(to right, #ff3564, #ff703e);
    /deep/ .vux-header-title {
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
  }
}
</style>