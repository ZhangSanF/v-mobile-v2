<template>
  <div class="bet-zhix">
    <lma-radio :data="gamePlay" @lmaIndexChanged="lmaIndexChanged"></lma-radio>

    <div class="bet-con" v-if="gameData">
      <div class="table-item">
        <h4>第一球</h4>
        <grid :cols="4" :show-lr-borders="true" :show-vertical-dividers="true">
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
      </div>

      <div class="table-item">
        <h4>第二球</h4>
        <grid :cols="4" :show-lr-borders="true" :show-vertical-dividers="true">
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
      </div>

      <div class="table-item" v-if="lmaIndex === 1">
        <h4>第三球</h4>
        <grid :cols="4" :show-lr-borders="true" :show-vertical-dividers="true">
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
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Grid, GridItem } from "vux";
import LmaRadio from "./LmaRadio";
export default {
  name: "BetZhix",
  components: { LmaRadio, Grid, GridItem },
  data() {
    return {
      lmaIndex: 0,
      table1: [],
      table2: [],
      table3: []
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
      if (this.table2.indexOf(a) + this.table3.indexOf(a) >= -1) {
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
      if (this.table1.indexOf(a) + this.table3.indexOf(a) >= -1) {
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
      if (this.table1.indexOf(a) + this.table2.indexOf(a) >= -1) {
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
      switch (this.lmaIndex) {
        case 0:
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

        case 1:
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
    ...mapState(["code", "play", "checkedData"]),
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
  .td-table-content {
    padding: px2rem(1px);
    border: none;
    vertical-align: top;
  }
}
.c-txt3 {
  color: orangered;
}
.tab_title02 {
  cursor: pointer;
}
.bet-con {
  margin: px2rem(10px) 0;
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
  font-size: px2rem(24px);
  height: px2rem(92px);
  padding: px2rem(15px) 0;
  border-radius: px2rem(10px);
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin: px2rem(5px) 0 0 px2rem(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .name {
    font-weight: 600;
    width: px2rem(40px);
    height: px2rem(40px);
    display: inline-block;
    text-align: center;
    line-height: px2rem(40px);
    background: #51a4fb;
    color: #fff;
    border-radius: 50%;
  }
  .odds {
    font-size: px2rem(24px);
    color: orange;
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
.checked {
  background: #51a4fb;
  .odds,
  .name {
    color: #fff;
  }
  .name {
    background-color: #fff;
    color: #51a4fb;
  }
}

  .weui-grids:before, .weui-grid:before {
    border: none;
  }

  .weui-grids:after, .weui-grid:after {
    border: none;
  }
</style>
