

// 同类型玩法

const commonPlay = {
	// 北京pk10类型
	bjpk10: function (name) {
		return {
			name: name,
			class: 'bjpk10', //彩种分类
			play: ['lm', 'quick', 'n10', 'he'],
			count: {
				lm: { name: '两面', t: 1, lt: PlayType.BetNormal },
        quick: { name: '快捷', t: 1, lt: PlayType.BetKuaijie },
				n10: { name: '单号1-10', t: 1, lt: PlayType.BetNormal },
				he: { name: '冠亚军组合', t: 1, lt: PlayType.BetNormal }

			},
		}
	},

	// 重庆时时彩
	cqssc: function (name, isMorePlay = true, code) {
		return {
			name: name,
			class: 'cqssc',
			play: function (isMorePlay, code) {
				let curPlay = ['ent', 'quick', 'b1', 'b2', 'b3', 'b4', 'b5'];
				if (isMorePlay) {
					curPlay.push('dma');
					curPlay.push('lma');
				}
				if (code == 'cqssc' || code == 'jsssc') {
					curPlay.push('dn');
				}
				return curPlay;
			}(isMorePlay, code),
			count: function (isMorePlay, code) {
				let curCount = {};
				curCount = {
					ent: { name: '整合', t: 1, lt: PlayType.BetNormal },
          quick: { name: '快捷', t: 1, lt: PlayType.BetKuaijie },
					b1: { name: '第一球', t: 1, lt: PlayType.BetNormal },
					b2: { name: '第二球', t: 1, lt: PlayType.BetNormal },
					b3: { name: '第三球', t: 1, lt: PlayType.BetNormal },
					b4: { name: '第四球', t: 1, lt: PlayType.BetNormal },
					b5: { name: '第五球', t: 1, lt: PlayType.BetNormal },					
				};
				if (isMorePlay) {
					curCount['dma'] = { name: '单码', t: 6, lt: PlayType.BetDanma };
					curCount['lma'] = { name: '连码', t: 2, lt: PlayType.BetLianma };
				}
				if (code == 'cqssc' || code == 'jsssc' || code =='hlssc') {
					curCount['dn'] = { name: '斗牛', t: 1, lt: PlayType.BetNormal }
				}
				return curCount;
			}(isMorePlay, code)
		}
	},


	// 福彩3D
	fc3d: function (name) {
		return {
			name: name,
			class: 'cqssc',
			play: ['zhu','yzzh','ezzh','szzh','yzdw','ezdw','szdw','ezhs','szhs','zxsan','zxliu','kuadu'],
			count: {
				zhu: { name: '主势盘', t: 1, lt: PlayType.BetNormal },
				yzzh: { name: '一字组合', t: 1, lt: PlayType.BetNormal },
				ezzh: { name: '二字组合', t: 1, lt: PlayType.BetNormal },
				szzh: { name: '三字组合', t: 1, lt: PlayType.BetNormal },
				yzdw: { name: '一字定位', t: 1, lt: PlayType.BetNormal },
				ezdw: { name: '二字定位', t: 8, lt: PlayType.BetDwd },
				szdw: { name: '三字定位', t: 8, lt: PlayType.BetDwd },
				ezhs: { name: '二字和数', t: 1, lt: PlayType.BetNormal },
				szhs: { name: '三字和数', t: 1, lt: PlayType.BetNormal },
				zxsan: { name: '组选三', t: 9, lt: PlayType.BetLianma },
				zxliu: { name: '组选六', t: 9, lt: PlayType.BetLianma },
				kuadu: { name: '跨度', t: 1, lt: PlayType.BetNormal },
			},
		}
	},

	// pk10牛牛
	pk10nn: function (name) {
		return {
			name: name,
			class: 'pk10nn', //彩种分类
			play: ['nn'],
			count: {
				nn: { name: '牛牛', t: 7, lt: PlayType.NBet },
			},
		}
	},

	// pc蛋蛋
	pcdd: function (name) {
		return {
			name: name,
			class: 'pcdd',
			play: ['pcdd'],
			count: {
				pcdd: { name: 'PC蛋蛋', t: 1, lt: PlayType.BetNormal }
			}
		}
	},

	// 重庆快乐十分
	cqklsf: function (name) {
		return {
			name: name,
			class: 'cqklsf',
			play: ['lm', 'quick', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'zma', 'lma'],
			count: {
				lm: { name: '两面', t: 1, lt: PlayType.BetNormal },
        quick: { name: '快捷', t: 1, lt: PlayType.BetKuaijie },
				b1t8: { name: '1-8球', t: 1, lt: PlayType.BetNormal },
				b1: { name: '第一球', t: 1, lt: PlayType.BetNormal },
				b2: { name: '第二球', t: 1, lt: PlayType.BetNormal },
				b3: { name: '第三球', t: 1, lt: PlayType.BetNormal },
				b4: { name: '第四球', t: 1, lt: PlayType.BetNormal },
				b5: { name: '第五球', t: 1, lt: PlayType.BetNormal },
				b6: { name: '第六求', t: 1, lt: PlayType.BetNormal },
				b7: { name: '第七球', t: 1, lt: PlayType.BetNormal },
				b8: { name: '第八球', t: 1, lt: PlayType.BetNormal },
				zma: { name: '正码', t: 1, lt: PlayType.BetNormal },
				lma: { name: '连码', t: 2, lt: PlayType.BetLianma }
			}
		}
	},

	// 北京快乐8
	bjkl8: function (name) {
		return {
			name: name,
			class: 'bjkl8',
			play: ['sbw', 'zma'],
			count: {
				sbw: { name: '总和、比数、五行', t: 1, lt: PlayType.BetNormal },
				zma: { name: '正码', t: 1, lt: PlayType.BetNormal },
			}
		}
	},

	// 广东11选5
	gd11x5: function (name) {
		return {
			name: name,
			class: 'gd11x5',
			play: ['lm', 'quick', 'dh', 'zix', 'lma'],
			count: {
				lm: { name: '两面', t: 1, lt: PlayType.BetNormal },
        quick: { name: '快捷', t: 1, lt: PlayType.BetKuaijie },
				dh: { name: '单号', t: 1, lt: PlayType.BetNormal },
				lma: { name: '连码', t: 2, lt: PlayType.BetLianma },
				zix: { name: '直选', t: 5, lt: PlayType.BetZhix }
			}
		}
	},

	// 江苏快3
	jsk3: function (name, code) {
		return {
			name: name,
			class: 'jsk3',
			play: [code, 'sum', 'slh', 'sth', 'eth', 'kd', 'pd', 'bc', 'hc'],
			count: function (code) {
				let curCount = {};
				curCount[code] = { name: '整合', t: 1, lt: PlayType.BetNormal };
				curCount['sum'] = { name: '和值', t: 1, lt: PlayType.BetNormal };
				curCount['slh'] = { name: '三连号', t: 1, lt: PlayType.BetNormal };
				curCount['sth'] = { name: '三同号', t: 1, lt: PlayType.BetNormal };
				curCount['eth'] = { name: '二同号', t: 1, lt: PlayType.BetNormal };
				curCount['kd'] = { name: '跨度', t: 1, lt: PlayType.BetNormal };
				curCount['pd'] = { name: '牌点', t: 1, lt: PlayType.BetNormal };
				curCount['bc'] = { name: '不出号码', t: 1, lt: PlayType.BetNormal };
				curCount['hc'] = { name: '必出号码', t: 1, lt: PlayType.BetNormal };
				return curCount
			}(code)
		}
	},

	// 香港六合彩
	hk6: function (name) {
		return {
			name: name,
			class: 'hk6',
			play: ['tm', 'lm', 'zm', 'zmt', 'zm16', 'zt', 'lma', 'sb', 'sb7', 'tws', 'zox', 'yx', 'tx', 'lxlw', 'hx', 'zx', 'wx', 'zxbz'],
			count: {
				tm: { name: '特码', t: 1, lt: PlayType.BetNormal },
				lm: { name: '两面', t: 1, lt: PlayType.BetNormal },
				zm: { name: '正码', t: 1, lt: PlayType.BetNormal },
				zmt: { name: '正码特', t: 1, lt: PlayType.BetNormal },
				zm16: { name: '正码1-6', t: 1, lt: PlayType.BetNormal },
				lma: { name: '连码', t: 2, lt: PlayType.BetLianma },
				sb: { name: '色波', t: 1, lt: PlayType.BetNormal },
				sb7: { name: '7色波', t: 1, lt: PlayType.BetNormal },
				tws: { name: '头尾数', t: 1, lt: PlayType.BetNormal },
				zox: { name: '总肖', t: 1, lt: PlayType.BetNormal },
				yx: { name: '平特一肖尾数', t: 7, lt: PlayType.BetNormal },
				tx: { name: '特肖', t: 1, lt: PlayType.BetNormal },
				lxlw: { name: '连肖连尾', t: 4, lt: PlayType.BetLianma },
				hx: { name: '合肖', t: 3, lt: PlayType.BetLianma },
				zx: { name: '正肖', t: 1, lt: PlayType.BetNormal },
				wx: { name: '五行', t: 1, lt: PlayType.BetNormal },
				zxbz: { name: '自选不中', t: 3, lt: PlayType.BetLianma }
			}
		}
	}


}

// 彩种玩法对应组件
export const PlayType = {
	BetNormal: 'BetNormal',
	BetKuaijie: 'BetKuaijie',
	NBet: 'NBet',
	BetDanma: 'BetDanma',
	BetLianma: 'BetLianma',
	BetZhix: 'BetZhix',
	BJLBet: 'BJLBet',
	BetDwd:'BetDwd',
}

//六合彩类彩种
export const hk6Games = ['hk6', 'xyhk6'];
export const hk6Zodiac = 'DOG'; //本年生肖 狗

//投注页面信息
export const GAMES = {
	'jsbjl': {
		name: '极速百家乐',
		class: 'jsbjl', //彩种分类
		play: ['d1z', 'd2z', 'd3z', 'd4z', 'd5z', 'd6z'],
		count: {
			d1z: { name: '一桌', t: 8, lt: PlayType.BetNormal },
			d2z: { name: '二桌', t: 8, lt: PlayType.BetNormal },
			d3z: { name: '三桌', t: 8, lt: PlayType.BetNormal },
			d4z: { name: '四桌', t: 8, lt: PlayType.BetNormal },
			d5z: { name: '五桌', t: 8, lt: PlayType.BetNormal },
			d6z: { name: '六桌', t: 8, lt: PlayType.BetNormal },
		},
	},
	'fc3d': commonPlay.fc3d('福彩3D'),

	'pl3': commonPlay.fc3d('排列三'),

	'bjpk10': commonPlay.bjpk10('北京赛车'),

	'azxy10': commonPlay.bjpk10('澳洲幸运10'),

	'azxy5': commonPlay.cqssc('澳洲幸运5', false, 'azxy5'),

	'hlsc': commonPlay.bjpk10('欢乐赛车'),

	'pk10nn': commonPlay.pk10nn('PK10牛牛'),

	'jsnn': commonPlay.pk10nn('极速牛牛'),

	'jssc': commonPlay.bjpk10('极速赛车'),

	'mlaft': commonPlay.bjpk10('幸运飞艇'),

	'hlft': commonPlay.bjpk10('欢乐飞艇'),

	'jsft': commonPlay.bjpk10('极速飞艇'),

	'cqssc': commonPlay.cqssc('重庆时时彩', true, 'cqssc'),

	'hlssc': commonPlay.cqssc('欢乐时时彩', false, 'hlssc'),

	'xjssc': commonPlay.cqssc('新疆时时彩', true, 'xjssc'),

	'tjssc': commonPlay.cqssc('天津时时彩', true, 'tjssc'),

	'jsssc': commonPlay.cqssc('极速时时彩', false, 'jsssc'),

	'txffc': commonPlay.cqssc('腾讯分分彩', false, 'txffc'),

	'pcdd': commonPlay.pcdd('PC蛋蛋'),

	'cqklsf': commonPlay.cqklsf('重庆幸运农场'),

	'bjkl8': commonPlay.bjkl8('北京快乐8'),

	'gd11x5': commonPlay.gd11x5('广东11选5'),

	'sd11x5': commonPlay.gd11x5('山东11选5'),

	'jx11x5': commonPlay.gd11x5('江西11选5'),

	'jsk3': commonPlay.jsk3('江苏快3', 'jsk3'),

	'mjsk3': commonPlay.jsk3('极速快3', 'mjsk3'),
	'hlk3': commonPlay.jsk3('欢乐快3', 'hlk3'),

	'bjk3': commonPlay.jsk3('北京快3', 'bjk3'),

	'shk3': commonPlay.jsk3('上海快3', 'shk3'),

	'jlk3': commonPlay.jsk3('吉林快3', 'jlk3'),
	//--
	'hubk3': commonPlay.jsk3('湖北快3', 'hubk3'),

	'gxk3': commonPlay.jsk3('广西快3', 'gxk3'),

	'ahk3': commonPlay.jsk3('安徽快3', 'ahk3'),

	'hebk3': commonPlay.jsk3('河北快3', 'hebk3'),

	'gsk3': commonPlay.jsk3('甘肃快3', 'gsk3'),

	'gzk3': commonPlay.jsk3('贵州快3', 'gzk3'),
	//--
	'gdklsf': commonPlay.cqklsf('广东快乐十分'),

	'hk6': commonPlay.hk6('香港六合彩'),

	'xyhk6': commonPlay.hk6('幸运六合彩'),
};




//棋牌
export const QIPAI = {
	games: [
		{ name: '德州扑克', id: '620' },
		{ name: '二八杠', id: '720' },
		{ name: '抢庄牛牛', id: '830' },
		{ name: '炸金花', id: '220' },
		{ name: '三公', id: '860' },
		{ name: '押庄龙虎', id: '900' },
		{ name: '21点', id: '600' },
		{ name: '通比牛牛', id: '870' },
		{ name: '欢乐红包', id: '880' },
		{ name: '极速炸金花', id: '230' },
		{ name: '抢庄牌九', id: '730' },
		{ name: '十三水', id: '630' },
		{ name: '幸运五张', id: '380' },
		{ name: '斗地主', id: '610' },
	]
};

//香港六合彩 生肖中英对比
export const hk6EtoC = {
	MOUSE: '鼠',
	OX: '牛',
	RABBIT: '兔',
	LOONG: '龙',
	SHEEP: '羊',
	ROOSTER: '鸡',
	TIGER: '虎',
	SNAKE: '蛇',
	HORSE: '马',
	MONKEY: '猴',
	DOG: '狗',
	PIG: '猪'
};
