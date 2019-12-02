<template>
  <div class="lxbDetailData">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >收益明细</x-header>
    <scroll class="scroll" :data="scrollDatas" :pullup="true" @scrollToEnd="scrollEnd">
      <div class="scrollBox">
        <ul>
          <li class="title">
            <div>时间</div>
            <div>收益(元)</div>
          </li>
          <li v-for="(item,index) in scrollDatas" :key="index">
            <div>{{item.date}}</div>
            <div>{{item.amount}}</div>
          </li>
          <li class="noData" v-if="scrollDatas.length<=0">暂无数据</li>
        </ul>
      </div>
    </scroll>
  </div>
</template>


<script>
import { XHeader } from "vux";
import Scroll from "@/components/common/scroll";
import { mapActions } from "vuex";

export default {
  name: "lxbDetailData",
  data() {
    return {
      scrollDatas: [],
      curPage: 0,
      totalPage: 0
    };
  },
  mounted() {
    this.homeWalletDetailFunc(0);
  },
  methods: {
    ...mapActions(["homeWalletDetail"]),

    scrollEnd() {
        if(this.curPage<this.totalPage){
            this.curPage++;
            this.homeWalletDetailFunc(this.curPage);
        }
    },

    homeWalletDetailFunc(page) {
      this.homeWalletDetail(page).then(res => {
        if (res.resCode == 1000) {
          this.curPage = res.page;
          this.totalPage = res.pageTotal;
          if(this.curPage<=1){
              this.scrollDatas = res.data;
        }else{
            res.data.forEach(item=>{
                this.scrollDatas.push(item);
            })
        }
          
        } else {
          this.$vux.alert.show({
            title: "提示信息",
            content: res.msg
          });
        }
      });
    }
  },
  components: { Scroll, XHeader }
};
</script>


<style lang="scss" scoped>
.lxbDetailData {
  .scroll {
    position: absolute;
    overflow: hidden;
    top: px2rem(90px);
    left: 0;
    right: 0;
    bottom: 0;
  }
  .scrollBox {
    ul {
      li {
        display: flex;
        height: px2rem(80px);
        align-items: center;
        border-bottom: 1px solid #ddd;
        &.title {
          background-color: #fafafa;
        }
        &.noData{
            font-size: px2rem(30px);
            color: #666;
            justify-content: center;
        }
        & > div {
          flex: 1;
          text-align: center;
          font-size: px2rem(30px);
          &:nth-of-type(1){
              border-right: 1px solid #ddd;
          }
        }
      }
    }
  }
}
</style>
