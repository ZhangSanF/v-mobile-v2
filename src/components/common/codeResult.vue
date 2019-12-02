<template>
  <div class="coderesult">
    <open-code :code="code" :nums="nums" :numStr="openData.openCode" v-if="openData && openData.openCode"></open-code>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import openCode from './openCode'
    export default {
        name: 'codeResult',
        props: [ 'info', 'code' ],
        components: { openCode },
        computed: {
          ...mapGetters(['openData']),
          nums() {
            if(this.openData.openCode){
              return this.openData.openCode.split(',');
            }
          },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .result {
    margin: 0;
    margin-right: px2rem(4px);
    padding: 0 px2rem(4px);
    font-size: px2rem(14px);
    color: #fff;
    background: rgba(0, 0, 0, 0.29);
    border-radius: px2rem(4px);
    text-align: center;
  }
</style>
