<template>
  <div class="announcementPop" v-show="isShow">
    <div class="box">
      <div class="top">
        <img class="closeBtn" @click="closePop" src="../../assets/images/announcement/close.png" alt />
      </div>
      <div class="content">
        <scroll ref="wrapperLeft" class="wrapperLeft">
          <div class="left">
            <div
              class="titles"
              :class="{'active':curIndex == index}"
              @click="changeCurIndex(index)"
              v-for="(item,index) in announcement"
              :key="index"
            >
              <span>{{item.name}}</span>
            </div>
          </div>
        </scroll>
        <scroll ref="wrapperRight" class="wrapperRight">
          <div class="right">
            <div
              v-for="(item,index) in announcement[curIndex]&&announcement[curIndex].data"
              :key="index"
            >
              <h3>{{item.title}}</h3>
              <p class="time">{{timestampToTime(item.time)}}</p>
              <p class="contentText">{{item.content}}</p>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "./scroll";
import { mapState } from "vuex";
export default {
  name: "announcementPop",
  data() {
    return {
      isShow: true,
      curIndex: 0
    };
  },
  mounted() {
    window.onbeforeunload = function() {
      // 刷新、关闭 页面之前，做一些其他的事情。
      sessionStorage.removeItem('isShowAnnouncementPop');
    };

    this.isShow = sessionStorage.getItem('isShowAnnouncementPop') == 1 ? false:true;
  },
  methods: {
    closePop() {
      this.isShow = false;
      sessionStorage.setItem('isShowAnnouncementPop',1);
    },

    changeCurIndex(index) {
      this.curIndex = index;
      setTimeout(() => {
        this.$refs.wrapperRight.refresh();
      }, 50);
    },

    timestampToTime(timestamp) {
      var Y, M, D, h, m, s;
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() + " ";
      h = date.getHours() + ":";
      m = date.getMinutes() + ":";
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  computed: {
    ...mapState(["announcement"])
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.announcementPop {
  position: absolute;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.7);
  .box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 8px;
    width: px2rem(539px);
    height: px2rem(666px);
    background-image: url("../../assets/images/announcement/background.png");
    background-repeat: no-repeat;
    background-size: contain;
    .top {
      position: relative;
      .closeBtn {
        position: absolute;
        width: px2rem(80px);
        height: px2rem(80px);
        right: px2rem(-50px);
        top: 0;
      }
    }
    .content {
      padding: px2rem(20px);
      height: px2rem(460px);
      position: absolute;
      bottom: px2rem(16px);
      width: 100%;
      box-sizing: border-box;
      .wrapperLeft {
        width: px2rem(180px);
        overflow: hidden;
        position: absolute;
        left: px2rem(-20px);
        bottom: 0;
        top: 0;
        border-bottom-left-radius: 8px;
        border-right: 1px solid #eee;
        box-sizing: border-box;
      }
      .wrapperRight {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        padding-right: px2rem(20px);
        box-sizing: border-box;
        overflow: hidden;
        width: px2rem(380px);
      }
      .left {
        .titles {
          font-size: px2rem(26px);
          padding: 0 0 0 px2rem(20px);
          text-overflow: ellipsis;
          white-space: nowrap;
          height: px2rem(80px);
          line-height: px2rem(80px);
          color: #666666;
          position: relative;
          width: 0;
          span {
            border-bottom: 1px solid #eee;
            text-align: center;
            display: inline-block;
            width: px2rem(160px);
            height: px2rem(80px);
            box-sizing: border-box;
          }
          &.active {
            width: px2rem(160px);
            background-color: #5CA0DB;
            color: #fff;
            transition: all 200ms ease-in-out 0s;

            &::after {
                content: "";
                display: block;
                width: px2rem(20px);
                height: px2rem(20px);
                box-sizing: border-box;
                position: absolute;
                left: 0;
                bottom: px2rem(-20px);
                border-width: px2rem(10px);
                border-style: solid;
                border-color: rgb(38, 98, 166) rgb(38, 98, 166) transparent transparent;
                border-image: initial;
                border-left: 5px solid transparent;
                border-bottom: 5px solid transparent;
            }
          }
        }
      }
      .right {
        flex: 1;
        font-size: px2rem(26px);
        padding: px2rem(20px);
        h3 {
          /*text-align: center;*/
          color: #666;
        }
        .time {
          color: #4d4d4d;
          margin: px2rem(10px) 0;
          /*text-align: center;*/
        }
        .contentText {
          color: #666;
        }
      }
    }
  }
}
</style>
