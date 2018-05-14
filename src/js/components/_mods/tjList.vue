<template>
  <div class="list">
    <div class="list-head">
      <div class="list-left">
        <text class="left-icon" :style="{'background-color':backgroundColor}"></text>
        <text>{{title}}</text>
      </div>
      <div class="list-right">
        <slot name="right">
          <text v-if="rightText">{{rightText}}</text>
        </slot>
      </div>
    </div>
    <div class="list-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.list{
  background-color: #fff;
  margin-bottom: 21;
}
.list-head {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 90;
  padding-left: 13;
  padding-right: 13;
}
.list-left {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}
.list-right{
  flex: 1;
}
.left-icon {
  width: 5;
  height: 30;
  margin-right: 11;
}
</style>
<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "#df4f45"
    },
    title: {
      type: String,
      default: "标题"
    },
    rightText:{
      type: String,
      default: ""
    }
  }
};
</script>
