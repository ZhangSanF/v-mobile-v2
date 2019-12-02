<template>
  <div class="bet-page">
    <scroll class="wrapper left " :scrollId="'left'">
        <div class="content-wrapper">
          <p v-for="(item, key,index) in pages" @click="changePlay(item,key)" :key="index" 
          :class="['links', {'link-active': play == key}, {'hasChecked' : checkedDataKeys[key] &&  checkedDataKeys[key].length > 0},{'checked':betOrders.length>0&& getKey(key)}]"
          >{{item.name}}</p>
        </div>
    </scroll>

    <scroll class="wrapper right" v-if="gameDataCount && isShow" :type="type" :tap="true"  :data="gameDataCount"  :scrollId="'gameScrollArea'">
        <router-view  class="content-wrapper"></router-view>
    </scroll>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import scroll from '@/components/common/scroll'
  import {betInit, PAGES, GAMES} from '@/config'
  import { setTimeout } from 'timers';
  export default {
    name: 'Game',
    components: { scroll },
    data(){
      return {
        isShow: true
      }
    },
    mounted(){
      this.$nextTick(()=>{
        let curItem={};
        let curPlay = "";
        let num =0;
        for(var key in this.pages){
          num++;
          if(num<=1){
            console.log(this.pages[key])
            curItem=this.pages[key];
            curPlay = key;
          }
          
        }
        // this.changePlay(curItem,curPlay);
      });
    },
    methods: {
      changePlay(item,play) {
        this.$store.dispatch('changePlay', play);
        this.$router.push(`/lottery/${this.code}/${item.lt}`);
      },
      getKey(key){
        let flag = false;
        this.betOrders.forEach(item=>{
          if(item.key == key){
            flag = true;
          }
        });
        return flag;
      }
    },
    watch:{
      play:function(){
        this.isShow = false;
        setTimeout(()=>{
          this.isShow = true;
        },50)
      }
    },
    computed: {
      ...mapState(['code', 'play', 'checkedDataKeys']),
      ...mapGetters(['gameData','betOrders']),
      gameDataCount() {
        return _.values(this.gameData);
      },
      pages() {
        return GAMES[this.code].count;
      },
      type() {
        return this.play;
      }
    }
  }

</script>

<style scoped lang="scss">
  .bet-page {
    height: 100%;
  }
  p {
    padding: 0;
    margin: 0 !important;
  }
  .left {
    width: px2rem(190px);
    font-size: px2rem(24px);
    background: #f1f1f1;
    border-right: 1px solid #ededec;
    box-sizing: border-box;
    overflow: hidden;
  }
  .wrapper {
    display: inline-block;
    height: 100%;
  }
  .right {
    position: absolute;
    left: px2rem(190px);
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
  .links {
    padding: px2rem(15px) 0;
    color: #666;
    font-size: px2rem(24px);
    border-bottom: 1px solid #dddddd;
    box-sizing: border-box;
    position: relative;
    padding-left: px2rem(38px);
    &::before{
      content: '';
      display: block;
      width: px2rem(18px);
      height: px2rem(18px);
      top: px2rem(5px);
      bottom: 0;
      left: px2rem(10px);
      margin: auto 0;
      background-color: #666;
      border-radius: 50%;
      position: absolute;
    }
    &.link-active{
      border-bottom:2px solid #51a4fb;
      color: #51a4fb;
    }
    &.checked{
      &::before{
        background-color: #51a4fb;
      }
    }
  }
  .hasChecked {
    /*border-left: px2rem(6px) solid orange;*/
  }

</style>
