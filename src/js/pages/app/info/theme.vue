<template>
  <div class="cont cont-top">
    <div class="cont-cell">
      <div class="back-img" v-for="(item,i) in 7" :key="i">
        <image class="back-img-cell" :src="`bmlocal://assets/img/back${i}.jpg`" @click="click(i)"></image>
        <text class="iconfont" v-if="checked==('back'+i)">&#xe63e;</text>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcMinibar } from "weex-ui";
export default {
  data() {
    return {
      checked: "back0"
    };
  },
  eros: {
    beforeAppear(params, options) {
      this.checked = this.$getDataSync("Theme")
        ? this.$getDataSync("Theme")
        : "back0";
    }
  },
  components: { WxcMinibar },
  methods: {
    click(val) {
      this.checked = "back" + val;
      this.$setDataSync("Theme", this.checked);
      this.$event.emit('theme.change',this.checked)
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.cont-cell{
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction:row;
}
.back-img-cell{
  width:320;
  height:200;
  margin-left:30;
  margin-right:20;
  margin-top:20;
  position: relative;
}
.iconfont{
  position: absolute;
  right: 30;
  top:30;
  width: 40;
  height: 40;
  color: #7db450;
  font-size:38;
}
</style>
