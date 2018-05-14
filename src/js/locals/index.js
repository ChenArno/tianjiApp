const yaml = require('./common.json');

export default class locals {
  static locale;
  constructor(options = {}) {
    this.locale = options.locale || "en"
    return this;
  }

  install(Vue) {
    let self = this;
    Vue.mixin({
      data() {
        return {_locale: self.locale}
      },
      watch: {
        _locale(val) {
          // console.log(val);
        }
      },
      computed: {
        $t() {
          const locale = this.$data._locale;
          return (key) => {
            return self.t(key, locale)
          }
        }
      },
      methods: {
        $i18nSet(val) {
          this.$data._locale = val;
        }
      }
    })
  }

  t(str, locale) {
    locale = locale || this.locale;
    if (!yaml[locale]) 
      return str
    const y = yaml[locale];
    if (!y[str]) 
      return str
    return y[str]
  }
  i18nT(str) {
    return this.t(str, this.locale);
  }

  i18nSet(val) {
    this.locale = val;
  }
}
