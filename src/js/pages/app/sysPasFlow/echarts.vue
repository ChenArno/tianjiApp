<template>
  <tjEcharts class="charts" :options="$format(options)" @finish='finish'></tjEcharts>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      options: {},
      xList: [],
      yList: []
    };
  },
  // mounted() {
  //   this.change(this.list);
  // },
  watch: {
    list(val) {
      this.change(val);
    }
  },
  methods: {
    change(val) {
      this.xList = val.xList;
      this.yList = val.yList;
      this.setOptions();
    },
    setOptions() {
      this.options = {
        grid: {
          top: "10%",
          right: "5%",
          left: "5%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xList
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: this.data,
            type: "line",
            smooth: true,
            areaStyle: { normal: {} },
            itemStyle: {
              normal: {
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   { offset: 0, color: "rgba(222,79,69,1)" },
                //   { offset: 1, color: "rgba(222,79,69,0.1)" }
                // ])
              }
            },
            data: this.yList
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
  height: 430;
  background-color: #ffffff;
}
</style>
