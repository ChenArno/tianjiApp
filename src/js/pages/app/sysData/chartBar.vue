<template>
  <tjEcharts class="charts" :options="$format(options)" @finish='finish'></tjEcharts>
</template>
<script>
import {shorten} from 'Utils'
export default {
  props: ["data"],
  data() {
    return {
      length: 10,
      options: {},
      yList: [],
      xList: [],
      defalutList: []
    };
  },
  watch: {
    data(val) {
      this.change(val);
    }
  },
  methods: {
    change(val) {
      if (val.xList && val.xList.length === 0) return;
      this.xList = val.xList.map(v=>{
        return shorten(v, 4)
      });
      this.yList = val.yList;
      this.setDefalut(val.yList);
      this.setOptions();
    },
    setDefalut(arr) {
      this.defalutList = [];
      if (arr.length == 0) return (this.defalutList = [0]);
      let max = Math.max.apply(Math, arr);
      max = max + max * 0.1;
      let len = arr.length < this.length ? arr.length : this.length;
      for (let i = 0; i < len; i++) {
        this.defalutList.push(max);
      }
    },
    setOptions() {
      this.options = {
        color: ["#DE4F45", "rgba(179,179,179,0.2)"],
        tooltip: {
          trigger: "axis",
          formatter(params) {
            if (!params) return params;
            let newParamsName = params[0].name;
            let num = params[0].data;
            let msg = newParamsName + " : " + num;
            return msg;
          }
        },
        calculable: true,
        grid: {
          left: "5%",
          right: "5%",
          bottom: "25%",
          top: "10%"
        },
        xAxis: [
          {
            axisLabel: {
              textStyle: {
                color: "#000000"
              },
              interval: 0
            },
            type: "category",
            data: this.xList
          },
          {
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitArea: { show: false },
            splitLine: { show: false },
            type: "category",
            data: this.xList
          }
        ],
        yAxis: [
          {
            show: false,
            type: "value"
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            data: this.yList
          },
          {
            name: "",
            type: "bar",
            xAxisIndex: 1,
            data: this.defalutList
          }
        ]
      };
    },
    finish() {
      this.$emit("end");
    }
  }
};
</script>
<style scoped>
.charts {
  width: 750;
  height: 480;
  background-color: #ffffff;
}
</style>
