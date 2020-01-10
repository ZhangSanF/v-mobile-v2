<template>
  <div>
    <slot name="name"></slot>
    <ul>
      <slot name="describe"></slot>
      <li>具体游戏规则如下:</li>
    </ul>
    <ul v-show="sscType == 2">
      <li class="stress">
        <span class="label">一帆风顺：</span>从0-9中任意选择1个号码组成一注，只要开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。
      </li>
      <li class="stress">
        <span class="label">好事成双：</span>从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。
      </li>
      <li class="stress">
        <span class="label">三星报喜：</span>从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。
      </li>
      <li class="stress">
        <span class="label">四季发财：</span>从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。
      </li>
      <li class="stress">
        <span class="label">二码定位：</span>从万位、千位、百位、十位、个位中任意选择两个位，在这两个位上至少各选1个号码组成一注，所选2个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。
      </li>
      <li class="stress">
        <span class="label">三码定位：</span>从万位、千位、百位、十位、个位中任意选择三个位，在这三个位上至少各选1个号码组成一注，所选3个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。
      </li>
      <li class="stress">
        <span class="label">四码定位：</span>从万位、千位、百位、十位、个位中任意选择四个位置，在这四个位上至少各选1个号码组成一注，所选4个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。
      </li>
      <li class="stress">
        <span class="label">二码不定位：</span>从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。
      </li>
      <li class="stress">
        <span class="label">三码不定位：</span>从0-9中选择3个号码，每注由3个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的3个号码，即为中奖。
      </li>
      <li class="stress">
        <span class="label">总和组合双面：</span>
        <span>大单：23 25 27 29 31 33 35 37 39 41 43 45</span>
        <br />
        <span>小单：1 3 5 7 9 11 13 15 17 19 21</span>
        <br />
        <span>大双：24 26 28 30 32 34 36 38 40 42 44</span>
        <br />
        <span>小双：0 2 4 6 8 10 12 14 16 18 20 22</span>
      </li>
      <li class="stress">
        <span class="label">总和组合三面：</span>在和双面的基础上再加上龙虎的判断，龙：万位开奖号码大于个位开奖号码，如万位开出10，个位开出7。
        虎：万位开奖号码小于个位开奖号码，如万位开出3，个位开出7。和：万位开奖号码等于个位开奖号码，如万位开出3，个位开出3。
      </li>
      <li class="stress">
        <span class="label">豹子：</span>从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中相邻位置出现3次，即为中奖。
      </li>
    </ul>

    <ul  v-show="sscType == 1">
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
    <ul  v-show="sscType == 1">
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
    <ul  v-show="sscType == 1">
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
    <ul  v-show="sscType == 1">
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
    <ul  v-show="sscType == 1">
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
    <ul  v-show="sscType == 1">
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
    <ul v-if="code != 'hlssc' && code !='jsssc' && code != 'txffc' && sscType == 1">
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
</template>

<script>
export default {
  name: "sscRule",
  props:['code'],
  data(){
    return{
      sscType:1
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.sscType = this.getSSCType();
    })
  },
  methods: {
    getSSCType(){
      return window.sessionStorage.getItem('ssc_display');
    }
  }
};
</script>


<style lang="scss" scoped>
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