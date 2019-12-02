<template>
  <div class="info">
    <x-header :left-options="{backText: ''}" class="header">
      <span v-show="tabIndex == 0">个人消息</span>
      <span v-show="tabIndex == 1">平台公告</span>
    </x-header>
    <div class="tab">
      <div @click="tabIndex = 0" :class="{'active':tabIndex == 0}">我的消息</div>
      <i class="line"></i>
      <div @click="tabIndex = 1" :class="{'active':tabIndex == 1}">平台公告</div>
    </div>
    <scroll class="container" :data="announcement || list">
      <div>
        <card
          :footer="{title: item.time}"
          v-show="tabIndex == 0"
          v-for="(item, index) in list"
          :key="index"
        >
          <p slot="content" class="card-padding">{{item.content}}</p>
        </card>
        <card
          :header="{title: (key+1) + '. ' + item.title}"
          v-show="tabIndex == 1"
          :footer="{title: timestampToTime(item.time)}"
          class="bg-public-deep-bgColor"
          v-for="(item, key) in announcement"
          :key="key+'_1'"
        >
          <p slot="content" class="card-padding">{{item.content}}</p>
        </card>
        <p class="noData" v-if="list.length<=0 && tabIndex == 0">暂无消息</p>
        <p class="noData" v-if="announcement.length<=0 && tabIndex == 1">暂无数据</p>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { USER } from "@/config/info";
import { Card, XHeader } from "vux";
import Scroll from "@/components/common/scroll";
export default {
  name: "Message",
  components: { Card, XHeader, Scroll },
  data() {
    return {
      list: [],
      tabIndex: 0
    };
  },
  methods: {
    ...mapActions(["homeUserSysMsg"]),

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
    },

    getData() {
      this.homeUserSysMsg().then(res => {
        if (res.resCode === 1000) {
          this.list = res.data;
        }
      });
    }
  },
  mounted() {
    this.$nextTick(()=>{
      var type = this.$route.query.type;
      if (type == 1) {
        this.tabIndex = 1;
      } else {
        this.tabIndex = 0;
        this.getData();
      }
    })
  },
  watch:{
    tabIndex(){
      if(this.tabIndex == 0){
        this.getData();
      }
    }
  },
  computed: {
    ...mapState(["user", "announcement"])
  }
};
</script>

<style scoped lang="scss">
.info {
  background-color: #ededed;
  overflow: auto;
  height: 100%;
  width: 100%;
}
.tab {
  display: flex;
  align-items: center;
  background-color: #fff;
  i {
    height: px2rem(22px);
    width: px2rem(2px);
    background-color: #dddddd;
  }
  div {
    height: px2rem(85px);
    font-size: px2rem(30px);
    color: #999;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      color: #333;
    }
  }
}
.container {
  position: absolute;
  top: px2rem(200px);
  bottom: 0;
  width: 100%;
  background-color: #ededed;
  overflow: hidden;
  /deep/ {
    .weui-panel_access {
      padding: 0 px2rem(30px);
    }
    .weui-panel__hd {
      color: #333;
      font-size: px2rem(30px);
      padding: px2rem(20px) 0 0 0;
      &:after {
        display: none;
      }
    }
    .weui-cell_link {
      color: #333;
      font-size: px2rem(18px);
    }
  }
}

.header {
  background-color: #51a4fb;
}

.noData {
  text-align: center;
  margin-top: px2rem(20px);
  font-size: px2rem(30px);
}
.card-padding {
  color: #666;
  padding: px2rem(20px) 0;
  font-size: px2rem(28px);
}
</style>
