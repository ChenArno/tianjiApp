<template>
  <div>
    <div class="shop-area">
      <text class="iconfont">&#xe61c;</text>
      <text>{{defalutDep.label}}</text>
    </div>
    <scroller ref="list" :showRefresh="true" :show-scrollbar="false" :loadmoreoffset="100" @refresh="onrefresh" @loadmore="onloadmore">
      <tj-load :loading="loading" v-if="dataList.length>0"></tj-load>
      <no-msg :length="dataList.length" @msgRefesh="onrefresh"></no-msg>
    </scroller>
  </div>
</template>

<script>
import { alarmCard, tjLoad, noMsg } from "Components";
export default {
    data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      dataList: [],
      deptId: -1,
      loading: false
    };
  },
    components: { alarmCard, tjLoad, noMsg },
};
</script>

<style lang="sass" scoped>
@import "src/js/css/common.scss";

</style>
