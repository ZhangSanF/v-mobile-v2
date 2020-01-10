import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Home from '@/components/Home'
import Main from '@/components/Main'
import Games from '@/components/Games'
import Account from '@/components/Account'
import Ucenter from '@/components/Ucenter'
import Service from '@/components/Service'
import Chat from '@/components/Chat'
import LuckDraw from '@/components/luckDraw'
import Preferential from '@/components/Preferential'
import PreferentialDetails from '@/components/PreferentialDetails'
import Feedback from '@/components/Feedback'
import Callback from '@/components/Callback'


import Lottery from '@/components/lottery/Lottery'
import Game from '../components/lottery/Game'

import BetNormal from '../components/lottery/types/BetNormal'; //普通玩法
import BetKuaijie from '../components/lottery/types/BetKuaijie'; //快捷玩法
const BetLianma = () => import('../components/lottery/types/BetLianma'); //连码
const BetDanma = () => import('../components/lottery/types/BetDanma'); //单码
const NBet = () => import('../components/lottery/types/Pk10nn'); //牛牛
const BetZhix = () => import('../components/lottery/types/BetZhix'); //直选
const BetDwd = () => import('../components/lottery/types/BetDwd'); //定位胆
const BetCTSSC = () => import('../components/lottery/types/BetCTSSC'); //传统时时彩玩法
const BetCTSSCDW = () => import('../components/lottery/types/BetCTSSCDW'); //传统时时彩玩法定位胆



import Login from '../components/user/Login'
import Reg from '../components/user/Reg'

import { PlayType } from '../config'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home/main',
      meta: {
        index: 1.1
      }
    },
    {
      path: '/preferential',
      name: 'Preferential',
      component: Preferential,
      meta: {
        index: 2
      }
    },
    {
      path: '/PreferentialDetails',
      name: 'PreferentialDetails',
      component: PreferentialDetails,
      meta: {
        index: 2
      }
    },
    
    {
      path: '/SignIn',
      name: 'SignIn',
      component: () => import('../components/SignIn'),
      meta: {
        index: 2
      }
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {
        index: 2
      }
    },
    {
      path: '/Callback',
      name: 'Callback',
      component: Callback,
      meta: {
        index: 2
      }
    },
    {
      path: '/luckDraw',
      name: 'luckDraw',
      component: LuckDraw
    },
    {
      path: '/preferential',
      name: 'Preferential',
      component: Preferential,
      meta: {
        index: 3
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'main',
          name: 'Main',
          component: Main,
          meta: {
            index: 1.1
          }
        },
        {
          path: 'games',
          name: 'Games',
          component: Games,
          meta: {
            index: 1.2
          }
        },
        // {
        //   path: 'account',
        //   name: 'Account',
        //   component: Account,
        //   meta: {
        //     index: 1.5
        //   }
        // },
        {
          path: 'service',
          name: 'Service',
          component: Service,
          meta: {
            index: 1.4
          }
        },
        {
          path: 'ucenter',
          name: 'Ucenter',
          component: Ucenter,
          meta: {
            index: 1.5
          }
        },
        {
          path: 'chat',
          name: 'Chat',
          component: Chat,
          meta: {
            index: 1.3
          }
        },
      ]
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: Lottery,
      children: [{ // 投注页
        path: "bjpk10",
        alias: ["hlsc", "azxy10"],
        component: Game,
        children: [
          {
            path: PlayType.BetNormal, component: BetNormal, meta: {
              index: 2
            }
          },
          {
            path: PlayType.BetKuaijie, component: BetKuaijie, meta: {
              index: 2
            }
          }
        ]
      },
      { // 投注页
        path: "pk10nn",
        component: Game,
        children: [
          {
            path: PlayType.NBet, component: NBet, meta: {
              index: 2
            }
          },
        ]
      },
      { // 投注页
        path: "jsnn",
        component: Game,
        children: [
          { path: PlayType.NBet, component: NBet, meta: {
            index: 2
          } },
        ]
      },
      {
        path: "jssc",
        alias: ["azxy5"],
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } },
          { path: PlayType.BetKuaijie, component: BetKuaijie, meta: {
            index: 2
          } }
        ]
      }, {
        path: "mlaft",
        alias: ["hlft"],
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } },
          { path: PlayType.BetKuaijie, component: BetKuaijie, meta: {
            index: 2
          } }
        ]
      }, {
        path: "jsft",
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } },
          { path: PlayType.BetKuaijie, component: BetKuaijie, meta: {
            index: 2
          } }
        ]
      }, {
        path: "cqssc",
        alias: ['xjssc', 'tjssc', 'pl3', 'fc3d'],
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } },
          { path: PlayType.BetKuaijie, component: BetKuaijie , meta: {
            index: 2
          }},
          { path: PlayType.BetDanma, component: BetDanma , meta: {
            index: 2
          }},
          { path: PlayType.BetLianma, component: BetLianma, meta: {
            index: 2
          } },
          { path: PlayType.BetDwd, component: BetDwd, meta: {
            index: 2
          } },
          { path: PlayType.BetDwd, component: BetDwd, meta: {
            index: 2
          } },
          { path: PlayType.BetCTSSC, component: BetCTSSC, meta: {
            index: 2
          } },
          { path: PlayType.BetCTSSCDW, component: BetCTSSCDW, meta: {
            index: 2
          } },
          
        ]
      }, {
        path: "jsssc",
        alias: ["txffc", "hlssc"],
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } },
          { path: PlayType.BetKuaijie, component: BetKuaijie, meta: {
            index: 2
          } },
          { path: PlayType.BetCTSSC, component: BetCTSSC, meta: {
            index: 2
          } },
          { path: PlayType.BetCTSSCDW, component: BetCTSSCDW, meta: {
            index: 2
          } },
        ]
      }, {
        path: "pcdd",
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } },
        ]
      }, {
        path: "cqklsf",
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } },
          { path: PlayType.BetKuaijie, component: BetKuaijie, meta: {
            index: 2
          } },
          { path: PlayType.BetLianma, component: BetLianma, meta: {
            index: 2
          } }
        ]
      }, {
        path: "bjkl8",
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } }
        ]
      }, {
        path: "gd11x5",
        alias: ['sd11x5', 'jx11x5'],
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal, meta: {
            index: 2
          } },
          { path: PlayType.BetKuaijie, component: BetKuaijie, meta: {
            index: 2
          } },
          { path: PlayType.BetLianma, component: BetLianma, meta: {
            index: 2
          } },
          { path: PlayType.BetZhix, component: BetZhix , meta: {
            index: 2
          }}
        ]
      }, {
        path: "jsk3",
        alias: ['bjk3', 'shk3', 'jlk3', 'mjsk3', 'hubk3', 'gxk3', 'ahk3', 'hebk3', 'gsk3', 'gzk3', 'hlk3'],
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal,meta: {
            index: 2
          } }
        ]
      }, {
        path: "gdklsf",
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal,meta: {
            index: 2
          } },
          { path: PlayType.BetKuaijie, component: BetKuaijie,meta: {
            index: 2
          } },
          { path: PlayType.BetLianma, component: BetLianma,meta: {
            index: 2
          } }
        ]
      }, {
        path: "hk6",
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal,meta: {
            index: 2
          } },
          { path: PlayType.BetLianma, component: BetLianma,meta: {
            index: 2
          } },
        ]
      }, {
        path: "xyhk6",
        component: Game,
        children: [
          { path: PlayType.BetNormal, component: BetNormal,meta: {
            index: 2
          } },
          { path: PlayType.BetLianma, component: BetLianma,meta: {
            index: 2
          } },
        ]
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,meta: {
        index: 2
      }
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,meta: {
        index: 2
      }
    },
    {
      path: '/money',
      name: 'Money',
      component: () => import('../components/money/Money'),
      children: [
        {
          path: 'pay',
          name: 'Pay',
          component: () => import('../components/money/Pay'),meta: {
            index: 5
          }
        },
        {
          path: 'MoneyCenter',
          name: 'MoneyCenter',
          component: () => import('../components/money/MoneyCenter'),meta: {
            index: 2
          }
        },
        {
          path: 'lxbTransfer',
          name: 'lxbTransfer',
          component: () => import('../components/money/lxbTransfer'),meta: {
            index: 2
          }
        },
        {
          path: 'lxbDetailData',
          name: 'lxbDetailData',
          component: () => import('../components/money/lxbDetailData'),meta: {
            index: 2
          }
        },
        {
          path: 'autopay',
          name: 'AutoPay',
          component: () => import('../components/money/AutoPay'),meta: {
            index: 6
          }
        },
        {
          path: 'scanpay',
          name: 'ScanPay',
          component: () => import('../components/money/ScanPay'),meta: {
            index: 6
          }
        },
        {
          path: 'scanpage',
          name: 'ScanPage',
          component: () => import('../components/money/ScanPage'),meta: {
            index: 7
          }
        },
        {
          path: 'bankcard',
          name: 'BankCard',
          component: () => import('../components/money/BankCard'),meta: {
            index: 6
          }
        },
        {
          path: 'addcard',
          name: 'AddCard',
          component: () => import('../components/money/AddCard'),meta: {
            index: 2
          }
        },
        {
          path: 'draw',
          name: 'Draw',
          component: () => import('../components/money/Draw'),meta: {
            index: 2
          }
        },
        {
          path: 'card',
          name: 'Card',
          component: () => import('../components/money/Card'),meta: {
            index: 2
          }
        },
        {
          path: 'bills',
          name: 'Bills',
          component: () => import('../components/money/Bills'),meta: {
            index: 2
          }
        },
        {
          path: 'qipaiMoney',
          name: 'qipaiMoney',
          component: () => import('../components/money/qipaiMoney'),meta: {
            index: 2
          }
        }
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../components/user/User'),
      children: [
        {
          path: 'Plan',
          name: 'Plan',
          component: () => import('../components/user/PlanPage'),meta: {
            index: 2
          }
        },
        {
          path: 'planInfo',
          name: 'planInfo',
          component: () => import('../components/user/planInfo'),meta: {
            index: 3
          }
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('../components/user/Setting'),
          meta: {
            index: 2
          }
        },
        {
          path: 'SetNickname',
          name: 'SetNickname',
          component: () => import('../components/user/SetNickname'),
          meta: {
            index: 3
          }
        },
        {
          path: 'password',
          name: 'Password',
          component: () => import('../components/user/Password'),meta: {
            index: 3
          }
        },
        {
          path: 'info',
          name: 'Info',
          component: () => import('../components/user/Info'),
          meta: {
            index: 2
          }
        },
        {
          path: 'message',
          name: 'Message',
          component: () => import('../components/user/Message'),
          meta: {
            index: 2
          }
        },
        {
          path: 'reportdate',
          name: 'ReportDate',
          component: () => import('../components/user/ReportDate'),
          meta: {
            index: 2.1
          }
        },
        {
          path: 'reportcode',
          name: 'ReportCode',
          component: () => import('../components/user/ReportCode'),
          meta: {
            index: 3
          }
        },
        {
          path: 'reportdetail',
          name: 'ReportDetail',
          component: () => import('../components/user/ReportDetail'),
          meta: {
            index: 4
          }
        },
      ],
    },
    {
      path: '/data',
      name: 'Data',
      component: () => import('../components/data/Data'),
      meta: {
        index: 2.1
      },
      children: [
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('../components/data/orders'),
          meta: {
            index: 2.2
          }
        },
        {
          path: 'changlong',
          name: 'ChangLong',
          component: () => import('../components/data/DraDew'),
          meta: {
            index: 2.2
          }
        },
      ]
    },
    {
      path: '/qipai',
      name: 'Qipai',
      component: () => import('../components/Qipai'),
      meta: {
        index: 2
      }
    },
    {
      path: '/redPack',
      name: 'RedPack',
      component: () => import('../components/RedPack'),
      children: [
        {
          path: 'redpackgame',
          name: 'RedPackGame',
          component: () => import('../components/redPackGame/RedPackGame'),
          meta: {
            index: 2
          }
        },
        {
          path: 'gameGroup/:type',
          name: 'GameGroup',
          component: () => import('../components/redPackGame/GameGroup'),
          meta: {
            index: 3
          },
          props: true
        },
        {
          path: 'chartRoom/:roomId',
          name: 'ChartRoom',
          component: () => import('../components/redPackGame/ChartRoom'),
          meta: {
            index: 4
          },
          props: true
        },
        {
          path: 'gameRule',
          name: 'GameRule',
          component: () => import('../components/redPackGame/GameRule'),
          meta: {
            index: 5
          },
        },
        {
          path: 'ruleInfo/:id',
          name: 'RuleInfo',
          component: () => import('../components/redPackGame/ruleInfo'),
          meta: {
            index: 6
          },
        },
        {
          path: 'groupInfo/:id',
          name: 'GroupInfo',
          component: () => import('../components/redPackGame/GroupInfo'),
          meta: {
            index: 5
          },
          props: true
        },
        {
          path: 'groupMemberList/:id',
          name: 'GroupMemberList',
          component: () => import('../components/redPackGame/GroupMemberList'),
          meta: {
            index: 6
          },
        },
        // {
        //   path: 'sendRedPack/:id',
        //   name: 'SendRedPack',
        //   component: () => import('../components/redPackGame/SendRedPack'),
        //   props: true
        // },
        {
          path: 'historyTable/:gameType',
          name: 'HistoryTable',
          component: () => import('../components/redPackGame/HistoryTable'),
          meta: {
            index: 5
          },
          props: true
        },
      ]
    },

  ]
});

vueRouter.beforeEach((to, from, next) => {
  const user = store.state.user;
  if (to.path.indexOf('/home/') < 0 && to.name !== 'Login' && to.name !== 'Reg') {
    if (!user.username) {
      vueRouter.push('/login');
    }
    //非正式用户进入 money user的子页面 自动跳转登录页
    // if(user.usertype != 1 && (to.path.indexOf('/user/') >= 0 || to.path.indexOf('/money/') >= 0)){
    //   vueRouter.push('/login');
    // }
  }
  next();
});




export default vueRouter;
