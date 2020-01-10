/*
 * @name: 接口链接
 * @Author: a.rui 
 * @Date: 2018-09-05 16:47:30 
 * @Last Modified by: a.rui
 * @Last Modified time: 2019-12-12 17:21:06
 */

//  初始化 彩种玩法切换 开奖数据、长龙露珠数据获取
export function homeIndexInitAPI(){
    return {
        url: `/all/home_index_init`,
        isOpenLoading: false
    }
}

//  轮询开奖数据 用户金额信息
export function lotteryAndUserInfoAPI(){
    return {
        url: `/all/home_index_getBaseInfo`,
        isOpenLoading: false
    }
}

//  绑定websocket用户ID
export function homeChatBindAPI(){
    return {
        url: `/all/home_Chat_bind`,
        isOpenLoading: false
    }
}

//  未登录状态获取彩种列表 公告 外部链接
export function homeWithOutCheckLoginInitAPI(){
    return {
        url: `/all/home_WithOutCheck_loginInit`,
        isOpenLoading: false
    }
}

//  首页红包点击
export function homeChatGetRedPackageTimeAPI(){
    return {
        url: `/all/home_Chat_getRedPackageTime`,
        isOpenLoading: false
    }
}

//  获取开奖结果
export function homeIndexGetCodeResultAPI(){
    return {
        url: `/all/home_Index_getCodeResult`,
        isOpenLoading: false
    }
}

//  获取注单
export function homeUserOrderListAPI(){
    return {
        url: `/all/home_User_orderList`,
        isOpenLoading: false
    }
}

//  退出登录
export function homeLoginOrRegisterLogOffAPI(){
    return {
        url: `/all/home_LoginOrRegister_logOff`,
        isOpenLoading: false
    }
}

//  登录
export function homeLoginOrRegisterLoginAPI(){
    return {
        url: `/all/home_LoginOrRegister_login`,
        isOpenLoading: false
    }
}

//  获取聊天记录
export function homeChatGetChatLogAPI(){
    return {
        url: `/all/home_Chat_getChatLog`,
        isOpenLoading: false
    }
}

//  获取动态表情包
export function homeChatGetGifEmoji(){
    return {
        url: `/all/home_Chat_getEmoticon`,
        isOpenLoading: false
    }
}

//  发送消息
export function homeChatSendMsgToChatRoomAPI(){
    return {
        url: `/all/home_Chat_sendMsgToChatRoom`,
        isOpenLoading: false
    }
}

//  获取红包
export function homeChatGetRedPackageAPI(){
    return {
        url: `/all/home_Chat_getRedPackage`,
        isOpenLoading: false
    }
}

//  投注
export function homeOrdersPlaceOrderAPI(){
    return {
        url: `/all/home_Orders_placeOrder`,
        isOpenLoading: false
    }
}

//  发送验证码
export function homeAllPaymentsSendSmsCodeAPI(){
    return {
        url: `/all/home_Allpayments_sendSmsCode`,
        isOpenLoading: false
    }
}

//  绑定银行卡
export function homeAllPaymentsUserBindBankCardAPI(){
    return {
        url: `/all/home_Allpayments_userBindBankCard`,
        isOpenLoading: false
    }
}

//  获取银行卡列表
export function homeAllPaymentsGetWithdrawalBankListAPI(){
    return {
        url: `/all/home_Allpayments_getWithdrawalBankList`,
        isOpenLoading: false
    }
}

//  提交充值 提款信息
export function homeAllPaymentsDepositWithdrawPlatformAPI(){
    return {
        url: `/all/home_Allpayments_depositWithdrawPlatform`,
        isOpenLoading: false
    }
}

//  存取款记录
export function homeAllPaymentsUserTransactionRecordAPI(){
    return {
        url: `/all/home_Allpayments_userTransactionRecord`,
        isOpenLoading: false
    }
}

//  获取支持的支付方式
export function homeAllPaymentsGetPaymentInfoAPI(){
    return {
        url: `/all/home_Allpayments_getPaymentInfo`,
        isOpenLoading: false
    }
}

//  棋牌上下分 额度转换
export function homeKaiyuanDepositWithdrawalAPI(source){
  return {
    url: `/all/home_${source}_depositWithdrawal`,
    isOpenLoading: false
  }
}

//  棋牌钱包查询余额
export function homeKaiyuanSearchBalanceAPI(source){
  return {
    url: `/all/home_${source}_searchBalance`,
    isOpenLoading: false
  }
}

//  请求棋牌游戏登录
export function homeKaiyuanDoLoginAPI(source){
  return {
    url: `/all/home_${source}_doLogin`,
    isOpenLoading: false
  }
}

//  请求棋牌游戏列表
export function homeKaiyuanAliveGamesAPI(source){
  return {
    url: `/all/home_${source}_aliveGames`,
    isOpenLoading: false
  }
}



//  上传用户头像
export function homeUserUploadChatHeaderImgAPI(){
    return {
        url: `/all/home_User_uploadChatHeaderImg`,
        isOpenLoading: false
    }
}

//  系统消息
export function homeUserSysMsgAPI(){
    return {
        url: `/all/home_User_sysMsg`,
        isOpenLoading: false
    }
}

//  修改密码
export function homeUserChangeAllPwdAPI(){
    return {
        url: `/all/home_User_changeAllPwd`,
        isOpenLoading: false
    }
}

//  注册账号
export function homeLoginOrRegisterRegisterAPI(){
    return {
        url: `/all/home_LoginOrRegister_register`,
        isOpenLoading: false
    }
}

//  请求中奖信息
export function homeIndexQuestNewDataAPI(){
    return {
        url: `/all/home_Index_questNewData`,
        isOpenLoading: false
    }
}

//请求历史报表 日期
export function homeUserReportAPI() {
    return {
        url: `/all/home_User_report`,
        isOpenLoading: false
    }
}

//请求推广统计代码
export function getPromoteScriptAPI() {
    return {
        url: `/all/home_WithOutCheck_getPromoteScript`,
        isOpenLoading: false
    }
}

//上报错误日志
export function uploadErrorLogAPI() {
    return {
        url: `/all/home_WithOutCheck_redPackageErrorLog`,
        isOpenLoading: false
    }
}

//获取服务大厅数据
export function getServiceHallDataAPI() {
    return {
        url: `/all/home_WithOutCheck_getServiceHallData`,
        isOpenLoading: true
    }
}
//签到初始化数据
export function getAttendanceRecordAPI() {
    return {
        url: `/all/home_signin_getSignInfo`,
        isOpenLoading: true
    }
}
//点击签到
export function homeSigninSignAPI() {
    return {
        url: `/all/home_signin_sign`,
        isOpenLoading: true
    }
}
//获取优惠活动数据
export function getPromotionHallAPI() {
    return {
        url: `/all/home_WithOutCheck_getPromotionHall`,
        isOpenLoading: true
    }
}

//获取优惠活动详情数据
export function getNewsContentAPI() {
    return {
        url: `/all/home_WithOutCheck_getNewsContent`,
        isOpenLoading: true
    }
}

//抽奖
export function turntableBigWheelAPI() {
    return {
        url: `/all/home_Turntable_bigWheel`,
        isOpenLoading: true
    }
}

//奖品信息
export function withOutCheckBigWheelAPI() {
    return {
        url: `/all/home_Index_bigWheel`,
        isOpenLoading: true
    }
}


//  预测计划-排行榜(首页)
export function getForecastRankingAPI(){
    return {
        url: `/all/home_ExportPlan_focecastRanking`,
        isOpenLoading: false
    }
}

//  获取预测计划
export function getForecastPlanAPI(){
    return {
        url: `/all/home_ExportPlan_focecastPlan`,
        isOpenLoading: true
    }
}

//  获取反馈类型
export function getSuggestionGetTypeAPI(){
    return {
        url: `/all/home_Suggestion_getType`,
        isOpenLoading: true
    }
}

//  提交反馈
export function getSuggestionSuggestAPI(){
    return {
        url: `/all/home_Suggestion_suggest`,
        isOpenLoading: true
    }
}

//  提交回电
export function getCallbackAPI(){
    return {
        url: `/all/home_Suggestion_callback`,
        isOpenLoading: true
    }
}

//  分享注单
export function shareOrderAPI(){
    return {
        url: `/all/home_Chat_shareOrder`,
        isOpenLoading: true
    }
}

//  获取开奖结果
export function homeIndexGetCodeResultTrendAPI(){
    return {
        url: `/all/home_Index_getResultTrend`,
        isOpenLoading: true
    }
}

//  转入
export function homeWalletTransferAPI(){
    return {
        url: `/all/home_Wallet_transfer`,
        isOpenLoading: true
    }
}

//  转出
export function homeWalletTransferOutAPI(){
    return {
        url: `/all/home_Wallet_transferOut`,
        isOpenLoading: true
    }
}

//  获取利息宝余额信息
export function homeWalletGetWalletAmountAPI(){
    return {
        url: `/all/home_Wallet_getWalletAmount`,
        isOpenLoading: true
    }
}

//  获取余利宝明细
export function homeWalletDetailAPI(){
    return {
        url: `/all/home_wallet_detail`,
        isOpenLoading: true
    }
}

//  设置昵称
export function homeUserChangeChatNicknameAPI(){
    return {
        url: `/all/home_User_changeChatNickname`,
        isOpenLoading: true
    }
}




// **********红包项目**************//

//  发红包接口
export function redPackGameGameGiveAPI(){
    return {
        url: `/all/redPackGame_game_give`,
        isOpenLoading: true
    }
}


//  抢红包接口
export function redPackGameGameGrabAPI(){
    return {
        url: `/all/redPackGame_game_grab`,
        isOpenLoading: true
    }
}

//  初始化红包游戏
export function redPackGameIndexInitAPI(){
    return {
        url: `/all/redPackGame_index_init`,
        isOpenLoading: true
    }
}

//  绑定用户
export function redPackGameChatRoomBindUserAPI(){
    return {
        url: `/all/redPackGame_Chat_bindUser`,
        isOpenLoading: true
    }
}

//  加入房间
export function redPackGameChatRoomJoinRoomAPI(){
    return {
        url: `/all/redPackGame_Chat_joinRoom`,
        isOpenLoading: true
    }
}

//  离开房间
export function redPackGameChatLeaveRoomAPI(){
    return {
        url: `/all/redPackGame_Chat_leaveRoom`,
        isOpenLoading: true
    }
}

//  获取历史聊天记录
export function redPackGameChatRoomGetChatLogAPI(){
    return {
        url: `/all/redPackGame_Chat_getChatLog`,
        isOpenLoading: true
    }
}

//  发送消息
export function redPackGameChatRoomSendMsgAPI(){
    return {
        url: `/all/redPackGame_Chat_sendMsg`,
        isOpenLoading: true
    }
}

//  获取群信息接口
export function redPackGameChatInfoAPI(){
    return {
        url: `/all/redPackGame_chat_info`,
        isOpenLoading: true
    }
}

//  红包明细接口
export function redPackGameGameDetailAPI(){
    return {
        url: `/all/redPackGame_game_detail`,
        isOpenLoading: true
    }
}

//  用户列表
export function redPackGameChatGetUsersAPI(){
    return {
        url: `/all/redPackGame_Chat_getUsers`,
        isOpenLoading: true
    }
}

//  游戏规则接口
export function redPackGameIndexGameRuleAPI(){
    return {
        url: `/all/redPackGame_index_gameRule`,
        isOpenLoading: true
    }
}

//  群详情玩法规则(跳转)
export function redPackGameJumpRuleAPI(){
    return {
        url: `/all/redPackGame_index_roomsRule`,
        isOpenLoading: true
    }
}

//  红包历史报表
export function redPackGameIndexReReportAPI(){
    return {
        url: `/all/redPackGame_index_reReport`,
        isOpenLoading: true
    }
}

