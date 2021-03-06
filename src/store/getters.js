import { GAMES } from '@/config'
import { combination, sscLocationToPlayKey } from '@/methods'
export default {
  //彩种玩法
  codeAndPlay(state) {
    if (state.code && state.play) {
      if (state.code == 'xyhk6') {
        return 'hk6' + state.play;
      } else {
        return state.code + '' + state.play;
      }
    }
  },
  //取开奖信息
  openData(state) {
    if (state.openResult[state.code]) {
      return state.openResult[state.code];
    } else {
      return null;
    }
  },
  //获取最新开奖期号
  openDataPhase(state) {
    if (state.openResult[state.code] && state.openResult[state.code].openPhase) {
      return state.openResult[state.code].openPhase
    } else {
      return null;
    }
  },
  //取单彩种的玩法规则
  gameData(state) {
    if (state.gameDataStore[state.code] && state.gameDataStore[state.code][state.play]) {
      var data = state.gameDataStore[state.code][state.play];
      var res = {};
      switch (state.play) {
        case 'lma':
        case 'dma':
        case 'zix':
        case 'zxbz':
        case 'zxsan':
        case 'zxliu':
        case 'ezdw':
        case 'szdw':
          res = data[state.play];
          break;
        case 'hx':
          res.numbers = data[state.play].data;
          res.play = data[state.play].play;
          break;

        case 'tm':
          if (data) {
            var tab = state.hk6.hk6tm;
            res[tab] = data[tab];
            res['tml1'] = data.tml1;
          }
          break;

        case 'zmt':
          var data = data['zmt'];
          if (data) {
            var tab = state.hk6.hk6zmt;
            res = data[tab];
          }
          break;

        case 'ezhs':
          var data = data['ezhs'];
          if (data) {
            var tab = state.hk6.fc3dezhs;
            res = data[tab];
          }
          break;

        case 'lxlw':
          var data = data['lxlw'];
          var tab = state.hk6.hk6lxlw;
          res.numbers = data[tab].data;
          res.play = data[tab].play;
          break;

        default:
          for (var k in data) {
            if (data[k].data) {
              res[k] = data[k];
            } else {
              for (var i in data[k]) {
                res['b' + i] = data[k][i];
              }
            }
          }
          break;
      }
      return res;
    } else {
      return null;
    }
  },
  //根据checkedData生成的注单
  betOrders(state, getters) {
    var type = GAMES[state.code].count[state.play].t;
    var money = state.betMoney;
    var res = [];
    var data = _.values(state.checkedData);
    console.log(data)
    if (!data.length) {
      return [];
    }
    switch (type) {
      case 1:
      case 7:
        for (var k in data) {
          if (typeof data[k].money !== 'undefined') {
            data[k].money = data[k].money
          } else {
            data[k].money = money;
          }
          res.push(data[k]);
        }
        break;

      case 2:
        var play = data[0].play;
        var key = data[0].key;
        var nums = [];
        //生成纯号码的数组 下一步组合
        for (var i = 0; i < data.length; i++) {
          nums.push(data[i]['num']);
        }
        nums = nums.sort((a, b) => { return a - b });
        //排列组合方法
        var lmArr = combination(nums, play.min);
        //注单组成
        for (var i = 0; i < lmArr.length; i++) {
          var numStr = lmArr[i].join(','); //连码排序 用,组合
          var content = play.play + numStr;
          res.push({
            name: `${play.name} ${numStr}`,
            odds: play.odds,
            play: content,
            num: numStr,
            money: money,
            key: key
          });
        }
        break;

      case 3: //合肖自选不中
        if ((state.play == 'hx' && data.length < 2) || (state.play == 'zxbz' && data.length < 5)) {
          return [];
        }
        var hxPlayArr = getters.gameData.play;
        var play = state.play == 'hx' ? hxPlayArr[data.length - 2] : hxPlayArr[data.length - 5];
        var result = { num: '', content: '', money: money, play: '' };
        var numArr = [];
        var contentArr = [];
        for (var k of data) {
          if (state.play == 'hx') {
            numArr.push(k.cn);
            contentArr.push(k.desc);
          } else {
            numArr.push(k.num);
            contentArr.push(k.num);
          }
        }
        result = {
          num: numArr.join(','),
          name: play.name + '' + numArr.join(','),
          play: play.play + '' + contentArr.join(','),
          odds: play.odds,
          money: money,
          key: state.play
        };
        res.push(result);
        break;

      case 9: //组选
        if ((state.play == 'zxliu' && data.length < 4) || (state.play == 'zxsan' && data.length < 5)) {
          return [];
        }

        var hxPlayArr = getters.gameData.play;
        var play = state.play == 'zxliu' ? hxPlayArr[data.length - 4] : hxPlayArr[data.length - 5];
        if (play.name.indexOf('：') == -1) {
          play.name = play.name + "：";
        }

        var result = { num: '', content: '', money: money, play: '' };
        var numArr = [];
        var contentArr = [];
        for (var k of data) {
          numArr.push(k.num);
          contentArr.push(k.num);
        }
        result = {
          num: numArr.join(','),
          name: play.name + '' + numArr.join(','),
          play: play.play + '' + contentArr.join(','),
          odds: play.odds,
          money: money,
          key: state.play
        };
        res.push(result);
        break;

      case 4: //连肖连尾
        var playArr = getters.gameData.play;
        if (!playArr.length) { return []; }
        var nums = [];
        //排列组合方法
        var lmArr = combination(data, playArr[0].min);
        var lmItemArr = [];
        for (var i = 0; i < lmArr.length; i++) {
          lmItemArr.push({ cn: [], desc: [] });
          for (var j = 0; j < lmArr[i].length; j++) {
            lmItemArr[i].cn.push(lmArr[i][j].cn);
            lmItemArr[i].desc.push(lmArr[i][j].desc);
          }
        }
        for (var i = 0; i < lmItemArr.length; i++) {
          // 选中的号码中有当年生肖
          if (lmItemArr[i].desc.indexOf('PIG') >= 0 || lmItemArr[i].desc.indexOf(0) >= 0) {
            lmItemArr[i].play = playArr[0];
            // 选中的号码中无当年生肖
          } else {
            lmItemArr[i].play = playArr[1];
          }
        }
        // 注单组成
        for (var i = 0; i < lmItemArr.length; i++) {
          var play = lmItemArr[i].play;
          var numStr = lmItemArr[i].cn.join(','); //连码排序 用,组合
          var content = play.play + lmItemArr[i].desc.join(',');
          if (play.desc.indexOf('尾') >= 0) { //连尾注单显示内容拼接
            var lmItemNum = lmItemArr[i].desc;
            var lmItemSortNum = lmItemNum.sort((a, b) => { return a - b });
            var numStrArr = lmItemSortNum.map((item) => {
              return item + '尾';
            });
            numStr = numStrArr.join(',');
            content = play.play + lmItemSortNum.join(',');
          }
          res.push({
            name: `${play.name} ${numStr}`,
            odds: play.odds,
            play: content,
            num: numStr,
            money: money,
            key: state.play
          });
        }
        break;

      case 5: //直选
      case 8: //定位胆
        var play = data[0].play;
        var num = data[0].num;
        for (var i = 0; i < num.length; i++) {
          var content = play.play + num[i];
          res.push({
            name: `${play.name} ${num[i]}`,
            odds: play.odds,
            play: content,
            num: num[i],
            money: money,
            key: state.play
          });
        }
        break;

      case 6: //单码
        var play = data[0].play;
        var num = data[0].num;
        var content = play.play + num;
        res[0] = {
          name: `${play.name} ${num}`,
          odds: play.odds,
          play: content,
          num: num,
          money: money,
          key: state.play
        };
        break;
      case 10: //时时彩传统玩法一帆风顺 好事成双 三星报喜 四季发财  
        var play = data[0].play;
        var name = data[0].name;
        var odds = data[0].odds;
        var num = data[0].desc.split(',');
        for (var i = 0; i < num.length; i++) {
          var content = play + num[i];
          res.push({
            name: `${name} ${num[i]}`,
            odds: odds,
            play: content,
            num: num[i],
            money: money,
            key: state.play
          });
        }
        break;

      case 11: //二码定位  
        var nums = data[0].num;
        var play = data[0].play;
        var locationArr = [];
        for (var i = 0; i < nums.length; i++) {
          if (nums[i].length <= 0) continue;
          for (var j = 0; j < i; j++) {
            if (nums[j].length <= 0) continue;
            locationArr.push([j, i]);
          }
        }

        for (var i of locationArr) {
          let arr1 = nums[i[0]];
          let arr2 = nums[i[1]];
          for (var j = 0; j < arr1.length; j++) {
            for (var k = 0; k < arr2.length; k++) {
              var p = play[sscLocationToPlayKey(i)]; // 当前定位的play对象
              var n = ([arr1[j], arr2[k]].sort((a, b) => {
                return a - b
              })).join(',');
              res.push({
                name: p.name + n,
                odds: p.odds,
                play: p.play + n,
                num: n,
                money: money,
                content: p.play + n,
              });
            }
          }
        }
        break;

      case 12:
        var play = data[0].play;
        var key = data[0].key;
        var odds = data[0].odds;
        var name = data[0].name;
        var nums = data[0].desc.split(',');
        var min = data[0].min;
        nums = nums.sort((a, b) => { return a - b });
        //排列组合方法
        var lmArr = combination(nums, min);
        //注单组成
        for (var i = 0; i < lmArr.length; i++) {
          var numStr = lmArr[i].join(','); //连码排序 用,组合
          var content = play + numStr;
          res.push({
            name: `${name} ${numStr}`,
            odds: odds,
            play: content,
            num: numStr,
            money: money,
            key: key
          });
        }
        break;

      case 14: // 三码定位
      var nums = data[0].num;
      var play = data[0].play;
      var locationArr = [];
      for (var i = 0; i < nums.length; i++) {
        if (nums[i].length <= 0) continue;
        for (var j = 0; j < i; j++) {
          if (nums[j].length <= 0) continue;
          for (var k = 0; k < j; k++) {
            if (nums[k].length <= 0) continue;
            for (var m = 0; m < k; m++) {
              locationArr.push([m, k, j, i]);
            }

          }
        }
      }

      for (var i of locationArr) {
        let arr1 = nums[i[0]];
        let arr2 = nums[i[1]];
        let arr3 = nums[i[2]];
        let arr4 = nums[i[3]];
        for (var j = 0; j < arr1.length; j++) {
          for (var k = 0; k < arr2.length; k++) {
            for (var m = 0; m < arr3.length; m++) {
              for (var x = 0; x < arr4.length; x++) {
                var p = play[sscLocationToPlayKey(i)]; // 当前定位的play对象
                var n = ([arr1[j], arr2[k], arr3[m], arr4[x]].sort((a, b) => {
                  return a - b
                })).join(',');
                res.push({
                  name: p.name + n,
                  odds: p.odds,
                  play: p.play + n,
                  num: n,
                  money: money,
                  content: p.play + n,
                });
              }
            }
          }
        }
      }
    }

    return res;
  },
  //距离下期时间
  openTime(state) {
    if (state.openResult[state.code]) {
      return state.openResult[state.code].openTime;
    } else {
      return 0;
    }
  },
  //距离封盘时间
  closeTime(state) {
    if (state.openResult[state.code]) {
      return state.openResult[state.code].sealTime;
    } else {
      return 0;
    }
  },
  stateUsername(state) {
    return state.user.username;
  },
  // 平台基础参数信息
  baseInfo(state) {
    return state.baseInfo;
  },
  // 彩种分类
  classification(state) {
    return state.classification;
  },
  // 利息宝
  lxbDatas(state) {
    return state.lxbDatas;
  },
  // 红包游戏基础数据
  redPackGameBaseInfo(state) {
    return state.redPackGameBaseInfo;
  },
  // 红包websocket cilentid
  redPackGameClientId(state) {
    return state.redPackGameClientId;
  },
  // 游戏规则
  redPackGameRule(state) {
    return state.redPackGameRule;
  },
  // 保存登录信息
  sign_data(state) {
    return state.sign_data;
  },
  chearRedPackMsgArr(state) {
    return state.chearRedPackMsgArr;
  },
  // redPackageHomeMsg(state) {
  //   return state.redPackageHomeMsg;
  // }
};
