<template>
  <div class="cont cont-top">
    <div class="more-cont">
      <image class="more-cont-img" :src="userInfo.avatarUrl"></image>
      <text class="roles">{{userRoles}}</text>
      <text>{{phone}}</text>
    </div>
    <div class="more-phone">
      <div class="phone" @click="openView">
        <text class="iconfont">&#xe69a;</text>
        <text :class="[isMe?'more-text':'']">{{$t('发消息')}}</text>
      </div>
      <div class="phone-solid"></div>
      <div class="phone" @click="telephone">
        <text class="iconfont">&#xe6b7;</text>
        <text :class="[isMe?'more-text':'']">{{$t('打电话')}}</text>
      </div>
    </div>
  </div>
</template>
<script>
import { queryUserDetailById } from "api/Initialize";
var router = weex.requireModule("bmRouter");
export default {
  eros: {
    beforeAppear(params, options) {
      this.userInfo = params.userInfo;
      let { label,ryId } = this.userInfo;
      this.$navigator.setCenterItem(
        {
          text: label,
          textColor: "#040000"
        },
        () => {}
      );
      let { userUuid } = this.$getDataJsonSync("userInfo");
      if(ryId == userUuid){
        this.isMe = true;
      }
    },
    appeared() {
      this.queryUserDetailById(this.userInfo.id);
    }
  },
  data() {
    return {
      userInfo: {},
      phone: "",
      userRoles: "",
      isMe:false
    };
  },
  methods: {
    queryUserDetailById(id) {
      queryUserDetailById(id)
        .then(res => {
          if (res.data) {
            let { handphone, userRoles } = res.data;
            this.phone = !handphone ? this.$t("暂无") : handphone;
            this.userRoles = userRoles.length > 0 ? "" : "无";
            userRoles.map((val, i) => {
              if (i == userRoles.length - 1) {
                return (this.userRoles += val.roleName);
              }
              return (this.userRoles += val.roleName + ",");
            });
          } else {
            this.phone = this.$t("暂无");
          }
        })
        .catch(err => {
          this.phone = this.$t("暂无");
        });
    },
    openView() {
      if(this.isMe) return
      let {ryId,label} = this.userInfo
      this.$router.setBackParams({
        userId: ryId,
        name:label
      });
      this.$router.back({
        length: 2,
        type: "PUSH"
      });
    },
    telephone() {
      if(this.isMe || this.phone == this.$t("暂无")) return
      this.$coms.call(this.phone);
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.more-cont{
  justify-content: center;
  align-items: center;
  padding-top:42;
  padding-bottom:73;
}
.more-cont-img{
  width:200;
  height:200;
  margin-bottom:36;
}
.more-phone{
  width:750;
  height:110;
  border-style: solid;
  border-top-width: 1;
  border-top-color: #e6e6e6;
  border-bottom-width: 1;
  border-bottom-color: #e6e6e6;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.phone{
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.phone-solid{
  position: absolute;
  left: 374;
  top:15;
  width:5;
  height:80;
  border-style: solid;
  border-left-width: 1;
  border-left-color: #e6e6e6;
}
.iconfont{
  margin-right:19;
}
.roles{
  margin-bottom:25;
}
.more-text{
  color:#999999;
}
</style>
