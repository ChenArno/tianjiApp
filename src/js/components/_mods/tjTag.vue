<template>
  <div class="tag" :class="[state?'tag-back':'']" @click="onclick">
    <text class="tag-cell" :class="[state?'tag-back-cell':'']">{{$t(label)}}</text>
  </div>
</template>

<script>
export default {
  props:{
    label:{
      type:String,
      default:""
    },
    state:Boolean
  },
  methods:{
    onclick(){
      this.$emit('onClick');
    }
  }
}
</script>
<style scoped>
.tag{
  height: 60;
  padding-left: 15;
  padding-right: 15;
  justify-content: center;
  border-width: 2;
  border-color: #fdae51;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  align-self: flex-start;
  margin-left: 15;
}
.tag-back{
  background-color: #fdae51;
}
.tag-cell{
  font-size: 25;
  color: #666666;
}
.tag-back-cell{
  color: #ffffff;
}
</style>
