<template>
  <div class="cont cont-top">
    <div class="cont-cell">
      <text class="resetPd">{{ $t('密码可用于登录天机手机版和电脑版（需6~20位）') }}</text>
      <div class="tj-group">
        <wxc-cell class="tj-cell">
          <input class="tj-input" slot="title" type="text" v-model="pass" :placeholder="$t('请输入原密码')" />
        </wxc-cell>
        <wxc-cell class="tj-cell">
          <input class="tj-input" slot="title" type="text" v-model="userName" :placeholder="$t('请输入6~20位密码')" />
        </wxc-cell>
      </div>
      <div class="buttom">
        <wxc-button :text="$t('确定')" @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcCell, WxcButton } from "weex-ui";
import { updateUserPwd } from "api/login";
import md5 from "js-md5";
export default {
  data() {
    return {
      pass: "",
      newPass: ""
    };
  },
  eros: {
    beforeAppear(params, options) {
      // this.userInfo = this.$getDataJsonSync("userInfo");
    }
  },
  components: { WxcCell, WxcButton },
  methods: {
    wxcButtonClicked() {
      let data = {
        userPwd: md5(this.newPass),
        oldUserPwd: md5(this.pass)
      };
      updateUserPwd(data)
        .then(res => {
          this.$notice.toast({
            message: this.$t(res.msg)
          });
        })
        .catch(err => {
          this.$notice.toast({
            message: this.$t(err.toString())
          });
        });
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.resetPd{
  padding-top:10;
  padding-left:15;
  padding-right:15;
  padding-bottom:10;
  color:#666666;
  font-size:24;
}
.buttom{
  margin-top:30;
  align-items: center;
}
</style>
