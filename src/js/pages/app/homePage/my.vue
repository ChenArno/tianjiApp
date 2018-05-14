<template>
  <div class="tj-cont">
    <image ref="headerBg" class="apply-posters" resize="cover" :src="`bmlocal://assets/img/${this.theme}.jpg`"></image>
    <list ref="contentScroller">
      <cell class="my-cell">
        <!-- <image ref="headerBg" class="apply-posters" resize="cover" :src="`bmlocal://assets/img/${this.theme}.jpg`"></image> -->
        <image class="my-icon-canvas" src="bmlocal://assets/img/wire.png"></image>
        <div class="my-icon-f">
          <div class="my-icon-t">
            <div class="my-icon-logo">
              <image class="my-icon" :src="avatarUrl" @click="actionClick"></image>
            </div>
          </div>
        </div>
        <div class="my-name">
          <text class="my-name-user">{{userName}}</text>
          <text class="my-name-role">{{roleName}}</text>
        </div>
      </cell>
      <cell v-for="item in infoList" :key="item.id">
        <wxc-cell :title="$t(item.title)" :has-arrow="true" @wxcCellClicked="wxcCellClicked(item.id)">
          <image slot="label" class="icon" :src="'bmlocal://assets/img/icon/my-'+item.id+'.png'"></image>
        </wxc-cell>
      </cell>
      <cell>
        <wxc-cell class="my-logout" @wxcCellClicked="logout">
          <div slot="title" class="my-logout-cell">
            <text>{{$t('退出登录')}}</text>
          </div>
        </wxc-cell>
      </cell>
    </list>
  </div>
</template>

<script>
import { WxcMinibar, WxcCell } from "weex-ui";
import { sysLogout, uploadUserAuatar } from "api/login";
import { upload } from "Config/fetch";
const rongyun = weex.requireModule("rongyun");
export default {
  data() {
    return {
      avatarUrl: "",
      userName: "",
      userAccount: "",
      roleName: "",
      infoList: [
        {
          title: "个人信息",
          id: "personal"
        },
        {
          title: "帮助中心",
          id: "help"
        },
        {
          title: "关于我们",
          id: "about"
        },
        {
          title: "反馈意见",
          id: "email"
        },
        {
          title: "设置",
          id: "setting"
        }
      ],
      theme: "back0",
      gesToken: 0
    };
  },
  components: { WxcMinibar, WxcCell },
  eros: {
    beforeAppear() {
      this.theme = this.$getDataSync("Theme");
      this.$event.on("theme.change", params => {
        this.theme = params;
      });
    }
  },
  created() {
    let { userName, avatarUrl, userAccount, role } = this.$getDataJsonSync(
      "userInfo"
    );
    this.userName = userName;
    this.avatarUrl = avatarUrl;
    this.userAccount = userAccount;
    if (role && role.length > 0) {
      role.map((v, index) => {
        let str = "|";
        if (index == role.length - 1) {
          str = "";
        }
        this.roleName += v.roleName + str;
      });
    }
  },
  mounted() {
    this.headerBgBinding();
  },
  beforeDestroy() {
    this.headerBgBindingDestory();
  },
  methods: {
    headerBgBinding() {
      let self = this,
        scroller = self.$refs.contentScroller.ref,
        headerBg = self.$refs.headerBg.ref;

      let bindingResult = this.$bindingx.bind(
        {
          eventType: "scroll",
          anchor: scroller,
          props: [
            {
              element: headerBg,
              property: "transform.scale",
              expression: {
                origin: "y<0?(1-y/300):(1+y/400)"
              }
            },
            {
              element: headerBg,
              property: "transform.translateY",
              expression: {
                origin: "-y/4"
              }
            }
          ]
        }
      );
      self.gesToken = bindingResult.token;
    },
    headerBgBindingDestory() {
      let self = this;
      if (self.gesToken != 0) {
        this.$bindingx.unbind({
          eventType: "scroll",
          token: self.gesToken
        });
        self.gesToken = 0;
      }
    },
    actionClick() {
      let option = upload({ url: uploadUserAuatar });
      this.$image.pickAndUpload(option).then(
        resData => {
          console.log(resData[0]); // [url1, url2...]
          if (resData[0].resultStatus) {
            this.avatarUrl = resData[0].data.userAuatar;
            let userInfo = this.$getDataJsonSync("userInfo");
            userInfo.avatarUrl = avatarUrl;
            this.$setDataSync("userInfo", userInfo);
            return;
          }
          this.$notice.toast({
            message: res.msg
          });
        },
        error => {
          this.$notice.toast({
            message: error
          });
        }
      );
    },
    wxcCellClicked(val) {
      this.$router.open({
        name: `info.${val}`
      });
    },
    setInfo() {
      let { userAccount } = this.$getDataJsonSync("userInfo");
      this.$setDataSync("lastUser", userAccount);
      this.$setData("userInfo", "").then(res => {
        rongyun.logout();
        this.$router.setHomePage("/pages/app/index.js");
      });
    },
    logout() {
      let self = this;
      this.$notice.confirm({
        title: this.$t("提示"),
        message: this.$t("是否退出登录?"),
        okTitle: this.$t("确认"),
        cancelTitl: this.$t("取消"),
        okCallback() {
          sysLogout()
            .then(res => {
              self.setInfo();
            })
            .catch(err => {
              self.setInfo();
            });
        },
        cancelCallback() {
          // 点击取消按钮的回调
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "src/js/css/common.scss";
.apply-posters{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height:551;
}
.my-cell{
  position: relative;
  width:750;
  height:551;
  align-items: center;
  justify-content: center;
}
.my-icon-canvas{
  height:50;
  width:750;
  position: absolute;
  bottom:0;
}
.my-icon-f {
    background-color : rgba(255, 255, 255, .15);
    width: 210;
    height: 210;
    border-bottom-left-radius : 105;
    border-bottom-right-radius : 105;
    border-top-left-radius: 105;
    border-top-right-radius: 105;
    justify-content: center;
    align-items: center;
  }

  .my-icon-t {
    background-color: rgba(255, 255, 255, .2);
    width: 190;
    height: 190;
    border-bottom-left-radius : 95;
    border-bottom-right-radius : 95;
    border-top-left-radius: 95;
    border-top-right-radius: 95;
    justify-content: center;
    align-items: center;
  }
  .my-icon{
    width:170;
    height:170;
    border-radius:100;
  }
  .my-icon-logo{
    width:170;
    height:170;
    border-bottom-left-radius : 85;
    border-bottom-right-radius : 85;
    border-top-left-radius: 85;
    border-top-right-radius: 85;
  }
.my-name{
  padding-top:19;
  height:140;
  justify-content: center;
  align-items: center;
}
.my-name-user{
  color:#fff;
  font-size:38;
  margin-bottom:19;
}
.my-name-role{
color:#fff;
}
.icon{
  width:48;
  height:48;
  margin-right:29;
}
.my-logout{
  margin-top:39;
}
.my-logout-cell{
  align-items: center;
}
</style>
