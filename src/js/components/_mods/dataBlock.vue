<template>
  <div class="point-cell">
    <div class="cell">
      <image class="point-img" :src="`bmlocal://assets/img/icon/icon-${data.icon}.png`"></image>
      <div class="point-desc">
        <div class="point-list">
          <wxc-part-loading :show="data.isShow"></wxc-part-loading>
          <text class="point-point" v-if="!data.isShow">{{ unit }}</text>
        </div>
        <text class="cell-desc">{{$t(data.title)}}</text>
      </div>
    </div>
    <div class="point-foot" v-if="!type">
      <text class="rate">{{$t('变化率')}}</text>
      <div class="point-foot-cell">
        <text class="iconfont" :style="{color:colorRate?'#17b98c':'#ff6567'}">{{colorRate?'&#xe6b4;':'&#xe6b6;'}}</text>
        <text :style="{color:colorRate?'#17b98c':'#ff6567'}">{{rate}}%</text>
      </div>
    </div>
    <div class="point-foot" v-if="type">
      <text class="rate">{{$t('相比上月环比')}}</text>
      <div class="point-foot-cell">
        <text class="iconfont" :style="{color:colorRate?'#17b98c':'#ff6567'}">{{colorRate?'&#xe6b4;':'&#xe6b6;'}}</text>
        <text :style="{color:colorRate?'#17b98c':'#ff6567'}">{{rate}}%</text>
      </div>
    </div>
    <div class="point-foot" v-if="type">
      <text class="rate">{{$t('相比去年环比')}}</text>
      <div class="point-foot-cell">
        <text class="iconfont" :style="{color:colorYoy?'#17b98c':'#ff6567'}">{{colorYoy?'&#xe6b4;':'&#xe6b6;'}}</text>
        <text :style="{color:colorYoy?'#17b98c':'#ff6567'}">{{yoy}}%</text>
      </div>
    </div>
  </div>
</template>
<script>
import { WxcPartLoading } from "weex-ui";
import { transNum } from "Utils";
export default {
  props: ["data", "type","isShow"],
  data() {
    return {
      rate: "",
      yoy: ""
    };
  },
  components: { WxcPartLoading },
  computed: {
    colorRate() {
      this.rate =
        this.data.rate == 0 ? 0 : (Math.abs(this.data.rate) * 100).toFixed(2);
      return this.data.rate > 0 ? true : false;
    },
    colorYoy() {
      this.yoy =
        this.data.yoy == 0 ? 0 : (Math.abs(this.data.yoy) * 100).toFixed(2);
      return this.data.yoy > 0 ? true : false;
    },
    unit(){     
      return transNum(this.data.count);
    }
  }
};
</script>
<style scoped>
.point-cell {
  width: 375;
  padding-left: 30;
  padding-right: 30;
  padding-top: 15;
  padding-bottom: 15;
  justify-content: space-between;
}
.point-desc {
  height: 100;
  justify-content: center;
}
.point-img {
  width: 81;
  height: 81;
}
.point-point {
  color: #666666;
  font-size: 38;
  font-weight: bold;
  text-align: right;
  lines: 1;
}
.cell {
  justify-content: space-between;
  flex-direction: row;
  height: 130;
}
.iconfont {
  font-family: iconfont;
  font-size: 52;
  color: #17b98c;
  margin-top: 10;
}
.point-foot {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.point-foot-cell {
  flex-direction: row;
  align-items: center;
}
.cell-desc {
  font-size: 26;
  color: #666666;
  text-align: right;
}
.rate {
  font-size: 24;
  color: #b3b3b3;
}
.point-list {
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.unit {
  font-size: 20;
}
</style>
