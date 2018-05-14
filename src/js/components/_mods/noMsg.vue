<template>
  <wxc-result :padding-top="paddingTop" type="noGoods" :show="length==0" :custom-set="customSet" @wxcResultButtonClicked="refesh"></wxc-result>
</template>
<script>
import { WxcResult } from "weex-ui";
export default {
  props: ["length","padding-top"],
  components: {
    WxcResult
  },
  computed: {
    customSet() {
      return {
        noGoods: {
          button:this.$t("刷新一下"),
          desc: "",
          content: this.$t("暂无数据"),
          pic: "bmlocal://assets/img/noMessage_error.png"
        }
      };
    }
  },
  methods: {
    refesh(){
      this.$emit("msgRefesh");
    }
  }
};
</script>
<style scoped>
.no-msg-cell {
  width: 340;
  height: 340;
}
.no-msg-text {
  align-items: center;
  width: 340;
}
.no-msg {
  position: absolute;
  width: 750;
  top: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
}
</style>
