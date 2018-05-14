<template>
  <div class="tj-cont">
    <div class="status-bar" :style="{'height': $getDataSync('statusBarHeight')}"></div>
    <wxc-minibar class="tj-head" leftButton="" background-color="#fff">
      <text class="tj-head-cell" slot="middle">{{$t('快捷应用')}}</text>
    </wxc-minibar>
    <text>cckljj</text>
    <wxc-result type="noGoods" class="wxc-result" :custom-set="customSet" @wxcResultButtonClicked="wxcResultButtonClicked"></wxc-result>
  </div>
</template>

<script>
import { WxcMinibar, WxcResult } from "weex-ui";
export default {
  props: ["show"],
  data() {
    return {
      customSet: {
        noGoods: {
          button: "应用",
          desc: "",
          content: "暂无快捷应用，去应用中选择吧",
          pic: "bmlocal://assets/img/noMessage_error.png"
        }
      }
    };
  },
  components: { WxcMinibar, WxcResult },
  mounted() {},
  methods: {
    wxcResultButtonClicked() {
      this.$event.emit("pageChange", 2);
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.wxc-result{
  margin-top: 130;
}
</style>
