<template>
  <wxc-result :type="type>1?'noNetwork':'noGoods'" :style="{'margin-top':BarHeight}" :padding-top="paddingTop" :show="type>0" :custom-set="customSet" :wrap-style="wrapStyle"></wxc-result>
</template>
<script>
import { WxcResult } from "weex-ui";
export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    paddingTop: {
      type: Number,
      default: 300
    },
    customSet: {
      type: Object,
      default: {
        noGoods: {
          button: null,
          desc: "",
          content: "暂无数据",
          pic: "bmlocal://assets/img/noMessage_error.png"
        },
        noNetwork: {
          button: null,
          desc: null,
          content: "暂无网络",
          pic: "bmlocal://assets/img/network_error.png"
        }
      }
    },
    wrapStyle: {
      type: Object,
      default: {}
    }
  },
  computed: {
    BarHeight() {
      return parseInt(this.$getDataSync('statusBarHeight'))+90
    }
  },
  components: { WxcResult },
  methods: {
    onClicked(e) {
      const { type, disabled } = this;
      this.$emit("wxcButtonClicked", { e, type, disabled });
    }
  }
};
</script>

<style scoped>

</style>