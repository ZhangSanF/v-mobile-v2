import { GAMES } from '@/config'

//时间格式化
export function timeStamp(second_time, t) {
  if (second_time < 0 || !second_time) {
    second_time = 0
  }
  var time = t ? '00:00:' + parseInt(second_time) : '00:' + parseInt(second_time);
  if (second_time < 10) {
    time = t ? '00:00:0' + second_time : '00:0' + second_time
  }
  if (parseInt(second_time) > 59) {
    var second = parseInt(second_time) % 60;
    var min = parseInt(second_time / 60);
    if (second < 10) {
      second = '0' + second
    }
    if (min < 10) {
      min = '0' + min
    }
    time = t ? '00:' + min + ":" + second : min + ":" + second;
    if (min > 59) {
      min = parseInt(second_time / 60) % 60;
      var hour = parseInt(parseInt(second_time / 60) / 60);
      if (min < 10) {
        min = '0' + min
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      time = hour + ":" + min + ":" + second;
      if (hour > 23) {
        hour = parseInt(parseInt(second_time / 60) / 60) % 24;
        var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
        if (hour < 10) {
          hour = '0' + hour
        }
        time = day + "天" + hour + ":" + min + ":" + second;
      }
    }
  }
  return time;
}

//整期时间格式化
export function codeTimeStamp(seconds, code) {
  if (code == 'hk6') {
    return '2天或3天';
  }
  if (code == 'pl3' || code == 'fc3d') {
    return '1天';
  }
  let second = parseInt(seconds) || 0;
  if (second % 60 !== 0) {
    return second + '秒';
  }
  if (second < 3600) {
    return second / 60 + '分钟';
  }
  if (second < 86400) {
    let hour = Math.floor(second / 3600);
    let min = second % 3600;
    return hour + '小时' + min + '分'
  }
}

// 红包倒计时
export function formatTimerCallback(second) {
  if (second < 0) return 0;

  let day = ~~(second / (24 * 60 * 60));
  second = second - day * 24 * 60 * 60;
  let hour = ~~(second / (60 * 60));
  second = second - hour * 60 * 60;
  let min = ~~(second / 60);
  second = second - min * 60;
  
    // 天
    if (day > 0) day = day + "";
    else day = "";

    // 小时
    if (hour > 0) hour = hour ;
    else hour = "00";

    // 分钟
    if (min < 10 && min > 0) {
      min = "0" + min ;
    } else if (min <= 0) {
      min = "00";
    } else {
      min;
    }
    // 秒
    if (second < 10) second = "0" + second;
    return {
      day:day,
      hour:hour,
      min:min,
      second:second
    };
}

// 转换香港六合彩号码对应颜色样式
export function hk6Color(code, num) {
  var codeClass = GAMES[code].class;
  if (codeClass != 'hk6') return;
  let red = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46];
  let blue = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48];
  let green = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49];
  let ret = '';
  // console.log(code)
  if (red.indexOf(parseInt(num)) != -1) {
    ret = 'red';
  } else if (blue.indexOf(parseInt(num)) != -1) {
    ret = 'blue';
  } else if (green.indexOf(parseInt(num)) != -1) {
    ret = 'green';
  }
  return ret;
}

//各彩种时间信息
export function betTime(type, p) {
  switch (type) {
    case 'bjpk10':
      return { allTime: 1200, difference: 40 }; //time 每期总时间  /close_time 封盘时间  /diffTime 封盘和开奖时间差
      break;

    case 'hlsc':
    case 'hlft':
    case 'hlssc':
    case 'azxy10':
    case 'azxy5':
      return { allTime: 300, difference: 40 }; //time 每期总时间  /close_time 封盘时间  /diffTime 封盘和开奖时间差
      break;

    case 'pk10nn':
      return { allTime: 1200, difference: 40 }; //time 每期总时间  /close_time 封盘时间  /diffTime 封盘和开奖时间差
      break;

    case 'jssc':
      return { allTime: 75, difference: 15 }; //time 每期总时间  /close_time 封盘时间  /diffTime 封盘和开奖时间差
      break;

    case 'jsnn':
      return { allTime: 75, difference: 15 }; //time 每期总时间  /close_time 封盘时间  /diffTime 封盘和开奖时间差
      break;

    case 'jsft':
      return { allTime: 75, difference: 15 }; //time 每期总时间  /close_time 封盘时间  /diffTime 封盘和开奖时间差
      break;

    case 'mlaft':
      return { allTime: 300, difference: 50 };
      break;

    case 'cqssc':
      // var p = p + '';
      // var pNum = parseInt(p.substr(9));
      // if (pNum < 23 || pNum > 96) {
      //   return { allTime: 300, difference: 40 };
      // } else {
      //   return { allTime: 600, difference: 40 };
      // }
      return { allTime: 1200, difference: 40 };
      break;

    case 'xjssc':
    case 'tjssc':
      return { allTime: 1200, difference: 40 };
      break;

    case 'jsssc':
      return { allTime: 75, difference: 15 };
      break;

    case 'txffc':
      return { allTime: 60, difference: 5 };
      break;

    case 'cqklsf':
      return { allTime: 1200, difference: 120 };
      break;

    case 'bjkl8':
      return { allTime: 300, difference: 40 };
      break;

    case 'pcdd':
      return { allTime: 300, difference: 40 };
      break;

    case 'gd11x5':
    case 'sd11x5':
    case 'jx11x5':
      return { allTime: 1200, difference: 120 };
      break;

    case 'jsk3':
    case 'bjk3':
    case 'shk3':
    case 'hubk3':
    case 'gxk3':
    case 'ahk3':
    case 'hebk3':
    case 'gsk3':
    case 'gzk3':
      return { allTime: 1200, difference: 110 };
      break;
    case 'jlk3':
      return { allTime: 1200, difference: 110 };
      break;
    case 'mjsk3':
      return { allTime: 75, difference: 15 };
      break;
    case 'hlk3':
      return { allTime: 300, difference: 40 };
      break;

    case 'gdklsf':
      return { allTime: 1200, difference: 120 };
      break;

    case 'hk6':
      return 0;
      break;
    case 'fc3d':
      return { allTime: 40500, difference: 300 };
      break;
    case 'pl3':
      return { allTime: 40500, difference: 300 };
      ;
      break;

    case 'xyhk6':
      return { allTime: 300, difference: 40 }; //time 每期总时间  /close_time 封盘时间  /diffTime 封盘和开奖时间差
      break;
  }
}

//倒计时
export function countDown(seconds) {
  seconds--;
  seconds < 0 ? seconds = 0 : 1;
  return seconds || 0;
}

//数字数组转整
export function intArray(arr) {
  var newArr = [];
  for (var k in arr) {
    newArr.push(parseInt(arr[k]));
  }
  return newArr;
}

//注单组成
export function GT1(bets) { //普通玩法
  var newArr = [];
  for (var k in bets) {
    console.log(bets[k]);
    newArr.push(bets[k]);
  }
  return newArr;
}

export function GT2(bets, group) { //连码
  var newArr = [];
  var playArr = []; //号码排序暂用
  var newPlayArr = []; //号码排序暂用
  var newObj = {}; //号码排序暂用
  for (var k in bets) {
    playArr.push(bets[k].num);
    newObj['n' + bets[k].num] = bets[k];
  }
  switch (group) {
    case 2:
      for (var i = 0; i < playArr.length - 1; i++) {
        for (var j = i + 1; j < playArr.length; j++) {
          newPlayArr.push([playArr[i], playArr[j]].sort(function (a, b) {
            return a - b
          }));
        }
      }
      for (var i = 0; i < newPlayArr.length; i++) {
        var arr = [];
        for (var j = 0; j < newPlayArr[i].length; j++) {
          arr.push(newObj['n' + newPlayArr[i][j]]);
        }
        newArr.push({
          name: arr[0].name,
          play: arr[0].play,
          num: arr[0].num + ' , ' + arr[1].num,
          odds: arr[0].odds
        });
      }
      break;
  }
  return newArr;
}

// 连码组合方法
export function combination(arr, size) {
  var allResult = [];
  combin(arr, size, []);

  function combin(arr, size, result) {
    var arrLen = arr.length;
    if (size > arrLen) {
      return;
    }
    if (size == arrLen) {
      allResult.push([].concat(result, arr))
    } else {
      for (var i = 0; i < arrLen; i++) {
        var newResult = [].concat(result);
        newResult.push(arr[i]);

        if (size == 1) {
          allResult.push(newResult);
        } else {
          var newArr = [].concat(arr);
          newArr.splice(0, i + 1);
          combin(newArr, size - 1, newResult);
        }
      }
    }
  }

  return allResult;
}

//露珠表结构
export function luzhuTabs(code) {
  var res = {
    topTh: [],
    topTr1: [],
    topTr2: [],
    botTh: []
  };
  switch (code) {
    case 'bjpk10':
    case 'hlsc':
    case 'hlft':
    case 'jssc':
    case 'mlaft':
    case 'jsft':
    case 'azxy10':
    case 'azxy5':
      res = {
        // topTh: ['冠军','亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名' ],
        topTh: [
          [
            { name: '冠军', id: 0 },
            { name: '亚军', id: 1 },
            { name: '第三名', id: 2 },
            { name: '第四名', id: 3 },
            { name: '第五名', id: 4 },
          ],
          [
            { name: '第六名', id: 5 },
            { name: '第七名', id: 6 },
            { name: '第八名', id: 7 },
            { name: '第九名', id: 8 },
            { name: '第十名', id: 9 },
          ],
        ],
        topTr1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        topTr2: [],
        botTh: [
          [
            { name: '冠军', key: 'num' },
            { name: '大小', key: 'daxiao' },
            { name: '单双', key: 'danshuang' },
            { name: '冠、亚军和', key: 'gyh' },
          ],
          [
            { name: '冠、亚军和 大小', key: 'gydx' },
            { name: '冠、亚军和 单双', key: 'gyds' },
          ]
        ],
      };
      break;

    case 'cqssc':
    case 'hlssc':
    case 'xjssc':
    case 'tjssc':
    case 'jsssc':
    case 'txffc':
      res = {
        topTh: [
          [
            { name: '第一球', id: 0 },
            { name: '第二球', id: 1 },
            { name: '第三球', id: 2 },
            { name: '第四球', id: 3 },
            { name: '第五球', id: 4 },
          ],
        ],
        topTr1: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        topTr2: [],
        botTh: [
          [
            { name: '第一球', key: 'num' },
            { name: '大小', key: 'daxiao' },
            { name: '单双', key: 'danshuang' },
            { name: '总和大小', key: 'sumdaxiao' },
          ],
          [
            { name: '总和单双', key: 'sumdanshuang' },
            { name: '龙虎和', key: 'sumlonghu' },
          ]
        ],
      };
      break;

    case 'gd11x5':
    case 'sd11x5':
    case 'jx11x5':
      res = {
        topTh: [
          [
            { name: '第一球', id: 0 },
            { name: '第二球', id: 1 },
            { name: '第三球', id: 2 },
            { name: '第四球', id: 3 },
            { name: '第五球', id: 4 },
          ]
        ],
        topTr1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        topTr2: [],
        botTh: [
          [
            { name: '第一球', key: 'num' },
            { name: '大小', key: 'daxiao' },
            { name: '单双', key: 'danshuang' },
            { name: '总和大小', key: 'sumdaxiao' },
          ],
          [
            { name: '总和尾数大小', key: 'sumweidaxiao' },
            { name: '总和单双', key: 'sumdanshuang' },
            { name: '龙虎', key: 'sumlonghu' },
          ]
        ],
      };
      break;

    case 'cqklsf':
    case 'gdklsf':
      res = {
        topTh: [
          [
            { name: '第一球', id: 0 },
            { name: '第二球', id: 1 },
            { name: '第三球', id: 2 },
            { name: '第四球', id: 3 },
          ],
          [
            { name: '第五球', id: 4 },
            { name: '第六球', id: 5 },
            { name: '第七球', id: 6 },
            { name: '第八球', id: 7 },
          ]
        ],
        topTr1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        topTr2: [],
        botTh: [
          [
            { name: '第一球', key: 'num' },
            { name: '大小', key: 'daxiao' },
            { name: '单双', key: 'danshuang' },
            { name: '龙虎', key: 'longhu' },
            { name: '尾数大小', key: 'weidaxiao' },
          ], [
            { name: '合数单双', key: 'hedanshuang' },
            { name: '总和大小', key: 'sumdaxiao' },
            { name: '总和单双', key: 'sumdanshuang' },
            { name: '总尾数大小', key: 'sumweidaxiao' },
          ]
        ],
      };
      if (code == 'cqklsf') {
        res.topTr2 = ['西瓜', '椰子', '榴莲', '柚子', '菠萝', '葡萄', '荔枝', '樱桃', '草莓', '番茄', '梨子', '苹果', '桃子', '柑橘', '冬瓜', '萝卜', '南瓜', '茄子', '家犬', '奶牛']
      }
      break;

    default:
      res = null;
      break;
  }
  return res;
}


/*
     storage 主要放项目中的storage相关操作：存取等
*/
export const storage = {
  setStorage: function (key, value, duration) {
    var data = {
      value: value,
      expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)
    };
    localStorage[key] = JSON.stringify(data);
  },
  getStorage: function (key) {
    var data = localStorage[key];
    if (!data || data === "null") {
      return null;
    }
    var now = this.getCurrentTimeStamp();
    var obj;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return null;
    }
    if (obj.expiryTime === 0 || obj.expiryTime > now) {
      return obj.value;
    }
    return null;
  },
  removeStorage: function (key) {
    localStorage.removeItem(key);
  },
  getSession: function (key) {
    var data = sessionStorage[key];
    if (!data || data === "null") {
      return null;
    }
    return JSON.parse(data).value;

  },
  setSession: function (key, value) {
    var data = {
      value: value
    }
    sessionStorage[key] = JSON.stringify(data);
  },
  getCurrentTimeStamp: function () {
    return Date.parse(new Date());
  }
};

//在线人数生成
export function onlineCount() {
  var days = (new Date()).getTime() / 86400000;
  var hours = (new Date()).getHours();
  if (hours > 18) {
    days = days * 1.4;
  } else if (hours > 12) {
    days = days * 1.2
  } else if (hours > 8) {
    days = days;
  } else if (hours > 4) {
    days = days / 10;
  } else if (hours > 0) {
    days = days / 5;
  }
  days = Math.floor(days);
  var random = Math.floor(Math.random() * 300);
  return (days + random);
}

//读取URL链接中的参数 推广注册 APP 用
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

//判断元素是否在数组中
export function isInArray(str, arr) {
  if (arr.indexOf(str) >= 0) {
    return true;
  }
  return false;
}

//数组求和
export function arrayCount(arr) {
  let r = 0;
  for (let i in arr) {
    r += parseInt(arr[i]);
  }
  return r;
}

export function arrayStrToNum(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i]);
  }
  return arr;
}

//开奖结果 龙虎计算
export function resultCount(code, balls) {
  let result = {};
  let zonghe = arrayCount(balls);
  let codeClass = GAMES[code].class;
  if (codeClass == 'hk6') return;
  balls = arrayStrToNum(balls);

  switch (codeClass) {
    case 'bjpk10':
      result['gyh'] = [
        balls[0] + balls[1],
        (balls[0] + balls[1]) > 11 ? '大' : '小',
        (balls[0] + balls[1]) % 2 == 0 ? '双' : '单',
      ];
      result['longhu15'] = [];
      var len = balls.length;
      for (let i = 0; i < 5; i++) {
        result['longhu15'].push(balls[i] > balls[len - i - 1] ? '龙' : '虎');
      }
      break;

    case 'cqssc':
    case 'xjssc':
    case 'tjssc':
      if(code == 'fc3d'){
        result['zonghe'] = [
          zonghe,
        ];
      }else{
        result['zonghe'] = [
          zonghe,
          zonghe > 22 ? '大' : '小',
          zonghe % 2 == 0 ? '双' : '单'
        ];
        result['longhu'] = balls[0] >= balls[4] ? '龙' : '虎';
        result['longhu'] = balls[0] == balls[4] ? '和' : result['longhu'];
      }
      break;

    case 'cqklsf':
      result['zonghe'] = [
        zonghe,
        zonghe > 84 ? '大' : '小',
        zonghe % 2 == 0 ? '双' : '单',
        zonghe % 10 > 4 ? '尾大' : '尾小',
      ];
      if (codeClass == 'cqklsf') {
        result['zonghe'].push(balls[0] >= balls[7] ? '龙' : '虎');
      }
      break;
    case 'gd11x5':
      result['zonghe'] = [
        zonghe,
        zonghe > 30 ? '大' : zonghe == 30 ? '和' : '小',
        zonghe % 2 == 0 ? '双' : '单',
        zonghe % 10 > 4 ? '尾大' : '尾小',
      ];
      break;

    case 'jsk3':
    case 'bjk3':
    case 'shk3':
    case 'jlk3':
      result['zonghe'] = [
        zonghe,
        zonghe > 10 ? '大' : '小'
      ];
      break;


  }
  return result;
};

//COOKIE
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  let path = 'path=/';
  let name = c_name + "=" + escape(value);
  let time = (expiredays == null) ? "" : "expires=" + exdate.toGMTString();
  document.cookie = name + ';' + path + ';' + time;
};


export const sscLocationToPlayKey = function(arr) {
  arr = arr.sort((a, b) => {
          return a - b
        });
  let res = '';
  for(let i of arr){
    res = res + (parseInt(i)+1);
  }
  return parseInt(res);
}