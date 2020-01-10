<template>
  <div class="chat content">

    <div class="cards">
      <div class="cardItem" @click="toPage('/preferential')">
        <p class="iconContainer youhui">
          <span class="iconfont icon-fuwudating_default"></span>
        </p>
        <p class="cardText">优惠大厅</p>
      </div>
      <div class="cardItem" @click="toPage('/home/games')">
        <p class="iconContainer games">
          <span class="iconfont icon-game_default"></span>
        </p>
        <p class="cardText">游戏大厅</p>
      </div>
      <div class="cardItem" @click="toPage('/user/reportdate')">
        <p class="iconContainer zoushi">
          <span class="iconfont icon-zhanghu_default"></span>
        </p>
        <p class="cardText">个人报表</p>
      </div>
      <div class="cardItem" @click="toPage('/user/Plan')">
        <p class="iconContainer plan">
          <span class="iconfont icon-kaijiangshuju"></span>
        </p>
        <p class="cardText">专家计划</p>
      </div>
    </div>

    <div class="notice" @click="toPage('/User/message?type=1')">
      <span class="iconfont icon-xiaoxi_default"></span>
      <marquee class="noticeDetail" behavior="scroll" direction="left">{{announcementText}}</marquee>
    </div>

    <div class="chatArea">
      <chat-room :msg_content="''"></chat-room>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Scroll from '@/components/common/scroll'
  import ChatRoom from './lottery/ChatRoom'
  import {
    setTimeout
  } from 'timers';
  import {Loading, TransferDom} from 'vux'

  export default {
    name: 'Chat',
    components: {Loading, Scroll, ChatRoom},
    directives: {TransferDom},
    data() {
      return {
        moneyShow: false,
        loadingShow: false,
        loadingText: '加载中',
        scrollDatas: []
      }
    },
    methods: {
      ...mapActions(['homeIndexInit']),
      toPage(url) {
        this.$router.push(url);
      },
    },
    mounted() {
      setTimeout(() => {
        this.$emit('tabsChange', 'account');
        this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      }, 50);
    },
    computed: {
      ...mapState(['user', 'announcement']),
      announcementText() {
        if (this.announcement.length) {
          var res = [];
          for (var i = 0; i < this.announcement.length; i++) {
            this.announcement[i].data&& this.announcement[i].data.forEach((item,index)=>{
              res.push(`${i+1}.${index+1}. ${item.content}`);
            })
            
          }
          return res.join("; ");
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .chat {
    background-color: rgb(237, 237, 237);
    height: 100%;
  }

  .notice {
    height: px2rem(60px);
    line-height: px2rem(28px);
    padding: px2rem(12px);
    background-color: #fff;
    box-sizing: border-box;

    .icon-xiaoxi_default {
      font-size: px2rem(40px);
      vertical-align: middle;
      color: #43ADF8;
      text-align: center;
    }

    .noticeDetail {
      width: 90%;
      vertical-align: middle;
      color: #333;
      font-size: px2rem(24px);
    }
  }

  .cards {
    height: px2rem(180px);
    display: flex;
    background-color: #51a4fb;
    justify-content: space-around;
    /*padding: 0 0 px2rem(12px) 0;*/
    box-sizing: border-box;

    .cardItem {
      width: px2rem(214px);
      border-radius: px2rem(10px);
      color: #999;
      text-align: center;
      font-size: px2rem(24px);
      padding: px2rem(26px);
      box-sizing: border-box;

      .iconContainer {
        display: inline-block;
        width: px2rem(90px);
        height: px2rem(90px);
        background-color: #fff;
        border-radius: px2rem(45px);
        line-height: px2rem(90px);

        span {
          font-size: px2rem(50px);
        }

        &.youhui {
          color: #1D87FC;
          zoom: .9;
        }

        &.games {
          color: #F68733;
        }

        &.zoushi {
          zoom: .8;
          color: #FC655D;
        }

        &.plan {
          color: #fc53ac;
        }
      }

      .cardText {
        margin-top: px2rem(16px);
        color: #fff;
      }
    }
  }

  .chatArea {
    position: absolute;
    top: px2rem(240px);
    bottom: 0;
    width: 100%;
  }

</style>
