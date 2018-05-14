<template>
  <div class="wxc-btn" @click="onClicked" :class="[disabled?'wxc-btn-active':'',`${size}-size`,plain?'no-back':`${type}-back`]" :style="mBtnStyle">
    <text class="iconfont" v-if="load">&#xe62d;</text>
    <text class="btn-text" :style="mrTextStyle">{{text}}</text>
  </div>
</template>
<script>
const animation = weex.requireModule("animation");
export default {
  props: {
    size: {
      type: String,
      default: "defalut"
    },
    text: {
      type: String,
      default: "确认"
    },
    type: {
      type: String,
      default: "red"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: Boolean,
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      TEXT_STYLE_MAP: {
        tianji: {
          color: "#FFFFFF"
        },
        gray: {
          color: "#c0c2c2"
        },
        yellow: {
          color: "#fdae51"
        },
        red: {
          color: "#df4f45"
        }
      },
      STYLE_MAP: {
        tianji: {
          backgroundColor: "#FFFFFF",
          borderColor: "#A5A5A5",
          borderWidth: "1px"
        },
        yellow: {
          backgroundColor: "#FFFFFF",
          borderColor: "#fdae51",
          borderWidth: "1px"
        },
        red: {
          backgroundColor: "#FFFFFF",
          borderColor: "#df4f45",
          borderWidth: "1px"
        }
      }
    };
  },
  computed: {
    mrTextStyle() {
      const {
        type,
        disabled,
        textStyle,
        plain,
        TEXT_STYLE_MAP
      } = this;
      const mrTextStyle = { ...TEXT_STYLE_MAP[type], ...textStyle };
      return disabled || !plain? { ...mrTextStyle, color: "#FFFFFF" } : mrTextStyle;
    },
    mBtnStyle(){
      const {plain,TEXT_STYLE_MAP,type} = this;
      if(plain){
        return {'border-color':TEXT_STYLE_MAP[type].color}
      }
      return {}
    }
  },
  methods: {
    onClicked(e) {
      const { type, disabled } = this;
      this.$emit("wxcButtonClicked", { e, type, disabled });
    }
  }
};
</script>

<style scoped>
.wxc-btn {
  background-color: #df4f45;
  align-items: center;
  justify-content: center;
  margin-top: 20;
  flex-direction: row;
  border-width: 1;
  border-color:transparent;
}
.no-back{
  background-color: #ffffff;
}

.gray-back{
  background-color: #c0c2c2;
  color: #ffffff;
}
.yellow-back {
  background-color: #fdae51;
  color: #ffffff;
}
.red-back:active {
  background-color: #fe8a81;
  color: #ffffff;
}
.gray-back:active {
  background-color: #cbcece;
  color: #ffffff;
}
.yellow-back:active {
  background-color: #fac281;
  color: #ffffff;
}
.wxc-btn-active {
  background-color: #fe8a81;
}
.btn-text {
  text-overflow: ellipsis;
  lines: 1;
  font-size: 30;
  color: #ffffff;
}
.iconfont {
  font-family: iconfont;
  font-size: 52;
  color: #fff;
  margin-top: 10;
}
.defalut-size {
  width: 659;
  height: 95;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}
.mini-size {
  width: 200;
  height: 58;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
}
</style>