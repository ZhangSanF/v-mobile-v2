<template>
  <div class="Feedback">
    <x-header
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >
      <div class="header-content">
        <span class="header-title">回电服务</span>
      </div>
    </x-header>
    <scroll class="scrollBox" :data="callbackData">
      <div class="wrapper-tontent">
        <div class="bannerImg">
          <p>
            我们提供7*24小时的电话客服回电服务，如果您在使用本平台时遇到问题，请选择您的问题类型和希望的客服语言，<br>我们将在第一时间给您致电！
          </p>
        </div>
        <div class="feedbackType">
          <div class="title">问题类型</div>
          <div class="options">
            <div
              v-for="(item,index) in callbackData.question"
              :key="index"
              class="opt"
              @click="question = item.id"
              :class="{'active':question == item.id}"
            >{{item.name}}
            </div>
          </div>
        </div>

        <div class="feedbackType">
          <div class="title">选择语言</div>
          <div class="options">
            <div
              v-for="(item,index) in callbackData.language"
              :key="index"
              class="opt"
              @click="language = item.id"
              :class="{'active':language == item.id}"
            >{{item.name}}
            </div>
          </div>
        </div>

        <x-input title="电话号码" name="phone" placeholder="手机号或座机号码" v-model="phoneNumber"></x-input>

        <div class="submitBox">
          <button @click="submit">立即提交</button>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from "@/components/common/scroll";
  import {mapActions} from "vuex";
  import {XHeader, Rater, XInput} from "vux";

  export default {
    name: "Feedback",
    data() {
      return {
        callbackData: {},
        question: '',
        language: '',
        phoneNumber: '',
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.getCallbackGetTypeFunc();
      });
    },
    methods: {
      ...mapActions(["getSuggestionGetType", "getCallback"]),

      getCallbackGetTypeFunc() {
        this.getSuggestionGetType({type: 2}).then(res => {
          if (res.resCode === 1000) {
            this.callbackData = res.data;
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
        if(!this.question || !this.language || !this.phoneNumber){
          return this.$vux.alert.show(`请提交完整的请求，反馈类型、语言、电话号码！`);
        }
        let _this = this;
        this.getCallback({
          type: this.question,
          language: this.language,
          phone: this.phoneNumber,
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

    components: {XHeader, scroll, Rater, XInput}
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
        p {
          padding: px2rem(20px);
          color: #555;
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
          margin-top: px2rem(10px);
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

  /deep/ .vux-x-input {
    margin-top: px2rem(40px);
    font-size: px2rem(30px);
    color: #333;
    input {
      border: 1px solid #eee;
      padding-left: px2rem(4px);
    }
  }
</style>
