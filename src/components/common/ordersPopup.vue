<template>
  <div class="orders-content">
    <h4>请确认详细注单</h4>
    <div class="orders-table-con">
      <table :cell-bordered="false" style="background-color:#fff;" class="orders-table">
        <thead>
          <tr>
            <th>号码</th>
            <th>赔率</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <virtual-list :size="40" :remain="6" :bench="25" class="virtual" ref="virtual">
            <template v-for="(item, index) of betOrdersList">
              <tr :key="index" v-if="index <1000">
                <td>{{item.name}}</td>
                <td class="oddsText">{{item.odds}}</td>
                <td>
                  <input
                    class="orderMoney"
                    type="number"
                    v-model="item.money"
                    @input="itemMoneyChanged($event, item)"
                  />
                  <x-icon type="ios-close" class="deleteBtn" size="20" @click="deleteOrder(item)"></x-icon>
                </td>
              </tr>
            </template>
          </virtual-list>
        </tbody>
      </table>
    </div>

    <div class="orders-btns">
      <span class="bet-money orderItemMoney">
        单笔:
        <input class="bet-input" type="tel" v-model="allMoney" @input="moneyChanged" />元
      </span>

      <span class="bet-money">
        总金额:
        <span class="totalMoney">{{ordersMoneyCount}}元</span>
      </span>
      <button @click="bet" class="bet-action">确认投注</button>
    </div>

    <toast
      v-model="showToast"
      :type="toastType"
      :time="1200"
      is-show-mask
      :text="toastText"
      :position="toastPosition"
    ></toast>
    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { XTable, Loading, Toast, TransferDom } from "vux";
import virtualList from "vue-virtual-scroll-list";

export default {
  name: "ordersPopup",
  components: { XTable, Loading, Toast, virtualList },
  directives: { TransferDom },
  data() {
    return {
      betShow: false, //投注弹窗
      showToast: false, //显示toast
      loadingShow: false,
      loadingText: "",
      toastText: "",
      toastType: "cancel",
      ordersMoneyCount: 0,
      toastPosition: "center",
      allMoney: "", //金额
      orderData: [], //生成的注单数据
      planData: {}, //计划传入的数据
      betOrdersList:[]
    };
  },
  computed: {
    ...mapGetters(["openData"]),
    ...mapState(["gameDataStore", "betMoney", "openResult"])
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    ...mapActions(["homeOrdersPlaceOrder"]),

    getOrdersMoneyCount() {
      if (this.betOrdersList.length) {
        var res = 0;
        for (var i = 0; i < this.betOrdersList.length; i++) {
          if(!this.betOrdersList[i].money){
            this.$set(this.betOrdersList[i],'money',this.allMoney)
          }
          res += parseInt(this.betOrdersList[i].money) || this.allMoney || 0;
        }
        console.log(res);
        this.ordersMoneyCount = res;
      }
    },
    dataInit(item, code) {
      this.planData = item;
      this.planData.code = code;
      this.allMoney = this.betMoney;
      this.bet_type = 3;
      this.playInfoSearch();
    },

    //根据计划号码、定位查找playInfo
    playInfoSearch() {
      let obj = this.planData;
      if (obj.code && obj.forecast_numbers.length && obj.expect) {
        let _code = obj.code;
        let codeType = this.openResult[_code].code_type;
        let _page; //page值
        let _table; //表
        if (codeType === "pk10") {
          //pk10取[单号1-10]页面的[bn]表
          _page = "n10";
          _table = "bn";
        }
        if (codeType === "ssc") {
          //ssc取[第一球]~[第十球]页面的[ball]表
          _page = "b" + this.planData.location;
          _table = "ball";
        }
        let searchRes = null;

        //查找VUEX中是否存在playInfo数据
        if (this.gameDataStore[_code] && this.gameDataStore[_code][_page]) {
          searchRes = this.gameDataStore[_code][_page][_table];
          this.orderBuild(searchRes);
        } else {
          //不存在则从服务器获取
          this.$store
            .dispatch("homeIndexInit", {
              actions: "playInfo",
              code: _code,
              page: _page
            })
            .then(res => {
              if (res.resCode === 1000) {
                searchRes = res.data.playInfo[_table];
                this.orderBuild(searchRes);
              }
            });
        }
      }
    },

    //生成注单
    orderBuild(searchRes) {
      let codeType = this.openResult[this.planData.code].code_type; //彩种类型 PK10 SSC
      let numbersArray = this.planData.forecast_numbers; //预测号码数组
      let tableData; //最内层的playInfo数据

      if (codeType == "ssc") {
        //时时彩类型（单页单表）
        tableData = searchRes.data;
      } else {
        //PK10类型（单页多表）
        let tableKey = parseInt(this.planData.location) - 1; //定位
        tableData = searchRes[tableKey].data; //playInfo
      }

      //比对取出desc与预测号码相同的playInfo
      let res = [];
      for (let k in tableData) {
        let number = parseInt(tableData[k].desc);
        if (numbersArray.indexOf(number) >= 0) {
          res.push(tableData[k]);
        }
      }
      this.saveOrders(res);
      // todo
    },

    //保存注单至VUEX
    saveOrders(res) {
      this.betOrdersList = res;
      // for (let item of res) {
      //   this.$store.commit("SAVE_CHECKED", {
      //     uid: item.play.replace("@", ""),
      //     name: item.name,
      //     odds: item.odds,
      //     desc: item.desc,
      //     type: item.type,
      //     play: item.play,
      //     money: this.betMoney
      //   });
      // }
    },

    //全局金额改变
    moneyChanged() {
      if (this.betOrdersList.length) {
        var res = 0;
        for (var i = 0; i < this.betOrdersList.length; i++) {
            this.$set(this.betOrdersList[i],'money',this.allMoney)
          res += parseInt(this.betOrdersList[i].money) || this.allMoney || 0;
        }
        console.log(res);
        this.ordersMoneyCount = res;
      }
      this.$store.commit("SAVE_BET_MONEY", parseInt(this.allMoney) || 0);
      this.$store.commit(
        "CHANGE_ALL_CHECKED_DATA_MONEY",
        parseInt(this.allMoney) || 0
      );
    },

    //单注金额修改
    itemMoneyChanged(e, item) {
      this.getOrdersMoneyCount();
      // this.$store.commit("BET_ORDERS_MONEY_CHANGE", {
      //   uid: item.uid,
      //   money: e.target.value
      // });
    },

    //删除注单
    deleteOrder(item) {
      this.$store.commit("DELETE_CHECKED", item.uid);
    },

    // 保存code
    saveCode(code) {
      this.$set(this.planData, "code", code);
      this.allMoney = this.betMoney;
      this.bet_type = 2;
    },

    //下注
    bet() {
      this.betShow = false;
      this.loadingShow = true;
      this.loadingText = "投注中";
      var data = {
        code: this.planData.code,
        bet_type: this.bet_type,
        orders: this.betOrdersList
      };
      for (let item of this.betOrdersList) {
        if (!parseInt(item.money)) {
          this.$vux.alert.show({
            title: "提示",
            content: `投注失败，投注金额出现为0情况，请输入正确金额，如果重复出现此问题请联系客服处理！`
          });
          this.loadingShow = false;
          return;
        }
      }

      this.homeOrdersPlaceOrder(data)
        .then(res => {
          this.loadingShow = false;
          if (res.resCode == 2000) {
            this.$store.commit("DELETE_ALL_CHECKED_DATA"); //清空已选注单列表
            setTimeout(() => {
              this.$emit("closePopup");
              this.$emit("betSuccessed");
            }, 50);
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: `投注失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[错误码:${res.resCode}][提示:${res.msg}]`
            });
          }
        })
        .catch(err => {
          this.loadingShow = false;
          this.$vux.alert.show({
            title: "提示",
            content: `投注失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[错误码:${err}]`
          });
        });
    }
  },
  watch: {
    betOrdersList() {
      this.getOrdersMoneyCount();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orders-content {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  font-size: px2rem(24px);
  background: #f0eff5;
  transition: all 0.6s ease-in-out;

  h4 {
    text-align: center;
    position: absolute;
    top: 0;
    height: px2rem(90px);
    line-height: px2rem(90px);
    width: 100%;
    text-align: center;
    font-size: px2rem(30px);
    font-weight: 400;
    color: #fff;
    text-align: center;
    background: #51a4fb;
  }

  .orders-table-con {
    position: absolute;
    top: px2rem(90px);
    bottom: px2rem(118px);
    overflow: auto;
    width: 100%;
    .orders-table {
      display: block;
      width: 100%;
    }
    thead,
    tbody {
      width: 100%;
      display: block;
    }

    tr {
      display: flex;
      height: px2rem(80px);
      line-height: px2rem(80px);
      border-bottom: 1px solid #e0e0e0;
      th {
        flex: 1;
        color: #999;
        font-size: px2rem(28px);
      }
      td {
        flex: 1;
        color: #333;
        font-size: px2rem(26px);
        text-align: center;
        .orderMoney {
        width: px2rem(100px);
        text-align: center;
        border: 1px solid #dedede;
      }
      }
    }
  }

  .orders-btns {
    position: absolute;
    padding: 0 px2rem(16px);
    box-sizing: border-box;
    bottom: 0;
    height: px2rem(118px);
    width: 100%;
    text-align: left;
    vertical-align: middle;
    line-height: px2rem(118px);
    background: #51a4fb;

    .bet-money {
      color: #fff;
      font-size: px2rem(30px);

      &.orderItemMoney {
        margin-right: px2rem(10px);
        font-weight: 400;
      }

      .totalMoney {
        color: #fff000;
        font-size: px2rem(32px);
        font-weight: 600;
      }
    }

    .bet-action {
      background: #f18819;
      color: #fff;
      border: none;
      border-radius: px2rem(12px);
      padding: px2rem(10px) px2rem(28px);
      font-size: px2rem(28px);
      position: absolute;
      right: px2rem(30px);
      top: px2rem(28px);
    }

    .bet-cancel {
      padding: px2rem(10px) px2rem(48px);
    }
  }
}

.bet-input {
  border: none;
  height: px2rem(60px);
  width: px2rem(120px);
  margin: 0 px2rem(4px) 0 px2rem(8px);
  color: #555;
  font-size: px2rem(28px);
  border-radius: px2rem(10px);
  padding: 0 px2rem(10px);
  box-sizing: border-box;
  font-weight: 600;
}

tr {
  position: relative;

  td {
    position: relative;
  }

  .deleteBtn {
    position: absolute;
    right: px2rem(20px);
    top: px2rem(20px);
    width: px2rem(38px);
    height: px2rem(38px);
    display: inline-block;
    font-size: px2rem(20px);
    fill: #acd5ff;
  }
}
</style>
