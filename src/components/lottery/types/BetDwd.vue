<template>
  <div class="bet-zhix">
    <lma-radio :data="gamePlay" @lmaIndexChanged="lmaIndexChanged"></lma-radio>
    <p class="lma-odds" v-if="playChecked">
      赔率:
      <span>{{playChecked.odds || '--'}}</span>
    </p>
    <div class="title">
      <div v-show="lmaIndex == 0 || lmaIndex == 1 || codeAndPlay.indexOf('szdw') != -1">佰位</div>
      <div v-show="lmaIndex == 0 || lmaIndex == 2 || codeAndPlay.indexOf('szdw') != -1">拾位</div>
      <div v-show="lmaIndex == 1 || lmaIndex == 2 || codeAndPlay.indexOf('szdw') != -1">个位</div>
    </div>
    <div class="bet-con" v-if="gameData">
      <div class="table-item">
        <grid :cols="1" :show-lr-borders="true" :show-vertical-dividers="true">
          <grid-item v-for="(item, index) of gameData.numbers" :key="index">
            <div
              class="bet"
              @click="betClick1(item, $event)"
              :class="{checked: table1.indexOf(item) >= 0}"
            >
              <span class="name">{{item}}</span>
            </div>
          </grid-item>
        </grid>
        <grid :cols="1" :show-lr-borders="true" :show-vertical-dividers="true">
          <grid-item v-for="(item, index) of gameData.numbers" :key="index">
            <div
              class="bet"
              @click="betClick2(item, $event)"
              :class="{checked: table2.indexOf(item) >= 0}"
            >
              <span class="name">{{item}}</span>
            </div>
          </grid-item>
        </grid>
        <grid
          v-if="codeAndPlay.indexOf('szdw') != -1"
          :cols="1"
          :show-lr-borders="true"
          :show-vertical-dividers="true"
        >
          <grid-item v-for="(item, index) of gameData.numbers" :key="index">
            <div
              class="bet"
              @click="betClick3(item, $event)"
              :class="{checked: table3.indexOf(item) >= 0}"
            >
              <span class="name">{{item}}</span>
            </div>
          </grid-item>
        </grid>
      </div>
    </div>
    <toast
      v-model="showToast"
      :type="toastType"
      :time="1200"
      is-show-mask
      :text="toastText"
      :position="toastPosition"
    ></toast>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Grid, GridItem, Toast } from "vux";
import LmaRadio from "./LmaRadio";
export default {
  name: "BetZhix",
  components: { LmaRadio, Grid, GridItem, Toast },
  data() {
    return {
      lmaIndex: 0,
      table1: [],
      table2: [],
      table3: [],
      toastText: "",
      toastType: "cancel",
      toastPosition: "center",
      showToast: false
    };
  },

  methods: {
    tableNumsInit() {
      this.table1 = [];
      this.table2 = [];
      this.table3 = [];
    },
    lmaIndexChanged(e) {
      this.lmaIndex = e;
      this.tableNumsInit();
      this.$store.commit("SCROLL_REFRESH");
    },
    betClick1(a, e) {
      if (this.closed) {
        this.toastText = "封盘中，请稍后";
        this.showToast = true;
        return;
      }
      var check = this.table1.indexOf(a) >= 0;
      if (!check) {
        this.table1.push(a);
      } else {
        var i = this.table1.indexOf(a);
        if (i >= 0) {
          this.table1.splice(i, 1);
        }
      }
      this.checkedCount();
    },
    betClick2(a, e) {
      if (this.closed) {
        this.toastText = "封盘中，请稍后";
        this.showToast = true;
        return;
      }
      var check = this.table2.indexOf(a) >= 0;
      if (!check) {
        this.table2.push(a);
      } else {
        var i = this.table2.indexOf(a);
        if (i >= 0) {
          this.table2.splice(i, 1);
        }
      }
      this.checkedCount();
    },
    betClick3(a, e) {
      if (this.closed) {
        this.toastText = "封盘中，请稍后";
        this.showToast = true;
        return;
      }
      var check = this.table3.indexOf(a) >= 0;
      if (!check) {
        this.table3.push(a);
      } else {
        var i = this.table3.indexOf(a);
        if (i >= 0) {
          this.table3.splice(i, 1);
        }
      }
      this.checkedCount();
    },
    checkedCount() {
      this.$store.commit("DELETE_ALL_CHECKED_DATA");
      var res = [];
      switch (this.codeAndPlay) {
        case "fc3dezdw":
        case "pl3ezdw":
          if (this.table1.length == 0 || this.table2.length == 0) {
            res = [];
          } else {
            for (var i = 0; i < this.table1.length; i++) {
              for (var j = 0; j < this.table2.length; j++) {
                res.push(this.table1[i] + "," + this.table2[j]);
              }
            }
          }
          break;

        case "fc3dszdw":
        case "pl3szdw":
          if (
            this.table1.length == 0 ||
            this.table2.length == 0 ||
            this.table3.length == 0
          ) {
            res = [];
          } else {
            for (var i = 0; i < this.table1.length; i++) {
              for (var j = 0; j < this.table2.length; j++) {
                for (var k = 0; k < this.table3.length; k++) {
                  res.push(
                    this.table1[i] + "," + this.table2[j] + "," + this.table3[k]
                  );
                }
              }
            }
          }
          break;
      }
      if (res.length) {
        this.$store.commit("SAVE_CHECKED", {
          uid: this.nid,
          num: res,
          play: this.playChecked,
          key: this.play
        });
      }
    }
  },
  computed: {
    ...mapGetters(["gameData", "codeAndPlay"]),
    ...mapState(["code", "play", "checkedData", "closed"]),
    nid() {
      if (this.playChecked) {
        return this.playChecked.play.replace("@", "");
      }
    },
    gamePlay() {
      if (this.gameData && this.gameData.play) {
        return this.gameData.play;
      }
    },
    playChecked() {
      if (this.gamePlay) {
        return this.gamePlay[this.lmaIndex];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table-item {
  margin: 0 0 px2rem(20px) 0;
  font-size: px2rem(16px);
  display: flex;
  .td-table-content {
    padding: px2rem(1px);
    border: none;
    vertical-align: top;
  }
}
.lma-radio {
  height: px2rem(60px);
  line-height: px2rem(60px);
  /deep/ .vux-tab-container {
    line-height: px2rem(60px) !important;
    height: px2rem(60px) !important;
    .vux-tab-item {
      line-height: px2rem(60px) !important;
      height: px2rem(60px) !important;
      background-color: #dfdfdf !important;
      color: #666 !important;
      font-size: px2rem(28px) !important;
    }
    .vux-tab-selected {
      background-color: #fff !important;
      color: #3a63aa !important;
    }
  }
}
.title {
  display: flex;
  font-size: px2rem(28px);
  height: px2rem(60px);
  line-height: px2rem(60px);
  margin-top: px2rem(10px);
  background-color: #ddd;
  div {
    flex: 1;
    text-align: center;
    line-height: px2rem(60px);
    border: 1px solid #ccc;
  }
}
.c-txt3 {
  color: orangered;
}
.tab_title02 {
  cursor: pointer;
}
.bet-con {
  thead th {
    border-bottom: none;
  }
}
.checked {
  background: rgba(255, 227, 135, 0.835);
}
h4 {
  text-align: center;
  color: #f45541;
  font-size: px2rem(16px);
}
.weui-grid {
  padding: px2rem(1px);
}
.bet {
  text-align: center;
  height: px2rem(92px);
  line-height: px2rem(92px);
  background: #fff;
  .name {
    font-weight: 600;
    width: px2rem(40px);
    height: px2rem(40px);
    display: inline-block;
    text-align: center;
    line-height: px2rem(40px);
    margin-right: px2rem(2px);
    padding: px2rem(1px);
    border-radius: px2rem(16px);
    background: #0094f3;
    color: #fff;
    border-radius: 50%;
    margin-right: px2rem(2px);
    font-size: px2rem(14px);
    margin-right: px2rem(4px);
  }
  .odds {
    font-size: px2rem(24px);
    color: #ff2f4b;
  }
}
.checked {
  background: #51a4fb;
  .name {
    background-color: #fff;
    color: #51a4fb;
  }
}
.lma-odds {
  text-align: center;
  font-size: px2rem(28px);
  font-weight: 600;
  color: #51a4fb;
  height: px2rem(60px);
  line-height: px2rem(60px);
  background-color: #fff;
  span {
    color: #f00;
  }
}
.weui-grids{
  padding: px2rem(.05px);
}
</style>
