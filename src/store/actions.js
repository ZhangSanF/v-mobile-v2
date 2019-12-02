import Vue from 'vue'
import axios from 'axios'
import { GAMES } from '@/config'
import * as api from '@/api/api'

const actions = {
  // 初始化 彩种玩法切换 开奖数据、长龙露珠数据获取
  homeIndexInit({ commit, state }, params) {
    return api.homeIndexInit(params);
  },

  // 初始化 登录后获取基础数据
  homeIndexInitData({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      dispatch('homeIndexInit', params)
        .then((res) => {
          resolve(res);
          if (res.resCode === 1000) {
            if (res.data.publicInfo.games) commit('SAVE_GAMES', { data: res.data.publicInfo.games }); //保存后台开放的彩种
            if (res.data.userInfo) commit('SAVE_USER_INFO', { data: res.data.userInfo }); //保存用户信息
          } else {
            console.log('未登录');
          }
        });
    })
  },

  //lottery页面轮询
  lotteryAndUserInfo({ commit, state }, params) {
    return api.lotteryAndUserInfo(params);
  },

  // 未登录状态获取彩种列表 公告 外部链接
  homeWithOutCheckLoginInit({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      api.homeWithOutCheckLoginInit(params)
        .then(res => {
          resolve(res);
          if (res.resCode === 1000) {
            var data = res.data;
            if (data.announcement) commit('SAVE_ANNOUNCEMENT', data.announcement);
            if (data.games) {
              var games = _.keys(data.games);
              commit('SAVE_ALL_OPEN_INFO', data.games);//保存所有开奖信息
              commit('SAVE_GAMES', { data: games }); //开放的彩种
            }

            if (data.classification) {
              commit('SAVE_CLASSIFICATION', data.classification);
              ;
            }

            if (data.baseInfo) {
              commit('SAVE_BASE_INFO', data.baseInfo);
              ;
            }//保存所有开奖信息
            if (data.images) {
              commit('SAVE_SETTING_IMSGES', data.images);
              ;
            }//保存所有开奖信息
            if (data.name) {
              state.ptName = data.name;
            }
            if (data.links) {
              commit('SAVE_LINK', { data: data.links });
              if (data.links.ws) {
                commit('SAVE_WS_LINK', data.links.ws);
              }
            }
          }
        })
    });

  },
  // 绑定websocket用户ID
  homeChatBind({ commit, state }, params) {
    return api.homeChatBind(params);
  },
  // 获取开奖结果
  homeIndexGetCodeResult({ commit, state }, params) {
    return api.homeIndexGetCodeResult(params);
  },
  // 获取开奖明细(单页)
  homeIndexGetCodeResultTrend({ commit, state }, params) {
    return api.homeIndexGetCodeResultTrend(params);
  },
  // 获取注单
  homeUserOrderList({ commit, state }, params) {
    return api.homeUserOrderList(params);
  },
  // 退出登录
  homeLoginOrRegisterLogOff({ commit, state }, params) {
    return api.homeLoginOrRegisterLogOff(params);
  },
  // 登录
  homeLoginOrRegisterLogin({ commit, state }, params) {
    return api.homeLoginOrRegisterLogin(params);
  },
  // 获取GIF动图表情
  homeChatGetGifEmoji({ commit, state }, params) {
    return api.homeChatGetGifEmoji(params);
  },
  // 获取聊天记录
  homeChatGetChatLog({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      api.homeChatGetChatLog(params)
        .then((res) => {
          resolve(res);
          if (res.resCode === 1000) {
            if (res.data.length) {
              for (var i = 0; i < res.data.length; i++) {
                commit('ADD_CHAT_MSG', {
                  id: `n${res.data[i].chat_id}`,
                  data: res.data[i]
                });
              }
            }
          }
        })
    });
  },
  // 获取红包
  homeChatGetRedPackage({ commit, state }, params) {
    return api.homeChatGetRedPackage(params);
  },
  // 提交充值 提款信息
  homeAllPaymentsDepositWithdrawPlatform({ commit, state }, params) {
    return api.homeAllPaymentsDepositWithdrawPlatform(params);
  },
  // 投注
  homeOrdersPlaceOrder({ commit, state }, params) {
    return api.homeOrdersPlaceOrder(params);
  },
  // 发送消息
  homeChatSendMsgToChatRoom({ commit, state }, params) {
    return api.homeChatSendMsgToChatRoom(params);
  },
  // 发送验证码
  homeAllPaymentsSendSmsCode({ commit, state }, params) {
    return api.homeAllPaymentsSendSmsCode(params);
  },
  // 绑定银行卡
  homeAllPaymentsUserBindBankCard({ commit, state }, params) {
    return api.homeAllPaymentsUserBindBankCard(params);
  },
  // 获取银行卡列表
  homeAllPaymentsGetWithdrawalBankList({ commit, state }, params) {
    return api.homeAllPaymentsGetWithdrawalBankList(params);
  },
  // 存取款记录
  homeAllPaymentsUserTransactionRecord({ commit, state }, params) {
    return api.homeAllPaymentsUserTransactionRecord(params);
  },
  // 获取支持的支付方式
  homeAllPaymentsGetPaymentInfo({ commit, state }, params) {
    return api.homeAllPaymentsGetPaymentInfo(params);
  },
  // 棋牌上下分 额度转换
  homeKaiyuanDepositWithdrawal({ commit, state }, params) {
    return api.homeKaiyuanDepositWithdrawal(params);
  },
  // 棋牌钱包查询余额
  homeKaiyuanSearchBalance({ commit, state }, params, source) {

    return api.homeKaiyuanSearchBalance(params, source);

  },
  // 请求棋牌游戏登录
  homeKaiyuanDoLogin({ commit, state }, params) {
    return api.homeKaiyuanDoLogin(params);
  },
  // 请求棋牌游戏列表
  homeKaiyuanAliveGames({ commit, state }, params, source) {
    return api.homeKaiyuanAliveGames(params, source);
  },
  // 上传用户头像
  homeUserUploadChatHeaderImg({ commit, state }, params) {
    return api.homeUserUploadChatHeaderImg(params);
  },
  // 登录
  homeLoginOrRegisterLogin({ commit, state }, params) {
    return api.homeLoginOrRegisterLogin(params);
  },
  // 系统消息
  homeUserSysMsg({ commit, state }, params) {
    return api.homeUserSysMsg(params);
  },
  // 修改密码
  homeUserChangeAllPwd({ commit, state }, params) {
    return api.homeUserChangeAllPwd(params);
  },
  // 退出登录
  homeLoginOrRegisterLogOff({ commit, state }, params) {
    return api.homeLoginOrRegisterLogOff(params);
  },
  // 注册账号
  homeLoginOrRegisterRegister({ commit, state }, params) {
    return api.homeLoginOrRegisterRegister(params);
  },
  changeCode({ commit, state, dispatch }, a) {
    var play = GAMES[a].play[0];
    commit('CHANGE_PLAY', play);
    var actionsArr = ['openInfo', 'timeInfo'];
    if (!state.gameDataStore[a] || !state.gameDataStore[a][play]) {
      actionsArr.push('playInfo');
    }
    dispatch('homeIndexInit', { actions: actionsArr.join(','), code: a, page: play })
      .then((res) => {
        if (res.data.openInfo) commit('SAVE_OPEN_INFO', { code: res.data.code, data: res.data.openInfo });
        if (res.data.openInfo) commit('SAVE_TIME_INFO', { code: res.data.code, data: res.data.openInfo });
        if (res.data.playInfo) commit('SAVE_GAMEDATA_STORE', {
          code: res.data.code,
          play: res.data.page,
          data: res.data.playInfo
        });
      });
  },
  changePlay({ commit, state, dispatch }, a) {
    commit('CHANGE_PLAY', a);
    if (!state.gameDataStore[state.code] || !state.gameDataStore[state.code][a]) {
      dispatch('homeIndexInit', { actions: 'playInfo', code: state.code, page: a })
        .then((res) => {
          commit('SAVE_GAMEDATA_STORE', { code: res.data.code, play: res.data.page, data: res.data.playInfo });
        });
    }
  },
  userInit({ commit, state, dispatch }, a) {
    dispatch('homeIndexInit', { actions: 'userInfo' })
      .then((res) => {
        if (res.data.userInfo) commit('SAVE_USER_INFO', { data: res.data.userInfo }); //保存用户信息
      });
  },
  // 请求中奖注单
  homeIndexQuestNewData({ commit, state }, params) {
    return api.homeIndexQuestNewData(params);
  },
  //请求历史报表 日期
  homeUserReport({ commit, state }, params) {
    return api.homeUserReport(params);
  },
  //请求代理统计代码
  getPromoteScript({ commit, state }, params) {
    return api.getPromoteScript(params);
  },
  //上报错误日志
  uploadErrorLog({ commit, state }, params) {
    return api.uploadErrorLog(params);
  },
  //获取服务大厅数据
  getServiceHallData({ commit, state }, params) {
    return api.getServiceHallData(params);
  },
  //获取优惠活动数据
  getPromotionHall({ commit, state }, params) {
    return api.getPromotionHall(params);
  },
  //获取优惠活动详情数据
  getNewsContent({ commit, state }, params) {
    return api.getNewsContent(params);
  },

  //抽奖
  turntableBigWheel({ commit, state }, params) {
    return api.turntableBigWheel(params);
  },

  //奖品信息
  withOutCheckBigWheel({ commit, state }, params) {
    return api.withOutCheckBigWheel(params);
  },

  // 预测计划-排行榜(首页)
  getForecastRanking({ commit, state }, params) {
    commit('FORECATST_RANKING_CLEAN');
    return new Promise((resolve, reject) => {
      api.getForecastRanking(params)
        .then(res => {
          resolve(res);
          if (res.resCode === 1000) {
            commit('FORECATST_RANKING', res.data);
          }
        })
    })
  },

  // 获取预测计划
  getForecastPlan({ commit, state }, params) {
    return api.getForecastPlan(params);
  },

  // 获取反馈类型
  getSuggestionGetType({ commit, state }, params) {
    return api.getSuggestionGetType(params);
  },

  // 提交反馈
  getSuggestionSuggest({ commit, state }, params) {
    return api.getSuggestionSuggest(params);
  },

    // 提交回电
  getCallback({ commit, state }, params) {
    return api.getCallback(params);
  },

  // 分享注单
  shareOrder({ commit, state }, share) {
    return api.shareOrder(share);
  },

  // 转入
  homeWalletTransfer({ commit, state }, money) {
    return api.homeWalletTransfer(money);
  },

  // 转出
  homeWalletTransferOut({ commit, state }, params) {
    return api.homeWalletTransferOut(params);
  },

  // 获取利息宝余额信息
  homeWalletGetWalletAmount({ commit, state }, status) {
    return api.homeWalletGetWalletAmount(status);
  },

  // 获取余利宝明细
  homeWalletDetail({ commit, state }, status) {
    return api.homeWalletDetail(status);
  },






};

export default actions;
