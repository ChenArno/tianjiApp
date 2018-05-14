<template>
  <div class="tj-cont">
    <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="text" :tab-page-height="100" @wxcTabPageCurrentTabSelected="TabSelected">
    </wxc-tab-page>
    <scroller ref="list" :show-scrollbar="false" :showRefresh="true" @refresh="onrefresh">
      <div class="tj-title">
        <text class="tj-title-cell">{{$t('组织关键指标')}}</text>
      </div>
    </scroller>
    <wxc-popover ref="wxc-popover" :buttons="btns" :position="popoverPosition" :arrowPosition="popoverArrowPosition" @wxcPopoverButtonClicked="ButtonClicked"></wxc-popover>
  </div>
</template>
<script>
import { WxcMinibar, WxcTabPage, Utils, WxcPopover } from "weex-ui";
import { tjHeader, tjBack } from "Components";
import config from "Utils/tabStyle";
const dom = weex.requireModule("dom");

export default {
  props: ["show"],
  data() {
    return {
      tabStyles: config.tabStyles(2),
      deptId: -1,
      popoverPosition: { x: -14, y: 380 },
      popoverArrowPosition: { pos: "top", x: -15 }
    };
  },
  computed: {
    tabTitles() {
      return [
        {
          title: this.$t("本月")
        },
        {
          title: this.$t("上月")
        }
      ];
    },
    btns() {
      return [
        {
          text: "成交率-进店率"
        },
        {
          text: "连带率-销售额"
        }
      ];
    }
  },
  components: {
    WxcMinibar,
    tjHeader,
    tjBack,
    WxcTabPage,
    WxcPopover
  },
  eros: {
    beforeBackAppear(params, options) {
      let { id } = params;
      if (id) {
        this.deptId = id;
      }
    }
  },
  created() {
    this.deptId = this.$getDataJsonSync("defalutShop").id;
  },
  mounted() {
    // const result = dom.getComponentRect(this.$refs.pop, option => {
    //   let { size } = option;
    //   this.popoverPosition.y = size.bottom + 40;
    // });
  },
  watch: {
    deptId(val) {
      if (val == -1) return;
      this.init();
    }
  },
  methods: {
    init() {},
    onrefresh() {},
    TabSelected() {},
    ButtonClicked() {}
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";

</style>
