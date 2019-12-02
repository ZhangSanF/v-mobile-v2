<template>
    <div class="qipai">
      <x-header :left-options="{backText: ''}" class="public-header-background-color public-header-boxShadow">棋牌游戏</x-header>
      <div class="qipaiSourceTabs">
        <button-tab v-model="sourceIndex">
          <button-tab-item
            v-for="(item, index) of sourceTabs"
            :key="index"
            @on-item-click="changeQipaiSource(item)">{{item == 'kaiyuan' ? '开元棋牌' : baseInfo.dfqipai_name}}</button-tab-item>
        </button-tab>
      </div>
      <scroll class="content" :click="false" :data="games">
        <div v-if="source == 'kaiyuan'">
          <grid :cols="3" :show-lr-borders="false">
            <grid-item v-for="(item, index) of games" :key="'a' + index" @click.native="toGame(item.id)">
              <img :src="'/static/images/qipai/g'+ item.id +'.png'" alt="">
              <p>{{item.name}}</p>
            </grid-item>
          </grid>
        </div>
        <div class="dafaContainer" v-if="source == 'dafa'"  @click="toGame(1)">
          <img :src="`/payment/rg_qrcode/${baseInfo.dfqipai_logo}`" alt="">
          <br>
          <span>点击进入游戏大厅</span>
        </div>
      </scroll>
    </div>
</template>

<script>
  import {Grid, GridItem, XHeader, ButtonTab, ButtonTabItem} from 'vux'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import { QIPAI } from '@/config'
  import { Z_STREAM_ERROR } from 'zlib';
  import Scroll from '@/components/common/scroll'

  export default {
      name: 'Qipai',
      components: { Grid, GridItem, XHeader ,Scroll, ButtonTab, ButtonTabItem},
      props: [],
      data () {
          return {
            games: [],
            sourceIndex: 0,
            sourceTabs: [],
            source: '',
          }
      },
      methods: {
        ...mapActions(['homeKaiyuanDoLogin','homeKaiyuanAliveGames']),

        toGame(e) { //进入游戏页
          this.$vux.loading.show({
            text: '加载中'
          });
          this.homeKaiyuanDoLogin({kindId: e, source: this.source})
          .then(res=>{
            this.$vux.loading.hide();
            if(res.resCode === 1000){
              this.$vux.confirm.show({
                title: '进入游戏',
                content: '请点击确认进入棋牌游戏页面',
                onCancel () {
                  _this.$vux.toast.show({
                    text: '已取消',
                    type: 'cancel'
                  })
                },
                onConfirm () {
                  window.location.href = res.data.url;
                }
              })
            }else{
              this.$vux.alert.show({
                title: '进入失败',
                content: `进入游戏失败,请重试或者联系客服处理![${res.msg}]`,
              })
            }
          })
          .catch(err=>{
            this.$vux.loading.hide();
            this.$vux.alert.show({
              title: '进入失败',
              content: `进入游戏失败,请重试或者联系客服处理![${err}]`,
            })
          });
        },
        changeQipaiSource(source) {
          this.source = source;
          this.gamesInit();
        },
        gamesInit() {
          this.$vux.loading.show({
            text: '游戏列表加载中'
          });
          this.homeKaiyuanAliveGames(this.source)
          .then(res=>{
            this.$vux.loading.hide();
            if(res.resCode === 1000){
              var list = res.data;
              var arr = []; 
              for(var k of list){
                arr.push({
                  id: k.id,
                  name: k.name,
                });
              }
              this.games = arr;
            }else{
              var _this = this;
              this.$vux.alert.show({
                title: '进入失败',
                content: `游戏列表获取失败, ${res.msg}`,
                onHide() {
                  _this.$router.go(-1);
                },
              })
            }
          })
          .catch(err=>{
            this.$vux.loading.hide();
            var _this = this;
            this.$vux.alert.show({
              title: '进入失败',
              content: `游戏列表获取失败, ${err}`,
              onHide() {
                _this.$router.go(-1);
              },
            })
          });
        }
      },
      mounted() {
          setTimeout(()=>{
            console.log(this.baseInfo);
            this.sourceTabs = [];
            if(this.baseInfo.is_open_kaiyuan == 1){this.sourceTabs.push('kaiyuan');}
            if(this.baseInfo.is_open_dafa == 1){this.sourceTabs.push(['dafa']);}
            this.source = this.sourceTabs[0];
            this.gamesInit();
          }, 20)
      },
      computed: {
          ...mapState(['qipai', 'baseInfo']),
      },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import '@/assets/css/public.scss';
  .qipai {
    overflow: hidden;

    .qipaiSourceTabs {
      margin: px2rem(10px) px2rem(20px);
    }

    .dafaContainer {
      text-align: center;
      padding: px2rem(200px) 0;
      img {
        width: 80%;
      }
      span {
        font-size: px2rem(48px);
        color: #c5c5c5;
      }
    }
  }

.public-header-background-color {
  height: px2rem(92px);
}
  .content {
    overflow: hidden;
    position: absolute;
    top: px2rem(168px);
    bottom: 0;
    width: 100%;
    .weui-grids {
      text-align: center;
      img {
        width: 90%;
        height: px2rem(189px);
        display: block;
      }
      p {
        font-size: px2rem(24px);
        color: #555;
      }
    }
  }
  
</style>
