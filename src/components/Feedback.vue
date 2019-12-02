<template>
  <div class="Feedback">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >
      <div class="header-content">
        <span class="header-title">意见反馈</span>
      </div>
    </x-header>
    <scroll class="scrollBox" :data="list">
      <div class="wrapper-tontent">
        <div class="bannerImg">
          <img src="../assets/images/img_feedback.png" alt>
        </div>
        <div class="feedbackType">
          <div class="title">反馈类型</div>
          <div class="options">
            <div
              v-for="(item,index) in feedbackType"
              :key="index"
              class="opt"
              @click="selectIndex = item.id"
              :class="{'active':selectIndex == item.id}"
            >{{item.name}}</div>
          </div>
        </div>
        <div class="feedbackContent">
          <div class="title">反馈内容</div>
          <div class="content">
            <textarea
              placeholder="请输入您在使用过程中遇到的问题，255个字以内"
              maxlength="255"
              v-model="feedbackContent"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        <div class="feedbackContent">
          <div class="title">对首页的各个方面，您打几分呢？</div>
          <div class="score">
            <div class="item">
              <label>页面打开速度</label>
              <div class="stars">
                <rater :margin="10" active-color="#ffb304" v-model="speedVal"></rater>
              </div>
            </div>
            <div class="item">
              <label>界面设计美观</label>
              <div class="stars">
                <rater :margin="10" active-color="#ffb304" v-model="interfaceVal"></rater>
              </div>
            </div>
            <div class="item">
              <label>操作过程合理</label>
              <div class="stars">
                <rater :margin="10" active-color="#ffb304" v-model="operationVal"></rater>
              </div>
            </div>
          </div>
        </div>
        <div class="submitBox">
          <button @click="submit">立即提交</button>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/common/scroll";
import { mapActions } from "vuex";
import { XHeader, Rater } from "vux";
export default {
  name: "Feedback",
  data() {
    return {
      list: [],
      speedVal: 5,
      feedbackContent: "",
      interfaceVal: 5,
      operationVal: 5,
      selectIndex: 0,
      feedbackType: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getSuggestionGetTypeFunc();
    });
  },
  methods: {
    ...mapActions(["getSuggestionGetType", "getSuggestionSuggest"]),

    getSuggestionGetTypeFunc() {
      this.getSuggestionGetType({type: null}).then(res => {
        if (res.resCode === 1000) {
          this.feedbackType = res.data;
        } else {
          this.$vux.alert.show({
            title: "获取数据失败",
            content: `获取数据失败，请刷新页面重试，如果重复出现此问题请联系客服处理！<br>[code:${
              res.resCode
            }][msg:${res.msg}]`
          });
        }
      });
    },

    submit() {
      let _this =this;
      this.getSuggestionSuggest({
        type: this.selectIndex,
        content: this.feedbackContent,
        speed: this.speedVal,
        interface: this.interfaceVal,
        operate: this.operationVal
      }).then(res => {
        if (res.resCode === 1000) {
          this.$vux.confirm.show({
            title: "提交成功",
            content: `是否返回首页？`,
            onConfirm: () => {
              _this.$router.push('/');
            }
          });
        } else {
          this.$vux.alert.show({
            title: "获取数据失败",
            content: `${res.msg}`
          });
        }
      });
    }
  },

  components: { XHeader, scroll, Rater }
};
</script>

<style lang="scss" scoped>
.Feedback {
  font-size: px2rem(14px);
  .scrollBox {
    background-color: #fff;
    overflow: hidden;
    position: absolute;
    top: px2rem(92px);
    bottom: 0;
    left: 0;
    right: 0;

    .bannerImg {
      img {
        width: 100%;
      }
    }
    .feedbackType,
    .feedbackContent {
      .title {
        font-size: px2rem(30px);
        color: #333;
        padding: px2rem(30px) px2rem(30px) px2rem(20px) px2rem(30px);
        border-bottom: 1px solid #ddd;
      }
      .options {
        margin-top: px2rem(30px);
        display: flex;
        flex-wrap: wrap;
        .opt {
          width: px2rem(200px);
          margin: px2rem(15px) px2rem(22px);
          height: px2rem(70px);
          line-height: px2rem(70px);
          text-align: center;
          color: #666;
          border: 1px solid #ddd;
          font-size: px2rem(24px);
          &.active {
            color: #51a4fb;
            border-color: #51a4fb;
          }
        }
      }
      .content {
        padding: px2rem(30px);
        box-sizing: border-box;
        textarea {
          border-radius: 10px;
          width: 90%;
          border: 1px solid #ddd;
          background-color: #f8f8f8;
          resize: none;
          padding: px2rem(30px);
        }
      }
      .score {
        padding: px2rem(30px);
        .item {
          margin: px2rem(25px) 0;
          display: flex;
          align-items: center;
          label {
            color: #666;
            font-size: px2rem(24px);
          }
          .stars {
            padding-left: px2rem(70px);
            i {
              font-size: px2rem(30px);
            }
          }
        }
      }
    }
    .submitBox {
      padding: px2rem(50px);
      button {
        width: 100%;
        margin: 0 auto;
        border: 0;
        outline: 0;
        height: px2rem(88px);
        border-radius: 8px;
        background-color: #51a4fb;
        color: #fff;
        font-size: px2rem(30px);
      }
    }
  }
}
</style>
