<template>
  <div class="pk10nn">
    <div class="openResult">
      <grid :cols="6" :show-lr-borders="true"  :show-vertical-dividers="true" v-if="openData">
        <grid-item v-for="(item,index) in openData.resultDetail" :key="index" >
          <div class="box">
              <div class="nnRes" :class="['nnRes'+item.result]"></div>
              <div class="nnIsWin" v-if="item.is_win == 1"></div>
          </div>
          <div class="name" v-if="index == 0">庄</div>
          <div class="name" v-if="index > 0">闲{{convertNumber(index)}}</div>
        </grid-item>
      </grid>
      <load-more v-else :tip="'正在加载'"></load-more>
    </div>
    <lma-radio :data="tabData" @lmaIndexChanged="lmaIndexChanged" />
    <div class="title">{{curData.title}} <span @click.prevent="showRule" class="font-important-color">[赔率说明]</span></div>
    <div class="selectBox">
      <grid :cols="5" :show-lr-borders="true"  :show-vertical-dividers="true">
          <grid-item v-for="(item,index) in curData.data"  :key="index">
            <n-bet :item="item" />
          </grid-item>
      </grid>
      
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {Grid,GridItem,GroupTitle,Confirm,LoadMore,TransferDomDirective as TransferDom,Icon} from "vux";
import { setTimeout } from "timers";
import LmaRadio from "./LmaRadio";
import NBet from "./NBet";
export default {
  name: "Pk10nn",
  components: {
    Grid,
    GridItem,
    LoadMore,
    GroupTitle,
    Icon,
    Confirm,
    LmaRadio,
    NBet
  },
  props: ["item"],
  data() {
    return {
      tabData: [{ desc: "翻倍" },{ desc: "平倍" }],
      curData:{},
      curItem:{},
      isShowRule: false,
      curTabIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {

    }, 200);
  },
  methods: {

    showRule () {
      let fbTxt = `<h3>赔率说明</h3>
                  <div>
                  <p>①、下注会暂时冻结下注金额的4倍，例：下注1元，冻结4元，总金额5元。开奖后连本带利一并返还。</p>
                  <p>②、赔率：牛一至牛六（2）、牛七牛八（3）、牛九（4）、牛牛（6）以上赔率包含本金。</p>
                  <p>注：当庄与闲点数相等时，庄赢。</p>
                  <p>③、闲赢右上角会有个赢标志，输不会显示。</p>
                  </div>`;
      let pbTxt = `<h3>赔率说明</h3>
                  <div>
                  <p>①、赔率：牛一至牛九、牛牛赔率均为2(包含本金)。</p>
                  <p>注：当庄与闲点数相等时，庄赢。</p>
                  <p>②、闲赢右上角会有个赢标志，输不会显示。</p>
                  </div>`;
      let content = this.curTabIndex == 0 ? fbTxt : pbTxt;
      var _this = this
      this.$vux.alert.show({
        title: _this.curData.title,
        content: content,
      })
    },

    lmaIndexChanged(index) {
      this.curTabIndex = index;
      let curType = index == 0 ? 'fb' : 'pb';
      if(this.gameData) this.curData = this.gameData[curType];
    },

    // 转换数字为汉字数组
    convertNumber(num){
      var chnNumChar = ['零','一','二','三','四','五','六','七','八','九'];
      return chnNumChar[num];
    }
  },
  watch: {
    gameData:function() {
      this.lmaIndexChanged(0);
    },
  },
  computed: {
    ...mapState(["code", "play", "checkedData", "closed"]),
    ...mapGetters(['gameData','openData']),
    uid() {
      if(this.curItem.play){
        return this.curItem.play.replace('@', '');
      }
    },
    isChecked() {
				var list = this.checkedData;
				var keyArr = _.keysIn(this.checkedData);
				if(keyArr.indexOf(this.uid) >= 0){
					return true;
				}else{
					return false;
				}
      },
  },
};
</script>

<style lang="scss" scoped>
  .pk10nn {
    .openResult{
      margin-bottom: px2rem(10px);
      height: px2rem(175px);
      .weui-grid{
        background-color: #fff;
        padding: px2rem(5px) px2rem(3px) 0;
        .box{
          background-color: #abbfff;
          border-radius: px2rem(4px);
          height: px2rem(120px);
          position: relative;
          .nnRes{
            background-image: url('../../../assets/images/niuniu_sprite.png');
            background-position: px2rem(60px,false) 0;
            background-size: px2rem(597px) px2rem(664px);
            position: absolute;
            left: 0;
            right: 0;
            top: px2rem(25px);
            bottom: 0;
            margin: auto;
            width: px2rem(56px);
            height: px2rem(31px);
            &.nnRes0{
              background-position: px2rem(2px,false)  0px;
            }
            &.nnRes1{
              background-position: px2rem(2px,false) px2rem(50px,false);
            }
            &.nnRes2{
              background-position: px2rem(2px,false) px2rem(100px,false);
            }
            &.nnRes3{
              background-position: px2rem(2px,false) px2rem(145px,false);
            }
            &.nnRes4{
              background-position: px2rem(2px,false) px2rem(190px,false);
            }
            &.nnRes5{
              background-position: px2rem(2px,false) px2rem(240px,false);
            }
            &.nnRes6{
              background-position: px2rem(2px,false) px2rem(290px,false);
            }
            &.nnRes7{
              background-position: px2rem(2px,false) px2rem(340px,false);
            }
            &.nnRes8{
              background-position: px2rem(2px,false) px2rem(385px,false);
            }
            &.nnRes9{
              background-position: px2rem(2px,false) px2rem(435px,false);
            }
            &.nnRes10{
              background-position: px2rem(2px,false) px2rem(480px,false);
            }
          }
          .nnIsWin{
            position: absolute;
            right: 0;
            left: 0;
            margin: 0 auto;
            background-image: url('../../../assets/images/niuniu_sprite.png');
            background-position: px2rem(55px,false) px2rem(120px,false);
            background-size: px2rem(357px) px2rem(424px);
            width: px2rem(60px);
            height: px2rem(60px);
          }
        }
        .name{
          text-align: center;
          color: #ffa300;
          font-size: px2rem(24px);
          line-height: px2rem(50px);
          white-space: nowrap;
        }
      }
    }
    .lma-radio{
    height: px2rem(60px);
    line-height: px2rem(60px);
    /deep/ .vux-tab-container{
      line-height: px2rem(60px) !important;
      height: px2rem(60px) !important;
      .vux-tab-item{
        line-height: px2rem(60px) !important;
        height: px2rem(60px) !important;
        background-color: #dfdfdf !important;;
        color: #666 !important;;
        font-size: px2rem(28px) !important;;
      }
      .vux-tab-selected{
        background-color: #fff !important;;
        color: #3a63aa !important;;
      }
    }
  }
    .title{
      background-color: #e4e4e4;
      text-align: center;
      height: px2rem(60px);
      line-height: px2rem(60px);
      font-size: px2rem(30px);
      color: #51a4fb;
      span{
        color: #666;
      }
    }
    .selectBox{
      font-size: px2rem(16px);
      background-color: #fff;
    }
}

.weui-grid{
  padding: 0;
}
.weui-grids:before, .weui-grid:before {
    border: none;
  }

  .weui-grids:after, .weui-grid:after {
    border: none;
  }
</style>
