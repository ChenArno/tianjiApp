<template>
  <div>
    <div class="status-bar" :style="{'height': $getDataSync('statusBarHeight')}"></div>
    <wxc-minibar class="tj-head" leftButton="" :title="$t('消息')" background-color="#fff">
      <text class="tj-head-left" slot="left">{{connectStatue?$t(''):$t('连接...')}}</text>
      <text class="tj-head-cell" slot="middle">{{$t('消息')}}</text>
      <text class="iconfont" slot="right" @click="Friend">&#xe614;</text>
    </wxc-minibar>
    <div class="rylist" :style="{width:750,height:viewHeight}">
      <rylist ref='rylist' class="rylist-cell" :userUuid="userUuid">
        <!-- <left-slider class="rylist-cell" :dataArray="ImList" @enterItem="enterRoom" @deleteItem="deleteItem">
        </left-slider> -->
        <list-swipe :items="btnAry1" @actionClick="deleteItem(item,i)" @click="enterRoom" :param="item" v-for="(item,i) in ImList" :key="i"></list-swipe>
        <div class="box-img" v-if="ImList.length==0">
          <image class="box-img-cell" src="bmlocal://assets/img/noMessage_error.png"></image>
          <text>{{$t('暂无消息')}}</text>
        </div>
      </rylist>
    </div>
  </div>
</template>

<script>
import { WxcMinibar } from "weex-ui";
import {  listSwipe } from "Components";
import { showLongTime } from "Utils";
const dom = weex.requireModule("dom");
const globalEvent = weex.requireModule("globalEvent");
const rongyun = weex.requireModule("rongyun");
export default {
  props: ["viewHeight"],
  eros: {
    beforeAppear(params, options) {
      let { userUuid } = this.$getDataJsonSync("userInfo");
      this.userUuid = userUuid;
      if (!userUuid) {
        this.$notice.toast({
          message: this.$t("聊天未维护")
        });
        return;
      }
      this.$event.on("ryReady", params => {
        this.selectData("con");
      });

      globalEvent.addEventListener("ryPushMessage", options => {
        this.selectData();
      });
    },
    beforeBackAppear(params, options) {
      if (params.userId) {
        this.enterRoom(params);
      }
    }
  },
  data() {
    return {
      btnAry1: [
        {
          title: "删除",
          bgcolor: "red"
        }
      ],
      ImList: [],
      userUuid: "",
      connectStatue: false
    };
  },
  components: { WxcMinibar, listSwipe },
  methods: {
    enterRoom(val) {
      this.$refs.rylist.openView([val.userId, val.name]);
    },
    deleteItem(val, i) {
      let self = this;
      this.$refs.rylist.deleteItem(1, val.userId, res => {
        self.ImList.splice(i, 1);
      });
    },
    selectData(parm) {
      this.$refs.rylist.selectData(this.userUuid, res => {
        if (parm) {
          this.connectStatue = true; //链接状态
        }
        if (!res) return (this.ImList = []);
        this.ImList = res.map(v => {
          v.content = this.typeText(v.typeName, v.content);
          v.lastTime = showLongTime(parseInt(v.lastTime));
          return v;
        });
      });
    },
    typeText(info, data) {
      switch (info) {
        case "RC:TxtMsg":
          info = data;
          break;
        case "RC:ImgMsg":
          info = "[" + this.$t("图片") + "]";
          break;
        case "RC:VcMsg":
          info = "[" + this.$t("语音") + "]";
          break;
        case "RC:FileMsg":
          info = "[" + this.$t("文件") + "]";
          break;
        default:
          info = "[" + this.$t("其他") + "]";
          break;
      }
      return info;
    },
    Friend() {
      this.$router.open({
        name: "talks"
      });
    },
    clickmenu() {}
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.rylist{
  position:relative;
}
.rylist-cell{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
}
.iconfont{
  color:#535761;
}
.tj-head-left{
  font-size:24;
  color:#EC4F46;
}
.iconfont{
  font-size:36;
}
.box-img{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  align-items: center;
  justify-content: center;
}
.box-img-cell{
  width: 300;
  height: 300;
}
</style>
