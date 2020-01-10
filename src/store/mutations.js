import Vue from 'vue'
import { GAMES, hk6Games } from '@/config'
import { isInArray } from '@/methods'
import { stat } from 'fs';
import { debug } from 'util';

const ADD_CHAT_REDPACK_MSG = 'ADD_CHAT_REDPACK_MSG';
const SAVE_GAMES = 'SAVE_GAMES'; //保存后台开放的彩种
const SAVE_LINK = 'SAVE_LINK'; //保存外部链接
const CHANGE_CODE = 'CHANGE_CODE'; //彩种切换
const CHANGE_PLAY = 'CHANGE_PLAY'; //切换玩法
const SAVE_USER_INFO = 'SAVE_USER_INFO'; //存储用户信息
const SAVE_USER_MONEY_INFO = 'SAVE_USER_MONEY_INFO'; //存储用户金额信息
const SAVE_USER_BANKCARD_INFO = 'SAVE_USER_BANKCARD_INFO' //存储用户银行卡信息
const SAVE_OPEN_INFO = 'SAVE_OPEN_INFO'; //单彩种开奖信息
const SAVE_TIME_INFO = 'SAVE_TIME_INFO'; //单彩种时间信息
const UPDATE_TIME = 'UPDATE_TIME'; //单彩种时间更新
const SAVE_ALL_OPEN_INFO = 'SAVE_ALL_OPEN_INFO'; //存储所有彩种开奖时间信息
const DELETE_OPEN_INFO = 'DELETE_OPEN_INFO'; //删除单彩种的开奖、时间信息（后台关闭彩种触发）
const SAVE_GAMEDATA_STORE = 'SAVE_GAMEDATA_STORE'; //存储玩法规则
const DELETE_GAMEDATA_STORE = 'DELETE_GAMEDATA_STORE' //清空单彩种规则数据
const SAVE_CHECKED = 'SAVE_CHECKED'; //存储已选号码
const CHANGE_ALL_CHECKED_DATA_MONEY = 'CHANGE_ALL_CHECKED_DATA_MONEY'; //修改所有注单的金额
const BET_ORDERS_MONEY_CHANGE = 'BET_ORDERS_MONEY_CHANGE'; //修改单个已选注单的金额
const DELETE_CHECKED = 'DELETE_CHECKED'; //删除单个已选号码
const DELETE_ALL_CHECKED_DATA = 'DELETE_ALL_CHECKED_DATA' //删除所有已选号码
const SAVE_BET_MONEY = 'SAVE_BET_MONEY' //投注金额
const SAVE_PAY_DATA = 'SAVE_PAY_DATA' //存储支持的支付方式
const CHANGE_HXPLAY = 'CHANGE_HXPLAY' //合肖自选不中play改变
const SAVE_ANNOUNCEMENT = 'SAVE_ANNOUNCEMENT' //存储公告
const CHANGE_APP_DOWNLOAD_SHOW = 'CHANGE_APP_DOWNLOAD_SHOW' //app下载链接隐藏
const SAVE_IS_APP = 'SAVE_IS_APP' //是否是APP客户端
const SAVE_WS_LINK = 'SAVE_WS_LINK' //WS地址
const SAVE_PROMOCODE = 'SAVE_PROMOCODE' //保存邀请码
const SAVE_BASE_INFO = 'SAVE_BASE_INFO' //平台基础参数
const SAVE_SETTING_IMSGES = 'SAVE_SETTING_IMSGES' //轮播图以及logo
const SAVE_CLASSIFICATION = 'SAVE_CLASSIFICATION' //彩种分类
const SAVE_LXB_DATA = 'SAVE_LXB_DATA' //利息宝数据
const SET_IS_REFRESH_OPEN_LIST_DATA = 'SET_IS_REFRESH_OPEN_LIST_DATA'
const SAVE_RED_PACKAGE_HOME_MSG = 'SAVE_RED_PACKAGE_HOME_MSG' //首页红包数据

const SAVE_SIGN_DATA = 'SAVE_SIGN_DATA'

//聊天室
const SAVE_USER_CHATID = 'SAVE_USER_CHATID' //用户聊天室ID
const ADD_CHAT_MSG = 'ADD_CHAT_MSG' //新增聊天消息
const DELETE_CHAT_MSG = 'DELETE_CHAT_MSG' //删除聊天消息
const SAVE_RB_ING = 'SAVE_RB_ING' //存储是否有红包的状态
const SAVE_RB_ID = 'SAVE_RB_ID' //存储红包id
const CLEAR_CHAT_MSG = 'CLEAR_CHAT_MSG' //聊天室清屏

//投注页
const CHANGE_BET_HK6TAB = 'CHANGE_BET_HK6TAB' //香港六合彩tab切换
const SCROLL_REFRESH = 'SCROLL_REFRESH' //scroll组件监听用
const CHANGE_CLOSED = 'CHANGE_CLOSED' //封盘开盘状态更改
const SAVE_NS_INFO = 'SAVE_NS_INFO' // 未结彩种code数组 开奖请求用
const FORECATST_RANKING = 'FORECATST_RANKING' //计划数据
const FORECATST_RANKING_CLEAN = 'FORECATST_RANKING_CLEAN' //清空计划列表

// 红包游戏
const SET_RED_PACK_GAME_BASE_INFO = 'SET_RED_PACK_GAME_BASE_INFO'; //初始化数据
const SET_RED_PACK_GAME_CLIENTID = 'SET_RED_PACK_GAME_CLIENTID'; //红包websocket cilentid
const SET_RED_PACK_GAME_RULE = 'SET_RED_PACK_GAME_RULE'; //游戏规则

// pk10删除选中状态
const pk10DelSelect = (state, play, a) => {
  if (state.checkedDataKeys[play]) {
    state.checkedDataKeys[play].forEach((item, index) => {
      if (item == a) {
        state.checkedDataKeys[play].splice(index, 1);
      }
    });
  }
}

const mutations = {
  [SAVE_SETTING_IMSGES](state, imgs) {
    Vue.set(state, 'settingImages', imgs);
  },
  [SAVE_GAMES](state, a) {
    Vue.set(state, 'showCode', a.data);
  },
  [SAVE_LINK](state, a) {
    Vue.set(state, 'outLink', a.data);
  },
  [SAVE_USER_INFO](state, a) {
    Vue.set(state, 'user', a.data);
  },
  [SAVE_USER_MONEY_INFO](state, a) {
    for (var k in a) {
      Vue.set(state.user, k, a[k]);
    }
  },
  [CHANGE_CODE](state, a) {
    Vue.set(state, 'code', a);
    var p = (GAMES[a].play)[0];
    Vue.set(state, 'play', p);
    Vue.set(state, 'checkedData', {}); //清空已选号码
    Vue.set(state, 'checkedDataKeys', {});
    try {
      localStorage.mobileCode = a;
    } catch (err) {
    }
  },
  [CHANGE_PLAY](state, a) {
    Vue.set(state, 'play', a);
    if (GAMES[state.code].class != 'bjpk10')
      Vue.set(state, 'checkedData', {}); //清空已选号码
  },
  [SAVE_OPEN_INFO](state, a) {
    var d = a.data;
    if (!state.openResult[a.code]) {
      return;
      // Vue.set(state.openResult, a.code, {})
    }
    if (a.code == state.code && state.openResult[state.code].openPhase != d.open_phase) {
      state.isRsfreshOpenListData = true;
    }
    Vue.set(state.openResult[a.code], 'openPhase', d.open_phase);
    Vue.set(state.openResult[a.code], 'openCode', d.open_result);
    Vue.set(state.openResult[a.code], 'resultDetail', d.result_detail);
    if (isInArray(a.code, hk6Games) && d.zodiac) {
      Vue.set(state.openResult[a.code], 'zodiac', d.zodiac);
    }

  },
  [SET_IS_REFRESH_OPEN_LIST_DATA](state, flag) {
    state.isRsfreshOpenListData = flag;
  },
  [SAVE_RED_PACKAGE_HOME_MSG](state,data) {
    state.redPackageHomeMsg = data
  },
  [SAVE_TIME_INFO](state, a) {
    var d = a.data;
    if (!state.openResult[a.code]) {
      return;
      // Vue.set(state.openResult, a.code, {})
    }
    if (d.next_phase) Vue.set(state.openResult[a.code], 'nextPhase', d.next_phase);
    Vue.set(state.openResult[a.code], 'openTime', d.transTime);
    if (typeof d.status !== 'undefined') Vue.set(state.openResult[a.code], 'status', d.status);
    if (typeof d.close_second !== 'undefined') Vue.set(state.openResult[a.code], 'difftime', d.close_second);
    Vue.set(state, 'timeUpdate', ++state.timeUpdate);
  },
  [UPDATE_TIME](state) {
    Vue.set(state, 'timeUpdate', ++state.timeUpdate);
  },
  [SAVE_ALL_OPEN_INFO](state, a) {
    for (var k in a) {
      var d = a[k];
      if (!state.openResult[k]) {
        Vue.set(state.openResult, k, {})
      }
      Vue.set(state.openResult[k], 'name', d.code_name);
      Vue.set(state.openResult[k], 'icon', d.icon);
      Vue.set(state.openResult[k], 'classification', d.classification);

      Vue.set(state.openResult[k], 'pic_address', d.pic_address);
      Vue.set(state.openResult[k], 'code_time', d.code_time);
      Vue.set(state.openResult[k], 'code_type', d.code_type);
      Vue.set(state.openResult[k], 'openPhase', d.open_phase);
      Vue.set(state.openResult[k], 'openCode', d.open_result);
      if (isInArray(k, hk6Games) && d.zodiac) {
        Vue.set(state.openResult[k], 'zodiac', d.zodiac);
      }
      if (d.next_phase) Vue.set(state.openResult[k], 'nextPhase', d.next_phase);
      Vue.set(state.openResult[k], 'openTime', d.transTime);
      if (typeof d.status !== 'undefined') Vue.set(state.openResult[k], 'status', d.status);
      if (typeof d.close_second !== 'undefined') Vue.set(state.openResult[k], 'difftime', d.close_second);
      Vue.set(state, 'timeUpdate', ++state.timeUpdate);
    }
    // console.log(state.openResult);
    return;
  },
  [DELETE_OPEN_INFO](state, a) {
    Vue.delete(state.openResult, a.code);
  },
  [DELETE_GAMEDATA_STORE](state, a) {
    if (typeof state.gameDataStore[a.code] !== 'undefined') {
      Vue.delete(state.gameDataStore, a.code);
    }
  },
  [SAVE_GAMEDATA_STORE](state, a) {
    if (!state.gameDataStore[a.code]) {
      Vue.set(state.gameDataStore, a.code, {});
    }
    Vue.set(state.gameDataStore[a.code], a.play, a.data);
  },
  [SAVE_CHECKED](state, a) {
    Vue.set(state.checkedData, a.uid, a);
    console.log(state.checkedData)
    if (GAMES[state.code].class == 'bjpk10') {
      if (!state.checkedDataKeys[state.play]) {
        Vue.set(state.checkedDataKeys, state.play, []);
      }
      var arr = state.checkedDataKeys[state.play];
      arr.push(a.uid);
      Vue.set(state.checkedDataKeys, state.play, arr);
    }
  },
  [CHANGE_ALL_CHECKED_DATA_MONEY](state, a) {
    for (let k in state.checkedData) {
      Vue.set(state.checkedData[k], 'money', a);
    }
  },
  [BET_ORDERS_MONEY_CHANGE](state, a) {
    if (state.checkedData[a.uid]) {
      Vue.set(state.checkedData[a.uid], 'money', a.money);
    }
  },
  [DELETE_CHECKED](state, a) {
    Vue.delete(state.checkedData, a);

    if (GAMES[state.code].class == 'bjpk10') {
      if (state.play == 'he' || state.play == 'lm') {
        pk10DelSelect(state, 'he', a);
        pk10DelSelect(state, 'lm', a);
      } else {
        pk10DelSelect(state, state.play, a);
      }
    }
  },
  [DELETE_ALL_CHECKED_DATA](state) {
    console.log('清除')
    Vue.set(state, 'checkedData', {});
    Vue.set(state, 'checkedDataKeys', {});
  },
  [SAVE_BET_MONEY](state, a) {
    Vue.set(state, 'betMoney', a);
  },
  [SAVE_PAY_DATA](state, a) {
    Vue.set(state, 'payData', a);
  },
  [SAVE_BASE_INFO](state, obj) {
    state.baseInfo = obj;
  },

  [SAVE_USER_CHATID](state, a) {
    state.userChatId = a || '';
  },

  [ADD_CHAT_MSG](state, a) {
    let arrList = _.values(state.chat.msgList);
    let len = 0;
    // 判断如果聊天记录超过100条  就开始删除老数据  最多保留100条
    if (arrList.length > 100) {
      len = arrList.length - 100;
      for (let i = 0; i < len; i++) {
        Vue.delete(state.chat.msgList, 'n' + arrList[i].chat_id);
      }
    }
    Vue.set(state.chat.msgList, a.id, a.data);
  },
  [DELETE_CHAT_MSG](state, a) {
    Vue.delete(state.chat.msgList, a.id);
  },
  [SAVE_RB_ING](state, a) {
    Vue.set(state.chat, 'redPackageIng', a);
  },
  [SAVE_RB_ID](state, a) {
    Vue.set(state.chat, 'redPackageId', a);
  },
  [CLEAR_CHAT_MSG](state) {
    Vue.set(state.chat, 'msgList', {});
  },
  [CHANGE_BET_HK6TAB](state, a) {
    Vue.set(state.hk6, a.key, a.value);
    Vue.set(state, 'checkedData', {});
  },
  [CHANGE_HXPLAY](state, a) {
    Vue.set(state.hk6, 'hxPlay', a);
  },
  [SAVE_USER_BANKCARD_INFO](state, a) {
    Vue.set(state, 'card', a);
  },
  [SAVE_ANNOUNCEMENT](state, a) {
    Vue.set(state, 'announcement', a);
  },
  [CHANGE_APP_DOWNLOAD_SHOW](state, a) {
    Vue.set(state, 'appDownloadShow', a);
  },
  [SCROLL_REFRESH](state) {
    Vue.set(state, 'scrollRefresh', state.scrollRefresh + 1);
  },
  [CHANGE_CLOSED](state, a) {
    Vue.set(state, 'closed', a);
  },
  [SAVE_PROMOCODE](state, a) {
    Vue.set(state, 'promocode', a);
  },
  [SAVE_IS_APP](state, a) {
    Vue.set(state, 'isApp', a);
  },
  [SAVE_WS_LINK](state, a) {
    Vue.set(state, 'wsLink', a);
  },
  [SAVE_NS_INFO](state, a) {
    var old = state.nsInfo;
    old.push(a);
    Vue.set(state, 'nsInfo', old);
  },
  [SAVE_CLASSIFICATION](state, list) {
    Vue.set(state, 'classification', list);
  },
  // 预测计划-排行榜(首页)
  [FORECATST_RANKING](state, list) {
    state.forecastRanking = list;
  },
  [FORECATST_RANKING_CLEAN](state) {
    state.forecastRanking = [];
  },
  // 利息宝数据
  [SAVE_LXB_DATA](state, obj) {
    state.lxbDatas = obj || {};
  },
  // **********红包游戏*************//
  [SET_RED_PACK_GAME_BASE_INFO](state, obj) {
    state.redPackGameBaseInfo = obj || {};
  },
  // 红包websocket cilentid
  [SET_RED_PACK_GAME_CLIENTID](state, str) {
    state.redPackGameClientId = str;
  },

  // 保存登录信息
  [SAVE_SIGN_DATA](state, obj) {
    state.sign_data = obj;
  },

  
  // 游戏规则
  [SET_RED_PACK_GAME_RULE](state, arr) {
    state.redPackGameRule = arr;
  },
  // 新增聊天室红包通知

  [ADD_CHAT_REDPACK_MSG](state, obj) {
    Vue.set(obj, 'isShow', true);
    Vue.set(obj, 'isShowAni', true);
    state.chearRedPackMsgArr.push(obj);
    let runFun = function (item) {
      let _runDel2 = function (item) {
        setTimeout(() => {
          Vue.set(item, 'isShowAni', false);
          setTimeout(() => {
            Vue.set(item, 'isShow', false);
            setTimeout(() => {
              state.chearRedPackMsgArr.shift();
            }, 5000);
          }, 500);
        }, 5000);
      }
      _runDel2(item)
    }
    runFun(obj)
  }
};

export default mutations;
