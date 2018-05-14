<template>
  <div class="cont cont-top">
    <scroller class="per">
      <wxc-cell class="cell" :label="$t('姓名')">
        <input class="tj-input" slot="title" type="text" v-model="userName" :placeholder="$t('请输入您的姓名')" />
      </wxc-cell>
      <wxc-cell class="cell" :label="$t('性别')" :title="$t(genderName)" @wxcCellClicked="choseSource"></wxc-cell>
      <wxc-cell class="cell" :label="$t('组织')" :title="orgName"></wxc-cell>
      <wxc-cell class="cell" :label="$t('角色')" :title="roleName"></wxc-cell>
      <wxc-cell class="cell" :label="$t('帐号类型')" :title="accountTypeName"></wxc-cell>
      <wxc-cell class="cell" :label="$t('绑定手机')" :title="phone"></wxc-cell>
      <wxc-cell class="cell" :label="$t('绑定邮箱')" :title="email"></wxc-cell>
      <wxc-cell class="cell" :label="$t('生日')" :title="birthday" @wxcCellClicked="choseDate"></wxc-cell>
    </scroller>
    <wxc-loading :show="isShow" type="trip"></wxc-loading>
  </div>
</template>

<script>
import { queryUserDetail, updateLoginUser } from "api/Initialize";
import { dateFormat } from "Utils";
const picker = weex.requireModule("picker");
import { WxcCell } from "weex-ui";
export default {
  data() {
    return {
      userName: "",
      gender: 1,
      orgName: "",
      cw: null,
      accountTypeName: "",
      phone: "",
      roleName: "",
      email: "",
      birthday: "1991-01-01",
      time: 0,
      tjLoad: false,
      getForm: ["男", "女"],
      isChange: false,
      userInfo: null,
      isShow: true
    };
  },
  eros: {
    beforeAppear(params, options) {
      this.userInfo = this.$getDataJsonSync("userInfo");
      this.$navigator.setRightItem(
        { text: this.$t("保存"), fontSize: '28',  textColor: "#df4f45" },
        () => {
          this.contact();
        }
      );
      this.queryUserDetail();
    }
  },
  computed: {
    genderName() {
      return this.getForm[this.gender - 1];
    },
    postData() {
      return {
        birthday: this.birthday+" 00:00:00",
        email: this.email,
        gender: this.gender,
        telephone: this.phone,
        userName: this.userName
      };
    }
  },
  components: { WxcCell },
  watch: {
    postData(val, oldVal) {
      if (!oldVal.userName) return;
      this.isChange = true;
    }
  },
  methods: {
    queryUserDetail() {
      queryUserDetail()
        .then(res => {
          this.isShow = false;
          if (res.data) {
            let { handphone, email, gender, birthday, userName } = res.data;
            this.userName = userName;
            this.foPhone(handphone);
            this.faEmail(email);
            this.gender = gender;
            this.time = birthday;
            this.birthday = dateFormat(birthday, "YYYY-MM-DD");
            let { role, accountTypeName, orgName } = this.userInfo;
            this.orgName = orgName;
            this.accountTypeName = accountTypeName;
            this.faRole(role);
          }
        })
        .catch(err => {
          this.isShow = false;
        });
    },
    foPhone(val) {
      if (val && val.length === 11) {
        let forstr = val.substr(0, 3);
        let backStr = val.substr(7, 4);
        this.phone = forstr + "****" + backStr;
      } else {
        this.phone = this.$t("未绑定");
      }
    },
    faEmail(val) {
      if (!val) return (this.email = this.$t("未绑定"));
      let newEmail = "";
      if (val.indexOf("@") > -1) {
        newEmail = val.split("@")[0];
        newEmail = newEmail.substr(0, 3);
        this.email = newEmail + "******@" + email.split("@")[1];
        return;
      }
      newEmail = val.substr(0, 3);
      this.email = newEmail + "******";
    },
    faRole(val) {
      if (val && val.length > 0) {
        val.map((v, index) => {
          let str = "|";
          if (index == val.length - 1) {
            str = "";
          }
          this.roleName += v.roleName + str;
        });
      }
    },
    choseSource() {
      let i = 0;
      this.getForm.map((res, x) => {
        if (res == this.source) {
          i = x;
        }
      });
      picker.pick(
        {
          index: i,
          items: this.getForm
        },
        event => {
          if (event.result === "success") {
            this.gender = event.data + 1;
          }
        }
      );
    },
    choseDate() {
      picker.pickDate(
        {
          value: this.birthday
        },
        event => {
          if (event.result === "success") {
            let { data } = event;
            this.birthday = data;
          }
        }
      );
    },
    contact() {
      if (!this.isChange) return;
      updateLoginUser(this.postData).then(res => {
        this.$notice.toast({
          message: this.$t(res.msg)
        });
        if (res.resultStatus) {
          this.userInfo.userName = this.userName;
          this.userInfo.gender = this.gender;
          this.userInfo.birthday = new Date(this.birthday+" 00:00:00");
          this.$setDataSync("userInfo", this.userInfo);
        }
      });
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.per{
  margin-top:10;
}
</style>
