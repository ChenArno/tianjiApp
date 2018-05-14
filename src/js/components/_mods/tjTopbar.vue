<template>
  <wxc-minibar :title="title" :background-color="backgroundColor" :text-color="textColor" right-text="更多" @wxcMinibarLeftButtonClicked="LeftButtonClick" @wxcMinibarRightButtonClicked="RightButtonClick"></wxc-minibar>
</template>
<script>
import { WxcMinibar } from "weex-ui";
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    textColor: {
      type: String,
      default: "#333333"
    },
    rightText: {
      type: String,
      default: ""
    },
    rightButton: {
      type: String,
      default: ""
    },
    leftButton: {
      type: String,
      default: ""
    },
    leftText:{
      type: String,
      default: ""
    }
  },
  methods: {
    onClicked(e) {
      const { type, disabled } = this;
      this.$emit("wxcButtonClicked", { e, type, disabled });
    }
  }
};
</script>

<style scoped>
.wxc-btn {
  background-color: #df4f45;
  width: 659px;
  height: 95px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-top: 20;
}
.wxc-btn:active {
  background-color: #fe8a81;
}
.wxc-btn-active {
  background-color: #fe8a81;
}
.btn-text {
  text-overflow: ellipsis;
  lines: 1;
  font-size: 36px;
  color: #ffffff;
}
</style>