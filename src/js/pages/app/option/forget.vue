<template>
  <div class="cont cont-body">
    <wxc-cell class="cell">
      <text slot="label" class="iconfont">&#xe62c;</text>
      <input slot="title" type="password" v-model="pass" :placeholder="$t('重置登录密码')" />
    </wxc-cell>
    <wxc-cell class="cell cell-button">
      <text slot="label" class="iconfont">&#xe62c;</text>
      <input slot="title" type="password" v-model="passAgain" :placeholder="$t('确认新密码')" />
    </wxc-cell>
    <tj-button :text="$t('重置')" @wxcButtonClicked="next" :disabled="disabled"></tj-button>
  </div>
</template>

<script>
import { WxcCell } from "weex-ui";
import { tjButton } from "Components";
import { updateUserPwdReset } from "api/login";
import md5 from "js-md5";
export default {
  eros: {
    beforeAppear(params, options) {
      let { phone, code } = params;
      this.phone = phone;
      this.code = code;
    }
  },
  components: { tjButton, WxcCell },
  data() {
    return {
      disabled: true,
      pass: "",
      passAgain: "",
      phone: "",
      code: ""
    };
  },
  watch: {
    pass(val) {
      if (val.length >= 6 && this.passAgain.length >= 6) {
        this.disabled = false;
        return;
      }
      this.disabled = true;
    },
    passAgain(val) {
      if (val.length >= 6 && this.pass.length >= 6) {
        this.disabled = false;
        return;
      }
      this.disabled = true;
    }
  },
  methods: {
    next() {
      if (this.pass !== this.passAgain)
        return this.$vux.toast.text(
          this.$t("两个密码不一致，请重新确认") + "！"
        );
      let data = {
        userAccount: this.phone,
        pwdResetCode: this.code,
        userPwd: md5(this.passAgain)
      };
      updateUserPwdReset(data).then(res => {
        this.$notice.toast({
          message: res.msg
        });
        if (res.resultStatus) {
          this.$router.back({ length: 2 });
          return;
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
.iconfont{
  margin-right:19px;
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
.cell-button{
  margin-bottom:30;
}
</style>
