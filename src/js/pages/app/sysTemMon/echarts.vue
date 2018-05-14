<template>
  <div>
    <tjEcharts class="charts" :options="$format(options)" @finish='finish'></tjEcharts>
  </div>
</template>

<script>
export default {
  props: ["curveData", "type"],
  data() {
    return {
      options: {},
      xList: [],
      yList: [],
      min: 0,
      max: 0
    };
  },
  computed: {
    str() {
      if (this.type == 1) {
        return this.$t("湿度");
      }
      return this.$t("温度");
    },
    unit() {
      if (this.type == 0) {
        return "℃";
      }
      return "%";
    }
  },
  mounted() {
    this.change(this.curveData);
  },
  watch: {
    curveData(val) {
      this.change(val);
    }
  },
  methods: {
    change(val) {
      this.xList = val.xList;
      const {tptList,tptLowerList,tptUpperList,humList,humLowerList,humUpperList} = val;
      if (this.type == 0) {
        this.yList = tptList;
        this.min = tptLowerList && tptLowerList[0];
        this.max = tptUpperList && tptUpperList[0];
      } else {
        this.yList = humList;
        this.min = humLowerList && humLowerList[0];
        this.max = humUpperList && humUpperList[0];
      }
      this.setOptions();
    },
    setOptions() {
      this.options = {
        grid: {
          top: "10%",
          left: "5%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter:
            "{b0}<br/>" + this.$t("当前") + this.str + ":{c0}" + this.unit
        },
        xAxis: {
          // type: "time",
          // boundaryGap: false
          type: "category",
          data: this.xList,
          boundaryGap: false,
          axisLabel: {
            formatter(value, index) {
              return value.substring(0, 5);
            }
          }
        },
        yAxis: {
          show: true,
          type: "value"
        },
        series: [
          {
            type: "line",
            areaStyle: { normal: {} },
            itemStyle: {
              normal: {
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   { offset: 0, color: "rgba(222,79,69,1)" },
                //   { offset: 1, color: "rgba(222,79,69,0.1)" }
                // ])
              }
            },
            markLine: {
              silent: true,
              symbol: "none",
              data: [{ yAxis: this.min }, { yAxis: this.max }],
              lineStyle: {
                normal: {
                  color: "#EC4F46"
                }
              },
              label: {
                normal: {
                  position: "middle",
                  formatter:this.$t('预警值')+":{c0}" + this.unit
                }
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
  width: 690;
  height: 390;
}
</style>
