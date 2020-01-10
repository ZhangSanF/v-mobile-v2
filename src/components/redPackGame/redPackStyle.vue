<template>
  <div
    class="redPackStyle"
    :class="{'onOpen':msgObj.content.status == 1 || msgObj.content.status == 2}"
  >
    <div
      class="redCard"
      :class="{'receive':msgObj&&msgObj.clientId!=redPackGameClientId,'send':msgObj&&msgObj.clientId==redPackGameClientId}"
      v-if="curGroup.game_type == 1"
    >
      <p class="bigTip name">{{msgObj.content.redName}}</p>
      <p class="bigTip lookTips" v-if="msgObj.isOpen">红包已开启</p>
      <p class="bigTip lookTips" v-else-if="msgObj.content.status == 0">查看红包</p>
      <p class="bigTip lookTips" v-else-if="msgObj.content.status == 1 || msgObj.content.status == 2">红包已截止</p>
      <p class="bottomTips">扫雷红包</p>
    </div>
    <div
      class="redCard"
      :class="{'receiveNN':msgObj&&msgObj.clientId!=redPackGameClientId,'sendNN':msgObj&&msgObj.clientId==redPackGameClientId}"
      v-if="curGroup.game_type == 2"
    >
      <p class="bigTip name">{{msgObj.content.redName}}</p>
      <p class="bigTip lookTips" v-if="msgObj.isOpen">红包已开启</p>
      <p class="bigTip lookTips" v-else-if="msgObj.content.status == 0">查看红包</p>
      <p class="bigTip lookTips" v-else-if="msgObj.content.status == 1 || msgObj.content.status == 2">红包已截止</p>
      <p class="bottomTips">牛牛红包</p>
    </div>
    <div
      class="redCard"
      :class="{'receive':msgObj&&msgObj.clientId!=redPackGameClientId,'send':msgObj&&msgObj.clientId==redPackGameClientId}"
      v-if="curGroup.game_type == 3"
    >
      <img
        class="grabRight"
        src="../../assets/images/redPackGame/ic_grab_right.png"
        v-show="msgObj&&msgObj.content.prize_status == 2"
        alt
      />
      <p class="bigTip name">{{msgObj.content.redName}}</p>
      <p class="bigTip lookTips" v-if="msgObj.isOpen">红包已开启</p>
      <p class="bigTip lookTips" v-else-if="msgObj.content.status == 0">查看红包</p>
      <p class="bigTip lookTips" v-else-if="msgObj.content.status == 1 || msgObj.content.status == 2">红包已截止</p>
      <p class="bottomTips">禁抢红包</p>
    </div>
    <div
      class="redCard"
      :class="{'receiveFL':msgObj&&msgObj.clientId!=redPackGameClientId,'sendFL':msgObj&&msgObj.clientId==redPackGameClientId}"
      v-if="curGroup.game_type == 4"
    >
      <p class="bigTip name">&nbsp;</p>
      <p class="bigTip lookTips" v-if="msgObj.isOpen">红包已开启</p>
      <p class="bigTip lookTips" v-else-if="msgObj.content.status == 0">查看红包</p>
      <p class="bigTip lookTips" v-else-if="msgObj.content.status == 1 || msgObj.content.status == 2">红包已截止</p>
      <p class="bottomTips">福利红包</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      redPackType: {}
    };
  },
  props: ["msgObj", "curGroup"],
  methods: {},
  computed: {
    ...mapGetters(["redPackGameClientId"])
  }
};
</script>
<style lang="scss" scoped>
.redPackStyle {
  overflow: auto;
  margin-top: px2rem(10px);
  display: inline-block;
  .redCard {
    width: px2rem(400px);
    height: px2rem(168px);
    background-size: 100% 100%;
    position: relative;
    padding: px2rem(35px) px2rem(35px) 0 px2rem(35px);
    box-sizing: border-box;
    .bottomTips {
      position: absolute;
      bottom: 0;
    }
    .bigTip {
      color: #fff;
      margin-left: px2rem(70px);
      font-size: px2rem(30px);
      font-weight: bold;
    }
    .grabRight {
      position: absolute;
      right: 0;
      top: 0;
      width: px2rem(100px);
    }
    &.send {
      float: right;
      text-align: left;
      background-image: url("../../assets/images/redPackGame/ic_send_red_nor.png");
      .grabRight{
        right: px2rem(10px);
      }
      &.onOpen {
        background-image: url("../../assets/images/redPackGame/ic_send_red_sel.png");
      }
    }
    &.receive {
      background-image: url("../../assets/images/redPackGame/ic_receive_red_nor.png");
      &.onOpen {
        background-image: url("../../assets/images/redPackGame/ic_receive_red_sel.png");
      }
    }
    &.sendNN {
      float: right;
      text-align: left;
      background-image: url("../../assets/images/redPackGame/ic_send_cow_nor.png");
      &.onOpen {
        background-image: url("../../assets/images/redPackGame/ic_send_cow_sel.png");
      }
    }
    &.receiveNN {
      background-image: url("../../assets/images/redPackGame/ic_receive_cow_nor.png");
      &.onOpen {
        background-image: url("../../assets/images/redPackGame/ic_receive_cow_sel.png");
      }
    }
    &.receiveFL {
      background-image: url("../../assets/images/redPackGame/ic_receive_reward_nor.png");
      &.onOpen {
        background-image: url("../../assets/images/redPackGame/ic_receive_cow_sel.png");
      }
      .bigTip {
        margin-left: px2rem(120px);
      }
    }
    &.sendFL {
      float: right;
      text-align: left;
      background-image: url("../../assets/images/redPackGame/ic_send_reward_nor.png");
    }
  }

  &.onOpen {
    .send {
      background-image: url("../../assets/images/redPackGame/ic_send_red_sel.png");
    }
    .receive {
      background-image: url("../../assets/images/redPackGame/ic_receive_red_sel.png");
    }
    .sendNN {
      background-image: url("../../assets/images/redPackGame/ic_send_cow_sel.png");
    }
    .receiveNN {
      background-image: url("../../assets/images/redPackGame/ic_receive_cow_sel.png");
    }
    .sendFL {
      background-image: url("../../assets/images/redPackGame/ic_send_reward_sel.png");
    }
    .receiveFL {
      background-image: url("../../assets/images/redPackGame/ic_receive_reward_sel.png");
    }
  }
}
</style>