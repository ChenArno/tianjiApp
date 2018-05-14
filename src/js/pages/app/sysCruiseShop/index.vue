<template>
  <div class="tj-cont">
    <div class="status-bar" :style="{'height': $getDataSync('statusBarHeight')}"></div>
    <wxc-minibar background-color="#fff">
      <tj-back slot="left" :show="show"></tj-back>
      <tj-header slot="middle" title="远程巡店" areaType="area" page="sysCruiseShop"></tj-header>
      <text class="iconfont" slot="right" @click="RightButtonClick">&#xe7ee;</text>
    </wxc-minibar>
    <scroller ref="list" :showRefresh="true" :show-scrollbar="false" :loadmoreoffset="100" @refresh="onrefresh" @loadmore="onloadmore">
      <tj-card nohead v-for="list in dataList" :key="list.id" @onclick="onclick(list)">
        <div class="shop">
          <image class="shop-img" src="bmlocal://assets/img/noimg.png"></image>
          <div class="shop-cont">
            <text class="shop-name">{{list.deptName}}</text>
            <text class="shop-time">最近：{{list.scoreTime}}</text>
          </div>
          <text class="shop-score">{{list.avgScore}}&nbsp;{{ $t('分') }}</text>
        </div>
      </tj-card>
      <no-msg :length="dataList.length" @msgRefesh="onrefresh"></no-msg>
      <tj-load :loading="loading" v-if="dataList.length>0"></tj-load>
    </scroller>
  </div>
</template>

<script>
import { WxcMinibar } from "weex-ui";
import { tjHeader, tjBack, tjCard, tjLoad, noMsg } from "Components";
import { queryManageList } from "api/sysCruiseShop";
import { dateFormat } from "Utils";
export default {
  props: ["show"],
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      dataList: [],
      deptId: -1
    };
  },
  eros: {
    beforeBackAppear(params, options) {
      let { id } = params;
      if (id) {
        this.deptId = id;
      }
    }
  },
  computed: {
    defalutArea() {
      return this.$getDataJsonSync("defalutArea");
    }
  },
  components: { WxcMinibar, tjHeader, tjBack, tjCard, tjLoad, noMsg },
  created() {
    this.deptId = this.defalutArea.id;
  },
  watch: {
    deptId(val) {
      if (val == -1) return;
      this.queryManageList().then(res => {
        this.dataList = res;
      });
    }
  },
  methods: {
    onrefresh() {
      this.pageNumber = 1;
      this.queryManageList()
        .then(res => {
          this.dataList = res;
          this.$refs["list"].refreshEnd();
        })
        .catch(err => {
          this.$refs["list"].refreshEnd();
        });
    },
    onloadmore() {
      this.$notice.loading.show();
      this.$nextTick(() => {
        this.pageNumber++;
        this.queryManageList()
          .then(res => {
            res.filter(v => {
              this.dataList.push(v);
            });
            this.$notice.loading.hide();
          })
          .catch(err => {
            this.$notice.loading.hide();
          });
      });
    },
    RightButtonClick() {},
    queryManageList() {
      return new Promise((resolve, reject) => {
        let data = {
          deptId: this.deptId,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        };
        queryManageList(data)
          .then(res => {
            if (res.data) {
              let arr = res.data.map(v => {
                return this.listsValue(v);
              });
              resolve(arr);
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
    listsValue(val) {
      val.avgScore = val.avgScore ? parseInt(val.avgScore) : 0;
      val.scoreTime = val.scoreTime
        ? dateFormat(new Date(val.scoreTime), "YYYY-MM-DD HH:mm:ss")
        : this.$t("无");
      return val;
    },
    onclick(val){
      this.$router.open({ name: "sysCruiseShop.shopTally",params:val });
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
.shop{
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
}
.shop-img{
  width:116;
  height:116;
  margin-left:22;
  margin-right:29;
  flex:2;
}
.shop-cont{
  flex:6;
  justify-content: center;
}
.shop-time{
  color:rgb(153,153,153);
  font-size:26;
}
.shop-name{
  font-size:30;
  margin-bottom:23;
}
.shop-score{
  font-size:36;
  color:rgb(246,79,68);
  flex:2;
  text-align:right;
  margin-right:29;
}

</style>
