<template>
  <div class="cont cont-body">
    <wxc-cell class="cell">
      <text slot="label" class="iconfont">&#xe6a1;</text>
      <input slot="title" type="text" v-model="telphone" :placeholder="$t('请输入您的手机号码')" />
    </wxc-cell>
    <wxc-cell class="cell cell-button">
      <text slot="label" class="iconfont">&#xe62c;</text>
      <input slot="title" type="text" v-model="validation" :placeholder="$t('请输入验证码')" />
      <div slot="value" class="code" @click="sendCode">
        <text v-if="getVer" class="send-code">{{ $t('发送验证码') }}</text>
        <div v-else class="send-code">
          <text :style="{color:'#DE4F45'}">{{count}}</text>
          <text>{{ $t('秒后再获取') }}</text>
        </div>
      </div>
    </wxc-cell>
    <tj-button :text="$t('下一步')" @wxcButtonClicked="next" :disabled="disabled"></tj-button>
  </div>
</template>

<script>
import { WxcCell } from "weex-ui";
import { tjButton } from "Components";
import {
  getHandphoneVCode,
  updateHandphoneValidator,
  getResetPwdHandphoneVCode,
  validatorResetPwdVCode
} from "api/login";
export default {
  eros: {
    beforeAppear(params, options) {
      let { userAccount, type } = params;
      this.userAccount = userAccount;
      this.type = type ? type : "";
    }
  },
  components: { tjButton, WxcCell },
  data() {
    return {
      userAccount: "",
      getVer: true,
      disabled: true,
      telphone: "",
      count: 59,
      Interval: null,
      validation: "",
      type: ""
    };
  },
  watch: {
    validation(val) {
      this.disabled = val.length < 4 ? true : false;
    }
  },
  methods: {
    sendCode() {
      if (this.type) {
        getResetPwdHandphoneVCode(this.telphone).then(res => {
          this.$notice.toast({
            message: res.msg
          });
          if (res.resultStatus) {
            this.commit();
          }
        });
        return;
      }
      getHandphoneVCode(this.telphone).then(res => {
        this.$notice.toast({
          message: res.msg
        });
        if (res.resultStatus) {
          this.commit();
        }
      });
    },
    commit() {
      this.getVer = false;
      this.Interval = setInterval(this.update, 1000);
    },
    update() {
      if (this.count <= 0) {
        clearInterval(this.Interval);
        this.count = 59;
        this.getVer = true;
      } else {
        this.count--;
      }
    },
    next() {
      if (this.disabled) return;
      if (this.type) {
        validatorResetPwdVCode({
          userAccount: this.telphone,
          validateCode: this.validation
        }).then(res => {
          if (res.resultStatus) {
            this.$router.open({
              name: "forget",
              params: { code: res.data.resetCode, phone: this.telphone }
            });
            return;
          }
          this.$notice.toast({
            message: res.msg
          });
        });
        return;
      }
      let data = {
        userAccount: this.userAccount,
        handphone: this.telphone,
        validateCode: this.validation
      };
      updateHandphoneValidator(data).then(res => {
        if (res.resultStatus) {
          this.$router.open({
            name: "phoneVar",
            params: { isPhoneCheck: 2 }
          });
        }
      });
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

.cell {
  margin-top: 30px;
  height:78px !important;
  border-style: solid;
  border-width: 1;
  border-color: #cccccc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.cont-body{
  padding-top:43px;
}
.iconfont{
  margin-right:19px;
}
.cell-button{
  margin-bottom:30;
}
.code{
  border-left-color:#d9d9d9;
  border-left-width: 1;
  border-style: solid;
  padding-left:32;
}
.send-code{
  width:199;
  flex-direction:row;
}
</style>
