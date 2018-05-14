<template>
  <image class="icon" :src="`bmlocal://assets/img/imgIcon/${type}.png`"></image>
</template>
<script>

/*
*电量 ele_low ele_noraml ele_unknown
*在线  line_not  line_on
* 工作状态  work_ab work_noraml work_un
**/
export default {
  props:['type'],
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.icon{
  width: 45;
  height: 45;
  margin-top: 10;
  margin-bottom:10;
}
</style>
