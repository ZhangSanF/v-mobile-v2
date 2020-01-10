/*
 * @Author: a.rui 
 * @Date: 2018-09-05 17:26:47 
 * @Last Modified by: a.rui
 * @Last Modified time: 2019-12-12 17:22:24
 */
import axios from "./axios";
import * as urls from "./apiUrl";

// 初始化
export function homeIndexInit(params) {
    let param = Object.assign({}, {
        actions: params.actions || '',
        code: params.code || '',
        page: params.page || '',
    });
    return axios.post(urls.homeIndexInitAPI(), param);
}

// lottery页面轮询
export function lotteryAndUserInfo(params) {
    let param = Object.assign({}, {
        code: params.code || 'bjpk10',
    });
    return axios.post(urls.lotteryAndUserInfoAPI(), param);
}

// 绑定websocket用户ID
export function homeChatBind(params) {
    let param = Object.assign({}, {
        clientId:params.clientId
    });
    return axios.post(urls.homeChatBindAPI(), param);
}

// 未登录状态获取彩种列表 公告 外部链接
export function homeWithOutCheckLoginInit(params) {
    let param = Object.assign({}, {
        actions:params.actions,
        version:params.version
    });
    return axios.post(urls.homeWithOutCheckLoginInitAPI(), param);
}

//  首页红包点击
export function homeChatGetRedPackageTime(params) {
    let param = Object.assign({}, {
        red_package_id: params.red_package_id
    });
    return axios.post(urls.homeChatGetRedPackageTimeAPI(), param);
}

// 获取开奖结果
export function homeIndexGetCodeResult(params) {
    let param = Object.assign({}, {
        page: params.page,
        code: params.code,
    });
    return axios.post(urls.homeIndexGetCodeResultAPI(), param);
}

// 获取开奖结果
export function homeIndexGetCodeResultTrend(params) {
    let param = Object.assign({}, {
        page: params.page,
        code: params.code,
    });
    return axios.post(urls.homeIndexGetCodeResultTrendAPI(), param);
}

// 获取注单
export function homeUserOrderList(params) {
    let param = Object.assign({}, {
        p: params.page,
        status: params.status,
        code: params.code, //['-2'=>'已拒绝','-1'=>'失败','0'=>'处理中','1'=>'已通过','2'=>''全部]
    });
    return axios.post(urls.homeUserOrderListAPI(), param);
}

// 退出登录
export function homeLoginOrRegisterLogOff() {
    let param = Object.assign({}, {});
    return axios.post(urls.homeLoginOrRegisterLogOffAPI(), param);
}

// 登录
export function homeLoginOrRegisterLogin(params) {
    // let param = Object.assign({}, {
    //     userName: params.userName,
    //     password: params.password,
    //     regularOrguest: params.regularOrguest || '',  
    //     source: params.source || ''
    // });
    return axios.post(urls.homeLoginOrRegisterLoginAPI(), params);
}

// 获取聊天记录
export function homeChatGetChatLog(params) {
    let param = Object.assign({}, params);
    return axios.post(urls.homeChatGetChatLogAPI(), param);
}

// 获取聊天记录
export function homeChatGetGifEmoji(params) {
    let param = Object.assign({}, params);
    return axios.post(urls.homeChatGetGifEmoji(), param);
}

// 发送消息
export function homeChatSendMsgToChatRoom(params) {
    let param = {};
    if(params.isChangeHeader){
        param = params.data;
    }else{
        param = Object.assign({}, {
            content: params.content
        });
    }
    return axios.post(urls.homeChatSendMsgToChatRoomAPI(), param,params.isChangeHeader);
}

// 获取红包
export function homeChatGetRedPackage(params) {
    let param = Object.assign({}, {
        red_package_id: params.red_package_id
    });
    return axios.post(urls.homeChatGetRedPackageAPI(), param);
}

// 投注
export function homeOrdersPlaceOrder(params) {
    let param = Object.assign({}, {
        code: params.code,
        bet_type: params.bet_type,
        orders: params.orders
    });
    return axios.post(urls.homeOrdersPlaceOrderAPI(), param);
}

// 发送验证码
export function homeAllPaymentsSendSmsCode(params) {
    let param = Object.assign({}, {
        phone:params.phone
    });
    return axios.post(urls.homeAllPaymentsSendSmsCodeAPI(), param);
}

// 绑定银行卡
export function homeAllPaymentsUserBindBankCard(params) {
    let param = Object.assign({}, {
        bankName: params.bankName,
        address: params.address,
        account: params.account,
        phone: params.phone,
        smsCode: params.smsCode,
        truename: params.truename,
    });
    return axios.post(urls.homeAllPaymentsUserBindBankCardAPI(), param);
}

// 获取银行卡列表
export function homeAllPaymentsGetWithdrawalBankList() {
    let param = Object.assign({}, {
    });
    return axios.post(urls.homeAllPaymentsGetWithdrawalBankListAPI(), param);
}

// 提交充值 提款信息
export function homeAllPaymentsDepositWithdrawPlatform(params) {
    let param = Object.assign({}, {
        remark: params.remark || "",
        i_d: params.i_d || "",
        type: params.type || "",
        method: params.method || "",
        cardName: params.cardName || "",
        cardNum: params.cardNum || "",
        cardBank: params.cardBank || "",
        order_amount: params.order_amount || "",
        info: params.info || "",
        pay_letter: params.pay_letter || "",
        bank_code: params.bank_code || "",
        bank_type: params.bank_type || "",
        password: params.password || "",
    });
    return axios.post(urls.homeAllPaymentsDepositWithdrawPlatformAPI(), param);
}

// 存取款记录
export function homeAllPaymentsUserTransactionRecord(params) {
    let param = Object.assign({}, {
        page: params.page,
        status: params.status, //['-2'=>'已拒绝','-1'=>'失败','0'=>'处理中','1'=>'已通过','2'=>''全部]
        type: params.type,
    });
    return axios.post(urls.homeAllPaymentsUserTransactionRecordAPI(), param);
}

// 获取支持的支付方式
export function homeAllPaymentsGetPaymentInfo(params) {
    let param = Object.assign({}, {
      source: params.source
    });
    return axios.post(urls.homeAllPaymentsGetPaymentInfoAPI(), param);
}

// 棋牌上下分 额度转换
/**
 * @param {string} source 棋牌源 kaiyuan为开元棋牌  dafa为大发棋牌
 * */
export function homeKaiyuanDepositWithdrawal(params, source) {
    let param = Object.assign({}, {
        inType: params.inType,
        outType: params.outType,
        money: params.money,
    });
    return axios.post(urls.homeKaiyuanDepositWithdrawalAPI(params.source), param);
}

// 棋牌钱包查询余额
export function homeKaiyuanSearchBalance(source) {
    let param = Object.assign({}, {});
    return axios.post(urls.homeKaiyuanSearchBalanceAPI(source), param);
}

// 请求棋牌游戏登录
export function homeKaiyuanDoLogin(params) {
    let param = Object.assign({}, {
        kindId:params.kindId
    });
    return axios.post(urls.homeKaiyuanDoLoginAPI(params.source), param);
}

// 请求棋牌游戏列表
export function homeKaiyuanAliveGames(source) {
    let param = Object.assign({}, {
    });
    return axios.post(urls.homeKaiyuanAliveGamesAPI(source), param);
}

// 上传用户头像
export function homeUserUploadChatHeaderImg(params) {
    return axios.post(urls.homeUserUploadChatHeaderImgAPI(), params,true);
}

// 系统消息
export function homeUserSysMsg() {
    let param = Object.assign({}, {
    });
    return axios.post(urls.homeUserSysMsgAPI(), param);
}

// 修改密码
export function homeUserChangeAllPwd(params) {
    let param = Object.assign({}, {
        oldPass: params.oldPass, 
        newPass1: params.newPass1, 
        newPass2: params.newPass2, 
        type: params.type
    });
    return axios.post(urls.homeUserChangeAllPwdAPI(), param);
}

// 注册账号
export function homeLoginOrRegisterRegister(params) {
    // let param = Object.assign({}, {
    //     userName: params.userName,
    //     password: params.password,
    //     rePassword: params.rePassword,
    //     email: params.email,
    //     phone: params.phone,
    //     promocode: params.promocode,
    //     trueName: params.trueName,
    //     identifyCode: params.identifyCode,
    // });
    return axios.post(urls.homeLoginOrRegisterRegisterAPI(), params);
}

// 请求中奖信息
export function homeIndexQuestNewData(params) {
    let param = Object.assign({}, {
        code: params.code,
        phase: params.phase,
    });
    return axios.post(urls.homeIndexQuestNewDataAPI(), param);
}

// 请求历史报表 日期
export function homeUserReport(params) {
    let param = params
    return axios.post(urls.homeUserReportAPI(), param);
}

// 请求推广统计代码
export function getPromoteScript(params) {
    let param = params
    return axios.post(urls.getPromoteScriptAPI(), param);
}

// 上报错误日志
export function uploadErrorLog(params) {
    let param = params
    return axios.post(urls.uploadErrorLogAPI(), param);
}

// 获取服务大厅数据
export function getServiceHallData(params) {
    let param = params
    return axios.post(urls.getServiceHallDataAPI(), param);
}
// 签到初始化数据
export function getAttendanceRecord(params) {
    let param = params
    return axios.post(urls.getAttendanceRecordAPI(), param);
}
//点击签到
export function homeSigninSign(params) {
    let param = params
    return axios.post(urls.homeSigninSignAPI(), param);
}
// 获取优惠活动数据
export function getPromotionHall(params) {
    let param = params
    return axios.get(urls.getPromotionHallAPI(), param);
}

// 获取优惠活动详情数据
export function getNewsContent(params) {
    let param = params
    return axios.get(urls.getNewsContentAPI(), param);
}

// 抽奖
export function turntableBigWheel(params) {
    let param = params
    return axios.get(urls.turntableBigWheelAPI(), param);
}

// 奖品信息
export function withOutCheckBigWheel(params) {
    let param = params
    return axios.get(urls.withOutCheckBigWheelAPI(), param);
}


// 预测计划-排行榜(首页)
export function getForecastRanking(params) {
    let param = Object.assign({}, {
        code: params.code
    });
    return axios.post(urls.getForecastRankingAPI(), param);
}

//  预测计划
export function getForecastPlan(params) {
    let param = Object.assign({}, {
        code: params.code,
        expert_id: params.expert_id,
        open_date: params.open_date,
        forecast_quantity: params.forecast_quantity,
        location: params.location,
        at_last_expect: params.at_last_expect || 0
    });
    return axios.post(urls.getForecastPlanAPI(), param);
}


//  获取反馈类型
export function getSuggestionGetType(params) {
    let param = Object.assign({}, {
      type: params.type
    });
    return axios.post(urls.getSuggestionGetTypeAPI(), param);
}

//  提交反馈
export function getSuggestionSuggest(params) {
    let param = Object.assign({}, {
        type:params.type,
        content:params.content,
        speed:params.speed,
        interface:params.interface,
        operate:params.operate,
    });
    return axios.post(urls.getSuggestionSuggestAPI(), param);
}

//  提交回电
export function getCallback(params) {
    let param = Object.assign({}, {
        type:params.type,
        language:params.language,
        phone:params.phone,
    });
    return axios.post(urls.getCallbackAPI(), param);
}

//  分享注单
export function shareOrder(share) {
    let param = Object.assign({}, {
        share:share,
    });
    return axios.post(urls.shareOrderAPI(), param);
}

//  转入
export function homeWalletTransfer(money) {
    let param = Object.assign({}, {
        money:money,
    });
    return axios.post(urls.homeWalletTransferAPI(), param);
}

//  转出
export function homeWalletTransferOut(params) {
    let param = Object.assign({}, {
        money:params.money,
        confirm:params.confirm || 0
    });
    return axios.post(urls.homeWalletTransferOutAPI(), param);
}

//  获取利息宝余额信息
export function homeWalletGetWalletAmount(status) {
    let param = Object.assign({}, {
        status:status || 'all',
    });
    return axios.post(urls.homeWalletGetWalletAmountAPI(), param);
}

//  获取余利宝明细
export function homeWalletDetail(page) {
    let param = Object.assign({}, {
        page:page || 1,
    });
    return axios.post(urls.homeWalletDetailAPI(), param);
}

//  修改昵称
export function homeUserChangeChatNickname(chatNickname) {
    let param = Object.assign({}, {
        chat_nickname:chatNickname,
    });
    return axios.post(urls.homeUserChangeChatNicknameAPI(), param);
}



// **********红包项目**************//

//  发红包接口
export function redPackGameGameGive(params) {
    let param = Object.assign({}, {
        groupId:params.groupId,//游戏群ID
        count:params.count,//红包数量
        amount:params.amount,//红包金额
        content:params.content,//雷区内容
    });
    return axios.post(urls.redPackGameGameGiveAPI(), param);
}

//  抢红包接口
export function redPackGameGameGrab(recordId) {
    let param = Object.assign({}, {
        recordId:recordId //红包ID
    });
    return axios.post(urls.redPackGameGameGrabAPI(), param);
}

//  初始化红包游戏
export function redPackGameIndexInit() {
    let param = Object.assign({}, {});
    return axios.post(urls.redPackGameIndexInitAPI(), param);
}

//  绑定用户
export function redPackGameChatRoomBindUser(clientId) {
    let param = Object.assign({}, {
        clientId:clientId //open事件返回的client_id
    });
    return axios.post(urls.redPackGameChatRoomBindUserAPI(), param);
}

//  加入房间
export function redPackGameChatRoomJoinRoom(params) {
    let param = Object.assign({}, {
        roomId:params.roomId, //房间号
        clientId:params.clientId
    });
    return axios.post(urls.redPackGameChatRoomJoinRoomAPI(), param);
}

//  离开房间
export function redPackGameChatLeaveRoom(params) {
    let param = Object.assign({}, {
        roomId:params.roomId, //房间号
        clientId:params.clientId, //客户id
    });
    return axios.post(urls.redPackGameChatLeaveRoomAPI(), param);
}

//  获取历史聊天记录
export function redPackGameChatRoomGetChatLog(params) {
    let param = Object.assign({}, {
        roomId:params.roomId, //房间号
        pageSize:params.pageSize,
        chatId:params.chatId
    });
    return axios.post(urls.redPackGameChatRoomGetChatLogAPI(), param);
}

//  发送消息
export function redPackGameChatRoomSendMsg(params) {
    let param = Object.assign({}, {
        type:params.type, //消息类型
        roomId:params.roomId, //房间号
        content:params.content, //消息内容(发送图片时，此字段可不填)
        clientId:params.clientId //客户id
    });
    return axios.post(urls.redPackGameChatRoomSendMsgAPI(), param);
}

//  获取群信息接口
export function redPackGameChatInfo(groupId) {
    let param = Object.assign({}, {
        groupId:groupId, //群id
    });
    return axios.post(urls.redPackGameChatInfoAPI(), param);
}

//  红包明细接口
export function redPackGameGameDetail(recordId) {
    let param = Object.assign({}, {
        recordId:recordId, //红包id
    });
    return axios.post(urls.redPackGameGameDetailAPI(), param);
}

//  用户列表
export function redPackGameChatGetUsers(params) {
    let param = Object.assign({}, {
        groupId:params.groupId, //房间id
        page:params.page, //页码
        pageSize:params.pageSize, //每页数量
    });
    return axios.post(urls.redPackGameChatGetUsersAPI(), param);
}

//  游戏规则接口
export function redPackGameIndexGameRule() {
    let param = Object.assign({}, {});
    return axios.post(urls.redPackGameIndexGameRuleAPI(), param);
}

//  群详情玩法规则(跳转)
export function redPackGameJumpRule(params) {
    let param = Object.assign({}, {
        gameId:params.gameId, //房间id
        typeId:params.typeId, //玩法1 规则2
    });
    return axios.get(urls.redPackGameJumpRuleAPI(), param);
}

//  红包历史报表
export function redPackGameIndexReReport(params) {
    let param = Object.assign({}, {
        page:params.page , //页码
        limit:params.limit, //每页条数，默认20条数据
        gameType:params.gameType, //游戏类型 参考初始化接口中的 GameType
        typeId:params.typeId, //抢发包类型 1-代表发包 2-代表发包，默认类型为发包
        start:params.start, //开始时间  时间格式为YYYY-MM-DD,默认为当天时间
        end:params.end, //结束时间  时间格式为YYYY-MM-DD,默认为当天时间
    });
    return axios.get(urls.redPackGameIndexReReportAPI(), param);
}