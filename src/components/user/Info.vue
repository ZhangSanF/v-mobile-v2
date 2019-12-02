<template>
  <div class="info">
    <x-header :left-options="{backText: ''}" class="public-header-background-color public-header-boxShadow">个人信息</x-header>
    <form-preview header-label="" :header-value="user.username" :body-items="list"></form-preview>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {USER} from '@/config/info'
  import {FormPreview, ButtonTab, ButtonTabItem, XHeader, Group, XInput, XButton, TransferDom, Divider} from 'vux'
  export default {
    name: 'Setting',
    components: {FormPreview, ButtonTab, ButtonTabItem, XHeader, Divider, XInput, Group, XButton},
    data () {
      return {
        money: '',
				password: '',
				tabIndex: 0,
				oldLoginPass: '',
				newLoginPassA: '',
				newLoginPassB: '',
				oldBankPass: '',
				newBankPassA: '',
        newBankPassB: '',
        list: [{
          label: '余额',
          value: ''
        }, {
          label: '币种',
          value: 'RMB(元)'
        }, {
          label: '登录时间',
          value: USER.loginTime.toLocaleString()
        }],
      }
    },
    methods: {
      tabChange(e) {
				this.tabIndex = e;
			}
    },
    mounted() {
      setTimeout(() => {
        this.list[0].value = this.user.money;
      }, 20);
    },
    computed: {
      ...mapState(['user']),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  // @import '@/assets/css/public.scss';
  // .vux-header {
  //   background: $public-header-background-color;
  // }
  .info /deep/ .weui-form-preview__hd {
    text-align: left;
    color: #555;
    font-size: px2rem(16px);
  }
  .info /deep/ .weui-form-preview__bd{
    font-size: px2rem(14px);
  }
  
</style>
