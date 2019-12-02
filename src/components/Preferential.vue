<template>
  <div class="preferential">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >
      <div class="header-content">
        <span class="header-title">优惠活动</span>
      </div>
    </x-header>
    <scroll class="scroll" :pullup="true" @scrollToEnd="scrollToEnd" :data="listData">
      <div class="scrollBox">
        <router-link
          :to="{name: 'PreferentialDetails', params: {id:item.id}}"
          tag="div"
          class="card"
          v-for="(item,index) in listData"
          :key="index"
        >
          <div class="card-content bg-public-deep-bgColor">
<!--            <div class="card-content-img">-->
<!--              <img src="/static/images/testImgs/youhuidating.png" width="100%" alt="">-->
<!--            </div>-->
            <div class="card-content-inner">
              <span class="text">{{item.title}}</span>
              <button>查看详情</button>
            </div>
          </div>
        </router-link>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { XHeader } from "vux";
import Scroll from "@/components/common/scroll";
export default {
  name: "preferential",
  data() {
    return {
      listData: [],
      curPage: 1,
      totalPage: 0
    };
  },
  components: { Scroll, XHeader },
  mounted() {
    this.$nextTick(() => {
      this.stopScrolling();
      this.getPromotionHallFunc(1);
    });
  },
  methods: {
    ...mapActions(["getPromotionHall"]),

    scrollToEnd() {
      let curP = this.curPage;
      if (curP < this.totalPage) {
        curP++;
        this.getPromotionHallFunc(curP);
      }
    },

    getPromotionHallFunc(page) {
      this.getPromotionHall({ page: page })
        .then(res => {
          if (res.resCode === 1000) {
            this.totalPage = res.allPage;
            if (res.page > 1) {
              this.curPage = page;
              res.data.forEach(item => {
                this.listData.push(item);
              });
            } else {
              this.listData = res.data;
            }
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
  }
};
</script>

<style lang="scss" scoped>
.preferential {
  background-color: #EDEDED;
  height: 100%;
  .banner {
    margin: px2rem(8px) px2rem(5px);
    img {
      width: 100%;
      border-radius: px2rem(8px);
    }
  }
}

.scroll {
  overflow: hidden;
  position: absolute;
  top: px2rem(92px);
  left: 0;
  right: 0;
  bottom: 0;
  /*height: 100%;*/
  .scrollBox {
    padding: px2rem(20px) px2rem(20px);
    box-sizing: border-box;
  }
}

.card {
  margin-bottom: px2rem(20px);
  background-color: #fff;
  border-radius: px2rem(10px);
}
.card-content-img {
  height: px2rem(250px);
  overflow: hidden;
}
.card-content-inner {
  padding: 0;
  display: block;
  font-size: px2rem(24px);
  color: #999;
  line-height: px2rem(78px);
  height: px2rem(78px);
  vertical-align: top;
  position: relative;

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: px2rem(12px);
    color: #999;
    overflow: hidden;
    font-size: px2rem(24px);
  }
}

.card-content-inner {
  padding: px2rem(14px) px2rem(20px);
  box-sizing: border-box;
  line-height: px2rem(55px);
  .text {
    position: relative;
    top: px2rem(3px, false);
    font-size: px2rem(24px);
    color: #999;
  }
  button {
    width: px2rem(122px);
    height: px2rem(50px);
    float: right;
    line-height: px2rem(50px);
    background-color: #7FB8FC;
    border: none;
    color: #fff;
    border-radius: px2rem(4px);
    font-size: px2rem(22px);
  }
}

.card-content {
  border-radius: px2rem(3px);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.08);
}
.vux-x-icon {
  fill: #bbb;
  float: right;
  margin-top: px2rem(18px);
  font-size: px2rem(26px);
}
</style>
