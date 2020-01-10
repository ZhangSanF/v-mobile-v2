<template>
  <div class="dradew">
    <div class="tabsContent">
      <flexbox :gutter="0">
        <flexbox-item :span="1/2" :order="1" :class="{'selected font-theme-color' : page === 1}" @click.native="toPage(1)">
          <span class="tabText">露珠</span>
        </flexbox-item>
        <flexbox-item :span="1/2" :order="2" :class="{'selected font-theme-color' : page === 2}" @click.native="toPage(2)">
          <span class="tabText">长龙</span>
        </flexbox-item>
      </flexbox>
      <chang-long v-if="page === 2"></chang-long>
      <lu-zhu v-if="page === 1"></lu-zhu>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import {XHeader, XTable, Flexbox, FlexboxItem} from 'vux'
  import Scroll from '@/components/common/scroll'
  import ChangLong from './ChangLong'
  import LuZhu from './LuZhu'
  export default {
    name: 'DraDew',
    components: {XHeader, XTable, Flexbox, FlexboxItem, ChangLong, LuZhu},
    data () {
      return {
        page: 1,
      }
    },
    methods: {
      ...mapActions(['homeIndexInit']),

      toPage(e) {
        this.page = e;
      }
    },
    mounted() {
      setTimeout(() => {
        this.code = this.$route.query.code;
      }, 20);
    },
    computed: {
      ...mapState(['user']),
    }
  }
</script>

<style scoped lang="scss">  
  @import '@/assets/css/public.scss';
  .vux-header {
    background: $public-header-background-color;
  }
  .dradew {
    height: 100%;
    background-color: #fff;
  }
  .dradew, .tabText {
    font-size: px2rem(24px);
  }
  .notice-no-data {
    text-align: center;
    padding: px2rem(30px);
    color: #999;
    font-size: px2rem(24px);
  }
  .timeTd {
    width: px2rem(160px);
  }
  .tabsContent {
    .vux-flexbox-item {
      padding: px2rem(12px) 0;
      text-align: center;
      background: #ddd;
      color: #555;
      font-size: px2rem(24px);
    }
    .selected {
      background: #eee;
      color: #1d83d9;
    }
  }
</style>
