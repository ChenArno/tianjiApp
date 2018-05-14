<template>
  <div>
    <div class="shop-area">
      <text class="iconfont">&#xe61c;</text>
      <text>{{this.$t('门店')}}:{{defalutDep.deptName}}</text>
    </div>
    <div class="card-red">
      <text class="card-text">{{$t('最近点检时间')}}:&nbsp;&nbsp;{{defalutDep.scoreTime}}</text>
      <text class="card-text">{{$t('平均得分')}}:&nbsp;&nbsp;{{defalutDep.avgScore}}</text>
      <text class="card-text">{{$t('最优项目')}}:&nbsp;&nbsp;{{defalutDep.bestItemName}}</text>
      <text class="card-text">{{$t('最差项目')}}:&nbsp;&nbsp;{{defalutDep.worstItemName}}</text>
      <div class="card-selec">
        <text class="card-text">{{$t('待检任务')}}:&nbsp;&nbsp;</text>
        <div class="card-selec-cell">
          <text class="card-text" :class="[defalutDep.taskNum>0?'card-button':'']" @click="gotally(defalutDep.taskNum)">{{defalutDep.taskNum}}{{$t('个')}}</text>
          <text class="card-text card-button" v-if="defalutDep.taskNum==0" @click="gotally()">{{$t('立即点检')}}</text>
        </div>
      </div>
    </div>
    <scroller ref="list" :showRefresh="true" :show-scrollbar="false" :loadmoreoffset="100" @refresh="onrefresh" @loadmore="onloadmore">
      <tj-card nohead v-for="list in dataList" :key="list.id" noBack>
        <div class="shop">
          <div class="shop-cont">
            <text class="shop-name">{{$t('打分时间')}}:{{list.createTime}}</text>
            <text class="shop-name">{{$t('打分人')}}:{{list.userName}}</text>
          </div>
          <text class="shop-score">{{list.totalScore}}&nbsp;{{ $t('分') }}</text>
        </div>
      </tj-card>
      <tj-load :loading="loading" v-if="dataList.length>0"></tj-load>
      <no-msg :length="dataList.length" @msgRefesh="onrefresh" :padding-top="20"></no-msg>
    </scroller>
  </div>
</template>

<script>
import { alarmCard, tjLoad, noMsg, tjCard } from "Components";
import { queryScoreList } from "api/sysCruiseShop";
import { dateFormat } from "Utils";
export default {
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      dataList: [],
      deptId: -1,
      defalutDep: {},
      loading: false
    };
  },
  eros: {
    beforeAppear(params, options) {
      let { deptId, taskNum } = params;
      if (deptId) {
        this.defalutDep = params;
        if (!taskNum) {
          this.defalutDep.taskNum = 0;
        }
        this.queryScoreList().then(res => {
          this.dataList = res;
        });
      }
    }
  },
  components: { alarmCard, tjLoad, noMsg, tjCard },
  methods: {
    onrefresh() {
      if (this.defalutDep.deptId == -1) return;
      this.pageNumber = 1;
      this.queryScoreList()
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
        this.queryScoreList()
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
    queryScoreList() {
      return new Promise((resolve, reject) => {
        let data = {
          deptId: this.defalutDep.deptId,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        };
        queryScoreList(data)
          .then(res => {
            if (res.data) {
              let arr = res.data.map(v => {
                return this.timeValue(v);
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
    timeValue(val) {
      val.createTime = dateFormat(
        new Date(val.createTime),
        "YYYY-MM-DD HH:mm:ss"
      );
      return val;
    },
    gotally(val){
      if(!val){
        this.$router.open({ name: "sysCruiseShop.shopVideo",params:this.defalutDep });
        return
      }
      this.$router.open({ name: "sysCruiseShop.planTask",params:this.defalutDep });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "src/js/css/common.scss";
.card-red{
  width:710;
  height:360;
  margin-left:25;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  background-color: rgb(240,102,102);
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  padding-left:34;
  padding-right:34;
  padding-top:34;
  padding-bottom:34;
  justify-content: space-between;
}
.card-text{
  color:#fff;
}
.shop{
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
}
.shop-cont{
  flex:6;
  justify-content: space-between;
  height:80;
}
.shop-time{
  color:rgb(153,153,153);
  font-size:26;
}
.shop-name{
  font-size:30;
}
.shop-score{
  font-size:36;
  color:rgb(246,79,68);
  flex:2;
  text-align:right;
  margin-right:29;
}
.card-selec{
  flex-direction: row;
  
}
.card-selec-cell{
  flex-direction: row;
  justify-content: space-between;
  width:496;
}
.card-button{
  border-width:1;
  border-style:solid;
  border-color:#fff;
  height:52;
  padding-top:6;
  padding-left:13;
  padding-right:13;
  font-size:28;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
}
.card-button:active{
  background-color:rgba(255,255,255,.7)
}
</style>
