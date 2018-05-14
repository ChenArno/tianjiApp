<template>
  <div class="loading">
    <wxc-loading :show="loading" type="trip"></wxc-loading>
    <wxc-part-loading :show="loading" :width="36" :height="36"></wxc-part-loading>
  </div>
</template>

<script>
import { WxcLoading, WxcPartLoading } from "weex-ui";
export default {
  props: ["loading"],
  components: { WxcLoading, WxcPartLoading }
};
</script>

<style scoped>
.loading {
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  height: 80px;
  justify-content: center;
}
</style>
