<template>
  <div>
    <tj-category :title="$t('语言设置')"></tj-category>
    <wxc-cell :label="$t('语言设置')" @wxcCellClicked="$router.open({name:'language'})" :has-margin="true">
      <text slot="value">{{language}}</text>
    </wxc-cell>
    <tj-category :title="$t('服务器设置')"></tj-category>
    <wxc-cell :label="$t('服务器地址')" :has-arrow="true" @wxcCellClicked="$router.open({name:'setIp',params:{ip},navTitle:$t('地址设置')})">
      <text slot="value">{{ip}}</text>
    </wxc-cell>
    <wxc-cell :label="$t('服务器端口')" :has-arrow="true" @wxcCellClicked="$router.open({name:'setIp',params:{port},navTitle:$t('端口设置')})" :has-margin="true">
      <text slot="value">{{port}}</text>
    </wxc-cell>
    <wxc-cell :label="$t('还原默认')" :has-arrow="true" @wxcCellClicked="reduction">
    </wxc-cell>
  </div>
</template>

<script>
import { WxcCell } from "weex-ui";
import { tjCategory } from "Components";
import Server from "Config/server";

export default {
  eros: {
    beforeAppear() {
      this.setData();
    },
    backAppeared(params, options) {
      this.setData();
    }
  },
  data() {
    return {
      ip: "",
      port: "",
      language: ""
    };
  },
  components: { WxcCell, tjCategory },
  methods: {
    wxcCellClicked() {},
    setData() {
      this.ip = this.$getDataSync("ip");
      this.port = this.$getDataSync("port");
      this.language = /zh/.test(this.$getLan()) ? "中文" : "English";
    },
    reduction() {
      this.ip = Server.BASE_API;
      this.port = Server.BASE_PORT;
      this.$setDataSync("ip", this.ip);
      this.$setDataSync("port", this.port);
      this.$setDataSync(
        "baseUrl",
        `${Server.BASE_API}:${Server.BASE_PORT}${Server.MODULE_URL}`
      );
      this.$notice.toast({
        message: this.$t("还原成功")
      });
    }
  }
};
</script>
<style scoped>

</style>
