<template>
  <div v-if="show">
    <image :src="leftButton" v-if="leftButton && !leftText" class="left-button"></image>
    <text v-if="leftText" class="icon-text" :style="{ color: textColor }">{{leftText}}</text>
  </div>
</template>
<script>
import { WxcMinibar } from "weex-ui";
export default {
  props: {
    leftText: {
      type: String,
      default: ""
    },
    leftButton: {
      type: String,
      default: "https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png"
    },
    textColor: {
      type: String,
      default: "#3D3D3D"
    },
    show:{
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.left-button {
  width: 21px;
  height: 36px;
}
.icon-text {
  font-size: 28px;
  color: #ffffff;
}
</style>