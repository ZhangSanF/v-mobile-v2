<!-- 计划 -->
<template>
  <div class="plan-page">
    <x-header :left-options="{backText: ''}" class="header">
      专家计划
      <span class="openRightCodeMenu" v-if="openResult[code]" @click="openRightCodeMenu">{{openResult[code].name}}</span>
    </x-header>
    <div class="planContent">
      <Plan></Plan>
    </div>

    <div v-transfer-dom>
      <popup v-model="rightMenuOpen" position="right" v-if="openResult[code]">
        <div style="width:200px;">
          <span class="gameCode" v-for="(item, index) of openResult" :class="{selectedCode: index == code}" @click="changeCode(index)">
            {{item.name}}
          </span>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
  import Plan from './Plan'
  import {XHeader, TransferDom, Popup} from 'vux'
  import {mapState} from 'vuex'

  export default {
    components: {Plan, XHeader, Popup},
    directives: {
      TransferDom
    },
    data() {
      return {
        rightMenuOpen: false,
      }
    },
    methods: {
      openRightCodeMenu() {
        this.rightMenuOpen = true;
      },
      changeCode(code) {
        this.$store.commit('CHANGE_CODE', code);
        this.rightMenuOpen = false;
      }
    },
    computed: {
      ...mapState(['openResult', 'code']),
    },
  }
</script>

<style lang="scss" scoped>
  .plan-page {
    height: 100%;
  }

  .header {
    background-color: #51a4fb;
    height: px2rem(92px);
    /*padding: 0;*/
  }

  .planContent {
    position: absolute;
    top: px2rem(92px);
    bottom: 0;
    width: 100%;
  }
  .openRightCodeMenu {
    font-size: px2rem(24px);
    position: absolute;
    right: px2rem(20px);
  }
  .gameCode {
    font-size: px2rem(30px);
    display: inline-block;
    padding: px2rem(8px) px2rem(12px);
    background-color: #fff;
    color: #999;
    border-radius: px2rem(8px);
    margin-left: px2rem(8px);
    &.selectedCode {
      background-color: #51a4fb;
      color: #fff;
    }
  }
</style>
