<template>
  <div v-if="showCode == 'jsk3'" id="GAME_jsk3_PAGE">
    <slot name="name"></slot>
    <ul>
      <slot name="describe"></slot>
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
</template>

<script>
export default {
  name: "sscRule"
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