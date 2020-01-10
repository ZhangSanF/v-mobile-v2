let global_callback = {};
let serverPort = ''; // 连接端口
let curUrl = ''
let heartPing = null;
let failCount = 0;
import store from '../store';
import Vue from 'vue'
import Router from '../router'


export let websock = null;

export const initWebSocket = (wsurl,callback) => {
    if(callback){
        global_callback = callback;
    }else{
        global_callback = global_callback;
    }
    if (!wsurl) return;
    curUrl = wsurl;
    websock = new WebSocket(wsurl);
    websock.onmessage = (e) => {        
        webSocketOnMessage(e);
    };
    websock.onclose = (e) => {
        console.log('a')
        webSocketClose(e)
    };
    websock.onopen = () => {
        webSocketOpen();
    }

    // 连接失败回调
    websock.onerror = () => {
        console.log('webSocket连接发生错误');
    }
}

// 实际调用
export const sendSock = (agentData, callback) => {
    if(callback){
        global_callback = callback;
    }else{
        global_callback = global_callback;
    }
    if (!websock) {
        setTimeout(() => {
            sendSock(agentData, callback);
        }, 1000);
    } else if (websock.readyState === websock.OPEN) {
        // 如果是开启状态
        webSocketSend(agentData);
    } else if (websock.readyState === websock.CONNECTIONG) {
        // 若是正在连接状态 则等待一秒后调用
        setTimeout(() => {
            sendSock(agentData, callback);
        }, 1000);
    } else {
        // 若是未状态 则等待一秒后调用
        setTimeout(() => {
            sendSock(agentData, callback);
        }, 1000);
    }
}

// 数据接收
export const webSocketOnMessage = (e) => {
    if (typeof global_callback == 'function') {
        global_callback(JSON.parse(e.data));
    }
}

// 数据发送
export const webSocketSend = (agentData) => {
    websock.send(JSON.stringify(agentData));
}

// 关闭
export const webSocketClose = (e) => {
    console.log(failCount)

    setTimeout(() => {
        if (failCount > 5) {
            // Vue.prototype.$Tip.error({ content: '请求错误，请刷新重试' });
            return;
        }
        failCount++;
        if(location.href.split('#').length>1 && location.href.split('#')[1] != "/login"){
            store.dispatch('tokenAccess');
        }
        // initWebSocket(curUrl);
    }, 500);

    console.log(`connection closed (${e.code})`);
}

// 连接成功
export const webSocketOpen = (e) => {
    console.log('连接成功');
    clearTimeout(heartPing);
    pingConn();
}

// 发送心跳包
export const pingConn = () => {
    clearTimeout(heartPing);
    heartPing = setTimeout(() => {
        sendSock({ 'type': 'ping' }, null);
        pingConn();
    }, 55000);
}
