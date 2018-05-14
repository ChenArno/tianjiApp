<template>
  <div class="cont cont-top">
    <div class="cont-cell">
      <wxc-loading :show="tjLoad" type="trip"></wxc-loading>
      <scroller class="scroller">
        <slider class="slider" interval="4500" @change="onchange">
          <div class="frame" v-for="(img,i) in imageList" :key="i">
            <image class="image" resize="cover" :src="img.src" @click="show = true"></image>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
        <wxc-lightbox ref="wxc-lightbox" height="800" :image-list="imageList" @wxcLightboxOverlayClicked="show = false" :show="show">
        </wxc-lightbox>
        <tj-card>
          <div slot="left" class="card-head">
            <text class="iconfont card-icon">&#xe605;</text>
            <text>{{params.positionName}}</text>
          </div>
          <div slot="right" class="card-head">
            <text>{{ $t('最高') }}:</text>
            <text class="tj-red">{{params.upperValue}}</text>
            <text>{{unit}}{{ $t('最低') }}:</text>
            <text class="tj-purple">{{params.lowerValue}}</text>
            <text>{{unit}}</text>
          </div>
          <div class="button">
            <tj-button :text="$t('前一小时')" size="mini" type="yellow" @wxcButtonClicked="before" plain></tj-button>
            <tj-button :text="$t('后一小时')" size="mini" type="yellow" @wxcButtonClicked="next" plain></tj-button>
          </div>
          <echarts :curveData="chartData" @end="finish" :type="type"></echarts>
        </tj-card>
        <div class="hand">
          <text>{{$t('处理结果')}}</text>
          <div class="hand-cell">
            <tj-tag :label="val" :state="i==handIndex" v-for="(val,i) in handTag" :key="i" @on-click="hand(i)"></tj-tag>
          </div>
          <div class="textarea">
            <textarea class="textarea-cell" v-model="textvalue" :placeholder="$t('填写自定义处理结果')"></textarea>
          </div>
        </div>
        <tj-button :text="$t('提交')" @wxcButtonClicked="submit" :disabled="disabled"></tj-button>
      </scroller>
    </div>
  </div>
</template>

<script>
import { WxcLightbox, WxcButton, WxcLoading } from "weex-ui";
import { tjCard, tjButton, tjTag } from "Components";
import echarts from "./echarts.vue";
import { dateFormat } from "Utils";
import {
  queryAlarmRecord,
  updateRelieveAlarmRecord,
  queryTagHumitureRealChat
} from "api/sysTemMon";
export default {
  data() {
    return {
      imageList: [],
      show: false,
      params: {},
      handIndex: 0,
      time: "",
      chartData: {},
      tjLoad: false,
      disabled: false,
      disabled1: false,
      disabled2: false,
      handTag: ["门未关严", "误警", "被监控设备异常", "该设备正在维护"],
      textvalue: ""
    };
  },
  components: {
    WxcButton,
    WxcLightbox,
    tjCard,
    echarts,
    WxcLoading,
    tjButton,
    tjTag
  },
  eros: {
    beforeAppear(params, options) {
      let { id, imgList, intTime } = params;
      this.params = params;
      if (imgList.length == 0) {
        this.params.imgList.push({
          src: "bmlocal://assets/img/splitimage.png"
        });
      }
      this.imageList = imgList;
      this.time = intTime;
      queryAlarmRecord(id).then(res=>{
        if(res.data){
          this.disabled = res.data.alarmState==1?true:false
        }
      })
      this.queryTagHumitureRealChat();
    }
  },
  computed: {
    unit() {
      if (this.params.alarmType < 3) {
        return "℃";
      }
      return "%";
    },
    type() {
      if (this.params.alarmType < 3) {
        return 0;
      }
      return 1;
    }
  },
  methods: {
    queryTagHumitureRealChat(type) {
      this.tjLoad = true;
      let data = {
        deviceSerial: this.params.deviceSerial,
        positionId: this.params.positionId
      };
      queryTagHumitureRealChat(data, this.time)
        .then(res => {
          this.tjLoad = false;
          if (res.data) {
            this.chartData = res.data.chartData;
            if (type == "next") {
              this.disabled1 = res.data.length == 0 ? true : false;
              this.disabled2 = false;
            } else if (type == "before") {
              this.disabled2 = res.data.length == 0 ? true : false;
              this.disabled1 = false;
            }
            return;
          }
          this.chartData = {
            xList: [dateFormat(this.time, "HH:mm:ss")],
            tptList: [0],
            tptLowerList: [0],
            tptUpperList: [0],
            humList: [0],
            humLowerList: [0],
            humUpperList: [0]
          };
        })
        .catch(err => {
          this.tjLoad = false;
        });
    },
    before() {
      if (this.disabled1) {
        this.$notice.toast({
          message: this.$t("没有更多数据了")
        });
        return;
      }
      let time = new Date(this.time).getTime();
      time = time - 1000 * 60 * 60;
      this.time = time;
      this.queryTagHumitureRealChat("before");
    },
    next() {
      if (this.disabled2) {
        this.$notice.toast({
          message: this.$t("没有更多数据了")
        });
        return;
      }
      let time = new Date(this.time).getTime();
      if (time == new Date().getTime()) return (this.disabled2 = true);
      time = time + 1000 * 60 * 60;
      this.time = time;
      this.queryTagHumitureRealChat("next");
    },
    hand(val) {
      this.handIndex = val;
      this.textvalue = this.$t(this.handTag[val]);
    },
    submit() {
      let data = {
        id: this.params.id,
        handleDescription: "",
        handleResult: this.textvalue
      };
      this.disabled = true;
      updateRelieveAlarmRecord(data)
        .then(res => {
          this.$notice.toast({
            message: res.msg
          });
          this.disabled = false;
        })
        .catch(() => {
          this.disabled = false;
        });
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.image {
  width: 704px;
  height: 486;
}
.slider {
  margin-top: 30;
  margin-left: 23;
  width: 704px;
  height: 486;
  border-width: 1;
  border-style: solid;
  border-color: #e6e6e6;
}

.frame {
  width: 704;
  height: 486;
  position: relative;
}
.indicator {
  width: 704;
  height: 486;
  item-color: #99ffff;
  item-selected-color: #ffffff;
  item-size: 24;
  position: absolute;
  top: 200px;
  left: 270;
}
.iconfont {
  font-family: iconfont;
  color: #bfbfbf;
}
.card-head {
  flex-direction: row;
  align-items: center;
}
.scroller{
  align-items: center;
  margin-bottom:30;
}
.button{
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.hand{
  width:704;
  padding-top:15;
}
.hand-cell{
  flex-direction: row;
  margin-top:30;
  margin-bottom:30;
}
.textarea {
  padding-top: 15;
  padding-left: 15;
  background-color: #f9f9f9;
  border-style: solid;
  border-width: 1;
  border-color: #cccccc;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
}
.textarea-cell{
  height:241;
  color:#999999;
}
</style>
