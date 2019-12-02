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

import BetNormal from'../components/lottery/types/BetNormal'; //普通玩法
import BetKuaijie from'../components/lottery/types/BetKuaijie'; //快捷玩法
const BetLianma = () => import('../components/lottery/types/BetLianma'); //连码
const BetDanma = () => import('../components/lottery/types/BetDanma'); //单码
const NBet = () => import('../components/lottery/types/Pk10nn'); //牛牛
const BetZhix = () => import('../components/lottery/types/BetZhix'); //直选
const BetDwd = () => import('../components/lottery/types/BetDwd'); //定位胆


import Login from '../components/user/Login'
import Reg from '../components/user/Reg'

import {PlayType} from '../config'

Vue.use(Router)

 const vueRouter = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home/main'
    },
    {
      path: '/preferential',
      name: 'Preferential',
      component: Preferential
    },
    {
      path: '/PreferentialDetails',
      name: 'PreferentialDetails',
      component: PreferentialDetails
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/Callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/luckDraw',
      name: 'luckDraw',
      component: LuckDraw
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
        },
        {
          path: 'games',
          name: 'Games',
          component: Games
        },
        {
          path: 'account',
          name: 'Account',
          component: Account
        },
        {
          path: 'service',
          name: 'Service',
          component: Service
        },      
        {
          path: 'ucenter',
          name: 'Ucenter',
          component: Ucenter
        },
        {
          path: 'chat',
          name: 'Chat',
          component: Chat
        },
      ]
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: Lottery,
      children: [{ // 投注页
        path: "bjpk10",
        alias:["hlsc","azxy10"],
        component: Game,
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie}
        ]
      },
      { // 投注页
        path: "pk10nn",
        component: Game,
        children: [
          {path: PlayType.NBet,component: NBet}, 
        ]
      },
      { // 投注页
        path: "jsnn",
        component: Game,
        children: [
          {path: PlayType.NBet,component: NBet}, 
        ]
      },
      {
        path: "jssc",
        alias:["azxy5"],
        component: Game,
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie}
        ]
      }, {
        path: "mlaft",
        alias:["hlft"],
        component: Game,
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie}
        ]
      }, {
        path: "jsft",
        component: Game,
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie}
        ]
      }, {
        path: "cqssc",
        alias:['xjssc','tjssc','pl3','fc3d'],
        component: Game,
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie},
          {path: PlayType.BetDanma,component: BetDanma}, 
          {path: PlayType.BetLianma,component: BetLianma}, 
          {path: PlayType.BetDwd,component: BetDwd}, 
          {path: PlayType.BetDwd,component: BetDwd}, 
        ]
      }, {
        path: "jsssc",
        alias:["txffc","hlssc"],
        component: Game,        
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie}
        ]
      }, {
        path: "pcdd",
        component: Game,        
        children: [
          {path: PlayType.BetNormal,component: BetNormal}, 
        ]
      }, {
        path: "cqklsf",
        component: Game,      
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie},
          {path: PlayType.BetLianma,component: BetLianma}
        ]
      }, {
        path: "bjkl8",
        component: Game,      
        children: [
          {path: PlayType.BetNormal,component: BetNormal}
        ]
      }, {
        path: "gd11x5",
        alias:['sd11x5','jx11x5'],
        component: Game,      
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie},
          {path: PlayType.BetLianma,component: BetLianma}, 
          {path: PlayType.BetZhix,component: BetZhix}
        ]
      }, {
        path: "jsk3",
        alias:['bjk3','shk3','jlk3','mjsk3','hubk3','gxk3','ahk3','hebk3','gsk3','gzk3', 'hlk3'],
        component: Game,      
        children: [
          {path: PlayType.BetNormal,component: BetNormal}
        ]
      }, {
        path: "gdklsf",
        component: Game,      
        children: [
          {path: PlayType.BetNormal,component: BetNormal},
          {path: PlayType.BetKuaijie,component: BetKuaijie},
          {path: PlayType.BetLianma,component: BetLianma}
        ]
      }, {
        path: "hk6",
        component: Game,      
        children: [
          {path: PlayType.BetNormal,component: BetNormal}, 
          {path: PlayType.BetLianma,component: BetLianma}, 
        ]
      }, {
        path: "xyhk6",
        component: Game,      
        children: [
          {path: PlayType.BetNormal,component: BetNormal}, 
          {path: PlayType.BetLianma,component: BetLianma}, 
        ]
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/money',
      name: 'Money',
      component: () => import('../components/money/Money'),
      children: [
        {
          path: 'pay',
          name: 'Pay',
          component: () => import('../components/money/Pay')
        },
        {
          path: 'MoneyCenter',
          name: 'MoneyCenter',
          component: () => import('../components/money/MoneyCenter')
        },
        {
          path: 'lxbTransfer',
          name: 'lxbTransfer',
          component: () => import('../components/money/lxbTransfer')
        },
        {
          path: 'lxbDetailData',
          name: 'lxbDetailData',
          component: () => import('../components/money/lxbDetailData')
        },
        {
          path: 'autopay',
          name: 'AutoPay',
          component: () => import('../components/money/AutoPay')
        },
        {
          path: 'scanpay',
          name: 'ScanPay',
          component: () => import('../components/money/ScanPay')
        },
        {
          path: 'scanpage',
          name: 'ScanPage',
          component: () => import('../components/money/ScanPage')
        },
        {
          path: 'bankcard',
          name: 'BankCard',
          component: () => import('../components/money/BankCard')
        },
        {
          path: 'addcard',
          name: 'AddCard',
          component: () => import('../components/money/AddCard')
        },
        {
          path: 'draw',
          name: 'Draw',
          component: () => import('../components/money/Draw')
        },
        {
          path: 'card',
          name: 'Card',
          component: () => import('../components/money/Card')
        },
        {
          path: 'bills',
          name: 'Bills',
          component: () => import('../components/money/Bills')
        },
        {
          path: 'qipaiMoney',
          name: 'qipaiMoney',
          component: () => import('../components/money/qipaiMoney')
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
          component: () => import('../components/user/PlanPage'),
        },
        {
          path: 'planInfo',
          name: 'planInfo',
          component: () => import('../components/user/planInfo'),
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('../components/user/Setting'),
        },
        {
          path: 'password',
          name: 'Password',
          component: () => import('../components/user/Password'),
        },
        {
          path: 'info',
          name: 'Info',
          component: () => import('../components/user/Info'),
        },
        {
          path: 'message',
          name: 'Message',
          component: () => import('../components/user/Message'),
        },
        {
          path: 'reportdate',
          name: 'ReportDate',
          component: () => import('../components/user/ReportDate'),
        },
        {
          path: 'reportcode',
          name: 'ReportCode',
          component: () => import('../components/user/ReportCode'),
        },
        {
          path: 'reportdetail',
          name: 'ReportDetail',
          component: () => import('../components/user/ReportDetail'),
        },
      ],
    },
    {
      path: '/data',
      name: 'Data',
      component: () => import('../components/data/Data'),
      children: [
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('../components/data/orders'),
        },
        {
          path: 'changlong',
          name: 'ChangLong',
          component: () => import('../components/data/DraDew'),
        },
        {
          path: 'luzhu',
          name: 'LuZhu',
          component: () => import('../components/data/LuZhu'),
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('../components/data/History'),
        },
        {
          path: 'rules',
          name: 'Rules',
          component: () => import('../components/data/Rules'),
        },
        
      ]
    },
    {
      path: '/qipai',
      name: 'Qipai',
      component: () => import('../components/Qipai'),
    }
  ]
});

vueRouter.beforeEach((to, from, next) => {
  const user = store.state.user;
  if(to.path.indexOf('/home/') < 0 && to.name !== 'Login' && to.name !== 'Reg'){
    if(!user.username){
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
