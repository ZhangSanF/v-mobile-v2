<template>
  <div>
    <scroll class="game-rules" :data="scrollDatas">
      <div style="padding: 10px">
        <Pk10Rule v-if="showCode == 'bjpk10'">
          <h2 slot="name">{{openResult['bjpk10'].name}}(原名：北京福彩“PK拾”)规则说明</h2>
          <li
            slot="describe"
          >该游戏的投注时间、开奖时间和开奖号码与“北京PK拾”完全同步（官方网），北京时间（GMT+8）每天白天从上午9点30分开到晚上23点50分，每20分钟开一次奖,每天开奖44期。</li>
        </Pk10Rule>

        <Pk10Rule v-if="showCode == 'hlsc'">
          <h2 slot="name">{{openResult['hlsc'].name}}规则说明</h2>
          <li
            slot="describe"
          >{{openResult['hlsc'].name}}”是引进澳洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；这类彩种在澳洲当地是非常火爆的，您可以放心投注、开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨06:25:00，每5分钟开一次奖,每天开奖276期。</li>
        </Pk10Rule>

        <NiuniuRule v-if="showCode == 'pk10nn'">
          <h2 slot="name">{{openResult['pk10nn'].name}}规则说明</h2>
          <li slot="nameDesc">「{{openResult['pk10nn'].name}}」按pk10赛车的开奖结果为基础</li>
          <li
            slot="describe"
          >pk10赛车开奖结果，投注时间、开奖时间和开奖号码与“北京PK拾”完全同步（官方网），北京时间（GMT+8）每天白天从上午9点30分开到晚上23点50分，每20分钟开一次奖,每天开奖44期。。</li>
        </NiuniuRule>

        <Pk10Rule v-if="showCode == 'mlaft'">
          <h2 slot="name">{{openResult['mlaft'].name}}规则说明</h2>
          <li
            slot="describe"
          >该游戏的投注时间、开奖时间和开奖号码与“{{openResult['mlaft'].name}}”完全同步（官方网），北京时间（GMT+8）每天白天从中午13:04 开到凌晨04:04，每5分钟开一次奖, 每天开奖180期。</li>
        </Pk10Rule>

        <Pk10Rule v-if="showCode == 'hlft'">
          <h2 slot="name">{{openResult['hlft'].name}}规则说明</h2>
          <li
            slot="describe"
          >“{{openResult['hlft'].name}}”是引进澳洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；这类彩种在澳洲当地是非常火爆的，您可以放心投注、开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨06:25:00，每5分钟开一次奖,每天开奖276期。</li>
        </Pk10Rule>

        <NiuniuRule v-if="showCode == 'jsnn'">
          <h2 slot="name">{{openResult['jsnn'].name}}规则说明</h2>
          <li slot="nameDesc">「{{openResult['jsnn'].name}}」按{{openResult['jssc'].name}}的开奖结果为基础</li>
          <li
            slot="describe"
          >{{openResult['jssc'].name}}开奖结果，北京时间（GMT+8）早上07:00:00 到 凌晨05:58:45，每75秒开一次奖,每天开奖1104期</li>
        </NiuniuRule>

        <SscRule v-if="showCode == 'cqssc'" :code="'cqssc'">
          <h2 slot="name">{{openResult['cqssc'].name}}规则说明</h2>
          <li
            slot="describe"
          >该游戏的投注时间、开奖时间和开奖号码与{{openResult['cqssc'].name}}完全同步，北京时间（GMT+8）每天白天从上午7:10开到晚上23:50，夜场从00:10至凌晨03:10,每20分钟开一次奖，夜场每20分钟开一次奖,每天开奖59期(白天50期,夜间9期)。</li>
        </SscRule>

        <SscRule v-if="showCode == 'hlssc'" :code="'hlssc'">
          <h2 slot="name">{{openResult['hlssc'].name}}规则说明</h2>
          <li
            slot="describe"
          >“{{openResult['hlssc'].name}}”是引进澳洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；这类彩种在澳洲当地是非常火爆的，您可以放心投注、开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨06:25:00，每5分钟开一次奖,每天开奖276期。</li>
        </SscRule>

        <SscRule v-if="showCode == 'xjssc'" :code="'xjssc'">
          <h2 slot="name">{{openResult['xjssc'].name}}规则说明</h2>
          <li
            slot="describe"
          >该游戏的投注时间、开奖时间和开奖号码与{{openResult['xjssc'].name}}完全同步，北京时间(GMT+8)每天上午10:00到凌晨02:00，每20分钟开奖一次，每天开奖48期。</li>
        </SscRule>

        <SscRule v-if="showCode == 'tjssc'" :code="'tjssc'">
          <h2 slot="name">{{openResult['tjssc'].name}}规则说明</h2>
          <li
            slot="describe"
          >该游戏的投注时间、开奖时间和开奖号码与{{openResult['tjssc'].name}}完全同步，北京时间（GMT+8）每天白天从上午9:10开到23:00,每20分钟开一次奖，每天开奖42期。</li>
        </SscRule>

        <KlsfRule v-if="showCode == 'gdklsf'">
          <h2 slot="name">{{openResult['gdklsf'].name}}规则说明</h2>
          <ul slot="describe">
            <li>每期{{openResult['gdklsf'].name}}开奖球数共八粒。每粒球除了总和玩法，其它都有单独的投注页面。{{openResult['gdklsf'].name}}每天开42期，每期间隔20分钟。北京时间（GMT+8）每天白天从上午09：00开到晚上23：00。</li>
          </ul>
        </KlsfRule>

        <K3Rule v-if="showCode == 'jsk3'">
          <h2 slot="name">{{openResult['jsk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['jsk3'].name}}”完全同步，北京时间（GMT+8）每天08:30:00~22:10:00，每20分钟开一次奖每天开奖41期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'mjsk3'">
          <h2 slot="name">{{openResult['mjsk3'].name}}规则说明</h2>

          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['mjsk3'].name}}”完全同步，北京时间（GMT+8）早上06:58:45 到 凌晨05:58:45，每75秒开一次奖,每天开奖1104期</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'hlk3'">
          <h2 slot="name">{{openResult['hlk3'].name}}规则说明</h2>

          <li
            slot="describe"
          >{{openResult['hlk3'].name}}”是引进澳洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；这类彩种在澳洲当地是非常火爆的，您可以放心投注、开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨06:25:00，每5分钟开一次奖,每天开奖276期。</li>
        </K3Rule>

        <K3Rule v-if="showCode == 'bjk3'">
          <h2 slot="name">{{openResult['bjk3'].name}}规则说明</h2>
          <li
            slot="describe"
          >该游戏的投注时间、开奖时间和开奖号码与“{{openResult['bjk3'].name}}”完全同步，北京时间（GMT+8）每天白天从上午9点00分开到晚上23点40分，每20分钟开一次奖,每天开奖44期。</li>
        </K3Rule>

        <K3Rule v-if="showCode == 'jlk3'">
          <h2 slot="name">{{openResult['jlk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['jlk3'].name}}”完全同步，北京时间（GMT+8）每天白天从上午08:20开到晚上21:40，每20分钟开一次奖,每天开奖40期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'shk3'">
          <h2 slot="name">{{openResult['shk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['shk3'].name}}”完全同步，北京时间（GMT+8）每天08:38~22:18，每20分钟开一次奖每天开奖41期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'hubk3'">
          <h2 slot="name">{{openResult['hubk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['hubk3'].name}}”完全同步，北京时间（GMT+8）每天09:00 至 22:00，每20分钟开一次奖每天开奖39期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'gxk3'">
          <h2 slot="name">{{openResult['gxk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['gxk3'].name}}”完全同步，北京时间（GMT+8）每天09:10 至 22:30，每20分钟开一次奖每天开奖40期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'ahk3'">
          <h2 slot="name">{{openResult['ahk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['ahk3'].name}}”完全同步，北京时间（GMT+8）每天08:40 至 22:00，每20分钟开一次奖每天开奖40期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'hebk3'">
          <h2 slot="name">{{openResult['hebk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['hebk3'].name}}”完全同步，北京时间（GMT+8）每天08:30 至 22:10，每20分钟开一次奖每天开奖41期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'gsk3'">
          <h2 slot="name">{{openResult['gsk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['gsk3'].name}}”完全同步，北京时间（GMT+8）每天10:00 至 22:00，每20分钟开一次奖每天开奖36期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'gzk3'">
          <h2 slot="name">{{openResult['gzk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['gzk3'].name}}”完全同步，北京时间（GMT+8）每天09:10 至 22:15，每20分钟开一次奖每天开奖39期。</span>
          </li>
        </K3Rule>

        <K3Rule v-if="showCode == 'gzk3'">
          <h2 slot="name">{{openResult['gzk3'].name}}规则说明</h2>
          <li slot="describe">
            <span>该游戏的投注时间、开奖时间和开奖号码与“{{openResult['gzk3'].name}}”完全同步，北京时间（GMT+8）每天09:10 至 22:15，每20分钟开一次奖每天开奖39期。</span>
          </li>
        </K3Rule>

        <KlsfRule v-if="showCode == 'cqklsf'">
          <h2 slot="name">{{openResult['cqklsf'].name}}规则说明</h2>
          <ul slot="describe">
            <li>每期{{openResult['cqklsf'].name}}开奖球数共八粒。每粒球除了总和玩法，其它都有单独的投注页面。</li>
            <li>早场-每天上午07:00到晚上23:40，每20分钟开奖一次，共50期。</li>
            <li>晚场-凌晨00:00到凌晨03:00，分20分钟开奖一次，共9期，全日共59期。</li>
            <li>每日23:40到隔日00:00暂停投注。</li>
          </ul>
        </KlsfRule>

        <Bjkl8Rule v-if="showCode == 'bjkl8'">
          <h2 slot="name">{{openResult['bjkl8'].name}}规则说明</h2>
          <li
            slot="describe"
          >该游戏投注、开奖时间和开奖号码与“{{openResult['bjkl8'].name}}”完全同步，北京时间（GMT+8）每天白天从早上09:00开到晚上23:55，每5分钟开一次奖，每天开奖179期。</li>
        </Bjkl8Rule>

        <Syx5Rule v-if="showCode == 'gd11x5'">
          <h2 slot="name">{{openResult['gd11x5'].name}}规则说明</h2>
          <ul slot="describe">
            <li>
              <span class="label">以下所有投注皆含本金。</span>
            </li>
            <li>「{{openResult['gd11x5'].name}}」是由国家体育总局发行，体育彩票管理中心承销，北京时间（GMT+8）每日早上9:30至晚上23:10；每日共开奖 42期、每 20 分钟开奖 1 次。</li>
          </ul>
        </Syx5Rule>

        <Syx5Rule v-if="showCode == 'sd11x5'">
          <h2 slot="name">{{openResult['sd11x5'].name}}规则说明</h2>
          <ul slot="describe">
            <li>
              <span class="label">以下所有投注皆含本金。</span>
            </li>
            <li>「{{openResult['sd11x5'].name}}」是由国家体育总局发行，体育彩票管理中心承销，北京时间（GMT+8）每日早上9点02分至晚上11点02分；每日共开奖 43期、每 20 分钟开奖 1 次。</li>
          </ul>
        </Syx5Rule>

        <Syx5Rule v-if="showCode == 'jx11x5'">
          <h2 slot="name">{{openResult['jx11x5'].name}}规则说明</h2>
          <ul slot="describe">
            <li>
              <span class="label">以下所有投注皆含本金。</span>
            </li>
            <li>「{{openResult['jx11x5'].name}}」是由国家体育总局发行，体育彩票管理中心承销，北京时间（GMT+8）每日早上9点30分至晚上11:10点；每日共开奖 42期、每 20 分钟开奖 1 次。</li>
          </ul>
        </Syx5Rule>

        <PcddRule v-if="showCode == 'pcdd'">
          <h2 slot="name">{{openResult['pcdd'].name}}规则说明</h2>
          <ul slot="describe">
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
        </PcddRule>

        <Hk6Rule v-if="showCode == 'hk6'" :name="openResult['hk6'].name"></Hk6Rule>

        <Hk6Rule v-if="showCode == 'xyhk6'" :name="openResult['xyhk6'].name">
          <ul slot="describe">
            <li>{{openResult['xyhk6'].name}}是引进欧洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；开奖时间，北京时间（GMT+8）每天白天从早上07:30:00开到凌晨04:00，每300秒开一次奖,每天开奖247期。</li>
            <li>具体游戏规则如下:</li>
          </ul>
        </Hk6Rule>

        <Pk10Rule v-if="showCode == 'jssc'">
          <h2 slot="name">{{openResult['jssc'].name}}规则说明</h2>
          <li
            slot="describe"
          >“{{openResult['jssc'].name}}”是引进欧洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；开奖时间，北京时间（GMT+8）每天白天从早上07:00:00开到凌晨05:58:45，每75秒开一次奖,每天开奖1104期。</li>
        </Pk10Rule>

        <SscRule v-if="showCode == 'jsssc'" :code="'jsssc'">
          <h2 slot="name">{{openResult['jsssc'].name}}规则说明</h2>
          <li
            slot="describe"
          >“{{openResult['jsssc'].name}}”是引进欧洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；开奖时间，北京时间（GMT+8）每天白天从早上07:00:00开到凌晨05:58:45，每75秒开一次奖,每天开奖1104期。</li>
        </SscRule>

        <SscRule v-if="showCode == 'txffc'" :code="'txffc'">
          <h2 slot="name">{{openResult['txffc'].name}}规则说明</h2>
          <li slot="describe">
            “{{openResult['txffc'].name}}”是以每分钟腾讯QQ的在线用户人数数字生成一个五位数字作为{{openResult['txffc'].name}}当期的开奖号码，您可以放心投注、开奖时间，北京时间（GMT+8）早上07:00:00 到
            凌晨06:00:00，每60秒开一次奖,每天开奖1439期
          </li>
        </SscRule>

        <SscRule v-if="showCode == 'azxy5'" :code="'azxy5'">
          <h2 slot="name">{{openResult['azxy5'].name}}规则说明</h2>
          <li
            slot="describe"
          >该游戏的投注时间、开奖时间和开奖号码与“{{openResult['azxy5'].name}}”完全同步，营业时间为北京时间(GMT+8)每天上午06:59到凌晨05:59，每5分钟开奖一次，每天开奖276期。</li>
        </SscRule>

        <Pk10Rule v-if="showCode == 'jsft'">
          <h2 slot="name">{{openResult['jsft'].name}}规则说明</h2>
          <li
            slot="describe"
          >“{{openResult['jsft'].name}}”是引进欧洲博彩公司开奖设备，由菲律宾博彩执照公司审核监控，联合开发的彩票游戏，保证公平公正；开奖时间，北京时间（GMT+8）每天白天从早上07:00:00开到凌晨05:58:45，每75秒开一次奖,每天开奖1104期。</li>
        </Pk10Rule>

        <Pk10Rule v-if="showCode == 'azxy10'">
          <h2 slot="name">{{openResult['azxy10'].name}}规则说明</h2>
          <li
            slot="describe"
          >该游戏的投注时间、开奖时间和开奖号码与“{{openResult['azxy10'].name}}”完全同步，营业时间为北京时间(GMT+8)每天上午06:59到凌晨05:59，每5分钟开奖一次，每天开奖276期。</li>
        </Pk10Rule>

        <Fc3dRule v-if="showCode == 'fc3d'">
          <h2 slot="name">{{openResult['fc3d'].name}}(原名：中国福彩“{{openResult['fc3d'].name}}”)规则说明</h2>
          <li
            slot="describe"
          >{{openResult['fc3d'].name}}是依照中国福利彩票管理中心发行的3D的开奖结果为派彩依据，营业时间为北京时间(GMT+8)每天上午10:00到晚上21:15，每天开奖一次。</li>
        </Fc3dRule>

        <Fc3dRule v-if="showCode == 'pl3'">
          <h2 slot="name">{{openResult['pl3'].name}}(原名：中国体彩“排列3”)规则说明</h2>
          <li
            slot="describe"
          >排列3是依照中国体育彩票管理中心发行的排列3的开奖结果为派彩依据，营业时间为北京时间(GMT+8)每天上午10:00到晚上20:30，每天开奖一次。</li>
        </Fc3dRule>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll";
import CtsscRule from "./rules/ctsscRule";
import Fc3dRule from "./rules/fc3dRule";
import Hk6Rule from "./rules/hk6Rule";
import PcddRule from "./rules/pcddRule";
import Syx5Rule from "./rules/syx5Rule";
import Bjkl8Rule from "./rules/bjkl8Rule";
import K3Rule from "./rules/k3Rule";
import KlsfRule from "./rules/klsfRule";
import SscRule from "./rules/sscRule";
import Pk10Rule from "./rules/pk10Rule";
import NiuniuRule from "./rules/niuniuRule";
import { mapState } from "vuex";
export default {
  name: "Rules",
  data() {
    return {
      showCode: "",
      scrollDatas: []
    };
  },
  components: {
    Scroll,
    Pk10Rule,
    NiuniuRule,
    SscRule,
    KlsfRule,
    K3Rule,
    Bjkl8Rule,
    Syx5Rule,
    PcddRule,
    Hk6Rule
  },
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
