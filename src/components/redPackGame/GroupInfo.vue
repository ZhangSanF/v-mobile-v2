<template>
  <div class="groupInfo">
    <x-header
      ref="xheader"
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >{{curGroup.title}}</x-header>
    <Scroll class="content" :click="false" :data="[]">
      <div>
        <div class="header">
          <flexbox :gutter="0" wrap="wrap" align="stretch">
            <flexbox-item :span="1/5" v-for="(item, index) in curGroupUser.rows" :key="index">
              <img v-if="item.header_img != ''" :src="item.header_img" alt class="item-img" />
              <img v-else src="../../assets/images/user.png" alt class="item-img" />
              <div class="img-font">{{item.chat_nickname}}</div>
            </flexbox-item>
          </flexbox>
          <router-link tag="div" class="all-info" :to="'/redPack/GroupMemberList/' + id">
            全部群成员(<span>{{curGroupUser.total}}</span>)>
          </router-link>
        </div>
        <div class="notice">
          <ul>
            <li class="notice-list">
              <flexbox>
                <flexbox-item :span="3">
                  <div class="title">群聊名称</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="info">{{curGroup.title}}</div>
                </flexbox-item>
              </flexbox>
            </li>
            <li class="notice-list">
              <flexbox>
                <flexbox-item :span="3">
                  <div class="title">群公告</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="info">{{curGroup.announcement}}</div>
                </flexbox-item>
              </flexbox>
            </li>
            <li class="notice-list">
              <flexbox>
                <flexbox-item :span="3">
                  <div class="title">须知</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="info">{{curGroup.description}}</div>
                </flexbox-item>
              </flexbox>
            </li>
            <li class="notice-list" @click="jumpRule(2)">
              <flexbox>
                <flexbox-item :span="3">
                  <div class="title">群规</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="rule-item">
                    <span>{{curGroup.rule}}</span>
                    <x-icon type="ios-arrow-right" class="icon-style" size="20"></x-icon>
                  </div>
                </flexbox-item>
              </flexbox>
            </li>
            <li class="notice-list" @click="jumpRule(1)">
              <flexbox>
                <flexbox-item :span="3">
                  <div class="title">玩法</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="rule-item">
                    <span>{{curGroup.method}}</span>
                    <x-icon type="ios-arrow-right" class="icon-style" size="20"></x-icon>
                  </div>
                </flexbox-item>
              </flexbox>
            </li>
          </ul>
        </div>
        <div class="btn" @click="deleteGroup">删除并退出</div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XHeader } from "vux";
import Scroll from "@/components/common/scroll";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "groupInfo",
  components: { Scroll, Flexbox, FlexboxItem, XHeader },
  data() {
    return {
      curGroup: {},
      curGroupUser: {} //展示user
    };
  },
  props: ["id"], //群id
  created() {},
  methods: {
    ...mapActions(["redPackGameChatInfo", "redPackGameJumpRule"]),

    // 群信息接口
    redPackGameChatInfoFunc(groupId) {
      this.redPackGameChatInfo(groupId).then(res => {
        if (res.resCode == 1000) {
          this.curGroupUser = res.users;
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },

    // 玩法规则跳转(玩法1，规则2)
    jumpRule(typeId) {
      this.redPackGameJumpRule({
        gameId: this.curGroup.game_id,
        typeId: typeId
      }).then(res => {
        if (res.resCode == 1000) {
          this.$router.push({
            path: `/redPack/ruleInfo/${res.data}`
          });
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },
    // 删除并退出群
    deleteGroup() {
      this.$router.replace(`/redPack/gameGroup/1`);
    }
  },
  mounted() {
    this.redPackGameBaseInfo.groupList.forEach(item => {
      if (item.id == this.id) {
        this.curGroup = item;
        // console.log('asdfs',this.curGroup)
      }
    });
    this.redPackGameChatInfoFunc(this.id);
  },
  computed: {
    ...mapGetters(["redPackGameBaseInfo"])
  }
};
</script>

<style lang="scss" scoped>
.groupInfo {
  .public-header-background-color {
    background: linear-gradient(to right, #ff3564, #ff703e);
    /deep/ .vux-header-title{
      line-height: px2rem(100px);
      height: px2rem(90px);
    }
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: px2rem(100px);
    bottom: 0;
    width: 100%;
  }
  .header {
    padding: px2rem(36px) px2rem(23px);
    .vux-flexbox-item {
      text-align: center;
      margin-bottom: px2rem(20px);
    }
    .item-img {
      display: block;
      border-radius: 8px;
      width: px2rem(104px);
      height: px2rem(104px);
      margin: 0 auto;
    }
    .img-font {
      font-size: px2rem(26px);
      color: #555;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .all-info {
      text-align: center;
      font-size: px2rem(30px);
      margin-top: px2rem(29px);
      color: red;
    }
  }
  .notice {
    margin-top: px2rem(24px);
    padding-left: px2rem(20px);
    font-size: px2rem(30px);
    .notice-list {
      border-bottom: 1px solid #eee;
      .info {
        padding: px2rem(25px) px2rem(20px) px2rem(25px) 0;
        font-size: px2rem(28px);
        color: #666;
        line-height: 1.1;
      }
      .rule-item {
        position: relative;
        padding-right: 20px;
        font-size: px2rem(28px);
        color: #666;
        overflow: hidden;
        height: px2rem(80px);
        line-height: px2rem(80px);
        white-space: nowrap;
        text-overflow: ellipsis;
        .icon-style {
          position: absolute;
          right: px2rem(5px);
          top: 50%;
          transform: translate(0, -50%);
        }
        .vux-x-icon {
          fill: #666;
        }
      }
    }
  }
  .btn {
    width: px2rem(637px);
    height: px2rem(82px);
    line-height: px2rem(82px);
    background: red;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    font-size: px2rem(35px);
    margin: px2rem(40px) auto;
  }
}
</style>
