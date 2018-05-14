<template>
  <wxc-tab-bar ref='wxc-tab-bar' :duration="0" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="icon" @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- 第一个页面内容-->
    <div class="item-container" :style="contentStyle">
      <tab-quick :show="false"></tab-quick>
    </div>

    <!-- 第二个页面内容-->
    <div class="item-container" :style="contentStyle">
      <tab-chat :viewHeight="viewHeight"></tab-chat>
    </div>

    <!-- 第三个页面内容-->
    <div class="item-container" :style="contentStyle">
      <tab-apply></tab-apply>
    </div>

    <!-- 第四个页面内容-->
    <div class="item-container" :style="contentStyle">
      <tab-my></tab-my>
    </div>
  </wxc-tab-bar>
</template>

<script>
import { WxcTabBar, Utils } from "weex-ui";
import apply from "./apply.vue";
import my from "./my.vue";
import chat from "./chat.vue";
import quick from "Utils/modules";
import rongy from "Config/rongy";

export default {
  data() {
    return {
      tabStyles: {
        bgColor: "#FFFFFF",
        titleColor: "#666666",
        activeTitleColor: "#de4f45",
        activeBgColor: "#FFFFFF",
        // isActiveTitleBold: true,
        iconWidth: 48,
        iconHeight: 48,
        width: 160,
        height: 98,
        fontSize: 26,
        textPaddingLeft: 10,
        textPaddingRight: 10
      },
      page: 0,
      contentStyle: {},
      viewHeight: 1000
    };
  },
  eros: {
    beforeAppear(params, options) {
      new rongy();
    }
  },
  computed: {
    tabTitles() {
      let quick = this.$t("快捷");
      if (this.$getDataJsonSync("defalutApp").moduleName) {
        quick = this.$getDataJsonSync("defalutApp").moduleName;
      }
      return [
        {
          title: quick,
          icon: "bmlocal://assets/img/icon/tab-quick.png",
          activeIcon: "bmlocal://assets/img/icon/tab-quick1.png"
        },
        {
          title: this.$t("消息"),
          icon: "bmlocal://assets/img/icon/tab-message.png",
          activeIcon: "bmlocal://assets/img/icon/tab-message1.png"
        },
        {
          title: this.$t("应用"),
          icon: "bmlocal://assets/img/icon/tab-apply.png",
          activeIcon: "bmlocal://assets/img/icon/tab-apply1.png"
        },
        {
          title: this.$t("我的"),
          icon: "bmlocal://assets/img/icon/tab-my.png",
          activeIcon: "bmlocal://assets/img/icon/tab-my1.png"
        }
      ];
    }
  },
  components: {
    WxcTabBar,
    "tab-quick": quick(),
    "tab-apply": apply,
    "tab-my": my,
    "tab-chat": chat
  },
  created() {
    // const tabPageHeight = Utils.env.getPageHeight();
    // 如果页面没有导航栏，可以用下面这个计算高度的方法
    const tabPageHeight =
      parseInt(weex.config.env.deviceHeight) /
      parseInt(weex.config.env.deviceWidth) *
      750;
    const { tabStyles } = this;
    this.contentStyle = { height: tabPageHeight - tabStyles.height + "px" };
    this.viewHeight =
      tabPageHeight -
      (parseInt(this.$getDataSync("statusBarHeight")) +
        90 +
        tabStyles.height +
        1);
    this.$event.on("pageChange", params => {
      this.$refs["wxc-tab-bar"].setPage(params);
    });
  },
  methods: {
    wxcTabBarCurrentTabSelected(e) {
      this.page = e.page;
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.item-container {
  width: 750px;
  background-color: #f2f3f4;
  border-style: solid;
  border-bottom-width: 1;
  border-bottom-color: #b3b3b3;
}

</style>
