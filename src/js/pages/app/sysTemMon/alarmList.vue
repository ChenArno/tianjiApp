<template>
  <div>
    <div class="shop-area">
      <text class="iconfont">&#xe61c;</text>
      <text>{{defalutDep.label}}</text>
    </div>
    <scroller ref="list" :showRefresh="true" :show-scrollbar="false" :loadmoreoffset="100" @refresh="onrefresh" @loadmore="onloadmore">
      <alarm-card :proms="item" :right-text="item.alarmTime" v-for="item in dataList" :key="item" @goItem="goItem(item)">
        <text class="iconfont" slot="icon" :style="{'color':(item.alarmType ==1 || item.alarmType ==2)?'#DE4F45':'#54A1FD'}">{{(item.alarmType ==1 || item.alarmType ==2)?'&#xe692;':'&#xe644;'}}</text>
        <text slot="left" :style="{'color':(item.alarmType ==1 || item.alarmType ==2)?'#DE4F45':'#54A1FD'}">{{(item.alarmType ==1 || item.alarmType ==2)?$t('温度报警') : $t('湿度报警')}}</text>
        <div class="ex">
          <div class="ex-body">
            <text class="ex-body-cell">{{$t('报警位置')}}</text>
            <text class="tj-red">{{item.positionName}}</text>
          </div>
          <div class="ex-body">
            <text class="ex-body-cell">{{(item.alarmType ==1 || item.alarmType ==2) ? $t('报警温度') : $t('报警湿度')}}</text>
            <text class="tj-red">{{item.alarmValue}}{{item.alarmType == 1 || item.alarmType == 2 ? '℃' : '%'}}</text>
            <text>{{item.alarmType == 1 || item.alarmType == 3 ? "< " : ">"}}{{item.alarmType == 1 || item.alarmType == 3 ? item.lowerValue : item.upperValue}}{{item.alarmType == 1 || item.alarmType == 2 ? '℃' : '%'}}</text>
            <text class="ex-tr">({{item.alarmType == 1 || item.alarmType == 3 ? $t('预警值下限') : $t('预警值上限')}})</text>
          </div>
          <div class="ex-body">
            <text class="ex-body-cell">{{$t('复核结果')}}</text>
            <text class="ex-right">{{item.handleResult ? item.handleResult : $t('暂无')}}</text>
          </div>
        </div>
      </alarm-card>
      <tj-load :loading="loading" v-if="dataList.length>0"></tj-load>
      <no-msg :length="dataList.length" @msgRefesh="onrefresh"></no-msg>
    </scroller>
  </div>
</template>
<script>
import { alarmCard, tjLoad, noMsg } from "Components";
import { queryAlarmRecordList } from "api/sysTemMon";
import { dateFormat } from "Utils";
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
  computed: {
    defalutDep() {
      return this.$getDataJsonSync("defalutShop");
    }
  },
  created() {
    this.deptId = this.defalutDep.id;
  },
  watch: {
    deptId() {
      if (this.deptId == -1) return;
      this.init().then(res => {
        this.dataList = res;
      });
    }
  },
  methods: {
    init() {
      return new Promise((resolve, reject) => {
        this.pageNumber = 1;
        this.queryAlarmRecordList()
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject();
          });
      });
    },
    onrefresh() {
      this.init()
        .then(res => {
          this.$refs["list"].refreshEnd();
        })
        .catch(err => {
          this.$refs["list"].refreshEnd();
        });
    },
    onloadmore() {
      this.loading = true;
      this.$nextTick(() => {
        this.pageNumber++;
        this.queryAlarmRecordList()
          .then(res => {
            res.filter(v => {
              this.dataList.push(v);
            });
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      });
    },
    queryAlarmRecordList() {
      return new Promise((resolve, reject) => {
        let data = {
          deptId: this.deptId,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        };
        queryAlarmRecordList(data)
          .then(res => {
            if (res.data) {
              res.data.map(v => {
                v.intTime = v.alarmTime;
                v.alarmTime = v.alarmTime && dateFormat(v.alarmTime);
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
    goItem(val) {
      this.$router.open({ name: "sysTemMon.review",params:val });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "src/js/css/common.scss";
.container {
  width: 750;
}
.iconfont{
  margin-right: 10;
}
.ex{
  justify-content: center;
}
.ex-body{
  flex-direction: row;
  height:52;
  align-items: center;
}
.ex-body-cell{
  margin-right:27;
  color:#666666;
}
.ex-right{
  color: #666666;
  font-size: 30;
}
.ex-tr{
  color:#999999;
  font-size: 24;
}

</style>
