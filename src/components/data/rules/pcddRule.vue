<template>
  <div>
    <!-- <h2>{{openResult['pcdd'].name}}规则说明</h2> -->
    <slot name="name"></slot>
    <slot name="describe"></slot>
    <!-- <ul>
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
    </ul>-->
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
</template>

<script>
export default {
  name: "pcddRule"
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