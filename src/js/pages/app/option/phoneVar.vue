<template>
  <div class="cont cont-body">
    <div class="ver-img">
      <image class="ver-main" src="bmlocal://assets/img/phoneVer.png"></image>
      <image ref="happy" class="ver-i" src="bmlocal://assets/img/Smiling.png"></image>
    </div>
    <div class="ver-text">
      <text class="ver-span">{{statue?'您暂未认证手机号，点击去认证':'恭喜您，认证成功'}}</text>
    </div>
    <tj-button :text="statue?$t('认证'):$t('完成')" @wxcButtonClicked="next"></tj-button>
  </div>
</template>

<script>
import { WxcCell } from "weex-ui";
import { tjButton } from "Components";
const animation = weex.requireModule("animation");

export default {
  eros: {
    beforeAppear(params, options) {
      let {isPhoneCheck,userAccount} = params;
      this.userAccount = userAccount;
      if (isPhoneCheck == 1) {
        this.statue = true;
      } else {
        this.statue = false;
        animation.transition(this.$refs.happy, {
        styles: {
          transform: "rotate(180deg)"
        }
      });
      }
    }
  },
  data() {
    return {
      userAccount:"",
      statue: true
    };
  },
  components: { WxcCell, tjButton },
  methods: {
    next() {
      if (this.statue) {
        this.$router.open({ name: "goVar", navTitle: this.$t("手机认证"),params:{userAccount:this.userAccount} });
        return;
      }
      this.$event.emit("sotre.userInfo");
      this.$router.setHomePage("/pages/app/homePage/index.js");
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.cont {
  padding-left: 45px;
  padding-right: 45px;
}
.ver-text{
  align-items: center;
    justify-content: center;
    color:#666666;
}
  .ver-img {
    height: 555;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }
  .ver-main{
    width:292;
    height: 240;
  }
  .ver-i{
    position:absolute;
    top:290;
    left:310;
    width:45;
    height:23;
  }
  .ver-span{
    color:#666666;
    padding-bottom:58;
    align-items: center;
  }
</style>
