<template>
  <div class="GroupMemberList">
    <x-header
      ref="xheader"
      :left-options="{backText: ''}"
      class="public-header-background-color public-header-boxShadow"
    >{{curGroup.title}}</x-header>
    <Scroll
      class="content"
      :click="false"
      :data="curMember"
      :pullup="true"
      @scrollToEnd="scrollEnd"
    >
      <div>
        <ul>
          <li v-for="(item, index) in curMember" :key="index" class="member-item">
            <img v-if="item.header_img != ''" :src="item.header_img" alt class="item-img" />
            <img v-else src="../../assets/images/user.png" alt class="item-img" />
            <span class="name">{{item.chat_nickname}}</span>
            <span class="sex">{{item.sex}}</span>
          </li>
        </ul>
      </div>
    </Scroll>
    <p>
      <load-more :tip="'正在加载更多数据'" v-show="moreLoading"></load-more>
    </p>
  </div>
</template>

<script>
import { XHeader, LoadMore } from "vux";
import Scroll from "@/components/common/scroll";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "groupMemberList",
  components: { XHeader, Scroll, LoadMore },
  data() {
    return {
      moreLoading: false,
      id: this.$route.params.id,
      curGroup: {},
      curMember: {},
      page: 1,
      pageSize: 15
    };
  },
  created() {
    this.redPackGameChatGetUsersFunc();
  },
  methods: {
    ...mapActions(["redPackGameChatGetUsers"]),

    redPackGameChatGetUsersFunc() {
      let params = {
        groupId: this.id, //房间id
        page: this.page, //页码
        pageSize: this.pageSize //每页数量
      };
      this.redPackGameChatGetUsers(params).then(res => {
        if (res.resCode == 1000) {
          this.moreLoading = false;
          if (this.page == 1) {
            this.curMember = res.rows;
          } else {
            if (res.rows.length > 0) {
              this.curMember = [...this.curMember, ...res.rows];
            } else {
              this.$vux.toast.text("没有更多数据", "center");
            }
          }
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: `请求失败！<br>原因: ${res.msg}`
          });
        }
      });
    },

    // 加载更多
    scrollEnd() {
      this.moreLoading = true;
      this.page = parseInt(this.page) + 1;
      this.redPackGameChatGetUsersFunc();
    }
  },
  mounted() {
    this.redPackGameBaseInfo.groupList.forEach(item => {
      if (item.id == this.id) {
        this.curGroup = item;
      }
    });
  },
  computed: {
    ...mapGetters(["redPackGameBaseInfo"])
  }
};
</script>

<style lang="scss" scoped>
.GroupMemberList {
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
  .member-item {
    padding: px2rem(20px);
    padding-left: 0;
    margin-left: px2rem(20px);
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    .item-img {
      width: px2rem(90px);
      height: px2rem(90px);
    }
    .name {
      font-size: px2rem(30px);
      padding-left: px2rem(20px);
    }
    .sex {
      font-size: px2rem(30px);
      padding-left: px2rem(10px);
    }
  }
  .weui-loadmore {
    margin: 0;
    padding: px2rem(10px) 0;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>