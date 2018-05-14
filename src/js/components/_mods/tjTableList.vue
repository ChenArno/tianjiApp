<template>
  <div class="list">
    <div class="list-main">
      <div class="cell" :class="[active==i?'cell-active':'']" v-for="(item,i) in tabTitles" :key="i" @click="onclick(item,i)">
        <text class="desc" :class="[active==i?'desc-active':'']">{{item.title}}</text>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['tabTitles','activeIndex'],
  data(){
    return{
      active:0
    }
  },
  mounted(){
    this.active = this.activeIndex;
  },
  methods:{
    onclick(item,i){
      this.active = i;
      this.$emit("onClick",{page:i});
    }
  }
};
</script>
<style scoped>
.list {
  height: 100;
  width: 750;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.list-main{
  border-top-left-radius: 40;
  border-top-right-radius: 40;
  border-bottom-left-radius: 40;
  border-bottom-right-radius: 40;
  flex-direction: row;
  background-color: rgb(242,242,242);
}
.cell{
  height: 60;
  border-top-left-radius: 40;
  border-top-right-radius: 40;
  border-bottom-left-radius: 40;
  border-bottom-right-radius: 40;
  padding-left: 20;
  padding-right: 20;
  justify-content: center;
  align-items: center;
  background-color: rgb(242,242,242);
}
.cell-active{
  background-color: rgb(255,101,103);
}
.desc-active{
  color: #ffffff;
}
.desc{
  color: rgb(102,102,102);
}
</style>
