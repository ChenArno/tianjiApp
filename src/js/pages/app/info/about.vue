<template>
  <div class="cont cont-top">
    <div class="cont-cell">
      <div class="about-img">
        <image class="about-logo" src="bmlocal://assets/img/aboutlogo.png"></image>
        <div class="l-subhead" >
          <div class="divider"></div>
          <text class="version">{{ $t('版本号') +"1.1.1"}}</text>
          <div class="divider"></div>
        </div>
      </div>
      <div class="about-text">
        <text class="text">    思创医惠科技股份有限公司成立于2003年11月,2010年4月在深圳创业板上市(股票代码300078),是一家专业从事电子商品防盗(EAS)、无线射频识别系统（RFID）定制化产品及行业应用解决方案的开发与服务的高科技企业，是全球零售支持领域新理念的开拓者和引领者。</text>
        <text class="text">    公司拥有总资产12亿，员工1500余人，在香港、瑞典、意大利、西班牙美国多个国家建立子公司，是全球零售系统解决方案领域的龙头企业和最具规模的生产基地之一。产品远销至世界各地，获得来自70多个国家客户的信赖与好评。</text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      viewHeight: 1000
    };
  },
  eros: {
    beforeAppear(params, options) {
      this.userInfo = this.$getDataJsonSync("userInfo");
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
.cont-cell{
align-items: center;
}
.about-img{
  width:400;
  align-items: center;
}
.about-logo{
  width:330;
  height:255;
  margin-top:80;
}
.divider{
  width:64;
}
.version{
  color:#999899;

}
.about-text{
  padding-left:31;
  padding-right:31;
  margin-top:49;
}
.text{
  color:#666666;
  height:283;
  line-height:47;
}
.l-subhead{
  margin-top:39;
}
</style>
