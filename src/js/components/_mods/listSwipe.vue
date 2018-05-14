<template>
  <div class="bui-list-swipe-menu">
    <div class="bui-cell-swipe-menu" :style="{'height': height}">
      <div class="bui-list-swipe">
        <div class="bui-list-swipe-btn" :style="{'background-color': item.bgcolor}" @click="_actionClick(index)" v-for="(item, index) in items" :key="index">
          <text class="bui-list-swipe-btn-text">{{item.title}}</text>
        </div>
      </div>
      <div @click="_click(param)" @swipe="_swipe($event)" class="bui-list-main bui-list-swipe-main" ref="swipedom">
        <div class="bui-list-main-left">
          <slot name="content">
            <div slot="content" class="im">
              <image :src="param.avatarUrl" class="im-icon"></image>
              <div class="im-body">
                <text class="im-body-title">{{param.name}}</text>
                <text class="im-body-cont">{{param.content}}</text>
              </div>
              <div class="im-time">
                <text class="im-time-title">{{param.lastTime}}</text>
                <text class="tj-tag" v-if="param.unreadCount>0">{{param.unreadCount}}</text>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bui-list {
  flex: 1;
}

.bui-cell {
  flex-direction: row;
  align-items: center;
  height: 100;
  border-bottom-width: 1px;
  border-bottom-color: #d7dde4;
  border-bottom-style: solid;
}

.bui-cell:active {
  background-color: #f5f5f5;
}

.bui-cell-large {
  flex-direction: row;
  /* align-items: center; */
  height: 120;
  border-bottom-width: 1px;
  border-bottom-color: #d7dde4;
  border-bottom-style: solid;
}
.bui-cell-swipe-menu {
  lex-direction: row;
  /* //height: $nb120; */
  border-bottom-width: 1px;
  border-bottom-color: #d7dde4;
  border-bottom-style: solid;
}

.bui-cell-large:active {
  background-color: #f5f5f5;
}

.bui-cell-xlarge {
  flex-direction: row;
  align-items: center;
  height: 140;
  border-bottom-width: 1px;
  border-bottom-color: #d7dde4;
  border-bottom-style: solid;
}

.bui-cell-xlarge:active {
  background-color: #f5f5f5;
}

.bui-list-left {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 20;
}

.bui-list-main {
  padding-left: 20;
  flex: 1;
  justify-content: center;
  background-color: #ffffff;
}

.bui-list-right {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 20;
}

.bui-list-title {
  font-size: 34;
  color: #464c5b;
  text-overflow: ellipsis;
  lines: 1;
}

.bui-list-subtitle {
  font-size: 30;
  color: #9ea7b4;
  text-overflow: ellipsis;
  lines: 1;
}

.bui-list-thumb {
  width: 80;
  height: 80;
}

.bui-list-action {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 300px;
}

.bui-loading {
  width: 750px;
  height: 150px;
  flex-direction: column;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.bui-refresh {
  /* //position: absolute;
  //left: 0px;
  //right: 0px;
  //height: 100px; */
  justify-content: center;
  flex-direction: row;
  width: 750px;
  height: 100px;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.bui-loading-indicator {
  font-size: 30px;
  text-align: center;
  color: #9ea7b4;
}
.bui-indicator {
  height: 60px;
  width: 60px;
  color: #9ea7b4;
}

.bui-list-swipe {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  flex-direction: row;
  justify-content: flex-end;
}
.bui-list-swipe-btn {
  flex-direction: row;
  width: 120px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #c6c7c8;
}
.bgRed {
  background-color: #fa3300;
}
.bui-list-swipe-btn-text {
  font-size: 30px;
  color: #ffffff;
}
.bui-list-swipe-main {
  flex-direction: row;
  justify-content: flex-start;
}
.bui-list-main-left {
  justify-content: center;
  flex: 1;
}
.bui-list-desc {
  font-size: 25px;
  color: #464c5b;
}
.im {
  width: 750;
  padding-left: 30;
  padding-bottom: 18;
  padding-top: 18;
  padding-right: 30;
  flex-direction: row;
}
.im-icon {
  flex: 2;
  width: 105;
  max-width: 105;
  height: 105;
  border-bottom-left-radius: 52px;
  border-bottom-right-radius: 52px;
  border-top-left-radius: 52px;
  border-top-right-radius: 52px;
}
.im-body {
  margin-left: 29;
  flex: 5;
  justify-content: center;
}
.im-body-cont {
  color: #999899;
  font-size: 30;
  padding-top: 15;
  lines: 1;
}
.im-time {
  flex: 3;
  height: 101;
  align-items: flex-end;
  justify-content: center;
}
.im-time-title {
  color: #999899;
  font-size: 26;
  padding-bottom: 15;
}
.tj-tag {
  min-width: 38;
  width: 38;
  height: 38;
  line-height: 38;
  text-align: center;
  background-color: #ec6538;
  font-size: 23;
  color: #ffffff;
  border-bottom-left-radius: 19;
  border-bottom-right-radius: 19;
  border-top-left-radius: 19;
  border-top-right-radius: 19;
}
.im-body-title {
  lines: 1;
}
</style>
<script>
const animation = weex.requireModule("animation");
let defaultAction = [
  {
    title: "取消",
    bgcolor: "#c6c7c8"
  },
  {
    title: "删除",
    bgcolor: "#fa3300"
  }
];
export default {
  props: {
    items: {
      type: Array,
      default: defaultAction
    },
    height: {
      type: String,
      default: "136"
    },
    param: {
      type: Object
    }
  },
  methods: {
    //操作点击事件
    _actionClick(index) {
      this.close(() => {
        this.$emit("actionClick", index);
      });
    },
    _swipe(e) {
      switch (e.direction) {
        case "left":
          this.open(() => {
            this.$emit("swipeleft");
          });
          break;
        case "right":
          this.close(() => {
            this.$emit("swiperight");
          });
          break;
      }
    },
    _click(val) {
      this.$emit("click",val);
      this.close();
    },
    close(fn) {
      let translate = "translate(0px, 0px)";
      let el = this.$refs.swipedom;
      this._animationFn(el, 1, translate, "ease-in", () => {
        fn && fn();
      });
    },
    open(fn) {
      let len = this.items.length;
      let translate = "translate(-" + 120 * len + "px, 0px)";
      let el = this.$refs.swipedom;
      this._animationFn(el, 1, translate, "ease-in", () => {
        fn && fn();
      });
    },
    _animationFn(el, opacity, translate, timing, fn) {
      animation.transition(
        el,
        {
          styles: {
            opacity: opacity,
            transform: translate,
            transformOrigin: "center center"
          },
          duration: 200,
          timingFunction: timing,
          delay: 0
        },
        () => {
          fn && fn();
        }
      );
    }
  }
};
</script>