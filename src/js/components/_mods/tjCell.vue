<template>
  <div class="tj-cell" @click="onClick">
    <div class="tj-cell-left">
      <slot>
      </slot>
    </div>
    <div class="tj-cell-right">
      <slot name="right">
        <wxc-icon :name="iconType" class="contact-arrow"></wxc-icon>
      </slot>
    </div>
  </div>
</template>
<script>
import { WxcIcon } from "weex-ui";
export default {
  props: {
    iconType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  components: { WxcIcon },
  methods: {
    onClick() {
      this.$emit("onClick");
    }
  }
};
</script>
<style scoped>
.tj-cell {
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 30;
  padding-right: 30;
  justify-content: space-between;
  align-items: center;
  width: 750;
  height: 110;
  border-bottom-style: solid;
  border-bottom-width: 1;
  border-bottom-color: #e6e6e6;
  flex-direction: row;
}
.tj-cell-left {
  flex-direction: row;
  align-items: center;
}
</style>
