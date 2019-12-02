<template>
  <div>
    <scroll class="game-rules" :data="scrollDatas">
      <div style="padding: 10px">
        <div v-if="showCode == 'bjpk10'" id="GAME_bjpk10_PAGE" class="show">
          <h2>{{openResult['bjpk10'].name}}(原名：北京福彩“PK拾”)规则说明</h2>
          <ul>
            <li>该游戏的投注时间、开奖时间和开奖号码与“北京PK拾”完全同步（官方网），北京时间（GMT+8）每天白天从上午9点30分开到晚上23点50分，每20分钟开一次奖,每天开奖44期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1～10 两面：</span>指 单、双；大、小。
            </li>
            <li class="stress">
              <span class="label">单、双：</span>号码为双数叫双，如4、8；号码为单数叫单，如5、9。
            </li>
            <li class="stress">
              <span class="label">大、小：</span>开出之号码大于或等于6为大，小于或等于5为小。
            </li>
            <li class="stress">
              <span class="label">第一名～第十名 车号指定：</span>每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">1～5龙虎</span>
            </li>
            <li class="stress">
              <span class="label">冠&nbsp;&nbsp;军 龙/虎：</span>“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">亚&nbsp;&nbsp;军 龙/虎：</span>“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第三名 龙/虎：</span>“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第四名 龙/虎：</span>“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第五名 龙/虎：</span>“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">冠军车号＋亚军车号＝冠亚和值（为3~19)</span>
            </li>
            <li class="stress">
              <span class="label">冠亚和单双：“冠亚和值”</span>为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和大小：“冠亚和值”</span>大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和指定：“冠亚和值”</span>可能出现的结果为3～19， 投中对应
              <span class="label">“冠亚和值”</span>数字的视为中奖，其余视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'hlsc'" id="GAME_hlsc_PAGE">
          <h2>{{openResult['hlsc'].name}}规则说明</h2>
          <ul>
            <li>{{openResult['hlsc'].name}}”是引进澳洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；这类彩种在澳洲当地是非常火爆的，您可以放心投注、开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨06:25:00，每5分钟开一次奖,每天开奖276期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1～10 两面：</span>指 单、双；大、小。
            </li>
            <li class="stress">
              <span class="label">单、双：</span>号码为双数叫双，如4、8；号码为单数叫单，如5、9。
            </li>
            <li class="stress">
              <span class="label">大、小：</span>开出之号码大于或等于6为大，小于或等于5为小。
            </li>
            <li class="stress">
              <span class="label">第一名～第十名 车号指定：</span>每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">1～5龙虎</span>
            </li>
            <li class="stress">
              <span class="label">冠&nbsp;&nbsp;军 龙/虎：</span>“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">亚&nbsp;&nbsp;军 龙/虎：</span>“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第三名 龙/虎：</span>“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第四名 龙/虎：</span>“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第五名 龙/虎：</span>“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">冠军车号＋亚军车号＝冠亚和值（为3~19)</span>
            </li>
            <li class="stress">
              <span class="label">冠亚和单双：“冠亚和值”</span>为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和大小：“冠亚和值”</span>大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和指定：“冠亚和值”</span>可能出现的结果为3～19， 投中对应
              <span class="label">“冠亚和值”</span>数字的视为中奖，其余视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'pk10nn'" class="show">
          <h2>{{openResult['pk10nn'].name}}规则说明</h2>
          <ul>
            <li>「{{openResult['pk10nn'].name}}」按pk10赛车的开奖结果为基础</li>
            <li>pk10赛车开奖结果，投注时间、开奖时间和开奖号码与“北京PK拾”完全同步（官方网），北京时间（GMT+8）每天白天从上午9点30分开到晚上23点50分，每20分钟开一次奖,每天开奖44期。。</li>
            <li>
              <span class="label" style="color: red">下注金额会暂时冻结下注金额的4倍，开奖后连本带利一并返还。</span>
            </li>
            <li>
              <span
                class="label"
                style="color: red"
              >例如玩家下注1元，冻结4元，下注总金额为5元。如果庄家（牛六及以下）赢，返还4元，庄家（牛七、牛八）赢，返还3元；庄家（牛九）赢，返还2元；庄家（牛牛）赢，不返还。</span>
            </li>
          </ul>
          <ul>
            <li>根据pk10赛车开奖的10个号码的不同排序的5个球来分庄闲：</li>
            <li>
              <b class="label">庄家:</b>1+2+3+4+5
            </li>
            <li>
              <b class="label">闲一:</b>2+3+4+5+6
            </li>
            <li>
              <b class="label">闲二:</b>3+4+5+6+7
            </li>
            <li>
              <b class="label">闲三:</b>4+5+6+7+8
            </li>
            <li>
              <b class="label">闲四:</b>5+6+7+8+9
            </li>
            <li>
              <b class="label">闲五:</b>6+7+8+9+10
            </li>
            <li>
              <b class="label">无牛:</b>五个球中的任意3个球不能成为10的倍数
            </li>
            <li>
              <b class="label">有牛:</b>五个球中的任意3个球相加能成10的倍数，另外两张相加的点数为牛几
            </li>
            <li>
              <b class="label">牛牛:</b>五个球中的任意3个球相加能成10的倍数，另外两张相加的点数也是10点
            </li>
            <li>
              <b>大小：</b> 无牛《牛一《牛二《牛三《牛四《牛五《牛六《牛七《牛八《牛九《牛牛
            </li>
            <li>
              <span style="color: red">注：当庄家与闲家点数相等时，庄家赢</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'mlaft'" id="GAME_mlaft_PAGE">
          <h2>{{openResult['mlaft'].name}}规则说明</h2>
          <ul>
            <li>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['mlaft'].name}}”完全同步（官方网），北京时间（GMT+8）每天白天从中午13:04 开到凌晨04:04，每5分钟开一次奖, 每天开奖180期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1～10 两面：</span>指 单、双；大、小。
            </li>
            <li class="stress">
              <span class="label">单、双：</span>号码为双数叫双，如4、8；号码为单数叫单，如5、9。
            </li>
            <li class="stress">
              <span class="label">大、小：</span>开出之号码大于或等于6为大，小于或等于5为小。
            </li>
            <li class="stress">
              <span class="label">第一名～第十名 车号指定：</span>每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">1～5龙虎</span>
            </li>
            <li class="stress">
              <span class="label">冠&nbsp;&nbsp;军 龙/虎：</span>“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">亚&nbsp;&nbsp;军 龙/虎：</span>“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第三名 龙/虎：</span>“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第四名 龙/虎：</span>“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第五名 龙/虎：</span>“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">冠军车号＋亚军车号＝冠亚和值（为3~19)</span>
            </li>
            <li class="stress">
              <span class="label">冠亚和单双：“冠亚和值”</span>为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和大小：“冠亚和值”</span>大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和指定：“冠亚和值”</span>可能出现的结果为3～19， 投中对应
              <span class="label">“冠亚和值”</span>数字的视为中奖，其余视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'hlft'" id="GAME_hlft_PAGE">
          <h2>{{openResult['hlft'].name}}规则说明</h2>
          <ul>
            <li>“{{openResult['hlft'].name}}”是引进澳洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；这类彩种在澳洲当地是非常火爆的，您可以放心投注、开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨06:25:00，每5分钟开一次奖,每天开奖276期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1～10 两面：</span>指 单、双；大、小。
            </li>
            <li class="stress">
              <span class="label">单、双：</span>号码为双数叫双，如4、8；号码为单数叫单，如5、9。
            </li>
            <li class="stress">
              <span class="label">大、小：</span>开出之号码大于或等于6为大，小于或等于5为小。
            </li>
            <li class="stress">
              <span class="label">第一名～第十名 车号指定：</span>每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">1～5龙虎</span>
            </li>
            <li class="stress">
              <span class="label">冠&nbsp;&nbsp;军 龙/虎：</span>“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">亚&nbsp;&nbsp;军 龙/虎：</span>“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第三名 龙/虎：</span>“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第四名 龙/虎：</span>“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第五名 龙/虎：</span>“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">冠军车号＋亚军车号＝冠亚和值（为3~19)</span>
            </li>
            <li class="stress">
              <span class="label">冠亚和单双：“冠亚和值”</span>为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和大小：“冠亚和值”</span>大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和指定：“冠亚和值”</span>可能出现的结果为3～19， 投中对应
              <span class="label">“冠亚和值”</span>数字的视为中奖，其余视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'jsnn'" class="show">
          <h2>{{openResult['jsnn'].name}}规则说明</h2>
          <ul>
            <li>「{{openResult['jsnn'].name}}」按{{openResult['jssc'].name}}的开奖结果为基础</li>
            <li>{{openResult['jssc'].name}}开奖结果，北京时间（GMT+8）早上07:00:00 到 凌晨05:58:45，每75秒开一次奖,每天开奖1104期</li>
            <li>
              <span class="label" style="color: red">下注金额会暂时冻结下注金额的4倍，开奖后连本带利一并返还。</span>
            </li>
            <li>
              <span
                class="label"
                style="color: red"
              >例如玩家下注1元，冻结4元，下注总金额为5元。如果庄家（牛六及以下）赢，返还4元，庄家（牛七、牛八）赢，返还3元；庄家（牛九）赢，返还2元；庄家（牛牛）赢，不返还。</span>
            </li>
          </ul>
          <ul>
            <li>根据{{openResult['jssc'].name}}开奖的10个号码的不同排序的5个球来分庄闲：</li>
            <li>
              <b class="label">庄家:</b>1+2+3+4+5
            </li>
            <li>
              <b class="label">闲一:</b>2+3+4+5+6
            </li>
            <li>
              <b class="label">闲二:</b>3+4+5+6+7
            </li>
            <li>
              <b class="label">闲三:</b>4+5+6+7+8
            </li>
            <li>
              <b class="label">闲四:</b>5+6+7+8+9
            </li>
            <li>
              <b class="label">闲五:</b>6+7+8+9+10
            </li>
            <li>
              <b class="label">无牛:</b>五个球中的任意3个球不能成为10的倍数
            </li>
            <li>
              <b class="label">有牛:</b>五个球中的任意3个球相加能成10的倍数，另外两张相加的点数为牛几
            </li>
            <li>
              <b class="label">牛牛:</b>五个球中的任意3个球相加能成10的倍数，另外两张相加的点数也是10点
            </li>
            <li>
              <b>大小：</b> 无牛《牛一《牛二《牛三《牛四《牛五《牛六《牛七《牛八《牛九《牛牛
            </li>
            <li>
              <span style="color: red">注：当庄家与闲家点数相等时，庄家赢</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'cqssc'" id="GAME_cqssc_PAGE">
          <h2>{{openResult['cqssc'].name}}规则说明</h2>
          <ul>
            <li>该游戏的投注时间、开奖时间和开奖号码与{{openResult['cqssc'].name}}完全同步，北京时间（GMT+8）每天白天从上午7:10开到晚上23:50，夜场从00:10至凌晨03:10,每20分钟开一次奖，夜场每20分钟开一次奖,每天开奖59期(白天50期,夜间9期)。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.第一球~第五球</span>
            </li>
            <li class="stress">
              <span class="label">第一球特~第五球特：</span>第一球特、第二球特、第三球特、第四球特、第五球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">单双大小：</span>根据相应单项投注第一球特 ~ 第五球特开出的球号，判断胜负。
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於5为特码大，小於或等於4为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">2.总和单双大小：</span>
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於23为特码大，小於或等於22为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.前三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的万位千位百位数字都相同。----如中奖号码为000、111、999等，中奖号码的万位千位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的万位千位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码万位千位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的万位千位百位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的万位千位百位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.中三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的十位百位千位数字都相同。----如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的十位百位千位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">6.后三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的百位十位个位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位十位个位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的百位十位个位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位十位个位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的百位十位个位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的百位十位个位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">7.龙虎和特殊玩法： 龙 &gt; 虎 &gt; 和 （0为最小，9为最大）。</span>
            </li>
            <li class="stress">
              <span class="label">龙：</span>开出之号码第一球（万位）的中奖号码大于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出4
              第五球开出2；第一球开出9 第五球开出8；第一球开出5 第五球开出1...中奖为龙。
            </li>
            <li class="stress">
              <span class="label">虎：</span>开出之号码第一球（万位）的中奖号码小于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出7
              第五球开出9；第一球开出3 第五球开出5；第一球开出5 第五球开出8...中奖为虎。
            </li>
            <li class="stress">
              <span class="label">和：</span>开出之号码第一球（万位）的中奖号码等于第五球（个位）的中奖号码，例如开出结果：2***2则投注和局者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">8.单码和连码玩法：</span>
            </li>
            <li class="stress">
              <span class="label">一中一：</span>五个球只要出了最少一个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中二：</span>五个球只要出了最少二个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中三：</span>五个球只要出了最少三个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中四：</span>五个球只要出了最少四个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中五：</span>五个球只要出了五个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">二中二：</span>五个球只要出了五个您下注的二个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">三中三：</span>五个球只要出了五个您下注的三个球号即为中奖
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'hlssc'" id="GAME_hlssc_PAGE">
          <h2>{{openResult['hlssc'].name}}规则说明</h2>
          <ul>
            <li>“{{openResult['hlssc'].name}}”是引进澳洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；这类彩种在澳洲当地是非常火爆的，您可以放心投注、开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨06:25:00，每5分钟开一次奖,每天开奖276期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.第一球~第五球</span>
            </li>
            <li class="stress">
              <span class="label">第一球特~第五球特：</span>第一球特、第二球特、第三球特、第四球特、第五球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">单双大小：</span>根据相应单项投注第一球特 ~ 第五球特开出的球号，判断胜负。
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於5为特码大，小於或等於4为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">2.总和单双大小：</span>
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於23为特码大，小於或等於22为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.前三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的万位千位百位数字都相同。----如中奖号码为000、111、999等，中奖号码的万位千位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的万位千位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码万位千位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的万位千位百位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的万位千位百位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.中三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的十位百位千位数字都相同。----如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的十位百位千位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">6.后三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的百位十位个位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位十位个位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的百位十位个位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位十位个位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的百位十位个位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的百位十位个位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">7.龙虎和特殊玩法： 龙 &gt; 虎 &gt; 和 （0为最小，9为最大）。</span>
            </li>
            <li class="stress">
              <span class="label">龙：</span>开出之号码第一球（万位）的中奖号码大于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出4
              第五球开出2；第一球开出9 第五球开出8；第一球开出5 第五球开出1...中奖为龙。
            </li>
            <li class="stress">
              <span class="label">虎：</span>开出之号码第一球（万位）的中奖号码小于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出7
              第五球开出9；第一球开出3 第五球开出5；第一球开出5 第五球开出8...中奖为虎。
            </li>
            <li class="stress">
              <span class="label">和：</span>开出之号码第一球（万位）的中奖号码等于第五球（个位）的中奖号码，例如开出结果：2***2则投注和局者视为中奖，其它视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'xjssc'" id="GAME_xjssc_PAGE">
          <h2>{{openResult['xjssc'].name}}规则说明</h2>
          <ul>
            <li>该游戏的投注时间、开奖时间和开奖号码与{{openResult['xjssc'].name}}完全同步，北京时间(GMT+8)每天上午10:00到凌晨02:00，每20分钟开奖一次，每天开奖48期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.第一球~第五球</span>
            </li>
            <li class="stress">
              <span class="label">第一球特~第五球特：</span>第一球特、第二球特、第三球特、第四球特、第五球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">单双大小：</span>根据相应单项投注第一球特 ~ 第五球特开出的球号，判断胜负。
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於5为特码大，小於或等於4为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">2.总和单双大小：</span>
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於23为特码大，小於或等於22为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.前三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的万位千位百位数字都相同。----如中奖号码为000、111、999等，中奖号码的万位千位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的万位千位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码万位千位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的万位千位百位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的万位千位百位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.中三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的十位百位千位数字都相同。----如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的十位百位千位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">6.后三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的百位十位个位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位十位个位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的百位十位个位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位十位个位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的百位十位个位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的百位十位个位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">7.龙虎和特殊玩法： 龙 &gt; 虎 &gt; 和 （0为最小，9为最大）。</span>
            </li>
            <li class="stress">
              <span class="label">龙：</span>开出之号码第一球（万位）的中奖号码大于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出4
              第五球开出2；第一球开出9 第五球开出8；第一球开出5 第五球开出1...中奖为龙。
            </li>
            <li class="stress">
              <span class="label">虎：</span>开出之号码第一球（万位）的中奖号码小于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出7
              第五球开出9；第一球开出3 第五球开出5；第一球开出5 第五球开出8...中奖为虎。
            </li>
            <li class="stress">
              <span class="label">和：</span>开出之号码第一球（万位）的中奖号码等于第五球（个位）的中奖号码，例如开出结果：2***2则投注和局者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">8.单码和连码玩法：</span>
            </li>
            <li class="stress">
              <span class="label">一中一：</span>五个球只要出了最少一个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中二：</span>五个球只要出了最少二个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中三：</span>五个球只要出了最少三个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中四：</span>五个球只要出了最少四个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中五：</span>五个球只要出了五个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">二中二：</span>五个球只要出了五个您下注的二个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">三中三：</span>五个球只要出了五个您下注的三个球号即为中奖
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'tjssc'" id="GAME_tjssc_PAGE">
          <h2>{{openResult['tjssc'].name}}规则说明</h2>
          <ul>
            <li>该游戏的投注时间、开奖时间和开奖号码与{{openResult['tjssc'].name}}完全同步，北京时间（GMT+8）每天白天从上午9:10开到23:00,每20分钟开一次奖，每天开奖42期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.第一球~第五球</span>
            </li>
            <li class="stress">
              <span class="label">第一球特~第五球特：</span>第一球特、第二球特、第三球特、第四球特、第五球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">单双大小：</span>根据相应单项投注第一球特 ~ 第五球特开出的球号，判断胜负。
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於5为特码大，小於或等於4为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">2.总和单双大小：</span>
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於23为特码大，小於或等於22为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.前三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的万位千位百位数字都相同。----如中奖号码为000、111、999等，中奖号码的万位千位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的万位千位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码万位千位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的万位千位百位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的万位千位百位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.中三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的十位百位千位数字都相同。----如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的十位百位千位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">6.后三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的百位十位个位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位十位个位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的百位十位个位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位十位个位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的百位十位个位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的百位十位个位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">7.龙虎和特殊玩法： 龙 &gt; 虎 &gt; 和 （0为最小，9为最大）。</span>
            </li>
            <li class="stress">
              <span class="label">龙：</span>开出之号码第一球（万位）的中奖号码大于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出4
              第五球开出2；第一球开出9 第五球开出8；第一球开出5 第五球开出1...中奖为龙。
            </li>
            <li class="stress">
              <span class="label">虎：</span>开出之号码第一球（万位）的中奖号码小于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出7
              第五球开出9；第一球开出3 第五球开出5；第一球开出5 第五球开出8...中奖为虎。
            </li>
            <li class="stress">
              <span class="label">和：</span>开出之号码第一球（万位）的中奖号码等于第五球（个位）的中奖号码，例如开出结果：2***2则投注和局者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">8.单码和连码玩法：</span>
            </li>
            <li class="stress">
              <span class="label">一中一：</span>五个球只要出了最少一个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中二：</span>五个球只要出了最少二个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中三：</span>五个球只要出了最少三个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中四：</span>五个球只要出了最少四个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">一中五：</span>五个球只要出了五个您下注的那个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">二中二：</span>五个球只要出了五个您下注的二个球号即为中奖
            </li>
            <li class="stress">
              <span class="label">三中三：</span>五个球只要出了五个您下注的三个球号即为中奖
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'gdklsf'" id="GAME_gdklsf_PAGE">
          <h2>{{openResult['gdklsf'].name}}规则说明</h2>
          <ul>
            <li>每期{{openResult['gdklsf'].name}}开奖球数共八粒。每粒球除了总和玩法，其它都有单独的投注页面。{{openResult['gdklsf'].name}}每天开42期，每期间隔20分钟。北京时间（GMT+8）每天白天从上午09：00开到晚上23：00。</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.两面：</span>指单、双；大、小、尾大、尾小。
            </li>
            <li class="stress">单、双：号码为双数叫双，如8、16；号码为单数叫单，如19、5。</li>
            <li class="stress">大、小：开出之号码大于或等于11为大，小于或等于10为小。</li>
            <li class="stress">尾大、尾小：开出之尾数大于或等于5为尾大，小于或等于4为尾小。</li>
            <li class="stress">每一个号码为一投注组合，假如投注号码为开奖号码并在所投的球位置，视为中奖，其余情形视为不中奖。</li>
          </ul>
          <ul>
            <li>
              <span class="label">2.中发白</span>
            </li>
            <li class="stress">中：开出之号码为01、02、03、04、05、06、07</li>
            <li class="stress">发：开出之号码为08、09、10、11、12、13、14</li>
            <li class="stress">白：开出之号码为15、16、17、18、19、20</li>
          </ul>
          <ul>
            <li>
              <span class="label">3.方位</span>
            </li>
            <li class="stress">东：开出之号码为01、05、09、13、17</li>
            <li class="stress">南：开出之号码为02、06、10、14、18</li>
            <li class="stress">西：开出之号码为03、07、11、15、19</li>
            <li class="stress">北：开出之号码为04、08、12、16、20</li>
          </ul>
          <ul>
            <li>
              <span class="label">13.龙虎</span>以第一球的中奖号码和第八球的中奖号码做为对奖号码。
            </li>
            <li
              class="stress"
            >龙：开出之号码第一球的中奖号码大于第八球的中奖号码。如 第一球开出14 第八球开出09；第一球开出17 第八球开出08；第一球开出05 第八球开出01...中奖为龙。</li>
            <li
              class="stress"
            >虎：开出之号码第一球的中奖号码小于第八球的中奖号码。如 第一球开出14 第八球开出16；第一球开出13 第八球开出18；第一球开出05 第八球开出08...中奖为虎。</li>
          </ul>
          <ul>
            <li>
              <span class="label">14.正码</span>
            </li>
            <li class="stress">从01至20中任意选择1个号码进行投注， 投注号码与开奖号码中任意1个位置的号码相符，即中奖。</li>
          </ul>
          <ul>
            <li>
              <span class="label">4.总和单双：</span>所有8个开奖号码的数字总和值是单数为总和单，如数字总和值是31、51；所有8个开奖号码的数字总和值是双数为总和双，如数字总和是42、80；假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
            </li>
            <li>
              <span class="label">5.总和大小：</span>所有8个开奖号码的数字总和值85到132为总大；所有8个开奖号码的数字总和值36到83为总分小；所有8个开奖号码的数字总和值为84打和；如开奖号码为01、20、02、08、17、09、11，数字总和是68，则总分小。假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖，打和不计算结果。
            </li>
            <li>
              <span class="label">6.总尾大小：</span>所有8个开奖号码的数字总和数值的个位数大于或等于5为总尾大，小于或等于4为总尾小；假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
            </li>
            <li>
              <span class="label">7.选二任选：</span>指从01至20中任意选择2个号码对开奖号码中任意2个位置的投注。 投注号码与开奖号码中任意2个位置的号码相符，即中奖。
            </li>
            <li>
              <span class="label">8.选二连组：</span>指从01至20中任意选择2个号码对开奖号码中按开奖顺序出现的2个连续位置的投注。
              投注号码与开奖号码中按开奖顺序出现的2个连续位置的号码相符（顺序不限），即中奖。
            </li>
            <li>
              <span class="label">9.选三任选：</span>指从01至20中任意选择3个号码对开奖号码中任意3个位置的投注。 投注号码与开奖号码中任意3个位置的号码相符，即中奖。
            </li>
            <li>
              <span class="label">10.选三前组：</span>指从01至20中任意选择3个号码对开奖号码中按开奖顺序出现的前3个连续位置的投注。
              投注号码与开奖号码中按开奖顺序出现的前3个位置的号码相符（顺序不限），即中奖。
            </li>
            <li>
              <span class="label">11.选四任选：</span>指从01至20中任意选择4个号码，对开奖号码中任意4个位置的投注。 投注号码与开奖号码中任意4个位置的号码相符，即中奖。
            </li>
            <li>
              <span class="label">12.选五任选：</span>指从01至20中任意选择5个号码，对开奖号码中任意5个位置的投注。 投注号码与开奖号码中任意5个位置的号码相符，即中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'jsk3'" id="GAME_jsk3_PAGE">
          <h2>{{openResult['jsk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['jsk3'].name}}”完全同步，北京时间（GMT+8）每天08:30:00~22:10:00，每20分钟开一次奖每天开奖41期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'mjsk3'" id="GAME_mjsk3_PAGE">
          <h2>{{openResult['mjsk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['mjsk3'].name}}”完全同步，北京时间（GMT+8）早上06:58:45 到 凌晨05:58:45，每75秒开一次奖,每天开奖1104期</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'hlk3'" id="GAME_hlk3_PAGE">
          <h2>{{openResult['hlk3'].name}}规则说明</h2>
          <ul>
<!--            <li>-->
<!--              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['hlk3'].name}}”完全同步，北京时间（GMT+8）早上06:58:45 到 凌晨05:58:45，每75秒开一次奖,每天开奖1104期</span>-->
<!--            </li>-->
            <li>{{openResult['hlk3'].name}}”是引进澳洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；这类彩种在澳洲当地是非常火爆的，您可以放心投注、开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨06:25:00，每5分钟开一次奖,每天开奖276期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'bjk3'" id="GAME_bjk3_PAGE">
          <h2>{{openResult['bjk3'].name}}规则说明</h2>
          <ul>
            <li>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['bjk3'].name}}”完全同步，北京时间（GMT+8）每天白天从上午9点00分开到晚上23点40分，每20分钟开一次奖,每天开奖44期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'jlk3'" id="GAME_bjk3_PAGE">
          <h2>{{openResult['jlk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['jlk3'].name}}”完全同步，北京时间（GMT+8）每天白天从上午08:20开到晚上21:40，每20分钟开一次奖,每天开奖40期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'shk3'" id="GAME_bjk3_PAGE">
          <h2>{{openResult['shk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['shk3'].name}}”完全同步，北京时间（GMT+8）每天08:38~22:18，每20分钟开一次奖每天开奖41期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <!-- --- -->
        <div v-if="showCode == 'hubk3'" id="GAME_hubk3_PAGE">
          <h2>{{openResult['hubk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['hubk3'].name}}”完全同步，北京时间（GMT+8）每天09:00 至 22:00，每20分钟开一次奖每天开奖39期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'gxk3'" id="GAME_gxk3_PAGE">
          <h2>{{openResult['gxk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['gxk3'].name}}”完全同步，北京时间（GMT+8）每天09:10 至 22:30，每20分钟开一次奖每天开奖40期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'ahk3'" id="GAME_ahk3_PAGE">
          <h2>{{openResult['ahk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['ahk3'].name}}”完全同步，北京时间（GMT+8）每天08:40 至 22:00，每20分钟开一次奖每天开奖40期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'hebk3'" id="GAME_hebk3_PAGE">
          <h2>{{openResult['hebk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['hebk3'].name}}”完全同步，北京时间（GMT+8）每天08:30 至 22:10，每20分钟开一次奖每天开奖41期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'gsk3'" id="GAME_gsk3_PAGE">
          <h2>{{openResult['gsk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['gsk3'].name}}”完全同步，北京时间（GMT+8）每天10:00 至 22:00，每20分钟开一次奖每天开奖36期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'gzk3'" id="GAME_gzk3_PAGE">
          <h2>{{openResult['gzk3'].name}}规则说明</h2>
          <ul>
            <li>
              <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['gzk3'].name}}”完全同步，北京时间（GMT+8）每天09:10 至 22:15，每20分钟开一次奖每天开奖39期。</span>
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <b>
                <span style="color: red">和值</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加的和在11－18的范围内，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加的和在3－10的范围内，即为中奖。注：若三粒骰子平面点数相同，通吃「大」、「小」各注</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加的和为单数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加的和为双数，即为中奖。</span>
            </li>
            <li>
              <b>
                <span>具体和值：</span>
              </b>
              <span>选择具体和值(3-18),开奖结果数字相加的和等于所选的值，即为中奖。</span>
            </li>
            <li>
              <b>
                <span style="color: red">三连号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三连号通选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三连号单选：</span>
              </b>
              <span>对所有3个相连的号码（123、234、345、456）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">三同号</span>
              </b>
            </li>
            <li>
              <b>
                <span>三同号通选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span>三同号单选：</span>
              </b>
              <span>对所有相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖；</span>
            </li>
            <li>
              <b>
                <span style="color: red">二同号</span>
              </b>
            </li>
            <li>
              <span>中奖号码是三个号码内出现两个相同号码，如：112，211，131，视为中奖；但如果开奖结果为豹子（三同号），则二同号将视为不中奖</span>
            </li>
            <li>
              <b>
                <span style="color: red">跨度</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为3、4、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、1、2，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为1、3、5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为0、2、4，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体跨度值：</span>
              </b>
              <span>开奖号码中的数字最大数减去最小数结果为所选跨度值，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">牌点</span>
              </b>
            </li>
            <li>
              <b>
                <span>大：</span>
              </b>
              <span>开奖结果数字相加，若个位数为6-9或者0，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>小：</span>
              </b>
              <span>开奖结果数字相加，若个位数为1-5，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>单：</span>
              </b>
              <span>开奖结果数字相加，若个位数为单数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>双：</span>
              </b>
              <span>开奖结果数字相加，若个位数为双数，即为中奖；</span>
            </li>
            <li>
              <b>
                <span>具体牌点值：</span>
              </b>
              <span>开奖结果数字相加，若个位数为选择的牌点，即为中奖；</span>
            </li>

            <li>
              <b>
                <span style="color: red">不出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中不存在你所选数字，即为中奖。</span>
            </li>

            <li>
              <b>
                <span style="color: red">必出号码</span>
              </b>
            </li>
            <li>
              <span>开奖号码中存在你所选数字，即为中奖。</span>
            </li>
          </ul>
        </div>
        <!-- ----- -->

        <div v-if="showCode == 'cqklsf'" id="GAME_cqklsf_PAGE">
          <h2>{{openResult['cqklsf'].name}}规则说明</h2>
          <ul>
            <li>每期{{openResult['cqklsf'].name}}开奖球数共八粒。每粒球除了总和玩法，其它都有单独的投注页面。</li>
            <li>早场-每天上午07:00到晚上23:40，每20分钟开奖一次，共50期。</li>
            <li>晚场-凌晨00:00到凌晨03:00，分20分钟开奖一次，共9期，全日共59期。</li>
            <li>每日23:40到隔日00:00暂停投注。</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.两面：</span>指单、双；大、小、尾大、尾小。
            </li>
            <li class="stress">单、双：号码为双数叫双，如8、16；号码为单数叫单，如19、5。</li>
            <li class="stress">大、小：开出之号码大于或等于11为大，小于或等于10为小。</li>
            <li class="stress">尾大、尾小：开出之尾数大于或等于5为尾大，小于或等于4为尾小。</li>
            <li class="stress">每一个号码为一投注组合，假如投注号码为开奖号码并在所投的球位置，视为中奖，其余情形视为不中奖。</li>
          </ul>
          <ul>
            <li>
              <span class="label">2.中发白</span>
            </li>
            <li class="stress">中：开出之号码为01、02、03、04、05、06、07</li>
            <li class="stress">发：开出之号码为08、09、10、11、12、13、14</li>
            <li class="stress">白：开出之号码为15、16、17、18、19、20</li>
          </ul>
          <ul>
            <li>
              <span class="label">3.方位</span>
            </li>
            <li class="stress">东：开出之号码为01、05、09、13、17</li>
            <li class="stress">南：开出之号码为02、06、10、14、18</li>
            <li class="stress">西：开出之号码为03、07、11、15、19</li>
            <li class="stress">北：开出之号码为04、08、12、16、20</li>
          </ul>
          <ul>
            <li>
              <span class="label">13.龙虎</span>以第一球的中奖号码和第八球的中奖号码做为对奖号码。
            </li>
            <li
              class="stress"
            >龙：开出之号码第一球的中奖号码大于第八球的中奖号码。如 第一球开出14 第八球开出09；第一球开出17 第八球开出08；第一球开出05 第八球开出01...中奖为龙。</li>
            <li
              class="stress"
            >虎：开出之号码第一球的中奖号码小于第八球的中奖号码。如 第一球开出14 第八球开出16；第一球开出13 第八球开出18；第一球开出05 第八球开出08...中奖为虎。</li>
          </ul>
          <ul>
            <li>
              <span class="label">14.正码</span>
            </li>
            <li class="stress">从01至20中任意选择1个号码进行投注， 投注号码与开奖号码中任意1个位置的号码相符，即中奖。</li>
          </ul>
          <ul>
            <li>
              <span class="label">4.总和单双：</span>所有8个开奖号码的数字总和值是单数为总和单，如数字总和值是31、51；所有8个开奖号码的数字总和值是双数为总和双，如数字总和是42、80；假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
            </li>
            <li>
              <span class="label">5.总和大小：</span>所有8个开奖号码的数字总和值85到132为总大；所有8个开奖号码的数字总和值36到83为总分小；所有8个开奖号码的数字总和值为84打和；如开奖号码为01、20、02、08、17、09、11，数字总和是68，则总分小。假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖，打和不计算结果。
            </li>
            <li>
              <span class="label">6.总尾大小：</span>所有8个开奖号码的数字总和数值的个位数大于或等于5为总尾大，小于或等于4为总尾小；假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
            </li>
            <li>
              <span class="label">7.选二任选：</span>指从01至20中任意选择2个号码对开奖号码中任意2个位置的投注。 投注号码与开奖号码中任意2个位置的号码相符，即中奖。
            </li>
            <li>
              <span class="label">8.选二连组：</span>指从01至20中任意选择2个号码对开奖号码中按开奖顺序出现的2个连续位置的投注。
              投注号码与开奖号码中按开奖顺序出现的2个连续位置的号码相符（顺序不限），即中奖。
            </li>
            <li>
              <span class="label">9.选三任选：</span>指从01至20中任意选择3个号码对开奖号码中任意3个位置的投注。 投注号码与开奖号码中任意3个位置的号码相符，即中奖。
            </li>
            <li>
              <span class="label">10.选三前组：</span>指从01至20中任意选择3个号码对开奖号码中按开奖顺序出现的前3个连续位置的投注。
              投注号码与开奖号码中按开奖顺序出现的前3个位置的号码相符（顺序不限），即中奖。
            </li>
            <li>
              <span class="label">11.选四任选：</span>指从01至20中任意选择4个号码，对开奖号码中任意4个位置的投注。 投注号码与开奖号码中任意4个位置的号码相符，即中奖。
            </li>
            <li>
              <span class="label">12.选五任选：</span>指从01至20中任意选择5个号码，对开奖号码中任意5个位置的投注。 投注号码与开奖号码中任意5个位置的号码相符，即中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'bjkl8'" id="GAME_bjkl8_PAGE">
          <h2>{{openResult['bjkl8'].name}}规则说明</h2>
          <ul>
            <li>该游戏投注、开奖时间和开奖号码与“{{openResult['bjkl8'].name}}”完全同步，北京时间（GMT+8）每天白天从早上09:00开到晚上23:55，每5分钟开一次奖，每天开奖179期。</li>
            <li>具体游戏规则如下:</li>
          </ul>

          <ul>
            <li>
              <span class="label">1.正码</span>
            </li>
            <li class="stress">投注的1个号码与当期摇出的20个号码中的任1个号码相同，则中奖</li>
          </ul>
          <ul>
            <li>
              <span class="label">2.总和：</span>以所有开出的全部20个号码加起来的和值来判定
            </li>
            <li class="stress">总和大/小：20个号码加总的和值大于810，为和大；20个号码加总的和值小于810，则为和小。</li>
            <li class="stress">总和单/双：20个号码加总的和值为单，叫做和单；20个号码加总的和值为双，叫做和双。</li>
            <li
              class="stress"
            >总和810：20个号码加总的和值等于810，叫和值810。(当和值等于810则大、小、单、双退回本金)举例：开奖号码为1，2，3，4，5，6，7，8，9，10，11，12，13，14，15，16，17，18，19，20；那么此20个开奖号码的和值总和为210，则为小，为双。则投注小和双者中奖。投注大、单、和值810者不中奖。</li>
          </ul>
          <ul>
            <li>
              <span class="label">3.总和过关：</span>开出的20个号码的总和的游戏，分为「大单」，「小单」，「大双」和「小双」。
            </li>
            <li class="stress">总和大于810为「总数大」,小于810为「总数小」。</li>
            <li class="stress">总和为双数叫「双」，单数叫「单」。</li>
            <li class="stress">通过大小和单双组合产生「大单」，「小单」，「大双」和「小双」四种结果。</li>
            <li class="stress">总和等于810，则视为和局。</li>
            <li
              class="stress"
            >举例：开奖号码为01、04、05、10、11、13、20、27、30、32、33、36、40、47、54、59、61、64、67、79，总和是693，总和小于810，并且是单数，则为「小单」。下注「小单」为赢，反之则输。</li>
          </ul>
          <ul>
            <li>
              <span class="label">4.前后和：</span>开奖号码1至40为前盘号码，41至80为后盘号码。
            </li>
            <li class="stress">开出的20个号码中：如前盘号码（1-40）在此局开出号码数目占多数时，此局为：前(多)。</li>
            <li class="stress">后盘号码（41-80）在此局开出号码数目占多数时，此局为:后(多)。</li>
            <li class="stress">通前盘号码（1－40）和后盘号码（41-80）在此局开出的数目相同时（各10个数字），此局为：前后(和)。</li>
            <li class="stress">举例：此局开出1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20. 此局为：前(多)。</li>
            <li
              class="stress"
            >举例：此局开出41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60 此局为：后(多)。</li>
            <li class="stress">举例：此局开出 1,2,3,4,5,6,7,8,9,10,41,42,43,44,45,46,47,48,49,50 此局为：前后(和)。</li>
          </ul>
          <ul>
            <li>
              <span class="label">5.单双和</span>
            </li>
            <li class="stress">
              开奖号码中1，3，5，7，…，75，77，79为单数号码，2，4，6，8，……，76，78，80为双数号码。当期开出的20个中奖号码中，如单数号码数目占多数时（超过10个），则为单(多)，投注单(多)中奖；双数号码占多数时（超过10个），则为双(多)，投注双(多)中奖；如果单数和双数号码数目相同时（均为
              10个），则为单双(和)，投注单双(和)者中奖。
            </li>
            <li
              class="stress"
            >举例：此期开出1，3，5，7，9，11，13，15，17，19，21，22，24，26，28，30，32，34，46，68， 其中单数11个双数9个，此期为：单(多)。</li>
            <li
              class="stress"
            >举例：此期开出2，4，6，8，10，12，14，16，44，48，66，68，25，27，31，35，37，39，41，55， 其中双数12个单数8个，此期为：双(多)。</li>
            <li
              class="stress"
            >举例：此期开出2，4，6，8，10，12，14，16，18，20，41，43，45，47，49，51，53，55，57，59， 其中单数10个双数10个，此期为：单双(和)。</li>
          </ul>
          <ul>
            <li>
              <span class="label">6.五行</span>
            </li>
            <li
              class="stress"
            >开出的20个号码的总和分在5个段，以金、木、水、火、土命名：金（210～695）、木（696～763）、水（764～855）、火（856～923）和土（924～1410）。</li>
            <li class="stress">
              举例：开奖号码为01、04、05、10、11、13、20、27、30、32、33、36、40、47、54、59、61、64、67、79，总和是693，
              <br />则总分数在210－695段内，则开出的是「金」。下注「金」为赢，反之则输。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'gd11x5'" id="GAME_gd11x5_PAGE">
          <h2>{{openResult['gd11x5'].name}}规则说明</h2>
          <ul>
            <li>
              <span class="label">以下所有投注皆含本金。</span>
            </li>
            <li>「{{openResult['gd11x5'].name}}」是由国家体育总局发行，体育彩票管理中心承销，北京时间（GMT+8）每日早上9:30至晚上23:10；每日共开奖 42期、每 20 分钟开奖 1 次。</li>
          </ul>
          <ul>
            <li>
              <span class="title">具体游戏规则如下：</span>
            </li>
            <li>
              <span class="label">1.【单码】- 指第一球、第二球、第三球、第四球、第五球出现的顺序与号码为派彩依据。</span>
            </li>
            <li
              class="stress"
            >单号：如现场滚球第一个开奖号码为10号，投注第一球为10号则视为中奖，其它号码视为不中奖 大小：开出的号码大于或等于6为大，小于或等于5为小，开出11为和 (不计算输赢)</li>
            <li class="stress">单双：号码为双数叫双，如2、8；号码为单数叫单，如5、9；开出11为和 (不计算输赢)。</li>
            <li>
              <span class="label">2.【总和】-以全部开出的5个号码，加起来的总和来判定。</span>
            </li>
            <li class="stress">总和大小: 所有开奖号码数字加总值大于30为和大；总和值小于30为和小；若总和值等于30为和 (不计算输赢)。</li>
            <li class="stress">总和单双: 所有开奖号码数字加总值为单数叫和单，如11、31；加总值为双数叫和双，如42、30。</li>
            <li class="stress">总和尾数大小: 所有开奖号码数字加总值的尾数，大于或等于5为尾大，小于或等于4为尾小。</li>
          </ul>
          <ul>
            <li>
              <span class="label">3.【龙虎】</span>
            </li>
            <li class="stress">龙：第一球开奖号码大于第五球开奖号码，如第一球开出10，第五球开出7。</li>
            <li class="stress">虎：第一球开奖号码小于第五球开奖号码，如第一球开出3，第五球开出7。</li>
          </ul>
          <ul>
            <li>
              <span class="label">4.选号- 选号玩法是由1~11号中，选出1~5个号码为一投注组合来进行投注。</span>
            </li>
            <li class="stress">一中一: 投注1个号码与当期开奖的5个号码中任1个号码相同，视为中奖。</li>
            <li class="stress">任选二: 投注2个号码与当期开奖的5个号码中任2个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选三: 投注3个号码与当期开奖的5个号码中任3个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选四: 投注4个号码与当期开奖的5个号码中任4个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选五: 投注5个号码与当期开奖的5个号码中5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选六: 投注6个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选七: 投注7个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选八: 投注8个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">组选前二: 投注的2个号码与当期顺序开出的5个号码中的前2个号码相同，视为中奖。</li>
            <li class="stress">组选前三: 投注的3个号码与当期顺序开出的5个号码中的前3个号码相同，视为中奖。</li>
            <li class="stress">直选前二: 投注的2个号码与当期顺序开出的5个号码中的前2个号码相同且顺序一致，视为中奖。</li>
            <li class="stress">直选前三: 投注的3个号码与当期顺序开出的5个号码中的前3个号码相同且顺序一致，视为中奖。</li>
          </ul>
        </div>

        <div v-if="showCode == 'sd11x5'" id="GAME_sd11x5_PAGE">
          <h2>{{openResult['sd11x5'].name}}规则说明</h2>
          <ul>
            <li>
              <span class="label">以下所有投注皆含本金。</span>
            </li>
            <li>「{{openResult['sd11x5'].name}}」是由国家体育总局发行，体育彩票管理中心承销，北京时间（GMT+8）每日早上9点02分至晚上11点02分；每日共开奖 43期、每 20 分钟开奖 1 次。</li>
          </ul>
          <ul>
            <li>
              <span class="title">具体游戏规则如下：</span>
            </li>
            <li>
              <span class="label">1.【单码】- 指第一球、第二球、第三球、第四球、第五球出现的顺序与号码为派彩依据。</span>
            </li>
            <li
              class="stress"
            >单号：如现场滚球第一个开奖号码为10号，投注第一球为10号则视为中奖，其它号码视为不中奖 大小：开出的号码大于或等于6为大，小于或等于5为小，开出11为和 (不计算输赢)</li>
            <li class="stress">单双：号码为双数叫双，如2、8；号码为单数叫单，如5、9；开出11为和 (不计算输赢)。</li>
            <li>
              <span class="label">2.【总和】-以全部开出的5个号码，加起来的总和来判定。</span>
            </li>
            <li class="stress">总和大小: 所有开奖号码数字加总值大于30为和大；总和值小于30为和小；若总和值等于30为和 (不计算输赢)。</li>
            <li class="stress">总和单双: 所有开奖号码数字加总值为单数叫和单，如11、31；加总值为双数叫和双，如42、30。</li>
            <li class="stress">总和尾数大小: 所有开奖号码数字加总值的尾数，大于或等于5为尾大，小于或等于4为尾小。</li>
          </ul>
          <ul>
            <li>
              <span class="label">3.【龙虎】</span>
            </li>
            <li class="stress">龙：第一球开奖号码大于第五球开奖号码，如第一球开出10，第五球开出7。</li>
            <li class="stress">虎：第一球开奖号码小于第五球开奖号码，如第一球开出3，第五球开出7。</li>
          </ul>
          <ul>
            <li>
              <span class="label">4.选号- 选号玩法是由1~11号中，选出1~5个号码为一投注组合来进行投注。</span>
            </li>
            <li class="stress">一中一: 投注1个号码与当期开奖的5个号码中任1个号码相同，视为中奖。</li>
            <li class="stress">任选二: 投注2个号码与当期开奖的5个号码中任2个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选三: 投注3个号码与当期开奖的5个号码中任3个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选四: 投注4个号码与当期开奖的5个号码中任4个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选五: 投注5个号码与当期开奖的5个号码中5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选六: 投注6个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选七: 投注7个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选八: 投注8个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">组选前二: 投注的2个号码与当期顺序开出的5个号码中的前2个号码相同，视为中奖。</li>
            <li class="stress">组选前三: 投注的3个号码与当期顺序开出的5个号码中的前3个号码相同，视为中奖。</li>
            <li class="stress">直选前二: 投注的2个号码与当期顺序开出的5个号码中的前2个号码相同且顺序一致，视为中奖。</li>
            <li class="stress">直选前三: 投注的3个号码与当期顺序开出的5个号码中的前3个号码相同且顺序一致，视为中奖。</li>
          </ul>
        </div>

        <div v-if="showCode == 'jx11x5'" id="GAME_jx11x5_PAGE">
          <h2>{{openResult['jx11x5'].name}}规则说明</h2>
          <ul>
            <li>
              <span class="label">以下所有投注皆含本金。</span>
            </li>
            <li>「{{openResult['jx11x5'].name}}」是由国家体育总局发行，体育彩票管理中心承销，北京时间（GMT+8）每日早上9点30分至晚上11:10点；每日共开奖 42期、每 20 分钟开奖 1 次。</li>
          </ul>
          <ul>
            <li>
              <span class="title">具体游戏规则如下：</span>
            </li>
            <li>
              <span class="label">1.【单码】- 指第一球、第二球、第三球、第四球、第五球出现的顺序与号码为派彩依据。</span>
            </li>
            <li
              class="stress"
            >单号：如现场滚球第一个开奖号码为10号，投注第一球为10号则视为中奖，其它号码视为不中奖 大小：开出的号码大于或等于6为大，小于或等于5为小，开出11为和 (不计算输赢)</li>
            <li class="stress">单双：号码为双数叫双，如2、8；号码为单数叫单，如5、9；开出11为和 (不计算输赢)。</li>
            <li>
              <span class="label">2.【总和】-以全部开出的5个号码，加起来的总和来判定。</span>
            </li>
            <li class="stress">总和大小: 所有开奖号码数字加总值大于30为和大；总和值小于30为和小；若总和值等于30为和 (不计算输赢)。</li>
            <li class="stress">总和单双: 所有开奖号码数字加总值为单数叫和单，如11、31；加总值为双数叫和双，如42、30。</li>
            <li class="stress">总和尾数大小: 所有开奖号码数字加总值的尾数，大于或等于5为尾大，小于或等于4为尾小。</li>
          </ul>
          <ul>
            <li>
              <span class="label">3.【龙虎】</span>
            </li>
            <li class="stress">龙：第一球开奖号码大于第五球开奖号码，如第一球开出10，第五球开出7。</li>
            <li class="stress">虎：第一球开奖号码小于第五球开奖号码，如第一球开出3，第五球开出7。</li>
          </ul>
          <ul>
            <li>
              <span class="label">4.选号- 选号玩法是由1~11号中，选出1~5个号码为一投注组合来进行投注。</span>
            </li>
            <li class="stress">一中一: 投注1个号码与当期开奖的5个号码中任1个号码相同，视为中奖。</li>
            <li class="stress">任选二: 投注2个号码与当期开奖的5个号码中任2个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选三: 投注3个号码与当期开奖的5个号码中任3个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选四: 投注4个号码与当期开奖的5个号码中任4个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选五: 投注5个号码与当期开奖的5个号码中5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选六: 投注6个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选七: 投注7个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">任选八: 投注8个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
            <li class="stress">组选前二: 投注的2个号码与当期顺序开出的5个号码中的前2个号码相同，视为中奖。</li>
            <li class="stress">组选前三: 投注的3个号码与当期顺序开出的5个号码中的前3个号码相同，视为中奖。</li>
            <li class="stress">直选前二: 投注的2个号码与当期顺序开出的5个号码中的前2个号码相同且顺序一致，视为中奖。</li>
            <li class="stress">直选前三: 投注的3个号码与当期顺序开出的5个号码中的前3个号码相同且顺序一致，视为中奖。</li>
          </ul>
        </div>

        <div v-if="showCode == 'pcdd'" id="GAME_pcdd_PAGE">
          <h2>{{openResult['pcdd'].name}}规则说明</h2>
          <ul>
            <li>
              <span class="label">以下所有投注皆含本金。</span>
            </li>
            <li>「{{openResult['pcdd'].name}}」按{{openResult['bjkl8'] ? openResult['bjkl8'].name : '北京快乐8'}}的开奖结果为基础</li>
            <li>{{openResult['bjkl8'] ? openResult['bjkl8'].name : '北京快乐8'}}开奖结果，每日179期，每天9:00 - 23:55，每5分钟公布一次{{openResult['bjkl8'] ? openResult['bjkl8'].name : '北京快乐8'}}开奖结果。</li>
            <li>排序后,分别按号码第 1~6 , 7~12 , 13~18 分为【1】【2】【3】三个区；</li>
            <li>「把每个区的数字分别相加：三个数值相加求余即为幸运28最终的开奖结果。</li>
            <li>例如{{openResult['bjkl8'] ? openResult['bjkl8'].name : '北京快乐8'}}开奖结果为：01,02,04,08,15,16, 25,31,40,41,43,47, 55,56,59,66,69,74, 78,79</li>
            <li>开奖结果即为：6,7,9;</li>
            <li>每个号码详细计算步骤：</li>
            <li>第一个号码：1+2+4+8+15+16 = 46%10 = 6</li>
            <li>第二个号码：25+31+40+41+43+47 = 227%10 = 7</li>
            <li>第三个号码： 55+56+59+66+69+74 = 379%10 = 9</li>
          </ul>
          <ul>
            <li>
              <span class="title">具体游戏规则如下：</span>
            </li>
            <li>
              <span class="label">大：三个位置的数值相加和大于等于14,15,16,17,18,19,20,21,22,23,24,25,26,27为大。</span>
            </li>
            <li>
              <span class="label">小：三个位置的数值相加和小于等于00,01,02,03,04,05,06,07,08,09,10,11,12,13为小。</span>
            </li>
            <li>
              <span class="label">单：三个位置的数值相加和为单就为单。</span>
            </li>
            <li>
              <span class="label">双：三个位置的数值相加和为双就为双。</span>
            </li>
            <li>
              <span class="label">数字14，16，~26为大双 数字0，2，4，~12为小双。</span>
            </li>
            <li>
              <span class="label">数字15，17，~27为大单 数字1，3，5，~13为小单。</span>
            </li>
            <li>
              <span class="label">开13，14组合回本，举例 买100元小单开13就回本金买100元大双开14就回本金。</span>
            </li>
            <li>
              <span class="label">极大（三个数值和）：23,24,25,26,27为极大。</span>
            </li>
            <li>
              <span class="label">极小（三个数值和）：00,01,02,03,04为极小。</span>
            </li>
            <li>
              <span class="label">红波（三个数值和）：03,06,09,12,15,18,21,24为红波。</span>
            </li>
            <li>
              <span class="label">绿波（三个数值和）：01,04,07,10,16,19,22,25为绿波。</span>
            </li>
            <li>
              <span class="label">蓝波（三个数值和）：02,05,08,11,17,20,23,26为蓝波。</span>
            </li>
            <li>
              <span class="label">注:当开奖结果为：0,13,14,27(所有买的波色皆输)视为全部不中奖！</span>
            </li>
            <li>
              <span class="label">豹子：當期開出三個數字相同即為豹子</span>
            </li>
            <li>
              <span class="label">特码（三个数值和）：單選取一個數字投注。</span>
            </li>
          </ul>
        </div>

        <!-- {{openResult['hk6'].name}}-->
        <div v-if="showCode == 'hk6'" id="GAME_hk6_PAGE">
          <h2>{{openResult['hk6'].name}}规则说明</h2>
          <ul>
            <li>以下所有投注皆含本金。</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.特码</span>
            </li>
            <li class="stress">{{openResult['hk6'].name}}公司当期开出的最後一码为特码。</li>
          </ul>
          <ul>
            <li>
              <span class="label">2.两面</span>
            </li>
            <li>
              <span class="label">特码大小</span>
            </li>
            <li class="stress">特小：开出的特码，(01~24)小于或等于24。</li>
            <li class="stress">特大：开出的特码，(25~48)小于或等于48。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">特码单双</span>
            </li>
            <li class="stress">特双：特码为双数，如18、20、34、42。</li>
            <li class="stress">特单：特码为单数，如01，11，35，47。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">特码合数大小</span>
            </li>
            <li class="stress">特合大：以特码的个位和十位数字之和来判定胜负，介于7-12为合大。例如：07、34、48。</li>
            <li class="stress">特合小：以特码的个位和十位数字之和来判定胜负，介于1-6为合小。例如：01、24、33。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">特码合数单双</span>
            </li>
            <li class="stress">特合双：指开出特码的个位加上十位之和为‘双数’，如02、11、33、44。</li>
            <li class="stress">特合单：指开出特码的个位加上十位之和为‘单数’，如01、14、36、47。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">特码：特天肖，特地肖</span>
            </li>
            <li class="stress">开出的特码属于十二生肖中的牛、兔、龙、马、猴、猪号码为特天肖。</li>
            <li class="stress">开出的特码属于十二生肖中的鼠、虎、蛇、羊、鸡、狗号码为特地肖。</li>
            <li class="stress">开出49则视为和局。</li>

            <li>
              <span class="label">特码：特前肖，特后肖</span>
            </li>
            <li class="stress">开出的特码属于十二生肖中的鼠、牛、虎、兔、龙、蛇号码为特前肖。</li>
            <li class="stress">开出的特码属于十二生肖中的马、羊、猴、鸡、狗、猪号码为特后肖。</li>
            <li class="stress">开出49则视为和局。</li>

            <li>
              <span class="label">特码：特家肖，特野肖</span>
            </li>
            <li class="stress">开出的特码属于十二生肖中的牛、马、羊、鸡、狗、猪号码为家禽。</li>
            <li class="stress">开出的特码属于十二生肖中的鼠、虎、龙、蛇、兔、猴号码为野兽。</li>
            <li class="stress">开出49则视为和局。</li>

            <li>
              <span class="label">特码尾数大小</span>
            </li>
            <li class="stress">特大尾：5尾~9尾为大，如05、18、19。</li>
            <li class="stress">特小尾：0尾~4尾为小，如01、32、44。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">总和单双</span>
            </li>
            <li class="stress">总和单：所以七个开奖号码的分数总和是‘单数’，如分数总和是133、197。</li>
            <li class="stress">总和双：所以七个开奖号码的分数总和是‘双数’，如分数总和是120、188。</li>

            <li>
              <span class="label">总和大小</span>
            </li>
            <li class="stress">总和大：所以七个开奖号码的分数总和大于或等于175。</li>
            <li class="stress">总和小：所以七个开奖号码的分数总和小于或等于174。</li>

            <li>
              <span class="label">特码半特</span>
            </li>
            <li class="stress">以特码大小与特码单双游戏为一个投注组合；当期特码开出符合投注组合，即视为中奖；若当期特码开出49号，其余情形视为不中奖。</li>
            <li class="stress">特大单：25、27、29、31、33、35、37、39、41、43、45、47。</li>
            <li class="stress">特大双：26、28、30、32、34、36、38、40、42、44、46、48。</li>
            <li class="stress">特小单：01、03、05、07、09、11、13、15、17、19、21、23。</li>
            <li class="stress">特小双：02、04、06、08、10、12、14、16、18、20、22、24。</li>
            <li class="stress">和局：特码为49时。</li>
          </ul>
          <ul>
            <li>
              <span class="label">3.色波半波</span>
            </li>
            <li
              class="stress"
            >{{openResult['hk6'].name}}49个号码球分别有红、蓝、绿三种颜色，以特码开出的颜色和投注的颜色相同视为中奖，颜色代表如下:</li>
            <li class="stress">红波：01 ,02 ,07 ,08 ,12 ,13 ,18 ,19 ,23 ,24 ,29 ,30 ,34 ,35 ,40 ,45 ,46</li>
            <li class="stress">蓝波：03 ,04 ,09 ,10 ,14 ,15 ,20 ,25 ,26 ,31 ,36 ,37 ,41 ,42 ,47 ,48</li>
            <li class="stress">绿波：05 ,06 ,11 ,16 ,17 ,21 ,22 ,27 ,28 ,32 ,33 ,38 ,39 ,43 ,44 ,49</li>
            <li class="stress">
              半波：以特码色波和红单，红双，红大，红小，蓝单，蓝双，蓝大，蓝小，绿单，绿双，绿大，绿小为一个投注组合，当期特码开出符合投注组合，即视为中奖；若当期特码开出49号则视为和局；其余情形视为不中奖。
              半半波：以特码色波和红大单，红大双，红小单，红小双，蓝大单，蓝大双，蓝小单，蓝小双，绿大单，绿大双，绿小单，绿小双为一个投注组合，当期特码开出符合投注组合，即视为中奖；若当期特码开出49号则视为和局；其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.特肖头尾数</span>
            </li>
            <li>
              <span class="label">特码生肖</span>
            </li>
            <li class="stress">生肖顺序为 鼠 >牛 >虎 >兔 >龙 >蛇 >马 >羊 >猴 >鸡 >狗 >猪 。</li>
            <li class="stress">如今年是猪年，就以猪为开始，依顺序将49个号码分为12个生肖『如下』</li>
            <li class="stress">猪: 01、13、25、37、49</li>
            <li class="stress">狗: 02、14、26、38</li>
            <li class="stress">鸡: 03、15、27、39</li>
            <li class="stress">猴: 04、16、28、40</li>
            <li class="stress">羊: 05、17、29、41</li>
            <li class="stress">马: 06、18、30、42</li>
            <li class="stress">蛇: 07、19、31、43</li>
            <li class="stress">龙: 08、20、32、44</li>
            <li class="stress">兔: 09、21、33、45</li>
            <li class="stress">虎: 10、22、34、46</li>
            <li class="stress">牛: 11、23、35、47</li>
            <li class="stress">鼠: 12、24、36、48</li>
            <li class="stress">若当期特别号，落在下注生肖范围内，视为中奖 。</li>

            <li>
              <span class="label">特码头数：是指特码属头数的号码</span>
            </li>
            <li class="stress">"0"头：01、02、03、04、05、06、07、08、09</li>
            <li class="stress">"1"头：10、11、12、13、14、15、16、17、18、19</li>
            <li class="stress">"2"头：20、21、22、23、24、25、26、27、28、29</li>
            <li class="stress">"3"头：30、31、32、33、34、35、36、37、38、39</li>
            <li class="stress">"4"头：40、41、42、43、44、45、46、47、48、49</li>
            <li class="stress">例如：开奖结果特别号码为21则2头为中奖，其他头数都不中。</li>

            <li>
              <span class="label">特码尾数：是指特码属尾数的号码。</span>
            </li>
            <li class="stress">"0"尾：10、20、30、40</li>
            <li class="stress">"1"尾：01、11、21、31、41</li>
            <li class="stress">"2"尾：02、12、22、32、42</li>
            <li class="stress">"3"尾：03、13、23、33、43</li>
            <li class="stress">"4"尾：04、14、24、34、44</li>
            <li class="stress">"5"尾：05、15、25、35、45</li>
            <li class="stress">"6"尾：06、16、26、36、46</li>
            <li class="stress">"7"尾：07、17、27、37、47</li>
            <li class="stress">"8"尾：08、18、28、38、48</li>
            <li class="stress">"9"尾：09、19、29、39、49</li>
            <li class="stress">例如：开奖结果特别号码为21则1尾数为中奖，其他尾数都不中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">5.合肖</span>
            </li>
            <li
              class="stress"
            >挑选2-11个生肖『排列如同生肖』为一个组合，并选择开奖号码的特码是否在此组合内『49号除外』，即视为中奖；若当期特码开出49号，则所有组合皆视为和局。</li>
          </ul>

          <ul>
            <li>
              <span class="label">6.正码</span>
            </li>
            <li
              class="stress"
            >{{openResult['hk6'].name}}公司当期开出之前6个号码叫正码。每一个号码为一投注组合，假如投注号码为开奖号码之正码，视为中奖，其余情形视为不中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">7.正码特</span>
            </li>
            <li class="stress">正码特是指 正1特、正2特、正3特、正4特、正5特、正6特。</li>
            <li class="stress">其下注的正码特号与现场摇珠开出之正码其开奖顺序及开奖号码相同，视为中奖。</li>
            <li class="stress">如现场摇珠第一个正码开奖为49号，下注第一个正码特为49则视为中奖，其它号码视为不中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">8.正码1-6</span>
            </li>
            <li
              class="stress"
            >{{openResult['hk6'].name}}公司当期开出之前6个号码叫正码。第一时间出来的叫正码1，依次为正码2、正码3┅┅ 正码6(并不以号码大小排序)。</li>
            <li class="stress">大小:以指定出现正码的位置与号码大于或等于25为大，小于或等于24为小，开出49为和。</li>
            <li class="stress">单双:以指定出现正码的位置与号码为单数或双数下注，开出49为和</li>
            <li class="stress">合数大小:以指定出现正码的位置与号码个位和十位数字总和来判断胜负，和数大于或等于7为大，小于或等于6为小，开出49号为和。</li>
            <li class="stress">合数单双:以指定出现正码的位置与号码个位和十位数字总和来判断单双，开出49号为和。</li>
            <li
              class="stress"
            >尾数大小:以指定出现正码的位置与号码尾数大小下注，若0尾~4尾为小、5尾~9尾为大。如01、32、44为正尾小；如05、18、19为正尾大，开出49号为和。</li>
            <li class="stress">色波:以指定出现正码的位置的球色下注，开奖之球色与下注之颜色相同时，视为中奖，其余情形视为不中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">9.五行</span>
            </li>
            <li class="stress">挑选一个五行选项为一个组合，若开奖号码的特码在此组合内，即视为中奖；若开奖号码的特码亦不在此组合内，即视为不中奖；</li>
            <li class="stress">金: 05、06、19、20、27、28、35、36、49</li>
            <li class="stress">木: 01、02、09、10、17、18、31、32、39、40、47、48</li>
            <li class="stress">水: 07、08、15、16、23、24、37、38、45、46</li>
            <li class="stress">火: 03、04、11、12、25、26、33、34、41、42</li>
            <li class="stress">土: 13、14、21、22、29、30、43、44</li>
          </ul>

          <ul>
            <li>
              <span class="label">10.一肖总肖平特尾数</span>
            </li>
            <li>
              <span class="label">一肖</span>
            </li>
            <li class="stress">指开奖的7个号码中含有所属生肖的一个或多个号码，但派彩只派一次，即不论同生肖号码出现一个或多个号码都只派一次。</li>
            <li class="stress">猪: 01、13、25、37、49</li>
            <li class="stress">狗: 02、14、26、38</li>
            <li class="stress">鸡: 03、15、27、39</li>
            <li class="stress">猴: 04、16、28、40</li>
            <li class="stress">羊: 05、17、29、41</li>
            <li class="stress">马: 06、18、30、42</li>
            <li class="stress">蛇: 07、19、31、43</li>
            <li class="stress">龙: 08、20、32、44</li>
            <li class="stress">兔: 09、21、33、45</li>
            <li class="stress">虎: 10、22、34、46</li>
            <li class="stress">牛: 11、23、35、47</li>
            <li class="stress">鼠: 12、24、36、48</li>
            <li class="stress">只要当期号码 (所有正码与最后开出的特码)，落在下注生肖范围内，则视为中奖。(请注意：49亦算输赢，不为和)。</li>

            <li>
              <span class="label">尾数</span>
            </li>
            <li class="stress">指开奖的7个号码中含有所属尾数的一个或多个号码，但派彩指派一次，即不论同尾数号码出现一个或多个号码都指派一次。</li>
            <li class="stress">"0"尾：10、20、30、40</li>
            <li class="stress">"1"尾：01、11、21、31、41</li>
            <li class="stress">"2"尾：02、12、22、32、42</li>
            <li class="stress">"3"尾：03、13、23、33、43</li>
            <li class="stress">"4"尾：04、14、24、34、44</li>
            <li class="stress">"5"尾：05、15、25、35、45</li>
            <li class="stress">"6"尾：06、16、26、36、46</li>
            <li class="stress">"7"尾：07、17、27、37、47</li>
            <li class="stress">"8"尾：08、18、28、38、48</li>
            <li class="stress">"9"尾：09、19、29、39、49</li>
            <li class="stress">例如：开奖结果正码号码为11、31、42、44、35、32特别号码为21则1尾2尾4尾5尾都为中奖，其他尾数都不中奖。</li>

            <li>
              <span class="label">总肖</span>
            </li>
            <li class="stress">
              当期号码(所有正码与最後开出的特码)开出的不同生肖总数，与所投注之预计开出之生肖总数合(不用指定特定生肖)，则视为中奖，其余情形视为不中奖。例如：如果当期号码为19、24、12、34、40、39
              特别号：49，总计六个生肖，若选总肖【6】则为中奖(请注意：49号亦算输赢，不为和）。
            </li>
          </ul>

          <ul>
            <li>
              <span class="label">11.正肖七色波</span>
            </li>
            <li>
              <span class="label">正肖</span>
            </li>
            <li
              class="stress"
            >以开出的6个正码做游戏，只要有1个落在下注生肖范围内，视为中奖。如超过1个正码落在下注生肖范围内 ，派彩将倍增！如：下注＄100.-正肖當年生肖倍率1.8。</li>
            <li class="stress">6个正码开出01，派彩为$80</li>
            <li class="stress">6个正码开出01、13，派彩为$160</li>
            <li class="stress">6个正码开出01、13、25，派彩为$240</li>
            <li class="stress">6个正码开出01、13、25、37，派彩为$320</li>
            <li class="stress">6个正码开出01、13、25、37、49，派彩为$400（请注意：49亦算输赢，不为和）</li>

            <li>
              <span class="label">七色波</span>
            </li>
            <li class="stress">以开出的7个色波，那种颜色最多为中奖。 开出的6个正码各以1个色波计，特别号以1.5个色波计。而以下3种结果视为和局。</li>
            <li class="stress">1： 6个正码开出3蓝3绿，而特别码是1.5红</li>
            <li class="stress">2： 6个正码开出3蓝3红，而特别码是1.5绿</li>
            <li class="stress">3： 6个正码开出3绿3红，而特别码是1.5蓝</li>
            <li class="stress">如果出现和局，所有投注红，绿，蓝七色波的金额将全数退回，会员也可投注和局</li>
          </ul>

          <ul>
            <li>
              <span class="label">12.自选不中</span>
            </li>
            <li
              class="stress"
            >挑选5~11个号码为一个组合，当期号码 (所有正码与最后开出的特码) 皆没有坐落于投注时所挑选之号码组合内，则视为中奖，若是有任何一个当期号码开在所挑选的号码组合情形视为不中奖。</li>
            <li class="stress">例如当期号码为19、24、17、34、40、39 ,特别号49，所挑选5个号码，若所挑选的号码内皆没有坐落于当期号码，则为中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">13.连肖连尾</span>
            </li>
            <li
              class="stress"
            >连肖:生肖所对应的号码和特码生肖项目的一样；一个生肖对应多个号码，不论同生肖的号码出现一个或多个，派彩只派一次。每个生肖都有自己的赔率，下注组合的总赔率，取该组合生肖的最低赔率为总赔率。（请注意49亦算输赢）。</li>
            <li class="stress">
              二连肖:以每二个生肖为一注，每注的每个生肖中如果都有当期开奖的所有7个号码中对应的生肖，则视为中奖。如果其中一个或多个生肖没有当期开奖的所有7个号码对应的生肖，则视为不中奖。例如生肖：蛇，马，是一注，开奖的
              生肖是：马，牛，羊，鸡，狗，猪，鼠，那就是不中奖；再例如生肖：蛇，马，是一注，开奖的生肖是：蛇，马，牛，羊，鸡，狗，猪，那就是中奖。
            </li>
            <li
              class="stress"
            >三连肖:以每三个生肖为一注，每注的每个生肖中如果都有当期开奖的所有7个号码中对应的生肖，则视为中奖。如果其中一个或多个生肖没有当期开奖的所有7个号码对应的生肖，则视为不中奖。例如生肖：蛇，马，牛，是一注，开奖的生肖是：马，牛，羊，鸡，狗，猪，鼠，那就是不中奖；再例如生肖：蛇，马，牛，是一注，开奖的生肖是：蛇，马，牛，羊，鸡，狗，猪，那就是中奖。</li>
            <li class="stress">
              四连肖:以每四个生肖为一注，每注的每个生肖中如果都有当期开奖的所有7个号码中对应的生肖，则视为中奖。如果其中一个或多个生肖没有当期开奖的所有7个号码对应的生肖，则视为不中奖。例如生肖：蛇，马，牛，羊，是一注，开奖的生肖是：马，牛，羊，鸡，狗，猪，鼠，
              那就是不中奖；再例如生肖：蛇，马，牛，羊，是一注，开奖的生肖是：蛇，马，牛，羊，鸡，狗，猪，那就是中奖。
            </li>
            <li class="stress">
              五连肖:以每五个生肖为一注，每注的每个生肖中如果都有当期开奖的所有7个号码中对应的生肖，则视为中奖。如果其中一个或多个生肖没有当期开奖的所有7个号
              码对应的生肖，则视为不中奖。例如生肖：蛇，马，牛，羊，鸡，是一注，开奖的生肖是：马，牛，羊，鸡，狗，猪，那就是不中奖；再例如生肖：蛇，马，牛，羊，鸡，是一注，开奖的生肖是：蛇，马，牛，羊，鸡，狗，猪，那就是中奖。
            </li>
            <li
              class="stress"
            >连尾:尾数所对应的号码和尾数项目的一样；一个尾数对应多个号码，不论同尾数的号码出现一个或多个，派彩只派一次。每个尾数都有自己的赔率，下注组合的总赔率，取该组合尾数的最低赔率为总赔率。（请注意49亦算输赢）。</li>
            <li class="stress">
              二连尾:以每二个尾数为一注，每注的每个尾数中如果都有当期开奖的所有7个号码中对应的尾数，则视为中奖。如果其中一个或多个尾数没有当期开奖的所有7个号码对应的尾数，则视为不中奖。例如：尾1、尾2，是一注，开奖的号码是：2、3、4、5、6、7、8，那就是不中奖；再例如：尾1、尾2，是一注，开奖的号码是：1、2、3、4、5、
              6、7，那就是中奖。
            </li>
            <li
              class="stress"
            >三连尾:以每三个尾数为一注，每注的每个尾数中如果都有当期开奖的所有7个号码中对应的尾数，则视为中奖。如果其中一个或多个尾数没有当期开奖的所有7个号码对应的尾数，则视为不中奖。例如：尾1、尾2、尾3，是一注，开奖的号码是：2、3、4、5、6、7、8，那就是不中奖；再例如：尾1、尾2、尾3，是一注，开奖的号码是：1、2、3、4、5、6、7，那就是中奖。</li>
            <li class="stress">
              四连尾:以每四个尾数为一注，每注的每个尾数中如果都有当期开奖的所有7个号码中对应的尾数，则视为中奖。如果其中一个或多个尾数没有当期开奖的所有7个号码对应的尾数，则视为不中奖。例如：尾1、尾2、尾3、尾4，是一注，开奖的号码是：2、3、4、5、6、7、8，
              那就是不中奖；再例如：尾1、尾2、尾3、尾4，是一注，开奖的号码是：1、2、3、4、5、6、7，那就是中奖。
            </li>
            <li class="stress">
              五连尾:以每五个尾数为一注，每注的每个尾数中如果都有当期开奖的所有7个号码中对应的尾数，则视为中奖。如果其中一个或多个尾数没有当期开奖的所有7个号码对应的尾数，则视为不中奖。例如：尾1、尾2、尾3、尾4、尾5，是一注，开奖的号码是：2、3、4、5、6、7、8，
              那就是不中奖；再例如：尾1、尾2、尾3、尾4、尾5，是一注，开奖的号码是：1、2、3、4、5、6、7，那就是中奖。
            </li>
          </ul>

          <ul>
            <li>
              <span class="label">14.连码</span>
            </li>
            <li class="stress">四全中：选择投注号码每四个为一组（四个或四个以上），兑奖号为正码，如四个号码都在开奖号码的正码里面，视为中奖，其他情形都视为不中奖。</li>
            <li class="stress">
              三全中：所投注的每三个号码为一组合，若三个号码都是开奖号码之正码，视为中奖，其余情形视为 不中奖。如06、07、08三个都是开奖号码之正码，视为中奖，如两个正码加上一个特别号
              码视为不中奖 。
            </li>
            <li class="stress">
              三中二：所投注的每三个号码为一组合，若其中2个是开奖号码中的正码，即为三中二，视为中奖；若3个都是开奖号码中的正码，即为三中二之中三，其余情形视为不中奖，如06、07、08
              为一组合，开奖号码中有06、07两个正码，没有08，即为三中二，按三中二赔付；如开奖 号码中有06、07、08三个正码，即为三中二之中三，按中三赔付；如出现1个或没有，视为不中奖 。
            </li>
            <li class="stress">二全中：所投注的每二个号码为一组合，二个号码都是开奖号码之正码，视为中奖，其余情形视为不 中奖（含一个正码加一个特别号码之情形）。</li>
            <li
              class="stress"
            >二中特：所投注的每二个号码为一组合，二个号码都是开奖号码之正码，叫二中特之中二；若其中一 个是正码，一个是特别号码，叫二中特之中特；其余情形视为不中奖 。</li>
            <li class="stress">特串：所投注的每二个号码为一组合，其中一个是正码，一个是特别号码，视为中奖，其余情形视为不中奖（含二个号码都是正码之情形）。</li>
          </ul>
        </div>

        <!-- 极速六合彩 -->
        <div v-if="showCode == 'xyhk6'" id="GAME_xyhk6_PAGE">
          <h2>{{openResult['xyhk6'].name}}规则说明</h2>
          <ul>
            <li>{{openResult['xyhk6'].name}}是引进欧洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨04:00，每300秒开一次奖,每天开奖247期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>以下所有投注皆含本金。</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.特码</span>
            </li>
            <li class="stress">{{openResult['xyhk6'].name}}公司当期开出的最後一码为特码。</li>
          </ul>
          <ul>
            <li>
              <span class="label">2.两面</span>
            </li>
            <li>
              <span class="label">特码大小</span>
            </li>
            <li class="stress">特小：开出的特码，(01~24)小于或等于24。</li>
            <li class="stress">特大：开出的特码，(25~48)小于或等于48。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">特码单双</span>
            </li>
            <li class="stress">特双：特码为双数，如18、20、34、42。</li>
            <li class="stress">特单：特码为单数，如01，11，35，47。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">特码合数大小</span>
            </li>
            <li class="stress">特合大：以特码的个位和十位数字之和来判定胜负，介于7-12为合大。例如：07、34、48。</li>
            <li class="stress">特合小：以特码的个位和十位数字之和来判定胜负，介于1-6为合小。例如：01、24、33。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">特码合数单双</span>
            </li>
            <li class="stress">特合双：指开出特码的个位加上十位之和为‘双数’，如02、11、33、44。</li>
            <li class="stress">特合单：指开出特码的个位加上十位之和为‘单数’，如01、14、36、47。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">特码：特天肖，特地肖</span>
            </li>
            <li class="stress">开出的特码属于十二生肖中的牛、兔、龙、马、猴、猪号码为特天肖。</li>
            <li class="stress">开出的特码属于十二生肖中的鼠、虎、蛇、羊、鸡、狗号码为特地肖。</li>
            <li class="stress">开出49则视为和局。</li>

            <li>
              <span class="label">特码：特前肖，特后肖</span>
            </li>
            <li class="stress">开出的特码属于十二生肖中的鼠、牛、虎、兔、龙、蛇号码为特前肖。</li>
            <li class="stress">开出的特码属于十二生肖中的马、羊、猴、鸡、狗、猪号码为特后肖。</li>
            <li class="stress">开出49则视为和局。</li>

            <li>
              <span class="label">特码：特家肖，特野肖</span>
            </li>
            <li class="stress">开出的特码属于十二生肖中的牛、马、羊、鸡、狗、猪号码为家禽。</li>
            <li class="stress">开出的特码属于十二生肖中的鼠、虎、龙、蛇、兔、猴号码为野兽。</li>
            <li class="stress">开出49则视为和局。</li>

            <li>
              <span class="label">特码尾数大小</span>
            </li>
            <li class="stress">特大尾：5尾~9尾为大，如05、18、19。</li>
            <li class="stress">特小尾：0尾~4尾为小，如01、32、44。</li>
            <li class="stress">和局：特码为49时。</li>

            <li>
              <span class="label">总和单双</span>
            </li>
            <li class="stress">总和单：所以七个开奖号码的分数总和是‘单数’，如分数总和是133、197。</li>
            <li class="stress">总和双：所以七个开奖号码的分数总和是‘双数’，如分数总和是120、188。</li>

            <li>
              <span class="label">总和大小</span>
            </li>
            <li class="stress">总和大：所以七个开奖号码的分数总和大于或等于175。</li>
            <li class="stress">总和小：所以七个开奖号码的分数总和小于或等于174。</li>

            <li>
              <span class="label">特码半特</span>
            </li>
            <li class="stress">以特码大小与特码单双游戏为一个投注组合；当期特码开出符合投注组合，即视为中奖；若当期特码开出49号，其余情形视为不中奖。</li>
            <li class="stress">特大单：25、27、29、31、33、35、37、39、41、43、45、47。</li>
            <li class="stress">特大双：26、28、30、32、34、36、38、40、42、44、46、48。</li>
            <li class="stress">特小单：01、03、05、07、09、11、13、15、17、19、21、23。</li>
            <li class="stress">特小双：02、04、06、08、10、12、14、16、18、20、22、24。</li>
            <li class="stress">和局：特码为49时。</li>
          </ul>
          <ul>
            <li>
              <span class="label">3.色波半波</span>
            </li>
            <li
              class="stress"
            >{{openResult['xyhk6'].name}}49个号码球分别有红、蓝、绿三种颜色，以特码开出的颜色和投注的颜色相同视为中奖，颜色代表如下:</li>
            <li class="stress">红波：01 ,02 ,07 ,08 ,12 ,13 ,18 ,19 ,23 ,24 ,29 ,30 ,34 ,35 ,40 ,45 ,46</li>
            <li class="stress">蓝波：03 ,04 ,09 ,10 ,14 ,15 ,20 ,25 ,26 ,31 ,36 ,37 ,41 ,42 ,47 ,48</li>
            <li class="stress">绿波：05 ,06 ,11 ,16 ,17 ,21 ,22 ,27 ,28 ,32 ,33 ,38 ,39 ,43 ,44 ,49</li>
            <li class="stress">
              半波：以特码色波和红单，红双，红大，红小，蓝单，蓝双，蓝大，蓝小，绿单，绿双，绿大，绿小为一个投注组合，当期特码开出符合投注组合，即视为中奖；若当期特码开出49号则视为和局；其余情形视为不中奖。
              半半波：以特码色波和红大单，红大双，红小单，红小双，蓝大单，蓝大双，蓝小单，蓝小双，绿大单，绿大双，绿小单，绿小双为一个投注组合，当期特码开出符合投注组合，即视为中奖；若当期特码开出49号则视为和局；其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.特肖头尾数</span>
            </li>
            <li>
              <span class="label">特码生肖</span>
            </li>
            <li class="stress">生肖顺序为 鼠 >牛 >虎 >兔 >龙 >蛇 >马 >羊 >猴 >鸡 >狗 >猪 。</li>
            <li class="stress">如今年是猪年，就以猪为开始，依顺序将49个号码分为12个生肖『如下』</li>
            <li class="stress">猪: 01、13、25、37、49</li>
            <li class="stress">狗: 02、14、26、38</li>
            <li class="stress">鸡: 03、15、27、39</li>
            <li class="stress">猴: 04、16、28、40</li>
            <li class="stress">羊: 05、17、29、41</li>
            <li class="stress">马: 06、18、30、42</li>
            <li class="stress">蛇: 07、19、31、43</li>
            <li class="stress">龙: 08、20、32、44</li>
            <li class="stress">兔: 09、21、33、45</li>
            <li class="stress">虎: 10、22、34、46</li>
            <li class="stress">牛: 11、23、35、47</li>
            <li class="stress">鼠: 12、24、36、48</li>
            <li class="stress">若当期特别号，落在下注生肖范围内，视为中奖 。</li>

            <li>
              <span class="label">特码头数：是指特码属头数的号码</span>
            </li>
            <li class="stress">"0"头：01、02、03、04、05、06、07、08、09</li>
            <li class="stress">"1"头：10、11、12、13、14、15、16、17、18、19</li>
            <li class="stress">"2"头：20、21、22、23、24、25、26、27、28、29</li>
            <li class="stress">"3"头：30、31、32、33、34、35、36、37、38、39</li>
            <li class="stress">"4"头：40、41、42、43、44、45、46、47、48、49</li>
            <li class="stress">例如：开奖结果特别号码为21则2头为中奖，其他头数都不中。</li>

            <li>
              <span class="label">特码尾数：是指特码属尾数的号码。</span>
            </li>
            <li class="stress">"0"尾：10、20、30、40</li>
            <li class="stress">"1"尾：01、11、21、31、41</li>
            <li class="stress">"2"尾：02、12、22、32、42</li>
            <li class="stress">"3"尾：03、13、23、33、43</li>
            <li class="stress">"4"尾：04、14、24、34、44</li>
            <li class="stress">"5"尾：05、15、25、35、45</li>
            <li class="stress">"6"尾：06、16、26、36、46</li>
            <li class="stress">"7"尾：07、17、27、37、47</li>
            <li class="stress">"8"尾：08、18、28、38、48</li>
            <li class="stress">"9"尾：09、19、29、39、49</li>
            <li class="stress">例如：开奖结果特别号码为21则1尾数为中奖，其他尾数都不中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">5.合肖</span>
            </li>
            <li
              class="stress"
            >挑选2-11个生肖『排列如同生肖』为一个组合，并选择开奖号码的特码是否在此组合内『49号除外』，即视为中奖；若当期特码开出49号，则所有组合皆视为和局。</li>
          </ul>

          <ul>
            <li>
              <span class="label">6.正码</span>
            </li>
            <li
              class="stress"
            >{{openResult['xyhk6'].name}}公司当期开出之前6个号码叫正码。每一个号码为一投注组合，假如投注号码为开奖号码之正码，视为中奖，其余情形视为不中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">7.正码特</span>
            </li>
            <li class="stress">正码特是指 正1特、正2特、正3特、正4特、正5特、正6特。</li>
            <li class="stress">其下注的正码特号与现场摇珠开出之正码其开奖顺序及开奖号码相同，视为中奖。</li>
            <li class="stress">如现场摇珠第一个正码开奖为49号，下注第一个正码特为49则视为中奖，其它号码视为不中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">8.正码1-6</span>
            </li>
            <li
              class="stress"
            >{{openResult['xyhk6'].name}}公司当期开出之前6个号码叫正码。第一时间出来的叫正码1，依次为正码2、正码3┅┅ 正码6(并不以号码大小排序)。</li>
            <li class="stress">大小:以指定出现正码的位置与号码大于或等于25为大，小于或等于24为小，开出49为和。</li>
            <li class="stress">单双:以指定出现正码的位置与号码为单数或双数下注，开出49为和</li>
            <li class="stress">合数大小:以指定出现正码的位置与号码个位和十位数字总和来判断胜负，和数大于或等于7为大，小于或等于6为小，开出49号为和。</li>
            <li class="stress">合数单双:以指定出现正码的位置与号码个位和十位数字总和来判断单双，开出49号为和。</li>
            <li
              class="stress"
            >尾数大小:以指定出现正码的位置与号码尾数大小下注，若0尾~4尾为小、5尾~9尾为大。如01、32、44为正尾小；如05、18、19为正尾大，开出49号为和。</li>
            <li class="stress">色波:以指定出现正码的位置的球色下注，开奖之球色与下注之颜色相同时，视为中奖，其余情形视为不中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">9.五行</span>
            </li>
            <li class="stress">挑选一个五行选项为一个组合，若开奖号码的特码在此组合内，即视为中奖；若开奖号码的特码亦不在此组合内，即视为不中奖；</li>
            <li class="stress">金: 05、06、19、20、27、28、35、36、49</li>
            <li class="stress">木: 01、02、09、10、17、18、31、32、39、40、47、48</li>
            <li class="stress">水: 07、08、15、16、23、24、37、38、45、46</li>
            <li class="stress">火: 03、04、11、12、25、26、33、34、41、42</li>
            <li class="stress">土: 13、14、21、22、29、30、43、44</li>
          </ul>

          <ul>
            <li>
              <span class="label">10.一肖总肖平特尾数</span>
            </li>
            <li>
              <span class="label">一肖</span>
            </li>
            <li class="stress">指开奖的7个号码中含有所属生肖的一个或多个号码，但派彩只派一次，即不论同生肖号码出现一个或多个号码都只派一次。</li>
            <li class="stress">猪: 01、13、25、37、49</li>
            <li class="stress">狗: 02、14、26、38</li>
            <li class="stress">鸡: 03、15、27、39</li>
            <li class="stress">猴: 04、16、28、40</li>
            <li class="stress">羊: 05、17、29、41</li>
            <li class="stress">马: 06、18、30、42</li>
            <li class="stress">蛇: 07、19、31、43</li>
            <li class="stress">龙: 08、20、32、44</li>
            <li class="stress">兔: 09、21、33、45</li>
            <li class="stress">虎: 10、22、34、46</li>
            <li class="stress">牛: 11、23、35、47</li>
            <li class="stress">鼠: 12、24、36、48</li>
            <li class="stress">只要当期号码 (所有正码与最后开出的特码)，落在下注生肖范围内，则视为中奖。(请注意：49亦算输赢，不为和)。</li>

            <li>
              <span class="label">尾数</span>
            </li>
            <li class="stress">指开奖的7个号码中含有所属尾数的一个或多个号码，但派彩指派一次，即不论同尾数号码出现一个或多个号码都指派一次。</li>
            <li class="stress">"0"尾：10、20、30、40</li>
            <li class="stress">"1"尾：01、11、21、31、41</li>
            <li class="stress">"2"尾：02、12、22、32、42</li>
            <li class="stress">"3"尾：03、13、23、33、43</li>
            <li class="stress">"4"尾：04、14、24、34、44</li>
            <li class="stress">"5"尾：05、15、25、35、45</li>
            <li class="stress">"6"尾：06、16、26、36、46</li>
            <li class="stress">"7"尾：07、17、27、37、47</li>
            <li class="stress">"8"尾：08、18、28、38、48</li>
            <li class="stress">"9"尾：09、19、29、39、49</li>
            <li class="stress">例如：开奖结果正码号码为11、31、42、44、35、32特别号码为21则1尾2尾4尾5尾都为中奖，其他尾数都不中奖。</li>

            <li>
              <span class="label">总肖</span>
            </li>
            <li class="stress">
              当期号码(所有正码与最後开出的特码)开出的不同生肖总数，与所投注之预计开出之生肖总数合(不用指定特定生肖)，则视为中奖，其余情形视为不中奖。例如：如果当期号码为19、24、12、34、40、39
              特别号：49，总计六个生肖，若选总肖【6】则为中奖(请注意：49号亦算输赢，不为和）。
            </li>
          </ul>

          <ul>
            <li>
              <span class="label">11.正肖七色波</span>
            </li>
            <li>
              <span class="label">正肖</span>
            </li>
            <li
              class="stress"
            >以开出的6个正码做游戏，只要有1个落在下注生肖范围内，视为中奖。如超过1个正码落在下注生肖范围内 ，派彩将倍增！如：下注＄100.-正肖當年生肖倍率1.8。</li>
            <li class="stress">6个正码开出01，派彩为$80</li>
            <li class="stress">6个正码开出01、13，派彩为$160</li>
            <li class="stress">6个正码开出01、13、25，派彩为$240</li>
            <li class="stress">6个正码开出01、13、25、37，派彩为$320</li>
            <li class="stress">6个正码开出01、13、25、37、49，派彩为$400（请注意：49亦算输赢，不为和）</li>

            <li>
              <span class="label">七色波</span>
            </li>
            <li class="stress">以开出的7个色波，那种颜色最多为中奖。 开出的6个正码各以1个色波计，特别号以1.5个色波计。而以下3种结果视为和局。</li>
            <li class="stress">1： 6个正码开出3蓝3绿，而特别码是1.5红</li>
            <li class="stress">2： 6个正码开出3蓝3红，而特别码是1.5绿</li>
            <li class="stress">3： 6个正码开出3绿3红，而特别码是1.5蓝</li>
            <li class="stress">如果出现和局，所有投注红，绿，蓝七色波的金额将全数退回，会员也可投注和局</li>
          </ul>

          <ul>
            <li>
              <span class="label">12.自选不中</span>
            </li>
            <li
              class="stress"
            >挑选5~11个号码为一个组合，当期号码 (所有正码与最后开出的特码) 皆没有坐落于投注时所挑选之号码组合内，则视为中奖，若是有任何一个当期号码开在所挑选的号码组合情形视为不中奖。</li>
            <li class="stress">例如当期号码为19、24、17、34、40、39 ,特别号49，所挑选5个号码，若所挑选的号码内皆没有坐落于当期号码，则为中奖。</li>
          </ul>

          <ul>
            <li>
              <span class="label">13.连肖连尾</span>
            </li>
            <li
              class="stress"
            >连肖:生肖所对应的号码和特码生肖项目的一样；一个生肖对应多个号码，不论同生肖的号码出现一个或多个，派彩只派一次。每个生肖都有自己的赔率，下注组合的总赔率，取该组合生肖的最低赔率为总赔率。（请注意49亦算输赢）。</li>
            <li class="stress">
              二连肖:以每二个生肖为一注，每注的每个生肖中如果都有当期开奖的所有7个号码中对应的生肖，则视为中奖。如果其中一个或多个生肖没有当期开奖的所有7个号码对应的生肖，则视为不中奖。例如生肖：蛇，马，是一注，开奖的
              生肖是：马，牛，羊，鸡，狗，猪，鼠，那就是不中奖；再例如生肖：蛇，马，是一注，开奖的生肖是：蛇，马，牛，羊，鸡，狗，猪，那就是中奖。
            </li>
            <li
              class="stress"
            >三连肖:以每三个生肖为一注，每注的每个生肖中如果都有当期开奖的所有7个号码中对应的生肖，则视为中奖。如果其中一个或多个生肖没有当期开奖的所有7个号码对应的生肖，则视为不中奖。例如生肖：蛇，马，牛，是一注，开奖的生肖是：马，牛，羊，鸡，狗，猪，鼠，那就是不中奖；再例如生肖：蛇，马，牛，是一注，开奖的生肖是：蛇，马，牛，羊，鸡，狗，猪，那就是中奖。</li>
            <li class="stress">
              四连肖:以每四个生肖为一注，每注的每个生肖中如果都有当期开奖的所有7个号码中对应的生肖，则视为中奖。如果其中一个或多个生肖没有当期开奖的所有7个号码对应的生肖，则视为不中奖。例如生肖：蛇，马，牛，羊，是一注，开奖的生肖是：马，牛，羊，鸡，狗，猪，鼠，
              那就是不中奖；再例如生肖：蛇，马，牛，羊，是一注，开奖的生肖是：蛇，马，牛，羊，鸡，狗，猪，那就是中奖。
            </li>
            <li class="stress">
              五连肖:以每五个生肖为一注，每注的每个生肖中如果都有当期开奖的所有7个号码中对应的生肖，则视为中奖。如果其中一个或多个生肖没有当期开奖的所有7个号
              码对应的生肖，则视为不中奖。例如生肖：蛇，马，牛，羊，鸡，是一注，开奖的生肖是：马，牛，羊，鸡，狗，猪，那就是不中奖；再例如生肖：蛇，马，牛，羊，鸡，是一注，开奖的生肖是：蛇，马，牛，羊，鸡，狗，猪，那就是中奖。
            </li>
            <li
              class="stress"
            >连尾:尾数所对应的号码和尾数项目的一样；一个尾数对应多个号码，不论同尾数的号码出现一个或多个，派彩只派一次。每个尾数都有自己的赔率，下注组合的总赔率，取该组合尾数的最低赔率为总赔率。（请注意49亦算输赢）。</li>
            <li class="stress">
              二连尾:以每二个尾数为一注，每注的每个尾数中如果都有当期开奖的所有7个号码中对应的尾数，则视为中奖。如果其中一个或多个尾数没有当期开奖的所有7个号码对应的尾数，则视为不中奖。例如：尾1、尾2，是一注，开奖的号码是：2、3、4、5、6、7、8，那就是不中奖；再例如：尾1、尾2，是一注，开奖的号码是：1、2、3、4、5、
              6、7，那就是中奖。
            </li>
            <li
              class="stress"
            >三连尾:以每三个尾数为一注，每注的每个尾数中如果都有当期开奖的所有7个号码中对应的尾数，则视为中奖。如果其中一个或多个尾数没有当期开奖的所有7个号码对应的尾数，则视为不中奖。例如：尾1、尾2、尾3，是一注，开奖的号码是：2、3、4、5、6、7、8，那就是不中奖；再例如：尾1、尾2、尾3，是一注，开奖的号码是：1、2、3、4、5、6、7，那就是中奖。</li>
            <li class="stress">
              四连尾:以每四个尾数为一注，每注的每个尾数中如果都有当期开奖的所有7个号码中对应的尾数，则视为中奖。如果其中一个或多个尾数没有当期开奖的所有7个号码对应的尾数，则视为不中奖。例如：尾1、尾2、尾3、尾4，是一注，开奖的号码是：2、3、4、5、6、7、8，
              那就是不中奖；再例如：尾1、尾2、尾3、尾4，是一注，开奖的号码是：1、2、3、4、5、6、7，那就是中奖。
            </li>
            <li class="stress">
              五连尾:以每五个尾数为一注，每注的每个尾数中如果都有当期开奖的所有7个号码中对应的尾数，则视为中奖。如果其中一个或多个尾数没有当期开奖的所有7个号码对应的尾数，则视为不中奖。例如：尾1、尾2、尾3、尾4、尾5，是一注，开奖的号码是：2、3、4、5、6、7、8，
              那就是不中奖；再例如：尾1、尾2、尾3、尾4、尾5，是一注，开奖的号码是：1、2、3、4、5、6、7，那就是中奖。
            </li>
          </ul>

          <ul>
            <li>
              <span class="label">14.连码</span>
            </li>
            <li class="stress">四全中：选择投注号码每四个为一组（四个或四个以上），兑奖号为正码，如四个号码都在开奖号码的正码里面，视为中奖，其他情形都视为不中奖。</li>
            <li class="stress">
              三全中：所投注的每三个号码为一组合，若三个号码都是开奖号码之正码，视为中奖，其余情形视为 不中奖。如06、07、08三个都是开奖号码之正码，视为中奖，如两个正码加上一个特别号
              码视为不中奖 。
            </li>
            <li class="stress">
              三中二：所投注的每三个号码为一组合，若其中2个是开奖号码中的正码，即为三中二，视为中奖；若3个都是开奖号码中的正码，即为三中二之中三，其余情形视为不中奖，如06、07、08
              为一组合，开奖号码中有06、07两个正码，没有08，即为三中二，按三中二赔付；如开奖 号码中有06、07、08三个正码，即为三中二之中三，按中三赔付；如出现1个或没有，视为不中奖 。
            </li>
            <li class="stress">二全中：所投注的每二个号码为一组合，二个号码都是开奖号码之正码，视为中奖，其余情形视为不 中奖（含一个正码加一个特别号码之情形）。</li>
            <li
              class="stress"
            >二中特：所投注的每二个号码为一组合，二个号码都是开奖号码之正码，叫二中特之中二；若其中一 个是正码，一个是特别号码，叫二中特之中特；其余情形视为不中奖 。</li>
            <li class="stress">特串：所投注的每二个号码为一组合，其中一个是正码，一个是特别号码，视为中奖，其余情形视为不中奖（含二个号码都是正码之情形）。</li>
          </ul>
        </div>

        <!-- {{openResult['jssc'].name}} -->
        <div v-if="showCode == 'jssc'" id="GAME_jssc_PAGE">
          <h2>{{openResult['jssc'].name}}规则说明</h2>
          <ul>
            <li>“{{openResult['jssc'].name}}”是引进欧洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；开奖时间，北京时间（GMT+8）每天白天从早上07:00:00开到凌晨05:58:45，每75秒开一次奖,每天开奖1104期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1～10 两面：</span>指 单、双；大、小。
            </li>
            <li class="stress">
              <span class="label">单、双：</span>号码为双数叫双，如4、8；号码为单数叫单，如5、9。
            </li>
            <li class="stress">
              <span class="label">大、小：</span>开出之号码大于或等于6为大，小于或等于5为小。
            </li>
            <li class="stress">
              <span class="label">第一名～第十名 车号指定：</span>每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">1～5龙虎</span>
            </li>
            <li class="stress">
              <span class="label">冠&nbsp;&nbsp;军 龙/虎：</span>“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">亚&nbsp;&nbsp;军 龙/虎：</span>“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第三名 龙/虎：</span>“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第四名 龙/虎：</span>“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第五名 龙/虎：</span>“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">冠军车号＋亚军车号＝冠亚和值（为3~19)</span>
            </li>
            <li class="stress">
              <span class="label">冠亚和单双：“冠亚和值”</span>为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和大小：“冠亚和值”</span>大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和指定：“冠亚和值”</span>可能出现的结果为3～19， 投中对应
              <span class="label">“冠亚和值”</span>数字的视为中奖，其余视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'jsssc'" id="GAME_jsssc_PAGE">
          <h2>{{openResult['jsssc'].name}}规则说明</h2>
          <ul>
            <li>“{{openResult['jsssc'].name}}”是引进欧洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；开奖时间，北京时间（GMT+8）每天白天从早上07:00:00开到凌晨05:58:45，每75秒开一次奖,每天开奖1104期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.第一球~第五球</span>
            </li>
            <li class="stress">
              <span class="label">第一球特~第五球特：</span>第一球特、第二球特、第三球特、第四球特、第五球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">单双大小：</span>根据相应单项投注第一球特 ~ 第五球特开出的球号，判断胜负。
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於5为特码大，小於或等於4为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">2.总和单双大小：</span>
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於23为特码大，小於或等於22为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.前三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的万位千位百位数字都相同。----如中奖号码为000、111、999等，中奖号码的万位千位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的万位千位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码万位千位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的万位千位百位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的万位千位百位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.中三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的十位百位千位数字都相同。----如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的十位百位千位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">6.后三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的百位十位个位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位十位个位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的百位十位个位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位十位个位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的百位十位个位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的百位十位个位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">7.龙虎和特殊玩法： 龙 &gt; 虎 &gt; 和 （0为最小，9为最大）。</span>
            </li>
            <li class="stress">
              <span class="label">龙：</span>开出之号码第一球（万位）的中奖号码大于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出4
              第五球开出2；第一球开出9 第五球开出8；第一球开出5 第五球开出1...中奖为龙。
            </li>
            <li class="stress">
              <span class="label">虎：</span>开出之号码第一球（万位）的中奖号码小于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出7
              第五球开出9；第一球开出3 第五球开出5；第一球开出5 第五球开出8...中奖为虎。
            </li>
            <li class="stress">
              <span class="label">和：</span>开出之号码第一球（万位）的中奖号码等于第五球（个位）的中奖号码，例如开出结果：2***2则投注和局者视为中奖，其它视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'fc3d'" id="GAME_fc3d_PAGE">
          <h2>{{openResult['fc3d'].name}}(原名：中国福彩“{{openResult['fc3d'].name}}”)规则说明</h2>
          <ul>
            <li>{{openResult['fc3d'].name}}是依照中国福利彩票管理中心发行的3D的开奖结果为派彩依据，营业时间为北京时间(GMT+8)每天上午10:00到晚上21:15，每天开奖一次。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.一字盘势</span>
            </li>
            <li class="stress">
              <span class="label">一字定位：</span>于佰拾个任选一位，自0~9任选1号进行投注，当开奖结果与所选的定位与号码相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">一字组合：</span>0~9任选1号进行投注，当开奖结果佰拾个任一数与所选的号码相同时，即为中奖；若开奖结果出现重覆数字时，视为中奖一次。
            </li>
            <li class="stress">
              <span class="label">佰/拾/个 大小：</span>0~4为小，5~9为大。
            </li>
            <li class="stress">
              <span class="label">佰/拾/个 单双：</span>1、3、5、7、9为单，0、2、4、6、8为双。
            </li>
            <li class="stress">
              <span class="label">佰/拾/个 质合：</span>1、2、3、5、7为质数，0、4、6、8、9为合数。
            </li>
          </ul>

          <ul>
            <li>
              <span class="label">2.二字盘势</span>
            </li>
            <li class="stress">
              <span class="label">二字定位：</span>于佰拾个任选二位，自0~9任选2号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">二字组合：</span>0~9任选2号进行投注，当开奖结果佰拾个任二数与所选的号码相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰拾和数：</span>开奖结果佰拾二位数的总和值若与投注的佰拾数字的总和值相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰个和数：</span>开奖结果佰个二位数的总和值若与投注的佰个数字的总和值相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">拾个和数：</span>开奖结果拾个二位数的总和值若与投注的拾个数字的总和值相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰拾/佰个/拾个 和数尾数：</span>以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任何一个号码。如：开奖结果为：3、4、5
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.三字盘势</span>
            </li>
            <li class="stress">
              <span class="label">三字定位：</span>于佰拾个位自0~9任选3号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">三字组合：</span>0~9任选3号进行投注，当开奖结果佰拾个任三数与所选的号码相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰拾个和数：</span>开奖结果佰拾个三位数的总和值若与投注的佰拾个数字的总和值相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数尾数：</span>以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任何一个号码。如：开奖结果为：3、4、5。佰拾个的总和为12，尾数为2。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数大小：</span>0~13为小，14~27为大。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数单双：</span>1、3、5、7、9、11、13、15、17、19、21、23、25、27为单，0、2、4、6、8、10、12、14、16、18、20、22、24、26为双。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数尾数大小：</span>0~4为小，5~9为大。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数尾数质合：</span>1、2、3、5、7为质数，0、4、6、8、9为合数。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.组选三</span>
            </li>
            <li
              class="stress"
            >会员可以挑选5~10个号码，当开奖结果中有且只有两个号码重复，则视为中奖。挑选不同个数号码有其相对应的赔率。如果是选择 1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。</li>
            <li class="stress">举例：112、344，若是开出豹子则不算中奖。</li>
            <li class="stress">【附注】："豹子"为三字同号，例如：111、222。</li>
          </ul>
          <ul>
            <li>
              <span class="label">5.组选六</span>
            </li>
            <li
              class="stress"
            >会员可以挑选择4~8个号码，当开奖结果都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算彩派。</li>
            <li
              class="stress"
            >举例：如果是选择(1、2、3、4)，则开奖结果为123、124、134、234都中奖，其他都是不中奖。例如：112、133、145、444等都是不中奖。</li>
          </ul>
          <ul>
            <li>
              <span class="label">6.跨度</span>
            </li>
            <li class="stress">以开奖三个号码的最大差距(跨度)，作为中奖的依据。会员可以选择0~9的任一跨度。</li>
            <li
              class="stress"
            >举例：开奖结果为3，4，8。中奖的跨度为5。(最大号码 8减最小号码 3 = 5)。若开奖结果三号码都相同，称作豹子，投注注豹子者中奖，其余为不中奖。</li>
          </ul>
        </div>

        <div v-if="showCode == 'txffc'" id="GAME_txffc_PAGE">
          <h2>{{openResult['txffc'].name}}规则说明</h2>
          <ul>
            <li>
              “{{openResult['txffc'].name}}”是以每分钟腾讯QQ的在线用户人数数字生成一个五位数字作为{{openResult['txffc'].name}}当期的开奖号码，您可以放心投注、开奖时间，北京时间（GMT+8）早上07:00:00 到
              凌晨06:00:00，每60秒开一次奖,每天开奖1439期
            </li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.第一球~第五球</span>
            </li>
            <li class="stress">
              <span class="label">第一球特~第五球特：</span>第一球特、第二球特、第三球特、第四球特、第五球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">单双大小：</span>根据相应单项投注第一球特 ~ 第五球特开出的球号，判断胜负。
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於5为特码大，小於或等於4为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">2.总和单双大小：</span>
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於23为特码大，小於或等於22为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.前三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的万位千位百位数字都相同。----如中奖号码为000、111、999等，中奖号码的万位千位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的万位千位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码万位千位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的万位千位百位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的万位千位百位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.中三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的十位百位千位数字都相同。----如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的十位百位千位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">6.后三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的百位十位个位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位十位个位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的百位十位个位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位十位个位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的百位十位个位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的百位十位个位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">7.龙虎和特殊玩法： 龙 &gt; 虎 &gt; 和 （0为最小，9为最大）。</span>
            </li>
            <li class="stress">
              <span class="label">龙：</span>开出之号码第一球（万位）的中奖号码大于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出4
              第五球开出2；第一球开出9 第五球开出8；第一球开出5 第五球开出1...中奖为龙。
            </li>
            <li class="stress">
              <span class="label">虎：</span>开出之号码第一球（万位）的中奖号码小于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出7
              第五球开出9；第一球开出3 第五球开出5；第一球开出5 第五球开出8...中奖为虎。
            </li>
            <li class="stress">
              <span class="label">和：</span>开出之号码第一球（万位）的中奖号码等于第五球（个位）的中奖号码，例如开出结果：2***2则投注和局者视为中奖，其它视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'jsft'" id="GAME_jsft_PAGE">
          <h2>{{openResult['jsft'].name}}规则说明</h2>
          <ul>
            <li>“{{openResult['jsft'].name}}”是引进欧洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；开奖时间，北京时间（GMT+8）每天白天从早上07:00:00开到凌晨05:58:45，每75秒开一次奖,每天开奖1104期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1～10 两面：</span>指 单、双；大、小。
            </li>
            <li class="stress">
              <span class="label">单、双：</span>号码为双数叫双，如4、8；号码为单数叫单，如5、9。
            </li>
            <li class="stress">
              <span class="label">大、小：</span>开出之号码大于或等于6为大，小于或等于5为小。
            </li>
            <li class="stress">
              <span class="label">第一名～第十名 车号指定：</span>每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">1～5龙虎</span>
            </li>
            <li class="stress">
              <span class="label">冠&nbsp;&nbsp;军 龙/虎：</span>“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">亚&nbsp;&nbsp;军 龙/虎：</span>“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第三名 龙/虎：</span>“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第四名 龙/虎：</span>“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第五名 龙/虎：</span>“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">冠军车号＋亚军车号＝冠亚和值（为3~19)</span>
            </li>
            <li class="stress">
              <span class="label">冠亚和单双：“冠亚和值”</span>为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和大小：“冠亚和值”</span>大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和指定：“冠亚和值”</span>可能出现的结果为3～19， 投中对应
              <span class="label">“冠亚和值”</span>数字的视为中奖，其余视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'pl3'" id="GAME_pl3_PAGE">
          <h2>{{openResult['pl3'].name}}(原名：中国体彩“排列3”)规则说明</h2>
          <ul>
            <li>排列3是依照中国体育彩票管理中心发行的排列3的开奖结果为派彩依据，营业时间为北京时间(GMT+8)每天上午10:00到晚上20:30，每天开奖一次。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.一字盘势</span>
            </li>
            <li class="stress">
              <span class="label">一字定位：</span>于佰拾个任选一位，自0~9任选1号进行投注，当开奖结果与所选的定位与号码相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">一字组合：</span>0~9任选1号进行投注，当开奖结果佰拾个任一数与所选的号码相同时，即为中奖；若开奖结果出现重覆数字时，视为中奖一次。
            </li>
            <li class="stress">
              <span class="label">佰/拾/个 大小：</span>0~4为小，5~9为大。
            </li>
            <li class="stress">
              <span class="label">佰/拾/个 单双：</span>1、3、5、7、9为单，0、2、4、6、8为双。
            </li>
            <li class="stress">
              <span class="label">佰/拾/个 质合：</span>1、2、3、5、7为质数，0、4、6、8、9为合数。
            </li>
          </ul>

          <ul>
            <li>
              <span class="label">2.二字盘势</span>
            </li>
            <li class="stress">
              <span class="label">二字定位：</span>于佰拾个任选二位，自0~9任选2号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">二字组合：</span>0~9任选2号进行投注，当开奖结果佰拾个任二数与所选的号码相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰拾和数：</span>开奖结果佰拾二位数的总和值若与投注的佰拾数字的总和值相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰个和数：</span>开奖结果佰个二位数的总和值若与投注的佰个数字的总和值相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">拾个和数：</span>开奖结果拾个二位数的总和值若与投注的拾个数字的总和值相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰拾/佰个/拾个 和数尾数：</span>以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任何一个号码。如：开奖结果为：3、4、5
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.三字盘势</span>
            </li>
            <li class="stress">
              <span class="label">三字定位：</span>于佰拾个位自0~9任选3号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">三字组合：</span>0~9任选3号进行投注，当开奖结果佰拾个任三数与所选的号码相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰拾个和数：</span>开奖结果佰拾个三位数的总和值若与投注的佰拾个数字的总和值相同时，即为中奖。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数尾数：</span>以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任何一个号码。如：开奖结果为：3、4、5。佰拾个的总和为12，尾数为2。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数大小：</span>0~13为小，14~27为大。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数单双：</span>1、3、5、7、9、11、13、15、17、19、21、23、25、27为单，0、2、4、6、8、10、12、14、16、18、20、22、24、26为双。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数尾数大小：</span>0~4为小，5~9为大。
            </li>
            <li class="stress">
              <span class="label">佰拾个 和数尾数质合：</span>1、2、3、5、7为质数，0、4、6、8、9为合数。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.组选三</span>
            </li>
            <li
              class="stress"
            >会员可以挑选5~10个号码，当开奖结果中有且只有两个号码重复，则视为中奖。挑选不同个数号码有其相对应的赔率。如果是选择 1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。</li>
            <li class="stress">举例：112、344，若是开出豹子则不算中奖。</li>
            <li class="stress">【附注】："豹子"为三字同号，例如：111、222。</li>
          </ul>
          <ul>
            <li>
              <span class="label">5.组选六</span>
            </li>
            <li
              class="stress"
            >会员可以挑选择4~8个号码，当开奖结果都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算彩派。</li>
            <li
              class="stress"
            >举例：如果是选择(1、2、3、4)，则开奖结果为123、124、134、234都中奖，其他都是不中奖。例如：112、133、145、444等都是不中奖。</li>
          </ul>
          <ul>
            <li>
              <span class="label">6.跨度</span>
            </li>
            <li class="stress">以开奖三个号码的最大差距(跨度)，作为中奖的依据。会员可以选择0~9的任一跨度。</li>
            <li
              class="stress"
            >举例：开奖结果为3，4，8。中奖的跨度为5。(最大号码 8减最小号码 3 = 5)。若开奖结果三号码都相同，称作豹子，投注注豹子者中奖，其余为不中奖。</li>
          </ul>
        </div>

        <div v-if="showCode == 'azxy10'" id="GAME_azxy10_PAGE">
          <h2>{{openResult['azxy10'].name}}规则说明</h2>
          <ul>
            <li>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['azxy10'].name}}”完全同步，营业时间为北京时间(GMT+8)每天上午06:59到凌晨05:59，每5分钟开奖一次，每天开奖276期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1～10 两面：</span>指 单、双；大、小。
            </li>
            <li class="stress">
              <span class="label">单、双：</span>号码为双数叫双，如4、8；号码为单数叫单，如5、9。
            </li>
            <li class="stress">
              <span class="label">大、小：</span>开出之号码大于或等于6为大，小于或等于5为小。
            </li>
            <li class="stress">
              <span class="label">第一名～第十名 车号指定：</span>每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">1～5龙虎</span>
            </li>
            <li class="stress">
              <span class="label">冠&nbsp;&nbsp;军 龙/虎：</span>“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">亚&nbsp;&nbsp;军 龙/虎：</span>“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第三名 龙/虎：</span>“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第四名 龙/虎：</span>“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">第五名 龙/虎：</span>“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">冠军车号＋亚军车号＝冠亚和值（为3~19)</span>
            </li>
            <li class="stress">
              <span class="label">冠亚和单双：“冠亚和值”</span>为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和大小：“冠亚和值”</span>大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。
            </li>
            <li class="stress">
              <span class="label">冠亚和指定：“冠亚和值”</span>可能出现的结果为3～19， 投中对应
              <span class="label">“冠亚和值”</span>数字的视为中奖，其余视为不中奖。
            </li>
          </ul>
        </div>

        <div v-if="showCode == 'azxy5'" id="GAME_azxy5_PAGE">
          <h2>{{openResult['azxy5'].name}}规则说明</h2>
          <ul>
            <li>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['azxy5'].name}}”完全同步，营业时间为北京时间(GMT+8)每天上午06:59到凌晨05:59，每5分钟开奖一次，每天开奖276期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
          <ul>
            <li>
              <span class="label">1.第一球~第五球</span>
            </li>
            <li class="stress">
              <span class="label">第一球特~第五球特：</span>第一球特、第二球特、第三球特、第四球特、第五球特：指下注的每一球特与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。
            </li>
            <li class="stress">
              <span class="label">单双大小：</span>根据相应单项投注第一球特 ~ 第五球特开出的球号，判断胜负。
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於5为特码大，小於或等於4为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号为双数叫特双，如2、6；特码为单数叫特单，如1、3。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">2.总和单双大小：</span>
            </li>
            <li class="stress">
              <span class="label">大小：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号大於或等於23为特码大，小於或等於22为特码小。
            </li>
            <li class="stress">
              <span class="label">单双：</span>根据相应单项投注的第一球特 ~ 第五球特开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">3.前三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的万位千位百位数字都相同。----如中奖号码为000、111、999等，中奖号码的万位千位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的万位千位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码万位千位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的万位千位百位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的万位千位百位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">4.中三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的十位百位千位数字都相同。----如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的十位百位千位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">5.后三特殊玩法： 豹子 &gt; 顺子 &gt; 对子 &gt; 半顺 &gt; 杂六 。</span>
            </li>
            <li class="stress">
              <span class="label">豹子：</span>中奖号码的百位十位个位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位十位个位数字相同，则投注豹子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">顺子：</span>中奖号码的百位十位个位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位十位个位数字相连，则投注顺子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">对子：</span>中奖号码的百位十位个位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
            </li>
            <li class="stress">
              <span class="label">半顺：</span>中奖号码的百位十位个位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。
            </li>
            <li class="stress">
              <span class="label">杂六：</span>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
            </li>
          </ul>
          <ul>
            <li>
              <span class="label">6.龙虎和特殊玩法： 龙 &gt; 虎 &gt; 和 （0为最小，9为最大）。</span>
            </li>
            <li class="stress">
              <span class="label">龙：</span>开出之号码第一球（万位）的中奖号码大于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出4 第五球开出2；第一球开出9 第五球开出8；第一球开出5
              第五球开出1...中奖为龙。
            </li>
            <li class="stress">
              <span class="label">虎：</span>开出之号码第一球（万位）的中奖号码小于第五球（个位）的中奖号码，如出和局为打和。如 第一球开出7 第五球开出9；第一球开出3 第五球开出5；第一球开出5
              第五球开出8...中奖为虎。
            </li>
            <li class="stress">
              <span class="label">和：</span>开出之号码第一球（万位）的中奖号码等于第五球（个位）的中奖号码，例如开出结果：2***2则投注和局者视为中奖，其它视为不中奖。
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll";
import { mapState } from "vuex";
export default {
  name: "Rules",
  data() {
    return {
      showCode: "",
      scrollDatas: []
    };
  },
  components: { Scroll },
  mounted() {
    this.showCode = this.$route.query.code;
    setTimeout(() => {
      this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }, 100);
  },
  computed: {
    ...mapState(["code", "openResult"])
  }
};
</script>

<style scoped lang="scss">
.game-rules {
  color: #555;
  position: absolute;
  top: px2rem(92px);
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;
}

.label {
  font-size: px2rem(26px);
  color: #ff5e5e;
  font-weight: 600;
}

li {
  list-style: none;
  margin-top: px2rem(16px);
  line-height: px2rem(40px);
}

.select {
  padding: px2rem(10px) 0 0 px2rem(30px);
}
</style>
