<template>
  <div class="luzhu">
    <load-more :tip="'正在加载更多数据'" v-if="moreLoading"/>
    <p v-else-if="isNoData && !moreLoading" class="notice-no-data">暂无露珠数据</p>
    <div v-else class="content">
      <grid :show-lr-borders="false" v-for="(tab, index) of luzhuTab.topTh" :key="index">
        <grid-item 
        v-for="(item, index) of tab" :key="index" 
        :class="{'selected bg-theme-color font-theme-color': topIndex == item.id}"
        @click.native="topIndex = item.id"
        >
          {{item.name}}
        </grid-item>
      </grid>
      <grid :show-lr-borders="false">
        <grid-item v-for="(item, index) of luzhuTab.topTr1" :key="item + index">
          {{item}}
        </grid-item>
      </grid>
      <grid :show-lr-borders="false" class="topTableData">
        <grid-item v-for="(item, index) of topTable" :key="index" v-if="topTable" class="font-theme-color">
          {{item}}
        </grid-item>
      </grid>
      <div class="line"></div>
      <grid :show-lr-borders="false" v-for="(tab, index) of luzhuTab.botTh" :key="'ab' + index" class="botTableTh">
        <grid-item 
        v-for="(item, index) of tab" :key="index" 
        :class="{'selected bg-theme-color font-theme-color': botIndex == item.key}"
        @click.native="botIndex = item.key"
        >
          {{item.name}}
        </grid-item>
      </grid>
      <grid :show-lr-borders="false" :show-vertical-dividers="false" v-for="(tab, index) of botTable" :key="'a' + index" :class="'botTableData botTableData'+index">
        <grid-item 
        class="botTableItem"
        v-for="(item, index) of tab" :key="'b' + index" 
        v-html="item"
        >
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import {XHeader, XTable, Grid, GridItem,LoadMore} from 'vux'
  import {luzhuTabs} from '@/methods'
  import Scroll from '@/components/common/scroll'
  export default {
    name: 'LuZhu',
    components: {XHeader, XTable, Grid, GridItem,LoadMore},
    data () {
      return {
        listTop: [],
        listBot: {},
        moreLoading: true,
        isNoData:false,
        topIndex: 0,
        botIndex: 'num'
      }
    },
    methods: {
      ...mapActions(['homeIndexInit'])
    },
    mounted() {
      setTimeout(() => {
        this.homeIndexInit({code: this.code, actions: 'dew'})
        .then(res=>{
          if(res.resCode === 1000){
            this.listTop = res.data.dew && res.data.dew.top_dew;
            this.listBot = res.data.dew && res.data.dew.bottom_dew;
            this.moreLoading = false;
            if(JSON.stringify(this.listBot) == '{}' || !this.listBot){
              this.isNoData = true;
            }
          }
        })
      }, 20);
    },
    computed: {
      ...mapState(['user', 'code']),
      luzhuTab() {
        return luzhuTabs(this.code) || [];
      },
      topTable() {
        return this.listTop && this.listTop[this.topIndex] || 0;
      },
      botTable() {
        var data = this.listBot && this.listBot[this.botIndex] || null;
        if(!data){return null}
        if(typeof data[0] !== 'string'){
          data = data[this.topIndex];
        }
        var res = [[],[]];
        for(var i=0; i<data.length; i++){
          if(i < 15){
            res[0].push(data[i]);
          }else{
            res[1].push(data[i]);
          }
        }
        return res;
      }
    }
  }
</script>

<style scoped lang="scss">  
  @import '@/assets/css/public.scss';
  .vux-header {
    background: $public-header-background-color;
  }
  .notice-no-data {
    text-align: center;
    padding: px2rem(16px);
    color: #999;
    font-size: px2rem(24px);
  }
  .timeTd {
    width: px2rem(160px);
  }
  .luzhu {
    font-size: px2rem(24px);
    .weui-grid {
      text-align: center;
      padding: px2rem(12px);
      background: #fff;
      color: #555;
    }
    .selected {
      background: #51a4fb;
      color: #fff;
    }
  }
  .topTableData { 
    a {
      // color: #fc284f !important;
    }
  }
  .line {
    height: px2rem(24px);
    border-bottom: 1px solid #f2f1f1;
  }
  .botTableData {
    a {
      background: rgba($color: #000000, $alpha: 0) !important;
    }
    .weui-grid:after {
      border-bottom: none;
    }
    .botTableItem {
      color: #fff;
    }
  }
  .botTableData0 {
    background: linear-gradient(90deg, #b4d9ff, #51a4fb);
  }
  .botTableData1 {
    background: linear-gradient(90deg, #51a4fb, #0069d7);
    padding-bottom: px2rem(28px);
    .botTableItem {
      &:nth-last-of-type(1){
        &::after{
          content: '新';
          color: orange;
          transform: none;
        }
      }
    }
  }

</style>
