// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import _ from 'lodash'
import VueClipboard from 'vue-clipboard2'


import img1 from '@/assets/images/jsk31.png'
import img2 from '@/assets/images/jsk32.png'
import img3 from '@/assets/images/jsk33.png'
import img4 from '@/assets/images/jsk34.png'
import img5 from '@/assets/images/jsk35.png'
import img6 from '@/assets/images/jsk36.png'

Vue.prototype.convertImgPath = (num)=>{
  switch (num) {
    case "1":
      return img1;
      break;
    case "2":
      return img2;
      break;
    case "3":
      return img3;
      break;
    case "4":
      return img4;
      break;
    case "5":
      return img5;
      break;
    case "6":
      return img6;
      break;
  }
};


import  { AlertPlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin   } from 'vux'
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);

Vue.use(_);
Vue.use(VueClipboard);


import '@/assets/css/reset.scss'
import '@/assets/css/icon/iconfont.css'
// import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/common.css'
import '@/assets/css/animate.min.css'

Vue.config.productionTip = false;

let preventDefault = (e)=>{
  e.preventDefault();
}

Vue.prototype.stopScrolling = (dom)=>{
  // 阻止默认滚动
  let curDom =  dom ? dom : document;
  curDom.addEventListener('touchmove',preventDefault,{passive:false});
};

Vue.prototype.openScrolling = (dom)=>{
  // 打开默认滚动
  let curDom =  dom ? dom : document;
  curDom.removeEventListener('touchmove',preventDefault);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods: {
      salcFontSize(){
        let width = window.innerWidth;
        if(width > 600){
          width = 600;
        }
        document.getElementsByTagName('html')[0].style.fontSize = width / 10 + 'px';
      }
  },
  mounted(){
    this.$nextTick(()=>{
      let self = this;
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener('gesturestart', function(event) {
        event.preventDefault()
      });
      window.addEventListener('resize',function(){
        self.salcFontSize();
      });
      this.salcFontSize();
    })
  }
})
