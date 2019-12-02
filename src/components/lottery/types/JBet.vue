<template>
  <div class="jbet"  @click.prevent="betClick" :class="{'checked': isChecked,'bigFont': item.isBig}">
    <span>{{item.name}}</span>
    <p>{{item.status}}</p>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex';
import {GAMES} from '@/config'
  export default {
    name: 'jbet',
    props: ['item'],
    data() {
      return {
      }
    },
    methods: {
      betClick() {
        if(this.closed){
          this.$vux.alert.show({
            title: '提示',
            content: `封盘中，请稍后`,
          })
          return;
        }
				if(!this.isChecked){	
          console.log(this.isChecked);
					var item = this.item;
					this.$store.commit('SAVE_CHECKED', {
						uid: this.uid,
						name: item.name,
						odds: item.odds,
						desc: item.desc,
						type: item.type,
            play: item.play,
            key: this.play,
          });
				}else {
          console.log(this.isChecked);
					this.$store.commit('DELETE_CHECKED', this.uid);
				}
      },
    },
    computed: {
      ...mapState(['code', 'play', 'checkedData', 'closed','checkedDataKeys']),
      uid() {
        if(this.item.play){
          return this.item.play.replace('@', '');
        }
      },
			isChecked() {
        var keyArr;
        keyArr = _.keysIn(this.checkedData);
				if(keyArr && keyArr.indexOf(this.uid) >= 0){
					return true;
				}else{
					return false;
				}
      },
    },
    
  }

</script>

<style lang="scss" scoped>
  .jbet {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span{
        font-size: px2rem(18px);
        font-weight: bold;
    }
    &.bigFont{
      span{
          font-size: px2rem(28px);
          font-weight: bold;
        }
    }
    &.checked{
      background-color: rgba(255, 255, 255, 0.5);
      color: #fff;
    }
  }
</style>
