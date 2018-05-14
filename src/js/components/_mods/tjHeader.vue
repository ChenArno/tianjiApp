<template>
  <div class="head-vice">
    <text class="head-head">{{$t(title)}}</text>
    <div class="head-right" @click="choose">
      <text class="head-text">{{showTitle}}{{showTitle.length>5?'...':''}}</text>
      <image class="icon" src="bmlocal://assets/img/icon/chooseshop.png"></image>
    </div>
  </div>
</template>
<script>
export default {
  props: ["areaType", "page", "title"], //选项 'shop'  or 'area'
  data() {
    return {
      showTitle: ""
    };
  },
  created() {
    this.headtitle();
    this.$event.on("area.choose", params => {
      params = typeof params == "string" ? JSON.parse(params) : params;
      let { id, deptName,label } = params;
      if (deptName) {
        this.$setDataSync("defalutShop", {
          id,
          label: deptName
        });
      } else {
        this.$setDataSync("defalutArea", {
          id,
          label
        });
      }
      this.headtitle();
    });
  },
  methods: {
    headtitle() {
      if (this.areaType == "shop") {
        this.showTitle = this.$getDataJsonSync("defalutShop").label;
      } else {
        this.showTitle = this.$getDataJsonSync("defalutArea").label;
      }
    },
    choose() {
      this.$router.open({
        name: "area",
        params: { areaType: this.areaType, page: this.page }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "src/js/css/common.scss";
.head-vice{
  flex-direction:row;
  justify-content: center;
  align-items: center;
}
.head-text{
  width:140;
  font-size:23;
  color:#333333;
  lines: 1;
  margin-right:20;
  text-align: right;
  margin-top:10;
}
.head-head{
  color:#000000;
  font-size:34;
  font-weight:bold;
}
.head-right{
  flex-direction:row;
  justify-content: center;
  align-items: center;
  position: relative;
}
.icon{
  font-size:25;
  width:17;
  height:17;
  position: absolute;
  right: 0;
  bottom: 3;
}
</style>