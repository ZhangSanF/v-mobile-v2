<template>
  <div class="PreferentialDetails">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >
      <div class="header-content">
        <span class="header-title">优惠活动</span>
      </div>
    </x-header>

    <scroll class="scrollBox" :data="list">
      <div class="wrapper-tontent">
        <div v-html="textData" ref="content"></div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/common/scroll";
import { mapActions } from "vuex";
import { XHeader } from "vux";
export default {
  name: "preferential",
  data() {
    return {
      list: [],
      textData: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$route.params.id) {
        this.$router.push("/");
      } else {
        this.getNewsContentFunc(this.$route.params.id);
        this.openScrolling();
      }
    });
  },
  methods: {
    ...mapActions(["getNewsContent"]),

    imgLoad(img, callback) {
      var timer = setInterval(function() {
        if (img.complete) {
          callback(img);
          clearInterval(timer);
        }
      }, 50);
    },

    getNewsContentFunc(id) {
      this.getNewsContent({ id: id })
        .then(res => {
          if (res.resCode === 1000) {
            this.textData = res.data.content;
          } else {
            this.$vux.alert.show({
              title: "获取数据失败",
              content: `获取数据失败,请重试或者联系客服处理![${res.msg}]`
            });
          }
        })
        .catch(err => {
          this.$vux.alert.show({
            title: "获取数据失败",
            content: `获取数据失败,请重试或者联系客服处理![${err}]`
          });
        });
    }
  },
  watch: {
    textData: function() {
      this.$nextTick(() => {
        let count=0;
        let imgs =  this.$refs.content.querySelectorAll('img');
        [].forEach.call(imgs,(item)=>{
          this.imgLoad(item,()=>{
            count++;
            this.list.push(1);
          })
        })
      });
    }
  },
  components: { XHeader, scroll }
};
</script>

<style lang="scss" scoped>
.PreferentialDetails {
  font-size: px2rem(14px);

  .scrollBox {
    background-color: #fff;
    padding: px2rem(15px) px2rem(10px);
    overflow: hidden;
    position: absolute;
    top: px2rem(92px);
    bottom: 0;
    left: 0;
    right: 0;
    div {
      padding-bottom: px2rem(50px);
    }
  }
}
</style>
