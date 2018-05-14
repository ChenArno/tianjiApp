<template>
  <div class="cont cont-top">
    <div class="cont-cell">
      <div class="textarea">
        <textarea class="textarea-cell" :rows="8" v-model="val" :placeholder="$t('请填写您的意见或建议')+'...'"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcMinibar } from "weex-ui";
export default {
  data() {
    return {
      userInfo: {},
      val: ""
    };
  },
  eros: {
    beforeAppear(params, options) {
      this.userInfo = this.$getDataJsonSync("userInfo");
      this.$navigator.setRightItem(
        {
          text: this.$t("保存"),
          textColor: "#040000",
          fontSize: '28'
        },
        () => {
          // this.save();
        }
      );
    }
  },
  components: { WxcMinibar },
  methods: {
    RightButtonClick() {}
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.textarea {
  width:690;
  margin-top: 30px;
  padding-top: 20;
  padding-left: 30;
  padding-right: 30;
  background-color: #ffffff;
  border-style: solid;
  border-width: 2;
  border-color: #cccccc;
}

.textarea-cell{
  width:650;
  height:300;
  color:#333333;
}
.cont-cell{
align-items: center;
}

</style>
