<template>
  <div class="cont cont-top">
    <div class="cont-cell">
      <div class="tj-group">
        <wxc-cell class="tj-cell" :label="$t('清除缓存')" :has-arrow="true" @wxcCellClicked="clear"></wxc-cell>
        <!-- <wxc-cell class="cell" :label="$t('清除图片')" :has-arrow="true" @wxcCellClicked="clear"></wxc-cell> -->
      </div>
      <div class="tj-group">
        <wxc-cell class="tj-cell" :label="$t('分享')" :has-arrow="true" @wxcCellClicked="share"></wxc-cell>
      </div>
      <div class="tj-group">
        <wxc-cell class="tj-cell" :label="$t('检测新版本')" :has-arrow="true" @wxcCellClicked="update"></wxc-cell>
      </div>
      <div class="tj-group">
        <wxc-cell class="tj-cell" :label="$t('主题选择')" :has-arrow="true" @wxcCellClicked="$router.open({name:'info.theme'})"></wxc-cell>
      </div>
      <div class="tj-group">
        <wxc-cell class="tj-cell" :label="$t('重置密码')" :has-arrow="true" @wxcCellClicked="$router.open({name:'info.reset'})"></wxc-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcCell } from "weex-ui";
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  eros: {
    beforeAppear(params, options) {
      this.userInfo = this.$getDataJsonSync("userInfo");
    }
  },
  components: { WxcCell },
  methods: {
    clear() {
      // this.storag.setDataSync("lastUpdateTime", "");
      this.$notice.toast({
        message: this.$t("清除成功")
      });
    },
    share() {
      let { platform } = weex.config.env;
      let url =
        "https://itunes.apple.com/cn/app/%E5%8F%AE%E5%92%9A-%E8%BF%90%E8%90%A5/id1256312934?mt=8";
      if (platform == "android") {
        url = "https://www.pgyer.com/century_sgs";
      }
      this.$share({
        title: this.$t("天机·运营"),
        content: this.$t(
          "天机运营是思创天机™门店智能运营平台所述的移动端，为连锁门店运营体系相关人员（管理角色、执行角色）提供效率优化方案。"
        ), // 内容
        url, // 用户点击后跳转 url
        image: ""
      }).then(
        resData => {
          // 成功的回调
        },
        error => {
          // 失败的回调
        }
      );
    },
    update() {}
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";

</style>
