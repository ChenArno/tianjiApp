<template>
  <div class="tj-card" @click="onclick">
    <div class="tj-card-head" v-if="!nohead">
      <slot name="left">
        <text v-if="leftText">{{leftText}}</text>
      </slot>
      <slot name="right">
        <text class="card-right" v-if="rightText">{{rightText}}</text>
      </slot>
    </div>
    <div class="tj-card-body" :class="[noBack?'no-back':'']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nohead:Boolean,
    noBack:Boolean,
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    onclick(){
      this.$emit("onclick");
    }
  }
};
</script>
<style scoped>
.tj-card {
  width: 710;
  margin-top: 21;
  margin-left: 20;
  margin-right: 20;
  background-color: #f2f3f4;
  /* box-shadow: 0 1 10 rgba(255, 255, 255, .1); */
}
.tj-card-head {
  height: 72;
  width: 710;
  border-style: solid;
  border-bottom-width: 1;
  border-bottom-color: #e6e6e6;
  background-color: #ffffff;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  flex-direction: row;
  padding-left: 10;
  padding-right: 10;
  justify-content: space-between;
  align-items: center;
}
.tj-card-body {
  padding-top: 20;
  padding-bottom: 20;
  background-color: #ffffff;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
}
.no-back{
  background-color: transparent;
  border-top-color: rgb(217,217,217);
  border-top-width:2;
  border-top-style:dashed; 
  border-bottom-color: rgb(217,217,217);
  border-bottom-style:dashed; 
}
.card-right{
  color: #666666;
  font-size: 24;
}
</style>
