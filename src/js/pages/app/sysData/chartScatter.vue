<template>
  <tjEcharts class="charts" :options="$format(options)" @finish='finish'></tjEcharts>
</template>
<script>
export default {
  props: ["data", "type"],
  data() {
    return {
      options: {},
      name: ""
    };
  },
  // mounted() {
  //   this.change(this.data);
  // },
  watch: {
    data(val) {
      this.change(val);
    },
    type(val) {
      if (val == 1) {
        this.name = `${this.$t("销售额")}(${this.$t("万")}${this.$t("元")})`;
      } else if (val == 2) {
        this.name = `${this.$t("销售额")}(${this.$t("元")})`;
      } else {
        this.name = "";
      }
    }
  },
  methods: {
    change(val) {
      this.setOptions();
    },
    setOptions() {
      let yFor = this.type ? "{value}" : "{value}%";
      this.options = {
        color: ["#FF7072"],
        grid: {
          left: "3%",
          right: "7%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          textStyle: {
            fontSize: "12"
          },
          selectedMode: false,
          data: [this.$t("店铺")],
          right: "6%"
        },
        tooltip: {
          // trigger: 'axis',
          showDelay: 0,
          formatter: `${this.change?this.$t("成交率"):this.$t("连带率")}-{c0}-${this.change?this.$t("进店率"):this.$t("销售额")}`
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        yAxis: [
          {
            nameTextStyle: {
              color: "#666"
            },
            type: "value",
            name: this.name,
            axisLabel: {
              formatter: yFor
            }
          }
        ],
        series: [
          {
            name: this.$t("店铺"),
            type: "scatter",
            data: this.data,
            markPoint: {
              color: "",
              symbol: "rect",
              symbolSize: [40, 30],
              itemStyle: {
                normal: {
                  color: "transparent"
                }
              },
              label: {
                normal: {
                  color: "#FF6567",
                  offset: [10, -15],
                  formatter(params) {
                    return params.value + "%";
                  }
                }
              },
              data: [
                { type: "average", name: this.$t("平均值"), valueDim: "y" },
                { type: "average", name: this.$t("平均值"), valueDim: "x" }
              ]
            }
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
