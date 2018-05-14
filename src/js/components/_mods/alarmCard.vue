<template>
  <div class="tj-card" @click="goItem">
    <div class="tj-icon">
      <text class="iconfont" :style="{color: proms.state==0?'#FD5F57':(proms.state==1?'#54A1FD':'#01ae94')}">&#xe652;</text>
      <text class="icon-text">{{$t(proms.stateName)}}</text>
    </div>
    <div class="tj-card-head">
      <slot name="icon">
      </slot>
      <slot name="left">
        <text v-if="leftText" :style="{'color':(proms.alarmType == 1 || proms.alarmType == 2)?'#DE4F45':'#54A1FD'}">{{leftText}}</text>
      </slot>
      <text class="card-time">{{$t('报警时间')}}</text>
      <text class="card-right" v-if="rightText">{{rightText}}</text>
    </div>
    <div class="tj-card-body">
      <image class="crad-img" :src="proms.imgList.length>0 ? proms.imgList[0].fullImgUrl:''"></image>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    proms:{
      type:Object,
      default:{}
    }
  },
  methods:{
    goItem(){
      this.$emit("goItem");
    }
  }
};
</script>
<style scoped>
.tj-card {
  width: 750;
  margin-top: 20;
  background-color: #ffffff;
  padding-left: 30;
  padding-right: 30;
  border-style: solid;
  border-top-width: 1;
  border-top-color: #e3e3e3;
  border-bottom-width: 1;
  border-bottom-color: #e3e3e3;
  position: relative;
}
.tj-card-head {
  height: 72;
  width: 750;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.tj-card-body {
  padding-top: 20;
  padding-bottom: 20;
  flex-direction: row;
  align-items: center;
}
.card-right {
  color: #999899;
  font-size: 26;
}
.card-time {
  color: #666666;
  margin-left: 20;
  margin-right: 20;
}
.crad-img {
  width: 200;
  height: 200;
  margin-right: 50;
}
.tj-icon {
  height: 130;
  width: 130;
  position: absolute;
  top: -18;
  right: -18;
}
.iconfont {
  font-family: iconfont;
  font-size: 130;
  transform: rotate(-90deg);
}
.icon-text{
  position: absolute;
  top: 38;
  right: 18;
  color: #ffffff;
  transform: rotate(45deg);
  font-size: 24;
}
</style>
