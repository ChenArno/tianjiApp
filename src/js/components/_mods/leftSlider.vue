<template>
  <div ref="box" @touchstart="onPanStart" @touchmove="onPanMove" @touchend="onPanEnd">
    <scroller @scroll="onscroll" v-if="dataArray.length>0">
      <div class="left-cell" :style="{height:itemH}" v-for="(item,i) in dataArray" :key="i">
        <div class="left-delete" :ref="`slider_${i}`" :style="{height:itemH-1}">
          <div class="move" :style="{height:itemH-1}" @click="enterRoom(item)">
            <div class="im">
              <image :src="item.avatarUrl" class="im-icon"></image>
              <div class="im-body">
                <text class="im-body-title">{{item.name}}</text>
                <text class="im-body-cont">{{item.content}}</text>
              </div>
              <div class="im-time">
                <text class="im-time-title">{{item.lastTime}}</text>
                <text class="tj-tag" v-if="item.unreadCount>0">{{item.unreadCount}}</text>
              </div>
            </div>
          </div>
          <div class="deleteIcon" :style="{height:itemH-1}" @click="deleteItem(item,i)">
            <text class="deleteIcon-cell">{{isDeling?$t('确认'):''}}{{$t('删除')}}</text>
          </div>
        </div>
      </div>
    </scroller>
    <div class="box-img" v-else>
      <image class="box-img-cell" src="bmlocal://assets/img/noMessage_error.png"></image>
      <text>暂无消息</text>
    </div>
  </div>
</template>
<script>
const animation = weex.requireModule("animation");
const dom = weex.requireModule("dom");
export default {
  props: ["dataArray"],
  data() {
    return {
      itemH: 141,
      delWidth: 200,
      itemIndex: -1,
      isDeling: false,
      startX: 0, //触摸位置
      moveX: 0, //滑动过程实时位置
      disX: 0, //移动距离
      delAreaState: -1,
      scTop: 0, //滚动距离
      top: 120
    };
  },
  mounted() {
    dom.getComponentRect(this.$refs.box, option => {
      this.top = option.size.top;
    });
  },
  methods: {
    onscroll(e) {
      this.scTop = e.contentOffset.y;
    },
    onPanStart(e) {
      let screenX = e.changedTouches[0].screenX;
      let screenY = e.changedTouches[0].screenY;
      const index = Math.floor((screenY - this.scTop - this.top) / this.itemH);
      this.delAreaState = this.delArea(e);
      if (this.delAreaState == 0) {
        return;
      } else if (this.delAreaState == 1 || this.delAreaState == 2) {
        this.backanimation();
        this.itemIndex = -1;
        this.isDeling = false;
        return;
      } else {
        this.itemIndex = index;
        this.startX = screenX;
        this.isDeling = false;
      }
    },
    onPanMove(e) {
      let screenX = e.changedTouches[0].screenX;
      if (this.delAreaState >= 0) return;
      this.moveX = screenX;
      const slider = this.$refs[`slider_${this.itemIndex}`];
      this.disX = this.startX - this.moveX;
      //没有移动
      if (this.disX < 50 || this.disX > 200) return;
      slider &&
        animation.transition(slider[0], {
          styles: {
            transform: `translateX(-${this.disX}px)`
          },
          timingFunction: "ease",
          delay: 0,
          duration: 0
        });
      //超过删除宽度
    },
    onPanEnd(e) {
      // 手指移动结束后的水平位置
      let endX = e.changedTouches[0].screenX;
      if (this.delAreaState >= 0) return;
      // 触摸开始与结束,手指移动的距离
      this.disX = this.startX - endX;
      const slider = this.$refs[`slider_${this.itemIndex}`];
      if (this.disX >= 200) return;
      if (this.disX > 100) {
        let disX = 200 - this.disX;
        slider &&
          animation.transition(slider[0], {
            styles: {
              transform: `translateX(-200px)`
            },
            timingFunction: "ease",
            delay: 0,
            duration: 500
          });
      } else {
        //如果距离小于删除按钮的1/2，不显示删除按钮
        this.backanimation();
        this.itemIndex = -1;
      }
    },
    delArea(e) {
      const screenX = e.changedTouches[0].screenX;
      const screenY = e.changedTouches[0].screenY;
      const index = Math.floor((screenY - this.top - this.scTop) / this.itemH);
      if (this.itemIndex == -1) return -1; //没有正在删除按钮
      if (this.itemIndex == index) {
        if (screenX > 750 - this.delWidth) {
          return 0; // 记录上次按钮的删除区域
        }
        return 1; //记录上次按钮的可视区域
      }
      return 2; //其他区域
    },
    backanimation() {
      const slider = this.$refs[`slider_${this.itemIndex}`];
      slider &&
        animation.transition(slider[0], {
          styles: {
            transform: `translateX(0px)`
          },
          timingFunction: "ease",
          duration: 800
        });
    },
    enterRoom(val) {
      this.$emit("enterItem", val);
    },
    deleteItem(val, i) {
      if (this.isDeling) {
        let self = this;
        const slider = this.$refs[`slider_${i}`];
        slider &&
          animation.transition(
            slider[0],
            {
              styles: {
                transform: `translateX(0px)`
              },
              timingFunction: "ease",
              duration: 0
            },
            () => {
              this.$emit("deleteItem", val, i);
              self.itemIndex = -1;
            }
          );
        return;
      }
      this.isDeling = true;
    }
  }
};
</script>

<style scoped>
.left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.left-cell {
  width: 750;
  height: 101;
}
.left-delete {
  width: 950;
  flex-direction: row;
  border-style: solid;
  border-bottom-width: 1;
  border-bottom-color: #ffffff;
}
.move {
  width: 750;
  background-color: #ffffff;
}
.deleteIcon {
  width: 200;
  background-color: red;
  justify-content: center;
  align-items: center;
}
.deleteIcon-cell {
  color: #ffffff;
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
