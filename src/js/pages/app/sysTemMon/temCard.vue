<template>
  <div class="tem">
    <div class="tem-head-cell tem-top" v-if="!param.show">
      <text>{{$t('当前')}}:</text>
      <text class="tj-green">{{type == 0 ? param.temperature : param.humidity}}</text>
      <text>{{unit}}</text>
    </div>
    <div class="tem-head tem-top" v-if="param.show">
      <div class="tem-head-cell">
        <text>{{$t('最高')}}:</text>
        <text class="tj-red">{{type == 0 ? param.curveData.maxTemperature : param.curveData.maxHumidity}}</text>
        <text>{{unit}}</text>
      </div>
      <div class="tem-head-cell">
        <text>{{$t('当前')}}:</text>
        <text class="tj-green">{{type == 0 ? param.temperature : param.humidity}}</text>
        <text>{{unit}}</text>
      </div>
      <div class="tem-head-cell">
        <text>{{$t('最低')}}:</text>
        <text class="tj-blue">{{type == 0 ? param.curveData.minTemperature : param.curveData.minHumidity}}</text>
        <text>{{unit}}</text>
      </div>
    </div>
    <echarts v-if="param.show" :curveData="curveData" @end="finish" :type="type"></echarts>

    <div class="tem-head">
      <div class="tem-foot-cell">
        <text>{{$t('电量状态')}}:</text>
        <tem-icon type="ele_unknown"></tem-icon>
      </div>
      <div class="tem-foot-cell">
        <text>{{$t('在线状态')}}:</text>
        <tem-icon type="line_not"></tem-icon>
      </div>
      <div class="tem-foot-cell">
        <text>{{$t('工作状态')}}:</text>
        <tem-icon type="work_ab"></tem-icon>
      </div>
    </div>
    <div class="tem-foot" @click="arrowShow(param)">
      <text class="device-times">{{ $t('监控时间段') }}:{{param.fortifyBeginTime}}-{{param.fortifyEndTime}}</text>
      <text class="iconfont">&#xe616;</text>
    </div>
  </div>
</template>

<script>
import temIcon from "./temIcon.vue";
import echarts from "./echarts.vue";
import { queryTagHumitureRealChat } from "api/sysTemMon";
export default {
  props: ["param", "tjLoad", "type"],
  data() {
    return {
      curveData:{}
    };
  },
  computed: {
    unit() {
      if (this.type == 0) {
        return "℃";
      }
      return "%";
    }
  },
  components: { temIcon, echarts },
  methods: {
    arrowShow(val) {
      if (val.monitorType == 0) return;  //0-非监控时段，1-监控时段
      if (!val.show) {
        this.load(true);
        this.queryTagHumitureRealChat(val);
        return;
      }
      val.show = false;
    },
    finish() {
      setTimeout(() => {
        this.load(false);
      }, 1000);
    },
    load(val) {
      this.$emit("load", val);
    },
    queryTagHumitureRealChat(val) {
      let data = {
        deviceSerial: val.deviceSerial,
        positionId: val.positionId
      };
      queryTagHumitureRealChat(data)
        .then(res => {
          if (res.data) {
            val.curveData = res.data;
            this.curveData = res.data.chartData;
            val.show = true;
            return;
          }
          this.$notice.toast({
            message: this.$t("暂无数据")
          });
        })
        .catch(err => {
          this.load(false);
        });
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.tem{
  padding-left:13;
  padding-right:13;
  align-items: center;
}
.tem-head{
  width:684;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.tem-head-cell{
  flex-direction: row;
  align-items: center;
  height:30;
}
.tj-green{
  font-size:36;
}
.tem-foot{
  align-items: center;
}
.tem-foot-cell{
  align-items: center;
}
.tem-top{
  margin-bottom:50;
}
.device-times{
  padding-top:5;
  padding-bottom:5;
}
</style>
