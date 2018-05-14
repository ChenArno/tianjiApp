<template>
  <div class="cont cont-top">
    <div class="cont-cell login-cont">
      <wxc-loading :show="isShow" type="trip" :loading-text="$t('正在登录中...')"></wxc-loading>
      <div class="login-logo">
        <image class="login-logo-img" src="bmlocal://assets/img/loginUrl.png"></image>
        <text class="login-title">{{$t('天机·运营')}}</text>
      </div>
      <div class="login-form">
        <div class="login-input tj-username">
          <text class="iconfont" :class="[isCheckUser?'tj-red':'']">&#xe647;</text>
          <div class="layout">
            <input type="text" class="input" placeholder="用户名" v-model="username" @focus="isCheckUser = true" @blur="isCheckUser=false" />
          </div>
          <text class="iconfont">&nbsp;</text>
        </div>
        <div class="login-input tj-pass">
          <text class="iconfont" :class="[isCheckPass?'tj-red':'']">&#xe612;</text>
          <div class="layout">
            <input :type="showPass?'password':'text'" class="input" :placeholder="$t('密码')" v-model="password" @focus="isCheckPass=true" @blur="isCheckPass=false" @return="login" />
          </div>
          <text class="iconfont" @click="showPass = !showPass">{{showPass?'&#xe608;':'&#xe6b5;'}}</text>
        </div>
      </div>
      <div class="tj-forget">
        <text @click="$router.open({name: 'Apply'})" class="tj-forget-left">{{ $t('申请试用') }}</text>
        <text @click="$router.open({name: 'goVar',params:{type: 'forget'},navTitle:$t('找回密码')})" class="tj-forget-right tj-red">{{ $t('忘记密码') }}</text>
      </div>
      <tj-button :text="$t('登录')" @wxcButtonClicked="login" :disabled="disabled"></tj-button>
      <div class="l-subhead" @click="setting">
        <div class="divider"></div>
        <text>{{ $t('登录选项') }}</text>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { WxcSearchbar, WxcLoading } from "weex-ui";
import { tjButton } from "Components";
import { login } from "api/login";
import ClearInfo from "Utils/clearInfo";
import md5 from "js-md5";

export default {
  data() {
    return {
      isCheckUser: false,
      isCheckPass: false,
      showPass: true,
      username: "",
      password: "",
      disabled: true,
      cid: "",
      isShow: false,
      ClearInfo:null
    };
  },
  watch: {
    username(val) {
      if (val !== "" && this.password.length >= 6) {
        this.disabled = false;
        return;
      }
      this.disabled = true;
    },
    password(val) {
      if (val.length >= 6 && this.username !== "") {
        this.disabled = false;
        return;
      }
      this.disabled = true;
    }
  },
  components: { tjButton, WxcSearchbar, WxcLoading },
  mounted() {
    this.ClearInfo = new ClearInfo();
    this.$tools.getCid().then(
      resData => {
        this.cid = resData.cid;
      },
      error => {}
    );
  },
  methods: {
    login() {
      if (this.disabled) return;
      if (!this.check()) return;
      let data = {
        userAccount: this.username,
        userPwd: md5(this.password),
        sysCode: "sys0002",
        userCid: this.cid,
        osType: weex.config.eros.platform === "iOS" ? 2 : 1
      };
      this.isShow = true;
      login(data)
        .then(resData => {
          this.isShow = false;
          if (!resData.resultStatus) {
            this.$notice.toast({
              message: this.$t(resData.msg)
            });
            return;
          }
          let { isPhoneCheck, userAccount } = resData.data;
          if (resData.data.isPhoneCheck === 1) {
            this.$event.emit("sotre.userInfo", resData.data);
            this.$router.open({
              name: "phoneVar",
              params: { isPhoneCheck, userAccount }
            });
            return;
          }
          if(this.$getDataSync("lastUser") !== userAccount){
            this.ClearInfo.cleanLast();
          }
          this.$setData("userInfo", resData.data).then(res => {
            this.$router.setHomePage("/pages/app/homePage/index.js");
          });
        })
        .catch(error => {
          this.isShow = false;
          this.$notice.toast({
            message: error
          });
        });
    },
    check() {
      if (this.username === "") {
        this.$notice.toast({
          message: this.$t("用户名不能为空")
        });
        return false;
      }
      if (this.password.length < 6) {
        this.$notice.toast({
          message: this.$t("密码不能小于6位")
        });
        return false;
      }
      return true;
    },
    setting() {
      this.$router.open({
        name: "set"
      });
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";

.login-cont {
  padding-left: 45px;
  padding-right: 45px;
  background-color:#fff;
}
.login-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 480px;
  position: relative;
}
.login-logo-img {
  width: 140px;
  height: 172px;
}
.login-title {
  font-size: 38px;
  color: #808080;
  position: absolute;
  width: 660px;
  text-align: center;
  bottom: 50px;
  letter-spacing: 4px;
}
.login-form{
 height: 220px;
}
.input{
  height:50;
  color:#333333;
}
.iconfont{
  flex:2;
  margin-left:48;
}
.layout{
  flex:8;
  width:460;
}
.login-input {
  border-style: solid;
  border-bottom-width: 1;
  border-bottom-color: #cccccc;
  justify-content: flex-start;
  align-items: center;
  flex-direction:row;
  height: 110px;
}

.tj-forget {
  align-items: center;
  justify-content: space-between;
  flex-direction:row;
  height:100;
  
}

.tj-forget-left {
    color: #b3b3b3;
  }
</style>

