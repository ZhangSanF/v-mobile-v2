<template>
  <div class="info">
    <load-more :tip="'正在加载更多数据'" v-if="moreLoading"/>
    <p v-else-if="moreLoading && !moreLoading" class="notice-no-data">暂无长龙数据</p>
    <scroll v-else class="scroll" :data="list"> 
      <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>号码</th>
            <th>期数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of list" :key="index" >
            <td class="timeTd">{{item.cn_name}}</td>
            <td>{{item.total}}</td>
          </tr>
        </tbody>
      </x-table>
    </scroll>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import {XHeader, XTable,LoadMore} from 'vux'
  import Scroll from '@/components/common/scroll'
  export default {
    name: 'ChangLong',
    components: {XHeader, XTable, Scroll,LoadMore},
    data () {
      return {
        list: {},
        moreLoading:true,
        isNoData:false,
      }
    },
    methods: {
      ...mapActions(['homeIndexInit'])
    },
    mounted() {
      setTimeout(() => {
        this.homeIndexInit({code: this.code, actions: 'dragon'})
        .then(res=>{
          if(res.resCode === 1000){
            this.list = res.data.dragon;
            this.moreLoading = false;
            if(JSON.stringify(this.list) == '{}'){
              this.isNoData = true;
            }
          }
        })
      }, 20);
    },
    computed: {
      ...mapState(['user', 'code']),
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
    width: px2rem(320px);
  }
</style>
