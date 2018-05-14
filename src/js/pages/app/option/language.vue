<template>
  <div>
    <category :title="$t('语言设置')"></category>
    <wxc-radio class="radio" :list="list" :config="{checkedColor: '#de4f45',checkedIcon:'bmlocal://assets/img/check.png'}" @wxcRadioListChecked="nextList"></wxc-radio>
  </div>
</template>

<script>
import Category from "Components/_mods/category.vue";
import { WxcRadio } from "weex-ui";
import Storage from "Config/storage";
const s = new Storage();

export default {
  eros: {
    beforeAppear(params, options) {
      let self = this;
      this.$navigator.setRightItem(
        {
          text: this.$t("保存"),
          textColor: "#040000",
          fontSize: "32" // 字号（默认32px）
        },
        () => {
          this.$notice.confirm({
            message: "更换语言后需要重新启动，是否继续?",
            cancelTitle: "取消",
            okTitle: "确定",
            okCallback() {
              s.setLan(self.nowData.value);
              // self.$i18n.set(self.nowData.value);
              self.$router.setHomePage("/pages/app/index.js");
            }
          });
        }
      );
    }
  },
  components: { WxcRadio, Category },
  data() {
    return {
      list: [
        { title: "中文", value: "zh-CN" },
        { title: "English", value: "en" }
      ],
      nowData: {}
    };
  },
  created() {
    if (/zh/.test(s.getLan())) {
      this.list[0].checked = true;
    } else {
      this.list[1].checked = true;
    }
  },
  methods: {
    nextList(val) {
      // this.$i18nSet(val.value);
      // s.setLan(val.value);
      this.nowData = val;
    }
  }
};
</script>
<style scoped>
.radio {
  color: #de4f45;
}
</style>
