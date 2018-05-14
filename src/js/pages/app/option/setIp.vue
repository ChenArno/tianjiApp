<template>
  <div>
    <div class="textarea" v-if="ipOrPort">
      <textarea class="textarea-cell" v-model="val"></textarea>
    </div>
    <wxc-cell :label="$t('端口')" v-else class="cell">
      <input slot="title" class="input" type="number" v-model="val" />
    </wxc-cell>
  </div>
</template>

<script>
import { WxcCell } from "weex-ui";
import Server from "Config/server";

export default {
  eros: {
    beforeAppear(params, options) {
      this.$navigator.setRightItem(
        {
          text: this.$t("保存"),
          textColor: "#040000",
          fontSize: '28'
        },
        () => {
          this.save();
        }
      );
      if (params.ip) {
        this.ipOrPort = true;
        this.val = params.ip;
      } else {
        this.ipOrPort = false;
        this.val = params.port;
      }
    }
  },
  data() {
    return {
      ipOrPort: true,
      val: ""
    };
  },
  watch: {
    val(v) {
    }
  },
  components: { WxcCell },
  created() {},
  methods: {
    save() {
      if (this.ipOrPort) {
        this.$setDataSync("ip", this.val);
        this.$setDataSync(
          "baseUrl",
          `${this.val}:${this.$getDataSync("port")}${Server.MODULE_URL}`
        );
      } else {
        this.$setDataSync("port", this.val);
        this.$setDataSync(
          "baseUrl",
          `${this.$getDataSync("ip")}:${this.val}${Server.MODULE_URL}`
        );
      }
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.textarea {
  margin-top: 30px;
  padding-left: 30px;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1;
  border-color: #cccccc;
}
.cell {
  margin-top: 30px;
}
.textarea-cell{
  height:150;
  color:#333333;
}
.input{
  height:50;
  color:#333333;
}
</style>
