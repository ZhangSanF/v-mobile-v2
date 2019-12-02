<!-- 计划 -->
<template>
  <div class="planPop">
    <p class="popItem" v-for="(item, index) of popDataIndex" :key="index" @click="toShow(popData[item])">
      <span class="codeName">{{openResult[popData[item].extend_code].name}}</span>出现<span
      class="popItemText">【{{popData[item].last_count}}中{{popData[item].result_sum}}】</span> <span
      class="show">查看</span>
    </p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'planPop',
    data() {
      return {
        popData: {},
        popDataIndex: [],
        _socket: null,
      }
    },
    computed: {
      ...mapState(['openResult','outLink'])
    },
    mounted() {
      this.$nextTick(() => {
        if(this.outLink.kjw_ws){
          this.openWSconnect(this.outLink.kjw_ws);
        }
      });

    },
    beforeDestroy() {
      this._socket.close();
    },

    methods: {
      toShow(item) {
        this.goPlanInfo(item.expert_id, item.forecast_quantity, item.location, this.openResult[item.extend_code].name, item.extend_code);
        console.log(item);
      },
      openWSconnect(url) {
        var _this = this;
        this._socket = new WebSocket(url);
        this._socket.onmessage = res => {
          var res = JSON.parse(res.data);
          if (res.type === 'max_forecast_plan') {
            var k = `id${new Date().getTime()}`;
            _this.popData[k] = res.data;
            _this.popDataIndex.push(k);
            setTimeout(() => {
              delete _this.popData[k];
              _this.popDataIndex.forEach((item, index) => {
                if (item === k) {
                  _this.popDataIndex.splice(index, 1)
                }
              })
            }, 8000);
          }
        }
      },
      goPlanInfo(expert_id, forecast_quantity, locatssion, name, extend_code) {
        this.$store.commit('CHANGE_CODE', extend_code);
        this.$router.push({
          path: '/user/planInfo',
          query: {
            'expertId': expert_id,
            'forecastQuantity': forecast_quantity,
            'location': this.rankingMap(location),
            'name': name
          }
        })
      },
      rankingMap(data) {
        let obj = {
          '冠军': 1,
          '亚军': 2,
          '第三名': 3,
          '第四名': 4,
          '第五名': 5,
          '第六名': 6,
          '第七名': 7,
          '第八名': 8,
          '第九名': 9,
          '第十名': 10
        }
        return obj[data]
      }
    }
  }
</script>

<style lang="scss" scoped>
    .popItem {
      font-size: px2rem(26px);
      background-color: #7f858a;
      color: #fff;
      padding: px2rem(8px) 0;
      border-radius: px2rem(8px);
      width: px2rem(490px);
      text-align: center;
      margin: 0 auto px2rem(8px) auto;

      .show {
        color: #ffd600;
      }
    }
</style>
