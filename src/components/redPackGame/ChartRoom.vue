<template>
  <div class="chartRoom" v-if="curGroup.title">
    <x-header
      ref="xheader"
      @on-click-back="exitRoom"
      :left-options="{backText: '',preventGoBack:true}"
      class="public-header-background-color public-header-boxShadow"
    >
      {{curGroup.title}}
      <img
        src="../../assets/images/redPackGame/ic_reward.png"
        class="ic_reward"
        @click="SendRedPackFunc"
        slot="right"
        alt="发红包"
      />
      <img
        src="../../assets/images/redPackGame/ic_group_info.png"
        class="ic_group_info"
        @click="toPage('redPack/groupInfo')"
        slot="right"
        alt="群信息"
      />
    </x-header>
    <scroll
      class="content"
      :pulldown="true"
      :pullup="true"
      :type="'onlyEnd'"
      @topRefresh="getMoreMsg"
      @scrollToEnd="scrollToEnd"
      ref="msgcontent"
      :class="{'showMore':showMore}"
      :click="false"
      :data="msgList"
    >
      <ul>
        <li
          v-for="(item,index) in msgList"
          :key="index"
          v-show="isShowItem(item)"
          :class="{'myself': item.clientId == redPackGameClientId }"
        >
          <img
            :src="item.headerImg"
            v-if="item.content.type != 'niuniu'"
            @click="avatarClick(item)"
            class="userHeader"
            onerror="this.src = '/static/images/default_avatar.png'"
            alt="用户头像"
          />

          <div class="msgContent">
            <div
              class="useraName"
              v-if="item.content.type != 'niuniu' && item.clientId != redPackGameClientId"
            >
              {{item.nickname}}
              <span>{{item.time}}</span>
            </div>
            <div
              class="useraName"
              v-if="item.content.type != 'niuniu' && item.clientId == redPackGameClientId"
            >
              <span>{{item.time}}</span>
              {{item.nickname}}
            </div>
            <div v-if="item.type == 'string'" class="msg" v-html="emojiMatch(item.content)"></div>
            <div v-else-if="item.type == 'win_result' && curGroup.game_type == 3" class="msg">
              <p>发包用户：【{{item.content.name}}】</p>
              <p>发包金额：【￥{{item.content.amount}}】</p>
              <p>发包数量：【{{item.content.count}}】</p>
              <p>红包玩法：【{{item.content.play_name}}】</p>
              <p>埋雷号码：【{{item.content.code}}】</p>
              <p>中雷数量：【{{item.content.win_count}}】</p>
              <p>红包赔率：【{{parseFloat(item.content.odds).toFixed(2)}}】</p>
              <p>奖励金额：【￥{{parseFloat(item.content.prize).toFixed(2)}}】</p>
            </div>
            <div v-else-if="item.type == 'win_result' && curGroup.game_type == 2" class="nnBox">
              <div class="result">
                <img
                  class="bank"
                  v-show="item.content.protagonStatus == 1"
                  src="../../assets/images/redPackGame/ic_bank_fail.png"
                  alt
                />
                <img
                  class="bank"
                  v-show="item.content.protagonStatus == 2"
                  src="../../assets/images/redPackGame/ic_bank_win.png"
                  alt
                />
                <div class="bottomTips">
                  <div>
                    庄赢
                    <span class="red">{{item.content.protagonistNum}}</span>
                  </div>
                  <i>|</i>
                  <div>
                    闲赢
                    <span class="red">{{item.content.costarNum}}</span>
                  </div>
                </div>
              </div>
              <div class="infos" @click="changeIsShowDetail(true,item)">
                <img
                  class="userHead"
                  :src="item.headerImg"
                  onerror="this.src = '/static/images/default_avatar.png'"
                  alt
                />
                <div class="userInfoBox">
                  <div class="nickname">{{item.nickname}}</div>
                  <div>
                    <img class="cowbank" src="../../assets/images/redPackGame/ic_cow_bank.png" alt />
                    <span class="redMoneyImg" :class="['cow'+item.content.niuSize]"></span>
                  </div>
                </div>
                <div class="lookMore">查看详情 ></div>
              </div>
            </div>
            <div v-else-if="item.type == 'red'" class="redpack" @click="openRedPackFunc(item)">
              <red-pack-style :msgObj="item" :curGroup="curGroup" :class="{'onOpen':item.isOpen}" />
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <div class="sendBox" :class="{'showMore':showMore}">
      <!-- <input class="chatTextArea" v-model="msgText"> -->
      <textarea class="chatTextArea" cols="28" rows="2" v-model="msgText"></textarea>
      <img
        class="imgBtn btn"
        v-show="!showEmojiFlag"
        @click="showEmoji(true)"
        src="../../assets/images/redPackGame/rc_emotion_toggle.png"
        alt
      />
      <img
        class="imgBtn btn"
        v-show="showEmojiFlag"
        @click="showEmoji(false)"
        src="../../assets/images/redPackGame/rc_keyboard.png"
        alt
      />
      <img
        class="imgBtn btn"
        v-show="!msgText"
        @click="showFunc(!showFuncFlag)"
        src="../../assets/images/redPackGame/rc_ext_plugin_toggle.png"
        alt
      />
      <button class="btn sendBtn" v-show="msgText" @click="redPackGameChatRoomSendMsgFunc">发送</button>
      <swiper
        ref="swiper"
        :show-dots="true"
        height="500px"
        v-show="showEmojiFlag"
        dots-position="center"
      >
        <swiper-item v-for="(item, index) in 1" :key="index">
          <ul class="emojiList">
            <li v-for="(estr,key) in emoji_list" :key="key">
              <i class="Emoji" @click="addEmoji(estr, index)" :class="'emoji-' + estr"></i>
            </li>
            <li>
              <i class="Emoji emoji-del" @click="delEmoji"></i>
            </li>
          </ul>
        </swiper-item>
      </swiper>
      <swiper
        ref="swiper"
        :show-dots="true"
        height="200px"
        v-show="showFuncFlag"
        dots-position="center"
      >
        <swiper-item>
          <ul class="funcList">
            <!-- <li>
              <img class="icon" src="../../assets/images/redPackGame/ic_tab_reward.png" alt />
              <p>福利</p>
            </li>-->
            <li @click="SendRedPackFunc">
              <img class="icon" src="../../assets/images/redPackGame/ic_tab_red.png" alt />
              <p>红包</p>
            </li>
            <li @click="jumpRule(1)">
              <img class="icon" src="../../assets/images/redPackGame/icon_plugin_rp.png" alt />
              <p>玩法</p>
            </li>
            <li @click="jumpRule(2)">
              <img class="icon" src="../../assets/images/redPackGame/ic_tab_rule.png" alt />
              <p>群规</p>
            </li>
          </ul>
        </swiper-item>
      </swiper>
    </div>
    <div class="sendBoxPop" v-show="showMore" @click="closeSendBox"></div>
    <OpenRedPack
      v-show="showRedPack"
      :showRedPack="showRedPack"
      @changeIsShow="changeIsShowDetail"
      :closeRedPackModal="closeRedPackModal"
      :seeEveryonesLuck="seeEveryonesLuck"
      :userInfo="userInfo"
      :recordId="recordId"
      :userData="userData"
      class="openRedPack"
    ></OpenRedPack>
    <SendRedPack :showSendRedPack="showSendRedPack" @showPopup="closePopup" :id="roomId"></SendRedPack>

    <div class="gameRule chongzhi" @click="payMomoney">
      <img src="../../assets/images/redPackGame/icon_cz_record.png" alt />
      <p>充值</p>
    </div>

    <div class="gameRule flootBtn" @click="toRule">
      <img src="../../assets/images/redPackGame/icon_item_home .png" alt />
      <p>首页</p>
    </div>

    <div class="historyTable flootBtn" @click="toHistoryTable">
      <img src="../../assets/images/redPackGame/icon_item_wdbb.png" alt />
      <p>报表</p>
    </div>

    <div class="goBottom" v-show="unreadMsgCount>0" @click="msgAutoScroll">
      <span class="msgCount">{{unreadMsgCount}}</span>
      <span class="iconfont icon-xiala1"></span>
    </div>
    <red-pack-detail
      v-show="isShowDetail"
      :isShowDetail="isShowDetail"
      @changeIsShow="changeIsShowDetail"
      @refreshDetail="changeIsShowDetail"
      :refreshRedPackDetail="refreshRedPackDetail"
      :detailList="detailList"
      :recordId="recordId"
      :userInfo="userInfo"
      :curInfo="userData"
    />
  </div>
</template>

<script>
import { XHeader, Swiper, SwiperItem } from "vux";
import OpenRedPack from "./openRedPack";
import RedPackStyle from "./redPackStyle";
import RedPackDetail from "./RedPackDetail";
import SendRedPack from "./SendRedPack";
import Bus from "../../assets/js/eventBus";
import Scroll from "@/components/common/scroll";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  naem: "ChartRoom",
  data() {
    return {
      msgText: "",
      showMore: false,
      showEmojiFlag: false,
      showFuncFlag: false,
      lastMaxScrollY: 0,
      isShowDetail: false,
      recordId: "",
      emoji_list: [
        "smile",
        "laughing",
        "blush",
        "heart_eyes",
        "smirk",
        "flushed",
        "grin",
        "kissing_smiling_eyes",
        "wink",
        "kissing_closed_eyes",
        "stuck_out_tongue_winking_eye",
        "sleeping",
        "worried",
        "sweat_smile",
        "cold_sweat",
        "joy",
        "sob",
        "angry",
        "mask",
        "scream",
        "sunglasses",
        "thumbsup",
        "clap",
        "ok_hand"
      ],
      showRedPack: false, // 是否显示红包
      userInfo: {}, //用户信息
      msgList: [], //消息列表
      msgType: "string", //消息类型
      curGroup: {}, //当前群
      showSendRedPack: false, //发红包
      pageSize: 50,
      chatId: "",
      unreadMsgCount: 0,
      userData: {},
      curGame: {},
      detailList: [],
      curObj: {},
      refreshRedPackDetail: {},
      isShowOPenPopTrue: false
    };
  },
  props: ["roomId"],
  mounted() {
    this.$nextTick(() => {
      this.redPackGameChatRoomGetChatLogFunc(this.roomId, this.chatId);
      this.redPackGameChatRoomJoinRoomFunc();
      this.redPackGameBaseInfo.groupList.forEach(item => {
        if (item.id == this.roomId) {
          this.curGroup = item;
        }
      });

      this.redPackGameBaseInfo.gameInfo.forEach(item => {
        if (item.id == this.curGroup.game_id) {
          this.curGame = item;
        }
      });
    });

    Bus.$on("getMsg", msg => {
      switch (msg.type) {
        case "string":
        case "red":
        case "win_result":
          if (this.roomId == msg.roomId) {
            this.msgList.push(msg);
            var list = this.$refs.msgcontent;
            if (list && list.scroll.y - list.scroll.maxScrollY > 500) {
              this.unreadMsgCount++;
            } else {
              this.msgAutoScroll();
            }
          }
          break;
        case "remove_result":
          this.deleteMsg(msg);
          break;
        case "red_prize_notify":
          this.refreshRedPackDetail = msg;
          break;
      }
    });
  },
  methods: {
    ...mapActions([
      "redPackGameChatRoomGetChatLog",
      "redPackGameChatLeaveRoom",
      "redPackGameChatRoomSendMsg",
      "redPackGameChatRoomJoinRoom",
      "redPackGameGameDetail",
      "redPackGameJumpRule"
    ]),

    // 后台删除消息
    deleteMsg(data) {
      for (let i in this.msgList) {
        if (this.msgList[i].chatId == data.chatId) {
          this.$delete(this.msgList, i);
        }
      }
    },

    isShowItem(item) {
      let curItem = false;
      switch (item.type) {
        case "string":
        case "red":
        case "win_result":
          curItem = true;
          break;
      }
      return curItem;
    },

    changeIsShowDetail(flag, obj) {
      if (flag) {
        this.isShowOPenPopTrue = true;
        if (obj) {
          this.curObj = obj;
        }
        this.openRedPackFunc(this.curObj);
      } else {
        this.isShowOPenPopTrue = false;
        this.isShowDetail = flag;
      }
    },

    payMomoney() {
      this.$router.push("/money/pay");
    },

    scrollToEnd(y) {
      if (y <= this.$refs.msgcontent.scroll.maxScrollY) {
        this.unreadMsgCount = 0;
      }
    },

    SendRedPackFunc() {
      if (this.curGame.id) {
        this.showSendRedPack = true;
      } else {
        this.$vux.alert.show({
          title: "提示",
          content: `功能暂未开放`
        });
      }
    },

    redPackGameChatRoomJoinRoomFunc() {
      if(!this.redPackGameClientId){
        setTimeout(() => {
          this.redPackGameChatRoomJoinRoomFunc();
        }, 1000);
        return;
      }
      let params = {
        roomId: this.roomId,
        clientId: this.redPackGameClientId
      };
      this.redPackGameChatRoomJoinRoom(params).then(res => {
        if (res.resCode == 1000) {
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },

    toRule() {
      this.redPackGameChatLeaveRoom({
        roomId: this.roomId,
        clientId: this.redPackGameClientId
      });
      this.$router.push("/");
    },

    toHistoryTable() {
      this.$router.push(`/redPack/historyTable/${this.curGroup.game_type}`);
    },

    emojiMatch(str) {
      if (typeof str == "object") return;
      var reg = /\[emoji-([A-Za-z0-9_]*)\]/g;
      var str1 = str.replace(reg, '<i class="Emoji emoji-$1"></i>');
      if (str1.indexOf("#_#") >= 0) {
        //换行处理
        return str1.split("#_#").join("<br>");
      }
      return str1;
    },

    getMoreMsg() {
      this.redPackGameChatRoomGetChatLogFunc(this.roomId, this.chatId);
    },

    // 玩法规则跳转(玩法1，规则2)
    jumpRule(typeId) {
      this.redPackGameJumpRule({
        gameId: this.curGroup.game_id,
        typeId: typeId
      }).then(res => {
        if (res.resCode == 1000) {
          this.$router.push(`/redPack/ruleInfo/${res.data}`);
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },

    // 获取聊天记录
    redPackGameChatRoomGetChatLogFunc(roomId, chatId) {
      let params = {
        roomId: roomId,
        pageSize: this.pageSize,
        chatId: chatId || ""
      };
      this.redPackGameChatRoomGetChatLog(params).then(res => {
        if (res.resCode == 1000) {
          if (res.data.length > 0) {
            this.chatId = res.data[0].chatId;
          }
          if (this.msgList.length <= 0) {
            this.msgList = res.data;
            this.msgAutoScroll();
          } else {
            this.msgList = res.data.concat(this.msgList);
            setTimeout(() => {
              this.$refs.msgcontent.scrollTo(
                0,
                this.$refs.msgcontent.scroll.maxScrollY - this.lastMaxScrollY,
                0
              );
              this.lastMaxScrollY = this.$refs.msgcontent.scroll.maxScrollY;
            }, 550);
          }
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },

    // 消息自动滚动
    msgAutoScroll() {
      this.unreadMsgCount = 0;
      setTimeout(() => {
        var list = this.$refs.msgcontent;
        if (list && list.scroll) {
          this.lastMaxScrollY = list.scroll.maxScrollY;
          list.scrollTo(0, list.scroll.maxScrollY, 300);
        } else {
          this.msgAutoScroll();
        }
      }, 50);
    },

    // 发送消息
    redPackGameChatRoomSendMsgFunc() {
      let params = {
        type: this.msgType, //消息类型
        roomId: this.roomId, //房间号
        content: this.msgText, //消息内容(发送图片时，此字段可不填)
        clientId: this.redPackGameClientId
      };
      this.redPackGameChatRoomSendMsg(params).then(res => {
        if (res.resCode == 1000) {
          this.msgText = "";
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },

    toPage(path) {
      this.$router.push(`/${path}/${this.roomId}`);
    },

    addEmoji(item) {
      this.msgText = `${this.msgText}[emoji-${item}]`;
    },

    delEmoji() {
      let str = this.msgText.lastIndexOf("[");
      if (this.msgText.lastIndexOf("]") != this.msgText.length - 1) {
        let newStr = this.msgText.slice(0, -1);
        this.msgText = newStr;
      } else {
        let newStr = this.msgText.slice(0, str);
        this.msgText = newStr;
      }
    },

    showEmoji(flag) {
      this.showMore = flag;
      this.showEmojiFlag = flag;
    },

    closeSendBox() {
      this.showMore = false;
      this.showEmojiFlag = false;
      this.showFuncFlag = false;
      setTimeout(() => {
        this.$refs.msgcontent.refresh();
      }, 50);
    },

    showFunc(flag) {
      if (this.showEmojiFlag) {
        this.showMore = true;
        this.showEmojiFlag = false;
        this.showFuncFlag = true;
      } else {
        this.showMore = flag;
        this.showEmojiFlag = false;
        this.showFuncFlag = flag;
      }
    },
    //关闭红包弹窗
    closeRedPackModal() {
      return (this.showRedPack = false);
    },
    avatarClick(user) {
      if (user.clientId == this.redPackGameClientId) {
        return;
      }
      if (this.msgText.indexOf(`@${user.nickname}`) >= 0) {
        return;
      }
      var n = this.msgText.split("@").length - 1;
      if (n >= 2) {
        this.$vux.alert.show({
          title: "提示",
          content: `一次最多可以@2人`
        });
        return;
      }
      let str = `@${user.nickname} ${this.msgText}`;
      this.msgText = str;
    },
    //查看红包详情
    seeEveryonesLuck() {
      this.isShowDetail = true;
      this.showRedPack = false;
    },
    //打开红包
    openRedPackFunc(obj) {
      this.$vux.loading.show({
        text: "Loading"
      });
      this.curObj = obj;
      this.recordId = obj.content.id;
      this.redPackGameGameDetail(this.recordId).then(res => {
        this.$vux.loading.hide();
        if (res.resCode == 1000) {
          this.userInfo = res.data.info;
          this.detailList = res.data.list;
          this.userData = res.data.user_data;
          this.$set(obj, "isOpen", true);
          if (this.showRedPack || this.isShowOPenPopTrue) {
            this.showRedPack = false;
            this.isShowDetail = true;
          } else {
            this.showRedPack = true;
            this.isShowDetail = false;
          }
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },
    //关闭弹窗
    closePopup(data) {
      this.showSendRedPack = data;
    },

    exitRoom() {
      this.redPackGameChatLeaveRoom({
        roomId: this.roomId,
        clientId: this.redPackGameClientId
      });
      this.$router.back();
    }
  },
  computed: {
    ...mapGetters(["redPackGameClientId", "redPackGameBaseInfo"])
  },
  components: {
    XHeader,
    Scroll,
    OpenRedPack,
    Swiper,
    SwiperItem,
    SendRedPack,
    RedPackStyle,
    RedPackDetail
  }
};
</script>

<style lang="scss" scoped>
.chartRoom {
  font-size: px2rem(24px);
  background-color: #f5f5f5;
  color: #555;
  .public-header-background-color {
    height: px2rem(90px);
    background: linear-gradient(to right, #ff3564, #ff703e);
    /deep/ .vux-header-title {
      line-height: px2rem(100px);
      height: px2rem(90px);
    }
  }
  .userHeader {
    width: px2rem(80px);
    height: px2rem(80px);
    display: block;
    border-radius: 8px;
  }
  .useraName {
    vertical-align: top;
    color: #333;
    padding-left: px2rem(12px);
    span {
      font-size: px2rem(20px);
      color: #bbb;
    }
  }
  .sendBox {
    z-index: 1;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: px2rem(100px);
    padding: px2rem(16px) px2rem(10px) px2rem(10px) px2rem(10px);
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    &.showMore {
      height: px2rem(500px);
    }
    textarea {
      height: px2rem(65px);
      width: px2rem(520px);
      border-radius: px2rem(8px);
      outline: 0;
      vertical-align: middle;
      border: 1px solid #ccc;
      padding: 0 px2rem(10px);
      resize: none;
      font-size: px2rem(28px);
      appearance: none;
    }
    .imgBtn {
      width: px2rem(50px);
    }
    .btn {
      vertical-align: middle;
      margin-left: px2rem(15px);
    }
    .sendBtn {
      background-color: #ff6f3f;
      border: 0;
      color: #fff;
      padding: px2rem(10px) px2rem(20px);
      margin-left: px2rem(5px);
      border-radius: px2rem(8px);
      position: relative;
      top: -1px;
    }
    .emojiList {
      padding: px2rem(30px);
      li {
        display: inline-block;
        margin: px2rem(22px);
      }
    }
    .funcList {
      padding: px2rem(30px);
      li {
        display: inline-block;
        text-align: center;
        margin: px2rem(10px) px2rem(30px);
        color: #666;
        .icon {
          width: px2rem(100px);
        }
      }
    }
  }
  .sendBoxPop {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .ic_reward {
    margin-right: 15px;
    height: px2rem(40px);
  }
  .ic_group_info {
    margin-right: 5px;
    height: px2rem(40px);
  }
  .content {
    overflow: hidden;
    position: absolute;
    background-color: #f5f5f5;
    top: px2rem(90px);
    bottom: px2rem(90px);
    width: 100%;
    &.showMore {
      bottom: px2rem(500px);
    }
    ul li {
      display: flex;
      padding: px2rem(20px);
      .msgContent {
        flex: 1;
        margin-left: px2rem(10px);
      }
      .redpack {
        display: inline-block;
      }
      .msg {
        background-color: #fff;
        word-break: break-all;
        padding: px2rem(15px);
        display: inline-block;
        margin-top: px2rem(10px);
        border-top-right-radius: px2rem(8px);
        border-bottom-right-radius: px2rem(8px);
        border-bottom-left-radius: px2rem(8px);
      }
      .nnBox {
        width: px2rem(400px);
        margin-left: px2rem(90px);
        .result {
          background-image: url("../../assets/images/redPackGame/ic_cow_log.png");
          height: px2rem(168px);
          position: relative;
          background-size: 100% 100%;
          .bank {
            width: px2rem(100px);
            position: absolute;
            left: px2rem(20px);
            top: px2rem(30px);
          }
          .bottomTips {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: px2rem(50px);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            > div {
              flex: 1;
              text-align: center;
              font-size: px2rem(30px);
              font-weight: bold;
              .red {
                color: yellow;
              }
            }
            i {
              font-style: normal;
              color: #fff;
            }
          }
        }
        .infos {
          background-color: #fff;
          display: flex;
          padding: px2rem(10px);
          align-items: center;
          .userHead {
            width: px2rem(80px);
            height: px2rem(80px);
          }
          .userInfoBox {
            margin-left: px2rem(20px);
          }
          .nickname {
            color: #777;
            font-weight: 700;
          }
          .cowbank {
            width: px2rem(80px);
          }
          .lookMore {
            flex: 1;
            text-align: right;
          }
          .redMoneyImg {
            display: inline-block;
            line-height: px2rem(30px);
            height: px2rem(35px);
            width: px2rem(30px);
            vertical-align: top;
            margin-left: px2rem(10px);
            background-size: 17px 17px;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
      &.myself {
        flex-direction: row-reverse;
        clear: both;
        .userHeader {
          float: right;
        }
        .msgContent {
          margin-right: px2rem(10px);
          text-align: right;
        }
        .msg {
          margin-top: px2rem(10px);
          text-align: left;
          word-break: break-all;
          border-top-left-radius: px2rem(8px);
          background-color: #51a4fb;
          color: #fff;
          border-top-right-radius: 0;
        }
      }
    }
  }
  .openRedPack {
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba($color: #000, $alpha: 0.5);
  }
  .flootBtn {
    border-radius: 8px;
  }
  .gameRule {
    position: fixed;
    top: px2rem(250px);
    right: px2rem(20px);
    text-align: center;
    img {
      width: px2rem(100px);
    }
  }
  .chongzhi {
    top: px2rem(100px);
  }
  .historyTable {
    position: fixed;
    top: px2rem(400px);
    right: px2rem(20px);
    text-align: center;
    img {
      width: px2rem(100px);
    }
  }
  .goBottom {
    position: fixed;
    bottom: px2rem(250px);
    right: px2rem(20px);
    border-radius: 50%;
    width: px2rem(100px);
    text-align: center;
    line-height: px2rem(100px);
    height: px2rem(100px);
    background-color: rgba($color: #ddd, $alpha: 0.5);
    .msgCount {
      position: absolute;
      bottom: 0;
      background-color: red;
      width: px2rem(40px);
      height: px2rem(40px);
      display: block;
      color: #fff;
      line-height: px2rem(40px);
      border-radius: 50%;
    }
  }
}
</style>
