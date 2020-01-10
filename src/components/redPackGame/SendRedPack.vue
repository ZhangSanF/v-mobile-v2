<template>
  <div class="sendRedPack">
    <div>
      <popup v-model="openStatus" @on-hide="ClosePopup" height="90%">
        <div class="sendRedPack">
          <div class="sendRedPackHeader">
            <span class="closeSendRedPack" @click="ClosePopup">取消</span>
            {{`发${typeName || ''} 红包`}}
          </div>
          <!-- 其他红包 -->
          <div v-if="curGroup.game_type !== '3'">
            <div>
              <div class="redMoney">&yen;&nbsp;{{redMoney || 0}}</div>
              <div class="moneyTost">{{moneyTost}}</div>
            </div>
            <group>
              <!-- 总金额 -->
              <cell class="redMoneyTitle" :title="redMoneyTitle">
                <slot>
                  <x-input
                    text-align="right"
                    class="redMoneyValue"
                    v-model="redMoney"
                    ref="redMoney"
                    :debounce="checkTime"
                    @on-change="checkPrice"
                    :placeholder="redMoneyValue"
                  ></x-input>
                </slot>
                <span slot="child">元</span>
              </cell>
              <!-- 红包个数 -->
              <cell :title="redNumTitle">
                <slot>
                  <x-input
                    text-align="right"
                    class="redMoneyValue"
                    keyboard="number"
                    v-model="redNum"
                    ref="redNum"
                    :debounce="checkTime"
                    @on-change="checkRedNum"
                    :placeholder="redNumValue"
                  ></x-input>
                </slot>
                <span slot="child">个</span>
              </cell>
            </group>
            <!-- 扫雷红包  -->
            <!-- 雷数 -->
            <group :title="moneyRangeDes" v-if="curGroup.game_type == 1">
              <cell :title="mineTitle">
                <slot>
                  <x-input
                    text-align="right"
                    class="redMoneyValue"
                    v-model="mineNum"
                    ref="mineNum"
                    :debounce="checkTime"
                    @on-change="checkMineNum"
                    :placeholder="mineValue"
                  ></x-input>
                </slot>
              </cell>
            </group>
            <group :title="mineRange" v-if="curGroup.game_type == 1"></group>
          </div>
          <!-- 禁抢红包  -->
          <div class="banRedPack" v-if="curGroup.game_type == '3'">
            <!-- 禁抢红包金额 -->
            <div class="banMoneyTost">{{moneyTost}}</div>
            <cell class="banRedMoney" :title="redMoneyTitle">
              <slot>
                <x-input
                  text-align="right"
                  class="redMoneyValue"
                  v-model="redMoney"
                  ref="redMoney"
                  :debounce="checkTime"
                  @on-change="checkPrice"
                  :placeholder="moneyRange"
                ></x-input>
              </slot>
              <span slot="child">元</span>
            </cell>
            <!-- 禁抢红包个数 -->
            <div class="banRedNum">
              <flexbox>
                <span class="banRedPackTitle">{{banNumTitle}}</span>
                <flexbox-item v-for="num in getRedNumList" :key="num">
                  <span
                    @click="activeBanNum(num)"
                    :class="{active:redNum == num}"
                    class="mineRedNumItem"
                  >{{num}}</span>
                </flexbox-item>
                <span>包</span>
              </flexbox>
            </div>
            <!-- 禁抢红包雷号 -->
            <div class="mineRedNum">
              <span class="mineListTitle">雷号</span>
              <div class="mineRedNumBody">
                <div class="mineList">
                  <div class="mineListItem" v-for="num in getMineList" :key="num">
                    <span
                      @click="activeMineNum(num)"
                      :class="{active:isActive(num)}"
                      class="mineRedNumItem"
                    >{{num}}</span>
                  </div>
                </div>
              </div>
              <span class="mineListDes" v-show="redNum == 6 && isSixNOmineRedPack">不</span>
            </div>
            <flexbox class="mineRedNumMoney">
              <flexbox-item>&yen;&nbsp;{{redMoney || 0}}</flexbox-item>
            </flexbox>
          </div>
          <!-- 发送红包 -->
          <div class="sendRed">
            <x-button
              :class="isCanSend ? 'sendBtn':'sendBeforBtn'"
              :disabled="!isCanSend"
              @click.native="redPackGameGameGiveFunc"
              class="sendRedBtn"
            >{{sendRedBtnValue}}</x-button>
            <div class="redDescription">{{redDescription}}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { XHeader, XInput, Popup, Flexbox, FlexboxItem } from "vux";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "sendRedPack",
  watch: {
    showSendRedPack(val) {
      if (val) {
        this.redPackInit();
      }
      this.openStatus = val;
    }
  },
  props: {
    showSendRedPack: {
      type: [Boolean]
    },
    id: {
      type: [String, Number],
      default() {
        return null;
      }
    },
    //是否是6不中玩法
    isSixNOmineRedPack: {
      type: [Boolean],
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      curGroup: {},
      curGame: {},
      redMoney: "",
      redNum: "",
      mineNum: "",
      totalTitle: "总金额",
      typeName: "牛牛",
      numRange: "",
      moneyRange: "5.00-5000.00",
      mineRange: "雷数范围0-9",
      mineTitle: "雷数",
      mineValue: "请输入雷数",
      redDescriptionObj: {
        1: "未领取的红包,将于5.00分钟后发起退款",
        2: "牛牛红包不结算红包金额,只结算输赢金额",
        3: "",
        4: ""
      },
      mineNumList: [], //雷号
      banRedNum: 9,
      SixNoMineRule: {
        max: 5,
        min: 2
      }, //6不中玩法规则
      paramsContent: "",
      checkTime: 1500, //节流时间
      moneyTost: "", //金额错误提示
      isLoading: false,
      openStatus: this.showSendRedPack
    };
  },
  mounted() {
    this.redPackInit();
    this.redPackGameBaseInfo.groupList.forEach(item => {
      if (item.id == this.id) {
        this.curGroup = item;
      }
    });
    this.redPackGameBaseInfo.gameInfo.forEach(item => {
      if (item.id == this.curGroup.game_id) {
        this.curGame = item;
      }
    });
    this.typeName = this.curGame.title;
    if (this.curGroup.game_type == 1) {
      this.redNum = this.curGame.valid_count;
    }
    this.numRange = this.curGame.valid_count;
    if (this.curGroup.min && this.curGroup.max) {
      this.moneyRange = this.curGroup.min + "-" + this.curGroup.max;
    }
  },
  methods: {
    ...mapActions(["redPackGameGameGive"]),

    // 发红包
    redPackGameGameGiveFunc() {
      this.paramsContent = "";
      //game_type = 3 为禁枪红包 1为扫雷红包
      //this.curGame.condition 选雷规则
      if (this.curGroup.game_type == 3) {
        let mineRule = this.isSixNOmineRedPack
          ? this.SixNoMineRule
          : this.curGame.condition[this.redNum];
        if (this.mineNumList.length == 0) {
          this.$vux.alert.show({
            title: "提示",
            content: `最少选择${mineRule.num_count_min}个`
          });
          return;
        }
        if (this.mineNumList.length < mineRule.num_count_min) {
          this.$vux.alert.show({
            title: "提示",
            content: `最少选择${mineRule.num_count_min}个`
          });
          return;
        }
        this.mineNumList = this.mineNumList.sort();
        this.paramsContent = this.mineNumList.join(",");
      } else if (this.curGroup.game_type == 1) {
        this.paramsContent = this.mineNum || "";
      }
      let params = {
        groupId: this.id, //游戏群ID
        count: this.redNum || this.mineNum, //红包数量
        amount: this.redMoney, //红包金额
        content: this.paramsContent //雷区内容
      };
      this.debounceClick();
      this.$vux.loading.show({
        text: "Loading"
      });
      this.redPackGameGameGive(params).then(res => {
        this.$vux.loading.hide();
        this.redPackInit();
        if (res.resCode == 1000) {
          this.ClosePopup();
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },
    ClosePopup() {
      this.$emit("showPopup", false);
    },
    activeBanNum(num) {
      this.redNum = "" + num;
      this.mineNumList = [];
    },
    isActive(num) {
      if (this.mineNumList.indexOf(num) > -1) {
        return true;
      }
    },
    activeMineNum(num) {
      let mineRule = this.isSixNOmineRedPack
        ? this.SixNoMineRule
        : this.curGame.condition[this.redNum]
        ? this.curGame.condition[this.redNum]
        : {};
      if (this.mineNumList.indexOf(num) > -1) {
        this.mineNumList.splice(this.mineNumList.indexOf(num), 1);
      } else {
        if (this.mineNumList.length < mineRule.num_count_max) {
          this.mineNumList.push(num);
        }
      }
    },
    //金额规则
    checkPrice() {
      if (this.redMoney == "") return false;
      let price = "" + this.redMoney;
      if (price == undefined) return false;
      price = price
        .replace(/[^\d.]/g, "") // 清除“数字”和“.”以外的字符
        .replace(/\.{2,}/g, ".") // 只保留第一个. 清除多余的
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 只能输入两个小数
      // price = price.replace(/[^0-9]/g, '');
      if (price && price.indexOf(".") < 0 && price != "") {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        price = parseInt(price);
      }
      this.$refs.redMoney.currentValue = price;
      //限制输入的范围 输入防抖
      price = String(price);
      if (price - 0 < this.curGroup.min - 0) {
        this.moneyTost = `红包金额不能小于${this.curGroup.min} 元`;
        // price = this.curGroup.min
      } else if (price - 0 > this.curGroup.max - 0) {
        this.moneyTost = `红包金额不能大于${this.curGroup.max} 元`;
      } else if (price != "" && price && price.indexOf(".") > 0) {
        this.moneyTost = `红包金额只能为整数`;
      } else {
        this.moneyTost = "";
      }
      this.redMoney = price;
    },
    //红包数量
    checkRedNum() {
      if (this.redNum == "") return false;
      let redNum = "" + this.redNum;
      if (redNum == undefined) return false;
      redNum = redNum.replace(/[^\d]/g, ""); // 清除“数字”和“.”以外的字符
      if (redNum && redNum.indexOf(".") < 0 && redNum != "") {
        redNum = parseInt(redNum);
      }
      redNum = this.checkNumValid(redNum, this.curGame.valid_count);
      //input 同步显示 正常数字
      this.$refs.redNum.currentValue = redNum;
      this.redNum = redNum;
    },
    // 雷数数量
    checkMineNum() {
      if (this.mineNum == "") return false;
      let mineNum = "" + this.mineNum;
      if (mineNum == undefined || mineNum == "") return false;
      mineNum = mineNum.replace(/[^\d]/g, ""); // 清除“数字”和“.”以外的字符
      if (mineNum && mineNum.indexOf(".") < 0 && mineNum != "") {
        mineNum = parseInt(mineNum);
      }
      mineNum = this.checkNumValid(mineNum, this.curGame.valid_num);
      this.$refs.mineNum.currentValue = mineNum;
      this.mineNum = mineNum;
    },
    validCountToList(validCount) {
      if (validCount == "" || validCount == null) return [];
      if (validCount) {
        return validCount.split(",");
      } else {
        return [];
      }
    },
    validNumTolist(validNum) {
      if (validNum == "" || validNum == null) return [];
      let validNumArray = validNum.split(",");
      return validNumArray;
    },
    //重置红包数量,金额
    redPackInit() {
      this.redMoney = "";
      this.redNum = "";
      this.mineNum = "";
      this.mineNumList = [];
      //扫雷红包
      if (this.curGroup.game_type == 1) {
        this.redNum = this.curGame.valid_count;
      }
    },
    checkNumValid(num, validCount) {
      //validCount 为整数的
      if (validCount && validCount.indexOf("-") < 0 && validCount != "") {
        let validMinMax = this.curGame.valid_count;
        if (num < validMinMax) {
          return validMinMax;
        } else if (num > validMinMax) {
          return validMinMax;
        }
        return num;
      }
      //validCount 为 x-x
      else {
        let validMin = validCount.slice(0, validCount.indexOf("-"));
        let validMax = validCount.slice(validCount.indexOf("-") + 1);
        if (num < validMin) {
          return validMin;
        } else if (num > validMax) {
          return validMax;
        }
        return num;
      }
    },
    debounceClick() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  },
  computed: {
    ...mapGetters(["redPackGameBaseInfo"]),
    redMoneyTitle() {
      return "总金额";
    },
    redMoneyValue() {
      return this.moneyRange;
    },
    redNumTitle() {
      return this.typeName ? this.typeName + "红包个数" : "红包个数";
    },
    redNumValue() {
      return this.numRange;
    },
    sendRedBtnValue() {
      return "塞钱进" + `${this.typeName ? this.typeName : ""}` + "红包";
    },
    redDescription() {
      return this.redDescriptionObj[this.curGroup.game_type] || "";
    },
    moneyRangeDes() {
      return "红包发布范围:" + this.moneyRange + "元";
    },
    isCanSend() {
      if (this.isLoading || this.moneyTost !== "") return false;
      //扫雷红包
      if (this.curGroup.game_type == 1) {
        if (this.redMoney !== "" && this.mineNum !== "") {
          return true;
        } else {
          return false;
        }
      }
      //禁抢红包
      else if (this.curGroup.game_type == 3) {
        if (this.mineNumList.length == 0) {
          return false;
        }
        return true;
      }
      //其他红包
      else {
        if (this.redMoney !== "" && this.redNum !== "") {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    banNumTitle() {
      return "红包个数";
    },
    //雷号数组
    getMineList() {
      if (this.curGame.valid_num) {
        return this.validNumTolist(this.curGame.valid_num);
      }
      return [];
    },
    //红包个数数组
    getRedNumList() {
      if (this.curGroup.game_type == 3) {
        if (this.curGame.valid_count) {
          return this.validCountToList(this.curGame.valid_count);
        }
      }
      return [];
    }
  },
  components: { XHeader, XInput, Popup, Flexbox, FlexboxItem }
};
</script>
<style lang="scss" scoped>
.sendRedPack {
  background-color: #f6f6f6;
  height: 100%;
  .sendRed {
    padding: px2rem(30px) px2rem(15px);
    .sendRedBtn {
      width: px2rem(690px);
      background-color: #fe3464;
      color: #fff;
    }
    .redDescription {
      padding: px2rem(20px) 0;
      text-align: center;
      vertical-align: middle;
      font-size: px2rem(25px);
      color: rgb(153, 153, 153);
    }
    .redMoneyTitle {
      .vux-label {
        font-size: px2rem(35px) !important;
      }
    }
  }
  .weui-cells {
    margin-top: 0rem !important;
    font-size: px2rem(40px);
  }
  .vux-no-group-title {
    margin-top: 0rem !important;
  }
  .redMoneyValue {
    text-align: end !important;
  }
  .weui-cell {
    padding: px2rem(20px) !important;
  }

  .weui-cell:before {
    left: 0 !important;
  }
  .vux-popup-dialog {
    border-radius: px2rem(30px) px2rem(30px) 0 0 !important;
  }

  .closeSendRedPack {
    position: fixed;
    left: px2rem(30px);
    font-size: px2rem(30px) !important;
  }
  .sendRedPackHeader {
    height: px2rem(80px);
    line-height: px2rem(80px);
    text-align: center;
    font-size: px2rem(30px) !important;
    background-color: #d85940;
    color: #fff;
  }
  .redMoney {
    text-align: center;
    vertical-align: middle;
    padding: px2rem(20px) 0;
    background-color: #f6f6f6;
    font-size: px2rem(80px) !important;
  }
  .sendBtn {
    opacity: 1;
  }
  .sendBeforBtn {
    opacity: 0.5;
  }
  .weui-input {
    color: #6f6f6f !important;
    text-align: end !important;
  }

  .banRedNum:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .banRedPack {
    background-color: #f8f8f8;
  }
  .banRedMoney {
    background-color: #fff;
    border-radius: px2rem(10px);
    margin: px2rem(20px) px2rem(40px);
    font-size: px2rem(36px);
  }
  .banRedNum {
    padding: px2rem(20px) px2rem(20px);
    background-color: #fff;
    border-radius: px2rem(10px);
    margin: px2rem(20px) px2rem(40px);
    font-size: px2rem(36px);
  }
  .mineRedNum {
    padding: px2rem(20px);
    border-radius: px2rem(10px);
    background-color: #fff;
    display: flex;
    margin: px2rem(20px) px2rem(40px) 0 px2rem(40px);
    font-size: px2rem(36px);
  }
  .mineRedNumMoney {
    text-align: center;
    font-size: px2rem(66px);
    font-weight: bold;
    background-color: #fff;
    width: px2rem(670px);
    margin-left: px2rem(40px);
    padding: px2rem(20px) 0;
    color: rgb(238, 122, 78);
  }
  .banRedPackTitle {
    font-weight: bold;
  }
  .mineRedNumItem {
    background-color: #fae4d9;
    text-align: center;
    border-radius: 50%;
    width: px2rem(66px);
    height: px2rem(66px);
    line-height: px2rem(66px);
    display: inline-block;
    color: rgb(238, 122, 78);
    border: px2rem(2px) solid #ef8259;
  }
  .mineRedNumBox {
    padding: px2rem(40px) 0 px2rem(60px) 0;
  }
  .active {
    background-color: rgb(238, 122, 78);
    color: #fff;
  }
  .mineList {
    display: flex;
    flex-wrap: wrap;
    width: px2rem(450px);
    .mineListItem {
      margin: px2rem(20px) px2rem(10px) 0 0;
    }
  }
  .mineRedNumTitle {
    width: px2rem(100px);
    font-weight: bold;
  }
  .mineRedNumBody {
    .mineRedNumTilte {
      display: flex;
      flex: 1;
      text-align: center;
      background-color: #ef8259;
    }
  }
  .mineListTitle {
    width: px2rem(100px);
    line-height: px2rem(150px);
    display: inline-block;
    font-weight: bold;
  }
  .mineListDes {
    width: px2rem(80px);
    line-height: px2rem(150px);
    display: inline-block;
    font-weight: bold;
  }
  .banRedMoney {
    div:nth-child(1) {
      width: px2rem(380px);
    }
  }
  .moneyTost {
    text-align: center;
    vertical-align: middle;
    padding: px2rem(10px) 0;
    height: px2rem(30px);
    line-height: px2rem(30px);
    background-color: #f6f6f6;
    color: #fe3464;
    font-size: px2rem(30px) !important;
  }
  .banMoneyTost {
    margin-top: px2rem(10px);
    @extend .moneyTost;
  }
}
</style>