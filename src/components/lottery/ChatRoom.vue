<template>
  <div class="chat-room">
    <!--    红包-->
    <div class="black-bg" v-if="redBagStep != 0">
      <!--      红包待开-->
      <div
        class="red-bag-show zoomInDown animated"
        v-if="redBagStep == 1"
        style="animation-delay: .5s"
      >
        <div class="openBtnArea" @click="getRedBag" :class="{rbIsOpening: rbLoading}">
          <img src="../../assets/images/chat/rb-open.png" alt />
        </div>
        <div class="closeBtnArea" @click="redBagBgClick"></div>
        <img src="../../assets/images/chat/rb-8.png" alt />
      </div>

      <!--      红包结果 有金额-->
      <div class="red-bag-show animated tada" v-if="redBagStep === 2" @click="redBagBgClick">
        <span class="moneyText" v-if="redBagMoney">{{redBagMoney}}</span>
        <img src="../../assets/images/chat/rb-2.png" alt />
      </div>
      <!--      红包结果 金额为0-->
      <div class="red-bag-show animated tada" v-if="redBagStep === 3" @click="redBagBgClick">
        <span class="moneyText" v-if="redBagMoney">{{redBagMoney}}</span>
        <img src="../../assets/images/chat/rb-3.png" alt />
      </div>
      <!--      红包结果 失败-->
      <div class="red-bag-show animated tada" v-if="redBagStep === 4" @click="redBagBgClick">
        <span class="failText">{{redBagResult}}</span>
        <img src="../../assets/images/chat/rb-4.png" alt />
      </div>
    </div>

    <!--    聊天内容区-->
    <scroll
      v-if="historyDataDone"
      class="scroll"
      :data="msgListArray"
      ref="msgcontent"
      :listenScroll="true"
      @scroll="chatListScrolled"
    >
      <ul @click="closeEmojiArea">
        <li
          class="type-left Item"
          v-for="(item, index) in msgList"
          :class="userChatId == item.clientId ? 'type-right' : 'type-left'"
          :key="index"
        >
          <div
            class="lay-block"
            v-if="item.content_type == 'str' || item.content_type == 'img' || item.content_type == 'share' || item.content_type == 'gif'"
          >
            <div class="avatar" style="cursor: pointer;" @click="avatarClick(item)">
              <img
                :src="item.header_img || '/static/images/default_avatar.png'"
                onerror="this.src = '/static/images/default_avatar.png'"
              />
            </div>
            <div class="lay-content">
              <div class="msg-header">
                <h4 style="cursor: pointer;">{{item.chat_nickname}}</h4>
                <span></span>
                <span
                  :class="['lvimg user-lv-' + item.chat_level,userChatId == item.clientId ? 'type-right' : 'type-left']"
                ></span>
                <span></span>
                <span class="MsgTime">{{item.send_time.split(' ')[1]}}</span>
              </div>
              <div class="Bubble" v-if="item.content_type == 'str' && item.content">
                <p>
                  <span
                    style="white-space: pre-wrap; word-break: break-all;"
                    v-html="emojiMatch(item.content)"
                  ></span>
                </p>
              </div>

              <div
                class="Bubble"
                :class="'Bubble_'+item.content_type"
                v-if="item.content_type == 'img' || item.content_type == 'gif'"
              >
                <img
                  class="msg-img"
                  :src="item.content"
                  alt="点击放大图片"
                  @click="showChatImg(item.content)"
                />
              </div>
              <div class="Bubble BubbleFollwOrders" v-if="item.content_type == 'share'">
                <div class="follwOrders">
                  <div class="betHeaderBox">
                    <div class="headerBox">
                      <div class="lotteryImg">
                        <img :src="openResult[item.orders.code].pic_address" alt />
                        <span>{{openResult[item.orders.code].name}}</span>
                      </div>
                      <div class="qh">
                        期号：
                        <span>{{item.orders.open_phase}}期</span>
                      </div>
                    </div>
                    <div class="betBox">
                      <div
                        class="timeDown"
                      >封盘：{{timeStampFunc(curTime[item.orders.code+item.chat_id])}}</div>
                      <div
                        class="betBtn"
                        :class="{'unBet':!curTime[item.orders.code+item.chat_id] || curTime[item.orders.code+item.chat_id]<=0}"
                        @click.stop="follwBet(item.orders,curTime[item.orders.code+item.chat_id])"
                      >跟单投注</div>
                    </div>
                  </div>
                  <ul class="orderList">
                    <li
                      v-for="(obj,k) in item.orders.orders"
                      :key="k"
                      v-show="!item.isShowMore?k<1:true"
                    >
                      <div>
                        内容：
                        <span>{{obj.name}}</span>
                      </div>
                      <div>
                        金额：
                        <span>{{obj.money}}元</span>
                      </div>
                    </li>
                  </ul>
                  <div class="showOrClose" v-show="item.orders.orders.length>1">
                    <div
                      @click="item.isShowMore=!item.isShowMore"
                      :class="{'open':item.isShowMore,'close':!item.isShowMore}"
                    >
                      <i class="iconfont icon-shouqi"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lay-block rb-list" v-if="item.content_type == 'list'">
            <p class="rb-list-item">
              恭喜
              <span class="rb-list-nick">{{item.nick}}</span>抢到
              <span class="rb-list-money">{{item.money}}</span>元红包！
            </p>
          </div>
          <div class="lay-block rbItem" v-if="item.content_type == 'rb'">
            <div class="avatar" style="cursor: pointer;">
              <img :src="item.header_img || '/static/images/default_avatar.png'" />
            </div>
            <div class="lay-content">
              <div class="msg-header">
                <h4>红包管理员</h4>
                <span></span>
                <span class="MsgTime">{{item.send_time.split(' ')[1]}}</span>
              </div>
              <div
                @click="showRebPackage(item)"
                class="rbBubble"
                style="background: linear-gradient(to right, rgb(25, 158, 216), rgb(25, 158, 216)); border-left-color: rgb(25, 158, 216); border-right-color: rgb(25, 158, 216); color: rgb(255, 255, 255);"
              >
                <img class="rbImgMini" src="../../assets/images/chat/rb-2.png" alt />
                <span style="white-space: pre-wrap; word-break: break-all;">大吉大利，恭喜发财</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <div v-else class="historyInstallingNotice">
      <p style="text-align:center;">
        <span>
          加载中
          <spinner type="lines"></spinner>
        </span>
      </p>
    </div>

    <div class="emojiArea" v-show="emojiAreaShow">
      <div class="emojiTabs">
        <a
          class="emojiTab"
          :class="{selected: emojiType === 'emoji'}"
          @click="emojiChange('emoji')"
        >emoji</a>
        <a
          class="emojiTab"
          :class="{selected: emojiType === 'gif'}"
          @click="emojiChange('gif')"
          v-if="gifEmojiArray && gifEmojiArray.length"
        >gif表情</a>
      </div>
      <div class="emoji-container" v-if="emojiType === 'emoji'">
        <i
          :key="index"
          v-for="(estr, index) in emoji_list"
          class="Emoji"
          @click="addEmoji(estr, index)"
          :class="'emoji-' + estr"
        ></i>
      </div>
      <div class="gif-emoji-container" v-else>
        <swiper :aspect-ratio="320/750" :dots-position="'bottom'">
          <swiper-item class="swiper-demo-img" v-for="(item, index) in gifEmojiArray" :key="index">
            <div v-for="(col, index) in item" class="gifCol">
              <a class="gifItem" v-for="(emoji, index) of col" @click="chooseGif(emoji)">
                <img :src="emoji.dir" />
                <p>{{emoji.cn_name}}</p>
              </a>
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>

    <!--    底部输入区-->
    <div class="inputArea">
      <div class="inputBtns">
        <span class="iconfont icon-biaoqing1" @click="emojiAreaShow = !emojiAreaShow"></span>
        <span class="icon iconfont icon-tupian" @click="chooseImg"></span>
      </div>
      <textarea
        class="chatTextArea"
        name
        id
        cols="28"
        rows="2"
        ref="chatInput"
        v-model="chatData.msgContent"
      ></textarea>
      <div class="sendBtns">
        <span class="icon iconfont icon-fasong" @click="sendMsg"></span>
      </div>
    </div>

    <div v-viewer v-show="imgShow">
      <img :src="showImgSrc" ref="vViewerClick" style="display:none;" />
    </div>

    <input
      id="imgUploadInput"
      ref="imginput"
      type="file"
      @change="imgChanged"
      accept=".jpg, .png, .gif, .jpeg, image/jpeg, image/png, image/gif"
      style="display: none;"
    />
    <div v-transfer-dom>
      <popup v-model="betShow" position="bottom" height="55%" class="asdfasdfasdfsd">
        <ordersPopup ref="ordersPopupComp" @closePopup="closePopup" @betSuccessed="betSuccessed" />
      </popup>
    </div>

    <div class="regPackGameMsgBox" ref="regPackGameMsgBox">
      <div
        v-for="(item,key) in chearRedPackMsgArr"
        v-show="item.isShow"
        @click="toRedPackGame(item)"
        :class="{'fadeInLeft':item.isShowAni,'fadeOutLeft':!item.isShowAni}"
        :key="key"
        class="regPackGame"
      >
        <p>
          {{item.data.nickname}}发了一个{{item.data.game_type == 1?'扫雷':'牛牛'}}红包！
          <span>抢红包>>></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ordersPopup from "@/components/common/ordersPopup";
import TimeCountComp from "@/components/common/TimeCountComp";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import { timeStamp, countDown, betTime } from "@/methods";
import Vue from "vue";

Vue.use(Viewer);
import {
  Loading,
  XDialog,
  XButton,
  InlineLoading,
  Popup,
  Spinner,
  Swiper,
  SwiperItem,
  TransferDomDirective as TransferDom
} from "vux";
import BScroll from "better-scroll";
import scroll from "@/components/common/scroll";
import { betInit, PAGES, GAMES } from "@/config";
import { setTimeout } from "timers";
import { debug } from "util";

export default {
  name: "ChatRoom",
  directives: {
    TransferDom
  },
  components: {
    scroll,
    BScroll,
    TimeCountComp,
    Loading,
    XDialog,
    XButton,
    Viewer,
    Spinner,
    InlineLoading,
    Popup,
    ordersPopup,
    Swiper,
    SwiperItem
  },
  props: {
    msg_content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      historyDataDone: false, //历史记录加载成功
      showImgSrc: "",
      isOpen: false,
      imgShow: false,
      betShow: false,
      timer: null,
      scrollFlag: true,
      rbLoading: false, //红包等待状态
      resBagId: "", //红包ID
      redBagMoney: "", //抢到金额
      redBagResult: "", //抢红包失败提示
      redBagStep: 0, //抢红包步骤 1抢 2结果 0无红包
      editAvatar: false, //编辑头像区域显示隐藏
      imgUrl: null,
      dialogVisible: false,
      list_pos_bottom: 98,
      disableChat: false,
      setTimeFunc: {},
      curTime: {},
      placeholder: "",
      avadaUrl: require("../../assets/images/chat/default_avatar.png"),
      chatData: {
        msgContent: "",
        imgUrl: ""
      },
      emojiType: "emoji", //当前选中的表情包
      gifEmojiArray: [], //gif表情包
      emojiAreaShow: false, //表情包是否展开
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
      ]
    };
  },
  activated() {
    this.$store.commit("SCROLL_REFRESH");
  },
  mounted() {
    setTimeout(() => {
      this.historyDataDone = false;
      this.$store.commit("CLEAR_CHAT_MSG");
      // 获取聊天记录
      this.homeChatGetChatLog({ nocoming: 1 }).then(res => {
        this.historyDataDone = true;
        setTimeout(() => {
          var list = this.$refs.msgcontent;
          this.startTImeDown();
          setTimeout(() => {
            if (list) list.scrollTo(0, list.scroll.maxScrollY, 300);
          }, 50);
        }, 120);
      });

      // 获取GIF动图表情
      this.homeChatGetGifEmoji().then(res => {
        if (res.resCode === 1000) {
          let colData = this.arrayCut(res.data, 5);
          this.gifEmojiArray = this.arrayCut(colData, 2);
          console.log(this.gifEmojiArray);
        }
      });
    }, 200);
  },
  methods: {
    arrayCut(arr, length) {
      if (length > 0) {
        let resArr = [];
        for (let i = 0; i < arr.length; i++) {
          let k = Math.floor(i / length);
          if (!resArr[k]) {
            resArr[k] = [];
          }
          resArr[k].push(arr[i]);
        }
        return resArr;
      }
    },
    ...mapActions([
      "homeChatGetChatLog",
      "homeChatGetRedPackage",
      "uploadErrorLog",
      "homeChatSendMsgToChatRoom",
      "homeChatGetGifEmoji"
    ]),

    // 去红包游戏房间
    toRedPackGame(item) {
      this.$router.push(`/redPack/chartRoom/${item.data.roomId}`);
    },

    emojiChange(type) {
      this.emojiType = type;
    },

    timeStampFunc(time) {
      return timeStamp(time, ":");
    },

    // 倒计时
    timeDown(item, code) {
      let _self = this;
      clearTimeout(_self.setTimeFunc[code + item.chat_id]);
      if (item.orders.open_phase != this.openResult[code].nextPhase) {
        this.$set(this.curTime, code + item.chat_id, 0);
        return;
      }
      let _run = (_code, chat_id) => {
        _self.setTimeFunc[_code + chat_id] = setTimeout(() => {
          _self.curTime[_code + chat_id]--;
          if (_self.curTime[_code + chat_id] > 0) {
            clearTimeout(_self.setTimeFunc[_code + chat_id]);
            _run(code, item.chat_id);
          } else {
            _self.curTime[_code + chat_id] = 0;
            clearTimeout(_self.setTimeFunc[_code + chat_id]);
          }
        }, 1000);
      };
      _run(code, item.chat_id);
    },

    // 跟投
    follwBet(item, time) {
      setTimeout(() => {
        if (time <= 0) {
          this.$vux.alert.show({
            title: "提示信息",
            content: "当前注单已经过期"
          });
          return;
        }
        this.betShow = true;
        this.$refs.ordersPopupComp.saveOrders(item.orders);
        this.$refs.ordersPopupComp.saveCode(item.code);
      }, 50);
    },

    closePopup() {
      this.$store.commit("DELETE_ALL_CHECKED_DATA"); //清空已选注单列表
      this.betShow = false;
    },

    betSuccessed() {
      let _this = this;
      this.$vux.confirm.show({
        title: "投注成功",
        content: "投注成功，点击“查看注单”可查看投注详情",
        confirmText: "查看注单",
        onConfirm() {
          _this.$store.commit("CHANGE_CODE", _this.code);
          var p = GAMES[_this.code].play[0];
          let t = GAMES[_this.code].count[p].lt;
          if (_this.$route.path.indexOf("lottery") == -1) {
            _this.$router.push(`/lottery/${_this.code}/${t}?tab=orders`);
          } else {
            _this.$emit("changeTabIndex", "orders");
          }
        }
      });
    },

    chooseGif(item) {
      this.chatData.msgContent = `gif@@${item.en_name}`;
      this.emojiAreaShow = false;
      this.sendMsg();
    },

    addEmoji(item) {
      this.chatData.msgContent = `${this.chatData.msgContent}[emoji-${item}]`;
      this.emojiAreaShow = false;
    },
    closeEmojiArea() {
      this.emojiAreaShow = false;
    },
    showRebPackage(e) {
      setTimeout(() => {
        this.redBagStep = 1;
        this.resBagId = e.red_package_id;
      }, 50);
    },
    avatarClick(user) {
      if (user.chat_nickname == this.user.chat_nickname) {
        return;
      }
      if (this.msg_content.indexOf(`@${user.chat_nickname}`) >= 0) {
        return;
      }
      var n = this.msg_content.split("@").length - 1;
      if (n >= 2) {
        this.$vux.alert.show({
          title: "提示",
          content: `一次最多可以@2人`
        });
        return;
      }
      let str = `@${user.chat_nickname} ${this.msg_content}`;
      this.chatData.msgContent = str;
    },
    redBagBgClick() {
      this.redBagMoney = "";
      this.redBagResult = "";
      this.redBagStep = 0;
    },
    getRedBag(e) {
      e.stopPropagation();
      this.rbLoading = true;
      // 获取红包
      this.homeChatGetRedPackage({ red_package_id: this.resBagId }).then(
        res => {
          this.rbLoading = false;
          if (res.resCode === 1000 && parseInt(res.data.grab_amount) > 0) {
            this.redBagStep = 2;
            this.redBagMoney = res.data.grab_amount;
          } else if (res.resCode === 1000 && parseInt(res.data.grab_amount) === 0) {
            this.redBagStep = 3;
          } else {
            this.redBagStep = 4;
            this.redBagResult = res.msg || "未抢到红包";
          }
        }
      );
    },
    emojiMatch(str) {
      var reg = /\[emoji-([A-Za-z0-9_]*)\]/g;
      var str1 = str.replace(reg, '<i class="Emoji emoji-$1"></i>');
      if (str1.indexOf("#_#") >= 0) {
        //换行处理
        return str1.split("#_#").join("<br>");
      }
      return str1;
    },
    clearScreen() {
      this.$store.commit("CLEAR_CHAT_MSG");
    },
    showChatImg(src) {
      this.showImgSrc = src;
      this.imgShow = true;
      setTimeout(() => {
        this.$refs.vViewerClick.click();
      }, 200);
    },
    chatListScrolled(pos) {
      let list = this.$refs.msgcontent;
      if (pos.y - list.scroll.maxScrollY > 200) {
        this.scrollFlag = false;
      } else {
        this.scrollFlag = true;
      }
    },

    //聊天室
    sendMsg() {
      let msg = this.chatData.msgContent;
      this.chatData.msgContent = "";
      this.homeChatSendMsgToChatRoom({
        content: msg
      }).then(res => {
        if (res.resCode !== 1000) {
          this.$vux.alert.show({
            title: "发送失败",
            content: `消息发送失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[${res.resCode}][${res.msg}]`
          });
        }
      });
    },

    imgChanged() {
      var file = this.$refs.imginput.files[0];
      if (file.size > 2097152) {
        this.$vux.toast.text("您选择的图片大小超过2M", "center");
        return;
      }
      if (file.type.indexOf("image") <= -1) {
        this.$vux.toast.text("请选择png/jpg/gif等格式的图片", "center");
        return;
      }
      let formData = new FormData(); //创建form对象
      formData.append("file", file); //通过append向form对象添加数据
      formData.append("chunk", "0"); //添加form表单中其他数据
      let param = {
        data: formData,
        isChangeHeader: true
      };
      var _this = this;
      this.$vux.confirm.show({
        title: "提示",
        content: `您选择的图片大小为${parseInt(
          file.size / 1024
        )}KB，<br>发送图片会消耗相当的流量，确定发送吗？`,
        onCancel() {
          _this.$vux.toast.text("已取消", "center");
        },
        onConfirm() {
          _this.homeChatSendMsgToChatRoom(param).then(res => {
            if (res.resCode !== 1000) {
              _this.$vux.alert.show({
                title: "发送失败",
                content: `图片发送失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[${res.resCode}][${res.msg}]`
              });
            }
          });
        }
      });
    },
    chooseImg() {
      this.$refs.imginput.click();
    },

    startTImeDown() {
      Object.keys(this.msgList).forEach(item => {
        this.$set(this.msgList[item], "curTime", 0);
        this.$set(this.msgList[item], "isShowMore", false);
        if (this.msgList[item].content_type == "share") {
          let code = this.msgList[item].orders.code;
          let chat_id = this.msgList[item].chat_id;
          this.$set(
            this.curTime,
            code + chat_id,
            this.openResult[code].openTime - betTime(code).difference - 4
          );
          if (!this.setTimeFunc[code + chat_id]) {
            this.timeDown(this.msgList[item], code);
          }
        }
      });
    }
  },
  computed: {
    ...mapState(["code", "play", "chat", "user", "userChatId", "openResult"]),
    ...mapGetters(["betOrders", "chearRedPackMsgArr"]),
    msgList() {
      return this.chat.msgList;
    },
    msgListArray() {
      return _.values(this.chat.msgList);
    }
  },
  watch: {
    chearRedPackMsgArr() {
      setTimeout(() => {
        this.$refs.regPackGameMsgBox.scrollTo(
          0,
          this.$refs.regPackGameMsgBox.scrollHeight + 58
        );
      }, 50);
    },
    betShow() {
      if (!this.betShow) {
        this.$store.commit("DELETE_ALL_CHECKED_DATA"); //清空已选注单列表
      }
    },
    openResult() {
      this.startTImeDown();
    },
    msgList() {
      this.startTImeDown();
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.scrollFlag) {
            let list = this.$refs.msgcontent;
            if (!list) return;
            list.scrollTo(0, list.scroll.maxScrollY, 300);
          }
        }, 500);
      });
    },
    scrollFlag() {
      setTimeout(() => {
        if (this.scrollFlag) {
          let list = this.$refs.msgcontent;
          if (!list) return;
          list.scrollTo(0, list.scroll.maxScrollY, 300);
        }
      }, 100);
    }
  }
};
</script>

<style scoped lang="scss">
.chat-room {
  background-color: #f8f8f8;
}

.emojiArea {
  position: absolute;
  bottom: px2rem(110px);
  background: #fffef9;
  width: 100%;
  padding: px2rem(20px);
  box-sizing: border-box;

  .emojiTabs {
    font-size: px2rem(28px);
    height: px2rem(50px);
    margin-bottom: px2rem(8px);

    .emojiTab {
      display: inline-block;
      width: px2rem(180px);
      height: px2rem(50px);
      line-height: px2rem(50px);
      text-align: center;
      border-radius: px2rem(6px) px2rem(6px) 0 0;
      background-color: rgba(205, 205, 205, 0.18);
      color: #555;

      &.selected {
        background-color: #51a4fb;
        color: #fff;
      }
    }
  }

  .gif-emoji-container {
    height: px2rem(280px);
    font-size: px2rem(22px);
    text-align: center;
    /deep/ .vux-slider > .vux-indicator,
    .vux-slider .vux-indicator-right {
      left: px2rem(300px);
      bottom: px2rem(-2px);
    }
    .gifCol {
      display: flex;
      margin-top: px2rem(12px);
      justify-content: flex-start;
    }
    .gifItem {
      width: 19.99%;
      display: inline-block;
      color: #555;
      height: px2rem(130px);
      img {
        height: 60%;
      }
      p {
        height: 30%;
        line-height: 100%;
      }
    }
  }
}

.inputArea {
  background: #f3f3f3;
  height: px2rem(110px);
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;

  .chatTextArea {
    margin: px2rem(20px) px2rem(10px);
    padding: 0;
    width: px2rem(480px);
    height: px2rem(70px);
    border-radius: px2rem(10px);
    background: #fff;
    border: none;
    resize: none;
    font-size: px2rem(30px);
    flex: 1;
  }

  .inputBtns {
    height: 100%;
    width: px2rem(160px);
    padding: 0 px2rem(10px);
    line-height: px2rem(70px);
    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      font-size: px2rem(50px);
      color: #51a4fb;

      &.icon-tupian {
        zoom: 0.7;
        position: relative;
        top: px2rem(2px);
      }
    }
  }

  .sendBtns {
    width: px2rem(120px);
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      font-size: px2rem(50px);
      color: #51a4fb;
    }

    &.icon-fasong {
    }
  }
}

.scroll {
  position: absolute;
  top: 0;
  bottom: px2rem(110px);
  width: 100%;
  overflow: hidden;
  font-size: px2rem(16px);
  background-color: rgb(237, 237, 237);
}

.bet-page {
  margin: px2rem(2px) 0;
  height: 100%;
}

p {
  padding: 0;
  margin: 0 !important;
}

.left {
  width: px2rem(80px);
  font-size: px2rem(24px);
  text-align: center;
  background: #cfdce5;
  border-right: 1px solid #79a8c5;
  box-sizing: border-box;
}

.wrapper {
  display: inline-block;
  height: 100%;
}

.right {
  position: absolute;
  left: px2rem(80px);
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
}

.links {
  padding: px2rem(6px) 0;
  background: #cfdce5;
  color: #787878;
  border-color: #f5693c;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #fff;
}

.link-active {
  background: #79a8c5;
  color: #fff;
}

.controls {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 98;
}

.iconfont {
  font-size: px2rem(22px);
}

.chat-header {
  background: #79a8c5;

  .ttl {
    display: inline-block;
    color: #fff;
    font-size: px2rem(15px);
    line-height: px2rem(38px);
    padding: 0 px2rem(14px);
  }
}

.controls {
  position: absolute;
  top: px2rem(3px);
  left: 0;
  width: 100%;
  text-align: center;
}

.scroll {
  box-sizing: border-box;
  padding-bottom: px2rem(15px);
  padding-top: px2rem(15px);
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: px2rem(5px);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  ul {
    padding-bottom: px2rem(6px);
  }

  .Item {
    margin-top: px2rem(30px);
    padding: px2rem(5px) px2rem(30px);

    .lay-block {
      width: 100%;
      overflow: hidden;
      display: flex;
    }

    &.type-left {
      .lay-content {
        margin-left: px2rem(20px);
      }
    }

    &.type-right {
      .lay-block {
        flex-direction: row-reverse;

        h4,
        .Bubble,
        .MsgTime {
          float: right;
        }

        .MsgTime {
          margin-right: px2rem(20px);
        }

        .lay-content {
          margin-right: px2rem(20px);
        }

        .Bubble {
          border-radius: px2rem(20px) 0 px2rem(20px) px2rem(20px);
          background: linear-gradient(90deg, #38a0ff, #137af5);
          color: #fff;
        }
      }
    }

    &:nth-of-type(1) {
      margin-top: 0;
    }

    h4 {
      font-size: px2rem(24px);
      display: inline-block;
      font-weight: 400;
      color: #506583;
    }

    .lay-content {
      flex: 1;
    }

    .avatar {
      width: px2rem(76px);
      height: px2rem(76px);
      border-radius: px2rem(38px);
      /*margin-right: px2rem(20px);*/
      overflow: hidden;

      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: px2rem(38px);
      }
    }

    .msg-header {
      overflow: hidden;

      .type-right {
        float: right;
        margin-right: 10px;
      }

      img {
        vertical-align: middle;
      }

      span {
        display: inline-block;
        margin: 0 px2rem(2px);
      }
    }
  }
}

.compose {
  background: #fffef9;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;

  .control-bar {
    height: px2rem(32px);
    background: #f0f0f0;
    border: 1px solid #adadad;
    border-left: 0;
    border-right: 0;
    position: relative;
    z-index: 98;
  }

  .btn-control {
    height: 100%;
    display: inline-block;
    line-height: px2rem(32px);
    padding: 0 px2rem(12px);
    background: #e5e5e5;
    color: #717171;
    cursor: pointer;

    &:hover {
      background: #ffd9c7;
    }
  }

  .typing {
    position: relative;
    padding: px2rem(5px);

    .txtinput {
      display: block;
      width: auto;
      margin-right: px2rem(58px);
    }

    .sendbtn {
      position: absolute;
      right: px2rem(5px);
      bottom: px2rem(5px);

      .u-btn1 {
        width: px2rem(51px);
        height: px2rem(51px);
        font-size: px2rem(14px);
        line-height: px2rem(51px);
      }
    }
  }
}

.iconfont {
  font-size: px2rem(22px);
  line-height: 1;
  vertical-align: px2rem(3px, false);
}

.chat-header {
  .ttl {
    display: inline-block;
    color: #fff;
    font-size: px2rem(15px);
    line-height: px2rem(38px);
    padding: 0 px2rem(14px);

    a {
      color: inherit;
    }
  }
}

.imgDialog {
  img {
    width: 100%;
  }
}

.MsgTime {
  display: inline-block;
  padding: 0 px2rem(6px);
  border-radius: px2rem(10px);
  font-weight: 400;
  font-size: px2rem(24px);
  color: #c1c1c1;
}

.Bubble {
  position: relative;
  color: rgb(102, 102, 102);
  background: #fff;
  border-radius: 0 px2rem(20px) px2rem(20px) px2rem(20px);
  padding: px2rem(22px) px2rem(30px);
  margin-top: px2rem(15px);
  font-size: px2rem(30px);
  line-height: 1.2;
  display: inline-block;

  &.BubbleFollwOrders {
    display: block;
    background: #fff !important;
  }
}

.rbBubble {
  margin-top: px2rem(3px);
  width: px2rem(380px);
  padding: px2rem(20px);
  box-sizing: border-box;
  background: linear-gradient(to right, #ffc34a, #ff6649) !important;
  border-radius: px2rem(6px);
  vertical-align: middle;
  font-size: px2rem(24px);

  .rbImgMini {
    height: px2rem(66px);
    vertical-align: middle;
    margin-right: px2rem(10px);
  }
}

.black-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 1;
  transition: display 1s;

  .close-notice {
    color: #fff;
    text-align: center;
    font-size: px2rem(24px);
    cursor: pointer;
    position: absolute;
    bottom: px2rem(100px);
    width: 100%;
  }

  .red-bag-show {
    width: px2rem(440px);
    margin: 0 auto;
    position: relative;
    transition: zoom 1s;
    cursor: pointer;

    img {
      width: 100%;
    }

    .openBtnArea {
      position: absolute;
      top: px2rem(180px);
      width: 100%;
      transition: all 100s linear;
      text-align: center;

      img {
        width: px2rem(180px);
      }

      &.rbIsOpening {
        transform: rotateY(36000deg);
      }
    }

    .closeBtnArea {
      width: 100%;
      height: 12%;
      position: absolute;
      bottom: 0;
    }

    .failText,
    .moneyText {
      display: inline-block;
      width: px2rem(240px);
      height: px2rem(80px);
      line-height: px2rem(80px);
      text-align: center;
      font-size: px2rem(24px);
      position: absolute;
      top: px2rem(180px);
      left: px2rem(100px);
      color: #555;
    }

    .moneyText {
      font-size: px2rem(40px);
      font-weight: 600;
      color: #ff5330;
    }
  }

  .red-bag-res {
    width: px2rem(380px);
    height: px2rem(490px);
    margin: 20% auto;
    position: relative;
    cursor: pointer;

    img {
      width: 100%;
    }

    .red-bag-title {
      position: absolute;
      top: px2rem(260px);
      width: 100%;
      font-size: px2rem(24px);
      color: #fff251;
      text-align: center;

      .money {
        font-weight: 600;
        font-size: px2rem(40px);
      }
    }
  }
}

.msg-img {
  max-width: px2rem(200px);
  /*max-height: px2rem(200px);*/
  height: px2rem(160px);
}

.rb-list {
  text-align: center;
  font-size: px2rem(24px);

  .rb-list-nick {
    color: #1086ff;
    font-weight: 600;
  }

  .rb-list-money {
    color: #ff6a00;
    font-weight: 600;
  }
}

.follwOrders {
  background-color: #fff;
  border-radius: 8px;

  .betHeaderBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: px2rem(20px);
    border-bottom: 1px dashed #ddd;
    line-height: px2rem(50px);

    .lotteryImg {
      font-size: px2rem(28px);
      color: #333;
      font-weight: 600;

      img {
        width: px2rem(50px);
        height: px2rem(50px);
        vertical-align: middle;
        margin-right: px2rem(10px);
      }
    }

    .qh {
      font-size: px2rem(24px);
      color: #333;

      span {
        color: #51a4fb;
      }
    }

    .betBox {
      font-size: px2rem(24px);
      width: pxrem(100px);

      .timeDown {
        color: #666;
      }

      .betBtn {
        background-color: #ff9900;
        color: #fff;
        text-align: center;
        padding: 0 px2rem(30px);
        border-radius: 4px;
        cursor: pointer;

        &.unBet {
          background-color: #ddd;
          color: #333;
        }
      }
    }
  }

  .orderList {
    li {
      display: flex;
      justify-content: space-between;
      padding: px2rem(20px) 0;
      border-bottom: 1px dashed #ddd;
      font-size: px2rem(24px);
      color: #333;

      i {
        font-style: normal;
        color: #e1e1e1;
      }

      span {
        color: #51a4fb;
      }

      div {
        width: px2rem(250px);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .showOrClose {
    text-align: center;
    margin-top: px2rem(20px);
    color: #555;

    div {
      transition: all 0.3s;
    }

    .close {
      transform: rotate(-180deg);
    }
  }
}

.Bubble /deep/ {
  p span {
    /*font-size: px2rem(14px);*/
    a font {
    }
  }

  .Emoji {
    display: inline-block;
    width: px2rem(50px);
    height: px2rem(50px);
    cursor: pointer;
    background: url(../../assets/images/chat/emoji@2x.png) no-repeat;
    background-size: px2rem(50px) auto;
  }

  .Emoji.emoji-smile {
    background-position: 0 0;
  }

  .Emoji.emoji-laughing {
    background-position: 0 px2rem(50px, false);
  }

  .Emoji.emoji-blush {
    background-position: 0 px2rem(100px, false);
  }

  .Emoji.emoji-heart_eyes {
    background-position: 0 px2rem(150px, false);
  }

  .Emoji.emoji-smirk {
    background-position: 0 px2rem(200px, false);
  }

  .Emoji.emoji-flushed {
    background-position: 0 px2rem(250px, false);
  }

  .Emoji.emoji-grin {
    background-position: 0 px2rem(300px, false);
  }

  .Emoji.emoji-kissing_smiling_eyes {
    background-position: 0 px2rem(350px, false);
  }

  .Emoji.emoji-wink {
    background-position: 0 px2rem(400px, false);
  }

  .Emoji.emoji-kissing_closed_eyes {
    background-position: 0 px2rem(450px, false);
  }

  .Emoji.emoji-stuck_out_tongue_winking_eye {
    background-position: 0 px2rem(500px, false);
  }

  .Emoji.emoji-sleeping {
    background-position: 0 px2rem(550px, false);
  }

  .Emoji.emoji-worried {
    background-position: 0 px2rem(600px, false);
  }

  .Emoji.emoji-sweat_smile {
    background-position: 0 px2rem(650px, false);
  }

  .Emoji.emoji-cold_sweat {
    background-position: 0 px2rem(700px, false);
  }

  .Emoji.emoji-joy {
    background-position: 0 px2rem(750px, false);
  }

  .Emoji.emoji-sob {
    background-position: 0 px2rem(800px, false);
  }

  .Emoji.emoji-angry {
    background-position: 0 px2rem(850px, false);
  }

  .Emoji.emoji-mask {
    background-position: 0 px2rem(900px, false);
  }

  .Emoji.emoji-scream {
    background-position: 0 px2rem(950px, false);
  }

  .Emoji.emoji-sunglasses {
    background-position: 0 px2rem(1000px, false);
  }

  .Emoji.emoji-thumbsup {
    background-position: 0 px2rem(1050px, false);
  }

  .Emoji.emoji-clap {
    background-position: 0 px2rem(1100px, false);
  }

  .Emoji.emoji-ok_hand {
    background-position: 0 px2rem(1150px, false);
  }
}

.right-ctrls {
  position: absolute;
  right: px2rem(3px);
  width: px2rem(64px);
  z-index: 2;

  a {
    color: #fc304b;
    border-radius: px2rem(10px);
    font-size: px2rem(24px);
    display: block;
    border: 1px solid #fc304b;
    padding: px2rem(0.64px) px2rem(3px);
    text-align: center;
    margin-top: px2rem(16px);
    background: #fff;
  }

  .selected {
    background: #fc304b;
    color: #fff;
  }
}

.vux-close {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  color: #999;
  width: px2rem(24px);
  height: px2rem(24px);

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: px2rem(11px);
    width: px2rem(24px);
    height: px2rem(1px);
    background-color: currentColor;
    transform: rotate(-45deg);
  }

  &:after {
    transform: rotate(45deg);
  }
}

.dialog-demo {
  .weui-dialog {
    border-radius: px2rem(8px);
    padding-bottom: px2rem(8px);
  }

  .dialog-title {
    line-height: px2rem(30px);
    color: #666;
  }

  .img-box {
    height: px2rem(350px);
    overflow: hidden;
  }

  .vux-close {
    margin-top: px2rem(8px);
    margin-bottom: px2rem(8px);
  }
}

.animated {
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.historyInstallingNotice {
  font-size: px2rem(32px);
  line-height: px2rem(300px);
  height: px2rem(1000px);
  text-align: center;
  color: #999;
}

/deep/ .vux-spinner {
  stroke: #51a4fb;
  fill: #51a4fb;
  vertical-align: middle;
  display: inline-block;
  width: 28px;
  height: 28px;
  position: relative;

  svg {
    position: absolute;
    top: px2rem(4px, false);
  }
}

.red-bag-title {
  position: absolute;
  top: px2rem(130px);
  width: 100%;
  font-size: px2rem(40px);
  color: #fff251;
  text-align: center;

  .money {
    font-weight: 600;
    font-size: px2rem(36px);
  }
}

.lvimg {
  display: inline-block;
  width: 72px;
  height: 15px;
  position: relative;
  top: 3px;
  background-size: contain;
  background-repeat: no-repeat;
}

.user-lv-1 {
  background-image: url(../../assets/images/chat/user-lv-1.gif);
}

.user-lv-2 {
  height: 18px;
  width: 50px;
  background-image: url(../../assets/images/chat/user-lv-2.gif);
}

.user-lv-3 {
  background-image: url(../../assets/images/chat/user-lv-3.gif);
}

.user-lv-4 {
  background-image: url(../../assets/images/chat/user-lv-4.gif);
}

.user-lv-5 {
  background-image: url(../../assets/images/chat/user-lv-5.gif);
}

.user-lv-6 {
  background-image: url(../../assets/images/chat/user-lv-6.gif);
}

.user-lv-7 {
  background-image: url(../../assets/images/chat/user-lv-7.gif);
}

.user-lv-8 {
  height: 18px;
  width: 46px;
  background-image: url(../../assets/images/chat/user-lv-8.gif);
}

.emojiArea {
  .Emoji {
    display: inline-block;
    width: px2rem(60px);
    height: px2rem(60px);
    cursor: pointer;
    background: url(../../assets/images/chat/emoji@2x.png) no-repeat;
    background-size: px2rem(60px) auto;
    margin: 0 px2rem(14px);
  }

  .Emoji.emoji-smile {
    background-position: 0 0;
  }

  .Emoji.emoji-laughing {
    background-position: 0 px2rem(60px, false);
  }

  .Emoji.emoji-blush {
    background-position: 0 px2rem(120px, false);
  }

  .Emoji.emoji-heart_eyes {
    background-position: 0 px2rem(180px, false);
  }

  .Emoji.emoji-smirk {
    background-position: 0 px2rem(240px, false);
  }

  .Emoji.emoji-flushed {
    background-position: 0 px2rem(300px, false);
  }

  .Emoji.emoji-grin {
    background-position: 0 px2rem(360px, false);
  }

  .Emoji.emoji-kissing_smiling_eyes {
    background-position: 0 px2rem(420px, false);
  }

  .Emoji.emoji-wink {
    background-position: 0 px2rem(480px, false);
  }

  .Emoji.emoji-kissing_closed_eyes {
    background-position: 0 px2rem(540px, false);
  }

  .Emoji.emoji-stuck_out_tongue_winking_eye {
    background-position: 0 px2rem(600px, false);
  }

  .Emoji.emoji-sleeping {
    background-position: 0 px2rem(660px, false);
  }

  .Emoji.emoji-worried {
    background-position: 0 px2rem(720px, false);
  }

  .Emoji.emoji-sweat_smile {
    background-position: 0 px2rem(780px, false);
  }

  .Emoji.emoji-cold_sweat {
    background-position: 0 px2rem(840px, false);
  }

  .Emoji.emoji-joy {
    background-position: 0 px2rem(900px, false);
  }

  .Emoji.emoji-sob {
    background-position: 0 px2rem(960px, false);
  }

  .Emoji.emoji-angry {
    background-position: 0 px2rem(1020px, false);
  }

  .Emoji.emoji-mask {
    background-position: 0 px2rem(1080px, false);
  }

  .Emoji.emoji-scream {
    background-position: 0 px2rem(1140px, false);
  }

  .Emoji.emoji-sunglasses {
    background-position: 0 px2rem(1200px, false);
  }

  .Emoji.emoji-thumbsup {
    background-position: 0 px2rem(1260px, false);
  }

  .Emoji.emoji-clap {
    background-position: 0 px2rem(1320px, false);
  }

  .Emoji.emoji-ok_hand {
    background-position: 0 px2rem(1380px, false);
  }
}

.Bubble_gif {
  background: none !important;
}

.regPackGameMsgBox {
  position: absolute;
  top: 0;
  right: 0;
  max-height: px2rem(150px);
  overflow-y: scroll;
  overflow-x: hidden;
  .regPackGame {
    float: right;
    margin-top: px2rem(20px);
    font-size: px2rem(24px);
    background: linear-gradient(to right, #ff3564, #ff703e);
    // width: px2rem(500px);
    display: inline-block;
    padding: px2rem(10px);
    padding-left: px2rem(50px);
    border-top-left-radius: 200px;
    border-bottom-left-radius: 200px;
    p {
      line-height: px2rem(40px);
      color: #fff;
      span {
        color: yellow;
      }
    }
  }
}
.fadeInLeft-enter-active {
  animation: bounce-in 0.5s;
}
.fadeInLeft-leave-active {
  animation: bounce-in 0.5s reverse;
}
.fadeOutLeft {
  animation: bounce-out 0.5s;
}
.fadeInLeft {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
