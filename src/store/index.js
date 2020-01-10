import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import {GAMES} from '@/config'
import {onlineCount} from '@/methods'

Vue.use(Vuex);

let code = 'bjpk10';
var play = 'lm';
var appDownloadShow = '1';
var skin = 'blue';
try{
  if(localStorage.mobileCode){
    code = localStorage.mobileCode;
    play = (GAMES[code].play)[0];
  }
  // if(localStorage.appDownloadShow){
  //   appDownloadShow = localStorage.appDownloadShow;
  // }
  if(localStorage.skin){
    skin = localStorage.skin;
  }
}catch(err){}

const store = new Vuex.Store({
  state: {
    baseInfo:{},
    sign_data:{},
    settingImages:{},
    code: code,
    play: play,
    games: [], //后台开放的彩种
    outLink: {}, //外部链接
    wsLink: '', //websocket地址
    appDownloadShow: 1,
    isApp: false, //是否是APP客户端
    nsInfo: [], //未结彩种code数组 开奖请求用
    showCode: ["bjpk10", "mlaft", "jsft", "jssc", "jsssc", "cqssc", "pcdd", "cqklsf", "bjkl8", "jsk3", "gdklsf", "hk6"],
    user: {},
    card: {}, //银行卡信息
    openResult: {},
    timeUpdate: 0,
    announcement: [], //公告
    gameDataStore: {},
    gameData: {},
    checkedData: {}, //已选注单（临时）
    checkedDataKeys: {},
    betMoney: 1,
    closed: true,
    payData: {}, //支持的支付方式
    promocode: 0,
    scrollRefresh: 0,
    ptName: '彩票',
    skin: skin,
    forecastRanking: [], //计划数据
    onlineCount: onlineCount() || Math.floor(Math.random() * 300 + 18000), //在线人数计算
    lxbDatas:{},//利息宝数据
    userChatId: '', //用户聊天室ID
    chat: { //聊天数据
        msgList: {},
        redPackageIng: false,
        redPackageId: '',
    },
    hk6: {
      hk6tm: 'tma', //特码
      hk6zmt: 'zm1', //正码特
      hk6yx: 'yx', //平特一肖尾数
      hk6lxlw: 'lx2', //连肖连尾
      hxPlay: {}, //合肖自选不中p选中的lay
      fc3dezhs:'bs'
    },
    qipai: {
      status: 1,
      name: '开元棋牌'
    },
    isRsfreshOpenListData:false,
    redPackageHomeMsg: {},//首页红包数据
    redPackGameBaseInfo:{},
    redPackGameClientId:'',//红包websocket cilentid
    redPackGameRule:'',//游戏规则
    chearRedPackMsgArr:[]
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
});

export default store
