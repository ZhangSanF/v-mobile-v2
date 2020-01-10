<template>
  <div class="show">
    <slot name="name"></slot>
    <ul>
      <slot name="nameDesc"></slot>
      <slot name="describe"></slot>
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
</template>

<script>
export default {
  name: "niuniuRule"
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