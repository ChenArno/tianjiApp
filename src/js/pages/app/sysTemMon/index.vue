<template>
  <div>
    <wxc-loading :show="tjLoad" type="trip"></wxc-loading>
    <div class="tj-head">
      <div class="status-bar" :style="{'height': $getDataSync('statusBarHeight')}"></div>
      <wxc-minibar background-color="#fff">
        <tj-back slot="left" :show="show"></tj-back>
        <tj-header slot="middle" title="温湿度监控" areaType="shop" page="sysTemMon"></tj-header>
        <text class="iconfont" slot="right" @click="enter">&#xe618;</text>
      </wxc-minibar>
    </div>
    <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="text" :tab-page-height="tabPageHeight" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
      <list class="page-list" :ref="`list_${index}`" :show-scrollbar="false" :showRefresh="true" @refresh="onrefresh" @loadmore="onloadmore" :loadmoreoffset="100" :style="{ height:tabPageHeight-tabStyles.height }" v-for="(v,index) in tabList" :key="index">
        <cell v-for="item in v" :key="item.id">
          <wxc-pan-item @wxcPanItemPan="wxcPanItemPan">
            <tj-card :right-text="item.alarmTime">
              <div slot="left" class="card-head">
                <text class="iconfont card-icon">&#xe605;</text>
                <text>{{item.positionName}}</text>
                <text class="card-tag">({{item.deviceSerial}})</text>
              </div>
              <tem-card :type="type" :param="item" :tjLoad="tjLoad" @load="tjLoad = arguments[0]"></tem-card>
            </tj-card>
          </wxc-pan-item>
        </cell>
      </list>
    </wxc-tab-page>
    <div class="tj-noImg" :style="{height:tabPageHeight-tabStyles.height}">
      <no-msg :length="dataList.length" @msgRefesh="onrefresh"></no-msg>
    </div>
  </div>
</template>

<script>
import { WxcMinibar, WxcTabPage, WxcPanItem, Utils, WxcLoading } from "weex-ui";
import { tjHeader, tjBack, tjCard,noMsg } from "Components";
import { queryHumitureRealList } from "api/sysTemMon";
import temCard from "./temCard";
import config from "Utils/tabStyle";
import { dateFormat } from "Utils";
export default {
  props: ["show"],
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      type: 0,
      dataList: [],
      deptId: -1,
      tabStyles: config.tabStyles(2),
      tabList: [[], []],
      tabPageHeight: 1234,
      tjLoad: false,
      customSet: {
        noGoods: {
          button: null,
          desc: "",
          content: "",
          pic: "bmlocal://assets/img/noMessage_error.png"
        }
      }
    };
  },
  computed: {
    tabTitles() {
      return [
        {
          title: this.$t("温度")
        },
        {
          title: this.$t("湿度")
        }
      ];
    }
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
    this.tabPageHeight = Utils.env.getPageHeight();
    this.deptId = this.$getDataJsonSync("defalutShop").id;
  },
  watch: {
    deptId() {
      if (this.deptId == -1) return;
      this.init().then(res => {
        Vue.set(this.tabList, this.type, this.dataList);
      });
    }
  },
  components: {
    WxcMinibar,
    tjHeader,
    tjBack,
    WxcTabPage,
    WxcPanItem,
    tjCard,
    temCard,
    WxcLoading,
    noMsg
  },
  methods: {
    wxcTabPageCurrentTabSelected(e) {
      const index = e.page;
      /* Unloaded tab analog data request */
      // if (!Utils.isNonEmptyArray(this.tabList[index])) {  //判断是否为空数组
      // console.log("wxcTabPageCurrentTabSelected"+index);
      this.dataList = [];
      this.type = index;
      this.init().then(res => {
        Vue.set(this.tabList, index, this.dataList);
      });
      // }
    },
    wxcPanItemPan(e) {
      if (Utils.env.supportsEBForAndroid()) {
        this.$refs["wxc-tab-page"].bindExp(e.element); //处理安卓不能滑动的问题
      }
    },
    init() {
      return new Promise((resolve, reject) => {
        if (this.deptId == -1) return resolve();
        this.pageNumber = 1;
        this.queryHumitureRealList()
          .then(res => {
            this.dataList = res;
            resolve();
          })
          .catch(err => {
            reject();
          });
      });
    },
    onloadmore(event) {
      if (this.deptId == -1) return;
      this.$nextTick(() => {
        this.pageNumber++;
        this.queryHumitureRealList().then(res => {
          res.filter(v => {
            this.dataList.push(v);
          });
        });
      });
    },
    onrefresh() {
      this.init()
        .then(res => {
          this.$refs["list_" + this.type][0].refreshEnd();
        })
        .catch(err => {
          this.$refs["list_" + this.type][0].refreshEnd();
        });
    },
    queryHumitureRealList() {
      return new Promise((resolve, reject) => {
        let data = {
          deptId: this.deptId,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          deviceType: this.type
        };
        queryHumitureRealList(data)
          .then(res => {
            if (res.data) {
              res.data = res.data.filter(v => {
                v.alarmTime = dateFormat(v.alarmTime); //有疑问
                v.fortifyBeginTime =
                  v.fortifyBeginTime &&
                  dateFormat(v.fortifyBeginTime, "HH:mm:ss");
                v.fortifyEndTime =
                  v.fortifyEndTime && dateFormat(v.fortifyEndTime, "HH:mm:ss");
                v.show = false;
                return v;
              });
              resolve(res.data);
              return;
            }
            this.$notice.toast({
              message: res.msg
            });
          })
          .catch(err => {
            this.$notice.toast({
              message: err.toString()
            });
            reject();
          });
      });
    },
    enter() {
      // if (this.deptId == -1) {
      //   this.$notice.toast({
      //     message: this.$t('请先选择门店')
      //   });
      //   return;
      // }
      this.$router.open({ name: "sysTemMon.alarmList" });
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.iconfont{
  font-size:36;
  color:#535761;
}
.card-icon{
  margin-right:12;
}
.card-head{
  flex-direction: row;
  align-items: center;
}
.card-tag{
  font-size:28;
  color:#333333;
}
</style>
