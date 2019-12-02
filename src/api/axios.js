/*
 * @Author: a.rui 
 * @Date: 2018-09-05 17:26:53 
 * @Last Modified by: a.rui
 * @Last Modified time: 2018-10-03 18:04:57
 */
import axios from "axios";
import Vue from "vue"
import  { AlertPlugin } from 'vux'
import store from '@/store';
import router from '@/router'

Vue.use(AlertPlugin);

let cancel,
  promiseArr = {};
const CancelToken = axios.CancelToken;
axios.defaults.maxRedirects = 8;
//请求拦截器
axios.interceptors.request.use(
  config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]("操作取消");
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.msg = "错误请求";
          break;
        case 401:
          error.msg = "未授权，请重新登录";
          break;
        case 403:
          error.msg = "拒绝访问";
          break;
        case 404:
          error.msg = "网络异常，请重试";
          break;
        case 405:
          error.msg = "请求方法未允许";
          break;
        case 408:
          error.msg = "请求超时";
          break;
        case 500:
          error.msg = "服务器端出错";
          break;
        case 501:
          error.msg = "网络未实现";
          break;
        case 502:
          error.msg = "网络错误";
          break;
        case 503:
          error.msg = "服务不可用";
          break;
        case 504:
          error.msg = "网络超时";
          break;
        case 505:
          error.msg = "http版本不支持该请求";
          break;
        default:
          error.msg = `连接错误${error.response.status}`;
      }
    } else {
      if(error.message == "操作取消"){
      	return
      }
      // else{
      //   error.msg = "请求超时,请刷新请重试";
      // }
    }
    return Promise.resolve(error);
  }
);


axios.defaults.baseURL = "/";
//设置默认请求头
axios.defaults.headers = {
    "Content-Type": "application/json;charset=UTF-8",  
    "X-Requested-With":"XMLHttpRequest"
};
axios.defaults.timeout = 25000;

export default {
  //get请求
  get(urlObj, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url:urlObj.url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        resolve(res.data);
      });
    });
  },
  //post请求
  post(urlObj,param,isChangeHeader = false) {
    if (urlObj.isOpenLoading) {
      // todo 待实现
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: urlObj.url,
        data: param,
        withCredentials: false,
        headers: isChangeHeader==false ? {"Content-Type": "application/json;charset=UTF-8", "X-Requested-With":"XMLHttpRequest"} : {'Content-Type':'multipart/form-data'},
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        if (res && res.data) { 
          if(urlObj.url == '/all/home_LoginOrRegister_login' || urlObj.url == '/all/home_LoginOrRegister_logOff'){
            if(res.data && res.data.isRefresh == true){
              window.location.reload();
            }
          }
          if(res.data.resCode == 1004 && store.getters.stateUsername){
            Vue.$vux.alert.show({
              title:'提示',
              content: '当前登录信息失效，请您重新登录！',
              onHide () {
                window.location.reload();
              }
            });
            return;
          }else if(res.data.resCode == 1006){
            if(store.getters.stateUsername){
              router.push('/');
            }else{
              store.dispatch('homeLoginOrRegisterLogOff',{});
              window.location.reload();
            }
            return;
          }
          resolve(res.data);
        } else {
        	if(res){
        		resolve(res);
        	}
        }
        if (urlObj.isOpenLoading) {
          // todo 待实现
        }
      });
    });
  }
};
