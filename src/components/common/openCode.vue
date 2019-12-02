<template>
  <div class="opencode">
    <div class="codes">
      <span
        v-for="(num,index) in codes"
        :class="codeClass + 'b' + num + ' ' + codeClass +'-ball ball'"
        v-text="codeClass=='jsk3' ? '' : num"
        v-show="codeClass != 'bjkl8' && codeClass != 'hk6' && code != 'cqssc'"
        :key="index+codeClass"
      ></span>

      <!--香港六合彩-->
      <span
        v-show="codeClass == 'hk6'"
        v-for="(num,index) in hk6CODE1"
        class="ball hk6-ball"
        :class="hk6Color(codeClass,num)"
        :key="index+codeClass+codeClass"
      >{{num.split('@')[0]}}</span>

      <span class="ball pcdd-ball red-ball-pcdd" v-if="codeClass=='pcdd'">{{redBall}}</span>
      <span
        class="ball hk6-ball"
        :class="hk6Color(codeClass,hk6CODE2)"
        v-if="codeClass=='hk6' && hk6CODE2"
      >{{(hk6CODE2 + '').split('@')[0]}}</span>
      <!--北京快乐8-->
      <div class="bjkl8-row" v-if="codeClass == 'bjkl8'">
        <span class="ball bjkl8-ball row1" v-for="(num,index) in bjkl8ROW1" :key="index">{{num}}</span>
        <br>
        <span class="ball bjkl8-ball row1" v-for="(num,index) in bjkl8ROW2" :key="index+num">{{num}}</span>
      </div>
      <div class="cqssc-row" v-if="code == 'cqssc'">
        <span
          class="ball cqsscImg"
          :class="'cqssc'+num"
          v-for="(num,index) in codes"
          :key="index+num"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { intArray, hk6Color } from "@/methods";
import { GAMES } from "@/config";
import { mapState } from 'vuex';
export default {
  name: "opencode",
  props: ["code", "nums", "numStr"],
  data() {
    return {
      codes: [],
      redBall: 0,
      bjkl8ROW1: [],
      bjkl8ROW2: [],
      hk6CODE1: [],
      hk6CODE2: {}
    };
  },
  mounted() {
    setTimeout(() => {
      this.codeInit();
    }, 20);
    setTimeout(() => {
      this.$store.state.reset += 1;
    }, 1000);
  },
  watch: {
    numStr() {
      this.codeInit();
    }
  },
  methods: {
    // 香港六合彩波色
    hk6Color(code, num) {
      return hk6Color(code, num);
    },
    codeInit() {
      switch (this.codeClass) {
        case "bjpk10":
        case "pk10nn":
        case "jsnn":
        case "jssc":
        case "mlaft":
        case "cqklsf":
        case "gd11x5":
        case "sd11x5":
        case "jx11x5":
        case "js11x5":
        case "gdklsf":
          this.codes = intArray(this.nums);
          break;
        case "pcdd":
          this.redBall = 0;
          this.codes = this.nums;
          this.redBall =
            parseInt(this.nums[0]) +
            parseInt(this.nums[1]) +
            parseInt(this.nums[2]);
          break;
        case "hk6":
          this.codes = this.nums;
          this.hk6CODE1 = [];
          this.hk6CODE2 = {};
          for (var i = 0; i < this.codes.length - 1; i++) {
            this.hk6CODE1.push(this.codes[i]);
          }
          this.hk6CODE2 = this.codes[6];
          break;
        case "bjkl8":
          this.bjkl8ROW1 = [];
          this.bjkl8ROW2 = [];
          for (var i = 0; i < 10; i++) {
            this.bjkl8ROW1.push(parseInt(this.nums[i]));
          }
          for (var i = 10; i < 20; i++) {
            this.bjkl8ROW2.push(parseInt(this.nums[i]));
          }
          break;
        default:
          this.codes = this.nums;
          break;
      }
    }
  },
  computed: {
    // ...mapState(['code']),
    codeClass() {
      if (GAMES && this.code) {
        return GAMES[this.code].class;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .codes {
    height: px2rem(80px);
    line-height: px2rem(80px);
    vertical-align: middle;
  }
.ball {
  display: inline-block;
  font-size: px2rem(28px);
  color: #fff;
  text-align: center;
  line-height: px2rem(40px);
  height: px2rem(40px);
  width: px2rem(40px);
  margin-right: px2rem(10px);
  font-weight: 400;
}
.bjpk10-ball,
.jssc-ball,
.jsnn-ball,
.pk10nn-ball {
  border-radius: px2rem(4px);
}
.pk10nnb1,
.jsnnb1,
.bjpk10b2,
.jsscb2,
.mlaftb2,
.jsftb2 {
  background: #0089ff;
}
.pk10nnb2,
.jsnnb2,
.bjpk10b1,
.jsscb1,
.mlaftb1,
.jsftb1 {
  background: #ffa300;
}
.pk10nnb3,
.jsnnb3,
.bjpk10b3,
.jsscb3,
.mlaftb3,
.jsftb3 {
  background: #4b4b4b;
}
.pk10nnb4,
.jsnnb4,
.bjpk10b4,
.jsscb4,
.mlaftb4,
.jsftb4 {
  background: #ff7300;
}
.pk10nnb5,
.jsnnb5,
.bjpk10b5,
.jsscb5,
.mlaftb5,
.jsftb5 {
  background: #00a3a3;
}
.pk10nnb6,
.jsnnb6,
.bjpk10b6,
.jsscb6,
.mlaftb6,
.jsftb6 {
  background: #5235ff;
}
.pk10nnb7,
.jsnnb7,
.bjpk10b7,
.jsscb7,
.mlaftb7,
.jsftb7 {
  background: #8a8a8a;
}
.pk10nnb8,
.jsnnb8,
.bjpk10b8,
.jsscb8,
.mlaftb8,
.jsftb8 {
  background: #ff0000;
}
.pk10nnb9,
.jsnnb9,
.bjpk10b9,
.jsscb9,
.mlaftb9,
.jsftb9 {
  background: #760000;
}
.pk10nnb10,
.jsnnb10,
.bjpk10b10,
.jsscb10,
.mlaftb10,
.jsftb10 {
  background: #04bf00;
}
.mlaft-ball,
.jsft-ball {
  border-radius: px2rem(16px);
}
.cqssc-ball,
.jsssc-ball,
.tjssc-ball,
.xjssc-ball {
  padding: px2rem(1px);
  width: px2rem(40px);
  height: px2rem(40px);
  line-height: px2rem(40px);
  border-radius: px2rem(16px);
  color: #fff;
  background-color: #FF3C00;
  border-radius: 50%;
  margin-right: px2rem(10px);
}
.jsk3-ball {
  width: px2rem(40px);
  height: px2rem(40px);
  zoom: 0.8;
  vertical-align: middle;
}
.jsk3b1 {
  background-image: url("../../assets/images/jsk31.png");
  background-size: cover;
}
.jsk3b2 {
  background-image: url("../../assets/images/jsk32.png");
  background-size: cover;
}
.jsk3b3 {
  background-image: url("../../assets/images/jsk33.png");
  background-size: cover;
}
.jsk3b4 {
  background-image: url("../../assets/images/jsk34.png");
  background-size: cover;
}
.jsk3b5 {
  background-image: url("../../assets/images/jsk35.png");
  background-size: cover;
}
.jsk3b6 {
  background-image: url("../../assets/images/jsk36.png");
  background-size: cover;
}
.cqsscImg {
  width: px2rem(40px);
  height: px2rem(40px);
  display: inline-block;
  vertical-align: middle;
  background: url("../../assets/images/cqsscBall.png");
  background-repeat: no-repeat;
  background-size: 100%;
  &.cqssc0 {
    background-position: 0px px2rem(0);
  }
  &.cqssc1 {
    background-position: 0px px2rem(-40px);
  }
  &.cqssc2 {
    background-position: 0px px2rem(-80px);
  }
  &.cqssc3 {
    background-position: 0px px2rem(-120px);
  }
  &.cqssc4 {
    background-position: 0px px2rem(-160px);
  }
  &.cqssc5 {
    background-position: 0px px2rem(-200px);
  }
  &.cqssc6 {
    background-position: 0px px2rem(-240px);
  }
  &.cqssc7 {
    background-position: 0px px2rem(-280px);
  }
  &.cqssc8 {
    background-position: 0px px2rem(-320px);
  }
  &.cqssc9 {
    background-position: 0px px2rem(-360px);
  }
  
}
.pcdd-ball,
.cqklsf-ball {
  border-radius: 50%;
  color: #fff;
  background-color: #69c56b;
  margin-right: px2rem(4px);
}
.red-ball-pcdd {
  background: #ff4c1e;
  color: #fff;
}
.gd11x5-ball,
.gdklsf-ball {
  color: #fff;
  background-color: #FF3C00;
  border-radius: 50%;
  margin-right: px2rem(10px);
}
.hk6-ball {
  border-radius: px2rem(40px);
  color: #d91d37;
  box-sizing: border-box;
}

.red-ball-hk6 {
  background: #ff4c1e;
  border: 1px solid #ff4c1e;
}
.red {
  color: #fff;
  background: #ff5b71;
}
.blue {
  color: #fff;
  background: #0094f3;
}
.green {
  color: #fff;
  background: #429f31;
}
.bjkl8-row {
  line-height: px2rem(40px);
}
.bjkl8-ball {
  position: relative;
  margin-top: px2rem(2px);
  border-radius: px2rem(40px);
  font-weight: 400;
  color: #fff;
  background-color: #FF3C00;
  width: px2rem(36px);
  height: px2rem(36px);
  line-height: px2rem(36px);
  font-size: px2rem(26px);
  zoom: 0.7;
}
</style>
