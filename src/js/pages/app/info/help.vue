<template>
  <div class="cont cont-top">
    <div class="cont-cell">
      <wxc-cell class="cell" :label="$t('咨询热线')" :has-arrow="true"  @wxcCellClicked="telePhone">
        <text slot="value" class="help">4006-571-160</text>
      </wxc-cell>
    </div>
  </div>
</template>

<script>
import { WxcCell } from "weex-ui";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  components: { WxcCell },
  eros: {
    beforeAppear(params, options) {
      this.userInfo = this.$getDataJsonSync("userInfo");
    }
  },
  methods: {
    telePhone(){
      this.$coms.call("4006571160");
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.help{
  color: #DF4F45;
  margin-right:20;
}
</style>
