<template>
  <div class="tj-cont">
    <div class="tj-head">
      <div class="status-bar" :style="{'height': $getDataSync('statusBarHeight')}"></div>
      <wxc-minibar background-color="#fff">
        <tj-back slot="left" :show="show"></tj-back>
        <tj-header slot="middle" title="客流统计" areaType="shop" page="sysPasFlow"></tj-header>
      </wxc-minibar>
    </div>
    <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="text" :tab-page-height="100" @wxcTabPageCurrentTabSelected="TabSelected">
    </wxc-tab-page>
    <scroller ref="list" :show-scrollbar="false" :showRefresh="true" @refresh="onrefresh">
      <div class="tj-title">
        <text class="tj-title-cell">{{$t('客流指标')}}</text>
      </div>
      <div class="tj-point" ref="pop">
        <data-block :data="item" v-for="item in pasData" :key="item.icon"></data-block>
      </div>
      <div class="tj-title">
        <text class="tj-title-cell">{{$t(title)}}</text>
        <text class="iconfont title-iconfont" @click="popClick">{{$t(title)}}{{$t('趋势')}}&#xe615;</text>
      </div>
      <echarts @end="finish" :list="list"></echarts>
    </scroller>
    <wxc-popover ref="popover" :buttons="btns" :position="popoverPosition" :arrowPosition="popoverArrowPosition" @wxcPopoverButtonClicked="ButtonClicked"></wxc-popover>
  </div>
</template>
<script>
import { WxcMinibar, WxcTabPage, Utils, WxcPopover } from "weex-ui";
import { tjHeader, tjBack, dataBlock } from "Components";
import echarts from "./echarts";
const dom = weex.requireModule("dom");
import {
  queryShopPFlowIndicator,
  queryShopPFlowChartByDayHour
} from "api/sysPasFlow";
import config from "Utils/tabStyle";

export default {
  props: ["show"],
  data() {
    return {
      tabStyles: config.tabStyles(6),
      deptId: -1,
      pasData: [
        {
          title: "进店客流",
          count: 0,
          rate: 0,
          icon: "guwenguanli",
          isShow: true
        },
        {
          title: "转化率",
          count: 0,
          rate: 0,
          icon: "chuizi",
          isShow: true
        },
        {
          title: "销售额(元)",
          count: 0,
          rate: 0,
          icon: "mondey",
          isShow: true
        },
        {
          title: "进店率",
          count: 0,
          rate: 0,
          icon: "ascend",
          isShow: true
        }
      ],
      queryDate: 0, // 0-今天，1-昨天，2-本周，3-上周，4-本月，5上月
      queryType: 0, //0-客流量,1-销售额,2-进店率,3-成交率
      title: "进店客流",
      popoverPosition: { x: -14, y: 380 },
      popoverArrowPosition: { pos: "top", x: -15 },
      list: {
        xList: [],
        yList: []
      }
    };
  },
  computed: {
    tabTitles() {
      return [
        {
          title: this.$t("今日")
        },
        {
          title: this.$t("昨日")
        },
        {
          title: this.$t("本周")
        },
        {
          title: this.$t("上周")
        },
        {
          title: this.$t("本月")
        },
        {
          title: this.$t("上月")
        }
      ];
    },
    btns() {
      return [
        {
          text: this.$t("进店客流")
        },
        {
          text: this.$t("销售额")
        },
        {
          text: this.$t("进店率")
        },
        {
          text: this.$t("转化率")
        }
      ];
    }
  },
  components: {
    WxcMinibar,
    tjHeader,
    tjBack,
    WxcTabPage,
    dataBlock,
    WxcPopover,
    echarts
  },
  eros: {
    beforeBackAppear(params, options) {
      let { id } = params;
      if (id) {
        this.deptId = id;
      }
    }
  },
  created() {
    this.deptId = this.$getDataJsonSync("defalutShop").id;
  },
  watch: {
    deptId(val) {
      if (val == -1) return;
      this.init();
    },
    queryDate() {
      if (this.deptId == -1) return;
      this.init();
    }
  },
  methods: {
    TabSelected(e) {
      this.queryDate = e.page;
    },
    onrefresh() {
      this.init();
      setTimeout(() => {
        this.$refs["list"].refreshEnd();
      }, 3000);
    },
    init() {
      this.$notice.loading.show();
      this.queryShopPFlowIndicator();
      this.queryShopPFlowChartByDayHour();
    },
    //客流指标
    queryShopPFlowIndicator() {
      let data = {
        queryDate: this.queryDate,
        deptId: this.deptId
      };
      for (let i = 0; i < this.pasData.length; i++) {
        this.pasData[i].isShow = true;
      }
      queryShopPFlowIndicator(data)
        .then(res => {
          if (res.data) {
            let {
              closeRate,
              closeRateMom,
              flowCount,
              flowMom,
              inFlowMom,
              inFlowRate,
              salesAmount,
              salesMom
            } = res.data;
            this.pasData[0].count = flowCount;
            this.pasData[0].rate = flowMom;
            this.pasData[1].count =
              closeRate != 0 ? (closeRate * 100).toFixed(2) + "%" : 0;
            this.pasData[1].rate = closeRateMom;
            this.pasData[2].count = salesAmount;
            this.pasData[2].rate = salesMom;
            this.pasData[3].count =
              inFlowRate != 0 ? (inFlowRate * 100).toFixed(2) + "%" : 0;
            this.pasData[3].rate = inFlowMom;
            for (let i = 0; i < this.pasData.length; i++) {
              this.pasData[i].isShow = false;
            }
          }
        })
        .catch(err => {
          this.$notice.loading.hide();
        });
    },
    //客流趋势
    queryShopPFlowChartByDayHour() {
      let data = {
        queryDate: this.queryDate,
        queryType: this.queryType,
        deptId: this.deptId
      };
      queryShopPFlowChartByDayHour(data)
        .then(res => {
          this.$notice.loading.hide();
          if (res.data) {
            this.list = {
              xList: res.data.xDataList,
              yList: res.data.yDataList
            };
            // if (this.queryDate < 2) {
            //   var date = res.data.xDataList[0].slice(5, 6);
            //   var xlist = [];
            //   if (date) {
            //     res.data.xDataList.map(v => {
            //       xlist.push(v.slice(5, v.length));
            //     });
            //   } else {
            //     res.data.xDataList.map(v => {
            //       xlist.push(v.slice(6, v.length));
            //     });
            //   }

            //   this.list = {
            //     xList: xlist,
            //     yList: res.data.yDataList
            //   };
            // } else {

            // }
            return;
          }
          this.list = {
            xList: [this.$t("无")],
            yList: [0]
          };
        })
        .catch(err => {
          this.$notice.loading.hide();
          this.$notice.toast({
            message: this.$t("网络异常，请先检查网络")
          });
        });
    },
    popClick() {
      const result = dom.getComponentRect(this.$refs.pop, option => {
        let { size } = option;
        this.popoverPosition.y = size.bottom + 40;
        this.$refs["popover"].wxcPopoverShow();
      });
    },
    ButtonClicked(obj) {
      let { index } = obj;
      this.queryType = index;
      this.$notice.loading.show();
      this.title = this.btns[index].text;
      this.queryShopPFlowChartByDayHour();
    },
    finish() {
      this.$notice.loading.hide();
    }
  }
};
</script>

<style lang="sass" scoped>
@import "src/js/css/common.scss";
.title-iconfont{
  font-size:28;
  color:#666666;
}

</style>
