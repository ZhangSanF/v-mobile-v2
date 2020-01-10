<template>
  <div>
    <slot name="name"></slot>
    <slot name="describe"></slot>
    <ul>
      <li>
        <span class="title">具体游戏规则如下：</span>
      </li>
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
  </div>
</template>

<script>
export default {
  name: "ctsscRule"
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