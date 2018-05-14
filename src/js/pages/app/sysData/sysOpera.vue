<template>
  <div class="tj-cont">
    <div class="tj-head">
      <div class="status-bar" :style="{'height': $getDataSync('statusBarHeight')}"></div>
      <wxc-minibar background-color="#fff">
        <tj-back slot="left" :show="show"></tj-back>
        <text class="tj-head-cell" slot="middle">{{$t('运营分析')}}</text>
      </wxc-minibar>
    </div>
    <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="text" :tab-page-height="100" @wxcTabPageCurrentTabSelected="TabSelected">
    </wxc-tab-page>
    <scroller ref="list" :show-scrollbar="false" :showRefresh="true" @refresh="onrefresh">
      <div class="tj-title">
        <text class="tj-title-cell">{{$t('组织关键指标')}}</text>
      </div>
      <div class="tj-point" ref="pop">
        <data-block :data="item" v-for="item in pasData" :key="item.icon" type="seq"></data-block>
      </div>
      <div class="tj-title">
        <text class="tj-title-cell">{{$t(title)}}{{$t('分布图')}}</text>
        <text class="iconfont title-iconfont" @click="popClick">{{$t(title)}}&#xe615;</text>
      </div>
      <chart-scatter :data="scatterData" :type="scatterType" ref="chart"></chart-scatter>
      <div class="tj-title">
        <text class="tj-title-cell">{{$t('门店排行（Top5）')}}</text>
        <text class="iconfont title-iconfont" @click="storeClick">{{$t(storeList[orderByshop].text)}}&#xe615;</text>
      </div>
      <tj-table-list :tab-titles="storeTitles" :active-index="btnIndex" @onClick="storeSelected"></tj-table-list>
      <chart-bar :data="barData"></chart-bar>
    </scroller>
    <wxc-popover ref="wxc-popover" :buttons="btns" :position="popoverPosition" :arrowPosition="popoverArrowPosition" @wxcPopoverButtonClicked="ButtonClicked"></wxc-popover>
    <wxc-popover ref="store-popover" :buttons="storeList" :position="popoverPosition" :arrowPosition="popoverArrowPosition" @wxcPopoverButtonClicked="ButtonStoreClicked"></wxc-popover>
  </div>
</template>
<script>
import { WxcMinibar, WxcTabPage, Utils, WxcPopover } from "weex-ui";
import { tjHeader, tjBack, dataBlock, tjTableList } from "Components";
import config from "Utils/tabStyle";
import chartScatter from "./chartScatter";
import chartBar from "./chartBar";
const dom = weex.requireModule("dom");
import {
  queryOperation,
  queryCloseAndInFlowRateList,
  querySalesAmountAndJointRateList,
  queryStoreOrder,
  queryOverViewSalesAmount,
  queryOverviewFlowCount,
  queryOverviewInFlowRate,
  queryOverviewJointRate
} from "api/sysData";

export default {
  props: ["show"],
  data() {
    return {
      tabStyles: config.tabStyles(2),
      cellStyle: config.cellStyle(5),
      pasData: [
        {
          title: "销售额(元)",
          count: 0,
          rate: 0,
          yoy: 0,
          icon: "mondey",
          isShow: true
        },
        {
          title: "客流量",
          count: 0,
          rate: 0,
          yoy: 0,
          icon: "guwenguanli",
          isShow: true
        },
        {
          title: "进店率",
          count: 0,
          rate: 0,
          yoy: 0,
          icon: "ascend",
          isShow: true
        },
        {
          title: "连带率",
          count: 0,
          rate: 0,
          yoy: 0,
          icon: "yifu",
          isShow: true
        }
      ],
      title: "成交率-进店率",
      rateIndex: -1,
      popoverPosition: { x: -14, y: 380 },
      popoverArrowPosition: { pos: "top", x: -15 },
      scatterData: [],
      scatterType: 0,
      barData: {
        xList: [],
        yList: []
      },
      queryDate: 0, // 0：本月，1：上月
      orderByshop: 1, //0：最差，1：最优
      btnIndex: 0 //0:销售额 1：客流量 2：进店率 3：成交率 4：连带率
    };
  },
  computed: {
    tabTitles() {
      return [
        {
          title: this.$t("本月")
        },
        {
          title: this.$t("上月")
        }
      ];
    },
    storeTitles() {
      return [
        {
          title: this.$t("销售额")
        },
        {
          title: this.$t("客流量")
        },
        {
          title: this.$t("进店率")
        },
        {
          title: this.$t("成交率")
        },
        {
          title: this.$t("连带率")
        }
      ];
    },
    btns() {
      return [
        {
          text: this.$t("成交率-进店率")
        },
        {
          text: this.$t("连带率-销售额")
        }
      ];
    },
    storeList() {
      return [{ text: this.$t("最差") }, { text: this.$t("最优") }];
    }
  },
  components: {
    WxcMinibar,
    tjHeader,
    tjBack,
    WxcTabPage,
    WxcPopover,
    dataBlock,
    chartScatter,
    chartBar,
    tjTableList
  },
  created() {
    this.init();
  },
  watch: {
    rateIndex(val) {
      this.$notice.loading.show();
      this.title = this.btns[val].text;
      let data = {
        queryDate: this.queryDate
      };
      if (val == 0) {
        this.scatterType = 0;
        this.queryCloseAndInFlowRateList(data); //成交率-进店率
      } else {
        this.scatterType = 1;
        this.querySalesAmountAndJointRateList(data); //连带率-销售额
      }
    },
    queryDate(val) {
      this.init();
    }
  },
  methods: {
    init() {
      let data = {
        queryDate: this.queryDate
      };
      this.queryOverViewSalesAmount(data); //组织关键指标 - 销售额
      this.queryOverviewFlowCount(data); //组织关键指标 - 客流量
      this.queryOverviewInFlowRate(data); //组织关键指标 - 进店率
      this.queryOverviewJointRate(data); //组织关键指标 - 连带率
      this.rateIndex = 0;
      this.orderStore(); //门店排行
    },
    onrefresh() {
      this.init();
      setTimeout(() => {
        this.$refs["list"].refreshEnd();
      }, 3000);
    },
    TabSelected(e) {
      this.queryDate = e.page;
    },
    storeSelected(e) {
      this.$notice.loading.show();
      this.btnIndex = e.page;
      this.orderStore();
    },
    ButtonClicked(obj) {
      this.$notice.loading.show();
      let { index } = obj;
      this.rateIndex = index;
    },
    ButtonStoreClicked(obj) {
      this.$notice.loading.show();
      let { index } = obj;
      this.orderByshop = index;
      this.orderStore();
    },
    popClick() {
      dom.getComponentRect(this.$refs.pop, option => {
        let { size } = option;
        this.popoverPosition.y = size.bottom + 40;
        this.$refs["wxc-popover"].wxcPopoverShow();
      });
    },
    storeClick() {
      dom.getComponentRect(this.$refs.chart, option => {
        let { size } = option;
        this.popoverPosition.y = size.bottom + 40;
        this.$refs["store-popover"].wxcPopoverShow();
      });
    },
    //组织关键指标 - 销售额
    queryOverViewSalesAmount(data) {
      let { 0: list } = this.pasData;
      list.isShow = true;
      Vue.set(this.pasData, 0, list);
      queryOverViewSalesAmount(data).then(res => {
        if (res.data) {
          let { salesAmount, salesMom, salesYoy } = res.data;
          let { 0: list } = this.pasData;
          list.count = salesAmount;
          list.rate = salesMom;
          list.yoy = salesYoy;
          list.isShow = false;
          Vue.set(this.pasData, 0, list);
        }
      });
    },
    //组织关键指标 - 客流量
    queryOverviewFlowCount(data) {
      let { 1: list } = this.pasData;
      list.isShow = true;
      Vue.set(this.pasData, 1, list);
      queryOverviewFlowCount(data).then(res => {
        if (res.data) {
          let { flowCount, flowMom, flowYoy } = res.data;
          let { 1: list } = this.pasData;
          list.count = flowCount;
          list.rate = flowMom;
          list.yoy = flowYoy;
          list.isShow = false;
          Vue.set(this.pasData, 1, list);
        }
      });
    },
    //组织关键指标 - 进店率
    queryOverviewInFlowRate(data) {
      let { 2: list } = this.pasData;
      list.isShow = true;
      Vue.set(this.pasData, 2, list);
      queryOverviewInFlowRate(data).then(res => {
        if (res.data) {
          let { inFlowMom, inFlowRate, inFlowYoy } = res.data;
          inFlowRate =
            inFlowRate != 0 ? (inFlowRate * 100).toFixed(2) + "%" : 0;
          list.count = inFlowRate;
          list.rate = inFlowMom;
          list.yoy = inFlowYoy;
          list.isShow = false;
          Vue.set(this.pasData, 2, list);
        }
      });
    },
    //组织关键指标 - 连带率
    queryOverviewJointRate(data) {
      let { 3: list } = this.pasData;
      list.isShow = true;
      Vue.set(this.pasData, 3, list);
      queryOverviewJointRate(data).then(res => {
        if (res.data) {
          let { jointMom, jointRate, jointYoy } = res.data;
          jointRate = jointRate != 0 ? (jointRate * 100).toFixed(2) + "%" : 0;
          list.count = jointRate;
          list.rate = jointMom;
          list.yoy = jointYoy;
          list.isShow = false;
          Vue.set(this.pasData, 3, list);
        }
      });
    },
    queryCloseAndInFlowRateList(data) {
      this.scatterData = [];
      queryCloseAndInFlowRateList(data)
        .then(res => {
          this.$notice.loading.hide();
          if (res.data) {
            this.scatterData = res.data.map(v => {
              let closeRate = (v.closeRate * 100).toFixed(0); //成交率
              let inFlowRate = (v.inFlowRate * 100).toFixed(0); //进店率
              return [closeRate, inFlowRate];
            });
            return;
          }
          this.$notice.toast({
            message: this.$t(res.msg)
          });
        })
        .catch(err => {
          this.$notice.loading.hide();
          this.$notice.toast({
            message: this.$t("网络异常，请先检查网络")
          });
        });
    },
    //连带率-销售额
    querySalesAmountAndJointRateList(data) {
      this.scatterData = [];
      querySalesAmountAndJointRateList(data)
        .then(res => {
          this.$notice.loading.hide();
          if (res.data) {
            this.scatterData = res.data.map(v => {
              let jointRate = (v.jointRate * 100).toFixed(0); //连带率
              let salesAmount = 0; //销售额
              if (v.salesAmount >= 10000) {
                this.scatterType = 1;
                salesAmount = Math.round(v.salesAmount / 10000 * 100) / 100;
              } else {
                this.scatterType = 2;
                salesAmount = v.salesAmount;
              }
              return [jointRate, salesAmount];
            });
            return;
          }
        })
        .catch(err => {
          this.$notice.loading.hide();
          this.$notice.toast({
            message: this.$t("网络异常，请先检查网络")
          });
        });
    },
    orderStore() {
      let data = {
        queryDate: this.queryDate,
        orderBy: this.orderByshop
      };
      queryStoreOrder(data, this.btnIndex)
        .then(res => {
          setTimeout(() => {
            this.$notice.loading.hide();
          }, 3000);
          if (res.data) {
            let xList = res.data.map(v => {
              return v.deptName;
            });
            let yList = res.data.map(v => {
              return v.indexValue;
            });
            this.barData = {
              xList,
              yList
            };
            return;
          }
          this.barData = {
            xList: [this.$t("无")],
            yList: [0]
          };
        })
        .catch(err => {
          this.$notice.loading.hide();
        });
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
