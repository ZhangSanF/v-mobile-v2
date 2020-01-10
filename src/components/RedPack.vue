<template>
  <keep-alive :include="['historyTable']">
    <router-view v-if="redPackGameBaseInfo.gameType" />
  </keep-alive>
</template>

<script>
import * as socketApi from "../api/sockt";
import Bus from "../assets/js/eventBus";
import { mapState, mapActions } from "vuex";

export default {
  name: "RedPack",
  mounted() {
    if (!socketApi.websock) {
      socketApi.initWebSocket(this.outLink.re_ws,
        this.socketCallBack
      );
    }

  },
  methods: {

    socketCallBack(e) {
      console.log(e);
      if (e.type == "connect") {
        this.$store.commit("SET_RED_PACK_GAME_CLIENTID", e.client_id);
      } else {
        Bus.$emit("getMsg", e);
      }
    }
  },
  computed:{
    ...mapState(['outLink','redPackGameBaseInfo'])
  }
};
</script>
