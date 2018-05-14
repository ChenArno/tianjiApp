<template>
  <div class="tj-cont">
    <div class="status-bar" :style="{'height': $getDataSync('statusBarHeight')}"></div>
    <wxc-minibar :title="defalutDep.deptName" background-color="#fff">
      <div class="head-right" slot="right" @click="RightButtonClick">
        <text class="head-text">{{deviceCurrent.positionName}}{{deviceCurrent.positionName && deviceCurrent.positionName.length>4?'...':''}}</text>
        <text class="iconfont icon">&#xe607;</text>
      </div>
    </wxc-minibar>
    <div class="video">
      <tj-video ref="rtsp" class="view"></tj-video>
      <tj-ysy-video ref="ysy" class="view" :option="ysyOption"></tj-ysy-video>
      <div class="playView">
        <text class="iconfont" v-if="playState==0" @click="play">&#xe733;</text>
        <wxc-part-loading :show="playState == 1" :width="66" :height="66"></wxc-part-loading>
      </div>
    </div>
  </div>
</template>
<script>
import { WxcMinibar } from "weex-ui";
import { queryIpcByDeptId, queryYsAccessToken } from "api/Initialize";
import { WxcPartLoading } from "weex-ui";
const picker = weex.requireModule("picker");
const globalEvent = weex.requireModule("globalEvent");

export default {
  data() {
    return {
      ysyOption: "",
      deviceList: [],
      deviceCurrent: {},
      defalutDep: {},
      index: -1,
      isFirst: true,
      playType: 0, // 0：OnVif模式，1：萤石平台
      playState: 0 //0未播放，1，正在加载，2，加载完成
    };
  },
  components: { WxcMinibar, WxcPartLoading },
  eros: {
    beforeAppear(params, options) {
      let { deptId } = params;
      if (deptId) {
        this.defalutDep = params;
        this.queryYsAccessToken().then(() => {
          this.queryIpcByDeptId(deptId);
        });
      }
    },
    appeared() {
      globalEvent.addEventListener("PlayerView", params => {
        let { state } = params;
        this.playState = parseInt(state);
      });
    }
  },
  computed: {
    view() {
      return this.playType == 1 ? "ysy" : "rtsp";
    }
  },
  watch: {
    index(val, oldVal) {
      if (val == oldVal) return;
      let obj = this.deviceList[val];
      if (obj.playType == 1) {
        obj.rtspAddress = `ezopen://open.ys7.com/${obj.deviceSerial}/1.live`;
      }
      if (obj.id == 25) {
        obj.rtspAddress =
          "rtsp://admin:XF666888@222.175.143.118:1554/Streaming/Channels/101?transportmode=unicast";
      }
      this.deviceCurrent = obj;
      this.playType = obj.playType;
      // if (this.$refs[this.view]) {
      //   this.$refs[this.view].setPlayType(this.playType);
      // }
      this.channel();
    }
  },
  methods: {
    queryYsAccessToken() {
      return new Promise((resolve, reject) => {
        queryYsAccessToken()
          .then(res => {
            if (res.data) {
              let obj = {
                appKey: "e0df404a2f93404ead826803256caa46",
                accessToken: res.data
              };
              this.ysyOption = JSON.stringify(obj);
            }
            resolve();
          })
          .catch(err => {
            resolve();
          });
      });
    },
    queryIpcByDeptId(id) {
      queryIpcByDeptId(id).then(res => {
        if (res.data) {
          this.deviceList = res.data;
          this.index = 0;
        }
      });
    },
    RightButtonClick() {
      let items = this.deviceList.map(v => {
        return v.deviceName;
      });
      let options = {
        index: this.index,
        items
      };
      picker.pick(options, e => {
        if (e.result === "success") {
          this.index = e.data;
        }
      });
    },
    play() {
      if (this.index == -1) return;
      this.$refs[this.view].startPlay(this.deviceCurrent.rtspAddress);
      this.isFirst = false;
    },
    channel() {
      if (this.isFirst) return;
      this.$refs[this.view].channelPlay(this.deviceCurrent.rtspAddress);
    }
  }
};
</script>
 <style lang="sass" scoped>
 @import "src/js/css/common.scss";

.head-right{
  width:180;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  position: relative;
}
.head-text{
  width:140;
  font-size:23;
  color:#333333;
  lines: 1;
  color:rgb(222,79,69);
  text-align: right;
  align-items: center;
  margin-right:20;
}
.icon{
  font-size:60;
  color:rgb(222,79,69);
  align-items: center;
  position: absolute;
  right: -18;
  bottom: -18;
}
.video{
  position: relative;
}
.playView{
  position: absolute;
  top:0;
  left:0;
  width:750;
  height:417;
  align-items: center;
  justify-content: center;
}
.view{
  width:750;
  height:417;
  background-color:#000;
}
</style>