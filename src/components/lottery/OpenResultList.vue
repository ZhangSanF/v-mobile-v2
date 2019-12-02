<template>
  <div class="open-result-list">
    <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
      <thead>
        <tr class="tableHead">
          <th>
            <p>期号</p>
          </th>
          <th>
            <!--          <button>开奖号码</button>-->
            <button
              :class="{'selected' : type == 'open_result'}"
              @click="type='open_result';showBall = ''"
            >号码</button>
            <button
              :class="{'selected' : type == 'dx'}"
              @click="type='dx';showBall = ''"
              v-if="openResult[code].code_type == 'pk10' || openResult[code].code_type == 'ssc'"
            >大小</button>
            <button
              :class="{'selected' : type == 'ds'}"
              @click="type='ds';showBall = ''"
              v-if="openResult[code].code_type == 'pk10' || openResult[code].code_type == 'ssc'"
            >单双</button>
            <button
              :class="{'selected' : type == 'lh'}"
              @click="type='lh';showBall = ''"
              v-if="openResult[code].code_type == 'pk10' || openResult[code].code_type == 'ssc'"
            >龙虎</button>
            <!--          <button @click="toPage(`/data?page=History&code=${code}`)">龙虎</button>-->
          </th>
        </tr>
      </thead>

      <tbody v-if="openResult[code].code_type == 'pk10' || openResult[code].code_type == 'ssc'">
        <tr v-for="(item, index) of listData">
          <td class="phase">
            <p>{{item.open_phase}}</p>
          </td>
          <td class="result" :class="code">
            <span
              v-for="(res, index) of item.result[type]"
              class="ball"
              :key="index"
              :class="[className(res, code, type), {'selectedBall': showBall == res}, {'allBall': showBall == ''}, {'disSelectedBall' : showBall != '' && showBall != res}, {'cqssc c-b-sx': code == 'cqssc' && type=='open_result'}, 'sxb' + res]"
            >{{res}}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" @click="toPage(`/data?page=History&code=${code}`)">
            <span class="getMoreBtn">查看所有数据</span>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr v-for="(item, index) of listData" :key="index + 'a'" v-if="listData.length">
          <td>
            <p>{{item.open_phase}}</p>
          </td>
          <td>
            <open-code :code="code" :nums="item.result[0]" :numStr="item.result[0].join(',')"></open-code>
          </td>
        </tr>
        <tr>
          <td colspan="3" @click="toPage(`/data?page=History&code=${code}`)">
            <span class="getMoreBtn">查看所有数据</span>
          </td>
        </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
import openCode from "@/components/common/openCode";

Vue.use(Viewer);
import {
  Loading,
  XDialog,
  XButton,
  XTable,
  TransferDomDirective as TransferDom
} from "vux";
import BScroll from "better-scroll";
import scroll from "@/components/common/scroll";
import { betInit, PAGES, GAMES } from "@/config";
import { setTimeout } from "timers";

export default {
  name: "OpenResultList",
  directives: {
    TransferDom
  },
  props:['openResultListShow'],
  components: {
    scroll,
    BScroll,
    Loading,
    XDialog,
    XButton,
    Viewer,
    XTable,
    openCode
  },
  data() {
    return {
      page: 1,
      listData: [],
      type: "open_result",
      showBall: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.refreshData();
    }, 20);
  },
  methods: {
    ...mapActions(["homeIndexGetCodeResultTrend", "homeIndexGetCodeResult"]),

    refreshData() {
      let type = this.openResult[this.code].code_type || "pk10";
      if (type == "ssc" || type == "pk10") {
        this.homeIndexGetCodeResultTrend({
          page: this.page,
          code: this.code
        }).then(res => {
          if (res.resCode === 1000) {
            this.listData = res.data.data;
          }
        });
      } else {
        this.homeIndexGetCodeResult({
          page: this.page,
          code: this.code
        }).then(res => {
          if (res.resCode === 1000) {
            this.listData = res.data.data;
          }
        });
      }
    },

    toPage(url) {
      this.$emit("rightMenuClosed");
      this.$router.push(`${url}`);
    },

    className(num, code, type) {
      switch (type) {
        case "open_result":
          var pk10Code = ["bjpk10", "mlaft", "jssc", "jsft", "hlsc", "hlft"];
          if (pk10Code.indexOf(code) >= 0) {
            return `ball${num}`;
          } else {
            return `sscBall`;
          }
          break;

        case "dx":
          if (num == "大") {
            return `da`;
          } else {
            return `xiao`;
          }
          break;

        case "ds":
          if (num == "单") {
            return `dan`;
          } else {
            return `shuang`;
          }
          break;

        case "lh":
          if (num == "和") {
            return "he";
          } else if (num == "单" || num == "小" || num == "虎") {
            return `hu`;
          } else if (num == "双" || num == "大" || num == "龙") {
            return `long`;
          } else {
            return `num`;
          }
          break;
      }
    }
  },
  watch: {
    code() {
      this.listData = [];
      this.type = "open_result";
      this.refreshData();
    },
    openResultListShow(){
      if(this.openResultListShow){
        this.refreshData();
      }
    },
    isRsfreshOpenListData(){
      if(this.isRsfreshOpenListData){
        if(this.openResultListShow){
          this.refreshData();
        }
        this.$store.commit('SET_IS_REFRESH_OPEN_LIST_DATA',false);
      }
    }
  },
  computed: {
    ...mapState(["code", "play", "chat", "user", "openResult","isRsfreshOpenListData"])
  }
};
</script>

<style scoped lang="scss">
.open-result-list {
  width: 100%;
  height: px2rem(480px);
  font-size: px2rem(24px);
  overflow: scroll;
  color: #555;

  table {
    width: 100%;

    .tableHead {
      background-color: #f1f1f1;
      box-shadow: inset -1px 4px 3px hsla(0, 0%, 49%, 0.12);
      border: none;
    }

    th {
      padding: 0;
      height: px2rem(80px);
      font-size: px2rem(30px);
      color: #777;

      button {
        background-color: rgba(115, 115, 115, 0.5);
        color: #fff;
        border: none;
        border-radius: px2rem(6px);
        padding: px2rem(2px) px2rem(12px);
        margin-left: px2rem(10px);

        &.selected {
          background: #51a4fb;
        }
      }
    }

    th:nth-of-type(1) {
      box-sizing: border-box;
      font-size: px2rem(28px);
      p {
        height: px2rem(54px);
        line-height: px2rem(54px);
        border-right: 1px solid #c4e1ff;
      }
    }

    tr {
      height: px2rem(80px);
      box-sizing: border-box;
      padding: 0 px2rem(10px);
    }

    td {
      box-sizing: border-box;
      border: none;
      padding: 0;
      border-bottom: 1px dashed #eee;

      p {
        height: px2rem(34px);
        line-height: px2rem(34px);
        border-right: 1px solid #c4e1ff;
        position: relative;
        right: -1px;
      }
    }
  }
}

.result {
  .ball {
    display: inline-block;
    font-weight: 400;
    margin-left: px2rem(4px);
    width: px2rem(36px);
    height: px2rem(36px);
    text-align: center;
    line-height: px2rem(36px);
    font-size: px2rem(24px);
    border-radius: px2rem(4px);
    background: #ccc;
    cursor: pointer;
    color: #fff;
  }

  .selected {
    background: orangered;
  }

  .ball1 {
    background: #ffc107;
  }

  .ball2 {
    background: #0192dd;
  }

  .ball3 {
    background: #4b4b4b;
  }

  .ball4 {
    background: #f57205;
  }

  .ball5 {
    background: #11b2b5;
  }

  .ball6 {
    background: #5235ff;
  }

  .ball7 {
    background: #838383;
  }

  .ball8 {
    background: #ff2600;
  }

  .ball9 {
    background: #780b00;
  }

  .ball10 {
    background: #07bf00;
  }

  .da,
  .shuang,
  .long {
    background: #ff9e00;
  }

  .xiao,
  .dan,
  .hu {
    background: #5c99ff;
  }

  .num {
    background: #ff7c6a;
  }

  .he {
    background: #ff1b69;
  }

  .sscBall {
    border-radius: px2rem(18px);
    background: #5c99ff;
  }
}

.getMoreBtn {
  background: #ffa23f;
  color: #fff;
  padding: px2rem(6px) px2rem(18px);
  border-radius: px2rem(6px);
}
</style>
