<template>
  <div class="tj-cont">
    <div class="status-bar" :style="{'height': $getDataSync('statusBarHeight')}"></div>
    <wxc-minibar leftButton="" background-color="#fff">
      <text class="tj-head-cell" slot="middle">{{$t('应用')}}</text>
    </wxc-minibar>
    <list>
      <cell>
        <image class="apply-posters" :src="img"></image>
      </cell>
      <cell>
        <tj-list :title="$t(app.dictName)" v-for="app in apply" :key="app.id">
          <div class="apply-card">
            <div class="app-icon" v-for="item in app.list" :key="item.id" @click="itemCl(item)" @longpress="longpress(item)">
              <image class="imgIcon" :src="item.logoUrl"></image>
              <text class="app-label">{{$t(item.moduleName)}}</text>
            </div>
          </div>
        </tj-list>
      </cell>
    </list>
  </div>
</template>

<script>
import { WxcMinibar } from "weex-ui";
import { tjList } from "Components";
import {
  queryModule,
  querySysDictionary,
  queryOrgDeptUserLastUpdateTime
} from "api/Initialize";
import { switchName } from "Utils/modules";

export default {
  data() {
    return {
      apply: [
        {
          dictName: "基本应用",
          list: []
        }
      ]
    };
  },
  components: { WxcMinibar, tjList },
  computed: {
    img() {
      if (/en/.test(this.$getDataSync("lan"))) {
        return "bmlocal://assets/img/shopkeeper.jpg";
      }
      return "bmlocal://assets/img/advertising.jpg";
    }
  },
  created() {
    this.querySysDictionary();
  },
  methods: {
    querySysDictionary() {
      querySysDictionary().then(val => {
        if (val && val.data) {
          this.queryModule().then(res => {
            this.apply = val.data.map(v => {
              v.list = res.filter(x => {
                if (v.dictValue === x.dictValueCategory) return x;
                return false;
              });
              return v;
            });
          });
        }
      });
    },
    queryModule() {
      return new Promise((resolve, reject) => {
        queryModule()
          .then(res => {
            if (res && res.data) {
              resolve(res.data);
              return;
            }
            this.$notice.toast({
              message: this.$t("暂无可用应用，请联系企业管理人员")
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    longpress(val) {
      let { id, moduleName, logoUrl, moduleCode } = val;
      let obj = switchName({ id, moduleName, logoUrl, moduleCode });
      if (!obj) {
        this.$notice.alert({
          title: this.$t("提示"),
          message: this.$t("请联系管理员，开通应用权限"),
          okTitle: this.$t("确认")
        });
        return;
      }
      let self = this;
      this.$notice.confirm({
        title: this.$t("提示"),
        message: this.$t("是否设置为默认快捷方式,需退出app重启"),
        okTitle: this.$t("确认"),
        cancelTitl: this.$t("取消"),
        okCallback() {
          self.$setDataSync("defalutApp", obj);
          self.$router.setHomePage("/pages/app/homePage/index.js");
        },
        cancelCallback() {}
      });
    },
    itemCl(val) {
      let { id, moduleName, logoUrl, moduleCode } = val;
      if (id == 35 || id == 36) {
        this.$event.emit("pageChange", 1);
        return;
      }
      let obj = switchName({ id, moduleName, logoUrl, moduleCode });
      if (!obj) {
        this.$notice.alert({
          title: this.$t("提示"),
          message: this.$t("请联系管理员，开通应用权限"),
          okTitle: this.$t("确认")
        });
        return;
      }
      this.$router.open({
        name: obj.moduleType
      });
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.apply-posters{
  height:300;
  width:750;
}
  .apply-card{
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap:wrap;
  }
  .app-icon{
    justify-content: center;
    align-items: center;
    width:187.5;
    background-color:#fff;
  }
  .app-icon:active{
    background-color:rgb(242,242,242);
  }
  .imgIcon{
    width:54;
    height:54; 
    margin-top:24;
    margin-bottom:24;
    margin-left:24;
    margin-right:24;
  }
  .app-label{
    font-width:30;
    font-size:26;
    height:56;
  }
</style>
