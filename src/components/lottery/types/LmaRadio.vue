<template>
  <div class="lma-radio">
    <tab bar-active-color="#668599" v-if="data && data.length">
      <tab-item
      v-for="(item, index) of data" :key="index"
      @click.native="radioChange(index, item)"
      :selected="index == lmaIndex"
      v-if="item.play != 'LLLTZT3@' && item.play != 'LLLTZZ2@'"
      :class="['radioItem', {selected : index == lmaIndex}]"
      >{{item.desc}}</tab-item>
    </tab>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {Flexbox, FlexboxItem, Tab, TabItem} from 'vux'
  export default {
    name: 'LmaRadio',
    components: {Flexbox, FlexboxItem, Tab, TabItem},
    props: ['data'],
    data() {
      return {
        lmaIndex: 0,
      }
    },
    mounted() {
      setTimeout(() => {
        this.lmaIndex = 0;
        this.$emit('lmaIndexChanged', this.lmaIndex);
      }, 20);
    },
    methods: {
      radioChange(i, item) {
        this.lmaIndex = i;
      },
    },
    computed: {
      ...mapGetters(['codeAndPlay']),
    },
    watch: {
      lmaIndex() {
        this.$emit('lmaIndexChanged', this.lmaIndex);
        this.$store.commit('DELETE_ALL_CHECKED_DATA');
      }
    }
  }

</script>

<style scoped lang="scss">
  .odds {
    color: rgb(248, 78, 26) !important
  }
  .lma-radio {
    width: 100%;
    font-size: px2rem(24px);
    /deep/ .vux-flexbox-item {
      text-align: center;
      height: px2rem(29px) !important;
      line-height: px2rem(29px);
    }
    .vux-flex-row {
      overflow: auto;
    }
    .radioItem {
      display: inline-block;
      background: #e4e4e4;
      width: 100%;
      height: 100%;
      color: #888;
    }
    .radioItem.selected {
      background: #fd3649;
      color: #fff;
    }
    /deep/ .vux-tab-wrap {
      padding-top: px2rem(24px);
      .vux-tab-container {
        height: px2rem(24px);
      }
    }
    /deep/ .vux-tab {
      height: px2rem(24px);
      .vux-tab-item {
        line-height: px2rem(24px);
        font-size: px2rem(24px);
      }
      .vux-tab-ink-bar {
        display: none !important;
      }
      .vux-tab-selected {
        color: #fff;
      }
    }
  }
  

</style>
