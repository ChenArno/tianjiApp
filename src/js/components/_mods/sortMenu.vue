<template>
  <div class="scroller">
    <scroller class="scroller-cell" :show-scrollbar="false" scroll-direction="horizontal">
      <div class="cell" v-for="(item,i) in list" :key="i" :ref="'item'+i">
        <text class="contact-reg" :class="[i==(list.length-1)?'':'contact-reg-active']" @click="onclick(i,item)">{{$t(item[props])}}</text>
        <wxc-icon name="more" class="contact-arrow" v-if="i!=list.length-1"></wxc-icon>
      </div>
    </scroller>
  </div>
</template>
<script>
const dom = weex.requireModule("dom");
import { WxcIcon } from "weex-ui";
export default {
  props: ["list", "props"],
  components: { WxcIcon },
  data() {
    return {};
  },
  // watch: {
  //   list(val) {
  //     setTimeout(() => {
  //       let obj = "item" + (val.length - 1);
  //       const el = this.$refs[obj][0];
  //       dom.scrollToElement(el, {offset: 0});
  //     }, 500);
  //   }
  // },
  methods: {
    onclick(x, val) {
      if (x == this.list.length - 1) return;
      this.$emit("naClick", val);
    }
  }
};
</script>
<style scoped>
.scroller {
  background-color: #fff;
  border-bottom-style: solid;
  border-bottom-width: 1;
  border-bottom-color: #e6e6e6;
  margin-bottom:1; 
}
.scroller-cell{
  flex-direction: row;
  width: 750;
  height: 99;
}
.cell {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.contact-reg {
  padding-left: 30;
  padding-right: 6;
  color: #999999;
  lines: 1;
}
.contact-reg-active {
  color: #df4f45;
}
.contact-arrow {
  margin-top: 6;
}
</style>
